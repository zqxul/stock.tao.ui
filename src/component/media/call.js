import React from 'react';
import RTCClient from './rtc';

export default class CallPanel extends React.Component {

    constructor(props) {
        super(props)
        let rtcpc = new RTCPeerConnection({
            iceServers: [{
                urls: ['stock.tao']
            }],
        })
        rtcpc.onicecandidate = e => {
            const { RTCClient } = this.state
            RTCClient.exchange({
                localID: null,
                remoteID: null,
                sd: null,
                icd: e.candidate
            })
        }
        rtcpc.oniceconnectionstatechange = e => {
            console.log('ICE RTCPeerConnection state change to ' + rtcpc.iceConnectionState)
            switch (rtcpc.iceConnectionState) {
                case 'closed':
                case 'failed':
                case 'disconnected':
                    // TODO close commucation
                    break;
            }
        }
        rtcpc.onicegatheringstatechange = e => {
            console.log('ICE gathering state changed to ' + rtcpc.iceGatheringState)
        }
        rtcpc.onsignalingstatechange = e => {
            console.log('WebRTC signaling state changed to ' + rtcpc.signalingState)
            switch (rtcpc.signalingState) {
                case 'closed':
                    // TODO close commucation
                    break;
            }
        }
        rtcpc.onnegotiationneeded = e => {
            console.log('Negotiation needed')

            console.log('Creating offer')
            const offer = rtcpc.createOffer()

            console.log('Setting local description to the offer')
            rtcpc.setLocalDescription(offer)

            console.log('Setting the offer to the remote peer')
            RTCClient.exchange({
                localID: null,
                remoteID: null,
                sdp: rtcpc.localDescription,
                icd: null
            }).catch(error => {
                console.log('The following error occured while sending the offer to the remote peer')
            })
        }
        rtcpc.ontrack = () => { }
        this.state = {
            rtcpc: rtcpc
        }
    }

    dial = (remoteID) => {
        const { rtcpc } = this.state
        const { RTCClient } = this.props
        rtcpc.createOffer().then((offer) => {
            rtcpc.setLocalDescription(offer)
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then((stream) => stream.getTracks().forEach(track => rtcpc.addTrack(track)))
        }).catch((err) => {
            console.log('create offer err:', err)
        })
        RTCClient.exchange({
            source: this.props.userID,
            target: remoteID,
            sd: rtcpc.localDescription
        }).then(rd => {
            if (rd.icd) {
                rtcpc.addIceCandidate(rd.icd)
            }
            if (rd.sd) {
                rtcpc.setRemoteDescription(rd.sd)
            }
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
        const { users, clickHandlder } = this.props
        return (
            <div className='user-list'>
                <div>用户列表</div>
                <div>
                    {users.map(user => <UserItem key={user.username} user={user} clickHandlder={clickHandlder} />)}
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