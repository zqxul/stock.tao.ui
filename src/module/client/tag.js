import { load, Method } from 'protobufjs'
import * as gprc from 'grpc-web'
import proto from './proto/tag.proto'

const TagProto = {
    load: false
}

export function loadTagProto() {
    if (!TagProto.load) {
        console.log('start loading tag.proto')
        load(proto).then(root => {
            TagProto.PbStockTao = root.lookupType('PbStockTao')
            TagProto.PbTagInfo = root.lookupType('PbTagInfo')
            TagProto.PbTagListRequest = root.lookupType('PbTagListRequest')
            TagProto.PbTagMemberRequest = root.lookupType('PbTagMemberRequest')
            TagProto.PbTagMemberResponse = root.lookupType('PbTagMemberResponse')
            TagProto.PbUserInfo = root.lookupType('PbUserInfo')
            TagProto.load = true
            console.log('load tag.proto success')
        }).catch(err => {
            console.log('load tag.proto error:', err)
        })
    }
    return TagProto
}

class Client {

    // load tag.proto
    TagProto = loadTagProto()

    constructor(hostname, credentials, options) {
        if (!options) options = {};
        options['format'] = 'binary';
        this.client = new gprc.GrpcWebClientBase(options)
        this.hostname = hostname
    }

    // login method
    List = (request, metadata) => {
        return this.client.thenableCall(
            this.hostname + '/Tag/List',
            request,
            metadata || {},
            new gprc.MethodDescriptor(
                '/Tag/List',
                'UNARY',
                TagProto.PbTagListRequest,
                TagProto.PbStockTao,
                message => TagProto.PbTagListRequest.encode(message).finish(),
                buffer => {
                    let response = TagProto.PbStockTao.decode(buffer)
                    if (response.data) {
                        response.data = TagProto.PbTagInfo.decode(response.data)
                    }
                    return response
                }
            )
        )
    }

    // register method
    ListMembers = (request, metadata) => {
        return this.client.thenableCall(
            this.hostname + '/Tag/ListMembers',
            request,
            metadata || {},
            new gprc.MethodDescriptor(
                '/Tag/ListMembers',
                'UNARY',
                TagProto.PbTagMemberRequest,
                TagProto.PbStockTao,
                message => TagProto.PbTagMemberRequest.encode(message).finish(),
                buffer => {
                    let response = TagProto.PbStockTao.decode(buffer);
                    if (response.data) {
                        response.data = TagProto.PbTagMemberResponse.decode(response.data)
                    }
                }
            )
        )
    }
}


export const TagClient = new Client('http://localhost:9080')