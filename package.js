/* global Package, Npm */
"use strict";

Package.describe({
  name: 'ziftr:ziftr-api',

  // Also update ZiftrApi.getVersion.js file when the version changes
  version: '0.1.0-beta.3',

  summary: 'ZiftrPAY API package for Meteor',
  git: 'https://github.com/Ziftr/ziftr-api-client-meteorjs',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('jparker:crypto-core@0.1.0', 'server');
  api.use('jparker:crypto-base64@0.1.0', 'server');
  api.use('jparker:crypto-hmac@0.1.0', 'server');
  api.use('jparker:crypto-sha256@0.1.1', 'server');
  api.use('http@1.1.0', 'server');
  api.addFiles('src/ZiftrApi.js', 'server');
  api.addFiles('src/ZiftrApi.config.js', 'server');
  api.addFiles('src/ZiftrApi.getSignature.js', 'server');
  api.addFiles('src/ZiftrApi.getVersion.js', 'server');
  api.addFiles('src/ZiftrApi.mergeObjs.js', 'server');
  api.addFiles('src/ZiftrApi.request.js', 'server');
  api.addFiles('src/ZiftrApi-errors.js', 'server');
  api.export('ZiftrApi', 'server');
});

// Package.onTest(function(api) {
//   api.use('tinytest');
//   api.use('ziftr:ziftr-api');
//   api.addFiles('src/ziftr-api-tests.js', 'server');
// });

// Npm.depends({
// //   "ziftr-api-client-nodejs": "https://github.com/Ziftr/ziftr-api-client-nodejs/archive/6a2b7893913d7216ec2a23d6b142db313114a61d.tar.gz",
// });
