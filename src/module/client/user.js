import { load, Method } from 'protobufjs'
import * as gprc from 'grpc-web'
import proto from './proto/user.proto'

const UserProto = {
    load: false
}

export function loadUserProto() {
    if (!UserProto.load) {
        console.log('start loading user.proto')
        load(proto).then(root => {
            UserProto.PbStockTao = root.lookupType('PbStockTao')
            UserProto.PbLoginRequest = root.lookupType('PbLoginRequest')
            UserProto.PbLoginResponse = root.lookupType('PbLoginResponse')
            UserProto.PbRegisterRequest = root.lookupType('PbRegisterRequest')
            UserProto.PbRegisterResponse = root.lookupType('PbRegisterResponse')
            UserProto.load = true
            console.log('load user.proto success')
        }).catch(err => {
            console.log('load user.proto error:', err)
        })
    }
    return UserProto
}

class Client {

    // load user.proto
    UserProto = loadUserProto()

    constructor(hostname, credentials, options) {
        if (!options) options = {};
        options['format'] = 'binary';
        this.client = new gprc.GrpcWebClientBase(options)
        this.hostname = hostname
    }

    // login method
    login = (request, metadata) => {
        return this.client.thenableCall(
            this.hostname + '/User/Login',
            request,
            metadata || {},
            new gprc.MethodDescriptor(
                '/User/Login',
                'UNARY',
                UserProto.PbLoginRequest,
                UserProto.PbStockTao,
                message => UserProto.PbLoginRequest.encode(message).finish(),
                buffer => {
                    let response = UserProto.PbStockTao.decode(buffer)
                    if (response.data) {
                        response.data = UserProto.PbLoginResponse.decode(response.data)
                    }
                    return response
                }
            )
        )
    }

    // register method
    register = (request, metadata) => {
        return this.client.thenableCall(
            this.hostname + '/User/Register',
            request,
            metadata || {},
            new gprc.MethodDescriptor(
                '/User/Register',
                'UNARY',
                UserProto.PbLoginRequest,
                UserProto.PbStockTao,
                message => UserProto.PbRegisterRequest.encode(message).finish(),
                buffer => {
                    let response = UserProto.PbStockTao.decode(buffer);
                    if (response.data) {
                        response.data = UserProto.PbRegisterResponse.decode(response.data)
                    }
                }
            )
        )
    }
}


export const UserClient = new Client('http://localhost:9080')