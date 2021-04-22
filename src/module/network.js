import React from 'react'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"
import { faDotCircle, faFile, faFileExcel, faImage } from '@fortawesome/free-solid-svg-icons'
import { RTCClient, UserClient, GroupClient } from './client/client'
import { RTCProto, UserProto, GroupProto } from "./client/proto/proto"
import './network.css'
import EmojiPanel from './emoji'
export default class NetWorkTab extends React.Component {

    constructor(props) {
        super(props)

        const { localID } = this.props
        let rtcpc = new RTCPeerConnection({
            // iceServers: [{
            //     urls: ['stock.tao']
            // }],
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
        this.state = {
            rtcpc: rtcpc,
            remoteID: null,
            user: {
                groupId: 1
            }
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

    refreshCurrentUser = userID => {
        this.setState({
            selectedUserID: userID
        })
    }

    render() {
        const { selectedUserID, user } = this.state
        let addrGroups = [
            {
                groupId: 1,
                groupName: 'group1'
            },
            {
                groupId: 2,
                groupName: 'group2'
            }
        ]
        return (
            <div className='network tab flex'>
                <AddrBookPanel addrGroups={addrGroups} selectedGroupId={user.groupId} selectedUserId={selectedUserID} selectHandler={this.refreshCurrentUser} />
                <div className='divider' />
                <ChatPanel selectedUserId={selectedUserID} />
            </div>
        )
    }


}

// 通讯录
export class AddrBookPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { addrGroups, selectedUserId, selectedGroupId } = this.props
        return (
            <div className='addrbook panel'>
                <div>Contact</div>
                <div>
                    {addrGroups.map(group => <AddrGroupItem key={group.groupId} selectedUserID={selectedUserId} selectedGroupId={selectedGroupId} group={group} selectHandler={this.props.selectHandler} />)}
                </div>
            </div>
        )
    }
}

// 通讯录-人脉分组
class AddrGroupItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
        this.handleRefresh = this.handleRefresh.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
    }

    async reloadMembers() {
        GroupClient.List({}, {}).then((res) => {
            if (res.code && res.code === 200) {
                this.setState({
                    items: res.data ? res.data : []
                })
            } else {
                alert(res.msg)
            }
        }).catch((err) => {
            if (err) {
                console.log('login error:', err)
            }
        })
    }

    handleRefresh = (e, groupId) => {
        this.reloadMembers(groupId)
        e.preventDefault()
    }

    handleToggle = (e, groupId) => {
        this.handleRefresh(e, groupId)
        // this.setState({
        //     display: true
        // })
    }

    render() {
        const { group } = this.props
        const { items } = this.state
        let addrItemList = items.length > 0 ? items.map(item => <UserItem user={item} selectHandler={this.props.selectHandler} />) : null

        return <div id={group.groupId}>
            <header className='flex'>
                <div>{group.groupName}</div>
                <div className='flex group-menu'>
                    <button onClick={this.handleRefresh.bind(group.groupId)}>refresh</button>
                    <button onClick={this.handleToggle.bind(group.groupId)}>collapse</button>
                </div>
            </header>
            <main>
                {addrItemList}
            </main>
        </div>
    }
}

// 通讯录-人脉分组-成员
class UserItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            style: {

            }
        }
    }

    handleCall = (username) => {
        const { user, clickHanlder } = this.props
        clickHanlder(user.username)
    }

    handleSelect = userID => {
        const { selectHandler } = this.props
        this.setState({
            style: {}
        })
        selectHandler(userID)
    }

    render() {
        const { user } = this.props
        let onlineStyle = user.online === undefined ? null : {
            backGroundColor: user.online ? 'green' : 'gray'
        }
        return (
            <div className='user item flex' onSelect={this.handleSelect}>
                <div className='avatar item'><img src={user.avartar} /></div>
                <div className='nickname' >{user.nickname}</div>
                <div className='online'><Icon icon={faDotCircle} style={onlineStyle} /></div>
                <button onClick={this.handleCall} >Call</button>
            </div>
        )
    }
}

// 聊天
class ChatPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    handleScroll = () => {
        // TODO 
        let records = []
        this.setState({
            records: records
        })

    }

    render() {
        const { selectedUserId } = this.props
        return <div className='chat panel flex flex-column'>
            <HistoryPanel userID={selectedUserId} />
            <InputBoxPanel userID={selectedUserId} />
        </div>
    }
}

// 聊天-历史
class HistoryPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            records: []
        }
    }

    render() {
        const { userID } = this.props;
        // TODO get chat records by userID
        let records = [
            {
                recordId: 1,
                type: 'text',
                text: 'Good morning my neigbor.',
                recordTime: '2021-02-03 12:01'
            },
            {
                recordId: 2,
                type: 'text',
                text: 'Fuck you!',
                recordTime: '2021-02-03 12:02'
            },
            {
                recordId: 3,
                type: 'text',
                text: 'Fuck you too!',
                recordTime: '2021-02-03 12:03'
            }
        ]
        return <div className='history panel flex flex-column flex-4'>
            <div className='history-header'>History</div>
            <div className='history-content'>
                {records.map(record => <ChatRecord key={record.recordId} record={record} />)}
            </div>
        </div>
    }

}

// 聊天-输入框
class InputBoxPanel extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <div className='inputbox panel flex-1'>
            <div className='inputbox-content'>
                <textarea className='inputbox-textarea w-100' placeholder='Please input here' />
                <div className='inputbox-footer flex'>
                    <div className='inputbox-menu flex'>
                        <Icon icon={faImage} />
                        <Icon icon={faFile} />
                        <EmojiPanel />
                    </div>
                    <button className='btn-send'>Send</button>
                </div>
            </div>
        </div>
    }

}

// 聊天-历史-记录
class ChatRecord extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { record } = this.props
        if (record.type === undefined) return null

        let content = null;
        switch (record.type) {
            case 'text':
                content = <div>{record.text}</div>
                break
            case 'audio':
                content = <Audio src={record.url} />
                break
            case 'image':
                content = <Image src={record.url} />
                break
            case 'file':
                content = <File name={record.url} />
                break
            case 'video':
                content = <Image src={record.url} />
                break
            default:
                content = null
        }
        return <div className='chatrecord item'>
            <div>{content}</div>
            <div className='record-time'>{record.recordTime}</div>
        </div>
    }

}
