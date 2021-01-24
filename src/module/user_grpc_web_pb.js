/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js')
const proto = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.PbUserClient =
  function (hostname, credentials, options) {
    if (!options) options = {};
    options['format'] = 'binary';

    /**
     * @private @const {!grpc.web.GrpcWebClientBase} The client
     */
    this.client_ = new grpc.web.GrpcWebClientBase(options);

    /**
     * @private @const {string} The hostname
     */
    this.hostname_ = hostname;

  };


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.PbUserPromiseClient =
  function (hostname, credentials, options) {
    if (!options) options = {};
    options['format'] = 'binary';

    /**
     * @private @const {!grpc.web.GrpcWebClientBase} The client
     */
    this.client_ = new grpc.web.GrpcWebClientBase(options);

    /**
     * @private @const {string} The hostname
     */
    this.hostname_ = hostname;

  };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.PbLoginRequest,
 *   !proto.PbStockTao>}
 */
const methodDescriptor_PbUser_Login = new grpc.web.MethodDescriptor(
  '/User/Login',
  grpc.web.MethodType.UNARY,
  proto.PbLoginRequest,
  proto.PbStockTao,
  /**
   * @param {!proto.PbLoginRequest} request
   * @return {!Uint8Array}
   */
  function (request) {
    return request.serializeBinary();
  },
  proto.PbStockTao.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.PbLoginRequest,
 *   !proto.PbStockTao>}
 */
const methodInfo_PbUser_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.PbStockTao,
  /**
   * @param {!proto.PbLoginRequest} request
   * @return {!Uint8Array}
   */
  function (request) {
    return request.serializeBinary();
  },
  proto.PbStockTao.deserializeBinary
);


/**
 * @param {!proto.PbLoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.PbStockTao)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.PbStockTao>|undefined}
 *     The XHR Node Readable Stream
 */
proto.PbUserClient.prototype.login =
  function (request, metadata, callback) {
    return this.client_.rpcCall(this.hostname_ +
      '/User/Login',
      request,
      metadata || {},
      methodDescriptor_PbUser_Login,
      callback);
  };


/**
 * @param {!proto.PbLoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.PbStockTao>}
 *     Promise that resolves to the response
 */
proto.PbUserPromiseClient.prototype.login =
  function (request, metadata) {
    return this.client_.unaryCall(this.hostname_ +
      '/User/Login',
      request,
      metadata || {},
      methodDescriptor_PbUser_Login);
  };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.PbRegisterRequest,
 *   !proto.PbStockTao>}
 */
const methodDescriptor_PbUser_Register = new grpc.web.MethodDescriptor(
  '/User/Register',
  grpc.web.MethodType.UNARY,
  proto.PbRegisterRequest,
  proto.PbStockTao,
  /**
   * @param {!proto.PbRegisterRequest} request
   * @return {!Uint8Array}
   */
  function (request) {
    return request.serializeBinary();
  },
  proto.PbStockTao.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.PbRegisterRequest,
 *   !proto.PbStockTao>}
 */
const methodInfo_PbUser_Register = new grpc.web.AbstractClientBase.MethodInfo(
  proto.PbStockTao,
  /**
   * @param {!proto.PbRegisterRequest} request
   * @return {!Uint8Array}
   */
  function (request) {
    return request.serializeBinary();
  },
  proto.PbStockTao.deserializeBinary
);


/**
 * @param {!proto.PbRegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.PbStockTao)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.PbStockTao>|undefined}
 *     The XHR Node Readable Stream
 */
proto.PbUserClient.prototype.register =
  function (request, metadata, callback) {
    return this.client_.rpcCall(this.hostname_ +
      '/User/Register',
      request,
      metadata || {},
      methodDescriptor_PbUser_Register,
      callback);
  };


/**
 * @param {!proto.PbRegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.PbStockTao>}
 *     Promise that resolves to the response
 */
proto.PbUserPromiseClient.prototype.register =
  function (request, metadata) {
    return this.client_.unaryCall(this.hostname_ +
      '/User/Register',
      request,
      metadata || {},
      methodDescriptor_PbUser_Register);
  };


module.exports = proto;

