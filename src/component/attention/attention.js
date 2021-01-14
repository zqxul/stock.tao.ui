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
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            showOptions: false,
            selectedOption: {},
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
            selectedOption: groups.length > 0 ? groups[0] : ''
        })
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
                    {groups.map((group) => <option key={group.groupId}>{group.groupName}</option>)}
                </div>
            </div>
        )
    }
}