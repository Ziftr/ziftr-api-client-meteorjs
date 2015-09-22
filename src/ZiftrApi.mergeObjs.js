/* globals ZiftrApi */
"use strict";

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
ZiftrApi.mergeObjs = function ZiftrApiMergeObjs(/* source, source, ... */){
  var args = Array.prototype.slice.call(arguments);
  var dest = {};

  for (var i = 0; i < args.length; i++) {
    for (var attrName in args[i]) {
      if (args[i].hasOwnProperty(attrName)) {
        dest[attrName] = args[i][attrName];
      }
    }
  }

  return dest;
};
