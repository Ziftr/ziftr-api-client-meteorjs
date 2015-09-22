"use strict";

var getPackageName = function(globalName, global){
  for (var packageName in Package) {
    if(Package[packageName] && Package[packageName].globalName === global) {
      return packageName;
    }
  }
};

var getPackage = function(packageName){
  return Package[packageName];
};

Meteor.setTimeout(function(){

  // var inspectKeys = function(name, obj){
  //   for (var key in obj) {
  //     console.log(name+'[',key,']', '(', typeof(obj[key]), ')' );
  //   }
  // };

  var isPackageGlobal = function(obj){

    for (var packageName in Package) {
      for (var key in Package[packageName]) {
        if ( Package[packageName][key] === obj ) {
          return packageName;
        }
      }
    }

    return false;
  };

  var eachFrom = function(obj, fn) {

    for (var key in obj) {
      var value = obj[key];
      var packageName;

      if (value === global) {}
      else if (value === lodash) {}
      else if (value === process) {}
      else if (value === console) {}
      else if (value === ArrayBuffer) {}
      else if (value === Int8Array) {}
      else if (value === Uint8Array) {}
      else if (value === Uint8ClampedArray) {}
      else if (value === Int16Array) {}
      else if (value === Uint16Array) {}
      else if (value === Int32Array ) {}
      else if (value === Uint32Array ) {}
      else if (value === Float32Array ) {}
      else if (value === Float64Array ) {}
      // else if (typeof(value) === 'function') {}
      else if (value instanceof Meteor.Collection) {
        fn(value, key, "Collection");
        // console.log(lodash.padRight(typeof(value), 10), ':', lodash.padRight('Collection', 28), ':', key);
      }
      else if ( ( packageName = isPackageGlobal(value) ) !== false) {
        fn(value, key, packageName);
        // console.log(lodash.padRight(typeof(value), 10), ':', lodash.padRight(packageName, 28), ':', key);
      }
      else {
        fn(value, key);
        // console.log(lodash.padRight(typeof(value), 41), ':', key);
      }
    }

  };

  var listSomeGlobals = function(){

    eachFrom(global, function(gVal, gKey, gContext){
      console.log(lodash.padRight(typeof(gVal), 10), ':', lodash.padRight(gContext, 30), ':', gKey);
      eachFrom(gVal, function(ggVal, ggKey, ggContext){
        console.log(lodash.padRight(typeof(ggVal), 10), ':', lodash.padRight(ggContext, 30), ':', gKey+'.'+ggKey);
      });
    });

    // for (var key in global) {
    //   var g = global[key];
    //   var packageName;

    //   if (g === global) {}
    //   // else if (g === process) {}
    //   // else if (g === console) {}
    //   // else if (typeof(g) === 'function') {}
    //   else if (g instanceof Meteor.Collection) {
    //     console.log(lodash.padRight(typeof(g), 10), ':', lodash.padRight('Collection', 28), ':', key);
    //   }
    //   else if ( ( packageName = isPackageGlobal(g) ) !== false) {
    //     console.log(lodash.padRight(typeof(g), 10), ':', lodash.padRight(packageName, 28), ':', key);
    //   }
    //   else {
    //     console.log(lodash.padRight(typeof(g), 41), ':', key);
    //   }
    // }
  };

  listSomeGlobals();

  // _ ( function )
  // __meteor_bootstrap__ ( object )
  // __meteor_bootstrap__[ configJson ] ( object )
  // __meteor_bootstrap__[ serverDir ] ( string )
  // __meteor_bootstrap__[ startupHooks ] ( object )
  // __meteor_runtime_config__ ( object )
  // __meteor_runtime_config__[ appId ] ( string )
  // __meteor_runtime_config__[ meteorRelease ] ( string )
  // __meteor_runtime_config__[ ROOT_URL ] ( string )
  // __meteor_runtime_config__[ ROOT_URL_PATH_PREFIX ] ( string )
  // Accounts ( object )
  // ActionItems ( object )
  // ActionItemsDoc ( function )
  // ActiveRoute ( object )
  // ArrayBuffer ( function )
  // Blaze ( object )
  // Buffer ( function )
  // check ( function )
  // clearImmediate ( function )
  // clearInterval ( function )
  // clearTimeout ( function )
  // CollectionBehaviours ( object )
  // CollectionHooks ( object )
  // console ( object )
  // DataView ( function )
  // DDP ( object )
  // DDP[ _allSubscriptionsReady ] ( function )
  // DDP[ _CurrentInvocation ] ( object )
  // DDP[ connect ] ( function )
  // DDP[ ConnectionError ] ( function )
  // DDP[ ForcedReconnectError ] ( function )
  // DDP[ randomStream ] ( function )
  // DDPServer ( object )
  // DDPServer[ _Crossbar ] ( function )
  // DDPServer[ _CurrentWriteFence ] ( object )
  // DDPServer[ _InvalidationCrossbar ] ( object )
  // DDPServer[ _WriteFence ] ( function )
  // Deps ( object )
  // Deps[ _computations ] ( object )
  // Deps[ _runFlush ] ( function )
  // Deps[ active ] ( boolean )
  // Deps[ afterFlush ] ( function )
  // Deps[ autorun ] ( function )
  // Deps[ Computation ] ( function )
  // Deps[ currentComputation ] ( object )
  // Deps[ depend ] ( function )
  // Deps[ Dependency ] ( function )
  // Deps[ flush ] ( function )
  // Deps[ nonreactive ] ( function )
  // Deps[ onInvalidate ] ( function )
  // DTRACE_HTTP_CLIENT_REQUEST ( function )
  // DTRACE_HTTP_CLIENT_RESPONSE ( function )
  // DTRACE_HTTP_SERVER_REQUEST ( function )
  // DTRACE_HTTP_SERVER_RESPONSE ( function )
  // DTRACE_NET_SERVER_CONNECTION ( function )
  // DTRACE_NET_SOCKET_READ ( function )
  // DTRACE_NET_SOCKET_WRITE ( function )
  // DTRACE_NET_STREAM_END ( function )
  // EJSON ( object )
  // environment ( string )
  // Files ( object )
  // Files[ _collection ] ( object )
  // Files[ _connection ] ( object )
  // Files[ _createCappedCollection ] ( function )
  // Files[ _defineMutationMethods ] ( function )
  // Files[ _driver ] ( object )
  // Files[ _dropCollection ] ( function )
  // Files[ _dropIndex ] ( function )
  // Files[ _ensureIndex ] ( function )
  // Files[ _getFindOptions ] ( function )
  // Files[ _getFindSelector ] ( function )
  // Files[ _hookAspects ] ( object )
  // Files[ _insecure ] ( undefined )
  // Files[ _isInsecure ] ( function )
  // Files[ _makeNewID ] ( function )
  // Files[ _name ] ( string )
  // Files[ _prefix ] ( string )
  // Files[ _restricted ] ( boolean )
  // Files[ _transform ] ( object )
  // Files[ _updateFetch ] ( function )
  // Files[ _validatedInsert ] ( function )
  // Files[ _validatedRemove ] ( function )
  // Files[ _validatedUpdate ] ( function )
  // Files[ _validators ] ( object )
  // Files[ after ] ( object )
  // Files[ allow ] ( function )
  // Files[ attachBehaviour ] ( function )
  // Files[ before ] ( object )
  // Files[ deny ] ( function )
  // Files[ direct ] ( object )
  // Files[ find ] ( function )
  // Files[ findOne ] ( function )
  // Files[ helpers ] ( function )
  // Files[ hookOptions ] ( object )
  // Files[ insert ] ( function )
  // Files[ rawCollection ] ( function )
  // Files[ rawDatabase ] ( function )
  // Files[ remove ] ( function )
  // Files[ restore ] ( function )
  // Files[ softRemove ] ( function )
  // Files[ update ] ( function )
  // Files[ upsert ] ( function )
  // Float32Array ( function )
  // Float64Array ( function )
  // global ( object )
  // GLOBAL ( object )
  // Handlebars ( object )
  // HTML ( object )
  // Int16Array ( function )
  // Int32Array ( function )
  // Int8Array ( function )
  // Iron ( object )
  // lodash ( function )
  // Log ( function )
  // Logger ( function )
  // main ( function )
  // Mandrill ( object )
  // Match ( object )
  // Meteor ( object )
  // Meteor[ _debug ] ( function )
  // Meteor[ _delete ] ( function )
  // Meteor[ _DoubleEndedQueue ] ( function )
  // Meteor[ _ensure ] ( function )
  // Meteor[ _get ] ( function )
  // Meteor[ _inherits ] ( function )
  // Meteor[ _nodeCodeMustBeInFiber ] ( function )
  // Meteor[ _noYieldsAllowed ] ( function )
  // Meteor[ _relativeToSiteRootUrl ] ( function )
  // Meteor[ _setImmediate ] ( function )
  // Meteor[ _sleepForMs ] ( function )
  // Meteor[ _suppress_log ] ( function )
  // Meteor[ _supressed_log_expected ] ( function )
  // Meteor[ _SynchronousQueue ] ( function )
  // Meteor[ _wrapAsync ] ( function )
  // Meteor[ absoluteUrl ] ( function )
  // Meteor[ apply ] ( function )
  // Meteor[ autorun ] ( function )
  // Meteor[ autosubscribe ] ( function )
  // Meteor[ bindEnvironment ] ( function )
  // Meteor[ call ] ( function )
  // Meteor[ clearInterval ] ( function )
  // Meteor[ clearTimeout ] ( function )
  // Meteor[ Collection ] ( function )
  // Meteor[ default_server ] ( object )
  // Meteor[ defer ] ( function )
  // Meteor[ enviornment ] ( string )
  // Meteor[ EnvironmentVariable ] ( function )
  // Meteor[ Error ] ( function )
  // Meteor[ flush ] ( function )
  // Meteor[ http ] ( object )
  // Meteor[ isClient ] ( boolean )
  // Meteor[ isCordova ] ( boolean )
  // Meteor[ isDemo ] ( boolean )
  // Meteor[ isDevelopment ] ( boolean )
  // Meteor[ isProduction ] ( boolean )
  // Meteor[ isServer ] ( boolean )
  // Meteor[ isStaging ] ( boolean )
  // Meteor[ makeErrorType ] ( function )
  // Meteor[ methods ] ( function )
  // Meteor[ onConnection ] ( function )
  // Meteor[ publish ] ( function )
  // Meteor[ refresh ] ( function )
  // Meteor[ release ] ( string )
  // Meteor[ server ] ( object )
  // Meteor[ setInterval ] ( function )
  // Meteor[ setTimeout ] ( function )
  // Meteor[ settings ] ( object )
  // Meteor[ startup ] ( function )
  // Meteor[ tags ] ( object )
  // Meteor[ user ] ( function )
  // Meteor[ userId ] ( function )
  // Meteor[ users ] ( object )
  // Meteor[ uuid ] ( function )
  // Meteor[ wrapAsync ] ( function )
  // Migrations ( object )
  // moment ( function )
  // Mongo ( object )
  // MongoInternals ( object )
  // Notepads ( object )
  // Package ( object )
  // Package[ accounts-base ] ( object )
  // Package[ accounts-facebook ] ( object )
  // Package[ accounts-oauth ] ( object )
  // Package[ accounts-password ] ( object )
  // Package[ aldeed:template-extension ] ( object )
  // Package[ autopublish ] ( object )
  // Package[ autoupdate ] ( object )
  // Package[ base64 ] ( object )
  // Package[ binary-heap ] ( object )
  // Package[ blaze ] ( object )
  // Package[ blaze-tools ] ( object )
  // Package[ boilerplate-generator ] ( object )
  // Package[ callback-hook ] ( object )
  // Package[ check ] ( object )
  // Package[ coffeescript ] ( object )
  // Package[ dburles:collection-helpers ] ( object )
  // Package[ ddp ] ( object )
  // Package[ deps ] ( object )
  // Package[ ejson ] ( object )
  // Package[ email ] ( object )
  // Package[ facebook ] ( object )
  // Package[ fortawesome:fontawesome ] ( object )
  // Package[ froala:editor-reactive ] ( object )
  // Package[ geojson-utils ] ( object )
  // Package[ html-tools ] ( object )
  // Package[ htmljs ] ( object )
  // Package[ http ] ( object )
  // Package[ id-map ] ( object )
  // Package[ insecure ] ( object )
  // Package[ iron:controller ] ( object )
  // Package[ iron:core ] ( object )
  // Package[ iron:dynamic-template ] ( object )
  // Package[ iron:layout ] ( object )
  // Package[ iron:location ] ( object )
  // Package[ iron:middleware-stack ] ( object )
  // Package[ iron:router ] ( object )
  // Package[ iron:url ] ( object )
  // Package[ jparker:crypto-core ] ( object )
  // Package[ jparker:crypto-hmac ] ( object )
  // Package[ jparker:crypto-sha256 ] ( object )
  // Package[ jquery ] ( object )
  // Package[ json ] ( object )
  // Package[ livedata ] ( object )
  // Package[ localstorage ] ( object )
  // Package[ logging ] ( object )
  // Package[ matb33:collection-hooks ] ( object )
  // Package[ meteor ] ( object )
  // Package[ meteor-platform ] ( object )
  // Package[ minimongo ] ( object )
  // Package[ momentjs:moment ] ( object )
  // Package[ mongo ] ( object )
  // Package[ mongo-livedata ] ( object )
  // Package[ npm-bcrypt ] ( object )
  // Package[ oauth ] ( object )
  // Package[ oauth2 ] ( object )
  // Package[ observe-sequence ] ( object )
  // Package[ ordered-dict ] ( object )
  // Package[ patrickleet:tags ] ( object )
  // Package[ percolate:migrations ] ( object )
  // Package[ random ] ( object )
  // Package[ reactive-dict ] ( object )
  // Package[ reactive-var ] ( object )
  // Package[ reload ] ( object )
  // Package[ retry ] ( object )
  // Package[ routepolicy ] ( object )
  // Package[ service-configuration ] ( object )
  // Package[ session ] ( object )
  // Package[ sha ] ( object )
  // Package[ spacebars ] ( object )
  // Package[ spacebars-compiler ] ( object )
  // Package[ srp ] ( object )
  // Package[ stevezhu:lodash ] ( object )
  // Package[ stylus ] ( object )
  // Package[ templating ] ( object )
  // Package[ tracker ] ( object )
  // Package[ ui ] ( object )
  // Package[ underscore ] ( object )
  // Package[ url ] ( object )
  // Package[ webapp ] ( object )
  // Package[ webapp-hashing ] ( object )
  // Package[ wylio:mandrill ] ( object )
  // Package[ ziftr:ziftr-api ] ( object )
  // Package[ zimme:active-route ] ( object )
  // Package[ zimme:collection-behaviours ] ( object )
  // Package[ zimme:collection-softremovable ] ( object )
  // Package[ zimme:collection-timestampable ] ( object )
  // People ( object )
  // process ( object )
  // process[ _channel ] ( object )
  // process[ _currentTickHandler ] ( function )
  // process[ _debugEnd ] ( function )
  // process[ _debugPause ] ( function )
  // process[ _debugProcess ] ( function )
  // process[ _emittingTopLevelDomainError ] ( boolean )
  // process[ _events ] ( object )
  // process[ _exiting ] ( boolean )
  // process[ _fatalException ] ( function )
  // process[ _getActiveHandles ] ( function )
  // process[ _getActiveRequests ] ( function )
  // process[ _handleQueue ] ( object )
  // process[ _immediateCallback ] ( function )
  // process[ _kill ] ( function )
  // process[ _maxListeners ] ( number )
  // process[ _needImmediateCallback ] ( boolean )
  // process[ _needTickCallback ] ( function )
  // process[ _nextDomainTick ] ( function )
  // process[ _tickCallback ] ( function )
  // process[ _tickDomainCallback ] ( function )
  // process[ _tickFromSpinner ] ( function )
  // process[ _tickInfoBox ] ( object )
  // process[ _usingDomains ] ( function )
  // process[ abort ] ( function )
  // process[ addListener ] ( function )
  // process[ arch ] ( string )
  // process[ argv ] ( object )
  // process[ assert ] ( function )
  // process[ binding ] ( function )
  // process[ chdir ] ( function )
  // process[ config ] ( object )
  // process.config[ target_defaults ] ( object )
  // process.config.target_defaults[ cflags ] ( object )
  // process.config.target_defaults[ default_configuration ] ( string )
  // process.config.target_defaults[ defines ] ( object )
  // process.config.target_defaults[ include_dirs ] ( object )
  // process.config.target_defaults[ libraries ] ( object )
  // process.config[ variables ] ( object )
  // process.config.variables[ clang ] ( number )
  // process.config.variables[ host_arch ] ( string )
  // process.config.variables[ node_install_npm ] ( boolean )
  // process.config.variables[ node_prefix ] ( string )
  // process.config.variables[ node_shared_cares ] ( boolean )
  // process.config.variables[ node_shared_http_parser ] ( boolean )
  // process.config.variables[ node_shared_libuv ] ( boolean )
  // process.config.variables[ node_shared_openssl ] ( boolean )
  // process.config.variables[ node_shared_v8 ] ( boolean )
  // process.config.variables[ node_shared_zlib ] ( boolean )
  // process.config.variables[ node_tag ] ( string )
  // process.config.variables[ node_unsafe_optimizations ] ( number )
  // process.config.variables[ node_use_dtrace ] ( boolean )
  // process.config.variables[ node_use_etw ] ( boolean )
  // process.config.variables[ node_use_openssl ] ( boolean )
  // process.config.variables[ node_use_perfctr ] ( boolean )
  // process.config.variables[ openssl_no_asm ] ( number )
  // process.config.variables[ python ] ( string )
  // process.config.variables[ target_arch ] ( string )
  // process.config.variables[ v8_enable_gdbjit ] ( number )
  // process.config.variables[ v8_no_strict_aliasing ] ( number )
  // process.config.variables[ v8_use_snapshot ] ( boolean )
  // process.config.variables[ want_separate_host_toolset ] ( number )
  // process[ connected ] ( boolean )
  // process[ cwd ] ( function )
  // process[ debugPort ] ( number )
  // process[ disconnect ] ( function )
  // process[ dlopen ] ( function )
  // process[ domain ] ( object )
  // process[ emit ] ( function )
  // process[ env ] ( object )
  // process[ EventEmitter ] ( function )
  // process[ execArgv ] ( object )
  // process[ execPath ] ( string )
  // process[ exit ] ( function )
  // process[ features ] ( object )
  // process[ fiberLib ] ( function )
  // process[ getgid ] ( function )
  // process[ getgroups ] ( function )
  // process[ getuid ] ( function )
  // process[ hrtime ] ( function )
  // process[ initgroups ] ( function )
  // process[ kill ] ( function )
  // process[ listeners ] ( function )
  // process[ mainModule ] ( object )
  // process[ maxTickDepth ] ( number )
  // process[ memoryUsage ] ( function )
  // process[ moduleLoadList ] ( object )
  // process[ nextTick ] ( function )
  // process[ on ] ( function )
  // process[ once ] ( function )
  // process[ openStdin ] ( function )
  // process[ pid ] ( number )
  // process[ platform ] ( string )
  // process[ reallyExit ] ( function )
  // process[ removeAllListeners ] ( function )
  // process[ removeListener ] ( function )
  // process[ send ] ( function )
  // process[ setgid ] ( function )
  // process[ setgroups ] ( function )
  // process[ setMaxListeners ] ( function )
  // process[ setuid ] ( function )
  // process[ stderr ] ( object )
  // process[ stdin ] ( object )
  // process[ stdout ] ( object )
  // process[ title ] ( string )
  // process[ umask ] ( function )
  // process[ uptime ] ( function )
  // process[ version ] ( string )
  // process[ versions ] ( object )
  // Projects ( object )
  // Random ( object )
  // root ( object ) === global
  // RouteController ( function )
  // Router ( function )
  // ServiceConfiguration ( object )
  // ServiceConfiguration[ ConfigError ] ( function )
  // ServiceConfiguration[ configurations ] ( object )
  // ServiceConfiguration.configurations[ _collection ] ( object )
  // ServiceConfiguration.configurations[ _connection ] ( object )
  // ServiceConfiguration.configurations[ _createCappedCollection ] ( function )
  // ServiceConfiguration.configurations[ _defineMutationMethods ] ( function )
  // ServiceConfiguration.configurations[ _driver ] ( object )
  // ServiceConfiguration.configurations[ _dropCollection ] ( function )
  // ServiceConfiguration.configurations[ _dropIndex ] ( function )
  // ServiceConfiguration.configurations[ _ensureIndex ] ( function )
  // ServiceConfiguration.configurations[ _getFindOptions ] ( function )
  // ServiceConfiguration.configurations[ _getFindSelector ] ( function )
  // ServiceConfiguration.configurations[ _hookAspects ] ( object )
  // ServiceConfiguration.configurations[ _insecure ] ( undefined )
  // ServiceConfiguration.configurations[ _isInsecure ] ( function )
  // ServiceConfiguration.configurations[ _makeNewID ] ( function )
  // ServiceConfiguration.configurations[ _name ] ( string ) "meteor_accounts_loginServiceConfiguration"
  // ServiceConfiguration.configurations[ _prefix ] ( string ) "/meteor_accounts_loginServiceConfiguration/"
  // ServiceConfiguration.configurations[ _restricted ] ( boolean )
  // ServiceConfiguration.configurations[ _transform ] ( object )
  // ServiceConfiguration.configurations[ _updateFetch ] ( function )
  // ServiceConfiguration.configurations[ _validatedInsert ] ( function )
  // ServiceConfiguration.configurations[ _validatedRemove ] ( function )
  // ServiceConfiguration.configurations[ _validatedUpdate ] ( function )
  // ServiceConfiguration.configurations[ _validators ] ( object )
  // ServiceConfiguration.configurations[ after ] ( object )
  // ServiceConfiguration.configurations[ allow ] ( function )
  // ServiceConfiguration.configurations[ attachBehaviour ] ( function )
  // ServiceConfiguration.configurations[ before ] ( object )
  // ServiceConfiguration.configurations[ deny ] ( function )
  // ServiceConfiguration.configurations[ direct ] ( object )
  // ServiceConfiguration.configurations[ find ] ( function )
  // ServiceConfiguration.configurations[ findOne ] ( function )
  // ServiceConfiguration.configurations[ helpers ] ( function )
  // ServiceConfiguration.configurations[ hookOptions ] ( object )
  // ServiceConfiguration.configurations[ insert ] ( function )
  // ServiceConfiguration.configurations[ rawCollection ] ( function )
  // ServiceConfiguration.configurations[ rawDatabase ] ( function )
  // ServiceConfiguration.configurations[ remove ] ( function )
  // ServiceConfiguration.configurations[ update ] ( function )
  // ServiceConfiguration.configurations[ upsert ] ( function )
  // setImmediate ( function )
  // setInterval ( function )
  // setTimeout ( function )
  // Spacebars ( object )
  // Tags ( object )
  // Tracker ( object )
  // Tracker[ _computations ] ( object )
  // Tracker[ _runFlush ] ( function )
  // Tracker[ active ] ( boolean )
  // Tracker[ afterFlush ] ( function )
  // Tracker[ autorun ] ( function )
  // Tracker[ Computation ] ( function )
  // Tracker[ currentComputation ] ( object )
  // Tracker[ depend ] ( function )
  // Tracker[ Dependency ] ( function )
  // Tracker[ flush ] ( function )
  // Tracker[ nonreactive ] ( function )
  // Tracker[ onInvalidate ] ( function )
  // UI ( object )
  // UI[ _addEventMap ] ( function )
  // UI[ _calculateCondition ] ( function )
  // UI[ _createView ] ( function )
  // UI[ _destroyNode ] ( function )
  // UI[ _destroyView ] ( function )
  // UI[ _escape ] ( function )
  // UI[ _expand ] ( function )
  // UI[ _expandAttributes ] ( function )
  // UI[ _expandView ] ( function )
  // UI[ _fireCallbacks ] ( function )
  // UI[ _getCurrentView ] ( function )
  // UI[ _getElementView ] ( function )
  // UI[ _getParentView ] ( function )
  // UI[ _getTemplateHelper ] ( function )
  // UI[ _globalHelpers ] ( object )
  // UI[ _HTMLJSExpander ] ( function )
  // UI[ _InOuterTemplateScope ] ( function )
  // UI[ _isContentEqual ] ( function )
  // UI[ _materializeView ] ( function )
  // UI[ _OLDSTYLE_HELPER ] ( object )
  // UI[ _parentData ] ( function )
  // UI[ _reportException ] ( function )
  // UI[ _templateInstance ] ( function )
  // UI[ _TemplateWith ] ( function )
  // UI[ _throwNextException ] ( boolean )
  // UI[ _toText ] ( function )
  // UI[ _warn ] ( function )
  // UI[ _withCurrentView ] ( function )
  // UI[ _wrapCatchingExceptions ] ( function )
  // UI[ currentView ] ( object )
  // UI[ Each ] ( function )
  // UI[ getData ] ( function )
  // UI[ getElementData ] ( function )
  // UI[ getView ] ( function )
  // UI[ If ] ( function )
  // UI[ InOuterTemplateScope ] ( function )
  // UI[ insert ] ( function )
  // UI[ isTemplate ] ( function )
  // UI[ ReactiveVar ] ( function )
  // UI[ registerHelper ] ( function )
  // UI[ remove ] ( function )
  // UI[ render ] ( function )
  // UI[ renderWithData ] ( function )
  // UI[ Template ] ( function )
  // UI[ TemplateInstance ] ( function )
  // UI[ toHTML ] ( function )
  // UI[ toHTMLWithData ] ( function )
  // UI[ Unless ] ( function )
  // UI[ View ] ( function )
  // UI[ With ] ( function )
  // Uint16Array ( function )
  // Uint32Array ( function )
  // Uint8Array ( function )
  // Uint8ClampedArray ( function )
  // Users ( object )
  // WebApp ( object )
  // WebApp[ _timeoutAdjustmentRequestCallback ] ( function )
  // WebApp[ addHtmlAttributeHook ] ( function )
  // WebApp[ categorizeRequest ] ( function )
  // WebApp[ clientPrograms ] ( object )
  // WebApp[ connectHandlers ] ( function )
  // WebApp[ defaultArch ] ( string )
  // WebApp[ httpServer ] ( object )
  // WebApp[ onListening ] ( function )
  // WebApp[ rawConnectHandlers ] ( function )
  // WebApp[ suppressConnectErrors ] ( function )
  // WebAppInternals ( object )
  // ZiftrApi ( object )


  // inspectKeys('WebApp', WebApp);
  // console.log('ServiceConfiguration.configurations._prefix', ServiceConfiguration.configurations._prefix);





  // inspectKeys('Npm', Npm);
  // inspectKeys('Package', Package);
  // inspectKeys('Meteor', Meteor);
  // inspectKeys('Meteor.server', Meteor.server);

  // console.log('Package', Package);
  // console.log('Package["ziftr"]', Package["ziftr"]);
  // console.log('Package["ziftr:ziftr-api"]', Package["ziftr:ziftr-api"]);
  // console.log('Package["ziftr-api"]', Package["ziftr-api"]);
  // console.log('getPackageName() =>', getPackageName('ZiftrApi', ZiftrApi));
  // console.log('getPackage(...) =>', getPackage(getPackageName('ZiftrApi', ZiftrApi)));

}, 10);
