/* globals Npm, ZiftrApi: true */
"use strict";

var nodeApi = Npm.require('ziftr-api-client-nodejs');

ZiftrApi = {};

/**
 * Makes a HTTP GET request to the API server and returns a promise object.
 *
 * @param url_path  The path of the request, excluding the protocol and domain
 *                  specified in the config.
 * @param config    The configuration to merge with the defualt configuration
 *                  and is used as the requestion options.
 *
 * @returns  A promise that is fulfilled when the request completes or rejected
 *           if the request fails.
 */
ZiftrApi.get = function(url_path, config) {
  nodeApi.get(url_path, ZiftrApi.mergeObjs(ZiftrApi.config(), config));
};

/**
 * Makes a HTTP POST request to the API server and returns a promise object.
 *
 * @param url_path  The path of the request, excluding the protocol and domain
 *                  specified in the config.
 * @param config    The configuration to merge with the defualt configuration
 *                  and is used as the requestion options.
 *
 * @returns  A promise that is fulfilled when the request completes or rejected
 *           if the request fails.
 */
ZiftrApi.post = function(url_path, config) {
  nodeApi.post(url_path, ZiftrApi.mergeObjs(ZiftrApi.config(), config));
};

/**
 * Makes a HTTP PATCH request to the API server and returns a promise object.
 *
 * @param url_path  The path of the request, excluding the protocol and domain
 *                  specified in the config.
 * @param config    The configuration to merge with the defualt configuration
 *                  and is used as the requestion options.
 *
 * @returns  A promise that is fulfilled when the request completes or rejected
 *           if the request fails.
 */
ZiftrApi.patch = function(url_path, config) {
  nodeApi.patch(url_path, ZiftrApi.mergeObjs(ZiftrApi.config(), config));
};

/**
 * Makes a HTTP DELETE request to the API server and returns a promise object.
 *
 * @param url_path  The path of the request, excluding the protocol and domain
 *                  specified in the config.
 * @param config    The configuration to merge with the defualt configuration
 *                  and is used as the requestion options.
 *
 * @returns  A promise that is fulfilled when the request completes or rejected
 *           if the request fails.
 */
ZiftrApi.delete = function(url_path, config) {
  nodeApi.delete(url_path, ZiftrApi.mergeObjs(ZiftrApi.config(), config));
};

var _defaultConfig = {};

/**
 * Replaces the default configuration with the specified one.
 *
 * @param config [Object]  If present, replaces the default configuration with
 *                         this object.
 *
 * @returns  the current (or updated) default configuration.
 */
ZiftrApi.config = function(config){
  if (config) { _defaultConfig = config; }
  return _defaultConfig;
};

/**
 * Merges the specified config into the default config.
 *
 * @param config [Object]  If present, merges this object with the default
 *                         configuration.
 * @returns  the current (or updated) configuration.
 */
ZiftrApi.mergeConfig = function(config){
  if (config) { _defaultConfig = ZiftrApi.mergeObjs(_defaultConfig, config); }
  return _defaultConfig;
};

/**
 * Performs a shallow merge of one or more source objects into a new object
 *
 * @param sources  Each property from each argument is merged together into a
 *                 destination object and returned. Later arguments override
 *                 previous ones.
 *
 * @returns the new merged object
 *
 * @example
 *     var src1 = { a: 'src1', a: 'src1' };
 *     var src2 = {            b: 'src2', c: 'src2' };
 *     ZiftrApi.mergeObjs(src1, src2);
 *     // => { a: 'src1', b: 'src2', c: 'src2' }
 */
ZiftrApi.mergeObjs = function(/* source, source, ... */){
  var args = Array.prototype.slice.call(arguments);
  var dest = {};

  for (var i in args) {
    for (var attrName in args[i]) {
      dest[attrName] = args[i][attrName];
    }
  }

  return dest;
};
