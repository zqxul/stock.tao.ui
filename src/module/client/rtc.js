import * as gprc from 'grpc-web'
import { RTCProto } from '../proto/proto'

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