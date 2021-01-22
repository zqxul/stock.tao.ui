import React from 'react'

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
                <div className='username-row'>
                    <label className='username-lable' htmlFor='username'>登录名</label>
                    <input id='username' type='text' placeholder='用户名或邮箱地址' onChange={this.changeUsername} />
                </div>
                <div className='password-row'>
                    <label className='password-label' htmlFor='password' onChange={this.changePassword}>密码</label>
                    <input id='password' type='password' />
                </div>
                <div className='rememberMe-row' onChange={this.changeRemberMe}>
                    <input type='checkbox' />
                    <label>记住我</label>
                </div>
                <div className='btn-row'>
                    <button onClick={this.handleForget}>忘记密码</button>
                    <button onClick={this.handleLogin}>登录</button>
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
                <div className='username-row'>
                    <label className='username-lable' htmlFor='username'>用户名</label>
                    <input id='username' name='username' type='text' />
                </div>
                <div className='nickname-row'>
                    <label className='username-lable' htmlFor='nickname'>昵称</label>
                    <input id='nickname' name='nickname' type='text' />
                </div>
                <div className='email-row'>
                    <label className='email-lable' htmlFor='email'>邮箱</label>
                    <input id='email' name='email' type='email' />
                </div>
                <div className='password-row'>
                    <label className='password-label' htmlFor='password'>密码</label>
                    <password id='password' />
                </div>
                <div className='password-row'>
                    <label className='password-label' htmlFor='password'>确认密码</label>
                    <password id='repassword' />
                </div>
                <div className='btn-row'>
                    <button onClick={this.handleRegister}>提交</button>
                </div>
            </form>
        )
    }

}