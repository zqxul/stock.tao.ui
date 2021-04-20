import { load, Method } from 'protobufjs'
import * as gprc from 'grpc-web'
import proto from './proto/group.proto'

const GroupProto = {
    load: false
}

export function loadGroupProto() {
    if (!GroupProto.load) {
        console.log('start loading group.proto')
        load(proto).then(root => {
            GroupProto.PbStockTao = root.lookupType('PbStockTao')
            GroupProto.PbGroupInfo = root.lookupType('PbGroupInfo')
            GroupProto.PbGroupMemberRequest = root.lookupType('PbGroupMemberRequest')
            GroupProto.PbGroupMemberResponse = root.lookupType('PbGroupMemberResponse')
            GroupProto.PbUserInfo = root.lookupType('PbUserInfo')
            GroupProto.load = true
            console.log('load group.proto success')
        }).catch(err => {
            console.log('load group.proto error:', err)
        })
    }
    return GroupProto
}

class Client {

    // load group.proto
    GroupProto = loadGroupProto()

    constructor(hostname, credentials, options) {
        if (!options) options = {};
        options['format'] = 'binary';
        this.client = new gprc.GrpcWebClientBase(options)
        this.hostname = hostname
    }

    // login method
    List = (request, metadata) => {
        return this.client.thenableCall(
            this.hostname + '/Group/List',
            request,
            metadata || {},
            new gprc.MethodDescriptor(
                '/Group/List',
                'UNARY',
                GroupProto.PbLoginRequest,
                GroupProto.PbStockTao,
                message => GroupProto.PbLoginRequest.encode(message).finish(),
                buffer => {
                    let response = GroupProto.PbStockTao.decode(buffer)
                    if (response.data) {
                        response.data = GroupProto.PbGroupInfo.decode(response.data)
                    }
                    return response
                }
            )
        )
    }

    // register method
    ListMembers = (request, metadata) => {
        return this.client.thenableCall(
            this.hostname + '/Group/ListMembers',
            request,
            metadata || {},
            new gprc.MethodDescriptor(
                '/Group/ListMembers',
                'UNARY',
                GroupProto.PbGroupMemberRequest,
                GroupProto.PbStockTao,
                message => UserProto.PbGroupMemberRequest.encode(message).finish(),
                buffer => {
                    let response = GroupProto.PbStockTao.decode(buffer);
                    if (response.data) {
                        response.data = GroupProto.PbGroupMemberResponse.decode(response.data)
                    }
                }
            )
        )
    }
}


export const GroupClient = new Client('http://localhost:9080')