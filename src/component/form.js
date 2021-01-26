import React from 'react'
import { PbUserClient } from '../module/user_grpc_web_pb'
import { PbLoginRequest } from '../module/user_pb'
import './form.css'

export class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            rememberMe: false
        }
    }

    handleForget = () => {

    }

    handleLogin = () => {
        const { username, password, verifycode, rememberMe } = this.state
        let UserClient = new PbUserClient('http://localhost:8081')
        let loginRequest = new PbLoginRequest()
        loginRequest.setUsername(username)
        loginRequest.setPassword(password)
        loginRequest.setVerifycode(verifycode)
        loginRequest.setRememberme(rememberMe)
        let loginResponse = UserClient.login(loginRequest, {}, (err, response) => {
            console.log('----error-----', err)
            console.log('---', loginResponse)
            console.log('---', loginResponse.code)

            console.log('---', loginResponse.msg)
        })

    }

    changeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    changeRemberMe = (e) => {
        this.setState({
            rememberMe: e.target.value
        })
    }

    render() {
        return (
            <form className='login-form'>
                <div className='login-row username-row'>
                    <label className='username-lable' htmlFor='username'>登录名</label>
                    <input id='username' type='text' placeholder='用户名或邮箱地址' onChange={this.changeUsername} />
                </div>
                <div className='login-row password-row'>
                    <label className='password-label' htmlFor='password' onChange={this.changePassword}>密码</label>
                    <input id='password' type='password' />
                </div>
                <div className='login-row' onChange={this.changeRemberMe}>
                    <div className='remember-me'>
                        <input id='rememberMe' type='checkbox' />
                        <label htmlFor='rememberMe'>记住我</label>
                    </div>
                    <div className='login-btn'>
                        <button onClick={this.handleForget}>忘记密码</button>
                        <button onClick={this.handleLogin}>登录</button>
                    </div>
                </div>
            </form>
        )
    }

}

export class RegisterForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleRegister = () => {

    }

    render() {
        return (
            <form className='register-form'>
                <div className='register-row username-row'>
                    <label className='username-lable' htmlFor='username'>用户名</label>
                    <input id='username' name='username' type='text' />
                </div>
                <div className='register-row nickname-row'>
                    <label className='username-lable' htmlFor='nickname'>昵称</label>
                    <input id='nickname' name='nickname' type='text' />
                </div>
                <div className='register-row email-row'>
                    <label className='email-lable' htmlFor='email'>邮箱</label>
                    <input id='email' name='email' type='email' />
                </div>
                <div className='register-row password-row'>
                    <label className='password-label' htmlFor='password'>密码</label>
                    <input id='password' type='password' />
                </div>
                <div className='register-row password-row'>
                    <label className='password-label' htmlFor='password'>确认密码</label>
                    <input id='repassword' type='password' />
                </div>
                <div className='btn-row'>
                    <button onClick={this.handleRegister}>提交</button>
                </div>
            </form>
        )
    }

}