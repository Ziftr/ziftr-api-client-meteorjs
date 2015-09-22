/* globals CryptoJS, ZiftrApi */
"use strict";

var string_to_base64 = function _ZiftrApiStringToBase64(string){
  // return (new Buffer(string)).toString('base64');
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(string));
};

var prase_request_error = function _ZiftrApiParseRequestError(config, error){

  var error_data = {
    configuration: ZiftrApi.mergeObjs(config), // Clone,
    code: error.response.statusCode,
    fields: error.response.data.error.fields,
    // headers: error.response.headers,
    // response: error.response,
  };

  if (error_data.configuration.keys) { delete error_data.configuration.keys; }

  return new ZiftrApi.RequestError(error.response.data.error.message, error_data, null, _ZiftrApiParseRequestError);
};

var requestLog = function _ZiftrApiRequestLog(config /* , message, ... */){
  if (config.debug !== true) { return; }

  var args = Array.prototype.slice.apply(arguments);
  args.shift(); // config
  args.unshift('ZiftrApi');
  console.log.apply(console, args);
};

// ZiftrApi << POST http://sandbox.fpa.bz/orders
requestLog.send = function _ZiftrApiRequestLogSend(config, method, url){
  requestLog(config, '<<', method, url);
};

// ZiftrApi >> POST http://sandbox.fpa.bz/orders >> 301 { <response body> }
requestLog.resp = function _ZiftrApiRequestLogResp(config, method, url, response){
  requestLog(config, '>>', method, url, '>>', response.statusCode, JSON.stringify(response));
};

// ZiftrApi >> POST http://sandbox.fpa.bz/orders >> 301 { <response error> }
requestLog.err = function _ZiftrApiRequestLogErr(config, method, url, err){
  var statusCode = err && (err.statusCode || err.status || err.code);
  requestLog(config, '>>', method, url, '>> Error:', statusCode, err.message, JSON.stringify(err));
};

/**
 * Makes a HTTP request
 *
 * @param {string}  method  The HTTP method for this request, for example
 *                          "GET", "POST", "PATCH", "DELETE"
 * @param {string}  url_path  The path part of the url.
 * @param {object}  options  (optional) A list of options that are merged with
 *                           the config and matches that format.
 * @param {ZiftrApi~requestCallback}  callback  A function that is called when the request completes or errors.
 *
 *
 * @callback ZiftrApi~requestCallback
 * @param {error}  err
 * @param {object}  response
 *
 * @example
 *
 *     ZiftrApi.request('POST', '/orders', function(err, resp){
 *       if (err) {
 *         // there was an error, take some action
 *         return;
 *       }
 *       // No error, get response from `resp`
 *     })
 *
 */
ZiftrApi.request = function ZiftrApiRequest(method, url_path, config, callback){

  check(method, String);
  check(url_path, String);

  if (typeof(options) === "function") {
    callback = config;
    config = {};
  }

  config = ZiftrApi.mergeObjs(ZiftrApi.config(), config);

  // validate that options is present
  if(config === undefined || !config) {
    callback(new ZiftrApi.InvalidConfigError("Missing ZiftrApi configuration"));
    return false;
  }

  // validate that the pub and prv keys are present
  if (config.keys === undefined) {
    callback(new ZiftrApi.InvalidConfigError("Missing ZiftrApi config.keys"));
    return false;
  }

  if (config.keys.publishable_key === undefined) {
    callback(new ZiftrApi.InvalidConfigError("Missing ZiftrApi config.keys.publishable_key"));
    return false;
  }

  if (config.keys.private_key === undefined) {
    callback(new ZiftrApi.InvalidConfigError("Missing ZiftrApi config.keys.private_key"));
    return false;
  }

  // validate that the host version is set, and that we have an api_host
  if(config.api_version === undefined) {
    callback(new ZiftrApi.InvalidConfigError("Missing ZiftrApi config.api_version"));
    return false;
  }

  if(config.api_host === undefined) {
    callback(new ZiftrApi.InvalidConfigError("Missing ZiftrApi config.api_host"));
    return false;
  }

  var accept_version = config.api_version.replace('.','-');
  var url_path_parts = url_path.split('?');
  var qs = url_path_parts.length > 1 ? url_path_parts[1] : '';
  var path = url_path_parts.length > 1 ? url_path_parts[0] + '?' : url_path_parts[0];
  var signature = ZiftrApi.getSignature(path, config.keys.publishable_key, config.keys.private_key, qs);

  var request_headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.ziftr.fpa-' + accept_version + '+json',
    'Authorization': 'Basic ' + string_to_base64(config.keys.publishable_key + ':' + signature),
    'User-Agent': 'Ziftr%20API%Meteor%20Client%20'+ ZiftrApi.getVersion(),
  };

  var url = config.api_host + url_path;

  var request_options = {
    uri: config.api_host + url_path,
    headers: request_headers,
    timeout: 10000, // milliseconds
    npmRequestOptions: {
      resolveWithFullResponse: true,
    },
  };

  if(config.data !== undefined) {
    request_options.data = config.data;
  }

  requestLog.send(config, method, url);

  if (typeof(callback) === 'function') {
    // Run asynchronously

    HTTP.call(method, url, request_options, function(error, response){
      if (error) {
        var parsedErr = prase_request_error(config, error);
        requestLog.err(config, method, url, parsedErr);
        return callback(parsedErr);
      }

      requestLog.resp(config, method, url, response);

      return callback(null, response);
    });

  }
  else {
    // Run synchronously

    try {
      var response = HTTP.call(method, url, request_options);
      requestLog.resp(config, method, url, response);
      return response;
    }
    catch(err){
      var parsedErr = prase_request_error(config, err);
      requestLog.err(config, method, url, parsedErr);
      throw parsedErr;
    }
  }

};

/**
 * Makes a GET HTTP request
 *
 * @param {string}  url_path  The path part of the url.
 * @param {object}  options  (optional) A list of options that are merged with
 *                           the config and matches that format.
 * @param {ZiftrApi~requestCallback}  callback  A function that is called when the request completes or errors.
 */
ZiftrApi.get = function ZiftrApiGetRequest(url_path, config, callback){
  return ZiftrApi.request('GET', url_path, config, callback);
};

/**
 * Makes a POST HTTP request
 *
 * @param {string}  url_path  The path part of the url.
 * @param {object}  options  (optional) A list of options that are merged with
 *                           the config and matches that format.
 * @param {ZiftrApi~requestCallback}  callback  A function that is called when the request completes or errors.
 */
ZiftrApi.post = function ZiftrApiPostRequest(url_path, config, callback){
  return ZiftrApi.request('POST', url_path, config, callback);
};

/**
 * Makes a PATCH HTTP request
 *
 * @param {string}  url_path  The path part of the url.
 * @param {object}  options  (optional) A list of options that are merged with
 *                           the config and matches that format.
 * @param {ZiftrApi~requestCallback}  callback  A function that is called when the request completes or errors.
 */
ZiftrApi.patch = function ZiftrApiPatchRequest(url_path, config, callback){
  return ZiftrApi.request('PATCH', url_path, config, callback);
};

/**
 * Makes a DELETE HTTP request
 *
 * @param {string}  url_path  The path part of the url.
 * @param {object}  options  (optional) A list of options that are merged with
 *                           the config and matches that format.
 * @param {ZiftrApi~requestCallback}  callback  A function that is called when the request completes or errors.
 */
ZiftrApi.delete = function ZiftrApiDeleteRequest(url_path, config, callback){
  return ZiftrApi.request('DELETE', url_path, config, callback);
};
