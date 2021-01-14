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
                    <Icon className='attention-icon' icon={faList} />
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
                }
            ]
        }
    }

    handleSelect() { }

    render() {
        const { groups } = this.state
        return (
            <select className='group-panel' onChange={this.handleSelect}>
                {groups.map((group) => <option key={group.groupId}>{group.groupName}</option>)}
            </select>
        )
    }
}