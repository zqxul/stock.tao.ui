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
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect() { }

    render() {
        return (
            <div className='attention-panel'>
                <Icon className='attention-icon' icon={faList} />
            </div>
        )
    }

}