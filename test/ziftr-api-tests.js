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
