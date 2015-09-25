/* globals CryptoJS, ZiftrApi */
"use strict";

// SHA256_HMAC(
//     data: TIMESTAMP + PUBLIC_KEY + '/' + URL_PATH + URL_QUERY_STRING,
//   secret: SHA256( PRIVATE_KEY ).TO_HEX()
// ).TO_HEX() => SIGNATURE

var getSignatureHash = function _ZiftrApiGetSignatureHash(message, prv_key){
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
 * @param {String} path    The path part of the request URI including query string.
 * @param {String} pub_key The public key for the seller account making the request.
 * @param {String} prv_key The private key for the seller account making the request.
 * @param {Date}   time    (Optional) The date and time of the request. Defaults to now.
 */
ZiftrApi.getSignature = function ZiftrApiGetSignature(path, pub_key, prv_key, time){

  if(prv_key == null || prv_key.length === 0) {
    return '';
  }

  var timestamp = getSignatureTimestamp(time);
  var toHash = timestamp + pub_key + path;
  return timestamp + '/' + getSignatureHash(toHash, prv_key);
};

// Node code used to compare outputs
/*

var getSignatureNode = function _ZiftrApiGetSignatureNode(path, pub_key, prv_key, time){
  / * global Buffer, require * /
  var crypto = require('crypto');
  var key_signature = '';

  if ( path && prv_key ) {

    var shasum  = crypto.createHash('sha256');

    var prvHash = shasum.update(prv_key).digest('hex');

    time = Math.floor((( time || Date.now() ) / 1000)).toString(16);

    var toHash = time.toString(16) + pub_key + path;
    var hmac  = crypto.createHmac('sha256',prvHash);
    var calculatedHash = hmac.update(toHash).digest('hex');

    key_signature = time + '/' + calculatedHash;
  }

  return key_signature;
};

// */
