import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import React from 'react'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSmile, faSmileBeam, faSmileWink } from '@fortawesome/free-solid-svg-icons'

export default class EmojiPanel extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            on: false
        }
    }

    handleSelect = () => {
        const { on } = this.state
        this.setState({
            on: !on
        })
    }

    handleClick = () => {
        const { on } = this.state
        this.setState({
            on: !on
        })
    }

    render() {
        const { on } = this.state
        return <div>
            {on ? <Picker className='float-left' title='Pick your emoji…' emoji='point_up' onSelect={this.handleSelect} /> : <Icon icon={faSmile} onClick={this.handleClick} />}
        </div>
    }

}