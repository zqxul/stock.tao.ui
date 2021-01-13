import React from 'react';
import './nav.css';

export default class Nav extends React.Component {

    render() {
        const { menus } = this.props
        return (
            <nav className='nav nav-xs'>
                {menus.map((menu) => {
                    const { title, link, icon } = menu
                    return <NavItem key={menu.title} title={title} link={link} icon={icon} />
                })}
            </nav>
        )
    }
}

class NavItem extends React.Component {

    render() {
        console.log('0000', this.props)
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