/* globals CryptoJS, ZiftrApi */
"use strict";

// SHA256_HMAC(
//     data: TIMESTAMP + PUBLIC_KEY + '/' + URL_PATH + URL_QUERY_STRING,
//   secret: SHA256( PRIVATE_KEY ).TO_HEX()
// ).TO_HEX() => SIGNATURE

var getSignatureHash = function _ZiftrApiGetSignatureHash(message, prv_key){

  // Node.JS
  // var sha256 = require('crypto').createHash('sha256');
  // var hashKey = sha256.update(prv_key).digest('hex');
  // var hmac = require('crypto').createHmac('sha256', hashKey);
  // var hashed = hmac.update(message).digest('hex');

  // Meteor
  var hashprv_key = CryptoJS.SHA256(prv_key).toString();
  return CryptoJS.HmacSHA256(message, hashprv_key).toString();
};

var getSignatureTimestamp = function _ZiftrApiGetSignatureTimestamp(time){
  if (time === undefined) { time = new Date(); }
  return Math.floor(time.getTime() / 1000).toString(16);
};

/**
 * Generates a request signature used in the Authentication header for a Ziftr API request.
 *
 * @param {String} path    The path part of the request URI.
 * @param {String} pub_key The public key for the seller account making the request.
 * @param {String} prv_key The private key for the seller account making the request.
 * @param {String} qs      (Optional) The Query String part of the request URI.
 * @param {Date}   time    (Optional) The date and time of the request. Defaults to now.
 */
ZiftrApi.getSignature = function ZiftrApiGetSignature(path, pub_key, prv_key, qs, time){

  if(!prv_key.length) {
    return '';
  }

  if(qs === undefined || qs.length === 0) {
    qs = '';
  }

  var timestamp = getSignatureTimestamp(time);
  var toHash = timestamp + pub_key + '/' + path + qs;
  return timestamp + '/' + getSignatureHash(toHash, prv_key);
};
