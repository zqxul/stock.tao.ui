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

    // login method
    send = (ld, metadata) => {
        return this.client.thenableCall(
            this.hostname + '/rtc',
            ld,
            metadata || {},
            new gprc.MethodDescriptor(
                '/rtc',
                'UNARY',
                RTCProto.LocalDescription,
                RTCProto.PbStockTao,
                message => RTCProto.LocalDescription.encode(message).finish(),
                buffer => {
                    let rd = RTCProto.RemoteDescription.decode(buffer)
                    if (rd) {
                        rd.sd = RTCProto.RemoteDescription.decode(rd.sd)
                    }
                    return rd
                }
            )
        )
    }

    // register method
    register = (request, metadata) => {
        return this.client.thenableCall(
            this.hostname + '/rtc',
            request,
            metadata || {},
            new gprc.MethodDescriptor(
                '/User/Register',
                'UNARY',
                RTCProto.PbLoginRequest,
                RTCProto.PbStockTao,
                message => RTCProto.PbRegisterRequest.encode(message).finish(),
                buffer => {
                    let response = RTCProto.PbStockTao.decode(buffer);
                    if (response.data) {
                        response.data = RTCProto.PbRegisterResponse.decode(response.data)
                    }
                }
            )
        )
    }
}