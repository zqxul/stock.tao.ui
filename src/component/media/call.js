import React from 'react';
import RTCClient from './rtc';

export default class CallPanel extends React.Component {

    constructor(props) {
        super(props)
        let rtcpc = new RTCPeerConnection({
            iceServers:[{
                urls:['stock.tao']
            }],
        })
        rtcpc.onicecandidate = (e) => {}
        rtcpc.oniceconnectionstatechange = ()=>{}
        rtcpc.onicegatheringstatechange = ()=>{}
        rtcpc.onsignalingstatechange = ()=>{}
        rtcpc.onnegotiationneeded = ()=>{}
        rtcpc.ontrack = ()=>{}
        this.state = {
            rtcpc : rtcpc
        }
    }

    dial = (targetID) => {
        const {rtcpc} = this.state
        const {RTCClient} = this.props
        rtcpc.createOffer().then((offer) => {
            rtcpc.setLocalDescription(offer)
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then((stream)=> stream.getTracks().forEach(track=>rtcpc.addTrack(track)))
        }).catch((err) => {
            console.log('create offer err:', err)
        })
        RTCClient.send({
            source: this.props.userID,
            target: targetID,
            sd: rtcpc.localDescription
        })
    }

    login = () => {
        let input = document.getElementById('username');
    }

    refresh = () => {

    } 

    render() {
        const { users } = this.props
        return (
            <div>
                <div className='login' style={{ display: 'flex' }}>
                    <input id='username' type='text' placeholder='请输入用户名'></input>
                    <button onClick={this.login}>登录</button>
                    <button onClick={this.refresh}>刷新</button>
                </div>
                <UserPanel users={users} clickHanlder={this.dial} />
                <video id='caller' autoPlay controls muted width='50%'></video>
                <video id='callee' autoPlay controls width='100%'></video>
                <button onClick={this.dial}>播放</button>
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