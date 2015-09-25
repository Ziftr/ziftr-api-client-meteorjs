/* globals ZiftrApi */
"use strict";

ZiftrApi.Logger = function ZiftrApiLogger(config){
  this._internal = {};
  this._internal.config = config || {};
};

/**
 * Writes a log message to the output stream (console.log)
 *
 * @param {...string}  message  The message(s) to write.
 */
ZiftrApi.Logger.prototype.write = function ZiftrApiLoggerWrite(){
  if (! this.isDebug()) { return; }

  var args = Array.prototype.slice.apply(arguments);
  args.unshift('ZiftrApi');
  this._write.apply(this, args);
};

/// Writes the message to the log. Added for easy overriding.
ZiftrApi.Logger.prototype._write = function ZiftrApiLogger_Write(){
  console.log.apply(console, arguments);
};

/// Returns a value indicating if debug is enabled in the configuration.
ZiftrApi.Logger.prototype.isDebug = function ZiftrApiLoggerIsDebug(){
  return this.config().debug === true;
};

/// Gets or sets this loggers configuration
ZiftrApi.Logger.prototype.config = function ZiftrApiLoggerConfig(config){
  if (config) { this._internal.config = config; }
  return ZiftrApi.mergeObjs(ZiftrApi.config(), this._internal.config);
};

ZiftrApi.Logger.prototype.onRequestSend = function ZiftrApiLoggerOnRequestSend(method, url, req_body){
  this.write('<<', method, url, req_body ? JSON.stringify(req_body) : '{}');
};

ZiftrApi.Logger.prototype.onRequestResp = function ZiftrApiLoggerOnRequestResp(method, url, resp){
  this.write(method, url, '>>', resp.statusCode, JSON.stringify(resp.data));
};

ZiftrApi.Logger.prototype.onRequestErr = function ZiftrApiLoggerOnRequestResp(method, url, err){
  var statusCode = err && (err.statusCode || err.status || err.code);
  this.write(method, url, '>> Error:', statusCode, err.message, JSON.stringify(err));
};

ZiftrApi.logger = new ZiftrApi.Logger();
