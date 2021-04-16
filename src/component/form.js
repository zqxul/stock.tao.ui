import React from 'react'
import './form.css'
import { connect } from 'react-redux'
import { save, refresh, clear } from '../module/user/slice'
import { UserClient } from '../module/client'
import { UserProto } from '../module/proto'

const mapDispatcher = {}

export class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    handleForget = (e) => {
        console.log('forget password')
        e.preventDefault()
    }

    handleLogin = (e) => {
        const { username, password, rememberMe, verifyCode } = this.state
        let loginRequest = UserProto.PbLoginRequest.create({
            username: username,
            password: password,
            rememberMe: rememberMe,
            verifyCode: verifyCode
        })
        UserClient.login(loginRequest, {}).then((res) => {
            if (res.code && res.code === 200) {
                save(res.data)
            } else {
                alert(res.msg)
            }
        }).catch((err) => {
            if (err) {
                console.log('login error:', err)
            }
        });
        e.preventDefault()
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
        console.log("e:", e.target.value)
        this.setState({
            rememberMe: e.target.value
        })
    }

    render() {
        return (
            <form className='login-form'>
                <div className='login-row username-row'>
                    <label className='username-lable' htmlFor='username'>登录名</label>
                    <input id='username' type='text' placeholder='用户名或邮箱' onChange={this.changeUsername} />
                </div>
                <div className='login-row password-row'>
                    <label className='password-label' htmlFor='password' onChange={this.changePassword}>密码</label>
                    <input id='password' type='password' placeholder='长度不能少于8位' />
                </div>
                <div className='login-row'>
                    <div className='remember-me'>
                        <input id='rememberMe' type='checkbox' onChange={this.changeRemberMe} />
                        <label htmlFor='rememberMe'>记住我</label>
                    </div>
                    <div className='login-form-btn'>
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

    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    changeNickname = (e) => {
        this.setState({
            nickname: e.target.value
        })
    }

    changeRepassword = (e) => {
        const { password } = this.state
        if (password !== e.target.value) {
            alert('repassword not equal to password')
        }
    }

    handleRegister = (e) => {
        const { username, email, password, nickname } = this.state
        let registerRequest = UserProto.PbRegisterRequest.create({
            username: username,
            password: password,
            email: email,
            nickname: nickname
        })
        UserClient.register(registerRequest, {}).then((res) => {
            if (res.code && res.code === 200) {
                save(res.data)
                alert('register success')
            } else {
                alert(res.msg)
            }
        }).catch((err) => {
            if (err) {
                console.log('register error:', err)
            }
        });
        e.preventDefault()
    }

    render() {
        return (
            <form className='register-form'>
                <div className='register-row username-row'>
                    <label className='username-lable' htmlFor='username'>用户名</label>
                    <input id='username' name='username' type='text' onChange={this.changeUsername} />
                </div>
                <div className='register-row nickname-row'>
                    <label className='username-lable' htmlFor='nickname'>昵称</label>
                    <input id='nickname' name='nickname' type='text' onChange={this.changeNickname} />
                </div>
                <div className='register-row email-row'>
                    <label className='email-lable' htmlFor='email'>邮箱</label>
                    <input id='email' name='email' type='email' onChange={this.changeEmail} />
                </div>
                <div className='register-row password-row'>
                    <label className='password-label' htmlFor='password'>密码</label>
                    <input id='password' type='password' placeholder='长度不能少于8位' onChange={this.changePassword} />
                </div>
                <div className='register-row password-row'>
                    <label className='password-label' htmlFor='repassword'>确认密码</label>
                    <input id='repassword' type='password' placeholder='再次输入密码' onChange={this.changeRepassword} />
                </div>
                <div className='btn-row'>
                    <button onClick={this.handleRegister}>提交</button>
                </div>
            </form>
        )
    }

}

export default connect(null, mapDispatcher)(LoginForm)