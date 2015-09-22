/* globals ZiftrApi */
"use strict";

var _defaultConfig = {};

/**
 * Replaces the default configuration with the specified one.
 *
 * @param {object} config  If present, replaces the default
 *        {@link Configuration|configuration} with this object.
 *
 * @returns {object}  the current (or updated) default configuration.
 */
ZiftrApi.config = function ZiftrApiConfig(config){
  if (config) { _defaultConfig = config; }
  return _defaultConfig;
};

/**
 * Merges the specified config into the default config.
 *
 * @param config [Object]  If present, merges this object with the default
 *                         {@link Configuration|configuration}.
 * @returns  the current (or updated) configuration.
 */
ZiftrApi.mergeConfig = function ZiftrApiMergeConfig(config){
  if (config) { _defaultConfig = ZiftrApi.mergeObjs(_defaultConfig, config); }
  return _defaultConfig;
};

/**
 * @namespace Configuration
 * @property {string} keys.publishable_key
 * @property {string} keys.private_key
 * @property {string} api_version
 * @property {string} api_host
 */
