/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as grpc_pb from './grpc_pb';


export class PbUserClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoLogin = new grpcWeb.AbstractClientBase.MethodInfo(
    grpc_pb.PbStockTao,
    (request: grpc_pb.PbLoginRequest) => {
      return request.serializeBinary();
    },
    grpc_pb.PbStockTao.deserializeBinary
  );

  login(
    request: grpc_pb.PbLoginRequest,
    metadata: grpcWeb.Metadata | null): Promise<grpc_pb.PbStockTao>;

  login(
    request: grpc_pb.PbLoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: grpc_pb.PbStockTao) => void): grpcWeb.ClientReadableStream<grpc_pb.PbStockTao>;

  login(
    request: grpc_pb.PbLoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: grpc_pb.PbStockTao) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/User/Login',
        request,
        metadata || {},
        this.methodInfoLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/User/Login',
    request,
    metadata || {},
    this.methodInfoLogin);
  }

  methodInfoRegister = new grpcWeb.AbstractClientBase.MethodInfo(
    grpc_pb.PbStockTao,
    (request: grpc_pb.PbRegisterRequest) => {
      return request.serializeBinary();
    },
    grpc_pb.PbStockTao.deserializeBinary
  );

  register(
    request: grpc_pb.PbRegisterRequest,
    metadata: grpcWeb.Metadata | null): Promise<grpc_pb.PbStockTao>;

  register(
    request: grpc_pb.PbRegisterRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: grpc_pb.PbStockTao) => void): grpcWeb.ClientReadableStream<grpc_pb.PbStockTao>;

  register(
    request: grpc_pb.PbRegisterRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: grpc_pb.PbStockTao) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/User/Register',
        request,
        metadata || {},
        this.methodInfoRegister,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/User/Register',
    request,
    metadata || {},
    this.methodInfoRegister);
  }

}

