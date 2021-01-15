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
                }
            ]

        }
    }

    handleSelect() { }

    handleClick() {
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
            'content-visibility': showOptions === true ? 'visible' : 'hidden'
        }
        return (
            <div className='group-panel'>
                <select className='group-option' name='selectGroup' value={selectedOption.groupId} onChange={this.handleSelect} onClick={this.handleClick} />
                <div id='group-options' className='group-options' style={style}>
                    {
                        groups.map((group) => <GroupItem key={group.groupId} group={group} onDrag={this.handleDrag} delHandler={this.handleDel} dragHandler={this.handleDrag} />)
                    }
                </div>
            </div>
        )
    }
}

class GroupItem extends React.Component {

    constructor(props) {
        super(props)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDel = this.handleDel.bind(this)
        this.handleDrag = this.handleDrag.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.state = {
            group: this.props.group,
            readonly: true
        }
    }

    handleEdit() {
        this.setState({
            readonly: false
        })
    }

    handleDel() {
        // call del api and nofify parent component
        const { group } = this.state
        const { delHandler } = this.props
        delHandler(group)
    }

    handleDrag() {
        const { group } = this.state
        const { dragHandler } = this.props
        dragHandler(group)
    }

    handleConfirm() { }

    handleCancel() {
        this.setState({
            readonly: true
        })
    }

    render() {
        const { group, readonly } = this.state
        let toolDiv;
        if (readonly) {
            toolDiv = (
                <div className='group-tool'>
                    <div className='group-name'>{group.groupName}</div>
                    <Icon className='group-edit' icon={faEdit} title='编辑' onClick={this.handleEdit} />
                    <Icon className='group-del' icon={faTimes} title='删除' onClick={this.handleDel} />
                </div>
            )
        } else {
            toolDiv = (
                <div className='group-tool'>
                    <input type='text' className='group-name' value={group.groupName} />
                    <Icon className='group-del' icon={faTimes} title='取消' onClick={this.handleCancel} />
                    <Icon className='group-edit' icon={faCheck} title='确认' onClick={this.handleConfirm} />
                </div>
            )
        }
        return (
            <div className='group-item' >
                <Icon className='group-sort' icon={faSort} title='拖动' onDrag={this.handleDrag} />
                {toolDiv}
            </div>
        )
    }
}