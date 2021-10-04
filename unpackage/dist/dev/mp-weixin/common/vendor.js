(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"shuiguoshule","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"shuiguoshule","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"shuiguoshule","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"shuiguoshule","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"shuiguoshule","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/pages.json ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/*!*******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/common/iconfont.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/*!******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/限时秒杀_09.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/限时秒杀_09.png";

/***/ }),
/* 17 */
/*!******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/限时秒杀_11.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAAC3CAIAAAAq8tN4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowZDRmNTQ3OS1mNWQwLTJkNDYtODVmNi0yODExMTkxNTdmMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkNDQTAwNUZFNTE0MTFFQjg4MzNBQ0NDNDAxMUM1QUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkNDNzY5RTFFNTE0MTFFQjg4MzNBQ0NDNDAxMUM1QUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGQ0ZjU0NzktZjVkMC0yZDQ2LTg1ZjYtMjgxMTE5MTU3ZjIyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBkNGY1NDc5LWY1ZDAtMmQ0Ni04NWY2LTI4MTExOTE1N2YyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj5TzOEAAJIHSURBVHja7L1pk2XXlR12z3DHd9+YUxWqCoV5IAHOIpvqltUKyy13hCTLEe2PcjjCn+wf5fAHf7EiZIdDimh1u0OUJTbbDU4gCRIoAFWoyqqc3/zueM6953jtczOzqkAQANvstpudD4kEKivfe/ees/faa+3hPGat9a4eV4/P9+BXS3D1uDKXq8eVuVw9rszl6nFlLlePK3O5elyZy9USXD2uzOXqcWUuV48rc7l6XJnL1ePKXK4eV+ZytQRXjytzuXpcmcvV48pcrh5X5nL1uDKXq8eVuVwtwdXjylyuHlfmcvW4Mperx5W5XD1+Ox/yN/2Cvzy1xP5fvxT7G1gI+zfzNn9HzIVWs1vRbhOZcT+1HzcL+rl54ifsaQBjnmW/yiouNoz+bPE67i0YPV38Ru3C0jtwdvnO5vy2Lq/MMI+xx9fFL5/3SU5AP2X281ka+1tvkr8Oulze6rmtGLdY/Ckrov/ai4Vhn2B1zP2i5b/i5d3fMnr8tQ5XWmvpPc5tE5bidv38ghm7uB57YU72aYz7pYt7EpueXI/fFND+/+XBPvfQq71YAnu5yI/9C9vPaBHZ46Vmv+Lp5mOoYs9dk3sXlnLxC8aev+BvdpWtM3S3q+zxW7tNNk//pnnSzJ80gF+6N/70s9hjo3vKhv7Ww8vnNJcuxDwV3+0TX+w8UjEOlLef6E7mYwZnvPZpuo3l5S70/HWvqbsMax9jAmO/hAWXgdXap//ul0HPnt8Ce8IHOjO3n2Qu4m+1uXzOYISF63aX2wvwMG7p7DnSPCYGzHwMmM1TTOAxJtmnEZsTnJDBsY87KvtNe8hF4GGdq9iLmyCMdEjDHlsGezKyOPz8ZTJiz73lyTBkngYh81tgK5/fXC43jT1hK+c0xC3v+XfCc/aki9pPVEtEHOit7cVa28utuLQQohd/DTBjLvgR7+KFvbBbxp/ir6wLMU9aORkXJ4ex7Pze+RNU7hJCzKWFdWbIfjtY7q9JdS9lDv9ldcBdtGJey7yGVo/c1Dz9LPfdnj+dWc6YuOAD1n6cJZ7TC/ds/htfaNNhyGO7eGJb7aUNXCqkS4plL6Dj3Ft+mcZ3MMnsZdB6Mhfw2yDVP5+5dEKGcayZsedehu/gGoJZYzWzDRmKqY0tbJ3pWlVVtcnyutKMy0F/kqSDsDfiIuJ4KSs9ji9+jk+crAbWIcQ5rXAQdS7UHbUSHQfuaBa+czz3CcrF2K+xDa0xDdmHkYxJvLXW9GTOjdaWcc64Mbhk3jSedBeG37fWMMG4w6K61Rx/YPIJQ3oKe4kwu9tgnD0BsL8VuujzUt0nVJB13ojFapuGA05Yw7m2bVmXG1Us5sfvl/msbVs/iKKk10sGSTyAUa43sB8Thv3+cCdIh1LEXMSe8PFSBnbAWMeTzwkhI6By3o33kxY2+UkGYc+N6YL78M+VoW4922L7TcutMVr5QtRZVmbZYj6DcQ+2tvwoZH4g/RC+4UsZRaEIBF0bft+0jN6Ft6S8yVm6dZHwGePBrnCdXDi68ziD9MRaM4+xvwvm4pSMvQjgrENwU8NKmK2YVy6P7x/ef2+zPA78KvRNr98fjIZRmGBNsS8eD5J47Ikoz3SRKcaCsDceXn8BFmOw8CJgQWBdouWcuBDsNx6FNuvwT15QUtvZTXfNH7Ohz4cxtm112yrJPZ1nMpT3fvLTxemJZ/B2XhQnjfUqY8IkEX7IuQ+7F1IMx8Pt3UnST5nA7bQeE9YjbHLmQgvIOlHe0XTr0jjskrSwS9Tx/o6gy7kbw+spFFEY4aw1OmdepdbHD97/0fH+L9p65TM1HodhyKUvuRBS+gJuKkPdWsHjMBklych6QbEu10UTDq5t3XxRBD3bCuan8GTzBMJ3HMglQnhnLu4K7NPmwdjHdcpn3gj0e21NyVpdzaff+bM/WR8dD9P41RdfEL4IojBIegr+gJtIkqaxeZbP5rNNtvYj/9oz1/eeuU63J3wuQiZCj+HCHGOGoRjbLY4nAHO+ZexxooXxS/tm7O9A3sUtBRiDoChO/wOoqT1bHN175yff+5Plyd0kKBNfS6YFZ4N+mg565IgUUBgRAngoD4MgCaNBEKa+HykvmK7bsL812b4VTW4yr2dsxGTvkj+yc+7c0QCiFJ92eXR1Vgj/M42eNFlbeHp1+tHdf/e//Wurim+88cVRLxpPRp7RlVa1MeuiNJJHacpkJMjqu2SQ5YKCph+GhCsi9P0kDNMgSjwZEOpJaUHIyBpc9oh1mrz7YnR9BrchGPvbXdP93DUjIAuthOGO8DXV+t57P/rxX/6fp/vvXJvAm0qr8p3dSaNswA1rEKdaoiBgN55ZL3MYDcxlMNzy5a4MYExxP+WPjo/Xm5MXpRdMbvMWwA6yGXgfr9S0oJsO3dm54ToTYhcPJ2uMtZ9s97/kzfjd5qd/8d3v/cm/Pd6//0f//A/z2cPTD+aCmdGwN9ndVU6zTYZ7USpkQMbCfYRExMy2BUWGIRALrlWRFe089whmuAji4Sjs9WUcEytvTNNQiOV+SOoPT8AXFkL8qsrAb18wwhoQR6TNgUw0Tb46e/Bnf/yvDu+/7ZsFV7NB2A57Au43mewl6SiMAkAyQrxuyixfNabGckl4YtyP02GSDDgBjN+y3nJteHj9tTf/My9+xjTgmP1O5TrJ5AivKQFj+GGjm1abtsE/LbZRULCTwveB/JzcGnYfOEFiLqRcRyBsp5SJZRLH1Yfvvf2n/8v/9PMfvRUHQherOOBlttzZHqf93stfeO21L78xmGyJKBJhYJ0iAyvGF6yRu/iqSk1gB4A5f1MEZtECb52GgksJEYQR1sLHkpExgR/5ofAjLgNPBC6wdplk8bTxXGadzoW696Ta+pWlCe8TW1DY/+fo4gwFCw4B0Ogq/9kP/+L++2+31WHL1mmgscVVTWR4gIXzmSav9uMgLPLqwf1Hz9yYGNuQEvFk24ZNGwY+s2rZmtVWev10dlrMTno397ALeHX4ZYvIgg23rdeUVf6gmN3NN8V8vmrAOxEM4giqy7GiAAgQhb0oTj2J71vgDR5vaBUNdto33FNtDSoBfhqIgLf1cvrwrT/9d/ff/gXP28P9w7bJh+O0149kr//s66+88a1v98aDFhsZ+I2TQFh3CD+ApEu5QHWTPqY/U2ax8XCl9L8IcAjExFBAjbnBO/XAg7jhreK1spkBF4rjwZj1hlgVA4AGl2M+/Omcm3n20ggsJSawDrJTV/yp7TdPJAydP7mc4SWTZp+aNPt8KUzv01ugPmfehVyHpCroS1Od7H/0sx+9lS1OIr8Qfo09gt9BN2MHW6YbVkOdQu7gj2k/3d3dEdg7YQMfD2xwpykQxnlr2rrYhP7o0f69V2+8DvYAIYVVgkFiJ1qdzQ8+OL3/w/np+4IF/cF4bwToinqDvgzpdbBVWreNXqvNRisuRqWMIxZKj4PEhDA7+oLr4w++L0Bcdfmj/+vP/s2//lfZoxOr8V5NFMtFlvd3x1/61je/CFzZnlBuAIEHQAmroPDbti6tZ1z+gNRzlwS2hncleRLH2Ly2QzNJ33VTZ8w2YdzzfBaFnqpb1SxW04WXD+Lxbi8ZeyyCZbk6eJdCMBdJPiqcccaerJU8BSXsqaQfe+I3ulQyPw8X9unE4G8sPS4/H3FB8PVdohN32d597+dnR/teU8mgCSSXlHKDqwB3fevVWuOiNaRNGHhx4t+4cT3LF1a0vgxBeJmVlPJogQw9xBXVGC682fJEF0u/l3AGbMBmNW1x9ujeTz/82V/U6/1Rj+/t3RCyDXkewsjynDe+AOWE+YFeCklm4Xn14oNm48s4lYMtlkxgNA0x0ID2H4Zo9YOfv/2jP//Oaj7NqgI3AhQDONy+efOf/Iv/6otfel3GsiTwBDoSz8DtsMa4/CFimCtIuO11HRtEbc250KINxn11uSi6FhAdkJcy17qCWfsRYpPkSrVVVeTrSi/N8Hp/eIOxlDJOFNEcmpxvf5f7Zpxd1EeekqZu39llXpDzi7T4E8ULy56sdF72lfyG2iY/n7k4eDRN7cN1VHH3/Z9BMzPZAt8jyQKQOA6a2rJWGaNhEWEUB76nTVlWKs83YRiAomJpEGRgDFglg80AJDdEDOpq3Zrk8OGHt1+bsBZLLpps+osf/vsP3vlPPZlvp7yfBIms8my1Lue6SOD3eHlwUKyEhtwG3+QhVimNkmpjN1Npk3G0fau3c1v4Y2UQ1zzeNl61+j/+1//5g7d/pOsibxWe3kuSaWH+hz/6r9/85tdwXZXVtH0+AJJp4EpjfEeobbdZjk8TjvCuv8dlgM7rocJjAZFtz1I+kTd4x6atlK6adqMbcHywZRNIXKstyvW6zkFhwv4t68WU6vSlM0JzYSvnNIZdtKS592aXNQrLnuyFsOyXare/VPb9pDL6X6u5OHHiCgHCZmeHs9OHMBdra2E0cX7H+PA72ljQhLzcKN2EMouCJAqj/nDQKEUZTw/rL0jWIMJr7KNRSmsji7IWQTA9O7j9SkUpirr+8Odvvffj/8iqg+FuaIr8/qPZNB3t7lwfDEdMVeDRal07QKEab+iDtQywJZvFoRAJa6PVZjpfnQ7y5WDvpbR/vdWtx/S//+P//e0ffO/k/v1N4SlB2Tqj6//+f/zvvv673+YhV01FeRTOW840qLzLCFru0imuYkCKvrWX69WlC/kFHoBlgXFw92NJRAe8GH8B7Cx0XuvK8wPCX1gJkyIv1fyEbbEgGN20DXP8oyMfnD8ur37CLrPzVkT2GHcu0pafQFWeDEf2bzYYdZKVknOe+eDOzwTTWuXSKlpNLG2ASA70BmzAr0JKUXDSAoBmGFCrNAQMyID7jkjUaJ01GrdplG7zGpAfl/VyGG57TW48dXD3g3d//N1i8Wgv1dnJiTV1o5UNJfzfqE1Z5OAFwHzKBHLaHREUja2gV5ti7fk9ZhOp2rKYTovZ+uzwuVe+GUSDfH72ve/86Xq5qCrYtNdgZ3zxrd/7+//ij/6oqDaBTy+noZPxVwi2xFsEuJp25THSPGCnLeymRdygfLBL9XMgkkuwUKbYNIKCEiCibejXWqoKwIjwGq2C+WG7AohuCxmA+KlXG7Xyg3EYyHjLMr8lw5Auzgj2RN/MuXGwT+Crl6SUfRLH7RpJ7WUnz+e1Fv5XNJePpduxL+CUgrR0defOO01TAmwl6RhC6AYyxCIG+9g8wHhbtZBBdMGxBOMVgd+9gvRJXdcIPqps25ohdNUmr8BiJ0WmRqNSF4vVOv/wnbeWJx/V85Oz+WYQ4LURSNqt8WS9mhN/DP0oDEACQHNtYyVkqvWlURDUUEswrLasTVUGHi+ys2I5e1RVL7zx9z74xduqyparFa4L9BPX84U3X/+X/+2/rFTNpGypUtGcV6mdC3cmQCUrYAYcGf+vtLMAAg5EUre0lK1jtmvTwe9x+iLtaNzN45WcMjBOVNIytRLEzWfGN4jRxeaAz6Lhng9k5RBxFDO7DXbVbvvYCC5h4mNRx2X+2KUuumy26IzsksI8QXefFu7W+yukmOWvSpJy57z4f9ZVxiARpSmz9fHJoyxfSYiXwCUuAeUiYjLi+AoCckwyIcQm2ZigbqWu2bCfGpddM01T67puSmuqtgFSaN3EiA11JnS+Wp/sf3j33gfv/GB+eF/PD3tWJddGQd+Hq0IzE+FsaV8Q2oBMbQU3NoXKMp4N+ypKhwh4TQMi5eMVLQxwvhTR9nS+Dq3ef/fOZjkrNexdNJ7XHwz/8A//y+2dLdK9iD5aM3Fe3wGyuJQc9YKBRcOeoNVCrDOgR+tSVUYwEYVQxmA/glbIiX+uW0diyMu8zsHwwuQtCHkwIcptk5hqPZAVY+MIKLsqs4PeaEfIlHmhUzRdQ3tDPM8FLnvRZNP9p8HtuVod/iwhMB0ekMUYJ+ddsyr5OX9cybzky+IJrf7EQ/wGzOVjZV4yHZKKCqqnzJfr5ZlWBVw8TnuTyfDajes71/fiwYD5YBMsYAGWo6U4U0EawIu0UlnNXEKNdFWFUF5XxpRG54pwGq9dMB3qfP3w/Z/f+clPpwcP5scPB8KL454UMZYBYWc5zyJIIct6OiLiCJKs1aDfhwDJl3mzMVl1dOvl187OZilCi6l5mUlQqBy0ofzFfHV8uj45OSnxdkAMr/36N9748le+GEQBoNA4jmlI4XTLDPbNXFqObJPEEcCNomau6zKrCy+Q0WgY+m6DSWrjV2GE5onWHBiY7bYCEdRw1YKhtVStBosHjOGefdhcWxTFtFqdhOEuo/RB16HlMnWsfapN1XaNHpagzGV5KESeNzfir4Qn2GUssedtHva838PV2ggUxXkf5NOlK/vrZvU+wVyEEJfBqHtRrSj0QDA/eniPCzMYD1994ZlvfOVL25OJ8EMB0s8pXOO6ItFzq6VaW6m2rutSqboqCqx4WedVUZeFqmEm0FAwKGxBQQRI+sPV8aOT/UfTRw/PDh9OD8v0BmAiAP2sq7LMC25DZoBjgYJE9zl2bmcyUplen61nZysJqdSfrI6zYlVqu7LVKvR5zIL5fKmlXenq0f2z0+MFiPc6byHsf/8//720H1vwTAkxDXlmz2tSDhe64jsindYtb1m93pw+OmrW6yAQNUhwEgJd4rTPu7oWeXOXkD3v/+oSyKTeHTpjOxvCi1a4vB+gq/EM1hC2potVtjjpb70MLui1kmg+wZ9DGfbYZdl5Nx4WjP6RUuDLNo3r0MJvt09yXUG1Xxc0XYHqiZYv1mUAPk5yfk0O/CuprgNq3nFcX+LGISVKYNrt27e+9Y03bt/YoxWxXMEbFWO+J/AleVnSLcOzhPT9AF8pbl5sSbKZbJ2tp3jH1SbbLCtIbXCYxWxtVDYZe4rp6Wx98vDoaJ8wIY4TvKsyYEtetix6fv9sfmZHmo/6QRrffe/Dcm+nzKpARFu9rYOHp/sfHAf90zRNJsOwzDYwMhEmj6ZLJZUSwwf7h2WhOWiP5H//d7/+1a99CTYHuqWNMpRstty1Zl0kvCh1YhrKX69ns4Nf3Jl+9GAYhLtbk0wXOpJe6AdxD9cnfBBu2mZtNPWJedIyyZ33E6PzFGVx4GxEf1WD2MYDqIHWwDRINNimrrOFzZZenMBHsYiup5O7zDYTjxXOuQTCgrgsUONp4s4uH6SgMLrOMYeQ9IuS8cdtNRelfMajiyGLj1HjJwd9/qrB6LJvja4E19G25WZ5/OhOo/I/+Cd/kESsJXkStAimMAoYO280AKRRvaAPX21ticVqKT9GoUxwGfjjre3J9mRvZ3snTQdHjx7s33vQFFgyCTHh1TU2RxcbppthwqOJt72z41lVNTUIsSoaVdQGgKVNvsyyszlXvFrmkDJ1W8b9Xk9E82ptvWq5zoopEYflKm94Nau1jfzCrhdLjb3N1tW1Z3a+8bU3cIHYD/CISinsO3Nt6x16M1fDpI4YiPy6Xp8uF0fT6cOjHC5Qq2ScGscuXA4GTkHlIku9U9yxFuqAsZ29UQQXLRbBEUEoq4aSTpzKW54EGw5lmEYBbWC58ljfi0KqxtG/MADfns9hdWGFQAzETJVF4AsEUFwYlrqlKywQLKMo8smhKVPakQdHPQUlzmGF9BUCy+yTQcj+2l2In4YurJt7ILKFiyuL1cns4K5S60G/lyTY3wqxGNgB/QzKC87P4GNU9AtqpV0dpO14oNMNAMxAtZSw556M4u3nX0h2tm9Z1Xv3Jz8BwYiFhTpuatuUdT8OYkAA6AcxywoLLJsW4rPKqwGgw4+BUccHR7iqiPPnbj6PCKUqr5+MhJn1/SRKwvlqejzbHE5r0efajxorMlCtmmweK//aK7deeeWFlgCcWguC0AezgDahiIRY0Lo0LpCFbF+vzqYPPrw7fXTYlgoxNUuWo+2x62PwXO3svAnKc0rIpVqEKxx2jcZUgmgN9d154jzTX2tNApyQRIZh4suIwVBgnOUaclJZ38ogSHoBwKbLAXoXne8eJcKZLh/e36+ytS84LhFBHbaXDpLA61svIphxLWwuGLVdroWMRgL2AxBqT8bYIe+8y4KaaAWTT8PMZ9eXpEeJb/6k0nJNuLhhRT1mjVqfHS6nj5jN+n0Jet6ClgHZhKeJ4BH6kgjoOjpa4/NujiywXTO0190AQiklcgHXLroHYRK/+dVQ1c0P/+K7bU06lVPVu4Y3TPpD8njADihf3Qo4byvyVYXvTdWkSYJIAGow3np2nZvADyyX/e2thj+cTZfSj1Z1czRrTtZWFVU4iFppwKhrTXXshvNv/oPfARq10jEMCkGcuEvTuiESKkd4LYlBeLAqitnR0en+/uwQGs2T1LQDrWfLWicc0cfWEH4+sR56KXJkqp8LEkEkrAlreAB0ldEwW8/iODR1Du3mx/Fg6zpltUXscdzL0LYSC+epFdesqnSlPdWYMBlv33qeLCYIEM08pk4fvPvzH383FM32uD/e2wsnQ24i5jU8gAtqSIxz+YSXkmTzIEmES9zHHTVlQ1wGLDNMPXz5WF68LKl77yJf4nIzXTiRn2Ix8nxG64neR+sUDFbSa8vp0YPV7IR7hR8Y17RB7kK450r2hoKS7bokyR0o4LauM1u4Glw3pAZkbLhj9QbR3ZCuhPMFSfPFL3/9YP/g4d0Ps012bW+i1MYPEfcQewwWP+D+alVkpcY6t9oAfsTWcP/sZLOpX37p2d7gGl7y7GyBkBeGkKdR29aHZ/Nl3UzLZqW9Td6EsELJKlhEQwXx0W743GuvuGYDuhzrir9wuPNBELpiRpwF2KIRGDeL05NsMQft8Bj1rMgoWueFGafgQCwIGaSshEM7VeNaoLgrpHdTTI2BSTEKOjxuFGUbAEgJtTGETaWlCGUy8YJUQzQ2pZRtYK2vFRR7scnnIP2r+nj3mZuvfGF0+7bXFD/5/nfWZx+ujt597uZ4J9iNa4hLyUQSRMRmgI9AMqIMhtQcp94K2imq2NuYvAD3WZee5rbpe3rgBSMWDLmfOvLL7RMVys8cNZYf6zZ2RdaWdtzq9fz05PAB95pB37fd3ziKTU3x9G9XeKN8p4Nj15tNGQuK3K6S0iUgbJer7sYcjUtJeKCaXrx77ea3f+8f3XvvI2xeltUtlQRBGhufCKLQLkMeB1FbgEuY7fH2wf4hRFUUU0Z1sywmk93V6ggctlaLvGximZQtftyuK6/2eAWwKnRjFYIhVRyY99oXXpuAEtHqGRe9n5pCBYITQjq6BSiqtVqtVovFYpIkPT/aHo4Gk/HG1L1+H9Do+z6V1gVVvNllgq1rYWbnA1KWupRppAaQA7obel7ks7JaqM06vf2KzU7L7BE2N+6ld37wjlXttZ1ro8lOsz4J6lU9O/7FT/7TD/88/co3f+fdD372wgu79er+3lgXy/en4igdjYoSViyjJJYhg6oADaaecu56IoDDvqQeD+JA1MDlIwzR0nPEL10trVxE6V6Q7nl8yKjaRYcWsM/XTiwvig/nwt1QEbEMAw8K9fhwH8yphz9Q8ZSIk9NJDsG6aiijFg/qyGTOMBEyeXs+am+fCoQdQTcXg1ogMYCXcrN+/oXXX3ntix+9/956mYN6wG2yZd4O2bg/AE5FlKoNNrq+cX2rnwxfuBWuV8vlslxO862x9/DeUbHWR8ez2XxVlNUwHcwztVG2aL2as4raw9sSdMGnFhhYyEtfeM2PokrXEKLdtMGT6+OyFFRBxFpLZw2tM6tePx2nw2du3OwNQdwCbzQIEwgZCbfQBEiG2KvzG5JSrt5j3GoI4r2IBDWnWmMVCTihbrOyLtrT+fL0bANx/ezzL7EF3w1b1VY//Q9/DOtTBUSkTgaja6Gar+ff/bcf9IbxQX33zS/dzjfHeX2ar+aCr4kLMvA6wQoThDEoj/BDui8qbQGKsfthK0LGA98mjKdS9nClYEmU92mLCkvT1PHgWU8MOYsJY8z5lN6n8195nic4Jzu4/wZEqi4268WpqrOEUrWia9SFGTPXpN+lmCkikZIgZkf9MJSuaBikHb1OQFKRFJ2xTkx2ySbmfM+1SiIkASOipmm+/bv/6O23ftyPwfuoL3aD1cyz/rNxGvVmy9m8XO5OJkkQl5t6vVrhHXfG4+3x7jCZ7M+Ok3AUSNWLwSry+0ezTNmawVC8suUFtexTg79LXlGd6NkXXmg5JeFcRoRb1yrQRWHmohPr0qKuaASVUTfUTpPXOk1o6EFXxdbO2EQBpy4+yjsiGDWtdXTsfPKFHAXh2jprtI2wWmfLJts0XgEim83LYkP1sgfHC2K9LHxwdro1Gq+Xq54fJtV6PVuul9lksm3mxY3t3ZGfPDharg6P9pJrm4N70s/HCehpk2/OGqgwcDjXYg8gZrLlRhmNG267E040QlwQU58rtBMQNiSuhmgU0OU2YJlVhniGCGtYKLrV6Oren44w0p7DUNd23yDseqZezo7rch1HUGagd5Ry9jq4Y93Gt7bbeDcNZClDTklyEERG+0UJJ8ojuO4keorpDmw5N0xsVktZdS+O4jbPt3b30sGorQoYvhRykPrrRZ2tc669Mq8DKTebDZg9nLYqyn4CoS5Oj2eLeTlfFtLvLdYF2Pc60xvFKlw9l2CUiglF10ZYR5VAas7ztnf3IO5l6J+fMkMY4CzETX6zTg4jEIFlYB+k5EDAOPbA3qNgrevhMGVUFIxFCBUcAqjgQuZi/pF1nUnM1XFAZRGDWON7qswWbb42rNKsDeFCWbWerdUsrysIYuv1Bu3J2Wa5bAfDcRBTSykXWzJQnkhaHjCxpuEVq8/mTc8LBgTPxolSXECpEAbqMJJgKY0IGOl0emvS8q6hCxAOy6BASJcnKYvGqbDnUQ6NnLZc7UfGBOAGwZixmJoG7WdkYOTFLHg3NK+sVXWxKHCTuozA50Cc8HPukoSu1YOMwz3FnIOKsxWgaVOTwG5Lkok+Nf4I8HVnih1/Oc+ZUqgXHfspqzwgwh5t7+7uv38n8uO6VstVQ3n3xqyWa+ymUmqRNVXZ7EwGSrUgn2kvwStsikUQDqiM7EkI1HVRay6h76vGyxtP+7wlYsE7QsJcj2OAJS6rUdzHknd1sC6jZi5GbCnFTiUBK8BF4wi/n/TTeNDvTYba8ybPXONJNJhshb2eldKFXitcB69HOrxLkvALX9LcVEwX5fKsmp/6jJaosN5msZkeTQPe40ZSgmexKYm1eguwaDik4UM/ZqVO4l7Q4h5MUJuhiE1eS8XzRcESK9IAxISxSIJP4kKJOcm2cS0Z5PQtgq/wiTq0uP+Gdd0zkN0IsD6XLmRqxFDYblZXDaJu4HNf0L5YgL0V/qcGo5aaOVof/K+tuGhbVc5OD3FrwG+IMpr5cHlD49rwWVdp7Rql3WyH60/VniFzqcqMMT1frJNEjcbgYEbiFSE1qE7pdaLNMRh6HqI6JZBoKC0cjUfvV4BPSlnCnxl1O3lRLxEG9gp0WDaemm9Wz9y8nq+yPC+LAtaBQEN1KxGF4LoiDKq8BvurEDUYeG7bMtc9yaxrpKTVKIsy6UdaKSmd/VDmlXi6DzXejSga9x9Dc7G9Xvzml7+0M+wL7g8GgyRJ0u1tnoSwFeqeIy+irjDcEl7Ev+hO6WrWgo4LgDloW6zz+UkIhVQW681qfjbLN1VTe/l6M0pTQjNt4FVYFLq28YTkA8Kz1wSJr0uVFwVYdhL5NtAnj068lCU8meyMNKNWLhBdVcO84aktVoBaiIFNPjHtlhRS3cDDZdLl0FxmhLvRDBr7cchax75t9HFV8SgJ4U3G0GiYtZ8WkOT5MC+ohOs+LVbTbDWTvJWOaJ8XLTh73H54QV2xrBCeAmQHl6fg4YAWrZscEX+1WQMxh0M/lYlLHxl7IR3O5z8oW4Gr40ZTDzU2QwTUtilc0zN2eV1USjUBokGS+FgwSUBRamV8nk5Gq+J0XTSmWML5ILrny2xdaC19RRHROgOheUMqIBIct5Nhb7kqHu0/fOHFW7jmplG0hj7iv9SWoJlyAIJ7naTxedee8PKrL9+8vhsEES2tamAoiESMUtjSqUMH7l1RuKvQsPMJNG6VNI0EJm4WXpmJRuWrRb5YzOfrXtLbnWydsjkUBdm77xfrFb4rVVVlAThDMCpVmU9Pd6/fKDZL1ZTPv/zcdHNKHRppArDIitJGlBE1TS2hIS0CAu4UTDCA73FQJ0UF9gBMgoG0wH1gBODYpFg5hJLtTlAB62jhNZQbLpks+sFgKHjPGOmyg5+Sd6HeJlcuAxKX2cnRI5C6IPaDUAo3iGUuK+IX7X+GyCsVYy9emWZwADKGzKaGe+LOOSv7EPm6pVsgT3Zr+kQPR9dv2MlX2mIZtFoJ6kT0rGQKQrFp08RbzdeIR2kcjfr9HDzOUFXN8wPjawUFVNdZ1ZbW9rbH2SprLNyu1a5Mo5y1JJFMe/GX33j97Z/84v4H7//Ot74sI5hG45IB0t2hG33rSK/jVYTjlI0Ae2HJoO8HETW+6MaluUIPZkWUnGYOHMoaNz6NtxJdhgE3JlojgW5VXs7PquXcV0W+WQMTaWRJtptyXdY5bFVStzAgwPohTfBvyiyvajwvV2bv5nOlmgcJXkRvlg+ns8Obrzxrh/5RPqs3lc8i6qa32CNAinK4LakC7ndRnvhZnCAwUK1Xu84+0nwAIs/FT+OAgOa9aWqiKhfMn8neLS4poU1p308T0lRg62agwcmWy/ls2Cdvlm6WB6vYOu0jzufBXarWdpPwzCUXGkrWOqKgHRYppVXFxpMoCEKwDcoVdb07RAbZRaOh40ra4A200tPZgnSMJxrb9d/7jSDKpJhfGFbU7TKvtBWx74d+QN0LflC1+TIDfJalYoWyXK/zulGuvtm4ZiWq3IK4ap3GKSLtMzvJj7//w3/+z/5gEo0oyrpAZbq0fddg6SoWjCgqYTUgk9NUPRCrZSALWH4ZSB82DXVFBF44T3KuRInJbkzRI7oIWzFeXWVnp2q1yGZnvKlUVTetGW71AcmgL0k/ScMeLL1cZ5RSxno5ba/BS8Eg+kml80rJZ2/tLE71ydlD04DkNUl/OC2nla4MFlqA7LIGLFael4do4kqQAVMCmvywpRwi9/Bz7CZ18NDZEq07K4MUKywGLu4LvDCkk6LRCOGE7KcrI0kvTgPlnq43ywX2UIoE7tLQ6DgVqLqmDodALtHi+Aq+C5elaVzehczFkS5cSlGUpg2jAMJBUjVJBIqGJOy5rbjlpbZF6vTG0guY1PHRmdIGrAvsEe7g+pVpLrqpXLE4TdSmWpbNcq2SSOEOyxI+5uXaWacbO3CTg5dtqjBiai+GOfcCGBmfn54kUh4dHt977/3B8A2PplQRrDyCPhmwizNlXLKEpDSldXUFoIf/EsEXvHHNB2TvVPWho2mcEO/uxdKwZjcFTd3IhC7lYvno7t2wWrRVKXgbI55GwXAyxGLGkU5EWm9qEBtXtqfrDcNY+JHWrKjawWjLD6RSJbYWJBKacdQPcZVpEGylo4P1tC0qXya2VCKisRiaygbFhKJvidoHSYi7AsZiy8IQPJbglGaVvaYxFS0Upa/xGyQXEbUCGmMQJGC6notPbWpwh5gYml9HqM3W67TX4xeHN5mu9YLC8kVbV9eZ7iKJMyPHDynn4ooyTVtTJbcdpGkcp64fze+Sfxf9oh1x6Q7lwMX5JI9LvVxsEMTgWFg8TdkkJ7rgaqqE/wTwaiFrIEhdlDVwB5za1LTZXg088cVwezgYDl5/7TUqGDQq03pTVsvVKttkZUYY35QZnH6QyD//D9/Zvta/9tye8EN2cWwrVSe6eUC6NVgaBGqZZ2sT92hwCcJHUs4J8YIkuVPPzF4comcvjnXtui2pUQaasjp99PCDd97pe+VmtuoDmGAWcQITjqLYa0SRV6vFBgsVAbeCAOw2TlLpJx6P7LoEuI5Gk/2773/04X1TrNWmAdMOPX9zlo2H4+kmw30BL6zfhl7i0fCMy97CLKQEfiRgjFjGBssZSJPwJnQCjirp2B8LQdPS6IIHP4HNNMK2AbeRhx+2jH/WCDcJQkMR1FQgAlU1Hqcg1cIPiCySQm8ohnPHMlxZ7vwgWc81XsCxOaQPrq2iZGRr8gLv2RtvXwdyUgchF3hVQtrLk6TOZ2JAOKkPrNF4z7zUVaWbuvCSHvV6lCC9Db1hWXqVpq7tSNJ8F3gggBU7E4WiXhWA/FvPbf3O7/7el7/+9e3t7UEaw3FILqdDsNHVcnlycvz97313//7dO7+426pNMWM/eevuy6+8PRr/TgQxHFCXJQGaI60uwlMbhVWFKhbFejEGV4faLAsRxXGUQHKpukz88HEzPjU6gu1bRUVUyo0Rv1ZrVZzV5bwX8WZTUJ+V9RGLoh4NzArs+rKAKgBuBSJZLZYiSGjaiEfG83txPy8MrOF4/wC0ZJmVMUCDgzIlR0enJvVv7762NRrlx3lb6cjvtZWbLXF9nZT0hMCWlJHUwBHKKXNqJ3bRyQjVUvChHhluoX8kRSrhNzXJkyjqThv57OPdpFPqwBi7KbJeP1UaQOf0LoUbGs4irkAOREntLkfqSi5we+XZ0vCi4VXtKSiiVa5sML5x6+Zka097Pi4NAQoUHeZEr9dwd2KP6Lq9YADc1n4oHxx8ONmJPFOt86ZatVFEmRoAPmwsHFpNKVqvKL3ZFKDVCtb2YphE8OrXn/vW3/v67edupoNefyD7Q0TnVdqfNBoGmkcCsne4G6gbf/D105O92bdfuvv+g+9990egMt/9N/8x8qpv/sNvx6Oha1eBbxuH6F4E3dCqcnN6tv/BD3709j/8/X/6yqtf8YSPsBUTmlMVj0giNUfS4CqdL0D+I6j6yqEQVtwre0E5rx553owHZabWwGMAbhwm67MVMPNUn8LLVGkCPxY88MLevGxeuPU8LgwyELghrIaSuj4YGQTpVuVVvrWze1ZsvvaNr8+bld8zvKyMl1NPVl37MrJdE5a1CtGkrkBOXEpaukNTJGK1x0s4WdNWQMkcK+OnYO1N4zMRUEue0mkUKp03Xh0EMCjA1Kc3MHjdKVoIathVGuFzpzhRixlVVF1V2bWmuyY5wy5G6ehYitblwEAAyxI6xE/TnXS4m/RHPOj2nOhxA3y6PObkfDRBOHqBmFPnm9PZ8ijuiy2W0L3bcIQIPxim4BoSTlJWrciVl+fV2cnJZl1r5T2z1/vH/8Xfv7a3vTVO+31fCpWt7t2/N53s7LHDaDK6Mepf19k0Lwrfb0Zhq6M2GIf+89fN+tUHD6YHJ6f/95/9ZbZcvfKV13afvR71I5LCpkE0XlTU8gdEbYtZNj159OC9Z248k/QnkGAItCBhLm1KVVJq/DLWnQpEM0uiLbDNIa9sAbV8sDp+uJkCYAo/CIDRoB9NXqYINwxEKlpvtOyJLFODNBwOt/CykEM7k904CKbHJ6vZPEIo2VQhdo/ZMB4o2/Qng8Ppwc4LO2HqsxX1hZZVAWUYAnuk71HSjLUGwQY8XVKXFiMigoXXqjt6RtOpBlQtAjtSnNN4eYml1YUIqHOK0FUIVwOyn96P2Y23MEvjP3XT1EHIzuvSpjMNJ6a7QWAij+xi+BJ6VsBE3FCvxCqAH8fJMBmOaNqI1I3HO9ngul3OaSjv+t2JuYBDS6/RauP75s03X3Zp914cTaJ4GEIgMnDE1WpxUtRNWcCS21t7PcQ7QNyNZ67tjsNE1KpAYLf9fpL4bJTw2eE9X/YlwVFNg7Me+Xw2PWiLJQNkmmJnFK3PeBEFm9PinbfeAVW7frI32YNygkdB3zXFej07PgESJFGyOwpOzj44mt96Nn3NkwNqivFCYySIoRvTaxri+8wdhlYm3sJWm2q9UutVOZ8uaHBvqosmkXEYcd+Hrm+ED1tJpkdzGl9hfGuy5cu4qXWUxtLzda1FayNQXMAUjTYikti6LijdatuXn789q2dFXQodWZo+CVx+lepF+NflYWHjLfWqcaebKSfHKeHH6KADroXL7zvyZWhAAa98+PBh5LPJ7jOeaoNegD1srfls7nLB2MAr4c3aRvKi/5y54wBcN4ewF+fdWhpOs85WDLkO8AD70ouGgyQKwqTh7qhA05234Qyta98yl2cfd3PH2piiVquynPdTuXvrNif0TJjoCRlT6oMYoz/eCvJ1tpqvS0AFnhhDy4qA5fmyivgAlKqqSgt9AEqnatGq0aDve1k2r6AWscqLptxszkB0RknAa96M/PVA6CJii1KtqulH+211pjeDdBSEsRdH1OcdmLxabBoesKrc/2DlJ9/Bfd68/UYUptRbaihhCgHHqWRJE2okm/TCKx6q1TyfrbL5ZnU6O7i/v5ktENqiRGR1JSUJhrP1ZhR5kIpJJOK4T4vE4GAxwu1sMQW0IDQAqYoshyxOorjWNUh/pqpBP476JGBbaNcGCtI6uUrVIDoBwnWsuExuQyRG26AroJJ8wSp6dBAfd1ratgAVCXlhvIODB2//5EdvfOHVtN3FPoVYc2Cn7QLNp5pLV5B14cc1NBtqPn08BED5V6qldEf/dxVp1zwKVoNliw1l57wwSPHlkg81yWXuTkZxXSVC8Mfz4LYzRLyHYk2er07K9Vkv8uKYuxaIxrK6deliXJDve/1+FBEIqVzqzTKHT0QCTAi/J6qi5tSHBnrN64apuo6DsM5OWg4RhAhEwMupv77EfoRRH4DEVVheS3RZt3VbqLZZlBtb9fws8KA7wrYVkR/ujvt1pvN1JXUdW3V67+6HPBaVt3utStO9YTqsNBlua8tG556tQfJVMWsWj6rlEkFncTB//5331/OcsuoMGOlvihXYmu9Ly3yoxWxaAwJMAIpACZGm0ps8C9xsVgHiwlmSJL1enOEP9YrT5HnT30qwxf1Jjw8TwDtN3ijDzg+8JuZlFVF0rBMNoFuqVbtyomsSdxMwBOo0Oth1nfCqLO8/uHd09OirX38TIM9lJMKU0dkzn31gkaT8HO9mmbxzZWyIkj4+PZs6P1k3aMUvZ1/cKcUtPWDrgUUANi5RRfWYxg1Hia4r3LTd6TCUCGbdmYg0ZKJEm9erU50v08iqbBFGEYFpUyL+IgwGpA9ZU5etUlm2zLI1jCtbL3Udhgg9w362ynPeBgKoEAS+y/TH4yAIQHog0U4OTnBl21vDVtXL5dwoqNmhabPJWNZF0k/7i+Vima2sMvm0TgILEqA44EL1EBv8KJ30+lF6vSlWRa6OT+7n3892jm7cur21ve2JtvGN0uuyXLWUN6hVlgOS6o1azbJH9w+PD1eI0NanEqw2rQyCEKDPGd404mmlzibD0XqZ9UgBlJAtutIvv/r6ajGtuQCiIpKfnB35SVB5VSjtaOTffPFaugfUjDLPrKp6lUNFGiJFrkEaT6EEtidCV8h1bfiNm1LzKSIJZ1Stk0meT0S4Zaqqwal3r+31RyNEMiF7LEg9j866sp9tLue1Ylikr5VpIuZ3Z4R0FX063svlK1uahifZSCbYuAujXDuuKYCYYRzu6uaWXVQ3RnQnn3oXyEK24sr7RKda3lTVcro6O6o2s2gQNl5DQxPSgLrVCkKKDgNpqnp6coyLw9ZWBeVsOcSSY9vL5SIK+WBAvQR4Qa0pVXhy+oiyG3AUiDKmhe9VNXV6CqElPFnAiItezx+NeJoGg3Qw2rTaqHmuFseNscqPg17qgzfAywBUAt5v/IFMaYkyBx2bw4PAS4eh9MHfK91qqkV7iFpetfI2q/rDO/fPDvNhnwURL3UbmqYo13Q6YpwWealKm5kK7r4pSj+MyrKMZbjZbBBl7n30Aa4z6cfgRtDquHzFVDxELE6ee+H6+PnrLOZwlprLomqLGu4IgQjoaCT4t+TU00CeCILiU+N5d44V7ZTr7Olm15hP6RBqByA1B5y7+dxtGafa+hIcQPaoR1N282Wfai5N04IOAAywgHd+8bbgW75IiE1zvBJVpAk1WlfyoTjUeO7AjVYrSB4S+0y2rn5vASsMG0fJWVx064pIXaEIbIZCLNWYgFQaLAmSaHH0aPbooWRtprJr13aZboqs8GQI7aM0qY1yXezfO9yAtSRYXh9eBahQLfhwkMYBIFfhbSvVUA8k8fqWmrNs3YL3R3E/oJlUl5mPe6GixzROoyRJQVqnZwvha2aKQTLQjTg4LRrPi0YSzzVG90K4oYa9WNdsi4vnHJitNHiS9VazBnrHdchAX0BjB3nO9g8279/Zn5/lg4ROgYVS8oPWSsUg78CaAD3LYqnLfpICGLa3B7pUTaWAhWLAwUZcMy21d4OMVLYc7A5Y6FUtH+70t5/ZEh4FXBo5ZsFqs5ovK+mD2VA6MXJd08LV3DWdd4RNkIFwk210mjSN2brUG8UOuLjv2r96af/Fl16TSWh5UoEgDnaieAAyyj/H6D21HXUEZdCfMB7N5hto0z5ey2B3SkA/zbCQTlNUhSE5TfmApiq68yvoVC/bOJHsnUsFcz5Qwc4/XMZiXS1ooq6pIuMhvOTr2cmj+x9my3kaBRpEJIOik8CqYp3D0isauecfvPvh/v3Dwe42T4KsbOBYuPGISzp+gwpmRPQ4DQrApH1BAYCaAahaDLrtaddrLpwsE8NxnzORb0qtq15fNI1/jCCYIpTJ7XG6LsXRcW5XOt0ivRaFdcgMiCrVogkeNRh9aG0FA2mIw8FaOE9gKMCV45PFw0fL+wdTAHMAhdOKdQXnagcBnVAuAqrzcUtjIlTGEpRjPJmewUxhRnAz6SrE2laQpRUiCgRKKl74wvNB3z86fRiEXiOaTIHQho2V81X16Gg1A82PuPMQwKfCywZ0WjTpCbwxAS1vhBtso8wHnbxDxkKa1xfrbC1TAs7xZE95otBBmO5G6TZoFRav4wyfgS54Y4o2Hk8HW8Ph7unJw14EMqiGg7AXgwgjPtWCRmOEa6hUTZPTuY+bXMpIhikZCsEM73pZqFptuO2mKbpz9cmOGgpAHiWcqTI1PTm4d+dg/75o61gMGmbyTcYCagXMc6B4PZ9l9cYcH8x0zbkIVcPcsZM8FHSQJLVeI9gZD8RYuvKVG7jirfZo2UiLCuo4BLxBfeVFSPl+Os0qgg4JIdJL5wYy4tFqWWEr93avTevDw1W+YRlkXCDaSNgklJ6o3EktVPUPfRv4FvLWp8lFjth4djqbTr3pabXKKj+RXepANaLUVH4MQ8BuwNw5mHRlVPbmq02WDJK6xOJlEUie9nphBFBBqGIBiY3tyVY6TIbXBzLGFewx4DDQd1P6LS/b8MHB4tHhqlSc5lF8EwZenpWGCpqUcfexNHTEBW9rzaiRVwhKvAR0SK2kpi9tajAP1egoEI1m03UdDNPdvd0gGXt4dtd5+ZlCmgoNoAWMsie3br5Y4gpaO5vN8qzZnSRuBkABLBGxbV4X1aqsVhUedTMY7MVRj9H+cZKF3QcZWe+xDuqaekHeWxVQP6K1qlpNjz66885H7/9UFZsBSKagjEdeVxYkLwwrDeKoV+t8cVJozUGH6ho+A2YHX4994XrdumP6u0lz68aCoE/oXCrOgC8emUt33hMC4mqexaDSPpmwGAWamnPEIBn7N3qP7p9V2ZpHUW9rtHd9++QBQI2OYJbY3Ai+EQ5GY2Ae9ZpRoqvUKgfhmE2xVno+9x7um+XSdSD6Xls1SUQ+3jReWbagPpwOTIObU+orhBKC44V+OoqV1pvNuqV5ZxENh1VTFFWOIL67uwt5t3N7Jx31bAzJq/weWHlV1jXMT9few6PZe3cOHp1u/CiSqvIDmyRM6Va1ftyGruksMK4lzroThjg1/CEY1NSjZjw/DIs83x4PVaPgmPsPz/ZPsq/87mu9/nXhp6Y72cjaz5xrlK4xm3E30Hbj1oub1frOuz/eGvl1mX344cNez/YSKdua1YWq11m20E1Gp6oA1KzoR6Mk3EJYrelwLjeZbh9/qEvX74DdpBb1tjJabRZnD+99sH/3/dnp0XDoyyh03RcM1B6hF8GzplbqstJNXilBWTuPUua1CvwYm4F9wv5QMYK7bhlHTaD9lTuPpwfbpcZ7hAJyLXduOEvCPnWi9rfxZ10V8/UCVgXWyRt+8nBRZSaW9WpxGqdJ1BewTHppGFbYk1FqLGIozNmjEdOMMEHlbRR4sE0Ekpdvx8Erg+VanZwuG+puNPlaUU2oz/1hzCw8GNqcbJlLavui9gDJB2l/vVoGNFEup/N5vxcngwjcOBlGi6JcVHOfidLQMY0glDDRrCiolmjrw+P58UmWFRZgYgsVRDTEDbCWvBqOsPxejw5ooH+gyhHUPNcK4pqRqEhArRFaG9vkZSaFms42rUn2rr88HD+DCG+7qEUDYOzT5xhxYS11Cbnm7rA3vPnsC4ePPmraDBhuTXB6+tCz2cg3CX3WRl7m86LY0MSniaqNZi08fiRjIgGuW6gr0118vJGrXlJXC4LCarGeHh4++PDenZ/PTg5J4gSQQayG2ER89wTlDlQ9X2XLVbFea+ijYr0cJCNKG5u2URUgypeGAMYdM+iO921Bb2GmNGsOOKDDU0g0CiomUIs2BFwSDXXdKvAe2Bm1pIZh2GM14GE6SHvjlNcgiiEPBn664kXtUQ5SWXgtQkBdaFXTB6dY5cWcDRM+GYh+z6fze9yhKmGMgDNp7NZiUx0dLacnkD8wVl4VuhAmcNlGILfx3cF01Ellq3U9mQyhEGbHU0ntb0YzDW7HAv7cjef9VESDCHCFS7AVnViR13WWF4vl6t0788PDlgUikQycvd/n8DUsTRTYIPIBtyDUljo+EZJc/xYNJFBHFDzLp26NEqu0WC55C1ZW9dLJi7e/urV9U1K/M/FL+CJsivnis9J03SEupjvUgY33dr/4tW/89Id/nq30ZLAzHHjr5XFZTBkrfLwVqC8dUwvxwupsNTt+gNUfbmsRU08rlUFdn5agAOLONgD2Kdzw5uz44GD/7sP7H5wc7DNTjQC5Hqffh4alS6AjnFoQDOsHoi/hYKzB2kPH0KwO5TdIgUveDSDQR30Y03LqsYU8RsyiDoQyKwBjJCuBQnTql9fU4L9RXTcgufiL69e3OHW+YSOys+nJCKTX8x89OFBJmPbBakQA4KGJBluVChfeVLqX2EEi+qMwCUUsKZ03SAPOIY4YSBD0OZ2maNnuJLq1s7uYladHGb7bMlfWr2m0RLiJaI/kCnALHMLwosg1VHRPQsHhYsZbY5iADeiANsAPHcYGkGLt/Gy2WGe6lbOVev/D1WxmX3i2N5oMJjtb29cGw+3E4zRk1jY1nfLX1CDLvPtkFiqr42cE93T0J6iWFdrkQRRvSijvxK/ZcPf6tZu38FZNlcO9qCROE5DC62RKd7LU+UdTPnUGjHRTeOcHOlLi1g/2gDD5+s7PfnRweIaV5N413dQ1g+BHIIgFZDazAcyW+0D3hx/9ZLU5nezeSAYj5vs1HanNiPhpwAGdYLJabU7OpqdnZw/uf3h8fAiyPBqEVOY1ftu6yOXUKrQiuINpAtgitOVitSLrCKjjx4Vvju3k1LJHjIwOvGy9NIqwMLgrYlLwM68B14X8Ar0VgAC/b5qIvJHaycAc4HNhUawhOf0QajaJZAILDOOwlfRZNJZqMJ4uWho4q/B/th/Y8YD1Ep6EJg6peaTfw3KV1tTuTAmsHQEzaAHpy6G8NuzvDeTxoTc7K3BF1caQJop8Re5AfSmKWnpo6DbqyZBcFAqz0b7p4W0ky1Qdcka30tah8OqiLgo7XefH0zKvzZtvbo/SZGsyHox7W3vjaNhTTLckM4G7NIVW0yFLbUNV2YoKSJ6lziNKL1CaFbir6ETFsRWT0vT6w/EyWzXHj/pF0R/tiojEDKcPxfj4R/ae14Mu5uflxS/Yi8MUqW32pVdeB2l650ffX0xPDGx4Y5qymYwGW+M+zDnfLAIpQLlww3W5LI8LmAQuIUpTSTkJSo7rimabF9P1dLperOv9R4cPDw7h7Ls7Wx4P87IOoEDM+WF74C8gBI0RqvGKEk/tDt0CiIQuMUnV7e4MaGrCh9xolBtvsK444k4ccP1zeU1nJ7rzn7CJEMOChWaQjiI/XC2n9+/eb1sIJQR4TcfoKbXZ5INBn471BtQp21T0mViRpMELBJzRyE8SMGcEMN5DDIIYiVgSAf8QmmArPArCwA+o8zWIhAx7Kce7gpXEfblclGfTarZqB5b3ZE8XFKtbS/WjPuKH8BT13Ysk7QX9HvxQlZrkbkvfEH9BWZT2NlkzXxS6NenQSxEH+zIdcIiP/iAOBj3QaQXGZNau3IS4CdsNqKlOhm4mxlSqzguQwBpRzXoxLtCnGaZdCaPxImjwZrGqSiBBOxzbeED9m+ftCV0X2/lgMLv8kMnzAzueLBUQq2bCj3rPv/wasP39d985Oz4MojDf9B9OT85W1dYwlmKrbcvVYhMGfDTqA06yzXKzWfhhUAH64TKqocqO4pt1M1uq+br+8U8fVIq99OKuCEZwh9CXDfU/u8tpmVagk6DCUBNSUXO6aKxfqLZueOxipDunhMzF0RZLp1AIYUiNUfYnjGCkUq/KrhLLiVX65aYMRqYuyv3p/UE6HPXj4WBcFuDCeb4udVFb7SkQHbDcXkJdNnRwk4f/hvQ5OcAqBisJQgs8CROZDGKQ3DgU/TSU54kCmg4L/IhOWoBRUSKYPrcp7Ie9STxYbvzeYv9hNV21ZZOFIX0iBfM5FGLVUCRFsIQkTcIAdgFSXCuQKC+sETpYP06Kqj09mx/Pi1VtwpSlrsFchODwjSvvUgqcM3p/cKmEzoahWWXYboPoUmSUdoDxI5pHUZZtihLgMpD+dhDsBOEWF0PIDwWi5um6XoGogb6MGKOj8uGfZDG8O8/5oqn/sYHIj5095VpZZNs2fpzefvn1IIw/+vCDxWI2MrdvvNhsVtPN9KAp5sJrQzmCAWaF57KIYA9tVRRlUdKQrrJl0a7W+vBk8+hk/eisgOYcb8Uti2Do/dhP+4kxCzr7n4NrewCVurQFnUMG/iqgCVsvyorNfF2FqezmlrsyqOulcJ9SzCyClN/N+tDoJzXFwYAkGA2Mh1qEwel8XakQuMARofLF4hScAKRqOS9hePOzkhhrUPau78o4hIKAQYQgJCTxGqKhvoliH/IsHUS9fhRGPO3BMulj+KhhJAC4wmKiJJ0AQcqK8imM6cE4jNPBYBykg1hGZx9+mB+dmjAsB/3Ij8NCQRs3KcQQmbWB9lnU8zDphUkcxHHgg2h4YdLfrHzQs+29Ud8qBZEBk4P+w+2YsmrCSlW2UoRvTBzuH8+mZ6++9soLLz6HqFQqsCSJeIAg5fuwJEplb+jUq4kn9wIf7G3geQlum44HAqDzFpqi+9BVOEGvN+I8onOsXDXSuFPJ2ROfZSGfPLf34gM6BJ34YBpY8DPPvRj3h/fv3zs8OoCf9Sdj/7nnFKj62cHp4f7R0dF6fgY5myTgNLCSGtsAnrVZ1/NlMV/Ct9TZ2tJoAzQpa0tdboFUBG2eZ724da2cVGQvS5WtyqLy2jaGkZ2cZesMOAUTlHSwKa6epm5N90GQDfXwU2MWANgn4KX7gXdK604YoJZaqm/jsusin55tJA/KiMYR4f5Y0PUybxULwrAxlBTV2ko4d5HjdUFnCMYd5ZaObcB6kjSIk8B9aIgMnJxvBaUxQmossgGsstczXo9TIIDJVQwvqaCszWg8eM6LVX1S5MvNGqyiCFTo+ZZOUDQMTEgGphd6/cFg78aNa9efGY+3kjjhNIUaFM/pxXIz2h7F/bgy5fR4P9ucFvmKpie0ytabWiEANhFsNY7saGgaPZ9N4SjuM6To/rFkND4n6HNOfGYCNVJ8YAVYmiRoI0Nw5wEQI2jyYmXdp6i0xqTJ2KdTrSR35zqen29/YSTyEz94kXopXE3Z8GC4tfdC4ItYHB08zMo6jfzeaHc03nn5ta+uF4u7H7x/59337u0fzWanVVE1RYX4gLhb1gjP9DmNdIyaz7CNNX22TOl4LQAPAQvUlEbBwHLXSxIUeQ6UUqsVGE9F564g3FA+11W5CYQa+mgPykK1VNlvsMcNuRL4Axy/ZaoocWv4oa6LXtKbT2dQwlD4aeI3qpydLfFWIR0U1fZ7g/Uq394Z4NoKCyfemlUlriSOEtcjBvnAokjEEQ8j+pA9MJOwF0RgQAm0DAJX4EIh6w7sKGtFnS1BTES1ZDU1qYF5yVCGsPRrO3uqCu/eO11uclB0HrI6AhtsfNlu78Sjvd3nX3rhxq2bo+F2FPdEGFGSp1LjUeKPi6CXAISScHsyHBer0836bLOebzYbU0O4rSkYe00a89FgBzA/n5/iEvyALJ7idhhSbw6YNEJzEDSUAKflbDxKwbhj2D1EQ2w1NcJ4tgKWT72yUHbLS3ptlPSgqbpGBDcTzD4hGLGLk8ZoBuDyU1mo5rL9Es2D2w/v3Fksc9PrIQjAm8LB9a9++7lX3/wHp6dn0+ns4YPDn/3wxw8/+miWLcjYJHU1aEsne+P9tIbGqVoFtBMhsJ6QgpqSVVXn6zxbN2XhOeJC478VHW1DHVsaTo9NcrUtmlBUWnoNneXLZRRTJs4yCVUl/aj16WBmKFu4Rb8/gHmCUAHiW10CtZVRgO44Cot1sVyv4V79NDlblzyh4m5W0dnxkBEtSVD62DPpTAB83KfPI6JGbOx/S0I/cC0JAewKcsKNh5uqWlXch+ND6YdikApeAOdyW67gtzlWbjKMs5xiK5A+L9igz15/fffV12/duLV3/ea1wXhMDVoeg4ys1hvChr72yEbDGli41hGdRbQTi3jYG2fJDHQEPF3gDaBWOa62R3VERtofChIRjZodabpM0ICmEzGC19LL3aHS1DlKnYGu3Zgmf2BF1NUGaGSqtj4HsRTkECQuurOSHs8TystTcfjlhy/RAbDntQPX6ETmFcvk1ZfeGCbjH7z1l/sHZ/20H0dwMxkZTyaj6y9uX3+Rvf615nd//x8vprOP7n307rt3fnHnztHJGU3Hu1EoXQMPWoCKrlqaRArCkqZOgJdxLxkuZ8umpvasls5LB4LABcB+NqMy7o1Tap1q9XlLnmc11W7gPwFl61quqWGMMuK0TNSYLmrK6umqaKRXlXmRxDG0w2i4RS3HxiuVYsKEg165Okt7k7PVrKLZW7FYgCbaJPIQwRGAwpg+JIVqLsKdkkvpHIOg5OoeQoE5ATsBBnWZz3OwEBhoD4ylP2xqX22a6Wwxmy83WQnJFAd2MmIbbRcbOxna17/w0uuvXxuOw8FoAHRUdDLIulHt9PB0dnKCW9t+dmcwGEU5aB0TiufLDM67Wpx6thz1g+Fk5/T4oS5KHtE5VExz5bqKeOBXuIxG+n4IaejTIZjus5wRXk0lhKaG1PNPl6DzGaCJuJt26fIuDZ3/W2brZZJQp3REaXTKcggRfLz58vE5vp8wUY0nIfylYIy3npvoWvzgB98HmPhBMRwOTEYfKLK9t4uAHMTBzvDa1o3t57/44j/9b/4Ztvz7P3j7j//4T9966y1sHR2JmLEikzQPba0fJ8DyEpdIyekwTvp5ThVG6jimDkcSQwX4cqaHDYNptjRY2AhJHVy1omqMT8dqUc2ITg3hojcYm7rBepnay7La1BpBbDLZ1qQB6AOogAoNEcQwST0j2vvHD+NR0t+Z/D/svVmTZdl1Hnb2PvM5d8y5hp6rq8fqbqABECAJNEBLlAlSskzJoReH7PCr/OLwDzAj/OTwX7AfHQo7wnZ4ECVRYlBBEYRBgBDQA9DVVV1dU1aOd75n3Gfv7fWtczMru9AkIAA9EMqLZDEz++bNm2evs9a3pu+b7h8vCoKqTrZEcaLflSmh8YiywziKXR8lY2lXO7Iu+XG68QiulqUWGAgNFtPx8f1DVWhpvCaU1VhQQMyL+uh4Nqf/5zSbm52yyqXvjLLc8fVLL11++aUrW1txECHtypdzgFaOuGHgDPrkEMltFa6X0BkHIqKo+uD23s72xuyQzPl4nrpPPrGzFnbpi9l8Fg06UI/CWiXyaPDb2qbmzW+CxlhzxTJ2KbC+V/LyNz3X5dGBCPvBgLSwF67U0D3jLLO5P4GsYBTHVrK2m/sQ2n4kUeqjihXskDxTo7P39NWXoqT3F9/51u27H2hnShhwWZiiKShTcD0Zx9GwNwhir6LsMUi+8Y3f+NobXz04GL3z5g+/9ad/sn/3JoHLZSXJ/2eTMk1DXZl8WRD2n42L+YzsREKat8GcvfBdwmTTadafJp20J2VsAF+wgaLIXshd4c9ElZc8D51K40rsWSzrdgyxLkqKF/PJ3uZmQDduknT3du9TxlJkNfgbvGZUmKc2Q00IXVqWjsQOXeyK3lrUX+vFHZkSdMDyuuCBGh+dMrrRyBuA0d6NCYNVaFo5tVctwXArBaUkJofqui3KmlwpAQPyWwcHR9ZHDrG95T27eeH5Zx93TJYt8k5nmC2mymnI9XsUTbG2qtNEJKlnQqfO6HrU9bGa7M6z0Sz37dMXLwbRpUZl+/fuZNOJw0nkKJ96fqezRkjW1BXBZ2wfUGpMeUDTFJweGC50Vy7oDwImtA55LE7GYUROF6yHvL0L+jTyl3WZLWYp4Xez6TGF36MMDI+wbrVrZ+KE4K7dgoQN+a2Iu9m+dPGLX/6yG7i379xoKCtIo8VkFIQeE6jky8WiQ/ey7wdykbszF53Xzte+/sZXfv3LTZWND3av/+jf7e/f9SJdZIujg71cK7q5akKdGmAMCsGuRi8JoxvOZF7EhzPCIp2YfGPIu5XkWiVlNEoC+6M/XUEuc3+SUcQFaz8aRJTt6JjuVnpJ5WqQJ9LdEkwm1XRC1lK5He/Ky1u9C31KwsbZvDLQyKA/kCwiTmMCtnHX9wnS+u2yNd1sPkVNCT4MT4PtGxvJx5MjpyGITf6Gkg7TQLyiIiiDuReKq43JeEjn9gdHQQ+Fv+2dtXQYugI0hHWhjg8LcL35rt8EDUrYhC3RP0GlVHnz0SyhPHF3vDhcBHRM+ViYaDam+GTrZa0LsZwSEgqWuHqZ5/aDfgKPSikywG67Pa+YDoz++MY2hW18DDZgKL1BtZ+JBK02vDXCygaYLwPlYl1B2IX+kR663OJMp9p7VBfNsR8WThIrgUBUGVphBdjO9sWd190vGFvfunmD/uTACygFQpHRbTKTE7ZMfFxqJC1RKpYLP4pBzBGHjz1/5eIzFw1ofor5dPzBzZu3b97Yu7N7dHyPHA9vPYLr04B4k6sCtXN4tAzDg53tfi/h8MOFKlS1CSf7kNWsiqbMyuVc9LtuWWDizweJduj7cZFNMdRCGVM1XxtePDz4gODScLM3vNhLB4Q00snBA4oB+YwweBP64dp6pzfsEkasyWItuoQSMzRwKxJspFhLhzwcRR7llFnTS3pJIJbcMcWPyLxxymWBMkBeojtIic1sSSam1i8MUWrRGfkeE8d+4FRFSWli3O1iyoRcJNhalEfYMzC69IvxLAkphhTH9993rVjvvWTquVElFwLsWm9bL73RaF4KeayXVkwvXOl21zqFBW06psNgEFog6aHPlaMU7zuCYwXDN1hks5UqsFONNqDP/DagC8AApKYsMyNsHkQJ+RwM5rmrZTX3v/uDPzjTsrZnFN3OfBv5bGOZoY/MFpwVgtKtdHtjqyzLvft7BmDDZ5UU7CUhSzMA3eRNsxx5T1GXeb4sVU53H/kNejZKId21x598+nOvffGFl1/bufB4mPTneTlb5jlUsYTi7RKLchx9VFHoJ5TaSt4wgH/V4F3lpasyLxZztLUgL2H9fm+j3xvSb1suckre07RLLnA6AzqZzgsKbIPNgQkckfijxfzO/iTupK2oKyGJ4Vqn14+ki5JrwDHCg4akh4aiyw0T5RCuUZmaHy/Ge5NBOoSkSBMa7ebLDCIqtaLMZTydZ1VNpzHJm0VJQM0frA/9iG7lnBBzHBMaFXRaPPUNBEOXDL3rurAQ2/HLBQL24mhczOYp2PCzsirIs0dxEgXJYP1iZOknE86Q6AJ4eam8IOqvr0Mzioe8lSqahuyvZn4+cHWQuRsnVjpSOqi12zCVYwM2ccu6c5qZcVA1Z/1cl9Bk2ulJL8SEolylPu4f/MEfiLOo9lQvu9Xuku2QFfPltAx/XI9ph+fSTvrYE0/mdXX7zm0/CkHohLqq4AHjVi0cGVqp6oIiQFHVFV3CShOYpViBvBqgLEwg1XrhsSe/8tWvfv23//arX3rdS8KD8dF4Pqsbgmsg8J0vzbKofDDDgWadGWNdvERjAlgM3Q7kzikLQtZNl5tiImaopFzb3K4aZ541hXKy2lJ+PqdwFYruxlpWq7ffvSd8b2Nzk5kuTZx4nY6XRC6dSSdNoCEdMpeJpTwuoNd1ar3RW5scTBZH8+XRgtLnwFIG0msML4NqTQ4zXyyKivCZGRdmacRS24Vy0p43WOsEkaLbtdtPMUQtDb1iFLW7Wgpji2XBsxlIDBu6Ttnyzt07dBZ+mIxnM/K7ne5gfDTppf1e3DvcP46gYBipykynCxyn6w43hmEagRBa0o2a4dZuwHLDdzKKPgA7IlDM+YulAOZL07ZlvcT2R/tkH5AtWFvfpt9Y1jrACrW0f52EhHjkXyE+/BlzP+FnK1X/2le+TA6D0qWYgj6yLx7YZ24yyup0o8mdh6GXL/LJYtHtdpVfL/MsTOI07dDdu1wWwOEhhL5NIK++8sJrX379v7H/7dtvvf2H//wPv/Wtb1NqIEUzy5p3bu5NZvPL28PE1YME9LbFcrqYzQLUcAMK7YtpdjSaN2pOKTfZDeE1ig3zvKHDy/OGzJXuAp8Sjjg5zuu9w7281ptBL4ySsi4EdLTo8CGEFwC3k9UxZSZQlEOpDeoYWmazOaGK/dv7OjO9aDA7moaU6aXrGIdymaVRmWVezXOTayd33VmJ9kTYiRwX2MjDTCedFma4Qhbiw9IaNmmwGQRoCAZrVzvVcBPFmEimFgod0bAzGHZ6i/E8W5TZ5N7t9x/QRc0XDXTnGiGUm0/y0f7kUm9H0c1J4Ulr3Nl+SDccaOMaehDE84wsyRuhACOA8QxvMLss1cV9Fp7JJ0zhtcSxKx7cUyqEn1VH+ieETaBDB/bWgNBJdOXKlW9/+9vkQpx+xxqfXbfbTkiSwfz4R9eHw+GF7e2NjQ3CLHlZEHwvigK7AtbOF/OAtQrjOO72umRb8/mczuqpp5/6J//kv/7H//i/uvHeze/95Xc+uPXeZHRUFcvdw+nWWqdSZerbXtSLog5mPx1nMV4G3W4tCoUOp6Cg54RmWizIwpgfwc3JNVMo0X7m+HfvHVGWu7GR0vHkmG7BPi9ArY+RbkIzBMckAWVBp+GCMIRuUArjmIzy6K+Y7E0nk1lNyRmm+FU2nyb0NwcBqq1ZboTnBLbMyI+pxdImHfrTQoc5iFA6a4lMWJ0Ra1pgt1esNAaRdQjboHQfWNcbrG/3woGkzEl2mqykvJOSv717h/m0Oj6cUA5PrsX1QkLapvT8UBwdHqYbYdDjwTBC3nXpMsW+KivWXqJfQYlQpQ16oo2ttdeS/7W0gS3xrcetFopKIDo1Kz0rezrC+/OZy4qvt66rOE7p/Qz6w42NzVvv34w8cMkSBuVpdduOf25vb5NPPD4+bmlhcDCQSkiKsgQPoqp1FGvdjEYjuq0jfnS7HcpkHLSF0xdefumZ566Qa13MxjfefefdH705PrxfFAusLWNQCbykGG/vhx6dkxI4bSMWi2w+nlNELAhCt8SgrgzoLk/CW4dTQkiDYUSxh7Ks6XxGtyeqcS7T/IDLPnDIt7h0R0BPnIuEuqoVIQNCZXlWzOfLgmBYPk28tMiaxbKmaKbKYjwe58oUVuTKKQx9IDnxw5YHv+UtQG4XBLzJhNHMBjvNrC6DWXQeyYDake9WjfYjURvw9EpocxTLrCbYfnwwK2Z1uTAhVLmxfl03qnHLqJ8Swj7Y2x86kQMpD7q6c2QblG8xT7bLtVe03FCo0nRDoXrgnlRsoQPG/g38mEEUU5zwWQjBnihGwEn8fObCC/OU9bmuYhXOteH6tZdfuX/3XpGXtvFapnnkRkxI1h8OMLLES94HBwdZlhFMTvIk5LWUsiRMo6AywhPbhGpns9l4PAoxl0BPoNSqEzPIHWxsfeWNrS98+dfm46PjwweHD+5Pjg5nx0fZYp5Xtc6WG4OB1x2oosbANCb00PxS2CmybkAYKfH8IGuq/fGUEjVDCZHWW8NO02QeeooYqGEaIgecZ/DYBncY1EcNJYbo1znYV8jBLVe3dPBkaklEOY1CRQ6tHONFUV04S0UJkFtoK3zrRxjQIcP1A6wztvSa0LdHQ55n6iXlQnaxyOkNRAEYUBW4s2wNUF9HIiYMIRW0i+vK0OuWuSnB+a0IYygHHBtkdQQDm7xezhwvqWVYWoEhKcPCe/gtKIeg2shbpKatV7V7pe0m80r3Hq4NTY6UQBxYMM3Z3QDxc5nLiuKbLg4lDagvNDqOoldffe3+vXvv/fhHKGAQSiA8rQh+8g6Qw9NKjZ7OKWWYUY4zGA7IaIDswAZQETIFUmALYwJ5qSgYZ0jz6BaiEI7CR+iRjXU7ie/JLoG6ja3nX7imqjKbz2eTCWHMezd+NDrYPz46pvseTKVJp6SEwVo6WD+NO8N1wlSHx+Pj+aQWmuwm103COy7QgrAoKmF8AIcodSPrmm4/nYQ+WidoWQX0QwSoDZ1J0fgiKAioV3mdNZS312XFBKs6K+qZEkvjl1ZWjihB2ea4vrvav2rbdbxXDDYkKQi8t0eU5cv9g5HnBpuUQIWhDdAGNOWyH4VxNw1MSG90ebggwBtFSW6ZqT0vl8vSjbzuRp/iJGURfiOgycC76T6qRQGZaVVWPkZ3peD9CN2qYkomMrLcDxJcT+IPSW4a6KLT6fQpLnMzWDwcYfh5zQWGSICD6VllFAYUU/r9we/8zu+Nj46mk2OylQaZSQOOTErS6iZJKHeUa/QYrlHwIgTT6/XIYjADwGxbBT+AMbnW3loSoZmSos5shvnrOJpN8OuSJCQMS38Q5dVxmGxfXrv8+JWmLr74hS/mS7Kc6ds/fOeHb701OjwuRU15rQQbe7g7nh5NprhSAWoklBZ1DETP6Pn9RIQRbBTpEUvSOcxnUJR14pLBhJQbZ2U5InA0WVwY7ty/tTvZG+vSuITSvGhyTL4KVwD85i4kI1B+MYYspkTB2WK4y/cJotANZjwROyH3oTy+erwG5MtpYyYTFQXkpzHdO89mw7V1Qjiapz5QLu8m+3d2yVfC4RI+6Ua5rRZ5ziQbqDo7EK2EO0c7mj/ocCkVpUMIA7TMsAyLqSzH2FNpe9liXGzM0UWB7FHoB0kYp0mnC7Jn8Hu6Z7tCSKR/zmgErIYFfqZ4wYoeHeG1V64t5ouDg+MQJ+CVVUlmXEFk3K5UOejG9wM67ygK6acI9lKuNOUHGZBSisI/GQ3FI7IbwkaUEYY+GNfBQFNVBHRqVRMWpqeNR5Rrzwu6oxtMSSC0hXF/bf3FV1792jd+6/Uv/Nozz78IJFurvaPJZJGxrLOpG/C60hXqkgVLS9g1dEUSerwqYMPI5+6qpkMRysyPF4ETNoU5vHt4/c33KXNOZRrYkJzKcpJZRXmQpWCKGNrootZF4yyUndY2M+6S4AgEyU3gmY1BlEaUplA88kAvGLDyIFYPHcwFejDTXi/sdAm2xRKIw6wQKHohlNhHXuDbSh0fHB3uHdLvTaMOxT4C5wF91u/6sZ/0YklRz5adHka8AKDB5uTymCklZwTFosb4Re3Whl49xkS3D40J7IKilUrmEqfdIQW+C5cfD6OYfp5b78FqX/4Xg7pns6SHu0VJ2vs73/y9bm/trTd/SFEmSbpKlYRfa5xyzc1/tDdLsnrd0Fc9KcnIyLs8ePCALCblB9lKv98n5EsmRbA+9n3yI3EnDXxPaV1mSwzOGbvQeuqII3p1BkG9HvmbsEN+p9vppL3B5ta1tc2vfPXry7x49733vvv971+/cePw+HhGmfB0rkq1XGhKqwzI7izZEBSeHZHnGd2+kQiQeB9XR/eO74p9HxP6ps5hRvu7Y13ofJGTiRJ+B0aTPmbSDWUaTmmcyjqUrytH0m2Mfy3BVQeUIlYGTIugMWxqak+1YngaZXhNN3kQ8Ko6ana8rwydP8U14plBoPEagjSRU6rs+CDv+HNIcWOrlhkQ0PVAmVa4ijyKA/53zaEPaxu8bOFjX1+5SssGjQGpWWqPMhU/7vheouk5hFqizvbFy2GcgEOGN7Uc56wm7M8PdcWHRdnEieCn6fUGX33j6089/cz16+/u3rs7nWrVaI9hL+X/Ks9dHn3C4jR7xeVySd95/vnnKRiRxVRwIerWrVvkdciFuoQIqoJicFZmOBpUkXzQikK6B7QoqkJqbsDAcBgRUAzIdkIymWF/SIA6LwqytBdefOGV115RRt+5d++Dm/fu39093N+djvZVMaYnsLaV9EIsP1IqRJAFKREF/UzPx0qrku7ZmDwBuH69w4MFVCHBw+PZVv9IkPvEAgsdGMzFYKCiYZaKBvNcjtJOhY6Gy5ABvEesVsWtGGymtkygDvYloTDgMu+pz5VUev26ashalqbQonRytaAUPaTMPPQaj3mBodiGIQPYoVY+i0npVv2bEy4yacSgmjxrTUlirgLNDVOAwaDjguHNo0wsJCfVG25duNQfrDGQcOg/86DLigX1FzSXj/Q0BGhCOnVytVeeffbSY5f3dndvf/D+u9ffrWuUcjlmBzxuC7IPOmm6pVB9MQZGEIRkIlyqQQJFRnN4eBAHWJQh6IDuU4TlkDnWszPYjWDpIbwoHrUmhAEqVQKTrjiiJydIquBuCFl3ul2ym8cuXHj2qSvCyMl4hMm02dHh/p3Dg7vj43vzck54NY1CpC41IZxgSm5o1jBtuq5k42EoWQeET6XfSqjy2ropa6XAbgi9cLgWSPWCqIerpVBNIu9CQaoyLohImjYdaWXrycOCWYPAHDt7JtIE7ABhJVTYWBiSF8Sx6UD5xNrWUDZi1xwsRzWdXdpJUR+C2GI73gp2H5w1Ztaxl8cj5JSMkC/xysbk9F4puSN3LZMg6Ag/NizGksTpxuaF9fXt/nADc1JgnwUZ4oqsfaVN/cs3F0HYgiwAPO9llSbpM1euPPb4Yy+/cu3O7ds3b1yn4yeHEaALAz4MsgQNTVX8iOQ0m770uFj8xBNP0Pd3dnaKfDmfzUaT8TyfBUFBEImyja3NTbq4eVWZLJMslAg0GVEAdhHuwsjRpqJ3UBQU1+hkyWbSLt1JstvrEdru9fvdbrq986QVTxTFC3WZK5VNj/f3927PRvvz8eEim8fQiXfy4sBH1xuVEDICyjLIasiCQTqmQTenhV3yZAkKgxaybA0zH2levGDsAS5ucn95hWUlv0IyHACaSI9n4HlaVqHg43KB1WHp6UqDChcHLt02O5FimS0TL9m+tG0b7069Tx4HqyAhth7BrItJIDIrl7ytbEsBYKPFzh5kYciLlzorYVXYkGqExAir7FCSTknmhceG69uEXdB7xKoZRaUAYg4tPccZqCt+Qor6F3rQNcrzPE0S7FzVFZ0QnavP64dVVR7sP7j1/s3btz+g21arKoli9Eeapq24cCqKR5Ik5KJQ1MHkFJj76L8u83w8IeQxI8B7eHBIMGVrfWvQ69KFrooyp1Qc7TpJt2AnSUBLZFrSNLKbijKtKI6Q0tOViGXcCTrdXqfbTzp9AjlJ3EUT1+qEMgPHLsdHu3dvj3Z3927e+f6ff8eyCDR5+ghlE4qNijGobvnuG3BPExKA3ZO7JCeQa7Ew3tL6cwN106bJU89cXIsurIU7a7KXUrBOen0M5mIWmA7Fp9OsXQGZsVaHgu5sDRLUwNFo7ZKloNTWGErtQicYRANbeqO9xeH9sedGlPdWBgolIhTzehL23XQYyhBNRfAcYjqXslS5rMyyICOOk95WZ3Ap6W/5neFg5+L2pceGmzuENaUf1xWCPZJToCjBexdtz/mhRuMv2Vza/IcZp8xJdci2iSknUBSz1XI2n0wnN69f3713r6QoE/hFkZFlUA5HBlMR4BeUbpBTN5QmKNSIDeYyWhUttqrJeJxni2yxqMsict1uklLKTdZBBkp/DyFin+FRCCcmkKNhBwBlNRftLO2FApA7Iqsmt9MjuNftpd2U4x7dYn5IR2XKKnTEW9//i8nh6OZ7773/3o1ikdPthsmLsmxTT1WX9PZcP2wwqg5zaaypNKVFMrd+wR0EpSpXNOu9aGsYXlpz+3GDTbRe0OkFaeIFoaVMiJyyj2HygEl7mbG/Ii9LqIQOGzP2AQs/lsuSXtEUTj6j6OgS1LVazmc5ODi6dBPYRTUL+37UhXSaBtcANnLr2qkbMa+8QvtRura5/cTmzuODzYudwcbOE09tbF/ww5RrTJCgogsCLwe5FrCxM9GQOKGUEisaA+djfNiP+g5+Z1M3FGYO9vf29h6MRkfL5aws8kbVLAFiMLQLTSf6ogEANTzXvRrWMG3Pu6mLbDHNZ9NisSjy/NXXXiUPTzEIRLGOOD4+YHpQS9gljDuEtVVjKAtzWNIHZV54XMpp3QDCrQ5luXGSxEk/jteCYIBdQKdOYkmQpcrz+Why9+YtQmH793cXk+lyOq/zoi5KrqNDZbEoa6gjORLIFMPJ4P2o0RXHbBKlO+vDzuNr/lrYpKnb7ZKt0K8TKWb2vBD07JDVCbkzTsGM0BKocljZHCCCsK91K3CGaFWYIjOLGdbtVQZhOFSrQ7fQmXKqiLLo1FcQOVINZC4IMNlMiYNFUMnehYuXn7364hNPPnPpiacvPfYEGYrm6Rj0hjxcD3K/zkfTMK+GKz9uc/krjIjwbN14nDTS7ZotUZoloznc35uR55mMc4r2ppFYGpG8ZNUKdlvsmziG8kKjCsfULjJC7D/S53RHxGGggKlrysDJ/ZBzq/F5QghvmRXd/oCsI+kMhJdgEQcTcT7KDdgOAXJG7cilrLwXhb0gxOQlxTQyKZAI8ZkFQmazxeToeH/3we7de/fv3D06OMyybDwZL7IlDAY8AcioycYrjOQQqvCgLiGdbifaTsVaqPtkKx1wlSSx6PWCXuolsYtf4MpVOQZMgDxUyiVaiCegai9NI8qlKrJmuVDTaUa/kBwxeQRylPN8Sn9QfwPcShAw96D7Tu+mbJoKep1uvP7MpWeuvfrq564+/8LFS5f9KKFLypLgIM6XdNOgQwQKKuH+dYxAn465wGJ0q2tnWgbw1hRKCkuL5XQ8Pjw62nvw4PDwkEdJsSoGp9gUus4geK4KAcKYTBoV+zIC44UeRuQGeMgDVXCCRmV/0KMXJ6++yLLpZB4lKf2tXtgbL+rZsh5uX+isX6jokgUxdKEpeIHzCcIpKHAGIaatPT+JYywwMqQgsEW/yuWaJP2WMisWS7KTJQXW6++9d/29m7t7+7PZslQYtSHfWDY1itPMOEWvPfB111NJ7KWJGwU2iUQ/9ZNQpKGbhODMoTBKCClEDZjpWRomJAHpHLrV2BEipFzaPGvGk+WC7NOlV0krINzGDV16Cfoc2ZEfIB2rmijpPnP1+edf/txjV69tP3FlMFyzLEfuufC1INwFnMPYLP/dbjs491k0F9QcW/Z4p9X5YLpGh0f2hGCeMMyWXL91+4P792fHB6pYpJ6ORG3LSTE7GKTQAGvqZRoFvU7q6GoYurpcViXFiHx9bdBNUwJtNRpSlEJSGuASKiLULL1YOeHu0XShhDvYEslGaRPHo/u969EdSaehlpHv9DqxtiHW0QKfi/gBD+7K3nBwslKDChC+S6djJeB2WVHufffu/Vu371+/ceOHb789Xy4tllhjF3wLKrCl1IW0DVlMJ6JcVqT0ATZvkVB66/k4cRfQSUIEFZNNvAbEVKJkM1i+EgZr5A6mzWpT+P5UYC692+0JT86yBXk1giOXnnjqueeuPffCte3LT0bdIcVbwtWWSZRaTc2qUousXFtf57aHB1WVlixuxVf62TMXZ0UthZSClbbkaguh1Zlu2b0xSy8IDcyO9w7u3dx7/83713842r3uNcsnLvTXhzCZLnLBxGlU3/dGhwfL+WIxmxBu3Vxf76YJQRmsCscEmZub798kBFxQbMNYuNd4SRMNmnjTBlvaHVBS6Themc2zxWFdjq1V2ztPRx1w9dI1DShL9zxUWChcsaonwobPHS5Bpx6Q4UPPOYzBW6MtOSc6mbu79+/R/x7s3rpFVn/r+GA3n43qKg99mQYYW/KMGiShbw0q8B64hLE3BuVI7h9YZkHAAjrT7GNtjDyJaAibWGzilWEwpfQpCIbD/hNPPv3CSy8989zzTzz9bCcdAjQJyrtCcAoKzBHXhNIb9FAIladpOtjYEGw+p2YgVgpnnz1zIbha1SWu9YrCBjLYdHEwVGXaxX4m+OQBQUouYt/qcnz3B3/+//3x/33wwdu9wAy77uZmtz/sJd2Yzi8M4ljEo6MRpUKLyThbLnpJurWxgXkg3fC5ukusTB8SXO4Nu4aChRfOa3G0cLKmZ7wtI4daRAT7imo+nj4YT456vQ10t5K02+36ABcEf1GMwec8JQJ0SMbkyoSiFeYTIKcGQnX06loWZHxBkQh9Vo61ixlF2iPCaZPj/cnh/nI2rhcLBWIIsE3xwC72gmTgGKmZK5dbhuiXY7SAglXaHfR6w053OFhbT9fWu5sb65ub4BSKEnhpjl1SBtINoQlTU6KP0p8iWzEVuZJO2kFNAYRdbjuBa+2KTVCsinLuZxK7rHQYeSBIyBWniLFtw5zVk7iObQkDVE6Tv/cX/+bf/ov/ff7gxkYqhqnsxE53EHcGPT8OCHR06QunI3hIZbx/UGZLdDygTogmjOKuJPt03e3HCYQmmvF0VhEKsomWa8pZK0y3NIkNY+U6mcoX+YIJzuD5yJdAGxN6mT75wy4KxPhfjAEaj2cB8Edg7SFO0c9qLC8C+jwDj7EFkNIw4mF6dNPOclvQvTegjK/pD9Qu2OHIvIFWNOSGIM7GIqRtZwBsqxgzAOBmcWWMJXittixP6nAJCJ0MRymsrcBPoX6HcjO6R4EkcMbDZwGGALkl3TJPCrES4f2p5uI5n96Dp/3aDqU43Yjj77C4fctJ01AGtHjvu9/64//zn872bu30vXJymFVycGndl3RdCvB7QDlTgoS5pqBEoFh2Oj3sHzXIvuna0VXr9obkz+iwwm4AWROhwyRaTOcPdo+Gwwi5RFN7nq59WVlMNIlYRm4TdJldRkqkZo5DNkdpWydJe73e5UuXO/0IHCnYucSbpxMqsgIFfixI0dmXdKyYxoCwJSrPCjJX6AhyaYNhhACZuCB4FMCm6J1j1Fkwo5w8nbNvKXlkjfN1ebiNlclQMHZYNo/+1JrF7RgF2hUxKGtygXuPzBzGFic8RuKu0uJVLeVMCY5VtX+q4sin9rAf7iGwmTMhFGv7wlag2loeXX/rn/0v//Pd62+tx/JgUvomS3d6xXIJaQZDMBE1QDqqyfQAGQ5FB4GyA92GlBPTxaZEna4f3VP9To9SlcYXhnCH6wzjNHIDXdTDflQ1NvCrhShGSMM6wusoaE0aJkZ36HJDKZEnJDYH6xN6HI8jGfQTQkcJuQDF9ORJRFCpDlnFm2IKjL2hxE85rd40XgjleqQjLg+ZuNxxdGWrEIWGeLunblnkVJxK+LU1Dy59s5Y3k1A77Z3FVKzMk9pqSrR6l6uZJi4Je8IPHQqoQNLMzP3hWpj4MLmP+Cyaiz2xlUdoxXmZXvG1laqpIIeymHz7n/9f+zffDRqVjXNPV5trvq0bihalrgJVRuT6A6+Ui7Ax+6MxQdALWxfoNlLYpV+gcNuJoTofBW4aJ7JbOfUcgqMyjjrpenLZeAZTsY4JoZM5LxTmD9y4G3cM9OM1O3KwimCWnqKEwJDXsD/s93vABLVCkcOxdVHyIrUwns9ypq2H5xotZmBx6gpkcWY1pYABKZbqlkw+LMSpDC66YJTnsMjL6lvYPbUtUbJtIZ1dyf24K3luywNlINbltUNUwiWYOgKMkcUpiMTYT7VKmh+2ip8uNPLpexf7YVsRq5UUsgRFwLRlzKWL8f6P3nrne98VdR0wwiEAO5+UocfsuaWTOo2fBD5ovBztLJVcuDLSXm4DiJgJzzqh9ToYLKlsTWeL/Su6+ePYKJFldWiDcLDjmOp4ur+opmG6dnGt54zl0bIQFt07iBtoKF0SyMEOILq1utPtBkwAUfOQGNRgG0VHv1xmZCdleeSH8YULF8g4wI8jWp04ltNg/S+HVeIFy507LHBpHu6L8hAI/2fTmgsvILcxQrYy8Lzm5YrVQFyrS2xXGmVOq+bWohmCV4BZSQRhB8MsLWf0wB/pDTs/VQ7gUw9GH+VxVmUYukJ0B86PD7737T+fHB9ZpXvrA6H8armg+2Y2o2TY8SJH+KY7SIIIqzLKrQcX17pJD103chZ9MIrUlc4EoRlKuuiUdKUqui6d2IvDvqnD6bQKPFmpAo0lL3JTlMuWpZNnBHNrBtsYapS8JOBjyjwKkogMaLyYiUymvK6Q2AaVGa6Hhr5fKTWZTnFUvR7fzMZpWZic1pXIk8jUAjQeW2j3Ae1qH52vAuBPe7ryIbowti2LyBVz/8qBnei6aFb6aCetMGbW7cYxpkp5+0KeDTT2xATPms9n2lzETwZP5tV3uW+uq4IQwAc3rr/9gx8sZ4tNSn21iYOwsJkf+tCgVyziVytd5MoFxVi01hVBoMNAJDGdKgGAjK55HGjQYKJ7aGwTitgVFFZqMp6kPyCP3xidz8swcSPRaMppzDL0Y7LA+dKUvOXSztO3tPu8DUCBLXAoP/Y9AkqEc+f5ktA2JahkT1VVdftdSrAbSPeYVSFjxYIC1mTQRJ8Qm7fMta1yueBhB8nPM9LBRJZoca5c1UMErzbjSQ0D1FWBs9VGNMwNypFPhhRlO70uwAqUUbA3LGS7tnKaMK9M5ySzOEUCn1FzWZGAnAgHtJQPmr9qGhtin06W09n7b71JWTFUbSgzcUyMcWCQNJHrqVUNou6G7KowDkiysbQN8e6EMg3QmMErg+yEElpIzFmhoMIGqhg/8ZraVGpMeWlCSVAaN87S9eNSgJDIDZq06xY11OmwdgYmN2CRWlfs6wFkMMRPN7Hrgr1ZCAK2bXZKVkJ+Zm29fxJVWvJyWE674GVY/JSTLbYUhzuqOGfZCp+vdL+ZG1KsFKpbFe+WYdm2gsRt3oQ1F1gDW6DBygHmWft98ixoPa0URNosWTyi5u2cMmz8zfAu9uxnlp1um+MhGyB3u5hMP/jxu3WWiUpNmtL2IiyfswIiHV+lnIg1uFSjJHR8ArKhppF15YDBjEADursAqaBaP8HWqq5wSjAuC4G0ShS1XM6WlS2jYeh2RL+bKONVSgdkQ9j2kyjDa94dA5kbqGxRzfB8n6VaHNigiSEAhj8kikK+RdFzcABcVihSrO7dEyIUZ4VUdescYNk4V33CYeuyXrc4ZT8+yXLtwwRBOKtQx8kVPzCUQe8ABehW90y3u+z8M67zk0qL4t/71D5FqOs8EjclqprYEwCBp2pm48mtm++TW0FGUdcQeFJ0N4tuAu5XymXCOKTTxJoBOabadyFtXCuuc/gOU5tLejGfFyWhtUofqiTIq3n23g1laEvb5I6s9fpw6Hh6f7S/FvV6ncE8AzVmTfgVG+YeZgoMRkJrUKSG2DaG/JTjpthdCUK/XcuARjJvvTirrNcauZoGYGlEy4zSD6sGpo1Qbbj68Da6OAtHfyJGWDaT1gYRg/hfnxdA2a/4J/XZh5f5l/X49KCueMTJ8O2gNS9uADZOR5id42oUBqTLWrc6kSHEcwWYKbC8Q5akKI+lu96vSoQOTO5RIuDhu44PqU+eAeD6quuQw6mUUJnwgkUxK6cqlN2mEctqkm7H3SAmFJKrqhMPrzz/Wm/r2eNZtffgwfHxcbbMqqqmaNMo5flhyDsNlJ9UdVOWJZ0Tp7erUPJwzIcZIU+ZleyjJ9eGndVq8EmF7IR9qR2SdZxT3Rjej3Och/gDYz+We22S4W3CD5dXTj6mx6cXjMSHSzAPc2nOAaScTqa1JrfR+BxbamUa5TQQOS3SGFVs8juszkAGZrDxpHVdZDwYgYXyyMYidBTZkJCRH0ZBRMZWNeg4YFpOuOPZcnmQNZRjV1Z7BC17Tt+RXVDDa8drqsL4wcbO+sbWDrmlxWI5Oh5NZtPx8Qi6Wlq3CIQgr2AmJrdV+GNA2RLSn4JKtpmWEGPlStoAxMUSxzkr/7QyKXlSf3HEWRfBBcwV1Qq7lHZklRwhOZUeBIQftRXxERnF31DvciZ5Pk38JXNzt4jdw0axq4z0rM+an2QHdHC2LE0ShtgYqWwAAOdDZR67NZC8xZo+6O4blzexDC+zcn+mVIUqlpmEg9C6UAf3Rwd3p1ZNyQRlQJa0tfnskHxPlk2UC7Z05h1CrkFubLCeDNY26Y2NJ7OqLJcYc8mgAoaScYPC+gozihUQbXcFeeLVMqcBZJJaFpUTMzpNYlfW076EWC0XnnaGzyYsbehpo49omwienyIR6lHqzhu7K8T8i4KUzyR2sWfm+lZXjcuXuDk3treCOAIZQlFbw61ZoQSUlaVWmPkFOR/6bIkPqnhTz/OyWmA6swTbP32YjpIdkG2VWYmxTUi2AEXORvPJ8WxyuDi+T+myjP2Y8m4ZHSRr7sblCz53H7C6bll+TJ6Q4vM/g8GQyTUAZaqyAFlnnk+nIwqK9HzgJtBwGO5jyJOxZb4fJJuKsG1WewIvxNlPTiwIHBVnfLA48SYPbaWV6wzCqNPtt8wEzOagW8z78Z2a96m6FufhjAtbDZ0Bdu4CXIuEF6GnYD4KEGKQMoLLSVVmdJR3Ot68qnUN0iqrwcFezuaQJkMXWPNeNp2l4xVyOc90RVfSSYJw0FubLerJ0rn9YHn4YJqNVIB6no2MGlQRoeA6L5POMGeGcXDPckx5GCPhN7CpCkULQjBR0u2vkTlcrC7WVZnneUYfWabLEs1AH4RvDIBX8xhMlW1EWzI7IZA8U3BDisPz8FKzSgQbjjw1JMP1H+A6P+jwwyf8dDIBIk/81sd6Zt6nZylntilP8sPAa1v+KP/Hg+5wfW32wX06l6Yk5KpWQtSOk2LcMpQiSDtpmnRMUxwfzpJYQQveRWptq5wCFaXVk91xCy3o5ce1Kta1lw4PZtW9o+XxcWEK0aPsZ1GmoHHrd+KuVTpb5EaizyK94EO2YoXzSJGCjxGNmiSNkqQ3GKKmh5awM5/PDg8PubrHwqh8T3BH0fIEC1hJ2TKcusbsevvN1jcgEhnnRCn3oR+KIiRpLQVOyz3AkwziZy+y/U0ORqdiOScPzdOG0sOeqzS6Nxg89cyT995821bGtnLZDkQP6DmTrCaQGUfu8WS+LGe9XrCxnlblyI1cqF9TOBeJ1B7U8cp6Pl/STd3p9ZdFfnt3PNi6vCgleTAvifKaQC5axBtbg/WNdXovo6PxyOTu+nDN7wgMG7g/HQCA2aAt4AoMgAtwlK3H8fr2Dv09dV1RSkX/KtWwVFXNTKggDoTyM1RuQk6eYDrM1Q5z8XlWxeVl+zY5lzzriS9O8mSHiWJAuO2IT+zUPjVzMW2z9uz4S9t2b0sRUiRJcPWFqz/4086snNeEDEzdEsKCXrfjVZglUiiuCFFqfTidDVK/RAmm8slSNJSpnBpEsqEfa9fNlc4bMy3VdPee1kiDB+vd6Wicmzkhxf6wS/cu5WK2n9ZeGrsdPxoCK/9sOR50PU4WYlb/nxvZdPAUsDAzteJdqxutsBeiWbXYtGQrdnXrtALH3EHizFxwaGphymq2sP0V1p7OG7ifpK18RlqM8pQoXPOt5zGPJN1RTz9/de3i+uHBLZsYcr5xGHXjuJN0hAGNU+i5dTVXatF4uNOmue7HfoIqH+XGIO8io8sztbazbUJvlGd0Bhe2/MVkYaC37SXJoMlKt3bXkJc388VEVcvUv1Qmbq+zFQ8u/KzmwuWis+GAj9y2LbA2kW4/mEegVSQzZ2gruEtgH1Kkiw+PddhT67An7RNrP7Kt/KtvLvZRByO50IklU1VXGxtrz71yNQyqixfWL2xvdOKQOzUUPzyrVTdNpaOWi+Ojowe3378+PdwvwPOJKce8UPMSGldeFBNmnS+LnSefcOKQfNT43l09mS4W8zTora9FohSx6zQ6m04LgsVl2tXiwtNrl714DaNr1jin9fuPnjR7CDMfCbXc28PRniQ04gxkc0/I0TkftPLk9Vcmh5W8D6dLJ+NjD3fc2TEZ15W/GuZizwzdyL+q3rKqZVqOTtZIpxG2Pt6/Pzm6f3R4V1eLF1988pWXLkewE8pKTeAHvW630+nqLId8RFM6dud5/9qXZl+6//7Nt/7yL3c/uFNaG4kAUjNMtDGd1/uzycu/9ut+P57kC68qtXRVlnd8tx+RRTmp7zZNMc3mshcOks3+hacvPfUCJeOBa6U4k7qdObCfMA5xkuCsvtOSED9y84tHksKHpX7hfBjIMbGKdU7mrk87ye3n7S/jbsMn7Fx+2eZy2gPj/qexZ3IK8bDIjYVvynPAbIRuIpgI0JsVtSnnB/fefffd75T58eZm0sPWVjcKephBCmMewfexMEuXcxA5TSW1L0zU1KUJkseffW443Hj3rR+9/Zdv3rl3KClPkhBgDxuhSm/31t7lpy/ZqpwcLEZ3xr6T2JpsypRlZqUhFCzTddndzPT2tWtveJ0++IHdR7co/qrs4yO//RFPFj/bSMeZeaVHrPCv+l1/Y73LiUTJGe8iPlRkwT+YyccMduBXqoxQf1X17Hi0d+tw9/3FdM/Vi80exYjKd7QLOjAKQiHIVTB/xvofkgXVvdUsgDCeCAI/9mJrrn3p9eH6+p/98Z/dfHsvIIwgKpE3C0qOx8Wxd5CVUzXP83kRu24Vl/l8QYk4+HTTPiHceR197vNvXHz+84SnVxWX88fHay7iJ+srTMRgT4Eajy4LJ/YDo+vIN049Pdh7b//uO9PR/Xx+5As9HPY7cUrPjf0UcwIOpUEejyhBJ8d1gkZz28VinkmCpkmRjyq0CrqJH8knwyfSXjQY/sX3vnVjupx7MCv5zvffof/U7Xp1nm2Q85DO0cGB1naeKy+NdJDOjP/KF37j1a/9bcdLrA+9c++v2C4/N5dfqrXYU4fSfiXMSZziuTEMI0pjZKMpzS3mex9c/87uvTerfE+rqWuVG4ZcglfSCWAFXklBoVFLGYAIULiB1l47dMQzjeAnBEOS0V4Q5U1ZFtPA05eu7vxm8OVuv/e9f/tOvdSmsro0i9FU94KLW8NuEM4XM14S9hoZ0gsqHVx57Utf/Yf/eRN0XDcutWgl5c49zMcfjE5Q7MlnZ2YU2jlcjEnXjq2O7tz48Tvfno7f1/WBdBa+S6da6MovbOl2dBR0Ub/XyvUdP4wjSK52hBfQC6JU1dZuoKoCVkSCQIEUVVWQGZIVzlUZrLmv/vrLhJ7/7F9918fecdgNuwMk4XI2XczzwgYh2WZmPCOSp196/Y1/9F921nZM1KstvYTr/OzT8efm8kvoBD3MiURbvFq5Fsyf5U49m+ze+M6f/tFs/CAKat+vfXYpgSd8x0hTNvWssqVSDdiFUc7s090OTkQFRgzPCxyUMRDmQGhsDX1nPj8GxQb0oxQBjwr6I+ral14oc/X9b73DdNTJ8SivdQRe/rC3ILAd9WRn7fnP/9obf/8fbD9x1Yl7mszNiKapeBEsOA9Hn2Td5Uwmickyikd0DEVTzQ7u/ejP/+h/E00udG6UBheHbjArIFjO2zaz8Z6h04whbud6GFgIfa2dslYaarDc5fc9rD631U8IJgrPQJAFko21YIbkrchV4Ze+8bmirP78j98eJL1+Z5iRRYSRIv/R75jO4Eu/9du/8bt/v3fpMfJZLU9c4BEiUh6ay+e28gmYS1urXsWgEw5sVdPVNxRr9PzOrR/9m3/5v8rygWcrFkXxGsUdEMjkGUjNC8IVCmRbTumIoK7teKxTVcZp10XGoiTIfEC8Slbou5HvQ/YDS6dQFmzaiZHGaci0Aqk7W+nrX7t26+7o3vtHNuz5SUq+KBoMnnn5tdd/629deeXzbndgyalBBFeEHsJlJ3LbUVrnHL08cra/5JX6dgJ1tSy34t2o6zr0KGLkUuS3fvy9P/nj/yef3nGbY89RHk9RUg4ioZtlE+yYWcdrXK/xQlZ/weoWuFQirLB3hPQaZNOQNeUOHKiDsaquMWEpmG2SB0w0xS7KvX3Ppfjl2d6P39z913/4PUd31y8+8/gL15555bVnXr6WrG85Lua3OQ1qy2oN5MXAi+vwIpN3biKfDHZpJT/xQSFDq4z+Obh38wff/dPx3i2jJqFbgZ1RYLTDSBwLhZUGXHQQNwb5KciMVmPv0I6maFVVroeVGt6/UFj1A1UU8xiD0BztOLHaGm6gCuUqbWotRBCZF7/wgp9uJOljw6c/v37pajRYl66HZSCHB3hXxS8rTjp4jjgHu59AVZcR7cN6Ln9Pov2smmzy5ne/dfu9t0Qza8qF62On2LJkF/pEWPKgjFeC3wmK755igtcQeuntdg2UmVweFKH02V0tCmMNFXaDcV5CHmjueUx8DrnGRvugtjaz5Yjw0Objg42ty/0rzyjbKXUT+r6MQgMhUEa0D8VtV3vHfz2P0rm5fAwehp2MqnLKfO/deu/erevT0YMkqC1lPAZamCwK1ASYhzbYHwLqAGGp5g0hTwQYthWrLh3PNrccOSjlGG75angjbPYRnqFXc7lP57EwmFJQjdXAN2lZl0Vlj8e30+I5b7hNdprlBSU/SdLhdqBw21Ej4Z3J/c/N5RPKjM5caEHI0i3y2Xs/fvvoYFdXy7LOQsqesbYqLVaxlGCmJG+1Fw4BV1cy9hQuUw3wN2QbZYCOIKSBEQeei2GVBOiduqxaDACMtUfLlG6UtXNuBXm7oq6W2fH+wfsb6WXhdzpp3M5ggzLDtErZ7X6yaO3lU+jg/QdpLm1bvgUulpkQ9Ojw7q1bPx6NHvjClEVJEQfhCk1oq6F07WB4m1AE2QSm0SDyA6qB1aARXs3D0qjD/M4ULlzWisPgmcFoLg8ZOY0LNh1ecnSYWvRkB6eqSxl4ceIpK4p86pjcdQJuS0TtayKC2tUE/cms0rmxfOzmsuKmOUMIRWdLSXFx+OCDB/sfqKY0toqjCKKrLmwFNsJKtrZxRauQ6QRg+JYWZQ+rXSZBENge8oxp9zIATlmnGGP6jTWrA25KAdkzDEV7WEh12/cC4i24sMINe4IQcr2ssnEQJPTCrQI3Kn6y5Wrlty5WTBDi3F4+2TLdqv5iVHVwuF9WJd++GEZomkIZyPSeQGPJjDfQgIdChtQsrtXqm6MYzKOKEF1lUsKgVZVstUEl72Wwj9Dg7xfQX7HYi5YY5nc0TzAKbMXXDaFmwjoNdtXamlDbsxBnKkbmDO46f3zC5tKCF2tHkzFkW6OYXEScxEVh6lIxhcmJEBwvpEELivUmWg4cOA7DCNdpx9JYCQ6VGpBcC+z5Gbta47GhF2EDtq5BhhN6XKyTXAZCXNKqaSoIViuvhmaw5ZaEaZl4Vt1ycfK5OYlF5ybzCZsLr2Y5TgFtFOif27rSzUotuT1+IVcMS6iBMIMfuNbZsbR7F9L3mJAddOR+EJN3AeEac5msiA/FismNt0jbFUAQ1Dmg/1AEbKDZY1ysvDq19SClvFpJNxAFM6dsK2eGcuw5evkEzOVkhOxkQVy0fFCg7GLAiqZMiSUKAzpGmIlrWCL39MclZzwrfgrmSyUA62H/Cvi3HY3mbS/mf2zLOvyTeb5sOZ7AdOtCVUY1FW+XIQaFwrcStC4QDMkqbPbIEzK4UzfC+fmJrZxby6cSjHjw0gsiFoe0MoiFrQM/NgLSc9DcYa5HT1umqF0NORt0HCFbyoteJ/yvLUIhC8DqqIUSmbPi1mnJAD3pcDKkyFJUXTSQXa6bqqZYFLmyKerlohkpJ7yY02uCAdrIMzDFrrA577Kbc9P4pJoADwdc7GpM142T1IM7McILCUko1Fy4cgJWYtM4FJ9aHWxkweSKoPfNZF0Nk7tAC8qVrK+uWXROsPQQNyj5l5FDikMIGIL1ulaQMMwXBFYcTaGnaRxROm6dm/3d2YFSGy9qrJyBs9izD2kf7Wp/5YQB4fzx8TcBTjdB2rpXu1fhef3+kFwMWKWNDHzsXNVN4aBG56wYA8Fb3IIV5DoQd4FGvAPtPVlAGjiMXBR4oXWEJ3PdDpiY16fBFdiUlJE3dQ0pJ3pOrUStVVUZqBK7tamqzI5G2VJ2gJRXbEoPCXrsioPytGJ0bjGfQiINDEtnM1xfRwWmVMIoX/hBFCnDMmjcbmbO+5brj3e6wMyhW+53bZ26LHiI24SEXhwWJhEeZT8IJfRDhoVJ4ZPKpgI/FPkll34sVx44u+VySXCFoo/NyFwmpbsVJ90BT24zzdMjPLMrZbDztOhTMZeTS78+3ICadE4GYQnqOoxb0TAio3GwF21Xa38nogbgn6asGrMyDj1R+9DLqkvR7tlIiJ9CZGpF64W2tLUEYst6UfhWBJQV1ZqybV2Zaqan84ryq1kmZrl7ubc12Nh2MFF3OijalqHNCZuTPSWBOn988nUXQAQWV+3ls0PXDwXGjiQzmbuW1UxXMJYrqSd0nqyoBi0EKOCCU1uJwugaAAg8BFK7tsGbN6KtxgLYELol85PWM7kq53lp3dksm86LWe7IyJkVUtn+2vZTvfVNek9YVJUfnlGwD3ms5Ke90fMfirlYax/dsBJOmqQ7Ozuj/TsWUnmQH3d843F1TrOA14oMEuOTmplzmJBUg/+Hld0rPIF1YJF7+41QsmbCi1MtBMp0IHJT2bpW2cHk+N6eUVCtbIy/qH2yt0XjpcPLl554LgiTdoyGLbNlp2z5ZVuKQPvvyU18bi6/SOx5BLrwVEA6WHvyqSv3bt2Yjsr5ciEd1e2nMvB4BUmwGo3k8KNtwxRILhaLVK2Yt9DjvLel2kLlTYrVvmzLkrHSENDNYpTV00wWZvrg+PDuxDWyM1i3flpUepFTfhU9duHJy08+y50HICYu65xZTjcP/wpxXnb5RMp07gl8bLEAJ7k2oDx368JTcXc4mx0lveTo4EFRlRd2tpMYzJRkMNBpcUDjSDe4aqC/QsYRBpHr+Y4bGekbFyshkrXhCSZ7Ahq/TtOKomIs++D+/sG9g9SPpBLzUWXJn9hgPLe1q+barQPfjeP+ztbWY5cpmXdYb+GUvaUlCsRYhHOy6HpuK58UdpGnFtPyj0PVx0+2dx6/ePmp/f3bboCNZ9vwbhplOcZt8QumGFbEHZiq9FwwJfleJD0Q4KCkb1j6VOs0jl02n3xZjfbHdaF6SX9ydzrbXegEulHZwqraIyvyo0FWGRF3rRf3ty4889JLMu3Ytu3w6PjTebXl04S69nQnnFkvZHew9vSVq2+/+Z2mXsRJH/rc2OgxXhuPtNCo4mF7CJU61GCwRyIw5gLaF1AaeDy/Yp1qURFcDkXi1GI5yfd296U5cJVf5MYqBYYpbKH4tXHr0jQicMixdIfrO5efe/lVpND2vKryGarqPgpkyGRUbQLPf/LJZ596+upbP5xEUU87leVBOLrXjZa6reFSPHIgmawNRvIVOQqKPK1ghyGs4fGgXGMVve+gNk0+r1XuNIWoszIE3AnrGntpYHdwowr8qMLGkQySeLD5pd98I+qtYbzy3FZ+gcDxSzcXe7bMxTkPmsxkmsONC1/84leDsKctNAVNmzw7HpQeGvpYiQhCMridgMF5N638piV0U1Pi45iKPEqhS1HMm/17o4P742KmVemqCuaiardWXtF4hZaV42s/UV5ko/TKtVde+cpv2CC0Qp4Dk8+KuVgrzmRF7Qf2xVhVB72jK1dffvHl163js320cnFIfWvQ9mv6pywr+gB1O+xE15VqanBJMqq1TWl1KZtC1hk5Fc9UgakDq0KHDEW5FNmU9Ywb1iKohN+EaRNEXq//+NXnvvbbv+3GkfD9xp53Dz9j2EWsqLdX6JFnVxzeGnODztrX/9Y3f/yjt8fLGWeymJ6EuqlVoOZAK5osB4SUYOhoPN+Xvu9JYwtTV3lTZo0qbOylDw4mi0lRZhDVrSuXRQk1i79AcqjkUrFDGDkI13d2/qPf/ealq1fofZRNHYTB+f7QZw3qnvYZV1/QLY2xXFCXB73e+jf/3u//H//0fzJNVjV5IGyt9Ua/q5sloC4Kvk1VVbppQsqkrV/XppP2dGWsiaoiu/nu/aYyVWaMcnwZudZ3KFF3XYO5XZT8rGr8tOPGndza/trwd/+z37/6+mttl8mTklxY6AbnB//ZSqRPcIzm4YJ2VI3+D43EznDjytUXXnzp1e//5bfCICmrxdr61nR+5DpN6FGiZEFsLLHDSoaSLZeu8KJw6LoxBaOyLPNCZvNaGl9imj9gCV5IuhMS8pKEfkvtiNLa0JMXnnjqm7//D65ce9mPQe3N3SaXZQzPa3CfFXMRH0IyWODBaiuzC6ObLEG0HGxefOz1X//ajZs3lotR3Yj7e0c7G72ymBFgQZLL1PrcH3Aa7VBqNJ5W5XKZzxV9VJT7mFjIsLEuNlp52hLlYFfqspJRDPaOTue5z73+5W98/UtvvBFwoQWbZ07LTXtuKJ+dqq5zOiBlT2ZfEWFYWQUCpStlNBlcffG1L375jX/9R/+vlbHrO9MFK0thSKrdDwDXAjZL/MhoUZbyeFzORrkqnKJyG+uJxoNOkYN+o3Rl3S6/+pSth72Njc995Su/83f/06deetELI8NZmtvqsq92ic4t5jPiXexZq1lBSl7XYN152ToDTPUnnfWvfeObd+7c/953/4ygTeg5jWtjP8R2GXkUKIOwcTmyyKuZyg4Pl4RtCfzWFdaPwKOPZWpf8d4rg1wvjjuPX736d/7u3/vC176+trlJOBdF41bvAwMzhrXszqu3nzWoa+XJPJpZCa7Idp7FtopfFJFcx9vcefwf/qP/4t69+3sPbmZZ5iQ+nWhIgciTTi0UzyYYo8ej5XSaHe0tVSFjHzT6rh9QHu65hHD9WtfSdzvD4fbFS89fu/a7v//7T710TWO/yJfYmWXUjd4BD+eeG8ovGD1+2fwup8GoWWlyWt5TtzyrYHQrlqq18RzKaAgI68O9u//j//Df3/jxD33XCF2nkRv6LuEdLMQ3hhzIYp5li3I+y0wjPTduGghSURIEoilW/L146eLVl1/8j3/vP3nh1c9H3U6jGhlFBIAq+nGmgEKpxTie2wpUW2ZYPX98Fszl0bD0k/jXadmvMUBL4Fcp6Yl8Of2Xf/jP/uRf/Yv93XuL2Sjg3tB0fFxmhdOgftIK5LIaLBReKLz5YZj2ejsXLrzy6iu/+cYbn/vCF8Pe4LTqaFeadOJ0kvLhmzo3lc+kufwUUyIH47rtxiqr5lXl/t6Dd995860f/LsP3r+x92D3YO9BVVbkhKRhXiDXCUMCJ2mUxIRLNne2Xnjppdc+9/krV6+m/R7FGpYfOqfY+FU0F6dV49GGiVvwmQU3buNAYLwaHRwcHx/N57P5eDIZzRpKlx3ph36n1x+sDSE8uLbW7XYGw0GcdoVEjKuqOkk65+byK2suZ39vq6DBUplaN40XMPsXfVZXyHnAwcAFE2wpIm1mDg9gZm0MSMhcz+U06TzO/IoGI9ZXcSHmy4tEsqVicVzAUcs2Q4BWBEFwQhYjeTjKKnQhmzCK25CGSo7DXae67oTxubn8ypoL5S8enII89TRkIhaEyh5LqWKJGZPcRrNEYZsFyxU3R1vEcVbMDKyo6bjno/u/wsHoRPNL8PGbVumUgkujm5bDvSZ7Yoqo9smtoNgqz2qHr+3DiIZFyPPy/q+yubQVvJM5yJNp8A+l4OKEhuonEvGPIjFdCcCf28zH+Pj/BRgAYItMMRmerLMAAAAASUVORK5CYII="

/***/ }),
/* 18 */
/*!******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/限时秒杀_03.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/限时秒杀_03.png";

/***/ }),
/* 19 */
/*!******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/限时秒杀_06.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/限时秒杀_06.png";

/***/ }),
/* 20 */
/*!*******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/首页-商品_06.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAACkCAIAAABEhxhOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUwNTc5RDI4RTU1MTExRUJCRDI3RDE4RDFDMkFCRjQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUwNTc5RDI5RTU1MTExRUJCRDI3RDE4RDFDMkFCRjQyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTA1MzQ3NDRFNTUxMTFFQkJEMjdEMThEMUMyQUJGNDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTA1NzlEMjdFNTUxMTFFQkJEMjdEMThEMUMyQUJGNDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6MBfFGAABbrUlEQVR42uy92bNd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"

/***/ }),
/* 21 */
/*!*******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/首页-商品_10.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACsCAIAAABHFvEdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUwNUFCQjAwRTU1MTExRUJCRDI3RDE4RDFDMkFCRjQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUwNUFCQjAxRTU1MTExRUJCRDI3RDE4RDFDMkFCRjQyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTA1QUJBRkVFNTUxMTFFQkJEMjdEMThEMUMyQUJGNDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTA1QUJBRkZFNTUxMTFFQkJEMjdEMThEMUMyQUJGNDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6pHpIqAAB6AklEQVR42uy9aYxl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"

/***/ }),
/* 22 */
/*!*******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/首页-商品_12.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACsCAIAAABHFvEdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUwNUVEODJGRTU1MTExRUJCRDI3RDE4RDFDMkFCRjQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUwNUVEODMwRTU1MTExRUJCRDI3RDE4RDFDMkFCRjQyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTA1RUQ4MkRFNTUxMTFFQkJEMjdEMThEMUMyQUJGNDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTA1RUQ4MkVFNTUxMTFFQkJEMjdEMThEMUMyQUJGNDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7AuV6pAABn5ElEQVR42uy9Z7Bl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"

/***/ }),
/* 23 */
/*!*******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/首页-商品_03.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAAClCAIAAABgGaDVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUwNTM0NzNBRTU1MTExRUJCRDI3RDE4RDFDMkFCRjQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUwNTM0NzNCRTU1MTExRUJCRDI3RDE4RDFDMkFCRjQyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTA1MjJFNUVFNTUxMTFFQkJEMjdEMThEMUMyQUJGNDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTA1MjJFNUZFNTUxMTFFQkJEMjdEMThEMUMyQUJGNDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4knns/AABx9UlEQVR42uy9ebBl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"

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni, process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 29));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 32);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e28) {throw _e28;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e29) {didErr = true;err = _e29;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function s(e, t, s) {return e(s = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && s.path);} }, s.exports), s.exports;}var n = s(function (e, t) {var s;e.exports = (s = s || function (e, t) {var s = Object.create || function () {function e() {}return function (t) {var s;return e.prototype = t, s = new e(), e.prototype = null, s;};}(),n = {},r = n.lib = {},o = r.Base = { extend: function extend(e) {var t = s(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = r.WordArray = o.extend({ init: function init(e, t) {e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,s = e.words,n = this.sigBytes,r = e.sigBytes;if (this.clamp(), n % 4) for (var o = 0; o < r; o++) {var i = s[o >>> 2] >>> 24 - o % 4 * 8 & 255;t[n + o >>> 2] |= i << 24 - (n + o) % 4 * 8;} else for (o = 0; o < r; o += 4) {t[n + o >>> 2] = s[o >>> 2];}return this.sigBytes += r, this;}, clamp: function clamp() {var t = this.words,s = this.sigBytes;t[s >>> 2] &= 4294967295 << 32 - s % 4 * 8, t.length = e.ceil(s / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var s, n = [], r = function r(t) {t = t;var s = 987654321,n = 4294967295;return function () {var r = ((s = 36969 * (65535 & s) + (s >> 16) & n) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & n) & n;return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);};}, o = 0; o < t; o += 4) {var a = r(4294967296 * (s || e.random()));s = 987654071 * a(), n.push(4294967296 * a() | 0);}return new i.init(n, t);} }),a = n.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n += 2) {s[n >>> 3] |= parseInt(e.substr(n, 2), 16) << 24 - n % 8 * 4;}return new i.init(s, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push(String.fromCharCode(o));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n++) {s[n >>> 2] |= (255 & e.charCodeAt(n)) << 24 - n % 4 * 8;}return new i.init(s, t);} },h = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },l = r.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var s = this._data,n = s.words,r = s.sigBytes,o = this.blockSize,a = r / (4 * o),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,u = e.min(4 * c, r);if (c) {for (var h = 0; h < c; h += o) {this._doProcessBlock(n, h);}var l = n.splice(0, c);s.sigBytes -= u;}return new i.init(l, u);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 }),d = (r.Hasher = l.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {l.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, s) {return new e.init(s).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, s) {return new d.HMAC.init(e, s).finalize(t);};} }), n.algo = {});return n;}(Math), s);}),r = (s(function (e, t) {var s;e.exports = (s = n, function (e) {var t = s,n = t.lib,r = n.WordArray,o = n.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = o.extend({ _doReset: function _doReset() {this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var s = 0; s < 16; s++) {var n = t + s,r = e[n];e[n] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);}var o = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],p = e[t + 3],g = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],w = e[t + 8],v = e[t + 9],S = e[t + 10],k = e[t + 11],T = e[t + 12],P = e[t + 13],I = e[t + 14],A = e[t + 15],E = o[0],O = o[1],U = o[2],b = o[3];E = u(E, O, U, b, i, 7, a[0]), b = u(b, E, O, U, c, 12, a[1]), U = u(U, b, E, O, f, 17, a[2]), O = u(O, U, b, E, p, 22, a[3]), E = u(E, O, U, b, g, 7, a[4]), b = u(b, E, O, U, m, 12, a[5]), U = u(U, b, E, O, y, 17, a[6]), O = u(O, U, b, E, _, 22, a[7]), E = u(E, O, U, b, w, 7, a[8]), b = u(b, E, O, U, v, 12, a[9]), U = u(U, b, E, O, S, 17, a[10]), O = u(O, U, b, E, k, 22, a[11]), E = u(E, O, U, b, T, 7, a[12]), b = u(b, E, O, U, P, 12, a[13]), U = u(U, b, E, O, I, 17, a[14]), E = h(E, O = u(O, U, b, E, A, 22, a[15]), U, b, c, 5, a[16]), b = h(b, E, O, U, y, 9, a[17]), U = h(U, b, E, O, k, 14, a[18]), O = h(O, U, b, E, i, 20, a[19]), E = h(E, O, U, b, m, 5, a[20]), b = h(b, E, O, U, S, 9, a[21]), U = h(U, b, E, O, A, 14, a[22]), O = h(O, U, b, E, g, 20, a[23]), E = h(E, O, U, b, v, 5, a[24]), b = h(b, E, O, U, I, 9, a[25]), U = h(U, b, E, O, p, 14, a[26]), O = h(O, U, b, E, w, 20, a[27]), E = h(E, O, U, b, P, 5, a[28]), b = h(b, E, O, U, f, 9, a[29]), U = h(U, b, E, O, _, 14, a[30]), E = l(E, O = h(O, U, b, E, T, 20, a[31]), U, b, m, 4, a[32]), b = l(b, E, O, U, w, 11, a[33]), U = l(U, b, E, O, k, 16, a[34]), O = l(O, U, b, E, I, 23, a[35]), E = l(E, O, U, b, c, 4, a[36]), b = l(b, E, O, U, g, 11, a[37]), U = l(U, b, E, O, _, 16, a[38]), O = l(O, U, b, E, S, 23, a[39]), E = l(E, O, U, b, P, 4, a[40]), b = l(b, E, O, U, i, 11, a[41]), U = l(U, b, E, O, p, 16, a[42]), O = l(O, U, b, E, y, 23, a[43]), E = l(E, O, U, b, v, 4, a[44]), b = l(b, E, O, U, T, 11, a[45]), U = l(U, b, E, O, A, 16, a[46]), E = d(E, O = l(O, U, b, E, f, 23, a[47]), U, b, i, 6, a[48]), b = d(b, E, O, U, _, 10, a[49]), U = d(U, b, E, O, I, 15, a[50]), O = d(O, U, b, E, m, 21, a[51]), E = d(E, O, U, b, T, 6, a[52]), b = d(b, E, O, U, p, 10, a[53]), U = d(U, b, E, O, S, 15, a[54]), O = d(O, U, b, E, c, 21, a[55]), E = d(E, O, U, b, w, 6, a[56]), b = d(b, E, O, U, A, 10, a[57]), U = d(U, b, E, O, y, 15, a[58]), O = d(O, U, b, E, P, 21, a[59]), E = d(E, O, U, b, g, 6, a[60]), b = d(b, E, O, U, k, 10, a[61]), U = d(U, b, E, O, f, 15, a[62]), O = d(O, U, b, E, v, 21, a[63]), o[0] = o[0] + E | 0, o[1] = o[1] + O | 0, o[2] = o[2] + U | 0, o[3] = o[3] + b | 0;}, _doFinalize: function _doFinalize() {var t = this._data,s = t.words,n = 8 * this._nDataBytes,r = 8 * t.sigBytes;s[r >>> 5] |= 128 << 24 - r % 32;var o = e.floor(n / 4294967296),i = n;s[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (s.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var h = c[u];c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);}return a;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, s, n, r, o, i) {var a = e + (t & s | ~t & n) + r + i;return (a << o | a >>> 32 - o) + t;}function h(e, t, s, n, r, o, i) {var a = e + (t & n | s & ~n) + r + i;return (a << o | a >>> 32 - o) + t;}function l(e, t, s, n, r, o, i) {var a = e + (t ^ s ^ n) + r + i;return (a << o | a >>> 32 - o) + t;}function d(e, t, s, n, r, o, i) {var a = e + (s ^ (t | ~n)) + r + i;return (a << o | a >>> 32 - o) + t;}t.MD5 = o._createHelper(c), t.HmacMD5 = o._createHmacHelper(c);}(Math), s.MD5);}), s(function (e, t) {var s, r, o;e.exports = (r = (s = n).lib.Base, o = s.enc.Utf8, void (s.algo.HMAC = r.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = o.parse(t));var s = e.blockSize,n = 4 * s;t.sigBytes > n && (t = e.finalize(t)), t.clamp();for (var r = this._oKey = t.clone(), i = this._iKey = t.clone(), a = r.words, c = i.words, u = 0; u < s; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}r.sigBytes = i.sigBytes = n, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,s = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(s));} })));}), s(function (e, t) {e.exports = n.HmacMD5;}));function o(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();}function i(e) {return "object" === o(e);}var a = /*#__PURE__*/function (_Error) {_inherits(a, _Error);var _super = _createSuper(a);function a(e, t) {var _this;_classCallCheck(this, a);_this = _super.call(this, e), _this.code = t;return _this;}return a;}( /*#__PURE__*/_wrapNativeSuper(Error));var c = ["invoke", "success", "fail", "complete"],u = {};function h(e, t) {u[e] || (u[e] = {}), i(t) && Object.keys(t).forEach(function (s) {c.indexOf(s) > -1 && function (e, t, s) {var n = u[e][t];n || (n = u[e][t] = []), -1 === n.indexOf(s) && "function" == typeof s && n.push(s);}(e, s, t[s]);});}function l(e, t) {u[e] || (u[e] = {}), i(t) ? Object.keys(t).forEach(function (s) {c.indexOf(s) > -1 && function (e, t, s) {var n = u[e][t];if (!n) return;var r = n.indexOf(s);r > -1 && n.splice(r, 1);}(e, s, t[s]);}) : delete u[e];}function d(e, t) {return e && 0 !== e.length ? e.reduce(function (e, s) {return e.then(function () {return s(t);});}, Promise.resolve()) : Promise.resolve();}function f(e, t) {return u[e] && u[e][t] || [];}function p(e, t) {return t ? function (s) {var _this2 = this;var n = "callFunction" === t && "DCloud-clientDB" === (s && s.name);var r;r = this.isReady ? Promise.resolve() : this.initUniCloud, s = s || {};var o = r.then(function () {return n ? Promise.resolve() : d(f(t, "invoke"), s);}).then(function () {return e.call(_this2, s);}).then(function (e) {return n ? Promise.resolve(e) : d(f(t, "success"), e).then(function () {return d(f(t, "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {return n ? Promise.reject(e) : d(f(t, "fail"), e).then(function () {return d(f(t, "complete"), e);}).then(function () {return Promise.reject(e);});});if (!(s.success || s.fail || s.complete)) return o;o.then(function (e) {s.success && s.success(e), s.complete && s.complete(e);}).catch(function (e) {s.fail && s.fail(e), s.complete && s.complete(e);});} : function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var g = /*#__PURE__*/function (_Error2) {_inherits(g, _Error2);var _super2 = _createSuper(g);function g(e) {var _this3;_classCallCheck(this, g);_this3 = _super2.call(this, e.message), _this3.errMsg = e.message || "", Object.defineProperties(_assertThisInitialized(_this3), { code: { get: function get() {return e.code;} }, requestId: { get: function get() {return e.requestId;} }, message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this3;}return g;}( /*#__PURE__*/_wrapNativeSuper(Error));var _e2 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" } }, "zh-Hans"),m = _e2.t,y = _e2.setLocale,_ = _e2.getLocale;function w(e) {return e && "string" == typeof e ? JSON.parse(e) : e;}var v = "development" === "development",S = "mp-weixin" || false,k = w({
    "address": [
        "127.0.0.1",
        "192.168.31.97"
    ],
    "debugPort": 50012,
    "initialLaunchType": "local",
    "servePort": 50013
}
),T = w([{"provider":"aliyun","spaceName":"shuiguoshule","spaceId":"5ddf7849-2c44-401c-8d8b-43acbf4b9d4b","clientSecret":"TYubO8yatAkLr5KCkHyM8w==","endpoint":"https://api.bspapp.com"}]),P = true;var I, A, E;try {I = __webpack_require__(/*! uni-stat-config */ 33).default || __webpack_require__(/*! uni-stat-config */ 33);} catch (e) {I = { appid: "" };}function O() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var t = "";for (; t.length < e;) {t += Math.random().toString(32).substring(2);}return t.substring(0, e);}function U() {var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),e = _uni$getSystemInfoSyn.deviceId;return { PLATFORM: S, OS: E, APPID: I.appid, LOCALE: _(), DEVICEID: e, CLIENT_SDK_VERSION: "1.0.4" };}function b() {if ("n" === D()) {try {A = plus.runtime.getDCloudId();} catch (e) {A = "";}return A;}return A || (A = O(32), uni.setStorage({ key: "__DC_CLOUD_UUID", data: A })), A;}function D() {var _appPlus$h5$mpWeixi;return (_appPlus$h5$mpWeixi = { "app-plus": "n", h5: "h5", "mp-weixin": "wx" }, _defineProperty(_appPlus$h5$mpWeixi, ["y", "a", "p", "mp-ali"].reverse().join(""), "ali"), _defineProperty(_appPlus$h5$mpWeixi, "mp-baidu", "bd"), _defineProperty(_appPlus$h5$mpWeixi, "mp-toutiao", "tt"), _defineProperty(_appPlus$h5$mpWeixi, "mp-qq", "qq"), _defineProperty(_appPlus$h5$mpWeixi, "quickapp-native", "qn"), _appPlus$h5$mpWeixi)[S];}var C = { sign: function sign(e, t) {var s = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (s = s + "&" + t + "=" + e[t]);}), s = s.slice(1), r(s, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (s, n) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}), v && "h5" === S && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return n(new g({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var r = e.data;if (r.error) return n(new g({ code: r.error.code, message: r.error.message, requestId: t }));r.result = r.data, r.requestId = t, delete r.data, s(r);} }));});} };var x = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} };var q = /*#__PURE__*/function () {function q(e) {_classCallCheck(this, q);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(m("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = x, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;}_createClass(q, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return C.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this4 = this;return Promise.resolve().then(function () {return _this4.hasAccessToken ? t ? _this4.requestWrapped(e) : _this4.requestWrapped(e).catch(function (t) {return new Promise(function (e, s) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? s(t) : e();}).then(function () {return _this4.getAccessToken();}).then(function () {var t = _this4.rebuildRequest(e);return _this4.request(t, !0);});}) : _this4.getAccessToken().then(function () {var t = _this4.rebuildRequest(e);return _this4.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = C.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var s = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),n = { "Content-Type": "application/json" };return "auth" !== t && (s.token = this.accessToken, n["x-basement-token"] = this.accessToken), n["x-serverless-sign"] = C.sign(s, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: s, dataType: "json", header: n };} }, { key: "getAccessToken", value: function getAccessToken() {var _this5 = this;if ("pending" === this._getAccessTokenPromiseStatus) return this._getAccessTokenPromise;this._getAccessTokenPromiseStatus = "pending";return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, s) {e.result && e.result.accessToken ? (_this5.setAccessToken(e.result.accessToken), _this5._getAccessTokenPromiseStatus = "fulfilled", t(_this5.accessToken)) : (_this5._getAccessTokenPromiseStatus = "rejected", s(new g({ code: "AUTH_FAILED", message: "获取accessToken失败" })));});}, function (e) {return _this5._getAccessTokenPromiseStatus = "rejected", Promise.reject(e);}), this._getAccessTokenPromise;} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this6 = this;var e = _ref.url,t = _ref.formData,s = _ref.name,n = _ref.filePath,r = _ref.fileType,o = _ref.onUploadProgress;return new Promise(function (i, a) {var c = _this6.adapter.uploadFile({ url: e, formData: t, name: s, filePath: n, fileType: r, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new g({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new g({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this7 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,s = _ref2$fileType === void 0 ? "image" : _ref2$fileType,n = _ref2.onUploadProgress,r = _ref2.config;if (!t) throw new g({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var o = r && r.envType || this.config.envType;var i, a;return this.getOSSUploadOptionsFromPath({ env: o, filename: t }).then(function (t) {var r = t.result;i = r.id, a = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: i, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: s };return _this7.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: n }));}).then(function () {return _this7.reportOSSUpload({ id: i });}).then(function (t) {return new Promise(function (s, n) {t.success ? s({ success: !0, filePath: e, fileID: a }) : n(new g({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, s) {Array.isArray(e) && 0 !== e.length || s(new g({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return q;}();var R = { init: function init(e) {var t = new q(e),s = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return s;}, t.customAuth = t.auth, t;} },F = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:",L = "undefined" != typeof process && "e2e" === "development" && "pre" === Object({"VUE_APP_NAME":"shuiguoshule","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).END_POINT ? "//tcb-pre.tencentcloudapi.com/web" : "//tcb-api.tencentcloudapi.com/web";var N;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(N || (N = {}));var M = function M() {};var j = function j() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t = function _t() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: _t }), Object.defineProperty(e.promise, "catch", { get: _t }), e;}var t = new Promise(function (t, s) {e = function e(_e3, n) {return _e3 ? s(_e3) : t(n);};});return e.promise = t, e;};function $(e) {return void 0 === e;}function K(e) {return "[object Null]" === Object.prototype.toString.call(e);}var B;function H(e) {var t = (s = e, "[object Array]" === Object.prototype.toString.call(s) ? e : [e]);var s;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e4 = _step.value;var _t2 = _e4.isMatch,_s = _e4.genAdapter,_n = _e4.runtime;if (_t2()) return { adapter: _s(), runtime: _n };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(B || (B = {}));var W = { adapter: null, runtime: void 0 },z = ["anonymousUuidKey"];var V = /*#__PURE__*/function (_M) {_inherits(V, _M);var _super3 = _createSuper(V);function V() {var _this8;_classCallCheck(this, V);_this8 = _super3.call(this), W.adapter.root.tcbObject || (W.adapter.root.tcbObject = {});return _this8;}_createClass(V, [{ key: "setItem", value: function setItem(e, t) {W.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return W.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete W.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete W.adapter.root.tcbObject;} }]);return V;}(M);function J(e, t) {switch (e) {case "local":return t.localStorage || new V();case "none":return new V();default:return t.sessionStorage || new V();}}var Y = /*#__PURE__*/function () {function Y(e) {_classCallCheck(this, Y);if (!this._storage) {this._persistence = W.adapter.primaryStorage || e.persistence, this._storage = J(this._persistence, W.adapter);var _t3 = "access_token_" + e.env,_s2 = "access_token_expire_" + e.env,_n2 = "refresh_token_" + e.env,_r = "anonymous_uuid_" + e.env,_o = "login_type_" + e.env,_i = "user_info_" + e.env;this.keys = { accessTokenKey: _t3, accessTokenExpireKey: _s2, refreshTokenKey: _n2, anonymousUuidKey: _r, loginTypeKey: _o, userInfoKey: _i };}}_createClass(Y, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var s = J(e, W.adapter);for (var _e5 in this.keys) {var _n3 = this.keys[_e5];if (t && z.includes(_e5)) continue;var _r2 = this._storage.getItem(_n3);$(_r2) || K(_r2) || (s.setItem(_n3, _r2), this._storage.removeItem(_n3));}this._storage = s;} }, { key: "setStore", value: function setStore(e, t, s) {if (!this._storage) return;var n = { version: s || "localCachev1", content: t },r = JSON.stringify(n);try {this._storage.setItem(e, r);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var s = this._storage.getItem(e);if (!s) return "";if (s.indexOf(t) >= 0) {return JSON.parse(s).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return Y;}();var X = {},G = {};function Q(e) {return X[e];}var Z = function Z(e, t) {_classCallCheck(this, Z);this.data = t || null, this.name = e;};var ee = /*#__PURE__*/function (_Z) {_inherits(ee, _Z);var _super4 = _createSuper(ee);function ee(e, t) {var _this9;_classCallCheck(this, ee);_this9 = _super4.call(this, "error", { error: e, data: t }), _this9.error = e;return _this9;}return ee;}(Z);var te = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, s) {s[e] = s[e] || [], s[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, s) {if (s && s[e]) {var _n4 = s[e].indexOf(t);-1 !== _n4 && s[e].splice(_n4, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof ee) return console.error(e.error), this;var s = "string" == typeof e ? new Z(e, t || {}) : e;var n = s.name;if (this._listens(n)) {s.target = this;var _e6 = this._listeners[n] ? _toConsumableArray(this._listeners[n]) : [];var _iterator2 = _createForOfIteratorHelper(_e6),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t4 = _step2.value;_t4.call(this, s);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function se(e, t) {te.on(e, t);}function ne(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};te.fire(e, t);}function re(e, t) {te.off(e, t);}var oe = "loginStateChanged",ie = "loginStateExpire",ae = "loginTypeChanged",ce = "anonymousConverted",ue = "refreshAccessToken";var he;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(he || (he = {}));var le = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],de = { "X-SDK-Version": "1.3.5" };function fe(e, t, s) {var n = e[t];e[t] = function (t) {var r = {},o = {};s.forEach(function (s) {var _s$call = s.call(e, t),n = _s$call.data,i = _s$call.headers;Object.assign(r, n), Object.assign(o, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), r);else for (var _e7 in r) {i.append(_e7, r[_e7]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), o), n.call(e, t);};}function pe() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, de), {}, { "x-seqid": e }) };}var ge = /*#__PURE__*/function () {function ge() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, ge);var t;this.config = e, this._reqClass = new W.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = Q(this.config.env), this._localCache = (t = this.config.env, G[t]), fe(this._reqClass, "post", [pe]), fe(this._reqClass, "upload", [pe]), fe(this._reqClass, "download", [pe]);}_createClass(ge, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, s, n, r, o, i, a, _e8, _e9, _t5, _n5;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, s = _this$_cache$keys.refreshTokenKey, n = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);o = this._cache.getStore(s);if (o) {_context5.next = 5;break;}throw new Error("未登录CloudBase");case 5:i = { refresh_token: o };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e8 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e8 || "REFRESH_TOKEN_EXPIRED" === _e8 || "INVALID_REFRESH_TOKEN" === _e8)) {_context5.next = 20;break;}if (!(this._cache.getStore(n) === he.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e8)) {_context5.next = 19;break;}_e9 = this._cache.getStore(r);_t5 = this._cache.getStore(s);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e9, refresh_token: _t5 });case 17:_n5 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_n5.refresh_token), this._refreshAccessToken()));case 19:ne(ie), this._cache.removeStore(s);case 20:throw new Error("刷新access token失败：" + a.data.code);case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (ne(ue), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(s), this._cache.setStore(s, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, s, n, r, o;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, s = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(s)) {_context6.next = 3;break;}throw new Error("refresh token不存在，登录状态异常");case 3:n = this._cache.getStore(e), r = this._cache.getStore(t), o = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(n, r);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}o = !1;case 12:return _context6.abrupt("return", (!n || !r || r < Date.now()) && o ? this.refreshAccessToken() : { accessToken: n, accessTokenExpire: r });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, s) {var n, r, o, _e10, i, _e11, _e12, a, c, u, h, l, d, f, p, g;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:n = "x-tcb-trace_" + this.config.env;r = "application/x-www-form-urlencoded";o = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === le.indexOf(e))) {_context7.next = 10;break;}_e10 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e10);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:o.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e11 in i) {i.hasOwnProperty(_e11) && void 0 !== i[_e11] && i.append(_e11, o[_e11]);}r = "multipart/form-data";} else {r = "application/json;charset=UTF-8", i = {};for (_e12 in o) {void 0 !== o[_e12] && (i[_e12] = o[_e12]);}}a = { headers: { "content-type": r } };s && s.onUploadProgress && (a.onUploadProgress = s.onUploadProgress);c = this._localCache.getStore(n);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, h = t.inQuery, l = t.search;d = { env: this.config.env };u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));f = function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var n = /\?/.test(t);var r = "";for (var _e13 in s) {"" === r ? !n && (t += "?") : r += "&", r += "".concat(_e13, "=").concat(encodeURIComponent(s[_e13]));}return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);}(F, L, d);l && (f += l);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:p = _context7.sent;g = p.header && p.header["x-tcb-trace"];if (!(g && this._localCache.setStore(n, g), 200 !== Number(p.status) && 200 !== Number(p.statusCode) || !p.data)) {_context7.next = 26;break;}throw new Error("network request error");case 26:return _context7.abrupt("return", p);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,s,_s3,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:s = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === s.data.code && -1 === le.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_s3 = _context8.sent;if (!_s3.data.code) {_context8.next = 12;break;}throw new Error("[".concat(_s3.data.code, "] ").concat(_s3.data.message));case 12:return _context8.abrupt("return", _s3.data);case 13:if (!s.data.code) {_context8.next = 15;break;}throw new Error("[".concat(s.data.code, "] ").concat(s.data.message));case 15:return _context8.abrupt("return", s.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,s = _this$_cache$keys3.accessTokenExpireKey,n = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }]);return ge;}();var me = {};function ye(e) {return me[e];}var _e = /*#__PURE__*/function () {function _e(e) {_classCallCheck(this, _e);this.config = e, this._cache = Q(e.env), this._request = ye(e.env);}_createClass(_e, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,s = _this$_cache$keys4.accessTokenExpireKey,n = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,s = _this$_cache$keys5.accessTokenKey,n = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(s, e), this._cache.setStore(n, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return _e;}();var we = /*#__PURE__*/function () {function we(e) {_classCallCheck(this, we);if (!e) throw new Error("envId is not defined");this._envId = e, this._cache = Q(this._envId), this._request = ye(this._envId), this.setUserInfo();}_createClass(we, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new Error("ticket must be string");return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new Error("username must be a string");return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, s;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;s = e.users;return _context10.abrupt("return", (s.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: s, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, s, n, r, o, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;s = e.gender;n = e.avatarUrl;r = e.province;o = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: s, avatarUrl: n, province: r, country: o, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this10 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this10[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return we;}();var ve = /*#__PURE__*/function () {function ve(e) {_classCallCheck(this, ve);if (!e) throw new Error("envId is not defined");this._cache = Q(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,s = _this$_cache$keys6.accessTokenKey,n = _this$_cache$keys6.accessTokenExpireKey,r = this._cache.getStore(t),o = this._cache.getStore(s),i = this._cache.getStore(n);this.credential = { refreshToken: r, accessToken: o, accessTokenExpire: i }, this.user = new we(e);}_createClass(ve, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === he.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === he.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === he.WECHAT || this.loginType === he.WECHAT_OPEN || this.loginType === he.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return ve;}();var Se = /*#__PURE__*/function (_e14) {_inherits(Se, _e14);var _super5 = _createSuper(Se);function Se() {_classCallCheck(this, Se);return _super5.apply(this, arguments);}_createClass(Se, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, s, n, r, _e15;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;s = this._cache.getStore(e) || void 0;n = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: s, refresh_token: n });case 8:r = _context13.sent;if (!(r.uuid && r.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(r.uuid);this.setRefreshToken(r.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:ne(oe);ne(ae, { env: this.config.env, loginType: he.ANONYMOUS, persistence: "local" });_e15 = new ve(this.config.env);_context13.next = 19;return _e15.user.refresh();case 19:return _context13.abrupt("return", _e15);case 20:throw new Error("匿名登录失败");case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, s, n, r, o;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;s = _this$_cache$keys8.refreshTokenKey;n = this._cache.getStore(t);r = this._cache.getStore(s);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: n, refresh_token: r, ticket: e });case 7:o = _context14.sent;if (!o.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(o.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:ne(ce, { env: this.config.env });ne(ae, { loginType: he.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: o.refresh_token } });case 16:throw new Error("匿名转化失败");case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,s = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(s, he.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return Se;}(_e);var ke = /*#__PURE__*/function (_e16) {_inherits(ke, _e16);var _super6 = _createSuper(ke);function ke() {_classCallCheck(this, ke);return _super6.apply(this, arguments);}_createClass(ke, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, s;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new Error("ticket must be a string");case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:s = _context15.sent;if (!s.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(s.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:ne(oe);ne(ae, { env: this.config.env, loginType: he.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new ve(this.config.env));case 15:throw new Error("自定义登录失败");case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return ke;}(_e);var Te = /*#__PURE__*/function (_e17) {_inherits(Te, _e17);var _super7 = _createSuper(Te);function Te() {_classCallCheck(this, Te);return _super7.apply(this, arguments);}_createClass(Te, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new Error("email must be a string");case 2:s = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 5:n = _context16.sent;r = n.refresh_token;o = n.access_token;i = n.access_token_expire;if (!r) {_context16.next = 22;break;}this.setRefreshToken(r);if (!(o && i)) {_context16.next = 15;break;}this.setAccessToken(o, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:ne(oe);ne(ae, { env: this.config.env, loginType: he.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new ve(this.config.env));case 22:throw n.code ? new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("邮箱登录失败");case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return Te;}(_e);var Pe = /*#__PURE__*/function (_e18) {_inherits(Pe, _e18);var _super8 = _createSuper(Pe);function Pe() {_classCallCheck(this, Pe);return _super8.apply(this, arguments);}_createClass(Pe, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new Error("username must be a string");case 2:"string" != typeof t && (t = "", console.warn("password is empty"));s = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: he.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 6:n = _context19.sent;r = n.refresh_token;o = n.access_token_expire;i = n.access_token;if (!r) {_context19.next = 23;break;}this.setRefreshToken(r);if (!(i && o)) {_context19.next = 16;break;}this.setAccessToken(i, o);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:ne(oe);ne(ae, { env: this.config.env, loginType: he.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new ve(this.config.env));case 23:throw n.code ? new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("用户名密码登录失败");case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return Pe;}(_e);var Ie = /*#__PURE__*/function () {function Ie(e) {_classCallCheck(this, Ie);this.config = e, this._cache = Q(e.env), this._request = ye(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), se(ae, this._onLoginTypeChanged);}_createClass(Ie, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new Se(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new ke(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new Te(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new Pe(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new Se(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new Te(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new Pe(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new Se(this.config)), se(ce, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, s, n, r;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === he.ANONYMOUS)) {_context23.next = 2;break;}throw new Error("匿名用户不支持登出操作");case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, s = _this$_cache$keys10.accessTokenExpireKey, n = this._cache.getStore(e);if (n) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: n });case 7:r = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(s), ne(oe), ne(ae, { env: this.config.env, loginType: he.NULL, persistence: this.config.persistence }), r));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this11 = this;se(oe, function () {var t = _this11.hasLoginState();e.call(_this11, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {se(ie, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {se(ue, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {se(ce, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this12 = this;se(ae, function () {var t = _this12.hasLoginState();e.call(_this12, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new ve(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new Error("username must be a string");case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new ke(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,s = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + s };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,s = _e$data.persistence,n = _e$data.env;n === this.config.env && (this._cache.updatePersistence(s), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Ie;}();var Ae = function Ae(e, t) {t = t || j();var s = ye(this.config.env),n = e.cloudPath,r = e.filePath,o = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,h = _e$data2.fileId,l = _e$data2.cosFileId,d = e.requestId,f = { key: n, signature: c, "x-cos-meta-fileid": l, success_action_status: "201", "x-cos-security-token": u };s.upload({ url: a, data: f, file: r, name: n, fileType: i, onUploadProgress: o }).then(function (e) {201 === e.statusCode ? t(null, { fileID: h, requestId: d }) : t(new Error("STORAGE_REQUEST_FAIL: " + e.data));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},Ee = function Ee(e, t) {t = t || j();var s = ye(this.config.env),n = e.cloudPath;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},Oe = function Oe(_ref5, t) {var e = _ref5.fileList;if (t = t || j(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t6 = _step3.value;if (!_t6 || "string" != typeof _t6) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var s = { fileid_list: e };return ye(this.config.env).send("storage.batchDeleteFile", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},Ue = function Ue(_ref6, t) {var e = _ref6.fileList;t = t || j(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var s = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _n6 = _step4.value;"object" == typeof _n6 ? (_n6.hasOwnProperty("fileID") && _n6.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), s.push({ fileid: _n6.fileID, max_age: _n6.maxAge })) : "string" == typeof _n6 ? s.push({ fileid: _n6 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var n = { file_list: s };return ye(this.config.env).send("storage.batchGetDownloadUrl", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},be = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, s, n, r;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return Ue.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:s = _context29.sent.fileList[0];if (!("SUCCESS" !== s.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(s) : new Promise(function (e) {e(s);}));case 6:n = ye(this.config.env);r = s.download_url;if (!(r = encodeURI(r), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", n.download({ url: r }));case 10:_context29.t0 = t;_context29.next = 13;return n.download({ url: r });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function be(_x26, _x27) {return _ref8.apply(this, arguments);};}(),De = function De(_ref9, o) {var e = _ref9.name,t = _ref9.data,s = _ref9.query,n = _ref9.parse,r = _ref9.search;var i = o || j();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new Error("函数名不能为空"));var c = { inQuery: s, parse: n, search: r, function_name: e, request_data: a };return ye(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t7 = e.data.response_data;if (n) i(null, { result: _t7, requestId: e.requestId });else try {_t7 = JSON.parse(e.data.response_data), i(null, { result: _t7, requestId: e.requestId });} catch (e) {i(new Error("response data must be json"));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},Ce = { timeout: 15e3, persistence: "session" },xe = {};var qe = /*#__PURE__*/function () {function qe(e) {_classCallCheck(this, qe);this.config = e || this.config, this.authObj = void 0;}_createClass(qe, [{ key: "init", value: function init(e) {switch (W.adapter || (this.requestClient = new W.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, Ce), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new qe(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || W.adapter.primaryStorage || Ce.persistence;var s;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;X[t] = new Y(e), G[t] = new Y(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), s = this.config, me[s.env] = new ge(s), this.authObj = new Ie(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return se.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return re.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return De.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return Oe.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return Ue.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return be.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return Ae.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return Ee.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {xe[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var s;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:s = xe[e];if (s) {_context30.next = 3;break;}throw Error("\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C"));case 3:_context30.next = 5;return s.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = H(e) || {},t = _ref11.adapter,s = _ref11.runtime;t && (W.adapter = t), s && (W.runtime = s);} }]);return qe;}();var Re = new qe();function Fe(e, t, s) {void 0 === s && (s = {});var n = /\?/.test(t),r = "";for (var o in s) {"" === r ? !n && (t += "?") : r += "&", r += o + "=" + encodeURIComponent(s[o]);}return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;}var Le = /*#__PURE__*/function () {function Le() {_classCallCheck(this, Le);}_createClass(Le, [{ key: "post", value: function post(e) {var t = e.url,s = e.data,n = e.headers;return new Promise(function (e, r) {x.request({ url: Fe("https:", t), data: s, method: "POST", header: n, success: function success(t) {e(t);}, fail: function fail(e) {r(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, s) {var n = e.url,r = e.file,o = e.data,i = e.headers,a = e.fileType,c = x.uploadFile({ url: Fe("https:", n), name: "file", formData: Object.assign({}, o), filePath: r, fileType: a, header: i, success: function success(e) {var s = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (s.statusCode = parseInt(o.success_action_status, 10)), t(s);}, fail: function fail(e) {v && "mp-alipay" === S && console.warn("支付宝小程序开发工具上传腾讯云时无法准确判断是否上传成功，请使用真机测试"), s(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return Le;}();var Ne = { setItem: function setItem(e, t) {x.setStorageSync(e, t);}, getItem: function getItem(e) {return x.getStorageSync(e);}, removeItem: function removeItem(e) {x.removeStorageSync(e);}, clear: function clear() {x.clearStorageSync();} };var Me = { genAdapter: function genAdapter() {return { root: {}, reqClass: Le, localStorage: Ne, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };Re.useAdapters(Me);var je = Re,$e = je.init;je.init = function (e) {e.env = e.spaceId;var t = $e.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var s = t.auth;return t.auth = function (e) {var t = s.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = p(t[e]).bind(t);}), t;}, t.customAuth = t.auth, t;};var Ke = /*#__PURE__*/function (_q) {_inherits(Ke, _q);var _super9 = _createSuper(Ke);function Ke() {_classCallCheck(this, Ke);return _super9.apply(this, arguments);}_createClass(Ke, [{ key: "getAccessToken", value: function getAccessToken() {var _this13 = this;return new Promise(function (e, t) {_this13.setAccessToken("Anonymous_Access_token"), e("Anonymous_Access_token");});} }, { key: "setupRequest", value: function setupRequest(e, t) {var s = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),n = { "Content-Type": "application/json" };"auth" !== t && (s.token = this.accessToken, n["x-basement-token"] = this.accessToken), n["x-serverless-sign"] = C.sign(s, this.config.clientSecret);var r = U(),o = r.APPID,i = r.PLATFORM,a = r.DEVICEID,c = r.CLIENT_SDK_VERSION;return n["x-client-platform"] = i, n["x-client-appid"] = o, n["x-client-device-id"] = a, n["x-client-version"] = c, n["x-client-token"] = x.getStorageSync("uni_id_token"), { url: this.config.requestUrl, method: "POST", data: s, dataType: "json", header: JSON.parse(JSON.stringify(n)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref12) {var _this14 = this;var e = _ref12.url,t = _ref12.formData,s = _ref12.name,n = _ref12.filePath,r = _ref12.fileType,o = _ref12.onUploadProgress;return new Promise(function (i, a) {var c = _this14.adapter.uploadFile({ url: e, formData: t, name: s, filePath: n, fileType: r, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new g({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new g({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref13) {var _this15 = this;var e = _ref13.filePath,t = _ref13.cloudPath,_ref13$fileType = _ref13.fileType,s = _ref13$fileType === void 0 ? "image" : _ref13$fileType,n = _ref13.onUploadProgress;if (!t) throw new g({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var r;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,o = _t$result.url,i = _t$result.formData,a = _t$result.name,c = _t$result.fileUrl;r = c;var u = { url: o, formData: i, name: a, filePath: e, fileType: s };return _this15.uploadFileToOSS(Object.assign({}, u, { onUploadProgress: n }));}).then(function () {return _this15.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (s, n) {t.success ? s({ success: !0, filePath: e, fileID: r }) : n(new g({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }]);return Ke;}(q);var Be = { init: function init(e) {var t = new Ke(e),s = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return s;}, t.customAuth = t.auth, t;} };var He, We;function ze(_ref14) {var e = _ref14.name,t = _ref14.data,s = _ref14.spaceId,n = _ref14.provider;He || (He = U(), We = { ak: I.appid, p: "android" === E ? "a" : "i", ut: D(), uuid: b() });var r = JSON.parse(JSON.stringify(t || {})),o = e,i = s,a = { tencent: "t", aliyun: "a" }[n];{var _e19 = Object.assign({}, We, { fn: o, sid: i, pvd: a });Object.assign(r, { clientInfo: He, uniCloudClientInfo: encodeURIComponent(JSON.stringify(_e19)) });var _uni$getSystemInfoSyn2 = uni.getSystemInfoSync(),_t8 = _uni$getSystemInfoSyn2.deviceId;r.uniCloudDeviceId = _t8;}if (!r.uniIdToken) {var _e20 = x.getStorageSync("uni_id_token") || x.getStorageSync("uniIdToken");_e20 && (r.uniIdToken = _e20);}return r;}function Ve(_ref15) {var _this16 = this;var e = _ref15.name,t = _ref15.data;var s = this.localAddress,n = this.localPort,r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],o = this.config.spaceId,i = "http://".concat(s, ":").concat(n, "/system/check-function"),a = "http://".concat(s, ":").concat(n, "/cloudfunctions/").concat(e);return new Promise(function (t, s) {x.request({ method: "POST", url: i, data: { name: e, platform: S, provider: r, spaceId: o }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref16.data;var _ref17 = e || {},t = _ref17.code,s = _ref17.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: s || "SYS_ERR" };}).then(function (_ref18) {var s = _ref18.code,n = _ref18.message;if (0 !== s) {switch (s) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(n || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e21 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e21), new Error(_e21);}case "SWITCH_TO_CLOUD":break;default:{var _e22 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(n, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e22), new Error(_e22);}}return _this16._originCallFunction({ name: e, data: t });}return new Promise(function (s, n) {var i = ze({ name: e, data: t, provider: _this16.config.provider, spaceId: o });x.request({ method: "POST", url: a, data: { provider: r, platform: S, param: i }, success: function success() {var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref19.statusCode,t = _ref19.data;return !e || e >= 400 ? n(new g({ code: t.code || "SYS_ERR", message: t.message || "request:fail" })) : s({ result: t });}, fail: function fail(e) {n(new g({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var Je = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];var Ye = /[\\^$.*+?()[\]{}|]/g,Xe = RegExp(Ye.source);function Ge(e, t, s) {return e.replace(new RegExp((n = t) && Xe.test(n) ? n.replace(Ye, "\\$&") : n, "g"), s);var n;}function Qe(_ref20) {var e = _ref20.functionName,t = _ref20.result,s = _ref20.logPvd;if (this.config.useDebugFunction && t && t.requestId) {var _n7 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t.requestId });console.log("[".concat(s, "-request]").concat(_n7, "[/").concat(s, "-request]"));}}function Ze(e) {var t = e.callFunction,s = function s(e) {var _this17 = this;var s = e.name;e.data = ze({ name: s, data: e.data, provider: this.config.provider, spaceId: this.config.spaceId });var n = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider];return t.call(this, e).then(function (e) {return Qe.call(_this17, { functionName: s, result: e, logPvd: n }), Promise.resolve(e);}, function (t) {return Qe.call(_this17, { functionName: s, result: t, logPvd: n }), t && t.message && (t.message = function () {var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref21$message = _ref21.message,e = _ref21$message === void 0 ? "" : _ref21$message,_ref21$extraInfo = _ref21.extraInfo,t = _ref21$extraInfo === void 0 ? {} : _ref21$extraInfo,_ref21$formatter = _ref21.formatter,s = _ref21$formatter === void 0 ? [] : _ref21$formatter;for (var _n8 = 0; _n8 < s.length; _n8++) {var _s$_n = s[_n8],_r3 = _s$_n.rule,_o2 = _s$_n.content,i = _s$_n.mode,_a = e.match(_r3);if (!_a) continue;var _c = _o2;for (var _e23 = 1; _e23 < _a.length; _e23++) {_c = Ge(_c, "{$".concat(_e23, "}"), _a[_e23]);}for (var _e24 in t) {_c = Ge(_c, "{".concat(_e24, "}"), t[_e24]);}switch (i) {case "replace":return _c;case "append":default:return e + _c;}}return e;}({ message: "[".concat(e.name, "]: ").concat(t.message), formatter: Je, extraInfo: { functionName: s } })), Promise.reject(t);});};e.callFunction = function (t) {var n;return v && e.debugInfo && !e.debugInfo.forceRemote && T ? (e._originCallFunction || (e._originCallFunction = s), n = Ve.call(this, t)) : n = s.call(this, t), Object.defineProperty(n, "result", { get: function get() {return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), n;};}var et = Symbol("CLIENT_DB_INTERNAL");function tt(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = et, new Proxy(e, { get: function get(e, s, n) {return function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}(e, s) || e[s] || "string" != typeof s ? e[s] : t.get(e, s, n);} });}function st(e) {switch (o(e)) {case "array":return e.map(function (e) {return st(e);});case "object":return e._internalType === et || Object.keys(e).forEach(function (t) {e[t] = st(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}}function nt() {var e = x.getStorageSync("uni_id_token") || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var s;try {s = JSON.parse((n = t[1], decodeURIComponent(atob(n).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var n;return s.tokenExpired = 1e3 * s.exp, delete s.exp, delete s.iat, s;}var rt = t(s(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var s = "chooseAndUploadFile:fail";function n(e, t) {return e.tempFiles.forEach(function (e, s) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + s + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function r(e, t, _ref22) {var s = _ref22.onChooseFile,n = _ref22.onUploadProgress;return t.then(function (e) {if (s) {var _t9 = s(e);if (void 0 !== _t9) return Promise.resolve(_t9).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: "chooseAndUploadFile:ok", tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var n = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = "chooseAndUploadFile:ok";var r = t.tempFiles,o = r.length;var i = 0;return new Promise(function (a) {for (; i < s;) {c();}function c() {var s = i++;if (s >= o) return void (!r.find(function (e) {return !e.url && !e.errMsg;}) && a(t));var u = r[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, n && n(e);} }).then(function (e) {u.url = e.fileID, s < o && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < o && c();});}});}(e, t, 5, n);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? r(e, function (e) {var t = e.count,r = e.sizeType,_e$sourceType = e.sourceType,o = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: r, sourceType: o, extension: i, success: function success(t) {e(n(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? r(e, function (e) {var t = e.camera,r = e.compressed,o = e.maxDuration,i = e.sourceType,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: r, maxDuration: o, sourceType: i, extension: a, success: function success(t) {var s = t.tempFilePath,r = t.duration,o = t.size,i = t.height,a = t.width;e(n({ errMsg: "chooseVideo:ok", tempFilePaths: [s], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: s, size: o, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: r, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : r(e, function (e) {var t = e.count,r = e.extension;return new Promise(function (e, o) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return o({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: r, success: function success(t) {e(n(t));}, fail: function fail(e) {o({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}));var ot = "manual";function it(e) {return { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, collection: { type: String, default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this18 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this18[t]);}), e;}, function (e, t) {if (_this18.loadtime === ot) return;var s = !1;var n = [];for (var _r4 = 2; _r4 < e.length; _r4++) {e[_r4] !== t[_r4] && (n.push(e[_r4]), s = !0);}e[0] !== t[0] && (_this18.mixinDatacomPage.current = _this18.pageCurrent), _this18.mixinDatacomPage.size = _this18.pageSize, _this18.onMixinDatacomPropsChange(s, n);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this19 = this;var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref23$getone = _ref23.getone,e = _ref23$getone === void 0 ? !1 : _ref23$getone,t = _ref23.success,s = _ref23.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (s) {_this19.mixinDatacomLoading = !1;var _s$result = s.result,n = _s$result.data,r = _s$result.count;_this19.getcount && (_this19.mixinDatacomPage.count = r), _this19.mixinDatacomHasMore = n.length < _this19.pageSize;var o = e ? n.length ? n[0] : void 0 : n;_this19.mixinDatacomResData = o, t && t(o);}).catch(function (e) {_this19.mixinDatacomLoading = !1, _this19.mixinDatacomErrorMessage = e, s && s(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var s = e.database();var n = t.action || this.action;n && (s = s.action(n));var r = t.collection || this.collection;s = s.collection(r);var o = t.where || this.where;o && Object.keys(o).length && (s = s.where(o));var i = t.field || this.field;i && (s = s.field(i));var a = t.foreignKey || this.foreignKey;a && (s = s.foreignKey(a));var c = t.groupby || this.groupby;c && (s = s.groupBy(c));var u = t.groupField || this.groupField;u && (s = s.groupField(u));!0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (s = s.distinct());var h = t.orderby || this.orderby;h && (s = s.orderBy(h));var l = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,p = void 0 !== t.gettree ? t.gettree : this.gettree,g = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return p && (m.getTree = y), g && (m.getTreePath = y), s = s.skip(d * (l - 1)).limit(d).get(m), s;} } };}function at(_x30, _x31) {return _at.apply(this, arguments);}function _at() {_at = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32(e, t) {var s, _e30, n;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:s = "http://".concat(e, ":").concat(t, "/system/ping");_context32.prev = 1;_context32.next = 4;return n = { url: s, timeout: 500 }, new Promise(function (e, t) {x.request(_objectSpread(_objectSpread({}, n), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e30 = _context32.sent;return _context32.abrupt("return", !(!_e30.data || 0 !== _e30.data.code));case 8:_context32.prev = 8;_context32.t0 = _context32["catch"](1);return _context32.abrupt("return", !1);case 11:case "end":return _context32.stop();}}}, _callee32, null, [[1, 8]]);}));return _at.apply(this, arguments);}var ct = new ( /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);}_createClass(_class2, [{ key: "init", value: function init(e) {var t = {};var s = !1 !== e.debugFunction && v && ("h5" === S && navigator.userAgent.indexOf("HBuilderX") > 0 || "app-plus" === S);switch (e.provider) {case "tencent":t = je.init(Object.assign(e, { useDebugFunction: s }));break;case "aliyun":t = R.init(Object.assign(e, { useDebugFunction: s }));break;case "private":t = Be.init(Object.assign(e, { useDebugFunction: s }));break;default:throw new Error("未提供正确的provider参数");}var n = k;v && n && !n.code && (t.debugInfo = n), t.isReady = !1;var r = t.auth();t.initUniCloud = r.getLoginState().then(function (e) {return e ? Promise.resolve() : r.signInAnonymously();}).then(function () {if (v && t.debugInfo) {var _t$debugInfo = t.debugInfo,_e25 = _t$debugInfo.address,_s4 = _t$debugInfo.servePort;return function () {var _ref24 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31(e, t) {var s, _n9, _r5;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:_n9 = 0;case 1:if (!(_n9 < e.length)) {_context31.next = 11;break;}_r5 = e[_n9];_context31.next = 5;return at(_r5, t);case 5:if (!_context31.sent) {_context31.next = 8;break;}s = _r5;return _context31.abrupt("break", 11);case 8:_n9++;_context31.next = 1;break;case 11:return _context31.abrupt("return", { address: s, port: t });case 12:case "end":return _context31.stop();}}}, _callee31);}));return function (_x32, _x33) {return _ref24.apply(this, arguments);};}()(_e25, _s4);}return Promise.resolve();}).then(function () {var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref25.address,s = _ref25.port;if (!v) return Promise.resolve();if (e) t.localAddress = e, t.localPort = s;else if (t.debugInfo) {var _e26 = console["app-plus" === S ? "error" : "warn"];"remote" === t.debugInfo.initialLaunchType ? (t.debugInfo.forceRemote = !0, _e26("当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs")) : _e26("无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs");}}).then(function () {return function () {if (!v || "h5" !== S) return;if (uni.getStorageSync("__LAST_DCLOUD_APPID") === I.appid) return;uni.setStorageSync("__LAST_DCLOUD_APPID", I.appid), uni.removeStorageSync("uni_id_token") && (console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), uni.removeStorageSync("uni_id_token"), uni.removeStorageSync("uni_id_token_expired"));}(), new Promise(function (e) {"quickapp-native" === S ? (E = "android", uni.getStorage({ key: "__DC_CLOUD_UUID", success: function success(t) {A = t.data ? t.data : O(32), e();} })) : setTimeout(function () {E = uni.getSystemInfoSync().platform, A = uni.getStorageSync("__DC_CLOUD_UUID") || O(32), e();}, 0);});}).then(function () {t.isReady = !0;}), Ze(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {var _this20 = this;var s;return s = this.isReady ? Promise.resolve() : this.initUniCloud, s.then(function () {return t.call(_this20, e);});};}(t), function (e) {e.database = function () {if (this._database) return this._database;var t = {},s = {};var n = /*#__PURE__*/function () {function n(e, t, s) {_classCallCheck(this, n);this.content = e, this.prevStage = t, this.actionName = s;}_createClass(n, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: e.$param };}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "remove", value: function remove() {return this._send("remove", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "set", value: function set() {throw new Error("clientDB禁止使用set方法");} }, { key: "_send", value: function _send(n, r) {var _this21 = this;var o = d(f("database", "invoke")),i = this.toJSON();return i.$db.push({ $method: n, $param: st(r) }), o.then(function () {return e.callFunction({ name: "DCloud-clientDB", data: { action: _this21.actionName, command: i } }).then(function (e) {var _e$result = e.result,n = _e$result.code,r = _e$result.message,o = _e$result.token,i = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,c = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (c) for (var _e27 = 0; _e27 < c.length; _e27++) {var _c$_e = c[_e27],_t10 = _c$_e.level,_s5 = _c$_e.message,_n10 = _c$_e.detail,_r6 = console["app-plus" === S && "warn" === _t10 ? "error" : _t10] || console.log;var _o3 = "[System Info]" + _s5;_n10 && (_o3 = "".concat(_o3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_n10)), _r6(_o3);}if (n) return Promise.reject(new a(r, n));o && i && t.refreshToken && t.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}), o && i && s.refreshToken && s.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });});var u = e.result.affectedDocs;return "number" == typeof u && Object.defineProperty(e.result, "affectedDocs", { get: function get() {return console.warn("affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"), u;} }), d(f("database", "success"), e).then(function () {return d(f("database", "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {var t = new a(e.message, e.code || "SYSTEM_ERROR");return s.error && s.error.forEach(function (e) {e(t);}), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"), d(f("database", "fail"), e).then(function () {return d(f("database", "complete"), e);}).then(function () {return Promise.reject(e);});});});} }, { key: "useAggregate", get: function get() {var e = this,t = !1;for (; e.prevStage;) {e = e.prevStage;var _s6 = e.content.$method;if ("aggregate" === _s6 || "pipeline" === _s6) {t = !0;break;}}return t;} }, { key: "count", get: function get() {if (!this.useAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return i({ $method: "count", $param: st(Array.from(arguments)) }, e, e.actionName);};} }]);return n;}();var r = ["db.Geo", "db.command", "command.aggregate"];function o(e, t) {return r.indexOf("".concat(e, ".").concat(t)) > -1;}function i(e, t, s) {return tt(new n(e, t, s), { get: function get(e, t) {var n = "db";return e && e.content && (n = e.content.$method), o(n, t) ? i({ $method: t }, e, s) : function () {return i({ $method: t, $param: st(Array.from(arguments)) }, e, s);};} });}function c(_ref26) {var e = _ref26.path,t = _ref26.method;return /*#__PURE__*/function () {function _class3() {_classCallCheck(this, _class3);this.param = Array.from(arguments);}_createClass(_class3, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class3;}();}var u = { auth: { on: function on(e, s) {t[e] = t[e] || [], t[e].indexOf(s) > -1 || t[e].push(s);}, off: function off(e, s) {t[e] = t[e] || [];var n = t[e].indexOf(s);-1 !== n && t[e].splice(n, 1);} }, on: function on(e, t) {s[e] = s[e] || [], s[e].indexOf(t) > -1 || s[e].push(t);}, off: function off(e, t) {s[e] = s[e] || [];var n = s[e].indexOf(t);-1 !== n && s[e].splice(n, 1);}, env: tt({}, { get: function get(e, t) {return { $env: t };} }), action: function action(e) {return tt({}, { get: function get(t, s) {return o("db", s) ? i({ $method: s }, null, e) : function () {return i({ $method: s, $param: st(Array.from(arguments)) }, null, e);};} });}, Geo: tt({}, { get: function get(e, t) {return c({ path: ["Geo"], method: t });} }), getCloudEnv: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };}, get serverDate() {return c({ path: [], method: "serverDate" });}, get RegExp() {return c({ path: [], method: "RegExp" });} },h = tt(u, { get: function get(e, t) {return o("db", t) ? i({ $method: t }) : function () {return i({ $method: t, $param: st(Array.from(arguments)) });};} });return this._database = h, h;};}(t), function (e) {e.getCurrentUserInfo = nt, e.chooseAndUploadFile = rt.initChooseAndUploadFile(e), Object.assign(e, { get mixinDatacom() {return it(e);} });}(t);return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {t[e] && (t[e] = p(t[e], e));}), t.init = this.init, t;} }]);return _class2;}())();(function () {{var e = T;var t = {};if (1 === e.length) t = e[0], ct = ct.init(t);else {var _t11 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo"];var _s7;_s7 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : P ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间" : "uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间", _t11.forEach(function (e) {ct[e] = function () {return console.error(_s7), Promise.reject(new g({ code: "SYS_ERR", message: _s7 }));};});}Object.assign(ct, { get mixinDatacom() {return it(ct);} }), ct.addInterceptor = h, ct.removeInterceptor = l, v && "h5" === S && (window.uniCloud = ct);}})();var ut = ct;var _default2 = ut;exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../../../node-libs-browser/mock/process.js */ 27)))

/***/ }),
/* 27 */
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 28);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),
/* 28 */
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 27)))

/***/ }),
/* 29 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 30);

/***/ }),
/* 30 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 31);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 31 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 32 */
/*!**************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.esm.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.initVueI18n = initVueI18n;exports.I18n = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isObject = function isObject(val) {return val !== null && typeof val === 'object';};var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format) {
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var _char = format[position++];
    if (_char === '{') {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      _char = format[position++];
      while (_char !== undefined && _char !== '}') {
        sub += _char;
        _char = format[position++];
      }
      var isClosed = _char === '}';
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    } else
    if (_char === '%') {
      // when found rails i18n syntax, skip text capture
      if (format[position] !== '{') {
        text += _char;
      }
    } else
    {
      text += _char;
    }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') !== -1) {
      return 'zh-Hans';
    }
    if (locale.indexOf('-hant') !== -1) {
      return 'zh-Hant';
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return 'zh-Hant';
    }
    return 'zh-Hans';
  }
  var lang = startsWith(locale, ['en', 'fr', 'es']);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref) {var locale = _ref.locale,fallbackLocale = _ref.fallbackLocale,messages = _ref.messages,watcher = _ref.watcher,formater = _ref.formater;_classCallCheck(this, I18n);
    this.locale = 'en';
    this.fallbackLocale = 'en';
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages;
    this.setLocale(locale);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      this.message = this.messages[this.locale];
      this.watchers.forEach(function (watcher) {
        watcher(_this.locale, oldLocale);
      });
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function initLocaleWatcher(appVm, i18n) {
  appVm.$i18n &&
  appVm.$i18n.vm.$watch('locale', function (newLocale) {
    i18n.setLocale(newLocale);
  }, {
    immediate: true });

}
function getDefaultLocale() {
  if (typeof navigator !== 'undefined') {
    return navigator.userLanguage || navigator.language;
  }
  if (typeof plus !== 'undefined') {
    // TODO 待调整为最新的获取语言代码
    return plus.os.language;
  }
  return uni.getSystemInfoSync().language;
}
function initVueI18n(messages) {var fallbackLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';var locale = arguments.length > 2 ? arguments[2] : undefined;
  var i18n = new I18n({
    locale: locale || fallbackLocale,
    fallbackLocale: fallbackLocale,
    messages: messages });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app-plus view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var appVm = getApp().$vm;
      if (!appVm.$t || !appVm.$i18n) {
        if (!locale) {
          i18n.setLocale(getDefaultLocale());
        }
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          return i18n.t(key, values);
        };
      } else
      {
        initLocaleWatcher(appVm, i18n);
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          var $i18n = appVm.$i18n;
          var silentTranslationWarn = $i18n.silentTranslationWarn;
          $i18n.silentTranslationWarn = true;
          var msg = appVm.$t(key, values);
          $i18n.silentTranslationWarn = silentTranslationWarn;
          if (msg !== key) {
            return msg;
          }
          return i18n.t(key, $i18n.locale, values);
        };
      }
    }
    return _t(key, values);
  };
  return {
    t: function t(key, values) {
      return _t(key, values);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    },
    mixin: {
      beforeCreate: function beforeCreate() {var _this3 = this;
        var unwatch = i18n.watchLocale(function () {
          _this3.$forceUpdate();
        });
        this.$once('hook:beforeDestroy', function () {
          unwatch();
        });
      },
      methods: {
        $$t: function $$t(key, values) {
          return _t(key, values);
        } } } };



}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 33 */
/*!**************************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/pages.json?{"type":"stat"} ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__20E2E61" };exports.default = _default;

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/*!*********************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/miaosha_02.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/miaosha_02.jpg";

/***/ }),
/* 41 */
/*!*********************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/miaosha_01.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMsaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwMiA3OS4xNjQzNTIsIDIwMjAvMDEvMzAtMTU6NTA6MzggICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4xIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMkM2QjZCN0YyNjQxMUVCOTVCMzg2NUY4MTQ3RUVDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMkM2QjZCOEYyNjQxMUVCOTVCMzg2NUY4MTQ3RUVDRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQyQzZCNkI1RjI2NDExRUI5NUIzODY1RjgxNDdFRUNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQyQzZCNkI2RjI2NDExRUI5NUIzODY1RjgxNDdFRUNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQECAQECAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgADwAXAwERAAIRAQMRAf/EAGwAAQADAAAAAAAAAAAAAAAAAAgFCQoBAQEBAQAAAAAAAAAAAAAAAAgJBwoQAAEEAgICAwEAAAAAAAAAAAUCAwQGAQcSCBMUABEJIREAAgICAgIDAQEAAAAAAAAAAQIDBAUGEgcREwAhCCIy/9oADAMBAAIRAxEAPwDYHSLp21ru9+xprdEQRH60VavWU7rh2EMCsvRowGS3JCqhkYi0mykgvWm5DxJMzLqWZqEoZ8KM8FZBBsW84jPZ3I7XCkWi0Ks80MgCf5h/teJB5sWiDNIG8+HAC8R9FR7PrnQuU6t1Gh11LYfuS7arw5BXkmIZplKzc42HpjWKwY0rmLiXhLNJ7GHJa3/zRe2nce22wthnblYZo4lWbMdukefPlSoRl0kSjMBY77Dq1MNqGyZGHI+UpT4m2cto4oVlOSF+Vtw2Xee3MhkZrc8lU1JprAZiyuXkVYlIP0CrN5XwB4ClR4B8fFZ+wm0jX+icXq2Px9SKzBbrxVWRFV4VjjZpmDAeSJFUrJ5J5M4ZvLAH41es/bPZu2OwPZ9qxlALmhdXiTs6tyIoqPEWJbBHVwRpBRRpHvT454CNnzJPsOO8XGkeHDSOSM287M6m1jU+vtXfGxTjfcpNEswaQsJDLFydOBPFDFK8UacAvkMeZY+D851Olv0TsnYfae7w5GeqesMBXnkhkWNV9SwTlI5DIP7dZoIp5n5lvBUesIvlfjc7CACNo0nswALOC65LJVUgzkybmMjg8WGjCHySCZCStuOPhTBzTrDj7isIZS5lav4nPwH91YbI7B1RnsNirdejdnx0gE87rHCijw0glkYhY0eMPG0jHigbkfofKM9XZOrhuw8Rk7laa3BDdQ+qFS8rMfIjMaKCzurlXVFBLleI+z8HH586yA0au7FefuWujtqPuwGp0Cj3esXKSBAQmpjcZ4nKrpIlGie9LkuKTjnlOcNp+88sfSTX+JNGraZjctbt5LDX9mtTQ8oaV6reaCCLlw9rVpJVX2yMxADEEKPJ5fQ3L9W7XkNps4+q1LK08BBDMFlt1LFRZJZAvP1ixHGW9aAeSR9En68fZnevehdAUTU3YKnUvelWvg+8iDcXYN0D2GpSV0mszwFhGjsl3RhglCH5EQZc+RmVLcYaeWhxfBtKFYxWnsHfN/zu2a/mM1grVCxRmjapWkinAszLLE7+sPGjP7GWJOEYZlBUcmJBMdOk+mumdO623XV9W3ChmaeYrTpkb0NmmxoVZK9mKL3GKeVI/TG9iUyzNGjsrtwRVIH/2Q=="

/***/ }),
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/*!***************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/mark.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAtklEQVRIS+3UsQnCYBDF8f8bwAVs7cwARrBwAq3sE3ACQbARbB1Ck9rWARQs/CwFdRAXOLGxMCGfGAISvPaOX/F4nKhoVJHLH34lW8MoLIwWmIaIFnAGm8ule1+bCqOwbjTCtMkgRqBTcivCPXB8wQiygK3k0vH3cBjfgUYOsJVLBmXgA9DLAlrKrWcl4KgP2r0Dcom3pt4D68RtZBNQE3HVMZn6GvHce+FPkLybP1znJ/RzrXgAVAoqF4+ayeMAAAAASUVORK5CYII="

/***/ }),
/* 59 */
/*!******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/shopcar.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAZCAYAAAAmNZ4aAAACrUlEQVRIS72WTWgTQRTH/69VD0LtWYQKhXajiOymfn+B4Edm9eCpRfQgFgNeqiexIlgPBQse1F6sKB70UOhBFMxsBVEKYlGbyaWQWSzUiwhFED1q82Q3id2a3WRjUue0O7z5/+btvPm/JcMSjMrxWit5MGS+aVMUAYZWkppGCRHywK+W5qkT4A7vncGHXOW8XCn4sqw29xzvWCwsfvJhhNs6Ky/+F7AHMSzxDsD2lQICkFpJu+IcDVOMgHBppcAMjLpKDlSCk3YKzNI/Z+brzdoAEV0rniAG8kqOhlauYYo5EDoBvNdK7mgUnkiKNDPGikUL21Uy/MoYln0f4P7iDnlPXjlvG4F3m2KMCGlPYxUVumazkx9DM+5Oij5ijPswxrDOyauNgA0rNQXQfk+j7A+RJmFY4huAdgA5raTVGFjMA9gI4ItWcn3prMMljaR4AsYJP+mWxU3uzIu89/z9SDpRbRNtXzFHM/d+BmPK7sjAtKvk7lrgU2A8LgmMaCUv++BU+heA1ih42wLWBMGJ5LEe5sKHEmw8r+TJquCSmfgNhIFZV8kt/wI2kqnTYHpUhNGNvMoMxgDbUwD7RYG1q9fpN89+fEud8xdGjfYFurk8Y3GFGcPFeDqvVeZuTXDCtM8w8cPiIr6glXOn3iILXiUQCZ3NODXBwc/tVTczP60XTES7ABz11pXvcFxws5rGn6tUE9xl2oeJuJ+AvnozDYmfZ/CgqxzfmKoZyAMAZwMCn7WSG+rdgGGJUJ1wyzRTQ+VusgxENKGzmd648O4qOuHdyRLPAdj+J6GWbYzCLTD2ef6hlfRsNNYwquhEgJe6E4DJclUGjSQOOdjl/tYJBXdttXe2tPJ0hThzr845E3GgXkw1nejiMsXe0i/QAQDz3h12c85QXGg5zojQ+Q3B7x5wVmrgIwAAAABJRU5ErkJggg=="

/***/ }),
/* 60 */
/*!***************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/show.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAACnklEQVRYR+2Wz2sTQRTHv28i6EkQf+2PGnKr1kPNhqAIzSYIHoTgSaEHQfAu6MWj9U8QPQpVT1IVQfFkIYn0IiYRpS1VED2kswkGUQQhMZmRjQkkmv2VraVo5jrvvfns931n3hK26KItyoUxWNDOjBX7fxRTFGWKMXYcwITTVxPRx0aj8bBer38bFrOeMuYihOlWu31lYun1Oz/quXpMUZQ0Yyznp5AQIlOtVvPDYi3TmAdwHkAxQpHsvvzLqldNR7BYLLaj2Wy+B6AB+ALg+qiKWTPxKTC2AMjDBCyKnXRae1L67gbnCNZt4YqdzDkPfXv74QB6oBZKZ0YF67RRSpm3LCvjJX3/fi2VOCkhkwIySaAkqKP6wBJEM3q+tOTYBaeNnr+CgtlGZ4SrXh+yaWC1THxaCFoEsMeGksAjKfGGEa2A2p86oDJy0/YZgPtqoXx2U1ppmYbsHvQVwCW1ULZvYmcN+ssbys5xM79vj1lm/ClApwCsqYXyod+VsEyjCCDhR6lebmiw9VT8AiO6ZRcUjB3Uc8W3f4IllgG56tW+/rzQYJZp3AVwTkhc05+X57xM73c/NBg3jTUCJonkrJJ/dc/vwV5xocBqJ47uF60fnfGyrd2e3OtzDnpBhTa/lT6Shvw1S9VC2fd00DRtloi2uw3+UIqNCqaqao6I0m6D/98E6zyeprEgJFaD3Mi/rpgfEw+LGYMFVS6UYqqqJojInnGcc64HPdwtXtO0DwBijLFjlUrlxbBYx1sZjUZ3tVqtz92k20KIOxsBxxi7DCBr12KM7a5UKr0zBsq7Poqaptmzz/Onb0Tgi5zzG065nq+1ruv2v3lWCHFgRIBBJYiWATzmnD9zq+cJthEwo9QYgwVVbazYWLGgCgSN/wk5gow25Jj6hQAAAABJRU5ErkJggg=="

/***/ }),
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */
/*!****************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/order.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 70 */
/*!******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/goods01.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 71 */
/*!******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/goods02.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 72 */
/*!******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/goods03.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 73 */
/*!*******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/no_order.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 74 */,
/* 75 */,
/* 76 */
/*!********************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/common/way/reset.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */
/*!****************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/food1.jpg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 84 */
/*!****************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/food2.jpg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 85 */
/*!*****************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/seabtn.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAHOSURBVEhLxZZNLwNRFIbfdiVCSmJBYuFjpdgRZeEj/JBWwqJ/wBJLf6ALEvVDiI8FTdihXflYSFhIaIjY1XlnzmRm2ulo63Y8m07OpOfpvbfnnhOrCGiEwg2Q3gJ6ujXg4f0DOJB3qQkNhPO79LIIrGSBgb5goQPFz6/AYQ6YTmowmPrS23tgbhXoF1lviKyaN5G/iPx8Hxgf0aCfYGnpAZhfB0YHNdACd0/A2S4wNqwBl7h+upgQEn6feUqPGnDxS4uGhA6WeM3O68GV8gwXDAodmI95mV9xzzSxGLj/xuCxlU+sR3ulV1IW/Jc2QyGvDw3C/PQItnRZ6rCZsmgF5qdHiOPi2i78KNDLJY7MdvhNY5LODuD4SqRRCUmiC8ju6JlGiYhjlZl0/Qu/2X+ol1RGH2oJl4bBHxSSOIzot7f8KVL2wagQIXIbIs1v2g04Cr6+gaUpkc5O2h0/CnRx9pkeyYjBjt9OmJ8e4R+7DOFMwxGjHTAv8yvuSgk7vOlGTuGpzEpJdxf9dcoXHKZMrdgazvZ8QlJ7OfBcTYgtIafBIQ24+LfXS+RzrxdnwmcLZD9ke6qGNw0Ln3X4pwk/CGnA7Ic+sV5tvGkaA/gB7kW5rIDD284AAAAASUVORK5CYII="

/***/ }),
/* 86 */
/*!****************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/food3.jpg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 87 */
/*!****************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/food4.jpg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 88 */
/*!*******************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/shopcart.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACDElEQVRYR+2WTYhOYRTHf/+lQhIbJTY2FKUYKSGp0YjVSCyGBQs2MtljaWFWForUlMWYlWRMUmQjHxtCKZmIFFFMjbL56zQ35vXej+e+H72b+ddd3fOc87vn455H9FjqcXzmAWpnwPZG4BiwPnveA0+Bh5Ku1S1pLQDb/cCdLMgn4COwEFgJLAbGgZOSvqaCJAPYPgLEF74Bjkp6NDeI7cvAcWBS0p6OAtheDbwEvklaVeTc9ghwChiSNJoCkZQB2xeAM8BeSbdLAJYA94FfkrZ2EmAyapzi1PbF6ANgkaTfVRCpGfgBXJV0usqh7UHgBrBJ0rMq+1SAQUnR4UmyfRa4IimmpFS5ALaXA+uqDtd4/0HSuzz7JoA5KazhP8l0XNKB/y3zAKaAGLtu6JykKM9fNQDY3pGNUTeCh89bkvbVBxgZg+kZ6O+DzWvL4cptyzMQnm1/AaIJZ/X9J5zPdsz+bbAzdlGBqm37JD0pzEAGcAk40RDi1RQ8fzubgaWxc0pUbPtZ0oqUJtwF3OtCE4xKGqoEyC1DZ2gOShpLBWguQ3sQsROWSZpOBYhRudlezIbTE5IG8vwV/YoXAHHV+jcN7dEMS4ot2aTCZWQ7Zi9uQZ3QBkkv6gIcAq53IPpjSVuK/JSuY9t3gd1tQgxImmgVYA1wGNjeAsRr4EHVPSLpQtJC8OQj8wA9z8AfbXK0Ie4CmnIAAAAASUVORK5CYII="

/***/ }),
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */
/*!**************************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/static/index-carousel2.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/index-carousel2.png";

/***/ }),
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */
/*!************************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-cli-shared/components/i18n/index.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _en_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en.json */ 137);
var _en_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./en.json */ 137, 1);
/* harmony import */ var _es_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./es.json */ 138);
var _es_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./es.json */ 138, 1);
/* harmony import */ var _fr_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fr.json */ 139);
var _fr_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./fr.json */ 139, 1);
/* harmony import */ var _zh_Hans_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./zh-Hans.json */ 140);
var _zh_Hans_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./zh-Hans.json */ 140, 1);
/* harmony import */ var _zh_Hant_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./zh-Hant.json */ 141);
var _zh_Hant_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./zh-Hant.json */ 141, 1);





/* harmony default export */ __webpack_exports__["default"] = ({
  en: _en_json__WEBPACK_IMPORTED_MODULE_0__,
  es: _es_json__WEBPACK_IMPORTED_MODULE_1__,
  fr: _fr_json__WEBPACK_IMPORTED_MODULE_2__,
  'zh-Hans': _zh_Hans_json__WEBPACK_IMPORTED_MODULE_3__,
  'zh-Hant': _zh_Hant_json__WEBPACK_IMPORTED_MODULE_4__
});


/***/ }),
/* 137 */
/*!***********************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-cli-shared/components/i18n/en.json ***!
  \***********************************************************************/
/*! exports provided: uniCloud.component.add.success, uniCloud.component.update.success, uniCloud.component.remove.showModal.title, uniCloud.component.remove.showModal.content, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uniCloud.component.add.success\":\"Success\",\"uniCloud.component.update.success\":\"Success\",\"uniCloud.component.remove.showModal.title\":\"Tips\",\"uniCloud.component.remove.showModal.content\":\"是否删除该数据\"}");

/***/ }),
/* 138 */
/*!***********************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-cli-shared/components/i18n/es.json ***!
  \***********************************************************************/
/*! exports provided: uniCloud.component.add.success, uniCloud.component.update.success, uniCloud.component.remove.showModal.title, uniCloud.component.remove.showModal.content, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uniCloud.component.add.success\":\"新增成功\",\"uniCloud.component.update.success\":\"修改成功\",\"uniCloud.component.remove.showModal.title\":\"提示\",\"uniCloud.component.remove.showModal.content\":\"是否删除该数据\"}");

/***/ }),
/* 139 */
/*!***********************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-cli-shared/components/i18n/fr.json ***!
  \***********************************************************************/
/*! exports provided: uniCloud.component.add.success, uniCloud.component.update.success, uniCloud.component.remove.showModal.title, uniCloud.component.remove.showModal.content, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uniCloud.component.add.success\":\"新增成功\",\"uniCloud.component.update.success\":\"修改成功\",\"uniCloud.component.remove.showModal.title\":\"提示\",\"uniCloud.component.remove.showModal.content\":\"是否删除该数据\"}");

/***/ }),
/* 140 */
/*!****************************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-cli-shared/components/i18n/zh-Hans.json ***!
  \****************************************************************************/
/*! exports provided: uniCloud.component.add.success, uniCloud.component.update.success, uniCloud.component.remove.showModal.title, uniCloud.component.remove.showModal.content, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uniCloud.component.add.success\":\"新增成功\",\"uniCloud.component.update.success\":\"修改成功\",\"uniCloud.component.remove.showModal.title\":\"提示\",\"uniCloud.component.remove.showModal.content\":\"是否删除该数据\"}");

/***/ }),
/* 141 */
/*!****************************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-cli-shared/components/i18n/zh-Hant.json ***!
  \****************************************************************************/
/*! exports provided: uniCloud.component.add.success, uniCloud.component.update.success, uniCloud.component.remove.showModal.title, uniCloud.component.remove.showModal.content, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uniCloud.component.add.success\":\"新增成功\",\"uniCloud.component.update.success\":\"修改成功\",\"uniCloud.component.remove.showModal.title\":\"提示\",\"uniCloud.component.remove.showModal.content\":\"是否刪除數據\"}");

/***/ }),
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */
/*!*********************************************************!*\
  !*** D:/Code/uniapp/shuiguoshule/common/common-data.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

// 贝塞尔算法
function bezier(pots, amount) {
  var pot;
  var lines;
  var ret = [];
  var points;
  for (var i = 0; i <= amount; i++) {
    points = pots.slice(0);
    lines = [];
    while (pot = points.shift()) {
      if (points.length) {
        lines.push(pointLine([pot, points[0]], i / amount));
      } else if (lines.length > 1) {
        points = lines;
        lines = [];
      } else {
        break;
      }
    }
    ret.push(lines[0]);
  }

  function pointLine(points, rate) {
    var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
    var ret = [];
    pointA = points[0]; //点击
    pointB = points[1]; //中间
    xDistance = pointB.x - pointA.x;
    yDistance = pointB.y - pointA.y;
    pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
    tan = yDistance / xDistance;
    radian = Math.atan(tan);
    tmpPointDistance = pointDistance * rate;
    ret = {
      x: pointA.x + tmpPointDistance * Math.cos(radian),
      y: pointA.y + tmpPointDistance * Math.sin(radian) };

    return ret;
  }
  return {
    'bezier_points': ret };

}var _default =

{
  bezier: bezier };exports.default = _default;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map