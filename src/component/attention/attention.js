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
        this.handleSelect = this.handleSelect.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleDrag = this.handleDrag.bind(this)
        this.handleDel = this.handleDel.bind(this)
        this.hideGroupOptions = this.hideGroupOptions.bind(this)
        this.state = {
            showOptions: false,
            selectedOption: {},
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

    handleSelect() { }

    handleClick() {
        this.hideGroupOptions()
    }

    handleGroupItemClick(group) {
        this.hideGroupOptions()
    }

    hideGroupOptions() {
        const { showOptions } = this.state
        this.setState({
            showOptions: !showOptions
        })
    }

    componentDidMount() {
        const { groups } = this.state
        console.log(groups)
        this.setState({
            selectedOption: groups.length > 0 ? groups[0].groupId : ''
        })
    }

    handleDrag() {
        // const { groups } = this.state
        // todo drag logic
    }

    handleDel(group) {
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
                <select className='group-option' value={selectedOption.groupName} onChange={this.handleSelect} onClick={this.handleClick} />
                <div className='group-options' style={style}>
                    {
                        groups.map((group) => <GroupItem key={group.groupId} group={group} clickHandler={this.handleClick} delHandler={this.handleDel} dragHandler={this.handleDrag} />)
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
            cursor: 'initial'
        }
    }

    handleEdit = () => {
        this.setState({
            readonly: false
        })
    }

    handleDel = () => {
        // call del api and nofify parent component
        const { group } = this.state
        const { delHandler } = this.props
        delHandler(group)
    }

    handleDragStart = (e) => {
        console.log("drag start")
        this.setState({
            cursor: 'grabbing'
        })
    }

    handleDragEnd = (e) => {
        console.log("drag end")
        this.setState({
            cursor: 'initial'
        })
    }

    handleDrag = () => {
        console.log("drag")
        const { group } = this.state
        const { dragHandler } = this.props
        dragHandler(group)
    }

    handleDrop = () => {
        console.log("drop")
        this.setState({
            cursor: 'initial'
        })
    }

    handleMouseUp = () => {
        console.log("mouse up")
        this.setState({
            cursor: 'move'
        })
    }

    handleMouseDown = () => {
        console.log("mouse down")
        this.setState({
            cursor: 'grab'
        })
    }

    handleConfirm = (e) => {
        // call modify api
        this.setState({
            readonly: true
        })
    }

    handleChange = (e) => {
        const { group } = this.state
        group.groupName = e.target.value
        this.setState({
            group: group
        })
    }

    handleCancel = () => {
        this.setState({
            readonly: true
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

    render() {
        const { group, readonly, draggable, cursor } = this.state
        const style = {
            cursor: cursor
        }
        let toolDiv = readonly ? (
            <div className='group-tool'>
                <div className='group-name'>{group.groupName}</div>
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
            <div className='group-item' draggable={draggable} onDrag={this.handleDrag} onDrop={this.handleDrop} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} style={style}>
                <Icon className='group-sort' style={style} icon={faSort} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} />
                {toolDiv}
            </div>
        )
    }
}