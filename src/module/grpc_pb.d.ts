import * as jspb from 'google-protobuf'

import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';


export class PbStockTao extends jspb.Message {
  getCode(): number;
  setCode(value: number): PbStockTao;

  getMsg(): string;
  setMsg(value: string): PbStockTao;

  getData(): google_protobuf_any_pb.Any | undefined;
  setData(value?: google_protobuf_any_pb.Any): PbStockTao;
  hasData(): boolean;
  clearData(): PbStockTao;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PbStockTao.AsObject;
  static toObject(includeInstance: boolean, msg: PbStockTao): PbStockTao.AsObject;
  static serializeBinaryToWriter(message: PbStockTao, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PbStockTao;
  static deserializeBinaryFromReader(message: PbStockTao, reader: jspb.BinaryReader): PbStockTao;
}

export namespace PbStockTao {
  export type AsObject = {
    code: number,
    msg: string,
    data?: google_protobuf_any_pb.Any.AsObject,
  }
}

export class PbRegisterRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): PbRegisterRequest;

  getPassword(): string;
  setPassword(value: string): PbRegisterRequest;

  getEmail(): string;
  setEmail(value: string): PbRegisterRequest;

  getNickname(): string;
  setNickname(value: string): PbRegisterRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PbRegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PbRegisterRequest): PbRegisterRequest.AsObject;
  static serializeBinaryToWriter(message: PbRegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PbRegisterRequest;
  static deserializeBinaryFromReader(message: PbRegisterRequest, reader: jspb.BinaryReader): PbRegisterRequest;
}

export namespace PbRegisterRequest {
  export type AsObject = {
    username: string,
    password: string,
    email: string,
    nickname: string,
  }
}

export class PbLoginRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): PbLoginRequest;

  getPassword(): string;
  setPassword(value: string): PbLoginRequest;

  getVerifycode(): string;
  setVerifycode(value: string): PbLoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PbLoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PbLoginRequest): PbLoginRequest.AsObject;
  static serializeBinaryToWriter(message: PbLoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PbLoginRequest;
  static deserializeBinaryFromReader(message: PbLoginRequest, reader: jspb.BinaryReader): PbLoginRequest;
}

export namespace PbLoginRequest {
  export type AsObject = {
    username: string,
    password: string,
    verifycode: string,
  }
}

