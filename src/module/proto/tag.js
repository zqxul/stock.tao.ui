import { load, Method } from 'protobufjs'
import proto from './tag.proto'

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