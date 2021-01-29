import { loadSync } from 'protobufjs'
import { grpc } from 'grpc-web'

var Root = loadSync('./user.proto')

const PbUser = Root.lookupService('PbUser')
const Client = grpc.makeGenericClientConstructor({})


const client = new Client(
    'localhost:8090',
    grpc.credentials.createInsecure()
)
const rpcImpl = function (method, requestData, callback) {
    client.makeUnaryRequest(
        method.name,
        arg => arg,
        arg => arg,
        requestData,
        callback
    )
}
const userService = PbUser.create(rpcImpl, true, true)

export function login(username, passowrd, rememberMe, verifyCode) {
    userService.login({
        username: username,
        passowrd: passowrd,
        rememberMe: rememberMe,
        verifyCode: verifyCode
    }).then((result) => {
        console.log('-------', result)
        console.log('-------', result.code)
        console.log('-------', result.msg)
    }).catch((err) => {
        console.log('------- err:', err)
    });
}



