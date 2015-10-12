/* globals CryptoJS, ZiftrApi */
"use strict";

var string_to_base64 = function _ZiftrApiStringToBase64(string){
  // return (new Buffer(string)).toString('base64');
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(string));
};

var prase_request_error = function _ZiftrApiParseRequestError(config, error){

  var error_data = {
    configuration: JSON.parse(JSON.stringify(config)), // deep clone,
    code: error.response.statusCode,
    fields: ( error.response.data &&
              error.response.data.error &&
              error.response.data.error.fields ),
  };

  // Intentionally obfuscate keys, but only if they are included
  if (error_data.configuration.keys) {
    if (error_data.configuration.keys.publishable_key) {
      error_data.configuration.keys.publishable_key = 'pub_********************************';
    }
    if (error_data.configuration.keys.private_key) {
      error_data.configuration.keys.private_key = 'prv_****************************************************************';
    }
  }

  var message = 'No response from api';
  if (error.response.data && error.response.data.error) {
    message = error.response.data.error.message;
    if (error_data.fields) {
      message += '; fields: '+JSON.stringify(error_data.fields);
    }
  }

  return new ZiftrApi.RequestError(message, error_data, null, _ZiftrApiParseRequestError);
};

var normalize_url = function _ZiftrApiNormalizeUrl(url) {
  return url
    .replace(/[\/]+/g, '/')
    .replace(/\/\?/g, '?')
    .replace(/\/\#/g, '#')
    .replace(/\:\//g, '://');
};

/**
 * Makes a HTTP request
 *
 * @param {string}  method  The HTTP method for this request, for example
 *                          "GET", "POST", "PATCH", "DELETE"
 * @param {string}  url_path  The path and query string part of the url.
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
  config = JSON.parse(JSON.stringify(config)); // deep clone

  var on_error = function ZiftrApiRequestOnError(err){
    if (typeof(callback) === 'function') {
      callback(err);
      return false;
    }
    else {
      throw err;
    }
  };

  // validate that options is present
  if(config === undefined || !config) {
    return on_error(new ZiftrApi.InvalidConfigError("Missing ZiftrApi configuration"));
  }

  // validate that the pub and prv keys are present
  if (config.keys === undefined) {
    return on_error(new ZiftrApi.InvalidConfigError("Missing ZiftrApi config.keys"));
  }

  if (config.keys.publishable_key === undefined) {
    return on_error(new ZiftrApi.InvalidConfigError("Missing ZiftrApi config.keys.publishable_key"));
  }

  if (config.keys.private_key === undefined) {
    return on_error(new ZiftrApi.InvalidConfigError("Missing ZiftrApi config.keys.private_key"));
  }

  // validate that the host version is set, and that we have an api_host
  if(config.api_version === undefined) {
    return on_error(new ZiftrApi.InvalidConfigError("Missing ZiftrApi config.api_version"));
  }

  if(config.api_host === undefined) {
    return on_error(new ZiftrApi.InvalidConfigError("Missing ZiftrApi config.api_host"));
  }

  url_path = ('/' + normalize_url(url_path)).replace(/^\/+/g, '/');

  var accept_version = config.api_version.replace('.','-');
  var request_time = new Date();
  var signature = ZiftrApi.getSignature(url_path, config.keys.publishable_key, config.keys.private_key, request_time);

  var request_headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.ziftr.fpa-' + accept_version + '+json',
    'Authorization': 'Basic ' + string_to_base64(config.keys.publishable_key + ':' + signature),
    'User-Agent': 'Ziftr%20API%Meteor%20Client%20'+ ZiftrApi.getVersion(),
  };

  ZiftrApi.logger.write('#request url_path (normalized) =>', url_path);
  ZiftrApi.logger.write('#request time =>', request_time);
  ZiftrApi.logger.write('#request signature =>', signature);
  ZiftrApi.logger.write('#request header[ Accept ] => ', request_headers.Accept);

  var url = config.api_host + url_path;
  url = normalize_url(url);

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

  ZiftrApi.logger.onRequestSend(method, url, request_options.data);

  if (typeof(callback) === 'function') {
    // Run asynchronously

    HTTP.call(method, url, request_options, function(error, response){
      if (error) {
        var parsedErr = prase_request_error(config, error);
        ZiftrApi.logger.onRequestErr(method, url, parsedErr);
        return callback(parsedErr);
      }

      ZiftrApi.logger.onRequestResp(method, url, response);

      return callback(null, response);
    });

  }
  else {
    // Run synchronously

    try {
      var response = HTTP.call(method, url, request_options);
      ZiftrApi.logger.onRequestResp(method, url, response);
      return response;
    }
    catch(err){
      var parsedErr = prase_request_error(config, err);
      ZiftrApi.logger.onRequestErr(method, url, parsedErr);
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
