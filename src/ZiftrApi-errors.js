/* globals ZiftrApi */
"use strict";

var defineError = function _ZiftrApiDefineError(name, defaultData){
  defaultData = defaultData || {};

  var Err = function _ZiftrApiCustomError(message, data, inner, stackTraceContext) {

    if (data instanceof Array || typeof data !== 'object') {
      this.data = data;
    } else {
      var self = this;
      Object.keys(defaultData).forEach(function(key){ self[key] = defaultData[key]; });
      Object.keys(data).forEach(function(key){ self[key] = data[key]; });
    }

    this.name = name;
    if (message) { this.message = message; }
    if (! this.message) { this.message = ''; }

    if (inner instanceof Error) {
      this.inner = inner;
      this.stack = inner.stack;
    }
    else {
      Error.captureStackTrace(this, stackTraceContext || Err);
    }
  };

  Err.prototype = Object.create(Error.prototype, {
    constructor: {
      value: Err,
      writable: true,
      configurable: true
    }
  });

  return Err;
};

ZiftrApi.InvalidConfigError = defineError('ZiftrApiInvalidConfigError');
ZiftrApi.RequestError = defineError('ZiftrApiRequestError');
