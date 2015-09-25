/* global Tinytest, ZiftrApi */
"use strict";

Tinytest.add('has ZiftrApi', function (test) {
  test.isTrue(ZiftrApi);
});

Tinytest.add('has methods', function (test) {
  test.isTrue(ZiftrApi.get);
  test.isTrue(ZiftrApi.post);
  test.isTrue(ZiftrApi.patch);
  test.isTrue(ZiftrApi.delete);
});

Tinytest.add('ZiftrApi.getSignature', function(test){

  // new Date(1450000000000) => Sun Dec 13 2015 04:46:40 GMT-0500 (EST)

  test.equal( ZiftrApi.getSignature(null, null, null, new Date(1450000000000)), '' );
  test.equal( ZiftrApi.getSignature('orders', null, null, new Date(1450000000000)), '' );
  test.equal( ZiftrApi.getSignature('orders', 'pub_xxxx', null, new Date(1450000000000)), '' );

  test.equal( ZiftrApi.getSignature('orders', 'pub_xxxx', 'prv_xxxx', new Date(1450000000000)),
    '566d3e80/9cc65798a300dc715fa093610e204e7d87af50bf26e558f1537a417136e3ef09' );

  test.equal( ZiftrApi.getSignature('aaaaaaaaaaa', 'pub_xxxxxxxxx', 'prv_xxxxxxxxx', new Date(1450000000000)),
    '566d3e80/461d1d6c191b01a08b08da0284d71271ed4d9eb5b4b8726f83248fcb50cb7c99' );

});
