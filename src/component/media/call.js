import React from 'react';

export default class CallPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    handleClick = (username) => {
        let { peerConnection } = this.state
        if (peerConnection) {
            alert('you cannot start a call because you have already one open')
            return
        }
        peerConnection = new RTCPeerConnection({
            video: true,
            audio: true
        })
        if (this.dial(username, peerConnection)) {
            this.setState({
                peerConnection: peerConnection
            })
        }
        peerConnection.onicecandidate = this.handleICECandidateEvent
        peerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent
        peerConnection.onicegatheringstatechange = this.handleICEGatheringStateChangeEvent
        peerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent
        peerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent
        peerConnection.ontrack = this.handleTrackEvent

        peerConnection.onopen = this.handleOpen
        peerConnection.onerror = this.handleError
        peerConnection.onmessage = this.handleMessage
    }

    dial = (username, peerConnection) => {

    }

    login = () => {
        let input = document.getElementById('username');
    }

    refresh = () => {

    }

    handleMessage = (e) => {
        let msg = JSON.parse(e.data)
        console.log('message comming:', msg)
    }

    handleError = (e) => {
        console.log('error happend:', e)
    }

    handleOpen = (e) => {
        console.log('connection opened:', e)
    }

    handleICECandidateEvent = () => {

    }

    handleICEConnectionStateChangeEvent = () => {

    }

    handleICEGatheringStateChangeEvent = () => {

    }

    handleSignalingStateChangeEvent = () => {

    }

    handleNegotiationNeededEvent = () => {

    }

    handleTrackEvent = () => {

    }

    render() {
        const { users } = this.state
        return (
            <div>
                <div className='login' style={{ display: 'flex' }}>
                    <input id='username' type='text' placeholder='请输入用户名'></input>
                    <button onClick={this.login}>登录</button>
                    <button onClick={this.refresh}>刷新</button>
                </div>
                <UserPanel users={users} clickHanlder={this.handleClick} />
                <video id='caller' autoPlay controls muted width='50%'></video>
                <video id='callee' autoPlay controls width='100%'></video>
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