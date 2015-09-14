/* global Package, Npm */
"use strict";

Package.describe({
  name: 'ziftr:ziftr-api',
  version: '0.1.0-beta.1',
  summary: 'ZiftrPAY API package for Meteor',
  git: 'https://github.com/Ziftr/ziftr-api-client-meteorjs',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('ziftr-api.js');
  api.export('ZiftrApi');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ziftr:ziftr-api');
  api.addFiles('ziftr-api-tests.js');
});

Npm.depends({
  "ziftr-api-client-nodejs": "https://github.com/Ziftr/ziftr-api-client-nodejs/archive/6a2b7893913d7216ec2a23d6b142db313114a61d.tar.gz",
});
