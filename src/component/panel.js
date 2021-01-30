import React from 'react'
import './landing.css'
import { LoginForm, RegisterForm } from './form'
import UserClient from '../module/user'

export default class LandingPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tab: 'login'
        }
    }

    handleLogin = () => {
        this.setState({
            tab: 'login'
        })
    }

    handleRegister = () => {
        this.setState({
            tab: 'register'
        })
    }

    render() {
        const { tab } = this.state
        const userClient = new UserClient('http://localhost:9080')
        return (
            <div className='landing-panel'>
                <div className='landing-header'>
                    <LandingTab tabName='login' landingHandler={this.handleLogin} />
                    <div>|</div>
                    <LandingTab tabName='register' landingHandler={this.handleRegister} />
                </div>
                <div className='landing-body'>
                    {tab === 'login' ? <LoginForm client={userClient} /> : <RegisterForm client={userClient} />}
                </div>
                {/* <div className='landing-footer'>
                    Welcome to Mars!
                </div> */}
            </div>
        )
    }


}

class LandingTab extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    handleLanding = () => {
        const { landingHandler, tabName } = this.props
        landingHandler(tabName)
    }

    render() {
        const { tabName } = this.props
        return (
            <div className='landing-tab' onClick={this.handleLanding}>{tabName}</div>
        )
    }
}