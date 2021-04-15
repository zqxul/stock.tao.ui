import { load, Method } from 'protobufjs'
import * as gprc from 'grpc-web'
// @ts-ignore
import proto from './rtc.proto'

const RTCProto = {
    load: false
}

export function loadRTCProto() {
    if (!RTCProto.load) {
        console.log('start loading rtc.proto')
        load(proto).then(root => {
            RTCProto.LocalDescription = root.lookupType('LocalDescription')
            RTCProto.SessionDescription = root.lookupType('SessionDescription')
            RTCProto.RemoteDescription = root.lookupType('RemoteDescription')
            RTCProto.load = true
            console.log('load rtc.proto success')
        }).catch(err => {
            console.log('load rtc.proto error:', err)
        })
    }
    return RTCProto
}

export default class RTCClient {

    // load rtc.proto
    RTCProto = loadRTCProto()

    constructor(hostname, credentials, options) {
        if (!options) options = {};
        options['format'] = 'binary';
        this.client = new gprc.GrpcWebClientBase(options)
        this.hostname = hostname
    }

    // exchange method
    exchange = (ld, metadata, handler) => {
        return this.client.serverStreaming(
            this.hostname + '/rtc',
            ld,
            metadata || {},
            new gprc.MethodDescriptor(
                '/rtc/exchange',
                'STREAM',
                RTCProto.LocalDescription,
                RTCProto.RemoteDescription,
                message => RTCProto.LocalDescription.encode(message).finish(),
                buffer => {
                    let rd = RTCProto.RemoteDescription.decode(buffer)
                    if (rd) {
                        rd.sd = RTCProto.RemoteDescription.decode(rd.sd)
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