import { load, Method } from 'protobufjs'
import * as gprc from 'grpc-web'
// @ts-ignore
import proto from './user.proto'

const UserProto = {
    load: false
}

export function loadUserProto() {
    if (!UserProto.load) {
        console.log('start loading user.proto')
        load(proto).then(root => {
            UserProto.PbStockTao = root.lookupType('PbStockTao')
            UserProto.PbLoginRequest = root.lookupType('PbLoginRequest')
            UserProto.PbRegisterRequest = root.lookupType('PbRegisterRequest')
            UserProto.PbRegisterResponse = root.lookupType('PbRegisterResponse')
            let PbUser = root.lookupService('PbUser')
            let userService = PbUser.create((method, requestData, callback) => {

            }, false, false)
            userService.rpcCall
            UserProto.load = true
            console.log('load user.proto success')
        }).catch(err => {
            console.log('load user.proto error:', err)
        })
    }
    return UserProto
}

export default class UserClient {

    UserProto = loadUserProto()

    constructor(hostname, credentials, options) {
        if (!options) options = {};
        options['format'] = 'binary';
        this.client = new gprc.GrpcWebClientBase(options)
        this.hostname = hostname
    }

    login = (request, metadata, callback) => {
        return this.client.rpcCall(
            this.hostname + '/User/Login',
            request,
            metadata || {},
            new gprc.MethodDescriptor(
                '/User/Login',
                'UNARY',
                UserProto.PbLoginRequest,
                UserProto.PbStockTao,
                message => UserProto.PbLoginRequest.encode(message).finish(),
                buffer => UserProto.PbStockTao.decode(buffer)
            ),
            callback
        )
    }

    promiseLogin = (request, metadata) => {
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
                buffer => UserProto.PbStockTao.decode(buffer)
            )
        )
    }

    register = (request, metadata, callback) => {
        return this.client.rpcCall(
            this.hostname + '/User/Register',
            request,
            metadata || {},
            new gprc.MethodDescriptor(
                '/User/Register',
                'UNARY',
                UserProto.PbLoginRequest,
                UserProto.PbStockTao,
                message => UserProto.PbRegisterRequest.encode(message).finish(),
                buffer => UserProto.PbStockTao.decode(buffer)
            ),
            callback
        )
    }

    promiseRegister = (request, metadata) => {
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
                buffer => UserProto.PbStockTao.decode(buffer)
            )
        )
    }
}



