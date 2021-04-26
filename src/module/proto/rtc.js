import { load, Method } from 'protobufjs'
import proto from './rtc.proto'

const RTCProto = {
    load: false
}

export function loadRTCProto() {
    if (!RTCProto.load) {
        console.log('start loading rtc.proto')
        load(proto).then(root => {
            RTCProto.WebRTCDescription = root.lookupType('WebRTCDescription')
            RTCProto.SessionDescription = root.lookupType('SessionDescription')
            RTCProto.load = true
            console.log('load rtc.proto success')
        }).catch(err => {
            console.log('load rtc.proto error:', err)
        })
    }
    return RTCProto
}