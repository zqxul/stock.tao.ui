import React from 'react';
import RTCClient, { loadRTCProto } from './rtc';
const RTCProto = loadRTCProto()
export default class CallPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rtcpc: rtcpc,
            remoteID: null
        }
        const { localID } = this.props
        let rtcpc = new RTCPeerConnection({
            iceServers: [{
                urls: ['stock.tao']
            }],
        })
        rtcpc.onicecandidate = e => {
            const { RTCClient } = this.state
            let ld = RTCProto.localDescription.create({
                localID: localID,
                remoteID: this.state.remoteID,
                sd: rtcpc.localDescription,
                icd: e.candidate
            })
            RTCClient.exchange(ld)
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
            rtcpc.createOffer().then(offer => {
                console.log('Setting local description to the offer')
                rtcpc.setLocalDescription(offer)

                console.log('Setting the offer to the remote peer')
                let ld = RTCProto.localDescription.create({
                    localID: localID,
                    remoteID: this.state.remoteID,
                    sdp: rtcpc.localDescription,
                    icd: null
                })
                RTCClient.exchange(ld).catch(error => {
                    console.log('The following error occured while sending the offer to the remote peer')
                })
            })
        }
        rtcpc.ontrack = e => {
            console.log('Track event')
            this.setState({
                srcObject: e.streams[0],
                status: 'CALLING'
            })
            rtcpc.addTrack(e.track)
            let localDescription = RTCProto.localDescription.create({
                localID: localID,
                remoteID: this.state.remoteID,
                sd: rtcpc.localDescription,
                icd: null
            })
            RTCClient.exchange(localDescription)
        }
    }

    offer = (remoteID) => {
        const { rtcpc } = this.state
        const { RTCClient } = this.props
        rtcpc.createOffer().then((offer) => {
            rtcpc.setLocalDescription(offer)
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then((stream) => stream.getTracks().forEach(track => rtcpc.addTrack(track)))
        }).then(() => {
            let ld = RTCProto.localDescription.create({
                source: this.props.userID,
                target: remoteID,
                sd: rtcpc.localDescription
            })
            RTCClient.exchange(ld)
        }).catch((err) => {
            console.log('offer err:', err)
        })
    }

    answer = (remoteID) => {
        const { rtcpc } = this.state
        const { RTCClient } = this.props
        rtcpc.createAnswer().then(answer => {
            rtcpc.setLocalDescription(answer)
        }).then(() => {
            let ld = RTCProto.localDescription.create({
                source: this.props.userID,
                target: remoteID,
                sd: rtcpc.localDescription
            })
            RTCClient.exchange(ld)
        }).catch(error => {
            console.log('answer error:', error)
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
                <UserPanel users={users} clickHanlder={this.offer} />
                <video id='caller' autoPlay controls muted width='50%'></video>
                <video id='callee' autoPlay controls width='100%'></video>
                <button onClick={this.offer}>播放</button>
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