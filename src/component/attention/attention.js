import React from 'react'
import './attention.css'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck, faEdit, faList, faPlus, faSort, faSortNumericDownAlt, faSortNumericUpAlt, faSyncAlt, faTimes } from '@fortawesome/free-solid-svg-icons'



export default class AttentionPanel extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            current: 1,
            priceAsc: true,
            percentAsc: false
        }
    }

    togglePriceSort = () => {
        const { priceAsc } = this.state
        this.setState({
            priceAsc: !priceAsc
        })
    }

    togglePercentSort = () => {
        const { percentAsc } = this.state
        this.setState({
            percentAsc: !percentAsc
        })
    }

    render() {
        const { priceAsc, percentAsc } = this.state
        return (
            <div className='attention-panel'>
                <div className='attention-header'>
                    <div className='attention-logo'><Icon className='attention-icon' icon={faList} title='关注列表' /></div>
                    <GroupPanel />
                    <div className='price-header'>
                        <div className='price-lasted'>最新价</div>
                        <Icon className='price-sort' title={priceAsc ? '升序' : '降序'} icon={priceAsc ? faSortNumericUpAlt : faSortNumericDownAlt} onClick={this.togglePriceSort} />
                    </div>
                    <div className='price-header'>
                        <div className='price-rise-fall'>涨跌幅</div>
                        <Icon className='percent-sort' title={percentAsc ? '升序' : '降序'} icon={percentAsc ? faSortNumericUpAlt : faSortNumericDownAlt} onClick={this.togglePercentSort} />
                    </div>
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
            showNewGroupPanel: false,
            selectedOption: {
                groupId: '',
                groupName: '自选',
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

    handleSelect = (group) => {
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

    // 拖动
    handleDrag = () => {
        // const { groups } = this.state
        // todo drag logic
    }

    // 拖放
    handleDrop = (group, targetGroupId) => {
        console.log('drop', group)
        const { groups } = this.state
        let targetGroupIndex = groups.findIndex((item) => item.groupId === targetGroupId)
        let targetGroup = groups[targetGroupIndex]
        groups.splice(targetGroupIndex, 1)
        let toGroupIndex = groups.findIndex((item => item.groupId === group.groupId))
        if (targetGroup.order < group.order) {
            groups.splice(toGroupIndex + 1, 0, targetGroup)
        } else {
            groups.splice(toGroupIndex, 0, targetGroup)
        }
        groups.forEach((item, index) => {
            item.order = index + 1
        })
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

    handleNewGroup = () => {
        this.toggleNewGroupPanel(true)
    }

    toggleNewGroupPanel = (show) => {
        this.setState({
            showNewGroupPanel: show
        })
    }

    render() {
        const { groups, showOptions, selectedOption, showNewGroupPanel } = this.state
        const style = {
            contentVisibility: showOptions === true ? 'visible' : 'hidden'
        }
        return (
            <div className='group-panel'>
                <div className='group-option'>
                    <div className='select-option' onClick={this.handleClick}>
                        <div className='option-name'>{selectedOption.groupName}</div>
                        <Icon className='pulldown' title='展开' icon={faAngleDown} />
                    </div>
                    <div className='option-tool'>
                        <Icon className='group-add' title='新建' icon={faPlus} onClick={this.handleNewGroup} />
                        <Icon className='group-refresh' title='刷新' icon={faSyncAlt} />
                    </div>
                </div>
                <div className='group-options' style={style}>
                    {
                        groups.map((group) => <GroupItem key={group.groupId} group={group} selectHandler={this.handleSelect} delHandler={this.handleDel} dragHandler={this.handleDrag} dropHandler={this.handleDrop} />)
                    }
                </div>
                {
                    showNewGroupPanel ? <NewGroupPanel togglePanelHandler={this.toggleNewGroupPanel} /> : null
                }
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

    // handleMove = (e) => {
    //     const { group } = this.props
    //     console.log('drag', e.type, group.groupId, e.currentTarget)
    //     e.dataTransfer.dropEffect = 'move'

    //     let top = e.currentTarget.getBoundingClientRect().top;
    //     let bottom = e.currentTarget.getBoundingClientRect().bottom
    //     let middle = (top + bottom) / 2;
    //     console.log(e.type, 'groupId', group.groupId, 'top', top, 'bottom:', bottom, 'middle', middle,
    //         'clientY', e.clientY)
    //     if (top < e.clientY && e.clientY < middle) {
    //         this.setState({
    //             borderTop: 'solid',
    //             borderBottom: 'none'
    //         })
    //     } else if (middle < e.clientY && e.clientY < bottom) {
    //         this.setState({
    //             borderTop: 'none',
    //             borderBottom: 'solid'
    //         })
    //     } else {
    //         this.setState({
    //             borderTop: 'none',
    //             borderBottom: 'none'
    //         })
    //     }
    //     e.preventDefault()
    // }

    handleDragOver = (e) => {
        e.preventDefault()
    }

    handleClick = () => {
        console.log("click")
        const { group } = this.state
        const { selectHandler } = this.props
        selectHandler(group)
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

class NewGroupPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            groupName: '',
            isDefault: false
        }
    }

    handleCancel = () => {
        const { togglePanelHandler } = this.props
        togglePanelHandler(false)
    }

    handleConfirm = () => {
        const { togglePanelHandler } = this.props
        togglePanelHandler(false)
    }

    changeGroupName = (e) => {
        this.setState({
            groupName: e.target.value
        })
    }

    changeIsDefault = (e) => {
        console.log(e.target.value)
        this.setState({
            isDefault: e.target.value
        })
    }

    render() {
        return (
            <div className='group-add-panel'>
                <form className='group-add-form'>
                    <input type='text' className='new-group-name' onChange={this.changeGroupName} />
                    <div className='group-default'>
                        <input type='checkbox' id='group-default-box' className='group-default-box' onChange={this.changeIsDefault} />
                        <label className='group-default-label' htmlFor='group-default-box'>默认</label>
                    </div>
                </form>
                <div className='group-add-tool'>
                    <Icon className='group-cancel' icon={faTimes} title='取消' onClick={this.handleCancel} />
                    <Icon className='group-confirm' icon={faCheck} title='确认' onClick={this.handleConfirm} />
                </div>
            </div>
        )
    }
}