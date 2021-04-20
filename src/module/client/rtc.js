import { load, Method } from 'protobufjs'
import * as gprc from 'grpc-web'
import proto from './proto/rtc.proto'

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

class Client {

    constructor(hostname, credentials, options) {
        if (!options) options = {};
        options['format'] = 'binary';
        this.client = new gprc.GrpcWebClientBase(options)
        this.hostname = hostname
    }

    // exchange method
    exchange = (ld, metadata, handler) => {
        return this.client.serverStreaming(
            this.hostname + '/RTC/Exchange',
            ld,
            metadata || {},
            new gprc.MethodDescriptor(
                '/RTC/Exchange',
                'STREAM',
                RTCProto.WebRTCDescription,
                RTCProto.WebRTCDescription,
                message => RTCProto.WebRTCDescription.encode(message).finish(),
                buffer => {
                    let rd = RTCProto.WebRTCDescription.decode(buffer)
                    if (rd) {
                        rd.sd = RTCProto.WebRTCDescription.decode(rd.sd)
                    }
                    return rd
                }
            )
        ).on('data', rd => {
            if (rd.icd) {
                const icd = new RTCIceCandidate(rd.icd)
                rtcpc.addIceCandidate(icd)
            }
            if (rd.sd) {
                const sd = new RTCSessionDescription(rd.sd)
                rtcpc.setRemoteDescription(sd)
            }
            handler(rd)
        })
    }
}

export const RTCClient = new Client('http://localhost:9080')