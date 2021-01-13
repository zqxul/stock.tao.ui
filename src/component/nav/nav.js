import React from 'react';
import './nav.css';

export default class Nav extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            contentVisibility: 'hidden'
        }
        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
    }

    onMouseEnter() {
        this.setState({
            contentVisibility: 'visible'
        })
    }

    onMouseLeave() {
        this.setState({
            contentVisibility: 'hidden'
        })
    }

    render() {
        const { menus } = this.props
        const { contentVisibility } = this.state
        return (
            <nav className={'nav nav-' + this.props.size} onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div className='nav-group' style={{ contentVisibility: contentVisibility }}>
                    {menus.map((menu) => {
                        const { title, link, icon } = menu
                        return <NavItem key={menu.title} title={title} link={link} icon={icon} />
                    })}
                </div>
                <div className='nav-bar'>
                    <img src='/nav128.svg' alt='' />
                </div>
            </nav>
        )
    }
}

class NavItem extends React.Component {

    render() {
        const { title, link, icon } = this.props
        return (
            <div className='nav-item'>
                <a href={link} title={title}>
                    <img src={icon} alt={title} />
                </a>
            </div>
        )
    }
}