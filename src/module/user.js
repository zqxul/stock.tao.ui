import { load } from 'protobufjs'
import * as gprc from 'grpc-web'

export const UserProto = {}
load('./user.proto').then(root => {
    UserProto.PbStockTao = root.lookupType('PbStockTao')
    UserProto.PbLoginRequest = root.lookupType('PbLoginRequest')
    UserProto.PbRegisterRequest = root.lookupType('PbRegisterRequest')
    UserProto.PbRegisterResponse = root.lookupType('PbRegisterResponse')
    console.log('load user.proto success')
}).catch((err) => {
    console.log('load user.proto error:', err)
})

export default class UserClient {

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
                null,
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
                null,
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
                null,
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
                null,
                UserProto.PbLoginRequest,
                UserProto.PbStockTao,
                message => UserProto.PbRegisterRequest.encode(message).finish(),
                buffer => UserProto.PbStockTao.decode(buffer)
            )
        )
    }
}



