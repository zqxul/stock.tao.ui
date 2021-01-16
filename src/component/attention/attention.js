import React from 'react'
import './attention.css'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faList, faSort, faTimes } from '@fortawesome/free-solid-svg-icons'



export default class AttentionPanel extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            current: 1
        }
    }


    render() {
        return (
            <div className='attention-panel'>
                <div className='attention-header'>
                    <Icon className='attention-icon' icon={faList} title='关注列表' />
                    <GroupPanel />
                    <div className='price-lasted' >最新价</div>
                    <div className='price-rise-fall'>涨跌幅</div>
                </div>
            </div>
        )
    }

}

class GroupPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showOptions: false,
            selectedOption: {
                groupId: '',
                groupName: '',
                order: 0
            },
            groups: [
                {
                    groupId: "1",
                    groupName: "分组1",
                    order: 1
                },
                {
                    groupId: "2",
                    groupName: "分组2",
                    order: 2
                },
                {
                    groupId: "3",
                    groupName: "分组分组分组分组分组分组分组3",
                    order: 3
                },
                {
                    groupId: "4",
                    groupName: "分组4",
                    order: 4
                },
                {
                    groupId: "5",
                    groupName: "分组5",
                    order: 5
                },
                {
                    groupId: "6",
                    groupName: "分组6",
                    order: 6
                }
            ]

        }
    }

    handleClick = (group) => {
        this.toggleGroupOptions()
    }

    handleGroupItemClick = (group) => {
        console.log('handleGroupItemClick:', group)
        this.setState({
            selectedOption: group
        })
        this.toggleGroupOptions()
    }

    toggleGroupOptions = () => {
        const { showOptions } = this.state
        this.setState({
            showOptions: !showOptions
        })
    }

    // componentDidMount = () => {
    //     const { groups } = this.state
    //     this.setState({
    //         selectedOption: groups.length > 0 ? groups[0].groupId : ''
    //     })
    // }

    handleDrag = () => {
        // const { groups } = this.state
        // todo drag logic
    }

    handleDrop = (group, targetGroupId) => {
        console.log('drop', group)
        const { groups } = this.state
        let targetGroupIndex = groups.findIndex((item) => item.groupId === targetGroupId)
        let targetGroup = groups[targetGroupIndex]
        groups.splice(targetGroupIndex, 1)
        let toGroupIndex = groups.findIndex((item => item.groupId === group.groupId))
        groups.splice(toGroupIndex, 0, targetGroup)
        this.setState({
            groups: groups
        })
    }

    handleDel = (group) => {
        const { groups } = this.state
        let groupIndex = groups.findIndex((item) => item.groupId === group.groupId)
        if (groupIndex !== -1) {
            groups.splice(groupIndex, 1)
            this.setState({
                groups: groups
            })
        }
    }

    render() {
        const { groups, showOptions, selectedOption } = this.state
        const style = {
            width: '100%',
            contentVisibility: showOptions === true ? 'visible' : 'hidden'
        }
        return (
            <div className='group-panel'>
                <select className='group-option' onClick={this.handleClick} />
                <div className='group-options' style={style}>
                    {
                        groups.map((group) => <GroupItem key={group.groupId} group={group} clickHandler={this.handleGroupItemClick} delHandler={this.handleDel} dragHandler={this.handleDrag} dropHandler={this.handleDrop} />)
                    }
                </div>
            </div>
        )
    }
}

class GroupItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            group: this.props.group,
            readonly: true,
            draggable: false,
            cursor: 'initial',
            borderBottom: 'none',
            borderTop: 'none'
        }
    }
    // 内容变化
    handleChange = (e) => {
        const { group } = this.state
        group.groupName = e.target.value
        this.setState({
            group: group
        })
    }
    // 编辑
    handleEdit = () => {
        this.setState({
            readonly: false
        })
    }
    // 删除
    handleDel = () => {
        // call del api and nofify parent component
        const { group } = this.state
        const { delHandler } = this.props
        delHandler(group)
    }
    // 取消编辑
    handleCancel = () => {
        this.setState({
            readonly: true
        })
    }
    // 确认编辑
    handleConfirm = (e) => {
        // call modify api
        this.setState({
            readonly: true
        })
    }

    handleDragStart = (e) => {
        const { group } = this.props
        e.dataTransfer.setData("text/plain", group.groupId);
        this.setState({
            cursor: 'grabbing'
        })
    }

    handleDragEnd = () => {
        // this.setState({
        //     cursor: 'initial'
        // })
        this.setState({
            borderTop: 'none',
            borderBottom: 'none'
        })
    }

    handleDrag = () => {
        const { group } = this.props
        // console.log("drag", group.groupId)
        const { dragHandler } = this.props
        dragHandler(group)
    }

    handleDrop = (e) => {
        console.log('drop', e.currentTarget)
        const targetGroupId = e.dataTransfer.getData("text/plain")
        const { group, dropHandler } = this.props
        this.setState({
            cursor: 'grab'
        })
        dropHandler(group, targetGroupId)

    }

    handleMouseUp = () => {
        this.setState({
            cursor: 'move'
        })
    }

    handleMouseDown = () => {
        this.setState({
            cursor: 'grab'
        })
    }

    handleMouseEnter = () => {
        this.setState({
            draggable: true,
            cursor: 'move'
        })
    }

    handleMouseLeave = () => {
        this.setState({
            draggable: false,
            cursor: 'initial'
        })
    }

    handleMove = (e) => {
        const { group } = this.props
        console.log('drag', e.type, group.groupId, e.currentTarget)
        e.dataTransfer.dropEffect = 'move'

        let top = e.currentTarget.getBoundingClientRect().top;
        let bottom = e.currentTarget.getBoundingClientRect().bottom
        let middle = (top + bottom) / 2;
        console.log(e.type, 'groupId', group.groupId, 'top', top, 'bottom:', bottom, 'middle', middle,
            'clientY', e.clientY)
        if (top < e.clientY && e.clientY < middle) {
            this.setState({
                borderTop: 'solid',
                borderBottom: 'none'
            })
        } else if (middle < e.clientY && e.clientY < bottom) {
            this.setState({
                borderTop: 'none',
                borderBottom: 'solid'
            })
        } else {
            this.setState({
                borderTop: 'none',
                borderBottom: 'none'
            })
        }
        e.preventDefault()
    }


    handleDragOver = (e) => {
        e.preventDefault()
    }

    handleClick = () => {
        console.log("click")
        const { group } = this.state
        const { clickHandler } = this.props
        clickHandler(group)
    }

    render() {
        const { group, readonly, draggable, cursor, borderBottom, borderTop } = this.state
        const style = {
            cursor: cursor,
            borderBottom: borderBottom,
            borderTop: borderTop
        }
        let toolDiv = readonly ? (
            <div className='group-tool'>
                <div className='group-name' title={group.groupName} onClick={this.handleClick}>{group.groupName}</div>
                <div className='group-edit'><Icon icon={faEdit} title='编辑' onClick={this.handleEdit} /></div>
                <div className='group-del'><Icon icon={faTimes} title='删除' onClick={this.handleDel} /></div>
            </div>
        ) : (
                <div className='group-tool'>
                    <input type='text' className='group-name' value={group.groupName} onChange={this.handleChange} />
                    <Icon className='group-cancel' icon={faTimes} title='取消' onClick={this.handleCancel} />
                    <Icon className='group-confirm' icon={faCheck} title='确认' onClick={this.handleConfirm} />
                </div>
            )
        return (
            <div className='group-item' draggable={draggable} onDrag={this.handleDrag} onDrop={this.handleDrop} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} onDragOver={this.handleDragOver} style={style}>
                <Icon className='group-sort' icon={faSort} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} />
                {toolDiv}
            </div>
        )
    }
}