import { load, Method } from 'protobufjs'
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