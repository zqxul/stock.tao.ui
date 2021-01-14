import React from 'react'
import './attention.css'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faList } from '@fortawesome/free-solid-svg-icons'



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
        this.state = {
            groups: [
                {
                    groupId: "1",
                    groupName: "分组1",
                },
                {
                    groupId: "2",
                    groupName: "分组2",
                }
            ]
        }
    }

    handleSelect() { }

    handleClick(e) {
        console.log('---')
        e.preventDefault()
    }

    render() {
        const { groups } = this.state
        const style = {
            width: '100%'
        }
        return (
            <div className='group-panel'>
                <input className='group-option' name='selectGroup' list='group-options' onChange={this.handleSelect} onClick={this.handleClick} />
                <datalist id='group-options' className='group-options' style={style}>
                    {groups.map((group) => <option key={group.groupId}>{group.groupName}</option>)}
                </datalist>
            </div>
        )
    }
}