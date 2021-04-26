import * as gprc from 'grpc-web'
import { UserProto } from '../proto/proto'

class Client {

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