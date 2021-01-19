import React from 'react';

export default class CallPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaConstraints: {
                video: true,
                audio: true
            }
        }
    }

    handleClick = (username) => {
        const { mediaConstraints, peerConnection } = this.state
        if (peerConnection) {
            alert('you cannot start a call because you have already one open')
            return
        }
        this.setState({
            peerConnection: new RTCPeerConnection(mediaConstraints)
        })
        this.dial(username)
    }

    dial = (username) => {
        const { peerConnection } = this.state
        if (peerConnection) {

        }
    }

    render() {
        return (
            < div >
                <UserPanel users={[{ username: 'a' }, { username: 'b' }]} clickHanlder={this.handleClick} />
                <video id='caller' autoPlay controls muted width='150'></video>
                <video id='callee' autoPlay controls width='500'></video>
                <button onClick={this.handlePlay}>播放</button>
            </div >
        )
    }
}

export class UserPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { users, clickHanlder } = this.props
        return (
            <div className='user-list'>
                <div>用户列表</div>
                <div>
                    {users.map(user => <UserItem key={user.username} user={user} clickHanlder={clickHanlder} />)}
                </div>
            </div>
        )
    }
}

class UserItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleCall = (username) => {
        const { user, clickHanlder } = this.props
        clickHanlder(user.username)
    }

    render() {
        const { user } = this.props
        const style = {
            display: 'inline'
        }
        return (
            <div className='user-item'>
                <div className='username' style={style}>{user.username}</div>
                <button onClick={this.handleCall} style={style}>呼叫</button>
            </div>
        )
    }
}