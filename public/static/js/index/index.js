webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
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
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(39);
var toPrimitive = __webpack_require__(20);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(16)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(17);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(14);
var ctx = __webpack_require__(139);
var hide = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(12);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (process.env.NODE_ENV !== 'production') {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    process.env.NODE_ENV !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(34)))

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      list: $list
    };
  },

  components: {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _infor = __webpack_require__(135);

var _infor2 = _interopRequireDefault(_infor);

var _header = __webpack_require__(147);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//

exports.default = {
  components: {
    Header: _header2.default,
    Infor: _infor2.default
  }
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(38);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _button = __webpack_require__(41);

var _cityselect = __webpack_require__(141);

var _textarea = __webpack_require__(142);

var _cell = __webpack_require__(42);

var _jd_province_city_area_id = __webpack_require__(143);

var _jd_province_city_area_id2 = _interopRequireDefault(_jd_province_city_area_id);

var _store = __webpack_require__(43);

var _fetch = __webpack_require__(145);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

_vue2.default.component(_button.Button.name, _button.Button);
_vue2.default.component(_button.ButtonGroup.name, _button.ButtonGroup);

_vue2.default.component(_textarea.TextArea.name, _textarea.TextArea);
_vue2.default.component(_cell.CellGroup.name, _cell.CellGroup);
_vue2.default.component(_cell.CellItem.name, _cell.CellItem);
_vue2.default.component(_cityselect.CitySelect.name, _cityselect.CitySelect);
var set_good = _store.actionTypes.set_good;
exports.default = {
  data: function data() {
    var _good;

    return {
      good: (_good = {
        title: "",
        desc: ""
      }, (0, _defineProperty3.default)(_good, "desc", ""), (0, _defineProperty3.default)(_good, "a_sheng", ""), (0, _defineProperty3.default)(_good, "a_shi", ""), (0, _defineProperty3.default)(_good, "a_xain", ""), (0, _defineProperty3.default)(_good, "a_address", ""), (0, _defineProperty3.default)(_good, "price", ""), (0, _defineProperty3.default)(_good, "image_url", ""), (0, _defineProperty3.default)(_good, "a_s_s_x", ""), _good),
      show1: false,
      district: _jd_province_city_area_id2.default
    };
  },

  methods: {
    result1: function result1(ret) {
      this.$data.good.a_s_s_x = ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
      this.$data.good.a_sheng = ret.itemName1;
      this.$data.good.a_shi = ret.itemName2;
      this.$data.good.a_xain = ret.itemName3;
    },
    click_submit: function click_submit() {
      var dispatch = this.$store.dispatch;

      var self = this;
      dispatch(set_good, { good: self.$data.good });
      (0, _fetch.fetch_good_add)({
        data: self.$data.good,
        success: function success(res) {
          self.$dialog.toast({ mes: JSON.parse(res)['message'], timeout: 500 });
        }
      });
    },
    file_change: function file_change(event) {
      var self = this;
      var files = event.target.files;
      (0, _fetch.fetch_upload_image_in_good)({
        data: files,
        success: function success(res) {
          var josn = JSON.parse(res);
          if (josn["success"]) {
            self.$data.good.image_url = josn["message"][0];
            self.$dialog.toast({ mes: "上次成功", timeout: 500 });
          }
        }
      });
    }
  }
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(136);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(16)(function () {
  return Object.defineProperty(__webpack_require__(40)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/*! vue-ydui v1.2.0 by YDCSS (c) 2018 Licensed MIT */
!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ydui=t():e.ydui=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="/dist/",t(0)}({0:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.ButtonGroup=t.Button=void 0;var r=n(18),i=o(r),a=n(75),s=o(a);t.Button=i.default,t.ButtonGroup=s.default},1:function(e,t){e.exports=function(e,t,n,o){var r,i=e=e||{},a=typeof e.default;"object"!==a&&"function"!==a||(r=e,i=e.default);var s="function"==typeof i?i.options:i;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),n&&(s._scopeId=n),o){var d=s.computed||(s.computed={});Object.keys(o).forEach(function(e){var t=o[e];d[e]=function(){return t}})}return{esModule:r,exports:i,options:s}}},2:function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},3:function(e,t,n){function o(e){for(var t=0;t<e.length;t++){var n=e[t],o=c[n.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](n.parts[r]);for(;r<n.parts.length;r++)o.parts.push(i(n.parts[r]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{for(var a=[],r=0;r<n.parts.length;r++)a.push(i(n.parts[r]));c[n.id]={id:n.id,refs:1,parts:a}}}}function r(){var e=document.createElement("style");return e.type="text/css",l.appendChild(e),e}function i(e){var t,n,o=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(o){if(v)return b;o.parentNode.removeChild(o)}if(g){var i=p++;o=f||(f=r()),t=a.bind(null,o,i,!1),n=a.bind(null,o,i,!0)}else o=r(),t=s.bind(null,o),n=function(){o.parentNode.removeChild(o)};return t(e),function(o){if(o){if(o.css===e.css&&o.media===e.media&&o.sourceMap===e.sourceMap)return;t(e=o)}else n()}}function a(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=h(t,r);else{var i=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function s(e,t){var n=t.css,o=t.media,r=t.sourceMap;if(o&&e.setAttribute("media",o),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var d="undefined"!=typeof document,u=n(4),c={},l=d&&(document.head||document.getElementsByTagName("head")[0]),f=null,p=0,v=!1,b=function(){},g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){v=n;var r=u(e,t);return o(r),function(t){for(var n=[],i=0;i<r.length;i++){var a=r[i],s=c[a.id];s.refs--,n.push(s)}t?(r=u(e,t),o(r)):r=[];for(var i=0;i<n.length;i++){var s=n[i];if(0===s.refs){for(var d=0;d<s.parts.length;d++)s.parts[d]();delete c[s.id]}}}};var h=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},4:function(e,t){e.exports=function(e,t){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=i[0],s=i[1],d=i[2],u=i[3],c={id:e+":"+r,css:s,media:d,sourceMap:u};o[a]?o[a].parts.push(c):n.push(o[a]={id:a,parts:[c]})}return n}},5:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var e=function(e){e.preventDefault(),e.stopPropagation()},t=!1;return{lock:function(n){t||(t=!0,(n||document).addEventListener("touchmove",e))},unlock:function(n){t=!1,(n||document).removeEventListener("touchmove",e)}}}(),o=function(){return{lock:function(e){r&&u(e||document.body,"g-fix-ios-prevent-scroll")},unlock:function(e){r&&c(e||document.body,"g-fix-ios-prevent-scroll")}}}(),r=!!(window.navigator&&window.navigator.userAgent||"").match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),i=function(e){var t=/^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/,n=/^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/,o=/^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;return t.test(e)||n.test(e)||o.test(e)},a=function(e){for(var t=e;t&&"HTML"!==t.tagName&&"BODY"!==t.tagName&&1===t.nodeType;){var n=document.defaultView.getComputedStyle(t).overflowY;if("scroll"===n||"auto"===n)return t;t=t.parentNode}return window},s=function(e,t){var n=e===window?document.body.offsetHeight:e.offsetHeight,o=e===window?0:e.getBoundingClientRect().top,r=t.getBoundingClientRect().top-o,i=r+t.offsetHeight;return r>=0&&r<n||i>0&&i<=n},d=function(e,t){return t=t||"",!(0===t.replace(/\s/g,"").length||!e)&&new RegExp(" "+t+" ").test(" "+e.className+" ")},u=function(e,t){d(e,t)||(e.className=""===e.className?t:e.className+" "+t)},c=function(e,t){if(d(e,t)){for(var n=" "+e.className.replace(/[\t\r\n]/g,"")+" ";n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},l=function(e){function t(n,o,r){if(n===o)return void("function"==typeof i&&i());var a=n+r>o?o:n+r;n>o&&(a=n-r<o?o:n-r),e===window?window.scrollTo(a,a):e.scrollTop=a,window.requestAnimationFrame(function(){return t(a,o,r)})}var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:500,i=arguments[4];window.requestAnimationFrame||(window.requestAnimationFrame=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return window.setTimeout(e,1e3/60)});var a=Math.abs(n-o),s=Math.ceil(a/r*50);t(n,o,s)};t.pageScroll=n,t.preventScroll=o,t.isIOS=r,t.isColor=i,t.getScrollview=a,t.checkInview=s,t.addClass=u,t.removeClass=c,t.scrollTop=l},16:function(e,t,n){t=e.exports=n(2)(),t.push([e.id,".yd-button{padding:0 12px}.yd-btn{height:30px;font-size:13px;display:inline-block;padding:0 10px;box-sizing:content-box;white-space:nowrap}.yd-btn,.yd-btn-block{text-align:center;position:relative;border:none;pointer-events:auto;border-radius:3px}.yd-btn-block{width:100%;display:block;font-size:18px;height:50px;margin-top:25px}.yd-btn-circle{border-radius:200px}.yd-btn-primary{background-color:#04be02;color:#fff}.yd-btn-primary:active{background-color:#04ab02}.yd-btn-danger{background-color:#ef4f4f;color:#fff}.yd-btn-danger:active{background-color:#d74747}.yd-btn-warning{background-color:#ffb400;color:#fff}.yd-btn-warning:active{background-color:#e6a200}.yd-btn-disabled{background-color:#ccc;color:#f0f0f0;pointer-events:none}.yd-btn-disabled:active{background-color:#b8b8b8}.yd-btn-hollow{background-color:#fff;color:#454545;border:1px solid #eaeaea}.yd-btn-hollow:active{background-color:#f7f7f7}.hairline .yd-btn-hollow{border:.5px solid #dedede}",""])},18:function(e,t,n){n(27);var o=n(1)(n(29),n(24),null,null);e.exports=o.exports},24:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{class:e.classes,style:{backgroundColor:e.bgcolor,color:e.color},attrs:{disabled:e.disabled,type:e.actionType}},[e._t("default")],2)},staticRenderFns:[]}},27:function(e,t,n){var o=n(16);"string"==typeof o&&(o=[[e.id,o,""]]),o.locals&&(e.exports=o.locals);n(3)("b340f40e",o,!0)},29:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(5);t.default={name:"yd-button",props:{disabled:Boolean,actionType:{validator:function(e){return["button","submit","reset"].indexOf(e)>-1},default:"button"},type:{validator:function(e){return["primary","danger","warning","hollow","disabled"].indexOf(e)>-1},default:"primary"},size:{validator:function(e){return["small","large"].indexOf(e)>-1}},bgcolor:{validator:function(e){return!e||(0,o.isColor)(e)}},color:{validator:function(e){return!e||(0,o.isColor)(e)}},shape:{validator:function(e){return["square","circle"].indexOf(e)>-1},default:"square"}},computed:{classes:function(){var e="large"===this.size?"yd-btn-block":"yd-btn",t="yd-btn-"+this.type;return this.disabled&&(t="yd-btn-disabled"),this.bgcolor&&(t=""),e+" "+t+("circle"===this.shape?" yd-btn-circle":"")}}}},75:function(e,t,n){var o=n(1)(n(252),n(173),null,null);e.exports=o.exports},173:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"yd-button"},[e._t("default")],2)},staticRenderFns:[]}},252:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"yd-button-group"}}})});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/*! vue-ydui v1.2.0 by YDCSS (c) 2018 Licensed MIT */
!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ydui=t():e.ydui=t()}(this,function(){return function(e){function t(l){if(i[l])return i[l].exports;var n=i[l]={exports:{},id:l,loaded:!1};return e[l].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="/dist/",t(0)}({0:function(e,t,i){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.CellGroup=t.CellItem=void 0;var n=i(77),r=l(n),o=i(76),c=l(o);t.CellItem=r.default,t.CellGroup=c.default},1:function(e,t){e.exports=function(e,t,i,l){var n,r=e=e||{},o=typeof e.default;"object"!==o&&"function"!==o||(n=e,r=e.default);var c="function"==typeof r?r.options:r;if(t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns),i&&(c._scopeId=i),l){var s=c.computed||(c.computed={});Object.keys(l).forEach(function(e){var t=l[e];s[e]=function(){return t}})}return{esModule:n,exports:r,options:c}}},2:function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var i=this[t];i[2]?e.push("@media "+i[2]+"{"+i[1]+"}"):e.push(i[1])}return e.join("")},e.i=function(t,i){"string"==typeof t&&(t=[[null,t,""]]);for(var l={},n=0;n<this.length;n++){var r=this[n][0];"number"==typeof r&&(l[r]=!0)}for(n=0;n<t.length;n++){var o=t[n];"number"==typeof o[0]&&l[o[0]]||(i&&!o[2]?o[2]=i:i&&(o[2]="("+o[2]+") and ("+i+")"),e.push(o))}},e}},3:function(e,t,i){function l(e){for(var t=0;t<e.length;t++){var i=e[t],l=d[i.id];if(l){l.refs++;for(var n=0;n<l.parts.length;n++)l.parts[n](i.parts[n]);for(;n<i.parts.length;n++)l.parts.push(r(i.parts[n]));l.parts.length>i.parts.length&&(l.parts.length=i.parts.length)}else{for(var o=[],n=0;n<i.parts.length;n++)o.push(r(i.parts[n]));d[i.id]={id:i.id,refs:1,parts:o}}}}function n(){var e=document.createElement("style");return e.type="text/css",p.appendChild(e),e}function r(e){var t,i,l=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(l){if(u)return h;l.parentNode.removeChild(l)}if(x){var r=y++;l=f||(f=n()),t=o.bind(null,l,r,!1),i=o.bind(null,l,r,!0)}else l=n(),t=c.bind(null,l),i=function(){l.parentNode.removeChild(l)};return t(e),function(l){if(l){if(l.css===e.css&&l.media===e.media&&l.sourceMap===e.sourceMap)return;t(e=l)}else i()}}function o(e,t,i,l){var n=i?"":l.css;if(e.styleSheet)e.styleSheet.cssText=g(t,n);else{var r=document.createTextNode(n),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(r,o[t]):e.appendChild(r)}}function c(e,t){var i=t.css,l=t.media,n=t.sourceMap;if(l&&e.setAttribute("media",l),n&&(i+="\n/*# sourceURL="+n.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var s="undefined"!=typeof document,a=i(4),d={},p=s&&(document.head||document.getElementsByTagName("head")[0]),f=null,y=0,u=!1,h=function(){},x="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,i){u=i;var n=a(e,t);return l(n),function(t){for(var i=[],r=0;r<n.length;r++){var o=n[r],c=d[o.id];c.refs--,i.push(c)}t?(n=a(e,t),l(n)):n=[];for(var r=0;r<i.length;r++){var c=i[r];if(0===c.refs){for(var s=0;s<c.parts.length;s++)c.parts[s]();delete d[c.id]}}}};var g=function(){var e=[];return function(t,i){return e[t]=i,e.filter(Boolean).join("\n")}}()},4:function(e,t){e.exports=function(e,t){for(var i=[],l={},n=0;n<t.length;n++){var r=t[n],o=r[0],c=r[1],s=r[2],a=r[3],d={id:e+":"+n,css:c,media:s,sourceMap:a};l[o]?l[o].parts.push(d):i.push(l[o]={id:o,parts:[d]})}return i}},54:function(e,t,i){t=e.exports=i(2)(),t.push([e.id,'.yd-cell-box{margin-bottom:17px}.yd-cell{background-color:#fff;position:relative;z-index:5}.yd-cell:after{content:"";position:absolute;z-index:0;bottom:0;left:0;width:100%;border-bottom:1px solid #b2b2b2;-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}.yd-cell a.yd-cell-item,.yd-cell label.yd-cell-item{background-color:#fff}.yd-cell a.yd-cell-item:active,.yd-cell label.yd-cell-item:active{background-color:#f5f5f5}.yd-cell-item{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;padding-left:12px;overflow:hidden}.yd-cell-item:not(:last-child):after{margin-left:12px;content:"";position:absolute;z-index:0;bottom:0;left:0;width:100%;border-bottom:1px solid #d9d9d9;-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}.yd-cell-left{color:#333;font-size:15px;white-space:nowrap;-ms-flex-align:center}.yd-cell-left,.yd-cell-right{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.yd-cell-right{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:100%;min-height:50px;color:#525252;text-align:right;font-size:13px;padding-right:12px;-ms-flex-align:center;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}.yd-cell-right input[type=date],.yd-cell-right input[type=datetime-local],.yd-cell-right input[type=time]{line-height:50px}.yd-cell-right input[type=checkbox]:not(.yd-switch),.yd-cell-right input[type=radio]{position:absolute;left:-9999em}.yd-cell-right input[type=checkbox]:not(.yd-switch)+.yd-cell-checkbox-icon:after,.yd-cell-right input[type=checkbox]:not(.yd-switch)+.yd-cell-radio-icon:after,.yd-cell-right input[type=radio]+.yd-cell-checkbox-icon:after,.yd-cell-right input[type=radio]+.yd-cell-radio-icon:after{font-family:YDUI-INLAY;font-size:22px}.yd-cell-right input[type=checkbox]:not(.yd-switch)+.yd-cell-radio-icon:after,.yd-cell-right input[type=radio]+.yd-cell-radio-icon:after{content:"\\E600";color:#4cd864;display:none}.yd-cell-right input[type=checkbox]:not(.yd-switch)+.yd-cell-checkbox-icon:after,.yd-cell-right input[type=radio]+.yd-cell-checkbox-icon:after{content:"\\E604";color:#d9d9d9}.yd-cell-right input[type=checkbox]:not(.yd-switch):checked+.yd-cell-radio-icon:after,.yd-cell-right input[type=radio]:checked+.yd-cell-radio-icon:after{display:inline-block}.yd-cell-right input[type=checkbox]:not(.yd-switch):checked+.yd-cell-checkbox-icon:after,.yd-cell-right input[type=radio]:checked+.yd-cell-checkbox-icon:after{color:#4cd864;content:"\\E601"}.yd-cell-right:active{background:none}.yd-cell-right .yd-input-clear,.yd-cell-right .yd-input-password{height:50px}.yd-cell-right .yd-datetime-input,.yd-cell-right input[type=date],.yd-cell-right input[type=datetime-local],.yd-cell-right input[type=email],.yd-cell-right input[type=number]:not(.yd-spinner-input),.yd-cell-right input[type=password],.yd-cell-right input[type=tel],.yd-cell-right input[type=text],.yd-cell-right input[type=time],.yd-cell-right input[type=url]{width:1%;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:50px;border:none;font-size:15px;background:transparent;color:#555;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;text-align:left}.yd-cell-right select{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:50px;border:none;display:block;color:#a9a9a9;font-size:15px;margin-left:-4px}.yd-cell-icon{display:block;margin-right:5px}.yd-cell-icon img{height:20px}.yd-cell-arrow:after{margin-left:2px;margin-right:-4px;display:block;font-family:YDUI-INLAY;font-size:17px;color:#c9c9c9;content:"\\E608"}.yd-cell-title{padding:0 12px 5px;font-size:15px;text-align:left;color:#888;position:relative;z-index:1;background-color:#f5f5f5}.yd-cell-title:after{content:"";position:absolute;z-index:3;bottom:0;left:0;width:100%;border-bottom:1px solid #d9d9d9;-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}',""])},76:function(e,t,i){var l=i(1)(i(253),i(195),null,null);e.exports=l.exports},77:function(e,t,i){i(228);var l=i(1)(i(254),i(172),null,null);e.exports=l.exports},172:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return"label"==e.type||"checkbox"==e.type||"radio"==e.type?i("label",{staticClass:"yd-cell-item"},[e.checkLeft?i("span",{staticClass:"yd-cell-left"},[i("span",{staticClass:"yd-cell-icon"},[e._t("icon")],2),e._v(" "),e._t("left")],2):e._e(),e._v(" "),i("label",{staticClass:"yd-cell-right",class:e.classes},[e._t("right"),e._v(" "),"checkbox"==e.type?i("i",{staticClass:"yd-cell-checkbox-icon"}):e._e(),e._v(" "),"radio"==e.type?i("i",{staticClass:"yd-cell-radio-icon"}):e._e()],2)]):"link"==e.type?i("router-link",{staticClass:"yd-cell-item",attrs:{to:e.href}},[e.checkLeft?i("div",{staticClass:"yd-cell-left"},[i("span",{staticClass:"yd-cell-icon"},[e._t("icon")],2),e._v(" "),e._t("left")],2):e._e(),e._v(" "),i("div",{staticClass:"yd-cell-right",class:e.classes},[e._t("right")],2)]):"a"==e.type?i("a",{staticClass:"yd-cell-item",attrs:{href:e.href}},[e.checkLeft?i("div",{staticClass:"yd-cell-left"},[i("span",{staticClass:"yd-cell-icon"},[e._t("icon")],2),e._v(" "),e._t("left")],2):e._e(),e._v(" "),i("div",{staticClass:"yd-cell-right",class:e.classes},[e._t("right")],2)]):i("div",{staticClass:"yd-cell-item"},[e.checkLeft?i("div",{staticClass:"yd-cell-left"},[i("span",{staticClass:"yd-cell-icon"},[e._t("icon")],2),e._v(" "),e._t("left")],2):e._e(),e._v(" "),i("div",{staticClass:"yd-cell-right",class:e.classes},[e._t("right")],2)])},staticRenderFns:[]}},195:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"yd-cell-box"},[i("div",{staticClass:"yd-cell"},[e.title?i("div",{staticClass:"yd-cell-title"},[e._v(e._s(e.title))]):e._e(),e._v(" "),e._t("default")],2),e._v(" "),e._t("bottom")],2)},staticRenderFns:[]}},228:function(e,t,i){var l=i(54);"string"==typeof l&&(l=[[e.id,l,""]]),l.locals&&(e.exports=l.locals);i(3)("45e524ac",l,!0)},253:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"yd-cell-group",props:{title:String}}},254:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"yd-cell-item",props:{type:{validator:function(e){return["link","a","label","div","checkbox","radio"].indexOf(e)>-1},default:"div"},arrow:{type:Boolean,default:!1},href:{type:[String,Object]}},computed:{checkLeft:function(){return!!this.$slots.left||!!this.$slots.icon},classes:function(){return this.arrow?"yd-cell-arrow":""}}}}})});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.store = exports.actionTypes = undefined;

var _defineProperty2 = __webpack_require__(38);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _vuex = __webpack_require__(33);

var _vuex2 = _interopRequireDefault(_vuex);

var _underscore = __webpack_require__(144);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actionTypes = {};
actionTypes.set_good = "set_good";

var mutations = (0, _defineProperty3.default)({}, actionTypes.set_good, function (state, _ref) {
    var good = _ref.good;

    state.good = good;
});
var actions = {};
_underscore2.default.each(actionTypes, function (value, key) {
    actions[key] = function (_ref2, payload) {
        var commit = _ref2.commit;

        commit(key, payload);
    };
});

exports.actionTypes = actionTypes;
var store = exports.store = new _vuex2.default.Store({
    state: {
        good: {
            title: "",
            desc: '',
            a_sheng: '',
            a_shi: '',
            a_xain: '',
            a_address: "",
            price: "",
            image_url: ""
        }
    },
    mutations: mutations,
    actions: actions
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _navbar = __webpack_require__(148);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//

_vue2.default.component(_navbar.NavBar.name, _navbar.NavBar);
_vue2.default.component(_navbar.NavBarBackIcon.name, _navbar.NavBarBackIcon);
_vue2.default.component(_navbar.NavBarNextIcon.name, _navbar.NavBarNextIcon);
exports.default = {};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _search = __webpack_require__(152);

var _cell = __webpack_require__(42);

var _button = __webpack_require__(41);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

_vue2.default.component(_button.Button.name, _button.Button);
_vue2.default.component(_button.ButtonGroup.name, _button.ButtonGroup);
_vue2.default.component(_cell.CellGroup.name, _cell.CellGroup);
_vue2.default.component(_cell.CellItem.name, _cell.CellItem);
_vue2.default.component(_search.Search.name, _search.Search);

exports.default = {
  data: function data() {
    return {
      value1: ""
    };
  },

  methods: {
    submitHandler: function submitHandler(value) {
      this.$dialog.toast({ mes: "\u641C\u7D22\uFF1A" + value });
    }
  }
};

/***/ }),
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
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
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
/* 105 */,
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
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(33);

var _vuex2 = _interopRequireDefault(_vuex);

var _app = __webpack_require__(132);

var _app2 = _interopRequireDefault(_app);

var _add = __webpack_require__(134);

var _add2 = _interopRequireDefault(_add);

var _search = __webpack_require__(151);

var _search2 = _interopRequireDefault(_search);

var _vueRouter = __webpack_require__(154);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _store = __webpack_require__(43);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
    path: '/app', component: _app2.default
}, {
    path: '/add', component: _add2.default
}, {
    path: "/search", component: _search2.default
}, {
    path: '/',
    redirect: '/app'
}];
var router = new _vueRouter2.default({
    routes: routes
});
new _vue2.default({
    el: "#root", router: router, store: _store.store
    // template: "<User/>",
    // components: { User },
});

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_app_vue__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_app_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_app_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_app_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_app_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_4d4c9384_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_app_vue__ = __webpack_require__(133);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_app_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_4d4c9384_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_app_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "application\\index\\view\\index\\app.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d4c9384", Component.options)
  } else {
    hotAPI.reload("data-v-4d4c9384", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "yd-layout",
        [
          _c(
            "yd-navbar",
            { attrs: { slot: "navbar", title: "主页" }, slot: "navbar" },
            [
              _c(
                "router-link",
                { attrs: { slot: "left", to: "/" }, slot: "left" },
                [_c("yd-icon", { attrs: { name: "home" } })],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("router-link", { attrs: { to: "/search" } }, [_c("yd-search")], 1),
          _vm._v(" "),
          _c(
            "yd-list",
            { attrs: { theme: "3" } },
            _vm._l(_vm.list, function(item, key) {
              return _c(
                "yd-list-item",
                { key: key },
                [
                  _c("img", {
                    attrs: { slot: "img", src: item.image_url },
                    slot: "img"
                  }),
                  _vm._v(" "),
                  _c("span", { attrs: { slot: "title" }, slot: "title" }, [
                    _vm._v(_vm._s(item.title))
                  ]),
                  _vm._v(" "),
                  _c(
                    "yd-list-other",
                    { attrs: { slot: "other" }, slot: "other" },
                    [
                      _c("div", [
                        _c("span", { staticClass: "demo-list-price" }, [
                          _c("em", [_vm._v("¥")]),
                          _vm._v(_vm._s(item.price))
                        ]),
                        _vm._v(" "),
                        _c(
                          "span",
                          { staticClass: "demo-list-del-price" },
                          [_c("yd-icon", { attrs: { name: "like" } })],
                          1
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", [
                        _vm._v(
                          "\n                        " +
                            _vm._s(item.desc) +
                            "\n                    "
                        )
                      ])
                    ]
                  )
                ],
                1
              )
            })
          ),
          _vm._v(" "),
          _c(
            "yd-tabbar",
            { attrs: { slot: "tabbar" }, slot: "tabbar" },
            [
              _c(
                "yd-tabbar-item",
                { attrs: { title: "首页", link: "#" } },
                [
                  _c("yd-icon", {
                    attrs: { slot: "icon", name: "home" },
                    slot: "icon"
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "yd-tabbar-item",
                { attrs: { title: "", link: "/add", active: "" } },
                [
                  _c("yd-icon", {
                    attrs: { slot: "icon", name: "compose" },
                    slot: "icon"
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "yd-tabbar-item",
                { attrs: { title: "购物车", link: "#", active: "" } },
                [
                  _c("yd-icon", {
                    attrs: { slot: "icon", name: "shopcart" },
                    slot: "icon"
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "yd-tabbar-item",
                { attrs: { title: "个人中心", link: "#" } },
                [
                  _c("yd-icon", {
                    attrs: { slot: "icon", name: "ucenter-outline" },
                    slot: "icon"
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-4d4c9384", esExports)
  }
}

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_add_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_add_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_add_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_add_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_add_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_38295204_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_add_vue__ = __webpack_require__(150);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_add_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_38295204_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_add_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "application\\index\\view\\index\\add.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-38295204", Component.options)
  } else {
    hotAPI.reload("data-v-38295204", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_infor_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_infor_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_infor_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_infor_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_infor_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_718af0a8_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_infor_vue__ = __webpack_require__(146);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_infor_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_718af0a8_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_infor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "application\\index\\view\\index\\add\\infor.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-718af0a8", Component.options)
  } else {
    hotAPI.reload("data-v-718af0a8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(137), __esModule: true };

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(138);
var $Object = __webpack_require__(14).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(19);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(140);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 140 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

/*! vue-ydui v1.2.0 by YDCSS (c) 2018 Licensed MIT */
!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ydui=e():t.ydui=e()}(this,function(){return function(t){function e(n){if(i[n])return i[n].exports;var o=i[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var i={};return e.m=t,e.c=i,e.p="/dist/",e(0)}({0:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.CitySelect=void 0;var o=i(82),s=n(o);e.CitySelect=s.default},1:function(t,e){t.exports=function(t,e,i,n){var o,s=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(o=t,s=t.default);var r="function"==typeof s?s.options:s;if(e&&(r.render=e.render,r.staticRenderFns=e.staticRenderFns),i&&(r._scopeId=i),n){var l=r.computed||(r.computed={});Object.keys(n).forEach(function(t){var e=n[t];l[t]=function(){return e}})}return{esModule:o,exports:s,options:r}}},2:function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var i=this[e];i[2]?t.push("@media "+i[2]+"{"+i[1]+"}"):t.push(i[1])}return t.join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},o=0;o<this.length;o++){var s=this[o][0];"number"==typeof s&&(n[s]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&n[a[0]]||(i&&!a[2]?a[2]=i:i&&(a[2]="("+a[2]+") and ("+i+")"),t.push(a))}},t}},3:function(t,e,i){function n(t){for(var e=0;e<t.length;e++){var i=t[e],n=u[i.id];if(n){n.refs++;for(var o=0;o<n.parts.length;o++)n.parts[o](i.parts[o]);for(;o<i.parts.length;o++)n.parts.push(s(i.parts[o]));n.parts.length>i.parts.length&&(n.parts.length=i.parts.length)}else{for(var a=[],o=0;o<i.parts.length;o++)a.push(s(i.parts[o]));u[i.id]={id:i.id,refs:1,parts:a}}}}function o(){var t=document.createElement("style");return t.type="text/css",d.appendChild(t),t}function s(t){var e,i,n=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(n){if(p)return h;n.parentNode.removeChild(n)}if(v){var s=m++;n=f||(f=o()),e=a.bind(null,n,s,!1),i=a.bind(null,n,s,!0)}else n=o(),e=r.bind(null,n),i=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else i()}}function a(t,e,i,n){var o=i?"":n.css;if(t.styleSheet)t.styleSheet.cssText=y(e,o);else{var s=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(s,a[e]):t.appendChild(s)}}function r(t,e){var i=e.css,n=e.media,o=e.sourceMap;if(n&&t.setAttribute("media",n),o&&(i+="\n/*# sourceURL="+o.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var l="undefined"!=typeof document,c=i(4),u={},d=l&&(document.head||document.getElementsByTagName("head")[0]),f=null,m=0,p=!1,h=function(){},v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,i){p=i;var o=c(t,e);return n(o),function(e){for(var i=[],s=0;s<o.length;s++){var a=o[s],r=u[a.id];r.refs--,i.push(r)}e?(o=c(t,e),n(o)):o=[];for(var s=0;s<i.length;s++){var r=i[s];if(0===r.refs){for(var l=0;l<r.parts.length;l++)r.parts[l]();delete u[r.id]}}}};var y=function(){var t=[];return function(e,i){return t[e]=i,t.filter(Boolean).join("\n")}}()},4:function(t,e){t.exports=function(t,e){for(var i=[],n={},o=0;o<e.length;o++){var s=e[o],a=s[0],r=s[1],l=s[2],c=s[3],u={id:t+":"+o,css:r,media:l,sourceMap:c};n[a]?n[a].parts.push(u):i.push(n[a]={id:a,parts:[u]})}return i}},5:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){var t=function(t){t.preventDefault(),t.stopPropagation()},e=!1;return{lock:function(i){e||(e=!0,(i||document).addEventListener("touchmove",t))},unlock:function(i){e=!1,(i||document).removeEventListener("touchmove",t)}}}(),n=function(){return{lock:function(t){o&&c(t||document.body,"g-fix-ios-prevent-scroll")},unlock:function(t){o&&u(t||document.body,"g-fix-ios-prevent-scroll")}}}(),o=!!(window.navigator&&window.navigator.userAgent||"").match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),s=function(t){var e=/^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/,i=/^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/,n=/^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;return e.test(t)||i.test(t)||n.test(t)},a=function(t){for(var e=t;e&&"HTML"!==e.tagName&&"BODY"!==e.tagName&&1===e.nodeType;){var i=document.defaultView.getComputedStyle(e).overflowY;if("scroll"===i||"auto"===i)return e;e=e.parentNode}return window},r=function(t,e){var i=t===window?document.body.offsetHeight:t.offsetHeight,n=t===window?0:t.getBoundingClientRect().top,o=e.getBoundingClientRect().top-n,s=o+e.offsetHeight;return o>=0&&o<i||s>0&&s<=i},l=function(t,e){return e=e||"",!(0===e.replace(/\s/g,"").length||!t)&&new RegExp(" "+e+" ").test(" "+t.className+" ")},c=function(t,e){l(t,e)||(t.className=""===t.className?e:t.className+" "+e)},u=function(t,e){if(l(t,e)){for(var i=" "+t.className.replace(/[\t\r\n]/g,"")+" ";i.indexOf(" "+e+" ")>=0;)i=i.replace(" "+e+" "," ");t.className=i.replace(/^\s+|\s+$/g,"")}},d=function(t){function e(i,n,o){if(i===n)return void("function"==typeof s&&s());var a=i+o>n?n:i+o;i>n&&(a=i-o<n?n:i-o),t===window?window.scrollTo(a,a):t.scrollTop=a,window.requestAnimationFrame(function(){return e(a,n,o)})}var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments[2],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:500,s=arguments[4];window.requestAnimationFrame||(window.requestAnimationFrame=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)});var a=Math.abs(i-n),r=Math.ceil(a/o*50);e(i,n,r)};e.pageScroll=i,e.preventScroll=n,e.isIOS=o,e.isColor=s,e.getScrollview=a,e.checkInview=r,e.addClass=c,e.removeClass=u,e.scrollTop=d},8:function(t,e,i){e=t.exports=i(2)(),e.push([t.id,".yd-mask{position:fixed;bottom:0;right:0;left:0;top:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;pointer-events:none;-webkit-transition:opacity .2s ease-in;transition:opacity .2s ease-in;opacity:0}",""])},9:function(t,e,i){i(11);var n=i(1)(i(12),i(10),null,null);t.exports=n.exports},10:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"yd-mask",style:t.styles},[t._t("default")],2)},staticRenderFns:[]}},11:function(t,e,i){var n=i(8);"string"==typeof n&&(n=[[t.id,n,""]]),n.locals&&(t.exports=n.locals);i(3)("4cfe2754",n,!0)},12:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(5);e.default={name:"yd-mask",data:function(){return{show:this.value}},props:{value:{type:Boolean,default:!1},bgcolor:{type:String,default:"#000"},zindex:{default:1500},opacity:{default:.4},animated:{type:Boolean,default:!0}},watch:{value:function(t){var e=this;this.show=t,n.isIOS&&(t?(0,n.addClass)(this.scrollView,"g-fix-ios-overflow-scrolling-bug"):setTimeout(function(){(0,n.removeClass)(e.scrollView,"g-fix-ios-overflow-scrolling-bug")},200))}},computed:{styles:function(){var t={"z-index":this.zindex,"background-color":this.bgcolor};return this.show&&(t.opacity=this.opacity,t["pointer-events"]="auto"),t}},mounted:function(){this.scrollView=(0,n.getScrollview)(this.$el)},destroyed:function(){n.isIOS&&(0,n.removeClass)(this.scrollView,"g-fix-ios-overflow-scrolling-bug")}}},55:function(t,e,i){e=t.exports=i(2)(),e.push([t.id,'.yd-cityselect{position:fixed;bottom:0;left:0;width:100%;height:75%;background-color:#fff;z-index:1502;-webkit-transform:translateY(100%);transform:translateY(100%);-webkit-transition:-webkit-transform .2s;transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s}.yd-cityselect-active{-webkit-transform:translate(0);transform:translate(0)}.yd-cityselect-move-animate{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.yd-cityselect-next{-webkit-transform:translate(-50%);transform:translate(-50%)}.yd-cityselect-prev{-webkit-transform:translate(0);transform:translate(0)}.yd-cityselect-header{position:absolute;top:0;left:0;width:100%;z-index:1}.yd-cityselect-header:after{content:"";position:absolute;z-index:0;bottom:0;left:0;width:100%;border-bottom:1px solid #bdbdbd;-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}.yd-cityselect-title{width:100%;font-size:15px;text-align:center;height:45px;line-height:45px;position:relative}.yd-cityselect-title:after{content:"";position:absolute;z-index:0;bottom:0;left:0;width:100%;border-bottom:1px solid #b2b2b2;-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}.yd-cityselect-nav{width:100%;padding-left:10px;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.yd-cityselect-nav>a{font-size:13px;color:#222;display:block;height:40px;line-height:46px;padding:0 8px;position:relative;margin-right:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:40%}.yd-cityselect-nav-active{color:#f23030!important}.yd-cityselect-nav-active:after{content:"";width:100%;height:2px;background-color:#f23030;position:absolute;bottom:1px;left:0;z-index:2}.yd-cityselect-content{height:100%;padding-top:85px;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.yd-cityselect-item{display:block;height:inherit;width:50%;-webkit-box-flex:0;-webkit-flex:0 0 50%;-ms-flex:0 0 50%;flex:0 0 50%;overflow-y:auto;-webkit-overflow-scrolling:touch;background-color:#fff}.yd-cityselect-item::-webkit-scrollbar{width:0}.yd-cityselect-item:nth-child(2n){background-color:#f5f5f5}.yd-cityselect-item-active{color:#f23030!important}.yd-cityselect-item-active:after{display:block;content:"\\E600";font-family:YDUI-INLAY}.yd-cityselect-item-box{width:100%;height:inherit;display:block;padding:0 20px}.yd-cityselect-item-box>a{color:#333;font-size:13px;height:40px;line-height:40px;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:100%;position:relative;z-index:1}.yd-cityselect-item-box>a:before{content:"";position:absolute;z-index:0;bottom:0;left:0;width:100%;border-bottom:1px solid #d9d9d9;-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}.yd-cityselect-item-box>a:active{background:none}.yd-cityselect-item-box>a span{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:block;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;word-break:break-all;text-overflow:ellipsis;line-height:16px;max-height:32.2px;font-size:13px}.yd-cityselect-loading{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-size:13px;color:#999}.yd-cityselect-loading svg{width:36px;height:36px}',""])},82:function(t,e,i){i(229);var n=i(1)(i(259),i(178),null,null);t.exports=n.exports},178:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("yd-mask",{ref:"mask",nativeOn:{click:function(e){t.close(e)}},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}}),t._v(" "),i("div",{staticClass:"yd-cityselect",class:t.show?"yd-cityselect-active":""},[i("div",{staticClass:"yd-cityselect-header"},[i("p",{staticClass:"yd-cityselect-title",on:{touchstart:function(t){t.stopPropagation(),t.preventDefault()}}},[t._v(t._s(t.title))]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.ready,expression:"ready"}],staticClass:"yd-cityselect-nav"},t._l(t.columnNum,function(e,n){return i("a",{directives:[{name:"show",rawName:"v-show",value:!!t.nav["txt"+e],expression:"!!nav['txt' + index]"}],key:n,class:e==t.navIndex?"yd-cityselect-nav-active":"",attrs:{href:"javascript:;"},on:{click:function(i){i.stopPropagation(),t.navEvent(e)}}},[t._v(t._s(t.nav["txt"+e]))])}))]),t._v(" "),t.ready?t._e():i("div",{staticClass:"yd-cityselect-loading"},[i("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid"}},[i("path",{attrs:{stroke:"none",d:"M3 50A47 47 0 0 0 97 50A47 49 0 0 1 3 50",fill:"#bababa",transform:"rotate(317.143 50 51)"}},[i("animateTransform",{attrs:{attributeName:"transform",type:"rotate",calcMode:"linear",values:"0 50 51;360 50 51",keyTimes:"0;1",dur:"0.6s",begin:"0s",repeatCount:"indefinite"}})],1)])]),t._v(" "),i("ul",{directives:[{name:"show",rawName:"v-show",value:t.ready,expression:"ready"}],staticClass:"yd-cityselect-content",class:t.activeClasses},t._l(t.columnNum,function(e,n){return i("li",{key:n,ref:"itemBox"+e,refInFor:!0,staticClass:"yd-cityselect-item"},[t.columns["columnItems"+e].length>0?[i("div",{staticClass:"yd-cityselect-item-box"},t._l(t.columns["columnItems"+e],function(n,o){return i("a",{key:o,class:t.currentClass(n.v,n.n,e),attrs:{href:"javascript:;"},on:{click:function(i){i.stopPropagation(),t.itemEvent(e,n.n,n.v,n.c)}}},[i("span",[t._v(t._s(n.n))])])}))]:[i("div",{staticClass:"yd-cityselect-item-box",on:{touchstart:function(t){t.stopPropagation(),t.preventDefault()}}})]],2)}))])],1)},staticRenderFns:[]}},229:function(t,e,i){var n=i(55);"string"==typeof n&&(n=[[t.id,n,""]]),n.locals&&(t.exports=n.locals);i(3)("765f6578",n,!0)},259:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=i(5),s=i(9),a=n(s);e.default={name:"yd-cityselect",components:{"yd-mask":a.default},data:function(){return{show:this.value,navIndex:1,nav:{txt1:this.chooseTitle,txt2:"",txt3:""},columns:{columnItems1:[],columnItems2:[],columnItems3:[]},active:{},activeClasses:"",itemHeight:40,columnNum:1}},props:{ready:{type:Boolean,default:!0},provance:String,city:String,area:String,done:Function,callback:Function,title:{type:String,default:"所在地区"},chooseTitle:{type:String,default:"请选择"},value:{type:Boolean,default:!1},items:{type:Array,required:!0}},watch:{value:function(t){o.isIOS&&(t?o.pageScroll.lock(this.$refs.mask.$el):o.pageScroll.unlock(this.$refs.mask.$el)),this.show=t},ready:function(t){t&&this.init()}},methods:{init:function(){var t=this;this.ready&&this.items&&this.items[0]&&this.isArray(this.items)&&(this.getColumsNum(this.items[0]),this.columns.columnItems1=this.items,this.provance&&this.$nextTick(function(){t.setDefalutValue(t.items,"provance",1)}),this.$on("ydui.cityselect.reset",function(){for(var e=1;e<=t.columnNum;e++)t.active["itemValue"+e]="",t.active["itemName"+e]="",e-1===0?(t.navIndex=e,t.nav["txt"+e]=t.chooseTitle,t.$refs["itemBox"+e][0].scrollTop=0,t.backoffView(!1)):(t.nav["txt"+e]="",t.columns["columnItems"+e]=[]),e===t.columnNum&&t.returnValue()}))},navEvent:function(t){this.columnNum>2&&(t>=this.columnNum?this.forwardView(!0):this.backoffView(!0)),this.navIndex=t},itemEvent:function(t,e,i,n){if(this.active["itemValue"+t]=i,this.active["itemName"+t]=e,this.nav["txt"+t]=e,this.columns["columnItems"+(t+1)]=n,t>1&&n&&n.length>0&&this.columnNum>2&&this.forwardView(!0),this.clearNavTxt(t),t===this.columnNum||n.length<=0){if(t!==this.columnNum)for(var o=this.columnNum;o>=0;o--)o>t&&(this.active["itemValue"+o]="",this.active["itemName"+o]="",this.nav["txt"+o]="");this.navIndex=t,this.returnValue()}else this.navIndex=t+1,this.nav["txt"+(t+1)]=this.chooseTitle},currentClass:function(t,e,i){return t&&t==this.active["itemValue"+i]||e&&e===this.active["itemName"+i]?"yd-cityselect-item-active":""},clearNavTxt:function(t){for(var e=0;e<this.columnNum;e++)e>t&&(this.nav["txt"+(e+1)]="")},getColumsNum:function(t){this.isArray(t.c)&&(this.columnNum++,this.getColumsNum(t.c[0]))},isArray:function(t){return t&&t.constructor===Array&&t.length>0},setDefalutValue:function(t,e,i){var n=this;t.every(function(t,o){if(t.v==n[e]||t.n===n[e]){var s=n.columns["columnItems"+(i+1)]=t.c,a=n.$refs["itemBox"+i][0];return a.scrollTop=o*n.itemHeight-a.offsetHeight/3,n.active["itemValue"+i]=t.v,n.active["itemName"+i]=t.n,n.nav["txt"+i]=t.n,n.navIndex=i,++i,i>=n.columnNum&&n.columnNum>2&&n.forwardView(!1),n.isArray(s)&&n.setDefalutValue(s,["","provance","city","area"][i],i),!1}return!0})},returnValue:function(){this.done&&(this.done(this.active),console.warn('From VUE-YDUI: The parameter "done" is destroyed, please use "callback".')),this.callback&&this.callback(this.active),this.close()},close:function(){this.$emit("input",!1),this.show=!1},backoffView:function(t){this.activeClasses=(t?"yd-cityselect-move-animate":"")+" yd-cityselect-prev"},forwardView:function(t){this.activeClasses=(t?"yd-cityselect-move-animate":"")+" yd-cityselect-next"}},mounted:function(){this.init()},destroyed:function(){this.close()}}}})});

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

/*! vue-ydui v1.2.0 by YDCSS (c) 2018 Licensed MIT */
!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ydui=t():e.ydui=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="/dist/",t(0)}({0:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.TextArea=void 0;var o=n(136),a=r(o);t.TextArea=a.default},1:function(e,t){e.exports=function(e,t,n,r){var o,a=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(o=e,a=e.default);var i="function"==typeof a?a.options:a;if(t&&(i.render=t.render,i.staticRenderFns=t.staticRenderFns),n&&(i._scopeId=n),r){var u=i.computed||(i.computed={});Object.keys(r).forEach(function(e){var t=r[e];u[e]=function(){return t}})}return{esModule:o,exports:a,options:i}}},2:function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},3:function(e,t,n){function r(e){for(var t=0;t<e.length;t++){var n=e[t],r=d[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(a(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var s=[],o=0;o<n.parts.length;o++)s.push(a(n.parts[o]));d[n.id]={id:n.id,refs:1,parts:s}}}}function o(){var e=document.createElement("style");return e.type="text/css",c.appendChild(e),e}function a(e){var t,n,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(r){if(h)return v;r.parentNode.removeChild(r)}if(m){var a=f++;r=p||(p=o()),t=s.bind(null,r,a,!1),n=s.bind(null,r,a,!0)}else r=o(),t=i.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}function s(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=g(t,o);else{var a=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(a,s[t]):e.appendChild(a)}}function i(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document,l=n(4),d={},c=u&&(document.head||document.getElementsByTagName("head")[0]),p=null,f=0,h=!1,v=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){h=n;var o=l(e,t);return r(o),function(t){for(var n=[],a=0;a<o.length;a++){var s=o[a],i=d[s.id];i.refs--,n.push(i)}t?(o=l(e,t),r(o)):o=[];for(var a=0;a<n.length;a++){var i=n[a];if(0===i.refs){for(var u=0;u<i.parts.length;u++)i.parts[u]();delete d[i.id]}}}};var g=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},4:function(e,t){e.exports=function(e,t){for(var n=[],r={},o=0;o<t.length;o++){var a=t[o],s=a[0],i=a[1],u=a[2],l=a[3],d={id:e+":"+o,css:i,media:u,sourceMap:l};r[s]?r[s].parts.push(d):n.push(r[s]={id:s,parts:[d]})}return n}},40:function(e,t,n){t=e.exports=n(2)(),t.push([e.id,".yd-textarea{padding:10px 0;background-color:#fff;width:100%}.yd-textarea>textarea{border:none;width:100%;display:block;height:75px;font-size:15px;color:inherit;background-color:transparent}.yd-textarea-readonly{opacity:.3}.yd-textarea-counter{font-size:16px;color:#b2b2b2;text-align:right;padding-top:3px}",""])},136:function(e,t,n){n(214);var r=n(1)(n(312),n(146),null,null);e.exports=r.exports},146:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"yd-textarea",class:e.readonly?"yd-textarea-readonly":""},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.mlstr,expression:"mlstr"}],attrs:{placeholder:e.placeholder,maxlength:e.maxlength,readonly:e.readonly},domProps:{value:e.mlstr},on:{input:function(t){t.target.composing||(e.mlstr=t.target.value)}}}),e._v(" "),e.showCounter&&e.maxlength?n("div",{staticClass:"yd-textarea-counter"},[e._v(e._s(e.num)+"/"+e._s(e.maxlength))]):e._e()])},staticRenderFns:[]}},214:function(e,t,n){var r=n(40);"string"==typeof r&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals);n(3)("27f85e24",r,!0)},312:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"yd-textarea",data:function(){return{num:0,mlstr:""}},props:{maxlength:{validator:function(e){return!e||/^(([1-9]\d*)|0)$/.test(e)}},placeholder:{type:String},readonly:{type:Boolean,default:!1},value:{type:String},showCounter:{type:Boolean,default:!0},change:{type:Function},callback:{type:Function}},watch:{mlstr:function(e){this.$emit("input",e),this.change&&(this.change(),console.warn('From VUE-YDUI: The parameter "change" is destroyed, please use "callback".')),this.callback&&this.change(),this.showCounter&&(this.num=e.length)},value:function(e){this.mlstr=e}},mounted:function(){var e=this;this.$nextTick(function(){var t=e.value;t&&(e.mlstr=t.length>e.maxlength?t.substr(t,e.maxlength):t)})}}}})});

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* ydui-district v1.1.0 by YDCSS (c) 2017 Licensed ISC */
!function(){var district=[{"v":"1","n":"北京","c":[{"v":"2816","n":"密云区","c":[{"v":"6667","n":"城区"},{"v":"2862","n":"城区以外"}]},{"v":"72","n":"朝阳区","c":[{"v":"2819","n":"三环到四环之间"},{"v":"2839","n":"四环到五环之间"},{"v":"2840","n":"五环到六环之间"},{"v":"4137","n":"管庄"},{"v":"4139","n":"北苑"},{"v":"4211","n":"定福庄"},{"v":"2799","n":"三环以内"}]},{"v":"2901","n":"昌平区","c":[{"v":"4135","n":"六环以内"},{"v":"4136","n":"城区"},{"v":"2906","n":"城区以外"}]},{"v":"2953","n":"平谷区","c":[{"v":"6666","n":"城区"},{"v":"2954","n":"城区以外"}]},{"v":"2800","n":"海淀区","c":[{"v":"2848","n":"三环以内"},{"v":"2849","n":"三环到四环之间"},{"v":"2850","n":"四环到五环之间"},{"v":"2851","n":"五环到六环之间"},{"v":"2852","n":"六环以外"},{"v":"4134","n":"西三旗"},{"v":"4209","n":"西二旗"}]},{"v":"2801","n":"西城区","c":[{"v":"2827","n":"内环到二环里"},{"v":"2853","n":"二环到三环"}]},{"v":"2802","n":"东城区","c":[{"v":"2821","n":"内环到三环里"}]},{"v":"2803","n":"崇文区","c":[{"v":"2829","n":"一环到二环"},{"v":"2842","n":"二环到三环"}]},{"v":"2804","n":"宣武区","c":[{"v":"2828","n":"内环到三环里"}]},{"v":"2805","n":"丰台区","c":[{"v":"2832","n":"四环到五环之间"},{"v":"2854","n":"二环到三环"},{"v":"2855","n":"三环到四环之间"},{"v":"34544","n":"五环到六环之间"},{"v":"34545","n":"六环之外"}]},{"v":"2806","n":"石景山区","c":[{"v":"2831","n":"四环到五环内"},{"v":"4187","n":"石景山城区"},{"v":"4188","n":"八大处科技园区"}]},{"v":"2807","n":"门头沟","c":[{"v":"51552","n":"城区"},{"v":"51553","n":"龙泉镇"},{"v":"51554","n":"永定镇"},{"v":"51555","n":"大台镇"},{"v":"51556","n":"潭柘寺镇"},{"v":"51557","n":"王平镇"},{"v":"51558","n":"军庄镇"},{"v":"51559","n":"妙峰山镇"},{"v":"51560","n":"雁翅镇"},{"v":"51561","n":"斋堂镇"},{"v":"51562","n":"清水镇"}]},{"v":"2808","n":"房山区","c":[{"v":"51529","n":"大安山乡"},{"v":"51530","n":"大石窝镇"},{"v":"51531","n":"窦店镇"},{"v":"51532","n":"佛子庄乡"},{"v":"51534","n":"韩村河镇"},{"v":"51535","n":"河北镇"},{"v":"51536","n":"良乡镇"},{"v":"51537","n":"琉璃河镇"},{"v":"51538","n":"南窖乡"},{"v":"51539","n":"蒲洼乡"},{"v":"51540","n":"青龙湖镇"},{"v":"51541","n":"十渡镇"},{"v":"51542","n":"石楼镇"},{"v":"51543","n":"史家营乡"},{"v":"51544","n":"霞云岭乡"},{"v":"51545","n":"新镇"},{"v":"51546","n":"阎村镇"},{"v":"51547","n":"燕山地区"},{"v":"51548","n":"张坊镇"},{"v":"51549","n":"长沟镇"},{"v":"51550","n":"长阳镇"},{"v":"51551","n":"周口店镇"},{"v":"51528","n":"城区"}]},{"v":"2809","n":"通州区","c":[{"v":"51216","n":"六环内（马驹桥镇）"},{"v":"51228","n":"中仓街道"},{"v":"51229","n":"新华街道"},{"v":"51230","n":"玉桥街道"},{"v":"51231","n":"北苑街道"},{"v":"51217","n":"六环外（马驹桥镇）"},{"v":"51218","n":"永顺镇"},{"v":"51219","n":"梨园镇"},{"v":"51220","n":"宋庄镇"},{"v":"51221","n":"漷县镇"},{"v":"51222","n":"张家湾镇"},{"v":"51223","n":"西集镇"},{"v":"51224","n":"永乐店镇"},{"v":"51225","n":"潞城镇"},{"v":"51226","n":"台湖镇"},{"v":"51227","n":"于家务乡"},{"v":"51232","n":"次渠镇"}]},{"v":"3065","n":"延庆县","c":[{"v":"51505","n":"延庆镇"},{"v":"51506","n":"城区"},{"v":"51507","n":"康庄镇"},{"v":"51508","n":"八达岭镇"},{"v":"51509","n":"永宁镇"},{"v":"51510","n":"旧县镇"},{"v":"51511","n":"张山营镇"},{"v":"51512","n":"四海镇"},{"v":"51513","n":"千家店镇"},{"v":"51514","n":"沈家营镇"},{"v":"51515","n":"大榆树镇"},{"v":"51516","n":"井庄镇"},{"v":"51517","n":"大庄科乡"},{"v":"51518","n":"刘斌堡乡"},{"v":"51519","n":"香营乡"},{"v":"51520","n":"珍珠泉乡"}]},{"v":"2810","n":"大兴区","c":[{"v":"4194","n":"四环至五环之间"},{"v":"6501","n":"五环至六环之间"},{"v":"4205","n":"六环以外"},{"v":"51081","n":"亦庄经济开发区"}]},{"v":"2812","n":"顺义区","c":[{"v":"51125","n":"北石槽镇"},{"v":"51126","n":"北务镇"},{"v":"51127","n":"北小营镇"},{"v":"51128","n":"大孙各庄镇"},{"v":"51129","n":"高丽营镇"},{"v":"51130","n":"光明街道"},{"v":"51131","n":"后沙峪地区"},{"v":"51132","n":"空港街道"},{"v":"51133","n":"李桥镇"},{"v":"51134","n":"李遂镇"},{"v":"51135","n":"龙湾屯镇"},{"v":"51136","n":"马坡地区"},{"v":"51137","n":"木林镇"},{"v":"51138","n":"南彩镇"},{"v":"51139","n":"南法信地区"},{"v":"51140","n":"牛栏山地区"},{"v":"51141","n":"仁和地区"},{"v":"51142","n":"胜利街道"},{"v":"51143","n":"石园街道"},{"v":"51144","n":"双丰街道"},{"v":"51145","n":"天竺地区"},{"v":"51146","n":"旺泉街道"},{"v":"51147","n":"杨镇地区"},{"v":"51148","n":"张镇"},{"v":"51149","n":"赵全营镇"}]},{"v":"2814","n":"怀柔区","c":[{"v":"6115","n":"城区以内"},{"v":"2847","n":"郊区"}]}]},{"v":"2","n":"上海","c":[{"v":"2817","n":"静安区","c":[{"v":"51973","n":"城区"}]},{"v":"2820","n":"闸北区","c":[{"v":"51972","n":"城区"}]},{"v":"2822","n":"虹口区","c":[{"v":"51979","n":"城区"}]},{"v":"2823","n":"杨浦区","c":[{"v":"51974","n":"城区"}]},{"v":"2824","n":"宝山区","c":[{"v":"51911","n":"罗店镇"},{"v":"51921","n":"城区"},{"v":"51912","n":"大场镇"},{"v":"51913","n":"杨行镇"},{"v":"51914","n":"月浦镇"},{"v":"51915","n":"罗泾镇"},{"v":"51916","n":"顾村镇"},{"v":"51917","n":"高境镇"},{"v":"51918","n":"庙行镇"},{"v":"51919","n":"淞南镇"},{"v":"51920","n":"宝山城市工业园区"}]},{"v":"2825","n":"闵行区","c":[{"v":"51931","n":"城区"},{"v":"51932","n":"莘庄镇"},{"v":"51933","n":"七宝镇"},{"v":"51934","n":"浦江镇"},{"v":"51935","n":"梅陇镇"},{"v":"51936","n":"虹桥镇"},{"v":"51937","n":"马桥镇"},{"v":"51938","n":"吴泾镇"},{"v":"51939","n":"华漕镇"},{"v":"51940","n":"颛桥镇"}]},{"v":"2826","n":"嘉定区","c":[{"v":"51941","n":"城区"},{"v":"51942","n":"南翔镇"},{"v":"51943","n":"马陆镇"},{"v":"51944","n":"华亭镇"},{"v":"51945","n":"江桥镇"},{"v":"51946","n":"菊园新区"},{"v":"51947","n":"安亭镇"},{"v":"51948","n":"徐行镇"},{"v":"51949","n":"外冈镇"},{"v":"51950","n":"嘉定工业区"}]},{"v":"2830","n":"浦东新区","c":[{"v":"51800","n":"城区"},{"v":"51801","n":"川沙新镇"},{"v":"51822","n":"祝桥镇"},{"v":"51823","n":"新场镇"},{"v":"51802","n":"高桥镇"},{"v":"51824","n":"惠南镇"},{"v":"51803","n":"北蔡镇"},{"v":"51804","n":"合庆镇"},{"v":"51805","n":"唐镇"},{"v":"51806","n":"曹路镇"},{"v":"51807","n":"金桥镇"},{"v":"51808","n":"高行镇"},{"v":"51809","n":"高东镇"},{"v":"51810","n":"张江镇"},{"v":"51811","n":"三林镇"},{"v":"51812","n":"南汇新城镇"},{"v":"51825","n":"康桥镇"},{"v":"51826","n":"宣桥镇"},{"v":"51827","n":"书院镇"},{"v":"51828","n":"大团镇"},{"v":"51829","n":"周浦镇"},{"v":"51830","n":"芦潮港镇"},{"v":"51831","n":"泥城镇"},{"v":"51832","n":"航头镇"},{"v":"51833","n":"万祥镇"},{"v":"51834","n":"老港镇"}]},{"v":"2833","n":"青浦区","c":[{"v":"51959","n":"城区"},{"v":"51952","n":"赵巷镇"},{"v":"51953","n":"徐泾镇"},{"v":"51954","n":"华新镇"},{"v":"51955","n":"重固镇"},{"v":"51956","n":"白鹤镇"},{"v":"51957","n":"练塘镇"},{"v":"51958","n":"金泽镇"},{"v":"51951","n":"朱家角镇"}]},{"v":"2834","n":"松江区","c":[{"v":"51982","n":"城区"},{"v":"51983","n":"泗泾镇"},{"v":"51984","n":"佘山镇"},{"v":"51985","n":"车墩镇"},{"v":"51986","n":"新桥镇"},{"v":"51987","n":"洞泾镇"},{"v":"51988","n":"九亭镇"},{"v":"51989","n":"泖港镇"},{"v":"51990","n":"石湖荡镇"},{"v":"51991","n":"新浜镇"},{"v":"51992","n":"叶榭镇"},{"v":"51993","n":"小昆山镇"}]},{"v":"2835","n":"金山区","c":[{"v":"51960","n":"城区"},{"v":"51961","n":"金山工业区"},{"v":"51962","n":"朱泾镇"},{"v":"51963","n":"枫泾镇"},{"v":"51964","n":"张堰镇"},{"v":"51965","n":"亭林镇"},{"v":"51966","n":"吕巷镇"},{"v":"51967","n":"廊下镇"},{"v":"51968","n":"金山卫镇"},{"v":"51970","n":"漕泾镇"},{"v":"51971","n":"山阳镇"}]},{"v":"2837","n":"奉贤区","c":[{"v":"51928","n":"南桥镇"},{"v":"51929","n":"奉城镇"},{"v":"51930","n":"四团镇"},{"v":"51994","n":"柘林镇"},{"v":"51995","n":"庄行镇"},{"v":"51996","n":"金汇镇"},{"v":"51997","n":"青村镇"},{"v":"51998","n":"海湾镇"}]},{"v":"2841","n":"普陀区","c":[{"v":"51980","n":"城区"}]},{"v":"78","n":"黄浦区","c":[{"v":"51978","n":"城区"}]},{"v":"2919","n":"崇明县","c":[{"v":"50779","n":"堡镇"},{"v":"50780","n":"庙镇"},{"v":"50781","n":"陈家镇"},{"v":"50782","n":"城桥镇"},{"v":"50783","n":"东平镇"},{"v":"50784","n":"港西镇"},{"v":"50785","n":"港沿镇"},{"v":"50786","n":"建设镇"},{"v":"50787","n":"绿华镇"},{"v":"50788","n":"三星镇"},{"v":"50789","n":"竖新镇"},{"v":"50790","n":"向化镇"},{"v":"50791","n":"新海镇"},{"v":"50792","n":"新河镇"},{"v":"50793","n":"中兴镇"},{"v":"50794","n":"长兴乡"},{"v":"50795","n":"横沙乡"},{"v":"50796","n":"新村乡"}]},{"v":"2813","n":"徐汇区","c":[{"v":"51976","n":"城区"}]},{"v":"2815","n":"长宁区","c":[{"v":"51975","n":"城区"}]}]},{"v":"3","n":"天津","c":[{"v":"51035","n":"东丽区","c":[{"v":"39620","n":"全境"}]},{"v":"51036","n":"和平区","c":[{"v":"2984","n":"全境"}]},{"v":"51037","n":"河北区","c":[{"v":"2987","n":"全境"}]},{"v":"51038","n":"河东区","c":[{"v":"3000","n":"全境"}]},{"v":"51039","n":"河西区","c":[{"v":"2985","n":"全境"}]},{"v":"51040","n":"红桥区","c":[{"v":"2986","n":"全境"}]},{"v":"51041","n":"蓟县","c":[{"v":"98","n":"全境"}]},{"v":"51042","n":"静海县","c":[{"v":"36157","n":"全境"}]},{"v":"51043","n":"南开区","c":[{"v":"2907","n":"全境"}]},{"v":"51044","n":"塘沽区","c":[{"v":"25708","n":"全境"}]},{"v":"51045","n":"西青区","c":[{"v":"25712","n":"杨柳青,中北,精武,大寺镇,环外海泰及外环内"},{"v":"25711","n":"其它地区"}]},{"v":"51046","n":"武清区","c":[{"v":"22846","n":"杨村镇、下朱庄内"},{"v":"22847","n":"其它地区"}]},{"v":"51047","n":"津南区","c":[{"v":"36171","n":"双港，辛庄"},{"v":"25704","n":"咸水沽镇、海河教育园，海河科技园"},{"v":"36172","n":"其他地区"}]},{"v":"51048","n":"汉沽区","c":[{"v":"23672","n":"汉沽区街里、汉沽开发区"},{"v":"23673","n":"其它地区"}]},{"v":"51049","n":"大港区","c":[{"v":"8545","n":"大港油田"},{"v":"8546","n":"主城区内"},{"v":"8547","n":"主城区外"}]},{"v":"51050","n":"北辰区","c":[{"v":"36167","n":"外环外双街镇，河北工大新校，屈店工业园"},{"v":"6646","n":"外环内"},{"v":"36168","n":"外环外其它地区"}]},{"v":"51051","n":"宝坻区","c":[{"v":"22848","n":"城关镇、马家店开发区、天宝工业园"},{"v":"22849","n":"其它地区"}]},{"v":"51052","n":"宁河县","c":[{"v":"23674","n":"芦台镇、经济开发区、贸易开发区"},{"v":"23675","n":"其它地区"}]}]},{"v":"4","n":"重庆","c":[{"v":"48131","n":"璧山县","c":[{"v":"48185","n":"县城内"},{"v":"48188","n":"青杠镇"},{"v":"48189","n":"来凤镇"},{"v":"48190","n":"丁家镇"},{"v":"48191","n":"大路镇"},{"v":"48192","n":"八塘镇"},{"v":"48193","n":"七塘镇"},{"v":"48194","n":"河边镇"},{"v":"48195","n":"福禄镇"},{"v":"48196","n":"大兴镇"},{"v":"48197","n":"正兴镇"},{"v":"48198","n":"广普镇"},{"v":"48199","n":"三合镇"},{"v":"48200","n":"健龙镇"}]},{"v":"48132","n":"荣昌县","c":[{"v":"48163","n":"县城内"},{"v":"48166","n":"广顺镇"},{"v":"48167","n":"安富镇"},{"v":"48168","n":"峰高镇"},{"v":"48169","n":"双河镇"},{"v":"48170","n":"直升镇"},{"v":"48171","n":"路孔镇"},{"v":"48172","n":"清江镇"},{"v":"48173","n":"仁义镇"},{"v":"48174","n":"河包镇"},{"v":"48175","n":"古昌镇"},{"v":"48176","n":"吴家镇"},{"v":"48177","n":"观胜镇"},{"v":"48178","n":"铜鼓镇"},{"v":"48179","n":"清流镇"},{"v":"48180","n":"盘龙镇"},{"v":"48181","n":"远觉镇"},{"v":"48182","n":"清升镇"},{"v":"48183","n":"荣隆镇"},{"v":"48184","n":"龙集镇"}]},{"v":"48133","n":"铜梁县","c":[{"v":"48134","n":"县城内"},{"v":"48138","n":"土桥镇"},{"v":"48139","n":"二坪镇"},{"v":"48140","n":"水口镇"},{"v":"48141","n":"安居镇"},{"v":"48142","n":"白羊镇"},{"v":"48143","n":"平滩镇"},{"v":"48144","n":"石鱼镇"},{"v":"48145","n":"福果镇"},{"v":"48146","n":"维新镇"},{"v":"48147","n":"高楼镇"},{"v":"48148","n":"大庙镇"},{"v":"48149","n":"围龙镇"},{"v":"48150","n":"华兴镇"},{"v":"48151","n":"永嘉镇"},{"v":"48152","n":"安溪镇"},{"v":"48153","n":"西河镇"},{"v":"48154","n":"太平镇"},{"v":"48155","n":"旧县镇"},{"v":"48156","n":"虎峰镇"},{"v":"48157","n":"少云镇"},{"v":"48158","n":"蒲吕镇"},{"v":"48159","n":"侣俸镇"},{"v":"48160","n":"小林乡"},{"v":"48161","n":"双山乡"},{"v":"48162","n":"庆隆乡"}]},{"v":"50950","n":"江北区","c":[{"v":"88","n":"内环以内"},{"v":"50957","n":"寸滩镇"},{"v":"50958","n":"郭家沱镇"},{"v":"50959","n":"铁山坪镇"},{"v":"50960","n":"鱼嘴镇"},{"v":"50961","n":"复盛镇"},{"v":"50962","n":"五宝镇"},{"v":"51198","n":"大石坝镇"}]},{"v":"50951","n":"南岸区","c":[{"v":"52496","n":"城区"},{"v":"4298","n":"内环以内"},{"v":"50963","n":"茶园新区"},{"v":"50964","n":"鸡冠石镇"},{"v":"50965","n":"长生桥镇"},{"v":"50966","n":"峡口镇"},{"v":"50967","n":"广阳镇"},{"v":"50968","n":"迎龙镇"}]},{"v":"50952","n":"九龙坡区","c":[{"v":"106","n":"内环以内"},{"v":"50969","n":"白市驿镇"},{"v":"50970","n":"铜罐驿镇"},{"v":"50971","n":"华岩镇"},{"v":"50972","n":"巴福镇"},{"v":"50973","n":"含谷镇"},{"v":"50974","n":"金凤镇"},{"v":"50975","n":"石板镇"},{"v":"50976","n":"陶家镇"},{"v":"50977","n":"西彭镇"},{"v":"50978","n":"走马镇"}]},{"v":"50953","n":"沙坪坝区","c":[{"v":"50979","n":"内环以内"},{"v":"50980","n":"陈家桥镇"},{"v":"50981","n":"歌乐山镇"},{"v":"50982","n":"青木关镇"},{"v":"50983","n":"回龙坝镇"},{"v":"50984","n":"大学城"},{"v":"50985","n":"虎溪镇"},{"v":"50986","n":"西永镇"},{"v":"50987","n":"土主镇"},{"v":"50988","n":"井口镇"},{"v":"50989","n":"曾家镇"},{"v":"50990","n":"凤凰镇"},{"v":"50991","n":"中梁镇"}]},{"v":"50954","n":"大渡口区","c":[{"v":"50992","n":"茄子溪镇"},{"v":"50993","n":"建胜镇"},{"v":"50994","n":"跳磴镇"},{"v":"111","n":"内环以内"}]},{"v":"50995","n":"綦江区","c":[{"v":"52497","n":"城区"},{"v":"51000","n":"三江镇"},{"v":"51001","n":"安稳镇"},{"v":"51002","n":"打通镇"},{"v":"51003","n":"丁山镇"},{"v":"51004","n":"东溪镇"},{"v":"51005","n":"扶欢镇"},{"v":"51006","n":"赶水镇"},{"v":"51007","n":"郭扶镇"},{"v":"51008","n":"横山镇"},{"v":"51009","n":"隆盛镇"},{"v":"51010","n":"三角镇"},{"v":"51011","n":"石壕镇"},{"v":"51012","n":"石角镇"},{"v":"51013","n":"新盛镇"},{"v":"51014","n":"永城镇"},{"v":"51015","n":"永新镇"},{"v":"51016","n":"中峰镇"},{"v":"51017","n":"篆塘镇"},{"v":"51018","n":"丛林镇"},{"v":"51019","n":"关坝镇"},{"v":"51020","n":"黑山镇"},{"v":"51021","n":"金桥镇"},{"v":"51022","n":"南桐镇"},{"v":"51023","n":"青年镇"},{"v":"51024","n":"石林镇"},{"v":"51025","n":"万东镇"}]},{"v":"48201","n":"合川区","c":[{"v":"52489","n":"城区"},{"v":"48298","n":"草街镇"},{"v":"48299","n":"盐井镇"},{"v":"48300","n":"云门镇"},{"v":"48301","n":"大石镇"},{"v":"48302","n":"沙鱼镇"},{"v":"48303","n":"官渡镇"},{"v":"48304","n":"涞滩镇"},{"v":"48305","n":"肖家镇"},{"v":"48306","n":"古楼镇"},{"v":"48307","n":"三庙镇"},{"v":"48308","n":"二郎镇"},{"v":"48309","n":"龙凤镇"},{"v":"48310","n":"隆兴镇"},{"v":"48311","n":"铜溪镇"},{"v":"48312","n":"双凤镇"},{"v":"48313","n":"狮滩镇"},{"v":"48314","n":"清平镇"},{"v":"48315","n":"土场镇"},{"v":"48316","n":"小沔镇"},{"v":"48317","n":"三汇镇"},{"v":"48318","n":"香龙镇"},{"v":"48319","n":"钱塘镇"},{"v":"48320","n":"龙市镇"},{"v":"48321","n":"燕窝镇"},{"v":"48322","n":"太和镇"},{"v":"48323","n":"渭沱镇"},{"v":"48324","n":"双槐镇"}]},{"v":"48202","n":"巴南区","c":[{"v":"52490","n":"城区"},{"v":"48355","n":"南泉镇"},{"v":"48356","n":"一品镇"},{"v":"48357","n":"南彭镇"},{"v":"48358","n":"惠民镇"},{"v":"48359","n":"麻柳嘴镇"},{"v":"48360","n":"天星寺镇"},{"v":"48361","n":"双河口镇"},{"v":"48362","n":"界石镇"},{"v":"48363","n":"安澜镇"},{"v":"48364","n":"跳石镇"},{"v":"48365","n":"木洞镇"},{"v":"48366","n":"丰盛镇"},{"v":"48367","n":"二圣镇"},{"v":"48368","n":"东泉镇"},{"v":"48369","n":"姜家镇"},{"v":"48370","n":"接龙镇"},{"v":"48371","n":"石滩镇"},{"v":"48372","n":"石龙镇"}]},{"v":"48203","n":"北碚区","c":[{"v":"52491","n":"城区"},{"v":"48240","n":"东阳镇"},{"v":"48242","n":"蔡家岗镇"},{"v":"48243","n":"童家溪镇"},{"v":"48244","n":"施家梁镇"},{"v":"48245","n":"金刀峡镇"},{"v":"48246","n":"澄江镇"},{"v":"48247","n":"水土镇"},{"v":"48248","n":"歇马镇"},{"v":"48249","n":"天府镇"},{"v":"48250","n":"复兴镇"},{"v":"48251","n":"静观镇"},{"v":"48252","n":"柳荫镇"},{"v":"48253","n":"三圣镇"}]},{"v":"48204","n":"江津区","c":[{"v":"52492","n":"城区"},{"v":"53556","n":"双福镇"},{"v":"48213","n":"四面山镇"},{"v":"48214","n":"支坪镇"},{"v":"48215","n":"白沙镇"},{"v":"48216","n":"珞璜镇"},{"v":"48217","n":"柏林镇"},{"v":"48218","n":"蔡家镇"},{"v":"48219","n":"慈云镇"},{"v":"48220","n":"杜市镇"},{"v":"48221","n":"广兴镇"},{"v":"48222","n":"嘉平镇"},{"v":"48223","n":"贾嗣镇"},{"v":"48224","n":"李市镇"},{"v":"48225","n":"龙华镇"},{"v":"48226","n":"石蟆镇"},{"v":"48227","n":"石门镇"},{"v":"48228","n":"塘河镇"},{"v":"48229","n":"吴滩镇"},{"v":"48230","n":"西湖镇"},{"v":"48231","n":"夏坝镇"},{"v":"48232","n":"先锋镇"},{"v":"48233","n":"永兴镇"},{"v":"48234","n":"油溪镇"},{"v":"48235","n":"中山镇"},{"v":"48236","n":"朱杨镇"}]},{"v":"48205","n":"渝北区","c":[{"v":"52493","n":"城区"},{"v":"48332","n":"礼嘉镇"},{"v":"48337","n":"两路镇"},{"v":"48338","n":"王家镇"},{"v":"48339","n":"悦来镇"},{"v":"48340","n":"玉峰山镇"},{"v":"48341","n":"茨竹镇"},{"v":"48342","n":"大盛镇"},{"v":"48343","n":"大塆镇"},{"v":"48344","n":"古路镇"},{"v":"48345","n":"龙兴镇"},{"v":"48346","n":"洛碛镇"},{"v":"48347","n":"木耳镇"},{"v":"48348","n":"石船镇"},{"v":"48349","n":"统景镇"},{"v":"48350","n":"兴隆镇"}]},{"v":"48206","n":"长寿区","c":[{"v":"52494","n":"城区"},{"v":"48281","n":"长寿湖镇"},{"v":"48282","n":"邻封镇"},{"v":"48283","n":"但渡镇"},{"v":"48284","n":"云集镇"},{"v":"48285","n":"双龙镇"},{"v":"48286","n":"龙河镇"},{"v":"48287","n":"石堰镇"},{"v":"48288","n":"云台镇"},{"v":"48289","n":"海棠镇"},{"v":"48290","n":"葛兰镇"},{"v":"48291","n":"新市镇"},{"v":"48292","n":"八颗镇"},{"v":"48293","n":"洪湖镇"},{"v":"48294","n":"万顺镇"}]},{"v":"48207","n":"永川区","c":[{"v":"52495","n":"城区"},{"v":"48257","n":"双竹镇"},{"v":"48258","n":"三教镇"},{"v":"48259","n":"大安镇"},{"v":"48260","n":"陈食镇"},{"v":"48261","n":"板桥镇"},{"v":"48262","n":"宝峰镇"},{"v":"48263","n":"临江镇"},{"v":"48264","n":"红炉镇"},{"v":"48265","n":"吉安镇"},{"v":"48266","n":"金龙镇"},{"v":"48267","n":"来苏镇"},{"v":"48268","n":"青峰镇"},{"v":"48270","n":"双石镇"},{"v":"48271","n":"松溉镇"},{"v":"48272","n":"五间镇"},{"v":"48273","n":"仙龙镇"},{"v":"48274","n":"永荣镇"},{"v":"48275","n":"朱沱镇"},{"v":"48276","n":"何埂镇"}]},{"v":"51026","n":"渝中区","c":[{"v":"103","n":"全境"}]},{"v":"51027","n":"高新区","c":[{"v":"50956","n":"全境"}]},{"v":"51028","n":"北部新区","c":[{"v":"50955","n":"全境"}]},{"v":"126","n":"大足区","c":[{"v":"52487","n":"城区"},{"v":"13520","n":"龙滩子镇"},{"v":"13521","n":"龙水镇"},{"v":"13522","n":"智凤镇"},{"v":"13523","n":"宝顶镇"},{"v":"13524","n":"中敖镇"},{"v":"13525","n":"三驱镇"},{"v":"13526","n":"宝兴镇"},{"v":"13527","n":"玉龙镇"},{"v":"13528","n":"石马镇"},{"v":"13529","n":"拾万镇"},{"v":"13530","n":"回龙镇"},{"v":"13531","n":"金山镇"},{"v":"13532","n":"万古镇"},{"v":"13533","n":"国梁镇"},{"v":"13534","n":"雍溪镇"},{"v":"13535","n":"珠溪镇"},{"v":"13536","n":"龙石镇"},{"v":"13537","n":"邮亭镇"},{"v":"13538","n":"铁山镇"},{"v":"13539","n":"高升镇"},{"v":"13540","n":"季家镇"},{"v":"13541","n":"古龙镇"},{"v":"13542","n":"高坪镇"},{"v":"13543","n":"双路镇"},{"v":"13544","n":"通桥镇"}]},{"v":"113","n":"万州区","c":[{"v":"52484","n":"城区"},{"v":"9786","n":"白土镇"},{"v":"9787","n":"白羊镇"},{"v":"9788","n":"大周镇"},{"v":"9789","n":"弹子镇"},{"v":"9790","n":"分水镇"},{"v":"9791","n":"甘宁镇"},{"v":"9792","n":"高峰镇"},{"v":"9793","n":"高梁镇"},{"v":"9794","n":"后山镇"},{"v":"9795","n":"李河镇"},{"v":"9796","n":"龙驹镇"},{"v":"9797","n":"龙沙镇"},{"v":"9798","n":"罗田镇"},{"v":"9799","n":"孙家镇"},{"v":"9800","n":"太安镇"},{"v":"9801","n":"太龙镇"},{"v":"9802","n":"天城镇"},{"v":"9803","n":"武陵镇"},{"v":"9804","n":"响水镇"},{"v":"9805","n":"小周镇"},{"v":"9806","n":"新田镇"},{"v":"9807","n":"新乡镇"},{"v":"9808","n":"熊家镇"},{"v":"9809","n":"余家镇"},{"v":"9810","n":"长岭镇"},{"v":"9811","n":"长坪镇"},{"v":"9812","n":"长滩镇"},{"v":"9813","n":"走马镇"},{"v":"9814","n":"瀼渡镇"},{"v":"9815","n":"茨竹乡"},{"v":"9816","n":"柱山乡"},{"v":"9817","n":"燕山乡"},{"v":"9818","n":"溪口乡"},{"v":"9819","n":"普子乡"},{"v":"9820","n":"地宝乡"},{"v":"9821","n":"铁峰乡"},{"v":"9822","n":"黄柏乡"},{"v":"9823","n":"九池乡"},{"v":"9824","n":"梨树乡"},{"v":"9825","n":"郭村乡"},{"v":"9826","n":"恒合乡"}]},{"v":"114","n":"涪陵区","c":[{"v":"52485","n":"城区"},{"v":"9898","n":"李渡镇"},{"v":"9899","n":"白涛镇"},{"v":"9900","n":"百胜镇"},{"v":"9901","n":"堡子镇"},{"v":"9902","n":"焦石镇"},{"v":"9903","n":"蔺市镇"},{"v":"9904","n":"龙桥镇"},{"v":"9905","n":"龙潭镇"},{"v":"9906","n":"马武镇"},{"v":"9907","n":"南沱镇"},{"v":"9908","n":"青羊镇"},{"v":"9909","n":"清溪镇"},{"v":"9910","n":"石沱镇"},{"v":"9911","n":"新妙镇"},{"v":"9912","n":"义和镇"},{"v":"9913","n":"增福乡"},{"v":"9914","n":"珍溪镇"},{"v":"9915","n":"镇安镇"},{"v":"9916","n":"致韩镇"},{"v":"9917","n":"土地坡乡"},{"v":"9918","n":"武陵山乡"},{"v":"9919","n":"中峰乡"},{"v":"9920","n":"梓里乡"},{"v":"9921","n":"丛林乡"},{"v":"9922","n":"大木乡"},{"v":"9923","n":"惠民乡"},{"v":"9924","n":"酒店乡"},{"v":"9925","n":"聚宝乡"},{"v":"9926","n":"卷洞乡"},{"v":"9927","n":"两汇乡"},{"v":"9928","n":"罗云乡"},{"v":"9929","n":"明家乡"},{"v":"9930","n":"仁义乡"},{"v":"9931","n":"山窝乡"},{"v":"9932","n":"石和乡"},{"v":"9933","n":"石龙乡"},{"v":"9934","n":"太和乡"},{"v":"9935","n":"天台乡"},{"v":"9936","n":"同乐乡"},{"v":"9937","n":"新村乡"}]},{"v":"115","n":"梁平县","c":[{"v":"39680","n":"县城内"},{"v":"9938","n":"梁山镇"},{"v":"9939","n":"柏家镇"},{"v":"9940","n":"碧山镇"},{"v":"9941","n":"大观镇"},{"v":"9942","n":"福禄镇"},{"v":"9943","n":"合兴镇"},{"v":"9944","n":"和林镇"},{"v":"9945","n":"虎城镇"},{"v":"9946","n":"回龙镇"},{"v":"9947","n":"金带镇"},{"v":"9948","n":"聚奎镇"},{"v":"9949","n":"礼让镇"},{"v":"9950","n":"龙门镇"},{"v":"9951","n":"明达镇"},{"v":"9952","n":"蟠龙镇"},{"v":"9953","n":"屏锦镇"},{"v":"9954","n":"仁贤镇"},{"v":"9955","n":"石安镇"},{"v":"9956","n":"文化镇"},{"v":"9957","n":"新盛镇"},{"v":"9958","n":"荫平镇"},{"v":"9959","n":"袁驿镇"},{"v":"9960","n":"云龙镇"},{"v":"9961","n":"竹山镇"},{"v":"9962","n":"安胜乡"},{"v":"9963","n":"铁门乡"},{"v":"9964","n":"紫照乡"},{"v":"9965","n":"曲水乡"},{"v":"9966","n":"龙胜乡"},{"v":"9967","n":"城北乡"},{"v":"9968","n":"城东乡"},{"v":"9969","n":"复平乡"}]},{"v":"119","n":"南川区","c":[{"v":"52486","n":"城区"},{"v":"9984","n":"头渡镇"},{"v":"9985","n":"兴隆镇"},{"v":"9986","n":"冷水关乡"},{"v":"9987","n":"德隆乡"},{"v":"9988","n":"峰岩乡"},{"v":"9989","n":"福寿乡"},{"v":"9990","n":"古花乡"},{"v":"9991","n":"河图乡"},{"v":"9992","n":"民主乡"},{"v":"9993","n":"木凉乡"},{"v":"9994","n":"乾丰乡"},{"v":"9995","n":"庆元乡"},{"v":"9996","n":"石莲乡"},{"v":"9997","n":"石溪乡"},{"v":"9998","n":"铁村乡"},{"v":"9999","n":"土溪乡"},{"v":"10000","n":"鱼泉乡"},{"v":"10001","n":"中桥乡"},{"v":"9973","n":"太平场镇"},{"v":"9974","n":"大观镇"},{"v":"9975","n":"大有镇"},{"v":"9976","n":"合溪镇"},{"v":"9977","n":"金山镇"},{"v":"9978","n":"鸣玉镇"},{"v":"9979","n":"南平镇"},{"v":"9980","n":"三泉镇"},{"v":"9981","n":"神童镇"},{"v":"9982","n":"石墙镇"},{"v":"9983","n":"水江镇"}]},{"v":"123","n":"潼南县","c":[{"v":"39688","n":"县城内"},{"v":"9756","n":"柏梓镇"},{"v":"9757","n":"宝龙镇"},{"v":"9758","n":"崇龛镇"},{"v":"9759","n":"古溪镇"},{"v":"9760","n":"龙形镇"},{"v":"9761","n":"米心镇"},{"v":"9762","n":"群力镇"},{"v":"9763","n":"上和镇"},{"v":"9764","n":"双江镇"},{"v":"9765","n":"太安镇"},{"v":"9766","n":"塘坝镇"},{"v":"9767","n":"卧佛镇"},{"v":"9768","n":"五桂镇"},{"v":"9769","n":"小渡镇"},{"v":"9770","n":"新胜镇"},{"v":"9771","n":"玉溪镇"},{"v":"9772","n":"别口乡"},{"v":"9773","n":"田家乡"},{"v":"9774","n":"寿桥乡"}]},{"v":"128","n":"黔江区","c":[{"v":"52488","n":"城区"},{"v":"10005","n":"正阳镇"},{"v":"10006","n":"舟白镇"},{"v":"10007","n":"阿蓬江镇"},{"v":"10008","n":"小南海镇"},{"v":"10009","n":"鹅池镇"},{"v":"10010","n":"冯家镇"},{"v":"10011","n":"黑溪镇"},{"v":"10012","n":"黄溪镇"},{"v":"10013","n":"金溪镇"},{"v":"10014","n":"黎水镇"},{"v":"10015","n":"邻鄂镇"},{"v":"10016","n":"马喇镇"},{"v":"10017","n":"石会镇"},{"v":"10018","n":"石家镇"},{"v":"10019","n":"濯水镇"},{"v":"10020","n":"白石乡"},{"v":"10021","n":"白土乡"},{"v":"10022","n":"金洞乡"},{"v":"10023","n":"蓬东乡"},{"v":"10024","n":"沙坝乡"},{"v":"10025","n":"杉岭乡"},{"v":"10026","n":"水市乡"},{"v":"10027","n":"水田乡"},{"v":"10028","n":"太极乡"},{"v":"10029","n":"五里乡"},{"v":"10030","n":"新华乡"},{"v":"10031","n":"中塘乡"}]},{"v":"132","n":"开县","c":[{"v":"51202","n":"白桥镇"},{"v":"51203","n":"大德镇"},{"v":"51204","n":"金峰镇"},{"v":"51205","n":"谭家镇"},{"v":"51206","n":"天和镇"},{"v":"51207","n":"白泉乡"},{"v":"39699","n":"县城内"},{"v":"9831","n":"九龙山镇"},{"v":"9832","n":"大进镇"},{"v":"9833","n":"敦好镇"},{"v":"9834","n":"高桥镇"},{"v":"9835","n":"郭家镇"},{"v":"9836","n":"和谦镇"},{"v":"9837","n":"河堰镇"},{"v":"9838","n":"厚坝镇"},{"v":"9839","n":"临江镇"},{"v":"9840","n":"南门镇"},{"v":"9841","n":"南雅镇"},{"v":"9842","n":"渠口镇"},{"v":"9843","n":"铁桥镇"},{"v":"52083","n":"岳溪镇"},{"v":"9844","n":"温泉镇"},{"v":"9845","n":"义和镇"},{"v":"9846","n":"长沙镇"},{"v":"9847","n":"赵家镇"},{"v":"9848","n":"镇安镇"},{"v":"9849","n":"中和镇"},{"v":"9850","n":"竹溪镇"},{"v":"9851","n":"三汇口乡"},{"v":"9852","n":"白桥乡"},{"v":"9853","n":"大德乡"},{"v":"9854","n":"关面乡"},{"v":"9855","n":"金峰乡"},{"v":"9856","n":"麻柳乡"},{"v":"9857","n":"满月乡"},{"v":"9858","n":"谭家乡"},{"v":"9859","n":"天和乡"},{"v":"9860","n":"巫山镇"},{"v":"9861","n":"五通乡"},{"v":"9862","n":"紫水乡"}]},{"v":"133","n":"云阳县","c":[{"v":"39701","n":"县城内"},{"v":"10091","n":"云阳镇"},{"v":"10092","n":"巴阳镇"},{"v":"10093","n":"凤鸣镇"},{"v":"10094","n":"高阳镇"},{"v":"10095","n":"故陵镇"},{"v":"10096","n":"红狮镇"},{"v":"10097","n":"黄石镇"},{"v":"10098","n":"江口镇"},{"v":"10099","n":"龙角镇"},{"v":"10100","n":"路阳镇"},{"v":"10101","n":"南溪镇"},{"v":"10102","n":"农坝镇"},{"v":"10103","n":"盘龙镇"},{"v":"10104","n":"平安镇"},{"v":"10105","n":"渠马镇"},{"v":"10106","n":"人和镇"},{"v":"10107","n":"桑坪镇"},{"v":"10108","n":"沙市镇"},{"v":"10109","n":"双土镇"},{"v":"10110","n":"鱼泉镇"},{"v":"10111","n":"云安镇"},{"v":"10112","n":"洞鹿乡"},{"v":"10113","n":"后叶乡"},{"v":"10114","n":"龙洞乡"},{"v":"10115","n":"毛坝乡"},{"v":"10116","n":"泥溪乡"},{"v":"10117","n":"票草乡"},{"v":"10118","n":"普安乡"},{"v":"10119","n":"栖霞乡"},{"v":"10120","n":"清水乡"},{"v":"10121","n":"上坝乡"},{"v":"10122","n":"石门乡"},{"v":"10123","n":"双龙乡"},{"v":"10124","n":"水口乡"},{"v":"10125","n":"外郎乡"},{"v":"10126","n":"新津乡"},{"v":"10127","n":"堰坪乡"},{"v":"10128","n":"养鹿乡"},{"v":"10129","n":"耀灵乡"},{"v":"10130","n":"云硐乡"}]},{"v":"134","n":"忠县","c":[{"v":"39702","n":"县城内"},{"v":"10131","n":"忠州镇"},{"v":"10132","n":"拔山镇"},{"v":"10133","n":"白石镇"},{"v":"10134","n":"东溪镇"},{"v":"10135","n":"复兴镇"},{"v":"10136","n":"官坝镇"},{"v":"10137","n":"花桥镇"},{"v":"10138","n":"黄金镇"},{"v":"10139","n":"金鸡镇"},{"v":"10140","n":"马灌镇"},{"v":"10141","n":"任家镇"},{"v":"10142","n":"汝溪镇"},{"v":"10143","n":"三汇镇"},{"v":"10144","n":"石宝镇"},{"v":"10145","n":"石黄镇"},{"v":"10146","n":"双桂镇"},{"v":"10147","n":"乌杨镇"},{"v":"10148","n":"新生镇"},{"v":"10149","n":"洋渡镇"},{"v":"10150","n":"野鹤镇"},{"v":"10151","n":"永丰镇"},{"v":"10152","n":"金声乡"},{"v":"10153","n":"磨子乡"},{"v":"10154","n":"善广乡"},{"v":"10155","n":"石子乡"},{"v":"10156","n":"涂井乡"},{"v":"10157","n":"兴峰乡"},{"v":"19915","n":"新立镇"}]},{"v":"139","n":"垫江县","c":[{"v":"39712","n":"县城内"},{"v":"10283","n":"桂溪镇"},{"v":"10284","n":"澄溪镇"},{"v":"10285","n":"高安镇"},{"v":"10286","n":"高峰镇"},{"v":"10287","n":"鹤游镇"},{"v":"10288","n":"普顺镇"},{"v":"10289","n":"沙坪镇"},{"v":"10290","n":"太平镇"},{"v":"10291","n":"五洞镇"},{"v":"10292","n":"新民镇"},{"v":"10293","n":"砚台镇"},{"v":"10294","n":"永安镇"},{"v":"10295","n":"周嘉镇"},{"v":"10296","n":"白家乡"},{"v":"10297","n":"包家乡"},{"v":"10298","n":"曹回乡"},{"v":"10299","n":"大石乡"},{"v":"10300","n":"杠家乡"},{"v":"32060","n":"坪山镇"},{"v":"10301","n":"黄沙乡"},{"v":"10302","n":"裴兴乡"},{"v":"10303","n":"三溪乡"},{"v":"10304","n":"沙河乡"},{"v":"10305","n":"永平乡"},{"v":"10306","n":"长龙乡"}]},{"v":"4164","n":"城口县","c":[{"v":"39717","n":"县城内"},{"v":"10406","n":"葛城镇"},{"v":"10407","n":"巴山镇"},{"v":"10408","n":"高观镇"},{"v":"10409","n":"庙坝镇"},{"v":"10410","n":"明通镇"},{"v":"10411","n":"坪坝镇"},{"v":"10412","n":"修齐镇"},{"v":"10413","n":"北屏乡"},{"v":"10414","n":"东安乡"},{"v":"10415","n":"高楠乡"},{"v":"10416","n":"高燕乡"},{"v":"10417","n":"河鱼乡"},{"v":"10418","n":"厚坪乡"},{"v":"10419","n":"鸡鸣乡"},{"v":"10420","n":"岚天乡"},{"v":"10421","n":"蓼子乡"},{"v":"10422","n":"龙田乡"},{"v":"10423","n":"明中乡"},{"v":"10424","n":"双河乡"},{"v":"10425","n":"咸宜乡"},{"v":"10426","n":"沿河乡"},{"v":"10427","n":"治平乡"},{"v":"10428","n":"周溪乡"},{"v":"10429","n":"左岚乡"}]},{"v":"129","n":"武隆县","c":[{"v":"39692","n":"县城内"},{"v":"10032","n":"仙女山镇"},{"v":"10033","n":"巷口镇"},{"v":"10034","n":"白马镇"},{"v":"10035","n":"火炉镇"},{"v":"10036","n":"江口镇"},{"v":"10037","n":"平桥镇"},{"v":"10038","n":"桐梓镇"},{"v":"10039","n":"土坎镇"},{"v":"10040","n":"鸭江镇"},{"v":"10041","n":"羊角镇"},{"v":"10042","n":"长坝镇"},{"v":"10043","n":"白云乡"},{"v":"10044","n":"沧沟乡"},{"v":"10045","n":"凤来乡"},{"v":"10046","n":"浩口乡"},{"v":"10047","n":"和顺乡"},{"v":"10048","n":"后坪乡"},{"v":"10049","n":"黄莺乡"},{"v":"10050","n":"接龙乡"},{"v":"10051","n":"庙垭乡"},{"v":"10052","n":"石桥乡"},{"v":"10053","n":"双河乡"},{"v":"10054","n":"铁矿乡"},{"v":"10055","n":"土地乡"},{"v":"10056","n":"文复乡"},{"v":"10057","n":"赵家乡"}]},{"v":"130","n":"丰都县","c":[{"v":"39694","n":"县城内"},{"v":"10059","n":"南天湖镇"},{"v":"10060","n":"许明寺镇"},{"v":"10061","n":"包鸾镇"},{"v":"10062","n":"董家镇"},{"v":"10063","n":"高家镇"},{"v":"10064","n":"虎威镇"},{"v":"10065","n":"江池镇"},{"v":"10066","n":"龙河镇"},{"v":"10067","n":"名山镇"},{"v":"10068","n":"三元镇"},{"v":"10069","n":"社坛镇"},{"v":"10070","n":"十直镇"},{"v":"10071","n":"树人镇"},{"v":"10072","n":"双路镇"},{"v":"10073","n":"武平镇"},{"v":"10074","n":"兴义镇"},{"v":"10075","n":"湛普镇"},{"v":"10076","n":"镇江镇"},{"v":"10077","n":"太平坝乡"},{"v":"10078","n":"双龙场乡"},{"v":"10079","n":"保合乡"},{"v":"10080","n":"崇兴乡"},{"v":"10081","n":"都督乡"},{"v":"10082","n":"暨龙乡"},{"v":"10083","n":"栗子乡"},{"v":"10084","n":"龙孔乡"},{"v":"10085","n":"青龙乡"},{"v":"10086","n":"仁沙乡"},{"v":"10087","n":"三坝乡"},{"v":"10088","n":"三建乡"}]},{"v":"131","n":"奉节县","c":[{"v":"51706","n":"永乐镇"},{"v":"39698","n":"县城内"},{"v":"10377","n":"永安镇"},{"v":"10378","n":"白帝镇"},{"v":"10379","n":"草堂镇"},{"v":"10380","n":"大树镇"},{"v":"10381","n":"汾河镇"},{"v":"10382","n":"公平镇"},{"v":"10383","n":"甲高镇"},{"v":"10384","n":"康乐镇"},{"v":"10385","n":"青龙镇"},{"v":"10386","n":"吐祥镇"},{"v":"10387","n":"新民镇"},{"v":"10388","n":"兴隆镇"},{"v":"10389","n":"羊市镇"},{"v":"10390","n":"朱衣镇"},{"v":"10391","n":"竹园镇"},{"v":"10392","n":"安坪乡"},{"v":"10393","n":"冯坪乡"},{"v":"10394","n":"鹤峰乡"},{"v":"10395","n":"红土乡"},{"v":"10396","n":"康坪乡"},{"v":"10397","n":"龙桥乡"},{"v":"10398","n":"平安乡"},{"v":"10399","n":"石岗乡"},{"v":"10400","n":"太和乡"},{"v":"10401","n":"五马乡"},{"v":"10402","n":"新政乡"},{"v":"10403","n":"岩湾乡"},{"v":"10404","n":"云雾乡"},{"v":"10405","n":"长安乡"}]},{"v":"135","n":"巫溪县","c":[{"v":"39704","n":"县城内"},{"v":"10158","n":"城厢镇"},{"v":"10159","n":"凤凰镇"},{"v":"10160","n":"古路镇"},{"v":"10161","n":"尖山镇"},{"v":"10162","n":"宁厂镇"},{"v":"10163","n":"上磺镇"},{"v":"10164","n":"文峰镇"},{"v":"10165","n":"下堡镇"},{"v":"10166","n":"徐家镇"},{"v":"10167","n":"朝阳洞乡"},{"v":"10168","n":"大河乡"},{"v":"10169","n":"峰灵乡"},{"v":"10170","n":"花台乡"},{"v":"10171","n":"兰英乡"},{"v":"10172","n":"菱角乡"},{"v":"10173","n":"蒲莲乡"},{"v":"10174","n":"胜利乡"},{"v":"10175","n":"双阳乡"},{"v":"10176","n":"塘坊乡"},{"v":"10177","n":"天星乡"},{"v":"10178","n":"天元乡"},{"v":"10179","n":"田坝乡"},{"v":"10180","n":"通城乡"},{"v":"10181","n":"土城乡"},{"v":"10182","n":"乌龙乡"},{"v":"10183","n":"鱼鳞乡"},{"v":"10184","n":"长桂乡"},{"v":"10185","n":"中岗乡"},{"v":"10186","n":"中梁乡"}]},{"v":"136","n":"巫山县","c":[{"v":"39706","n":"县城内"},{"v":"10187","n":"巫峡镇"},{"v":"10188","n":"大昌镇"},{"v":"10189","n":"福田镇"},{"v":"10190","n":"官渡镇"},{"v":"10191","n":"官阳镇"},{"v":"10192","n":"龙溪镇"},{"v":"10193","n":"骡坪镇"},{"v":"10194","n":"庙堂乡"},{"v":"10195","n":"庙宇镇"},{"v":"10196","n":"双龙镇"},{"v":"10197","n":"铜鼓镇"},{"v":"10198","n":"抱龙镇"},{"v":"10199","n":"大溪乡"},{"v":"10200","n":"当阳乡"},{"v":"10201","n":"邓家乡"},{"v":"10202","n":"笃坪乡"},{"v":"10203","n":"红椿乡"},{"v":"10204","n":"建平乡"},{"v":"10205","n":"金坪乡"},{"v":"10206","n":"两坪乡"},{"v":"10207","n":"龙井乡"},{"v":"10208","n":"培石乡"},{"v":"10209","n":"平河乡"},{"v":"10210","n":"曲尺乡"},{"v":"10211","n":"三溪乡"},{"v":"10212","n":"竹贤乡"}]},{"v":"137","n":"石柱县","c":[{"v":"10240","n":"王家乡"},{"v":"10241","n":"洗新乡"},{"v":"10242","n":"新乐乡"},{"v":"10243","n":"中益乡"},{"v":"39710","n":"县城内"},{"v":"10213","n":"南宾镇"},{"v":"10214","n":"黄水镇"},{"v":"10215","n":"临溪镇"},{"v":"10216","n":"龙沙镇"},{"v":"10217","n":"马武镇"},{"v":"10218","n":"沙子镇"},{"v":"10219","n":"王场镇"},{"v":"10220","n":"西沱镇"},{"v":"10221","n":"下路镇"},{"v":"10222","n":"沿溪镇"},{"v":"10223","n":"渔池镇"},{"v":"10224","n":"悦崃镇"},{"v":"10225","n":"大歇乡"},{"v":"10226","n":"枫木乡"},{"v":"10227","n":"河嘴乡"},{"v":"10228","n":"黄鹤乡"},{"v":"10229","n":"金铃乡"},{"v":"10230","n":"金竹乡"},{"v":"10231","n":"冷水乡"},{"v":"10232","n":"黎场乡"},{"v":"10233","n":"六塘乡"},{"v":"10234","n":"龙潭乡"},{"v":"10235","n":"桥头乡"},{"v":"10236","n":"三河乡"},{"v":"10237","n":"三益乡"},{"v":"10238","n":"石家乡"},{"v":"10239","n":"万朝乡"}]},{"v":"138","n":"彭水县","c":[{"v":"10245","n":"保家镇"},{"v":"10246","n":"高谷镇"},{"v":"10247","n":"黄家镇"},{"v":"10248","n":"连湖镇"},{"v":"10249","n":"龙射镇"},{"v":"10250","n":"鹿角镇"},{"v":"10251","n":"普子镇"},{"v":"10252","n":"桑柘镇"},{"v":"10253","n":"万足镇"},{"v":"10254","n":"郁山镇"},{"v":"10255","n":"梅子垭乡"},{"v":"10256","n":"鞍子乡"},{"v":"10257","n":"大垭乡"},{"v":"10258","n":"棣棠乡"},{"v":"10259","n":"靛水乡"},{"v":"10260","n":"朗溪乡"},{"v":"10261","n":"联合乡"},{"v":"10262","n":"龙塘乡"},{"v":"10263","n":"龙溪乡"},{"v":"10264","n":"芦塘乡"},{"v":"10265","n":"鹿鸣乡"},{"v":"10266","n":"平安乡"},{"v":"10267","n":"迁乔乡"},{"v":"10268","n":"乔梓乡"},{"v":"10269","n":"润溪乡"},{"v":"10270","n":"三义乡"},{"v":"10271","n":"善感乡"},{"v":"39711","n":"县城内"},{"v":"10272","n":"石柳乡"},{"v":"10273","n":"石盘乡"},{"v":"10274","n":"双龙乡"},{"v":"10275","n":"太原乡"},{"v":"10276","n":"桐楼乡"},{"v":"10277","n":"小厂乡"},{"v":"10278","n":"新田乡"},{"v":"10279","n":"岩东乡"},{"v":"10280","n":"长滩乡"},{"v":"10281","n":"诸佛乡"},{"v":"10282","n":"走马乡"}]},{"v":"140","n":"酉阳县","c":[{"v":"39714","n":"县城内"},{"v":"10307","n":"钟多镇"},{"v":"10308","n":"苍岭镇"},{"v":"10309","n":"车田乡"},{"v":"10310","n":"大溪镇"},{"v":"10311","n":"丁市镇"},{"v":"10312","n":"泔溪镇"},{"v":"10313","n":"龚滩镇"},{"v":"10314","n":"黑水镇"},{"v":"10315","n":"后溪镇"},{"v":"10316","n":"李溪镇"},{"v":"10317","n":"龙潭镇"},{"v":"10318","n":"麻旺镇"},{"v":"10319","n":"小河镇"},{"v":"10320","n":"兴隆镇"},{"v":"10321","n":"酉酬镇"},{"v":"10322","n":"南腰界乡"},{"v":"10323","n":"后坪坝乡"},{"v":"10324","n":"板溪乡"},{"v":"10325","n":"官清乡"},{"v":"10326","n":"花田乡"},{"v":"10327","n":"江丰乡"},{"v":"10328","n":"可大乡"},{"v":"10329","n":"浪坪乡"},{"v":"10330","n":"两罾乡"},{"v":"10331","n":"毛坝乡"},{"v":"10332","n":"庙溪乡"},{"v":"10333","n":"木叶乡"},{"v":"10334","n":"楠木乡"},{"v":"10335","n":"偏柏乡"},{"v":"10336","n":"清泉乡"},{"v":"10337","n":"双泉乡"},{"v":"10338","n":"天馆乡"},{"v":"10339","n":"铜鼓乡"},{"v":"10340","n":"涂市乡"},{"v":"10341","n":"万木乡"},{"v":"10342","n":"五福乡"},{"v":"10343","n":"宜居乡"},{"v":"10344","n":"腴地乡"},{"v":"10345","n":"板桥乡"}]},{"v":"141","n":"秀山县","c":[{"v":"39716","n":"县城内"},{"v":"10346","n":"清溪场镇"},{"v":"10347","n":"中和镇"},{"v":"10348","n":"隘口镇"},{"v":"10349","n":"峨溶镇"},{"v":"10350","n":"官庄镇"},{"v":"10351","n":"洪安镇"},{"v":"10352","n":"兰桥镇"},{"v":"10353","n":"龙池镇"},{"v":"10354","n":"梅江镇"},{"v":"10355","n":"平凯镇"},{"v":"10356","n":"溶溪镇"},{"v":"10357","n":"石堤镇"},{"v":"10358","n":"石耶镇"},{"v":"10359","n":"雅江镇"},{"v":"10360","n":"巴家乡"},{"v":"10361","n":"保安乡"},{"v":"10362","n":"岑溪乡"},{"v":"10363","n":"大溪乡"},{"v":"10364","n":"干川乡"},{"v":"10365","n":"膏田乡"},{"v":"10366","n":"官舟乡"},{"v":"10367","n":"海洋乡"},{"v":"10368","n":"里仁乡"},{"v":"10369","n":"妙泉乡"},{"v":"10370","n":"平马乡"},{"v":"10371","n":"宋农乡"},{"v":"10372","n":"溪口乡"},{"v":"10373","n":"孝溪乡"},{"v":"10374","n":"涌洞乡"},{"v":"10375","n":"中平乡"},{"v":"10376","n":"钟灵乡"}]}]},{"v":"5","n":"河北","c":[{"v":"258","n":"唐山市","c":[{"v":"41497","n":"路北区"},{"v":"41499","n":"路南区"},{"v":"41500","n":"迁安市"},{"v":"41502","n":"丰润区"},{"v":"3202","n":"古冶区"},{"v":"3203","n":"开平区"},{"v":"2756","n":"遵化市"},{"v":"2757","n":"丰南区"},{"v":"2759","n":"迁西县"},{"v":"2760","n":"滦南县"},{"v":"2762","n":"玉田县"},{"v":"2763","n":"曹妃甸区"},{"v":"2764","n":"乐亭县"},{"v":"2765","n":"滦县"}]},{"v":"264","n":"沧州市","c":[{"v":"265","n":"沧县"},{"v":"266","n":"泊头市"},{"v":"268","n":"河间市"},{"v":"269","n":"献县"},{"v":"270","n":"肃宁县"},{"v":"271","n":"青县"},{"v":"272","n":"东光县"},{"v":"273","n":"吴桥县"},{"v":"276","n":"南皮县"},{"v":"277","n":"盐山县"},{"v":"278","n":"海兴县"},{"v":"279","n":"孟村县"},{"v":"49576","n":"运河区"},{"v":"49577","n":"新华区"},{"v":"49578","n":"任丘市"},{"v":"49579","n":"黄骅市"}]},{"v":"274","n":"廊坊市","c":[{"v":"49707","n":"三河市"},{"v":"3207","n":"广阳区"},{"v":"4097","n":"开发区"},{"v":"284","n":"固安县"},{"v":"3206","n":"安次区"},{"v":"285","n":"永清县"},{"v":"286","n":"香河县"},{"v":"287","n":"大城县"},{"v":"288","n":"文安县"},{"v":"289","n":"大厂县"},{"v":"49708","n":"霸州市"}]},{"v":"275","n":"衡水市","c":[{"v":"291","n":"冀州市"},{"v":"292","n":"深州市"},{"v":"293","n":"饶阳县"},{"v":"294","n":"枣强县"},{"v":"41510","n":"桃城区"},{"v":"295","n":"故城县"},{"v":"296","n":"阜城县"},{"v":"297","n":"安平县"},{"v":"298","n":"武邑县"},{"v":"299","n":"景县"},{"v":"300","n":"武强县"}]},{"v":"142","n":"石家庄市","c":[{"v":"42540","n":"藁城市"},{"v":"42541","n":"鹿泉市"},{"v":"42542","n":"正定县"},{"v":"42543","n":"新华区"},{"v":"42544","n":"桥西区"},{"v":"42545","n":"桥东区"},{"v":"42546","n":"裕华区"},{"v":"42547","n":"长安区"},{"v":"143","n":"辛集市"},{"v":"145","n":"晋州市"},{"v":"146","n":"新乐市"},{"v":"4158","n":"平山县"},{"v":"3182","n":"井陉矿区"},{"v":"153","n":"井陉县"},{"v":"154","n":"栾城县"},{"v":"156","n":"行唐县"},{"v":"157","n":"灵寿县"},{"v":"158","n":"高邑县"},{"v":"159","n":"赵县"},{"v":"160","n":"赞皇县"},{"v":"161","n":"深泽县"},{"v":"162","n":"无极县"},{"v":"163","n":"元氏县"}]},{"v":"148","n":"邯郸市","c":[{"v":"34049","n":"丛台区"},{"v":"34050","n":"邯山区"},{"v":"34051","n":"复兴区"},{"v":"34052","n":"武安市"},{"v":"3077","n":"临漳县"},{"v":"3187","n":"永年县"},{"v":"167","n":"邯郸县"},{"v":"168","n":"峰峰矿区"},{"v":"169","n":"曲周县"},{"v":"170","n":"馆陶县"},{"v":"171","n":"魏县"},{"v":"172","n":"成安县"},{"v":"173","n":"大名县"},{"v":"174","n":"涉县"},{"v":"175","n":"鸡泽县"},{"v":"176","n":"邱县"},{"v":"177","n":"广平县"},{"v":"178","n":"肥乡县"},{"v":"180","n":"磁县"}]},{"v":"164","n":"邢台市","c":[{"v":"257","n":"宁晋县"},{"v":"3098","n":"威县"},{"v":"47712","n":"桥西区"},{"v":"47713","n":"桥东区"},{"v":"183","n":"邢台县"},{"v":"184","n":"南宫市"},{"v":"185","n":"沙河市"},{"v":"186","n":"柏乡县"},{"v":"187","n":"任县"},{"v":"188","n":"清河县"},{"v":"189","n":"隆尧县"},{"v":"190","n":"临城县"},{"v":"191","n":"广宗县"},{"v":"192","n":"临西县"},{"v":"193","n":"内丘县"},{"v":"194","n":"平乡县"},{"v":"195","n":"巨鹿县"},{"v":"196","n":"新河县"},{"v":"197","n":"南和县"}]},{"v":"199","n":"保定市","c":[{"v":"47213","n":"涿州市"},{"v":"47214","n":"定州市"},{"v":"47215","n":"徐水县"},{"v":"47216","n":"高碑店市"},{"v":"3190","n":"新市区"},{"v":"3191","n":"北市区"},{"v":"3192","n":"南市区"},{"v":"203","n":"安国市"},{"v":"3193","n":"安新县"},{"v":"205","n":"满城县"},{"v":"206","n":"清苑县"},{"v":"207","n":"涞水县"},{"v":"208","n":"阜平县"},{"v":"210","n":"定兴县"},{"v":"211","n":"唐县"},{"v":"212","n":"高阳县"},{"v":"213","n":"容城县"},{"v":"214","n":"涞源县"},{"v":"215","n":"望都县"},{"v":"217","n":"易县"},{"v":"218","n":"曲阳县"},{"v":"219","n":"蠡县"},{"v":"220","n":"顺平县"},{"v":"221","n":"博野县"},{"v":"222","n":"雄县"}]},{"v":"224","n":"张家口市","c":[{"v":"230","n":"怀安县"},{"v":"3156","n":"沽源县"},{"v":"4046","n":"宣化区"},{"v":"225","n":"宣化县"},{"v":"226","n":"康保县"},{"v":"227","n":"张北县"},{"v":"228","n":"阳原县"},{"v":"229","n":"赤城县"},{"v":"232","n":"崇礼县"},{"v":"233","n":"尚义县"},{"v":"234","n":"蔚县"},{"v":"235","n":"涿鹿县"},{"v":"236","n":"万全县"},{"v":"238","n":"下花园区"},{"v":"34298","n":"桥西区"},{"v":"34299","n":"桥东区"},{"v":"231","n":"怀来县"}]},{"v":"239","n":"承德市","c":[{"v":"3197","n":"双滦区"},{"v":"3198","n":"鹰手营子矿区"},{"v":"2767","n":"隆化县"},{"v":"241","n":"兴隆县"},{"v":"242","n":"平泉市"},{"v":"243","n":"滦平县"},{"v":"245","n":"丰宁县"},{"v":"246","n":"围场县"},{"v":"247","n":"宽城县"},{"v":"48379","n":"双桥区"},{"v":"3092","n":"承德县"}]},{"v":"248","n":"秦皇岛市","c":[{"v":"261","n":"卢龙县"},{"v":"262","n":"青龙县"},{"v":"263","n":"昌黎县"},{"v":"2990","n":"北戴河区"},{"v":"48377","n":"海港区"},{"v":"48378","n":"山海关区"},{"v":"4093","n":"抚宁县"}]}]},{"v":"6","n":"山西","c":[{"v":"3074","n":"长治市","c":[{"v":"3075","n":"长治县"},{"v":"3109","n":"潞城市"},{"v":"3222","n":"郊区"},{"v":"3223","n":"襄垣县"},{"v":"3224","n":"屯留县"},{"v":"3225","n":"平顺县"},{"v":"3226","n":"黎城县"},{"v":"3227","n":"壶关县"},{"v":"3228","n":"长子县"},{"v":"3229","n":"武乡县"},{"v":"3230","n":"沁县"},{"v":"3231","n":"沁源县"},{"v":"32505","n":"城区"}]},{"v":"303","n":"太原市","c":[{"v":"36780","n":"小店区"},{"v":"36781","n":"迎泽区"},{"v":"36782","n":"晋源区"},{"v":"36783","n":"万柏林区"},{"v":"36784","n":"尖草坪区"},{"v":"36785","n":"杏花岭区"},{"v":"305","n":"古交市"},{"v":"304","n":"阳曲县"},{"v":"306","n":"娄烦县"},{"v":"307","n":"清徐县"}]},{"v":"309","n":"大同市","c":[{"v":"310","n":"大同县"},{"v":"311","n":"天镇县"},{"v":"312","n":"灵丘县"},{"v":"313","n":"阳高县"},{"v":"314","n":"左云县"},{"v":"315","n":"浑源县"},{"v":"316","n":"广灵县"},{"v":"32061","n":"城区"},{"v":"3214","n":"新荣区"},{"v":"3216","n":"南郊区"},{"v":"3217","n":"矿区"}]},{"v":"318","n":"阳泉市","c":[{"v":"319","n":"盂县"},{"v":"320","n":"平定县"},{"v":"321","n":"郊区"},{"v":"44144","n":"城区"},{"v":"3219","n":"矿区"}]},{"v":"325","n":"晋城市","c":[{"v":"3073","n":"城区"},{"v":"326","n":"高平市"},{"v":"327","n":"阳城县"},{"v":"328","n":"沁水县"},{"v":"329","n":"陵川县"},{"v":"2967","n":"泽州县"}]},{"v":"330","n":"朔州市","c":[{"v":"3118","n":"平鲁区"},{"v":"331","n":"山阴县"},{"v":"332","n":"右玉县"},{"v":"333","n":"应县"},{"v":"334","n":"怀仁县"},{"v":"335","n":"朔城区"}]},{"v":"336","n":"晋中市","c":[{"v":"338","n":"介休市"},{"v":"339","n":"昔阳县"},{"v":"341","n":"祁县"},{"v":"342","n":"左权县"},{"v":"343","n":"寿阳县"},{"v":"344","n":"太谷县"},{"v":"345","n":"和顺县"},{"v":"346","n":"灵石县"},{"v":"347","n":"平遥县"},{"v":"348","n":"榆社县"},{"v":"44145","n":"榆次区"}]},{"v":"350","n":"忻州市","c":[{"v":"351","n":"原平市"},{"v":"352","n":"代县"},{"v":"353","n":"神池县"},{"v":"354","n":"五寨县"},{"v":"358","n":"五台县"},{"v":"359","n":"偏关县"},{"v":"360","n":"宁武县"},{"v":"361","n":"静乐县"},{"v":"362","n":"繁峙县"},{"v":"363","n":"河曲县"},{"v":"364","n":"保德县"},{"v":"365","n":"定襄县"},{"v":"366","n":"忻府区"},{"v":"367","n":"岢岚县"}]},{"v":"368","n":"吕梁市","c":[{"v":"369","n":"离石区"},{"v":"370","n":"孝义市"},{"v":"371","n":"汾阳市"},{"v":"372","n":"文水县"},{"v":"373","n":"中阳县"},{"v":"374","n":"兴县"},{"v":"375","n":"临县"},{"v":"376","n":"方山县"},{"v":"377","n":"柳林县"},{"v":"378","n":"岚县"},{"v":"3235","n":"交口县"},{"v":"3236","n":"交城县"},{"v":"3237","n":"石楼县"}]},{"v":"379","n":"临汾市","c":[{"v":"3136","n":"曲沃县"},{"v":"380","n":"侯马市"},{"v":"381","n":"霍州市"},{"v":"382","n":"汾西县"},{"v":"383","n":"吉县"},{"v":"384","n":"安泽县"},{"v":"386","n":"浮山县"},{"v":"387","n":"大宁县"},{"v":"388","n":"古县"},{"v":"389","n":"隰县"},{"v":"390","n":"襄汾县"},{"v":"391","n":"翼城县"},{"v":"392","n":"永和县"},{"v":"393","n":"乡宁县"},{"v":"395","n":"洪洞县"},{"v":"396","n":"蒲县"},{"v":"32206","n":"尧都区"}]},{"v":"398","n":"运城市","c":[{"v":"32360","n":"盐湖区"},{"v":"399","n":"河津市"},{"v":"400","n":"永济市"},{"v":"402","n":"新绛县"},{"v":"403","n":"平陆县"},{"v":"404","n":"垣曲县"},{"v":"405","n":"绛县"},{"v":"406","n":"稷山县"},{"v":"407","n":"芮城县"},{"v":"408","n":"夏县"},{"v":"409","n":"临猗县"},{"v":"410","n":"万荣县"},{"v":"3233","n":"闻喜县"}]}]},{"v":"7","n":"河南","c":[{"v":"517","n":"商丘市","c":[{"v":"518","n":"永城市"},{"v":"519","n":"宁陵县"},{"v":"520","n":"虞城县"},{"v":"521","n":"民权县"},{"v":"522","n":"夏邑县"},{"v":"523","n":"柘城县"},{"v":"524","n":"睢县"},{"v":"34751","n":"睢阳区"},{"v":"34752","n":"梁园区"}]},{"v":"527","n":"周口市","c":[{"v":"529","n":"项城市"},{"v":"530","n":"商水县"},{"v":"531","n":"淮阳县"},{"v":"532","n":"太康县"},{"v":"533","n":"鹿邑县"},{"v":"534","n":"西华县"},{"v":"535","n":"扶沟县"},{"v":"536","n":"沈丘县"},{"v":"537","n":"郸城县"},{"v":"35108","n":"川汇区"},{"v":"34926","n":"东新区"},{"v":"34927","n":"经济开发区"}]},{"v":"538","n":"驻马店市","c":[{"v":"540","n":"确山县"},{"v":"541","n":"新蔡县"},{"v":"542","n":"上蔡县"},{"v":"543","n":"泌阳县"},{"v":"544","n":"西平县"},{"v":"545","n":"遂平县"},{"v":"546","n":"汝南县"},{"v":"547","n":"平舆县"},{"v":"548","n":"正阳县"},{"v":"35189","n":"驿城区"}]},{"v":"549","n":"信阳市","c":[{"v":"551","n":"潢川县"},{"v":"552","n":"淮滨县"},{"v":"553","n":"息县"},{"v":"554","n":"新县"},{"v":"556","n":"固始县"},{"v":"557","n":"罗山县"},{"v":"558","n":"光山县"},{"v":"3119","n":"商城县"},{"v":"34548","n":"平桥区"},{"v":"34549","n":"浉河区"}]},{"v":"412","n":"郑州市","c":[{"v":"3547","n":"二七区"},{"v":"3548","n":"中原区"},{"v":"4337","n":"郑东新区"},{"v":"3546","n":"管城区"},{"v":"3545","n":"金水区"},{"v":"47300","n":"经济开发区"},{"v":"47301","n":"高新技术开发区"},{"v":"46820","n":"新郑市"},{"v":"46821","n":"巩义市"},{"v":"46822","n":"荥阳市"},{"v":"46823","n":"中牟县"},{"v":"415","n":"新密市"},{"v":"416","n":"登封市"},{"v":"3544","n":"惠济区"},{"v":"2782","n":"上街区"}]},{"v":"420","n":"开封市","c":[{"v":"45533","n":"金明区"},{"v":"45534","n":"龙亭区"},{"v":"45535","n":"顺河区"},{"v":"45536","n":"鼓楼区"},{"v":"45537","n":"禹王台区"},{"v":"3127","n":"通许县"},{"v":"421","n":"开封县"},{"v":"422","n":"杞县"},{"v":"423","n":"兰考县"},{"v":"425","n":"尉氏县"}]},{"v":"427","n":"洛阳市","c":[{"v":"3556","n":"涧西区"},{"v":"3559","n":"西工区"},{"v":"45532","n":"洛龙区"},{"v":"4150","n":"嵩县"},{"v":"428","n":"偃师市"},{"v":"429","n":"孟津县"},{"v":"430","n":"汝阳县"},{"v":"431","n":"伊川县"},{"v":"432","n":"洛宁县"},{"v":"434","n":"宜阳县"},{"v":"435","n":"栾川县"},{"v":"436","n":"新安县"},{"v":"45531","n":"伊滨区"},{"v":"3555","n":"吉利区"},{"v":"3557","n":"瀍河区"},{"v":"3558","n":"老城区"}]},{"v":"438","n":"平顶山市","c":[{"v":"35965","n":"湛河区"},{"v":"35966","n":"卫东区"},{"v":"35967","n":"新华区"},{"v":"439","n":"汝州市"},{"v":"440","n":"舞钢市"},{"v":"441","n":"郏县"},{"v":"442","n":"叶县"},{"v":"443","n":"鲁山县"},{"v":"444","n":"宝丰县"},{"v":"3560","n":"石龙区"}]},{"v":"446","n":"焦作市","c":[{"v":"447","n":"沁阳市"},{"v":"448","n":"孟州市"},{"v":"449","n":"修武县"},{"v":"450","n":"温县"},{"v":"451","n":"武陟县"},{"v":"452","n":"博爱县"},{"v":"453","n":"山阳区"},{"v":"3566","n":"解放区"},{"v":"37371","n":"马村区"},{"v":"37372","n":"中站区"}]},{"v":"454","n":"鹤壁市","c":[{"v":"35591","n":"淇滨区"},{"v":"455","n":"浚县"},{"v":"456","n":"淇县"},{"v":"457","n":"鹤山区"},{"v":"3567","n":"山城区"}]},{"v":"458","n":"新乡市","c":[{"v":"37456","n":"牧野区"},{"v":"37457","n":"红旗区"},{"v":"37458","n":"卫滨区"},{"v":"459","n":"卫辉市"},{"v":"460","n":"辉县市"},{"v":"461","n":"新乡县"},{"v":"462","n":"获嘉县"},{"v":"463","n":"原阳县"},{"v":"464","n":"长垣县"},{"v":"465","n":"延津县"},{"v":"466","n":"封丘县"},{"v":"3570","n":"凤泉区"}]},{"v":"468","n":"安阳市","c":[{"v":"35470","n":"龙安区"},{"v":"35471","n":"殷都区"},{"v":"35472","n":"文峰区"},{"v":"35473","n":"开发区"},{"v":"35474","n":"北关区"},{"v":"469","n":"林州市"},{"v":"470","n":"安阳县"},{"v":"471","n":"滑县"},{"v":"472","n":"汤阴县"},{"v":"473","n":"内黄县"}]},{"v":"475","n":"濮阳市","c":[{"v":"476","n":"濮阳县"},{"v":"477","n":"南乐县"},{"v":"478","n":"台前县"},{"v":"479","n":"清丰县"},{"v":"480","n":"范县"},{"v":"481","n":"华龙区"}]},{"v":"2780","n":"济源市","c":[{"v":"52305","n":"城区"},{"v":"35178","n":"五龙口镇"},{"v":"35179","n":"下冶镇"},{"v":"35180","n":"轵城镇"},{"v":"35181","n":"王屋镇"},{"v":"35182","n":"思礼镇"},{"v":"35183","n":"邵原镇"},{"v":"35184","n":"坡头镇"},{"v":"35185","n":"梨林镇"},{"v":"35186","n":"克井镇"},{"v":"35187","n":"大峪镇"},{"v":"35188","n":"承留镇"}]},{"v":"482","n":"许昌市","c":[{"v":"488","n":"魏都区"},{"v":"483","n":"禹州市"},{"v":"484","n":"长葛市"},{"v":"485","n":"建安区"},{"v":"486","n":"鄢陵县"},{"v":"487","n":"襄城县"}]},{"v":"489","n":"漯河市","c":[{"v":"490","n":"郾城区"},{"v":"492","n":"临颍县"},{"v":"493","n":"召陵区"},{"v":"494","n":"舞阳县"},{"v":"3576","n":"源汇区"}]},{"v":"495","n":"三门峡市","c":[{"v":"3113","n":"渑池县"},{"v":"35637","n":"湖滨区"},{"v":"496","n":"义马市"},{"v":"497","n":"灵宝市"},{"v":"498","n":"陕县"},{"v":"499","n":"卢氏县"}]},{"v":"502","n":"南阳市","c":[{"v":"512","n":"社旗县"},{"v":"515","n":"西峡县"},{"v":"35751","n":"卧龙区"},{"v":"35752","n":"宛城区"},{"v":"503","n":"邓州市"},{"v":"504","n":"桐柏县"},{"v":"505","n":"方城县"},{"v":"506","n":"淅川县"},{"v":"507","n":"镇平县"},{"v":"508","n":"唐河县"},{"v":"509","n":"南召县"},{"v":"510","n":"内乡县"},{"v":"511","n":"新野县"}]}]},{"v":"8","n":"辽宁","c":[{"v":"560","n":"沈阳市","c":[{"v":"567","n":"苏家屯区"},{"v":"569","n":"新民市"},{"v":"570","n":"法库县"},{"v":"571","n":"辽中县"},{"v":"572","n":"康平县"},{"v":"50819","n":"皇姑区"},{"v":"50820","n":"铁西区"},{"v":"50821","n":"大东区"},{"v":"50822","n":"沈河区"},{"v":"50823","n":"东陵区"},{"v":"50824","n":"于洪区"},{"v":"50825","n":"和平区"},{"v":"50826","n":"浑南新区"},{"v":"50827","n":"沈北新区"}]},{"v":"573","n":"大连市","c":[{"v":"4468","n":"中山区"},{"v":"3261","n":"沙河口区"},{"v":"3263","n":"西岗区"},{"v":"5909","n":"甘井子区"},{"v":"6561","n":"高新园区"},{"v":"6627","n":"大连开发区"},{"v":"46824","n":"金州区"},{"v":"46825","n":"旅顺口区"},{"v":"574","n":"普兰店市"},{"v":"575","n":"瓦房店市"},{"v":"576","n":"庄河市"},{"v":"577","n":"长海县"}]},{"v":"579","n":"鞍山市","c":[{"v":"3264","n":"铁东区"},{"v":"3266","n":"立山区"},{"v":"580","n":"台安县"},{"v":"581","n":"海城市"},{"v":"583","n":"岫岩县"},{"v":"37581","n":"铁西区"},{"v":"37582","n":"千山区"}]},{"v":"584","n":"抚顺市","c":[{"v":"3268","n":"望花区"},{"v":"3269","n":"东洲区"},{"v":"3270","n":"新抚区"},{"v":"3271","n":"顺城区"},{"v":"585","n":"抚顺县"},{"v":"586","n":"新宾县"},{"v":"587","n":"清原县"}]},{"v":"589","n":"本溪市","c":[{"v":"591","n":"桓仁县"},{"v":"41341","n":"本溪县"},{"v":"41342","n":"平山区"},{"v":"41343","n":"溪湖区"},{"v":"41344","n":"明山区"},{"v":"3275","n":"南芬区"}]},{"v":"593","n":"丹东市","c":[{"v":"20171","n":"元宝区"},{"v":"20172","n":"振兴区"},{"v":"20173","n":"振安区"},{"v":"20174","n":"东港市"},{"v":"20175","n":"凤城市"},{"v":"596","n":"宽甸县"}]},{"v":"598","n":"锦州市","c":[{"v":"4913","n":"凌河区"},{"v":"4912","n":"古塔区"},{"v":"4914","n":"太和区"},{"v":"599","n":"义县"},{"v":"600","n":"凌海市"},{"v":"601","n":"北镇市"},{"v":"602","n":"黑山县"},{"v":"6790","n":"经济技术开发区"}]},{"v":"604","n":"葫芦岛市","c":[{"v":"3300","n":"龙港区"},{"v":"20524","n":"连山区"},{"v":"20525","n":"兴城市"},{"v":"606","n":"绥中县"},{"v":"607","n":"建昌县"},{"v":"608","n":"南票区"}]},{"v":"609","n":"营口市","c":[{"v":"3283","n":"西市区"},{"v":"6628","n":"站前区"},{"v":"610","n":"大石桥市"},{"v":"611","n":"盖州市"},{"v":"3282","n":"老边区"},{"v":"20183","n":"鲅鱼圈区"}]},{"v":"613","n":"盘锦市","c":[{"v":"614","n":"盘山县"},{"v":"615","n":"大洼县"},{"v":"20661","n":"兴隆台区"},{"v":"20662","n":"双台子区"}]},{"v":"617","n":"阜新市","c":[{"v":"618","n":"阜新县"},{"v":"619","n":"彰武县"},{"v":"20658","n":"海州区"},{"v":"20659","n":"太平区"},{"v":"20660","n":"细河区"},{"v":"3286","n":"清河门区"},{"v":"3288","n":"新邱区"}]},{"v":"621","n":"辽阳市","c":[{"v":"623","n":"辽阳县"},{"v":"43963","n":"白塔区"},{"v":"43964","n":"文圣区"},{"v":"43965","n":"灯塔市"},{"v":"3290","n":"太子河区"},{"v":"3291","n":"弓长岭区"},{"v":"3292","n":"宏伟区"}]},{"v":"632","n":"朝阳市","c":[{"v":"633","n":"凌源市"},{"v":"634","n":"北票市"},{"v":"635","n":"喀喇沁左翼县"},{"v":"636","n":"朝阳县"},{"v":"20348","n":"双塔区"},{"v":"637","n":"建平县"},{"v":"3299","n":"龙城区"}]},{"v":"6858","n":"铁岭市","c":[{"v":"6859","n":"银州区"},{"v":"6860","n":"清河区"},{"v":"6862","n":"开原市"},{"v":"6863","n":"铁岭县"},{"v":"6864","n":"西丰县"},{"v":"6865","n":"昌图县"},{"v":"44027","n":"调兵山市"}]}]},{"v":"9","n":"吉林","c":[{"v":"639","n":"长春市","c":[{"v":"3172","n":"德惠市"},{"v":"640","n":"榆树市"},{"v":"641","n":"九台市"},{"v":"642","n":"农安县"},{"v":"38630","n":"朝阳区"},{"v":"38631","n":"南关区"},{"v":"38632","n":"宽城区"},{"v":"38633","n":"二道区"},{"v":"3306","n":"双阳区"},{"v":"38634","n":"绿园区"},{"v":"38635","n":"净月区"},{"v":"38636","n":"汽车产业开发区"},{"v":"38637","n":"高新技术开发区"},{"v":"38638","n":"经济技术开发区"}]},{"v":"644","n":"吉林市","c":[{"v":"24069","n":"昌邑区"},{"v":"24070","n":"龙潭区"},{"v":"24071","n":"船营区"},{"v":"24072","n":"丰满区"},{"v":"645","n":"舒兰市"},{"v":"646","n":"桦甸市"},{"v":"647","n":"蛟河市"},{"v":"648","n":"磐石市"},{"v":"649","n":"永吉县"}]},{"v":"651","n":"四平市","c":[{"v":"6641","n":"铁东区"},{"v":"6642","n":"铁西区"},{"v":"652","n":"公主岭市"},{"v":"653","n":"双辽市"},{"v":"654","n":"梨树县"},{"v":"656","n":"伊通县"}]},{"v":"657","n":"通化市","c":[{"v":"3311","n":"东昌区"},{"v":"658","n":"梅河口市"},{"v":"659","n":"集安市"},{"v":"660","n":"通化县"},{"v":"661","n":"辉南县"},{"v":"662","n":"柳河县"},{"v":"663","n":"二道江区"}]},{"v":"664","n":"白山市","c":[{"v":"24074","n":"浑江区"},{"v":"665","n":"临江市"},{"v":"669","n":"江源区"},{"v":"671","n":"靖宇县"},{"v":"672","n":"抚松县"},{"v":"673","n":"长白县"}]},{"v":"674","n":"松原市","c":[{"v":"24075","n":"宁江区"},{"v":"24076","n":"前郭县"},{"v":"675","n":"乾安县"},{"v":"676","n":"长岭县"},{"v":"677","n":"扶余县"}]},{"v":"681","n":"白城市","c":[{"v":"682","n":"大安市"},{"v":"683","n":"洮南市"},{"v":"684","n":"通榆县"},{"v":"685","n":"镇赉县"},{"v":"686","n":"洮北区"}]},{"v":"687","n":"延边州","c":[{"v":"24073","n":"延吉市"},{"v":"3312","n":"图们市"},{"v":"3313","n":"敦化市"},{"v":"3314","n":"珲春市"},{"v":"3315","n":"龙井市"},{"v":"3316","n":"和龙市"},{"v":"3317","n":"汪清县"},{"v":"3318","n":"安图县"}]},{"v":"2992","n":"辽源市","c":[{"v":"2993","n":"龙山区"},{"v":"2994","n":"西安区"},{"v":"2995","n":"东丰县"},{"v":"2996","n":"东辽县"}]}]},{"v":"10","n":"黑龙江","c":[{"v":"773","n":"七台河市","c":[{"v":"774","n":"勃利县"},{"v":"3364","n":"桃山区"},{"v":"3365","n":"新兴区"},{"v":"3366","n":"茄子河区"},{"v":"53287","n":"金沙新区"}]},{"v":"776","n":"黑河市","c":[{"v":"777","n":"北安市"},{"v":"778","n":"五大连池市"},{"v":"779","n":"逊克县"},{"v":"780","n":"孙吴县"},{"v":"3096","n":"嫩江县"},{"v":"3371","n":"爱辉区"}]},{"v":"782","n":"绥化市","c":[{"v":"6712","n":"北林区"},{"v":"784","n":"安达市"},{"v":"785","n":"肇东市"},{"v":"786","n":"海伦市"},{"v":"787","n":"绥棱县"},{"v":"788","n":"兰西县"},{"v":"789","n":"明水县"},{"v":"790","n":"青冈县"},{"v":"791","n":"庆安县"},{"v":"792","n":"望奎县"}]},{"v":"793","n":"大兴安岭地区","c":[{"v":"4114","n":"加格达奇区"},{"v":"4115","n":"松岭区"},{"v":"4116","n":"呼中区"},{"v":"794","n":"呼玛县"},{"v":"795","n":"塔河县"},{"v":"796","n":"漠河县"},{"v":"11432","n":"新林区"}]},{"v":"698","n":"哈尔滨市","c":[{"v":"699","n":"阿城区"},{"v":"700","n":"尚志市"},{"v":"701","n":"双城市"},{"v":"702","n":"五常市"},{"v":"704","n":"方正县"},{"v":"705","n":"宾县"},{"v":"706","n":"依兰县"},{"v":"707","n":"巴彦县"},{"v":"708","n":"通河县"},{"v":"709","n":"木兰县"},{"v":"710","n":"延寿县"},{"v":"45814","n":"呼兰区"},{"v":"45815","n":"松北区"},{"v":"45816","n":"道里区"},{"v":"45817","n":"南岗区"},{"v":"45818","n":"道外区"},{"v":"45819","n":"香坊区"},{"v":"45820","n":"平房区"}]},{"v":"712","n":"齐齐哈尔市","c":[{"v":"33404","n":"建华区"},{"v":"33405","n":"龙沙区"},{"v":"33406","n":"铁锋区"},{"v":"713","n":"梅里斯区"},{"v":"714","n":"昂昂溪区"},{"v":"715","n":"富拉尔基区"},{"v":"716","n":"碾子山区"},{"v":"717","n":"讷河市"},{"v":"718","n":"富裕县"},{"v":"719","n":"拜泉县"},{"v":"720","n":"甘南县"},{"v":"721","n":"依安县"},{"v":"722","n":"克山县"},{"v":"723","n":"龙江县"},{"v":"724","n":"克东县"},{"v":"725","n":"泰来县"}]},{"v":"727","n":"鹤岗市","c":[{"v":"3334","n":"兴山区"},{"v":"3335","n":"向阳区"},{"v":"3336","n":"工农区"},{"v":"3337","n":"南山区"},{"v":"3338","n":"兴安区"},{"v":"3339","n":"东山区"},{"v":"728","n":"萝北县"},{"v":"729","n":"绥滨县"}]},{"v":"731","n":"双鸭山市","c":[{"v":"3340","n":"尖山区"},{"v":"3341","n":"岭东区"},{"v":"3342","n":"四方台区"},{"v":"3343","n":"宝山区"},{"v":"733","n":"集贤县"},{"v":"734","n":"宝清县"},{"v":"735","n":"友谊县"},{"v":"736","n":"饶河县"}]},{"v":"737","n":"鸡西市","c":[{"v":"3329","n":"恒山区"},{"v":"3330","n":"滴道区"},{"v":"3331","n":"梨树区"},{"v":"3332","n":"城子河区"},{"v":"3333","n":"麻山区"},{"v":"33163","n":"鸡冠区"},{"v":"739","n":"密山市"},{"v":"740","n":"虎林市"},{"v":"741","n":"鸡东县"}]},{"v":"742","n":"大庆市","c":[{"v":"744","n":"萨尔图区"},{"v":"745","n":"龙凤区"},{"v":"746","n":"让胡路区"},{"v":"747","n":"红岗区"},{"v":"748","n":"大同区"},{"v":"749","n":"林甸县"},{"v":"750","n":"肇州县"},{"v":"751","n":"肇源县"},{"v":"752","n":"杜尔伯特县"}]},{"v":"753","n":"伊春市","c":[{"v":"3344","n":"伊春区"},{"v":"3345","n":"南岔区"},{"v":"3346","n":"友好区"},{"v":"3347","n":"西林区"},{"v":"3348","n":"翠峦区"},{"v":"3349","n":"新青区"},{"v":"3350","n":"美溪区"},{"v":"3351","n":"金山屯区"},{"v":"3352","n":"五营区"},{"v":"3353","n":"乌马河区"},{"v":"3354","n":"汤旺河区"},{"v":"3355","n":"带岭区"},{"v":"3356","n":"乌伊岭区"},{"v":"3357","n":"红星区"},{"v":"3358","n":"上甘岭区"},{"v":"754","n":"铁力市"},{"v":"755","n":"嘉荫县"}]},{"v":"757","n":"牡丹江市","c":[{"v":"3367","n":"爱民区"},{"v":"3368","n":"东安区"},{"v":"3369","n":"阳明区"},{"v":"3370","n":"西安区"},{"v":"4148","n":"绥芬河市"},{"v":"758","n":"海林市"},{"v":"760","n":"宁安市"},{"v":"761","n":"穆棱市"},{"v":"762","n":"林口县"},{"v":"763","n":"东宁县"}]},{"v":"765","n":"佳木斯市","c":[{"v":"768","n":"桦川县"},{"v":"769","n":"抚远县"},{"v":"770","n":"桦南县"},{"v":"771","n":"汤原县"},{"v":"33269","n":"前进区"},{"v":"33270","n":"向阳区"},{"v":"33271","n":"东风区"},{"v":"33272","n":"郊区"},{"v":"766","n":"同江市"},{"v":"767","n":"富锦市"}]}]},{"v":"11","n":"内蒙古","c":[{"v":"799","n":"呼和浩特市","c":[{"v":"3240","n":"玉泉区"},{"v":"3241","n":"赛罕区"},{"v":"801","n":"土默特左旗"},{"v":"802","n":"和林格尔县"},{"v":"803","n":"武川县"},{"v":"804","n":"托克托县"},{"v":"3133","n":"清水河县"},{"v":"32652","n":"回民区"},{"v":"32653","n":"新城区"}]},{"v":"805","n":"包头市","c":[{"v":"807","n":"固阳县"},{"v":"808","n":"土默特右旗"},{"v":"809","n":"达茂联合旗"},{"v":"38251","n":"东河区"},{"v":"38252","n":"九原区"},{"v":"38253","n":"青山区"},{"v":"38254","n":"昆都仑区"},{"v":"3245","n":"石拐区"},{"v":"3246","n":"白云矿区"}]},{"v":"810","n":"乌海市","c":[{"v":"811","n":"海勃湾区"},{"v":"3248","n":"海南区"},{"v":"3249","n":"乌达区"}]},{"v":"812","n":"赤峰市","c":[{"v":"814","n":"宁城县"},{"v":"815","n":"敖汉旗"},{"v":"816","n":"喀喇沁旗"},{"v":"817","n":"翁牛特旗"},{"v":"818","n":"巴林右旗"},{"v":"819","n":"林西县"},{"v":"820","n":"克什克腾旗"},{"v":"821","n":"巴林左旗"},{"v":"822","n":"阿鲁科尔沁旗"},{"v":"3199","n":"元宝山区"},{"v":"32937","n":"红山区"},{"v":"3251","n":"松山区"}]},{"v":"823","n":"乌兰察布市","c":[{"v":"824","n":"集宁区"},{"v":"825","n":"丰镇市"},{"v":"826","n":"兴和县"},{"v":"827","n":"卓资县"},{"v":"828","n":"商都县"},{"v":"829","n":"凉城县"},{"v":"830","n":"化德县"},{"v":"831","n":"察哈尔右翼前旗"},{"v":"832","n":"察哈尔右翼中旗"},{"v":"833","n":"察哈尔右翼后旗"},{"v":"834","n":"四子王旗"}]},{"v":"835","n":"锡林郭勒盟","c":[{"v":"836","n":"锡林浩特市"},{"v":"837","n":"二连浩特市"},{"v":"838","n":"多伦县"},{"v":"839","n":"阿巴嘎旗"},{"v":"840","n":"西乌珠穆沁旗"},{"v":"841","n":"东乌珠穆沁旗"},{"v":"842","n":"苏尼特右旗"},{"v":"843","n":"苏尼特左旗"},{"v":"844","n":"太仆寺旗"},{"v":"845","n":"正镶白旗"},{"v":"846","n":"正蓝旗"},{"v":"847","n":"镶黄旗"}]},{"v":"848","n":"呼伦贝尔市","c":[{"v":"849","n":"海拉尔区"},{"v":"850","n":"满洲里市"},{"v":"851","n":"牙克石市"},{"v":"852","n":"扎兰屯市"},{"v":"853","n":"根河市"},{"v":"854","n":"额尔古纳市"},{"v":"855","n":"陈巴尔虎旗"},{"v":"856","n":"阿荣旗"},{"v":"857","n":"新巴尔虎左旗"},{"v":"858","n":"新巴尔虎右旗"},{"v":"859","n":"鄂伦春旗"},{"v":"860","n":"莫力达瓦旗"},{"v":"861","n":"鄂温克族旗"}]},{"v":"870","n":"鄂尔多斯市","c":[{"v":"871","n":"东胜区"},{"v":"872","n":"准格尔旗"},{"v":"874","n":"伊金霍洛旗"},{"v":"875","n":"乌审旗"},{"v":"876","n":"杭锦旗"},{"v":"877","n":"鄂托克旗"},{"v":"878","n":"鄂托克前旗"},{"v":"879","n":"达拉特旗"},{"v":"18374","n":"康巴什新区"}]},{"v":"880","n":"巴彦淖尔市","c":[{"v":"881","n":"临河区"},{"v":"882","n":"五原县"},{"v":"883","n":"磴口县"},{"v":"884","n":"杭锦后旗"},{"v":"885","n":"乌拉特中旗"},{"v":"888","n":"乌拉特后旗 "},{"v":"890","n":"乌拉特前旗"}]},{"v":"891","n":"阿拉善盟","c":[{"v":"892","n":"阿拉善右旗"},{"v":"893","n":"阿拉善左旗"},{"v":"894","n":"额济纳旗"}]},{"v":"895","n":"兴安盟","c":[{"v":"896","n":"乌兰浩特市"},{"v":"897","n":"阿尔山市"},{"v":"898","n":"突泉县"},{"v":"899","n":"扎赉特旗"},{"v":"900","n":"科尔沁右翼前旗"},{"v":"901","n":"科尔沁右翼中旗"}]},{"v":"902","n":"通辽市","c":[{"v":"32769","n":"科尔沁区"},{"v":"3142","n":"霍林郭勒市"},{"v":"3252","n":"开鲁县"},{"v":"3253","n":"库伦旗"},{"v":"3254","n":"奈曼旗"},{"v":"3255","n":"扎鲁特旗"},{"v":"3256","n":"科尔沁左翼中旗"},{"v":"3258","n":"科尔沁左翼后旗"}]}]},{"v":"12","n":"江苏","c":[{"v":"904","n":"南京市","c":[{"v":"3373","n":"玄武区"},{"v":"3375","n":"秦淮区"},{"v":"3376","n":"建邺区"},{"v":"3377","n":"鼓楼区"},{"v":"3378","n":"栖霞区"},{"v":"905","n":"江宁区"},{"v":"908","n":"六合区"},{"v":"3379","n":"雨花台区"},{"v":"907","n":"高淳区"},{"v":"3024","n":"溧水区"},{"v":"50647","n":"浦口区"}]},{"v":"911","n":"徐州市","c":[{"v":"3388","n":"贾汪区"},{"v":"4223","n":"金山桥开发区"},{"v":"4224","n":"铜山经济技术开发区"},{"v":"4228","n":"八段工业园区"},{"v":"23686","n":"鼓楼区"},{"v":"23687","n":"邳州市"},{"v":"23688","n":"泉山区"},{"v":"23689","n":"新沂市"},{"v":"23690","n":"云龙区"},{"v":"914","n":"铜山区"},{"v":"915","n":"睢宁县"},{"v":"916","n":"沛县"},{"v":"917","n":"丰县"}]},{"v":"919","n":"连云港市","c":[{"v":"23684","n":"海州区"},{"v":"920","n":"赣榆区"},{"v":"4248","n":"连云区"},{"v":"921","n":"灌云县"},{"v":"922","n":"东海县"},{"v":"923","n":"灌南县"}]},{"v":"925","n":"淮安市","c":[{"v":"4305","n":"经济开发区"},{"v":"926","n":"淮安区"},{"v":"929","n":"洪泽县"},{"v":"930","n":"金湖县"},{"v":"931","n":"盱眙县"},{"v":"36560","n":"清河区"},{"v":"36561","n":"淮阴区"},{"v":"36562","n":"清浦区"},{"v":"36563","n":"涟水县"}]},{"v":"933","n":"宿迁市","c":[{"v":"3407","n":"宿城区"},{"v":"8558","n":"沭阳县"},{"v":"8559","n":"泗阳县"},{"v":"934","n":"宿豫区"},{"v":"937","n":"泗洪县"},{"v":"40649","n":"宿迁经济开发区"}]},{"v":"939","n":"盐城市","c":[{"v":"23681","n":"射阳县"},{"v":"23682","n":"亭湖区"},{"v":"23683","n":"盐都区"},{"v":"940","n":"东台市"},{"v":"941","n":"大丰区"},{"v":"945","n":"建湖县"},{"v":"946","n":"响水县"},{"v":"948","n":"阜宁县"},{"v":"949","n":"滨海县"}]},{"v":"951","n":"扬州市","c":[{"v":"955","n":"广陵区"},{"v":"956","n":"邗江区"},{"v":"957","n":"宝应县"},{"v":"42218","n":"仪征市"},{"v":"42219","n":"高邮市"},{"v":"42220","n":"江都区"}]},{"v":"959","n":"泰州市","c":[{"v":"3406","n":"海陵区"},{"v":"3405","n":"高港区"},{"v":"960","n":"泰兴市"},{"v":"962","n":"靖江市"},{"v":"963","n":"兴化市"},{"v":"40174","n":"姜堰区"}]},{"v":"965","n":"南通市","c":[{"v":"3394","n":"港闸区"},{"v":"3395","n":"崇川区"},{"v":"967","n":"通州区"},{"v":"4385","n":"南通经济技术开发区"},{"v":"970","n":"如东县"},{"v":"2774","n":"海安县"},{"v":"38364","n":"如皋市"},{"v":"38365","n":"海门市"},{"v":"38366","n":"启东市"}]},{"v":"972","n":"镇江市","c":[{"v":"3403","n":"润州区"},{"v":"3404","n":"京口区"},{"v":"976","n":"丹徒区"},{"v":"4916","n":"镇江新区"},{"v":"38517","n":"丹阳市"},{"v":"38518","n":"句容市"},{"v":"973","n":"扬中市"},{"v":"51180","n":"丹徒新区"}]},{"v":"978","n":"常州市","c":[{"v":"3392","n":"钟楼区"},{"v":"3393","n":"天宁区"},{"v":"4459","n":"武进区"},{"v":"2927","n":"新北区"},{"v":"980","n":"金坛区"},{"v":"981","n":"溧阳市"}]},{"v":"984","n":"无锡市","c":[{"v":"3381","n":"崇安区"},{"v":"3382","n":"南长区"},{"v":"3383","n":"北塘区"},{"v":"3384","n":"锡山区"},{"v":"3385","n":"惠山区"},{"v":"4029","n":"新区"},{"v":"13989","n":"江阴市"},{"v":"15943","n":"宜兴市"},{"v":"40035","n":"滨湖区"},{"v":"53561","n":"新吴区"},{"v":"53562","n":"梁溪区"}]},{"v":"988","n":"苏州市","c":[{"v":"993","n":"常熟市"},{"v":"994","n":"张家港市"},{"v":"4346","n":"太仓市"},{"v":"3082","n":"相城区"},{"v":"3083","n":"金阊区"},{"v":"3085","n":"虎丘区"},{"v":"3087","n":"平江区"},{"v":"3088","n":"沧浪区"},{"v":"3444","n":"工业园区"},{"v":"3742","n":"高新区"},{"v":"39628","n":"吴江区"},{"v":"40034","n":"吴中区"},{"v":"53563","n":"姑苏区"},{"v":"47821","n":"昆山市"}]}]},{"v":"13","n":"山东","c":[{"v":"1025","n":"东营市","c":[{"v":"1026","n":"河口区"},{"v":"1027","n":"广饶县"},{"v":"1028","n":"利津县"},{"v":"1029","n":"垦利区"},{"v":"36884","n":"东营区"}]},{"v":"1032","n":"潍坊市","c":[{"v":"28921","n":"潍城区"},{"v":"28922","n":"奎文区"},{"v":"28923","n":"高新区"},{"v":"28924","n":"寒亭区"},{"v":"28925","n":"寿光市"},{"v":"1033","n":"青州市"},{"v":"1034","n":"诸城市"},{"v":"1036","n":"安丘市"},{"v":"1037","n":"高密市"},{"v":"1038","n":"昌邑市"},{"v":"1039","n":"昌乐县"},{"v":"1041","n":"临朐县"},{"v":"3530","n":"坊子区"}]},{"v":"1042","n":"烟台市","c":[{"v":"3528","n":"莱山区"},{"v":"3126","n":"芝罘区"},{"v":"51029","n":"开发区"},{"v":"46504","n":"福山区"},{"v":"46505","n":"牟平区"},{"v":"46506","n":"龙口市"},{"v":"46507","n":"莱州市"},{"v":"1044","n":"莱阳市"},{"v":"1047","n":"招远市"},{"v":"1048","n":"蓬莱市"},{"v":"1049","n":"栖霞市"},{"v":"1050","n":"海阳市"},{"v":"1051","n":"长岛县"}]},{"v":"1053","n":"威海市","c":[{"v":"28928","n":"荣成市"},{"v":"28929","n":"文登市"},{"v":"1054","n":"乳山市"},{"v":"28926","n":"环翠区"}]},{"v":"1058","n":"莱芜市","c":[{"v":"1059","n":"莱城区"},{"v":"3539","n":"钢城区"}]},{"v":"1060","n":"德州市","c":[{"v":"3542","n":"德城区"},{"v":"1069","n":"临邑县"},{"v":"25879","n":"齐河县"},{"v":"1061","n":"乐陵市"},{"v":"1062","n":"禹城市"},{"v":"1063","n":"陵县"},{"v":"1064","n":"宁津县"},{"v":"1066","n":"武城县"},{"v":"1067","n":"庆云县"},{"v":"1068","n":"平原县"},{"v":"1071","n":"夏津县"}]},{"v":"1072","n":"临沂市","c":[{"v":"52023","n":"兰陵县"},{"v":"28930","n":"兰山区"},{"v":"28931","n":"河东区"},{"v":"1073","n":"沂南县"},{"v":"1074","n":"沂水县"},{"v":"1076","n":"费县"},{"v":"1077","n":"平邑县"},{"v":"1078","n":"蒙阴县"},{"v":"1079","n":"临沭县"},{"v":"2926","n":"莒南县"},{"v":"2974","n":"郯城县"},{"v":"3540","n":"罗庄区"}]},{"v":"1081","n":"聊城市","c":[{"v":"25880","n":"东昌府区"},{"v":"1082","n":"临清市"},{"v":"1084","n":"阳谷县"},{"v":"1085","n":"茌平县"},{"v":"1086","n":"莘县"},{"v":"1087","n":"东阿县"},{"v":"1088","n":"冠县"},{"v":"4043","n":"高唐县"}]},{"v":"1090","n":"滨州市","c":[{"v":"25877","n":"北海新区"},{"v":"25878","n":"滨城区"},{"v":"1092","n":"邹平县"},{"v":"1093","n":"沾化县"},{"v":"1094","n":"惠民县"},{"v":"1095","n":"博兴县"},{"v":"1096","n":"阳信县"},{"v":"2772","n":"无棣县"}]},{"v":"1099","n":"菏泽市","c":[{"v":"3543","n":"牡丹区"},{"v":"1101","n":"单县"},{"v":"1102","n":"曹县"},{"v":"1103","n":"定陶县"},{"v":"1104","n":"巨野县"},{"v":"1105","n":"成武县"},{"v":"1106","n":"东明县"},{"v":"1107","n":"郓城县"},{"v":"2773","n":"鄄城县"}]},{"v":"1108","n":"日照市","c":[{"v":"4113","n":"岚山区"},{"v":"4196","n":"新市区"},{"v":"2934","n":"五莲县"},{"v":"28920","n":"东港区"},{"v":"3068","n":"莒县"}]},{"v":"2900","n":"济宁市","c":[{"v":"2908","n":"梁山县"},{"v":"2910","n":"兖州市"},{"v":"2912","n":"微山县"},{"v":"2913","n":"汶上县"},{"v":"2914","n":"泗水县"},{"v":"2915","n":"嘉祥县"},{"v":"2916","n":"鱼台县"},{"v":"2917","n":"金乡县"},{"v":"25713","n":"邹城市"},{"v":"25714","n":"市中区"},{"v":"25715","n":"曲阜市"},{"v":"25728","n":"高新区"},{"v":"3533","n":"任城区"}]},{"v":"1112","n":"泰安市","c":[{"v":"3132","n":"东平县"},{"v":"46665","n":"岱岳区"},{"v":"46666","n":"泰山区"},{"v":"46667","n":"肥城市"},{"v":"46668","n":"新泰市"},{"v":"3535","n":"宁阳县"}]},{"v":"1000","n":"济南市","c":[{"v":"4277","n":"高新区"},{"v":"1002","n":"长清区"},{"v":"40488","n":"历城区"},{"v":"40489","n":"天桥区"},{"v":"40490","n":"槐荫区"},{"v":"40491","n":"历下区"},{"v":"40492","n":"市中区"},{"v":"40493","n":"章丘市"},{"v":"1003","n":"平阴县"},{"v":"1004","n":"济阳县"},{"v":"1005","n":"商河县"}]},{"v":"1007","n":"青岛市","c":[{"v":"3519","n":"四方区"},{"v":"3520","n":"市北区"},{"v":"3521","n":"市南区"},{"v":"5505","n":"黄岛区"},{"v":"4909","n":"李沧区"},{"v":"37916","n":"即墨市"},{"v":"37917","n":"城阳区"},{"v":"37918","n":"崂山区"},{"v":"37919","n":"胶州市"},{"v":"37920","n":"平度市"},{"v":"1014","n":"莱西市"}]},{"v":"1016","n":"淄博市","c":[{"v":"2969","n":"临淄区"},{"v":"47166","n":"张店区"},{"v":"2924","n":"周村区"},{"v":"2962","n":"淄川区"},{"v":"2968","n":"博山区"},{"v":"1019","n":"高青县"},{"v":"1020","n":"沂源县"},{"v":"1021","n":"桓台县"}]},{"v":"1022","n":"枣庄市","c":[{"v":"28932","n":"滕州市"},{"v":"3522","n":"山亭区"},{"v":"3523","n":"台儿庄区"},{"v":"3524","n":"峄城区"},{"v":"3525","n":"薛城区"},{"v":"3526","n":"市中区"}]}]},{"v":"14","n":"安徽","c":[{"v":"1114","n":"铜陵市","c":[{"v":"52830","n":"铜官区"},{"v":"52832","n":"枞阳县"},{"v":"19784","n":"郊区"},{"v":"19786","n":"义安区"}]},{"v":"1116","n":"合肥市","c":[{"v":"3431","n":"包河区"},{"v":"3432","n":"蜀山区"},{"v":"3433","n":"瑶海区"},{"v":"3434","n":"庐阳区"},{"v":"6118","n":"滨湖新区"},{"v":"4173","n":"经济技术开发区"},{"v":"4192","n":"高新技术开发区"},{"v":"6120","n":"新站综合开发试验区"},{"v":"36173","n":"肥西县"},{"v":"6119","n":"政务文化新区"},{"v":"49709","n":"巢湖市"},{"v":"49710","n":"长丰县"},{"v":"1119","n":"肥东县"},{"v":"1190","n":"庐江县"},{"v":"6117","n":"北城新区"}]},{"v":"1121","n":"淮南市","c":[{"v":"4960","n":"淮南高新技术开发区"},{"v":"3447","n":"田家庵区"},{"v":"3448","n":"大通区"},{"v":"3449","n":"谢家集区"},{"v":"3450","n":"八公山区"},{"v":"52831","n":"寿县"},{"v":"1122","n":"凤台县"},{"v":"3451","n":"潘集区"}]},{"v":"1124","n":"淮北市","c":[{"v":"19223","n":"杜集区"},{"v":"19224","n":"烈山区"},{"v":"19225","n":"濉溪县"},{"v":"19226","n":"相山区"}]},{"v":"1127","n":"芜湖市","c":[{"v":"3438","n":"镜湖区"},{"v":"4172","n":"弋江区"},{"v":"1189","n":"无为县"},{"v":"1128","n":"芜湖县"},{"v":"1129","n":"繁昌县"},{"v":"1130","n":"南陵县"},{"v":"49137","n":"鸠江区"},{"v":"49138","n":"三山区"}]},{"v":"1132","n":"蚌埠市","c":[{"v":"3442","n":"蚌山区"},{"v":"1133","n":"怀远县"},{"v":"1134","n":"固镇县"},{"v":"1135","n":"五河县"},{"v":"18549","n":"淮上区"},{"v":"18550","n":"龙子湖区"},{"v":"18551","n":"禹会区"}]},{"v":"1137","n":"马鞍山市","c":[{"v":"6963","n":"博望区"},{"v":"49253","n":"花山区"},{"v":"49254","n":"雨山区"},{"v":"1138","n":"当涂县"},{"v":"1187","n":"含山县"},{"v":"1188","n":"和县"}]},{"v":"1140","n":"安庆市","c":[{"v":"1141","n":"桐城市"},{"v":"1142","n":"宿松县"},{"v":"1144","n":"太湖县"},{"v":"1145","n":"怀宁县"},{"v":"1146","n":"岳西县"},{"v":"1147","n":"望江县"},{"v":"1148","n":"潜山县"},{"v":"18375","n":"大观区"},{"v":"18376","n":"宜秀区"},{"v":"18377","n":"迎江区"}]},{"v":"1151","n":"黄山市","c":[{"v":"19227","n":"徽州区"},{"v":"19228","n":"屯溪区"},{"v":"1153","n":"休宁县"},{"v":"1154","n":"歙县"},{"v":"1155","n":"黟县"},{"v":"1156","n":"祁门县"},{"v":"3464","n":"黄山区"}]},{"v":"1159","n":"滁州市","c":[{"v":"18715","n":"琅琊区"},{"v":"18716","n":"天长市"},{"v":"1161","n":"明光市"},{"v":"1162","n":"全椒县"},{"v":"1163","n":"来安县"},{"v":"3467","n":"南谯区"},{"v":"1164","n":"定远县"},{"v":"1165","n":"凤阳县"}]},{"v":"1167","n":"阜阳市","c":[{"v":"4832","n":"经济开发区"},{"v":"1168","n":"界首市"},{"v":"1169","n":"太和县"},{"v":"1170","n":"阜南县"},{"v":"1171","n":"颍上县"},{"v":"1172","n":"临泉县"},{"v":"19158","n":"颍泉区"},{"v":"19159","n":"颍州区"},{"v":"19160","n":"颍东区"}]},{"v":"1174","n":"亳州市","c":[{"v":"1176","n":"利辛县"},{"v":"1177","n":"蒙城县"},{"v":"1178","n":"涡阳县"},{"v":"18627","n":"谯城区"}]},{"v":"2971","n":"宣城市","c":[{"v":"3128","n":"旌德县"},{"v":"3147","n":"宁国市"},{"v":"3477","n":"郎溪县"},{"v":"3478","n":"广德县"},{"v":"3479","n":"绩溪县"},{"v":"2972","n":"泾县"},{"v":"19684","n":"宣州区"}]},{"v":"1180","n":"宿州市","c":[{"v":"6006","n":"经济开发区"},{"v":"19575","n":"埇桥区"},{"v":"1181","n":"灵璧县"},{"v":"1182","n":"泗县"},{"v":"1183","n":"萧县"},{"v":"1184","n":"砀山县"}]},{"v":"1201","n":"池州市","c":[{"v":"18714","n":"贵池区"},{"v":"1202","n":"东至县"},{"v":"1203","n":"石台县"},{"v":"1204","n":"青阳县"}]},{"v":"1206","n":"六安市","c":[{"v":"1208","n":"霍山县"},{"v":"1209","n":"金寨县"},{"v":"1210","n":"霍邱县"},{"v":"1211","n":"舒城县"},{"v":"18912","n":"金安区"},{"v":"18913","n":"裕安区"}]}]},{"v":"15","n":"浙江","c":[{"v":"1280","n":"丽水市","c":[{"v":"1281","n":"龙泉市"},{"v":"1282","n":"缙云县"},{"v":"1283","n":"遂昌县"},{"v":"1284","n":"松阳县"},{"v":"1285","n":"景宁县"},{"v":"1286","n":"云和县"},{"v":"1288","n":"青田县"},{"v":"22043","n":"莲都区"},{"v":"3045","n":"庆元县"}]},{"v":"1290","n":"台州市","c":[{"v":"1291","n":"临海市"},{"v":"1294","n":"三门县"},{"v":"1295","n":"天台县"},{"v":"1296","n":"仙居县"},{"v":"22046","n":"黄岩区"},{"v":"22047","n":"椒江区"},{"v":"22048","n":"路桥区"},{"v":"22049","n":"温岭市"},{"v":"22050","n":"玉环县"}]},{"v":"1298","n":"舟山市","c":[{"v":"1300","n":"岱山县"},{"v":"1301","n":"嵊泗县"},{"v":"42565","n":"普陀区"},{"v":"42566","n":"定海区"}]},{"v":"1158","n":"宁波市","c":[{"v":"3412","n":"海曙区"},{"v":"3413","n":"江东区"},{"v":"4253","n":"高新科技开发区"},{"v":"1224","n":"慈溪市"},{"v":"46341","n":"北仑区"},{"v":"46342","n":"镇海区"},{"v":"46343","n":"鄞州区"},{"v":"46344","n":"江北区"},{"v":"46345","n":"余姚市"},{"v":"1226","n":"奉化市"},{"v":"1227","n":"宁海县"},{"v":"1228","n":"象山县"}]},{"v":"1213","n":"杭州市","c":[{"v":"3408","n":"上城区"},{"v":"3409","n":"下城区"},{"v":"3410","n":"拱墅区"},{"v":"3411","n":"西湖区"},{"v":"2963","n":"江干区"},{"v":"4285","n":"下沙区"},{"v":"1214","n":"余杭区"},{"v":"1215","n":"萧山区"},{"v":"3038","n":"滨江区"},{"v":"49711","n":"临安市"},{"v":"1217","n":"富阳区"},{"v":"1218","n":"桐庐县"},{"v":"1219","n":"建德市"},{"v":"1220","n":"淳安县"}]},{"v":"1233","n":"温州市","c":[{"v":"3416","n":"龙湾区"},{"v":"4342","n":"茶山高教园区"},{"v":"42321","n":"瑞安市"},{"v":"42322","n":"乐清市"},{"v":"42323","n":"鹿城区"},{"v":"42324","n":"瓯海区"},{"v":"42325","n":"永嘉县"},{"v":"1237","n":"文成县"},{"v":"1238","n":"平阳县"},{"v":"1239","n":"泰顺县"},{"v":"1240","n":"洞头区"},{"v":"1241","n":"苍南县"}]},{"v":"1243","n":"嘉兴市","c":[{"v":"4429","n":"桐乡市"},{"v":"4430","n":"平湖市"},{"v":"4431","n":"嘉善县"},{"v":"3418","n":"南湖区"},{"v":"3419","n":"秀洲区"},{"v":"1244","n":"海宁市"},{"v":"1248","n":"海盐县"}]},{"v":"1250","n":"湖州市","c":[{"v":"4130","n":"南浔区"},{"v":"44189","n":"吴兴区"},{"v":"1251","n":"长兴县"},{"v":"1252","n":"德清县"},{"v":"1253","n":"安吉县"}]},{"v":"1255","n":"绍兴市","c":[{"v":"15944","n":"柯桥区"},{"v":"44188","n":"越城区"},{"v":"1257","n":"诸暨市"},{"v":"1258","n":"上虞区"},{"v":"1259","n":"嵊州市"},{"v":"1260","n":"新昌县"}]},{"v":"1262","n":"金华市","c":[{"v":"1263","n":"金东区"},{"v":"1265","n":"婺城区"},{"v":"1264","n":"兰溪市"},{"v":"1269","n":"武义县"},{"v":"1270","n":"浦江县"},{"v":"1271","n":"磐安县"},{"v":"1266","n":"义乌市"},{"v":"1268","n":"永康市"},{"v":"1267","n":"东阳市"}]},{"v":"1273","n":"衢州市","c":[{"v":"22044","n":"柯城区"},{"v":"22045","n":"衢江区"},{"v":"1275","n":"江山市"},{"v":"1276","n":"常山县"},{"v":"1277","n":"开化县"},{"v":"1278","n":"龙游县"}]}]},{"v":"16","n":"福建","c":[{"v":"1303","n":"福州市","c":[{"v":"3483","n":"台江区"},{"v":"3484","n":"鼓楼区"},{"v":"48712","n":"晋安区"},{"v":"48713","n":"仓山区"},{"v":"48714","n":"马尾区"},{"v":"48715","n":"福清市"},{"v":"48716","n":"闽侯县"},{"v":"1305","n":"长乐市"},{"v":"1308","n":"平潭县"},{"v":"1309","n":"连江县"},{"v":"1312","n":"罗源县"},{"v":"1313","n":"永泰县"},{"v":"1314","n":"闽清县"}]},{"v":"1315","n":"厦门市","c":[{"v":"1316","n":"思明区"},{"v":"3486","n":"湖里区"},{"v":"3489","n":"翔安区"},{"v":"46763","n":"海沧区"},{"v":"46764","n":"集美区"},{"v":"46765","n":"同安区"}]},{"v":"1317","n":"三明市","c":[{"v":"1319","n":"永安市"},{"v":"1320","n":"明溪县"},{"v":"1321","n":"将乐县"},{"v":"1322","n":"大田县"},{"v":"1323","n":"宁化县"},{"v":"1324","n":"建宁县"},{"v":"1325","n":"沙县"},{"v":"1326","n":"尤溪县"},{"v":"1327","n":"清流县"},{"v":"1328","n":"泰宁县"},{"v":"22463","n":"梅列区"},{"v":"22464","n":"三元区"}]},{"v":"1329","n":"莆田市","c":[{"v":"1331","n":"仙游县"},{"v":"46146","n":"城厢区"},{"v":"46147","n":"荔城区"},{"v":"3492","n":"秀屿区"},{"v":"3022","n":"涵江区"}]},{"v":"1332","n":"泉州市","c":[{"v":"3117","n":"泉港区"},{"v":"1334","n":"石狮市"},{"v":"1336","n":"南安市"},{"v":"1337","n":"惠安县"},{"v":"1338","n":"安溪县"},{"v":"1339","n":"德化县"},{"v":"1340","n":"永春县"},{"v":"3495","n":"金门县"},{"v":"3498","n":"洛江区"},{"v":"42930","n":"鲤城区"},{"v":"42931","n":"丰泽区"},{"v":"42932","n":"晋江市"}]},{"v":"1341","n":"漳州市","c":[{"v":"3499","n":"芗城区"},{"v":"3500","n":"龙文区"},{"v":"1343","n":"龙海市"},{"v":"1344","n":"平和县"},{"v":"1345","n":"南靖县"},{"v":"1346","n":"诏安县"},{"v":"1347","n":"漳浦县"},{"v":"1348","n":"华安县"},{"v":"1349","n":"云霄县"},{"v":"1350","n":"东山县"},{"v":"1351","n":"长泰县"}]},{"v":"1352","n":"南平市","c":[{"v":"1354","n":"建瓯市"},{"v":"1355","n":"邵武市"},{"v":"1356","n":"武夷山市"},{"v":"1357","n":"建阳市"},{"v":"1358","n":"松溪县"},{"v":"1359","n":"顺昌县"},{"v":"1360","n":"浦城县"},{"v":"1361","n":"政和县"},{"v":"2956","n":"光泽县"},{"v":"22465","n":"延平区"}]},{"v":"1362","n":"龙岩市","c":[{"v":"44319","n":"新罗区"},{"v":"1364","n":"漳平市"},{"v":"1365","n":"长汀县"},{"v":"1366","n":"武平县"},{"v":"1367","n":"永定县"},{"v":"1368","n":"上杭县"},{"v":"1369","n":"连城县"}]},{"v":"1370","n":"宁德市","c":[{"v":"46145","n":"蕉城区"},{"v":"46164","n":"东侨开发区"},{"v":"1372","n":"福安市"},{"v":"1373","n":"福鼎市"},{"v":"1374","n":"寿宁县"},{"v":"1375","n":"霞浦县"},{"v":"1376","n":"柘荣县"},{"v":"1377","n":"屏南县"},{"v":"1378","n":"古田县"},{"v":"1379","n":"周宁县"}]}]},{"v":"17","n":"湖北","c":[{"v":"3154","n":"神农架林区","c":[{"v":"23610","n":"松柏镇"},{"v":"23611","n":"阳日镇"},{"v":"23612","n":"木鱼镇"},{"v":"23613","n":"红坪镇"},{"v":"23614","n":"新华镇"},{"v":"23615","n":"宋洛乡"},{"v":"23616","n":"九湖乡"},{"v":"23617","n":"下谷坪乡"}]},{"v":"1381","n":"武汉市","c":[{"v":"3583","n":"硚口区"},{"v":"3079","n":"武昌区"},{"v":"4424","n":"武汉经济技术开发区"},{"v":"1386","n":"江岸区"},{"v":"3582","n":"江汉区"},{"v":"50712","n":"蔡甸区"},{"v":"50713","n":"江夏区"},{"v":"50714","n":"新洲区"},{"v":"50715","n":"黄陂区"},{"v":"50716","n":"汉阳区"},{"v":"50717","n":"青山区"},{"v":"50718","n":"洪山区"},{"v":"50719","n":"汉南区"},{"v":"50720","n":"东西湖区"}]},{"v":"2922","n":"潜江市","c":[{"v":"23585","n":"园林"},{"v":"23586","n":"杨市"},{"v":"23587","n":"周矶"},{"v":"23588","n":"广华"},{"v":"23589","n":"泰丰"},{"v":"23590","n":"竹根滩镇"},{"v":"23591","n":"高石碑镇"},{"v":"23592","n":"积玉口镇"},{"v":"23593","n":"渔洋镇"},{"v":"23594","n":"王场镇"},{"v":"23595","n":"熊口镇"},{"v":"23596","n":"老新镇"},{"v":"23597","n":"浩口镇"},{"v":"23598","n":"张金镇"},{"v":"23599","n":"龙湾镇"},{"v":"23600","n":"江汉石油管理局"},{"v":"23601","n":"潜江经济开发区"},{"v":"23602","n":"西大垸管理区"},{"v":"23603","n":"运粮湖管理区"},{"v":"23604","n":"周矶管理区"},{"v":"23605","n":"后湖管理区"},{"v":"23606","n":"熊口管理区"},{"v":"23607","n":"总口管理区"},{"v":"23608","n":"高场原种场"},{"v":"23609","n":"浩口原种场"}]},{"v":"1387","n":"黄石市","c":[{"v":"1389","n":"黄石港区"},{"v":"43272","n":"下陆区"},{"v":"43273","n":"西塞山区"},{"v":"1392","n":"铁山区"},{"v":"1393","n":"大冶市"},{"v":"1394","n":"阳新县"},{"v":"43291","n":"经济技术开发区"}]},{"v":"1396","n":"襄阳市","c":[{"v":"1397","n":"老河口市"},{"v":"1398","n":"枣阳市"},{"v":"1399","n":"宜城市"},{"v":"1401","n":"南漳县"},{"v":"1402","n":"保康县"},{"v":"1403","n":"谷城县"},{"v":"23282","n":"樊城区"},{"v":"23283","n":"襄城区"},{"v":"23284","n":"襄州区"}]},{"v":"1405","n":"十堰市","c":[{"v":"1406","n":"丹江口市"},{"v":"1407","n":"房县"},{"v":"1408","n":"竹山县"},{"v":"1409","n":"竹溪县"},{"v":"1410","n":"郧县"},{"v":"1411","n":"郧西县"},{"v":"23429","n":"茅箭区"},{"v":"23430","n":"张湾区"}]},{"v":"1413","n":"荆州市","c":[{"v":"3593","n":"沙市区"},{"v":"4078","n":"荆州区"},{"v":"1414","n":"江陵县"},{"v":"1415","n":"洪湖市"},{"v":"1416","n":"石首市"},{"v":"1417","n":"松滋市"},{"v":"1418","n":"监利县"},{"v":"1419","n":"公安县"}]},{"v":"1421","n":"宜昌市","c":[{"v":"3597","n":"伍家岗区"},{"v":"3598","n":"西陵区"},{"v":"3594","n":"宜都市"},{"v":"3595","n":"猇亭区"},{"v":"3596","n":"点军区"},{"v":"1423","n":"当阳市"},{"v":"1424","n":"枝江市"},{"v":"1425","n":"夷陵区"},{"v":"1426","n":"秭归县"},{"v":"1427","n":"兴山县"},{"v":"1428","n":"远安县"},{"v":"1429","n":"五峰土家族自治县"},{"v":"1430","n":"长阳土家族自治县"}]},{"v":"1432","n":"孝感市","c":[{"v":"1435","n":"汉川市"},{"v":"1437","n":"云梦县"},{"v":"1438","n":"大悟县"},{"v":"1439","n":"孝昌县"},{"v":"45215","n":"孝南区"},{"v":"45216","n":"应城市"},{"v":"45217","n":"安陆市"}]},{"v":"1441","n":"黄冈市","c":[{"v":"41908","n":"黄州区"},{"v":"41909","n":"蕲春县"},{"v":"41910","n":"麻城市"},{"v":"41911","n":"武穴市"},{"v":"41912","n":"浠水县"},{"v":"1444","n":"红安县"},{"v":"1445","n":"罗田县"},{"v":"1447","n":"黄梅县"},{"v":"1448","n":"英山县"},{"v":"1449","n":"团风县"}]},{"v":"2980","n":"天门市","c":[{"v":"23618","n":"侨乡街道开发区"},{"v":"23619","n":"竟陵街道"},{"v":"23620","n":"杨林街道"},{"v":"23621","n":"佛子山镇"},{"v":"23622","n":"多宝镇"},{"v":"23623","n":"拖市镇"},{"v":"23624","n":"张港镇"},{"v":"23625","n":"蒋场镇"},{"v":"23626","n":"汪场镇"},{"v":"23627","n":"渔薪镇"},{"v":"23628","n":"黄潭镇"},{"v":"23629","n":"岳口镇"},{"v":"23630","n":"横林镇"},{"v":"23631","n":"彭市镇"},{"v":"23632","n":"麻洋镇"},{"v":"23633","n":"多祥镇"},{"v":"23634","n":"干驿镇"},{"v":"23635","n":"马湾镇"},{"v":"23636","n":"卢市镇"},{"v":"23637","n":"小板镇"},{"v":"23638","n":"九真镇"},{"v":"23639","n":"皂市镇"},{"v":"23640","n":"胡市镇"},{"v":"23641","n":"石河镇"},{"v":"23642","n":"净潭乡"},{"v":"23643","n":"蒋湖农场"},{"v":"23644","n":"白茅湖农场"},{"v":"23645","n":"沉湖管委会"}]},{"v":"2983","n":"仙桃市","c":[{"v":"52306","n":"城区"},{"v":"23649","n":"郑场镇"},{"v":"23650","n":"毛嘴镇"},{"v":"23651","n":"豆河镇"},{"v":"23652","n":"三伏潭镇"},{"v":"23653","n":"胡场镇"},{"v":"23654","n":"长埫口镇"},{"v":"23655","n":"西流河镇"},{"v":"23656","n":"沙湖镇"},{"v":"23657","n":"杨林尾镇"},{"v":"23658","n":"彭场镇"},{"v":"23659","n":"张沟镇"},{"v":"23660","n":"郭河镇"},{"v":"23661","n":"沔城镇"},{"v":"23662","n":"通海口镇"},{"v":"23663","n":"陈场镇"},{"v":"23664","n":"工业园区"},{"v":"23665","n":"九合垸原种场"},{"v":"23666","n":"沙湖原种场"},{"v":"23667","n":"排湖渔场"},{"v":"23668","n":"五湖渔场"},{"v":"23669","n":"赵西垸林场"},{"v":"23670","n":"刘家垸林场"},{"v":"23671","n":"畜禽良种场"}]},{"v":"1458","n":"咸宁市","c":[{"v":"43387","n":"咸安区"},{"v":"43388","n":"赤壁市"},{"v":"1461","n":"嘉鱼县"},{"v":"1462","n":"通山县"},{"v":"1463","n":"崇阳县"},{"v":"1464","n":"通城县"}]},{"v":"1466","n":"恩施州","c":[{"v":"1467","n":"恩施市"},{"v":"1468","n":"利川市"},{"v":"1469","n":"建始县"},{"v":"1470","n":"来凤县"},{"v":"1471","n":"巴东县"},{"v":"1472","n":"鹤峰县"},{"v":"1473","n":"宣恩县"},{"v":"1474","n":"咸丰县"}]},{"v":"1475","n":"鄂州市","c":[{"v":"3601","n":"梁子湖区"},{"v":"3602","n":"华容区"},{"v":"41907","n":"鄂城区"}]},{"v":"1477","n":"荆门市","c":[{"v":"3600","n":"东宝区"},{"v":"3599","n":"掇刀区"},{"v":"2973","n":"钟祥市"},{"v":"1478","n":"京山县"},{"v":"3055","n":"沙洋县"}]},{"v":"1479","n":"随州市","c":[{"v":"3164","n":"曾都区"},{"v":"3163","n":"广水市"},{"v":"7357","n":"随县"}]}]},{"v":"18","n":"湖南","c":[{"v":"1540","n":"张家界市","c":[{"v":"1541","n":"慈利县"},{"v":"1542","n":"桑植县"},{"v":"1543","n":"武陵源区"},{"v":"3622","n":"永定区"}]},{"v":"1544","n":"郴州市","c":[{"v":"1545","n":"资兴市"},{"v":"1546","n":"宜章县"},{"v":"1547","n":"安仁县"},{"v":"1548","n":"汝城县"},{"v":"1549","n":"嘉禾县"},{"v":"1550","n":"临武县"},{"v":"1551","n":"桂东县"},{"v":"1552","n":"永兴县"},{"v":"1553","n":"桂阳县"},{"v":"29465","n":"北湖区"},{"v":"29466","n":"苏仙区"}]},{"v":"1555","n":"益阳市","c":[{"v":"1556","n":"南县"},{"v":"1557","n":"桃江县"},{"v":"1558","n":"安化县"},{"v":"29463","n":"赫山区"},{"v":"29464","n":"资阳区"},{"v":"1565","n":"沅江市"}]},{"v":"1560","n":"永州市","c":[{"v":"29454","n":"冷水滩区"},{"v":"1563","n":"祁阳县"},{"v":"1564","n":"双牌县"},{"v":"1566","n":"道县"},{"v":"1567","n":"江永县"},{"v":"1568","n":"江华县"},{"v":"1569","n":"宁远县"},{"v":"1570","n":"新田县"},{"v":"1571","n":"蓝山县"},{"v":"1572","n":"东安县"},{"v":"1573","n":"零陵区"}]},{"v":"1574","n":"怀化市","c":[{"v":"29455","n":"鹤城区"},{"v":"1575","n":"洪江市"},{"v":"1576","n":"会同县"},{"v":"1578","n":"溆浦县"},{"v":"3626","n":"中方县"},{"v":"1579","n":"辰溪县"},{"v":"1580","n":"靖州县"},{"v":"1581","n":"通道县"},{"v":"1582","n":"芷江县"},{"v":"1583","n":"新晃县"},{"v":"1584","n":"麻阳县"},{"v":"3070","n":"沅陵县"}]},{"v":"1586","n":"娄底市","c":[{"v":"29456","n":"娄星区"},{"v":"1588","n":"冷水江市"},{"v":"1589","n":"涟源市"},{"v":"1590","n":"新化县"},{"v":"1591","n":"双峰县"}]},{"v":"1592","n":"湘西州","c":[{"v":"1593","n":"吉首市"},{"v":"1594","n":"古丈县"},{"v":"1595","n":"龙山县"},{"v":"1596","n":"永顺县"},{"v":"1597","n":"泸溪县"},{"v":"1598","n":"凤凰县"},{"v":"1599","n":"花垣县"},{"v":"1600","n":"保靖县"}]},{"v":"1482","n":"长沙市","c":[{"v":"3606","n":"芙蓉区"},{"v":"48936","n":"岳麓区"},{"v":"48937","n":"雨花区"},{"v":"48938","n":"开福区"},{"v":"48939","n":"天心区"},{"v":"48941","n":"浏阳市"},{"v":"48942","n":"长沙县"},{"v":"48943","n":"宁乡县"},{"v":"1485","n":"望城区"}]},{"v":"1488","n":"株洲市","c":[{"v":"29444","n":"天元区"},{"v":"29445","n":"石峰区"},{"v":"29446","n":"芦淞区"},{"v":"29447","n":"荷塘区"},{"v":"1489","n":"醴陵市"},{"v":"1490","n":"株洲县"},{"v":"1491","n":"攸县"},{"v":"1492","n":"茶陵县"},{"v":"1493","n":"炎陵县"}]},{"v":"1495","n":"湘潭市","c":[{"v":"29448","n":"雨湖区"},{"v":"29449","n":"岳塘区"},{"v":"1496","n":"湘乡市"},{"v":"1497","n":"湘潭县"},{"v":"1498","n":"韶山市"}]},{"v":"1501","n":"衡阳市","c":[{"v":"29450","n":"蒸湘区"},{"v":"29451","n":"石鼓区"},{"v":"29452","n":"珠晖区"},{"v":"29453","n":"雁峰区"},{"v":"1502","n":"常宁市"},{"v":"1503","n":"衡阳县"},{"v":"1504","n":"耒阳市"},{"v":"1505","n":"衡东县"},{"v":"1506","n":"衡南县"},{"v":"1507","n":"衡山县"},{"v":"1508","n":"祁东县"},{"v":"1509","n":"南岳区"}]},{"v":"1511","n":"邵阳市","c":[{"v":"29457","n":"大祥区"},{"v":"29458","n":"双清区"},{"v":"29459","n":"北塔区"},{"v":"1512","n":"武冈市"},{"v":"1513","n":"邵东县"},{"v":"1514","n":"洞口县"},{"v":"1515","n":"新邵县"},{"v":"1516","n":"绥宁县"},{"v":"1517","n":"新宁县"},{"v":"1518","n":"邵阳县"},{"v":"1519","n":"隆回县"},{"v":"1520","n":"城步县"}]},{"v":"1522","n":"岳阳市","c":[{"v":"29460","n":"岳阳楼区"},{"v":"3619","n":"君山区"},{"v":"3620","n":"云溪区"},{"v":"1523","n":"临湘市"},{"v":"1524","n":"汨罗市"},{"v":"1525","n":"岳阳县"},{"v":"1526","n":"湘阴县"},{"v":"1527","n":"华容县"},{"v":"1528","n":"平江县"}]},{"v":"1530","n":"常德市","c":[{"v":"1536","n":"汉寿县"},{"v":"1537","n":"石门县"},{"v":"1538","n":"安乡县"},{"v":"29461","n":"鼎城区"},{"v":"29462","n":"武陵区"},{"v":"1532","n":"津市市"},{"v":"1533","n":"澧县"},{"v":"1534","n":"临澧县"},{"v":"1535","n":"桃源县"}]}]},{"v":"19","n":"广东","c":[{"v":"1601","n":"广州市","c":[{"v":"3633","n":"天河区"},{"v":"3634","n":"海珠区"},{"v":"3635","n":"荔湾区"},{"v":"3637","n":"越秀区"},{"v":"36953","n":"番禺区"},{"v":"50256","n":"花都区"},{"v":"50258","n":"白云区"},{"v":"50259","n":"南沙区"},{"v":"50283","n":"黄埔区"},{"v":"50284","n":"增城区"},{"v":"50285","n":"从化区"},{"v":"51091","n":"广州大学城"}]},{"v":"1607","n":"深圳市","c":[{"v":"3638","n":"罗湖区"},{"v":"3639","n":"福田区"},{"v":"3155","n":"南山区"},{"v":"4773","n":"宝安区"},{"v":"6675","n":"光明新区"},{"v":"40152","n":"龙岗区"},{"v":"6736","n":"坪山新区"},{"v":"47387","n":"盐田区"},{"v":"47388","n":"龙华新区"},{"v":"6737","n":"大鹏新区"}]},{"v":"1609","n":"珠海市","c":[{"v":"41653","n":"斗门区"},{"v":"41654","n":"金湾区"},{"v":"41655","n":"香洲区"}]},{"v":"1611","n":"汕头市","c":[{"v":"19916","n":"龙湖区"},{"v":"19917","n":"金平区"},{"v":"19918","n":"澄海区"},{"v":"19919","n":"潮阳区"},{"v":"19920","n":"潮南区"},{"v":"19921","n":"濠江区"},{"v":"1614","n":"南澳县"}]},{"v":"1617","n":"韶关市","c":[{"v":"3643","n":"武江区"},{"v":"3644","n":"浈江区"},{"v":"1618","n":"南雄市"},{"v":"1619","n":"乐昌市"},{"v":"1620","n":"仁化县"},{"v":"1621","n":"始兴县"},{"v":"1622","n":"翁源县"},{"v":"1624","n":"新丰县"},{"v":"1625","n":"乳源瑶族自治县"},{"v":"1626","n":"曲江区"}]},{"v":"1627","n":"河源市","c":[{"v":"1628","n":"和平县"},{"v":"1629","n":"龙川县"},{"v":"1630","n":"紫金县"},{"v":"1631","n":"连平县"},{"v":"37864","n":"源城区"},{"v":"37865","n":"东源县"}]},{"v":"1634","n":"梅州市","c":[{"v":"1642","n":"梅江区"},{"v":"1635","n":"兴宁市"},{"v":"1636","n":"梅县"},{"v":"1637","n":"蕉岭县"},{"v":"1638","n":"大埔县"},{"v":"1639","n":"丰顺县"},{"v":"1640","n":"五华县"},{"v":"1641","n":"平远县"}]},{"v":"1643","n":"惠州市","c":[{"v":"36174","n":"惠阳区"},{"v":"36175","n":"大亚湾区"},{"v":"36176","n":"惠城区"},{"v":"36177","n":"惠东县"},{"v":"36178","n":"博罗县"},{"v":"1647","n":"龙门县"}]},{"v":"1650","n":"汕尾市","c":[{"v":"20051","n":"城区"},{"v":"20052","n":"陆丰市"},{"v":"1653","n":"陆河县"},{"v":"3037","n":"海丰县"}]},{"v":"1655","n":"东莞市","c":[{"v":"4760","n":"长安镇"},{"v":"4255","n":"莞城区"},{"v":"4256","n":"南城区"},{"v":"4866","n":"寮步镇"},{"v":"4871","n":"大岭山镇"},{"v":"5905","n":"横沥镇"},{"v":"4886","n":"常平镇"},{"v":"4910","n":"厚街镇"},{"v":"4911","n":"万江区"},{"v":"4932","n":"樟木头镇"},{"v":"5457","n":"塘厦镇"},{"v":"5473","n":"凤岗镇"},{"v":"4980","n":"大朗镇"},{"v":"3041","n":"东坑镇"},{"v":"5869","n":"清溪镇"},{"v":"3105","n":"企石镇"},{"v":"3171","n":"茶山镇"},{"v":"36102","n":"东城区"},{"v":"39462","n":"虎门镇"},{"v":"39461","n":"黄江镇"},{"v":"3104","n":"石排镇"},{"v":"3078","n":"道滘镇"},{"v":"3097","n":"沙田镇"},{"v":"3100","n":"高埗镇"},{"v":"3102","n":"石龙镇"},{"v":"3111","n":"石碣镇"},{"v":"3116","n":"洪梅镇"},{"v":"3120","n":"麻涌镇"},{"v":"4147","n":"松山湖"},{"v":"3134","n":"桥头镇"},{"v":"3151","n":"望牛墩镇"},{"v":"2950","n":"中堂镇"},{"v":"4087","n":"谢岗镇"}]},{"v":"1657","n":"中山市","c":[{"v":"52093","n":"城区"},{"v":"4852","n":"火炬开发区"},{"v":"2902","n":"小榄镇"},{"v":"2957","n":"古镇"},{"v":"3016","n":"三乡镇"},{"v":"8540","n":"民众镇"},{"v":"3067","n":"东凤镇"},{"v":"4102","n":"板芙镇"},{"v":"4127","n":"神湾镇"},{"v":"3112","n":"横栏镇"},{"v":"4141","n":"港口镇"},{"v":"3143","n":"三角镇"},{"v":"4190","n":"大涌镇"},{"v":"3176","n":"南头镇"},{"v":"3743","n":"沙溪镇"},{"v":"3001","n":"坦洲镇"},{"v":"3007","n":"黄圃镇"},{"v":"4042","n":"五桂山镇"},{"v":"2777","n":"南朗镇"},{"v":"39653","n":"沙朗镇"},{"v":"4076","n":"阜沙镇"},{"v":"4080","n":"东升镇"}]},{"v":"1659","n":"江门市","c":[{"v":"37258","n":"台山市"},{"v":"37259","n":"新会区"},{"v":"37260","n":"鹤山市"},{"v":"37261","n":"江海区"},{"v":"37262","n":"蓬江区"},{"v":"37263","n":"开平市"},{"v":"37264","n":"恩平市"}]},{"v":"1666","n":"佛山市","c":[{"v":"1669","n":"顺德区"},{"v":"36264","n":"禅城区"},{"v":"36265","n":"高明区"},{"v":"36266","n":"三水区"},{"v":"36267","n":"南海区"}]},{"v":"1672","n":"阳江市","c":[{"v":"19827","n":"江城区"},{"v":"19828","n":"阳东县"},{"v":"1673","n":"阳春市"},{"v":"1674","n":"阳西县"}]},{"v":"1677","n":"湛江市","c":[{"v":"19377","n":"赤坎区"},{"v":"19378","n":"霞山区"},{"v":"19379","n":"经济技术开发区"},{"v":"19380","n":"麻章区"},{"v":"19381","n":"遂溪县"},{"v":"19382","n":"廉江市"},{"v":"3646","n":"坡头区"},{"v":"1679","n":"雷州市"},{"v":"1680","n":"吴川市"},{"v":"1682","n":"徐闻县"}]},{"v":"1684","n":"茂名市","c":[{"v":"19465","n":"茂南区"},{"v":"19466","n":"电白县"},{"v":"19467","n":"高州市"},{"v":"19468","n":"化州市"},{"v":"19469","n":"茂港区"},{"v":"1687","n":"信宜市"}]},{"v":"1690","n":"肇庆市","c":[{"v":"4781","n":"端州区"},{"v":"39723","n":"四会市"},{"v":"39725","n":"高要市"},{"v":"1693","n":"广宁县"},{"v":"1694","n":"德庆县"},{"v":"1695","n":"怀集县"},{"v":"1696","n":"封开县"},{"v":"1697","n":"鼎湖区"}]},{"v":"1698","n":"云浮市","c":[{"v":"19829","n":"云城区"},{"v":"19830","n":"罗定市"},{"v":"1700","n":"云安县"},{"v":"1701","n":"新兴县"},{"v":"1702","n":"郁南县"}]},{"v":"1704","n":"清远市","c":[{"v":"1795","n":"连州市"},{"v":"1796","n":"佛冈县"},{"v":"1797","n":"阳山县"},{"v":"1798","n":"清新县"},{"v":"1799","n":"连山县"},{"v":"1800","n":"连南县"},{"v":"37734","n":"清城区"},{"v":"37735","n":"英德市"}]},{"v":"1705","n":"潮州市","c":[{"v":"19991","n":"湘桥区"},{"v":"4238","n":"枫溪区"},{"v":"19992","n":"潮安区"},{"v":"1707","n":"饶平县"}]},{"v":"1709","n":"揭阳市","c":[{"v":"5484","n":"东山区"},{"v":"5864","n":"普宁市"},{"v":"20093","n":"榕城区"},{"v":"20094","n":"揭东县"},{"v":"1712","n":"揭西县"},{"v":"1713","n":"惠来县"}]}]},{"v":"20","n":"广西","c":[{"v":"1792","n":"贺州市","c":[{"v":"23040","n":"八步区"},{"v":"1803","n":"钟山县"},{"v":"1804","n":"昭平县"},{"v":"1805","n":"富川县"},{"v":"22850","n":"平桂管理区"}]},{"v":"1806","n":"百色市","c":[{"v":"1807","n":"右江区"},{"v":"1808","n":"平果县"},{"v":"1809","n":"乐业县"},{"v":"1810","n":"田阳县"},{"v":"1811","n":"西林县"},{"v":"1812","n":"田林县"},{"v":"1813","n":"德保县"},{"v":"1814","n":"靖西县"},{"v":"1815","n":"田东县"},{"v":"1816","n":"那坡县"},{"v":"1817","n":"隆林县"},{"v":"3678","n":"凌云县"}]},{"v":"1818","n":"河池市","c":[{"v":"1820","n":"宜州市"},{"v":"1821","n":"天峨县"},{"v":"1822","n":"凤山县"},{"v":"1823","n":"南丹县"},{"v":"1824","n":"东兰县"},{"v":"1825","n":"巴马县"},{"v":"1826","n":"环江县"},{"v":"3152","n":"大化县"},{"v":"3679","n":"都安县"},{"v":"3680","n":"金城江区"},{"v":"2991","n":"罗城县"}]},{"v":"3168","n":"崇左市","c":[{"v":"3169","n":"江州区"},{"v":"3681","n":"凭祥市"},{"v":"3682","n":"扶绥县"},{"v":"3683","n":"大新县"},{"v":"3684","n":"天等县"},{"v":"3685","n":"宁明县"},{"v":"3686","n":"龙州县"}]},{"v":"1715","n":"南宁市","c":[{"v":"43114","n":"良庆区"},{"v":"43115","n":"江南区"},{"v":"43116","n":"兴宁区"},{"v":"43117","n":"青秀区"},{"v":"43118","n":"西乡塘区"},{"v":"3650","n":"横县"},{"v":"3651","n":"上林县"},{"v":"3652","n":"隆安县"},{"v":"3653","n":"马山县"},{"v":"1716","n":"武鸣区"},{"v":"1724","n":"邕宁区"},{"v":"3005","n":"宾阳县"}]},{"v":"1720","n":"柳州市","c":[{"v":"3659","n":"融安县"},{"v":"3660","n":"三江县"},{"v":"3661","n":"融水县"},{"v":"22906","n":"鱼峰区"},{"v":"22907","n":"城中区"},{"v":"22908","n":"柳南区"},{"v":"22909","n":"柳北区"},{"v":"1721","n":"柳江县"},{"v":"1722","n":"柳城县"},{"v":"1725","n":"鹿寨县"}]},{"v":"1726","n":"桂林市","c":[{"v":"3670","n":"象山区"},{"v":"3666","n":"恭城县"},{"v":"22883","n":"秀峰区"},{"v":"22884","n":"叠彩区"},{"v":"22885","n":"七星区"},{"v":"4457","n":"雁山区"},{"v":"1727","n":"阳朔县"},{"v":"1728","n":"临桂县"},{"v":"1729","n":"灵川县"},{"v":"1730","n":"全州县"},{"v":"1731","n":"平乐县"},{"v":"1732","n":"兴安县"},{"v":"1733","n":"灌阳县"},{"v":"1734","n":"荔浦县"},{"v":"1735","n":"资源县"},{"v":"1736","n":"永福县"},{"v":"1738","n":"龙胜县"}]},{"v":"1740","n":"梧州市","c":[{"v":"53521","n":"龙圩区"},{"v":"1741","n":"岑溪市"},{"v":"1742","n":"苍梧县"},{"v":"1743","n":"藤县"},{"v":"1744","n":"蒙山县"},{"v":"23037","n":"万秀区"},{"v":"23038","n":"蝶山区"},{"v":"23039","n":"长洲区"}]},{"v":"1746","n":"北海市","c":[{"v":"22851","n":"海城区"},{"v":"22852","n":"银海区"},{"v":"1747","n":"合浦县"},{"v":"1748","n":"铁山港区"}]},{"v":"1749","n":"防城港市","c":[{"v":"25190","n":"防城区"},{"v":"25191","n":"港口区"},{"v":"1750","n":"东兴市"},{"v":"1751","n":"上思县"}]},{"v":"1753","n":"钦州市","c":[{"v":"25189","n":"钦南区"},{"v":"2999","n":"钦北区"},{"v":"1754","n":"浦北县"},{"v":"1755","n":"灵山县"}]},{"v":"1757","n":"贵港市","c":[{"v":"25192","n":"港南区"},{"v":"25193","n":"港北区"},{"v":"1758","n":"桂平市"},{"v":"1759","n":"平南县"},{"v":"1760","n":"覃塘区"}]},{"v":"1761","n":"玉林市","c":[{"v":"25188","n":"玉州区"},{"v":"1762","n":"北流市"},{"v":"1763","n":"容县"},{"v":"1764","n":"博白县"},{"v":"1765","n":"陆川县"},{"v":"1766","n":"兴业县"}]},{"v":"3044","n":"来宾市","c":[{"v":"3046","n":"兴宾区"},{"v":"3047","n":"合山市"},{"v":"3048","n":"忻城县"},{"v":"3049","n":"武宣县"},{"v":"3050","n":"象州县"},{"v":"3051","n":"金秀县"}]}]},{"v":"21","n":"江西","c":[{"v":"1827","n":"南昌市","c":[{"v":"3505","n":"青云谱区"},{"v":"3506","n":"西湖区"},{"v":"3507","n":"东湖区"},{"v":"4101","n":"昌北区"},{"v":"1828","n":"南昌县"},{"v":"1829","n":"进贤县"},{"v":"1830","n":"安义县"},{"v":"40846","n":"青山湖区"},{"v":"40847","n":"红谷滩新区"},{"v":"3502","n":"新建县"},{"v":"3504","n":"湾里区"},{"v":"4039","n":"高新区"}]},{"v":"1832","n":"景德镇市","c":[{"v":"3508","n":"珠山区"},{"v":"1833","n":"乐平市"},{"v":"1834","n":"浮梁县"},{"v":"24947","n":"昌江区"}]},{"v":"1836","n":"萍乡市","c":[{"v":"1837","n":"湘东区"},{"v":"1838","n":"莲花县"},{"v":"1839","n":"上栗县"},{"v":"1840","n":"芦溪县"},{"v":"18317","n":"安源区"}]},{"v":"1842","n":"新余市","c":[{"v":"1843","n":"分宜县"},{"v":"26455","n":"渝水区"}]},{"v":"1845","n":"九江市","c":[{"v":"25482","n":"浔阳区"},{"v":"23679","n":"八里湖新区"},{"v":"23678","n":"经济技术开发区"},{"v":"1852","n":"修水县"},{"v":"1847","n":"瑞昌市"},{"v":"1850","n":"彭泽县"},{"v":"1853","n":"湖口县"},{"v":"4161","n":"共青城市"},{"v":"1846","n":"柴桑区"},{"v":"25481","n":"濂溪区"},{"v":"1854","n":"德安县"},{"v":"1855","n":"都昌县"},{"v":"1851","n":"永修县"},{"v":"1849","n":"武宁县"},{"v":"1848","n":"庐山市"},{"v":"23680","n":"庐山风景名胜区"}]},{"v":"1857","n":"鹰潭市","c":[{"v":"51245","n":"龙虎山风景旅游区"},{"v":"1858","n":"余江县"},{"v":"1859","n":"贵溪市"},{"v":"1860","n":"月湖区"}]},{"v":"1861","n":"上饶市","c":[{"v":"1863","n":"德兴市"},{"v":"1864","n":"广丰县"},{"v":"1865","n":"鄱阳县"},{"v":"1866","n":"婺源县"},{"v":"1867","n":"余干县"},{"v":"1868","n":"横峰县"},{"v":"1869","n":"弋阳县"},{"v":"1870","n":"铅山县"},{"v":"1871","n":"玉山县"},{"v":"1872","n":"万年县"},{"v":"26449","n":"信州区"},{"v":"26450","n":"上饶县"}]},{"v":"1874","n":"宜春市","c":[{"v":"1875","n":"丰城市"},{"v":"1876","n":"樟树市"},{"v":"26452","n":"袁州区"},{"v":"1877","n":"高安市"},{"v":"1878","n":"铜鼓县"},{"v":"1879","n":"靖安县"},{"v":"1880","n":"宜丰县"},{"v":"1881","n":"奉新县"},{"v":"1882","n":"万载县"},{"v":"1883","n":"上高县"}]},{"v":"1885","n":"抚州市","c":[{"v":"1887","n":"南丰县"},{"v":"1888","n":"乐安县"},{"v":"1889","n":"金溪县"},{"v":"1890","n":"南城县"},{"v":"1891","n":"东乡县"},{"v":"1892","n":"资溪县"},{"v":"1893","n":"宜黄县"},{"v":"1894","n":"崇仁县"},{"v":"1895","n":"黎川县"},{"v":"1896","n":"广昌县"},{"v":"24946","n":"临川区"}]},{"v":"1898","n":"吉安市","c":[{"v":"26453","n":"青原区"},{"v":"26454","n":"吉州区"},{"v":"1899","n":"井冈山市"},{"v":"1900","n":"吉安县"},{"v":"1901","n":"永丰县"},{"v":"1902","n":"永新县"},{"v":"1903","n":"新干县"},{"v":"1904","n":"泰和县"},{"v":"1905","n":"峡江县"},{"v":"1906","n":"遂川县"},{"v":"1907","n":"安福县"},{"v":"1908","n":"吉水县"},{"v":"1909","n":"万安县"}]},{"v":"1911","n":"赣州市","c":[{"v":"26451","n":"章贡区"},{"v":"1912","n":"南康市"},{"v":"1913","n":"瑞金市"},{"v":"1914","n":"石城县"},{"v":"1915","n":"安远县"},{"v":"1916","n":"赣县"},{"v":"1917","n":"宁都县"},{"v":"1918","n":"寻乌县"},{"v":"1919","n":"兴国县"},{"v":"1920","n":"定南县"},{"v":"1921","n":"上犹县"},{"v":"1922","n":"于都县"},{"v":"1923","n":"龙南县"},{"v":"1924","n":"崇义县"},{"v":"1925","n":"大余县"},{"v":"1926","n":"信丰县"},{"v":"1927","n":"全南县"},{"v":"1928","n":"会昌县"}]}]},{"v":"22","n":"四川","c":[{"v":"2058","n":"眉山市","c":[{"v":"2060","n":"仁寿县"},{"v":"2061","n":"彭山区"},{"v":"2062","n":"洪雅县"},{"v":"2063","n":"丹棱县"},{"v":"2064","n":"青神县"},{"v":"41029","n":"东坡区"}]},{"v":"2065","n":"资阳市","c":[{"v":"3905","n":"雁江区"},{"v":"2068","n":"安岳县"},{"v":"2069","n":"乐至县"},{"v":"44342","n":"简阳市"}]},{"v":"2070","n":"阿坝州","c":[{"v":"2071","n":"马尔康县"},{"v":"2072","n":"九寨沟县"},{"v":"2073","n":"红原县"},{"v":"2075","n":"阿坝县"},{"v":"2076","n":"理县"},{"v":"2077","n":"若尔盖县"},{"v":"2078","n":"金川县"},{"v":"2079","n":"小金县"},{"v":"2080","n":"黑水县"},{"v":"2081","n":"松潘县"},{"v":"2082","n":"壤塘县"},{"v":"2083","n":"茂县"},{"v":"27498","n":"汶川县"}]},{"v":"2084","n":"甘孜州","c":[{"v":"2085","n":"康定县"},{"v":"2086","n":"泸定县"},{"v":"2087","n":"九龙县"},{"v":"2088","n":"丹巴县"},{"v":"2089","n":"道孚县"},{"v":"2090","n":"炉霍县"},{"v":"2091","n":"色达县"},{"v":"2092","n":"甘孜县"},{"v":"2093","n":"新龙县"},{"v":"2094","n":"白玉县"},{"v":"2095","n":"德格县"},{"v":"2096","n":"石渠县"},{"v":"2097","n":"雅江县"},{"v":"2098","n":"理塘县"},{"v":"2099","n":"巴塘县"},{"v":"2100","n":"稻城县"},{"v":"2101","n":"乡城县"},{"v":"2102","n":"得荣县"}]},{"v":"2103","n":"凉山州","c":[{"v":"2105","n":"美姑县"},{"v":"2106","n":"昭觉县"},{"v":"2107","n":"会理县"},{"v":"2108","n":"会东县"},{"v":"2109","n":"普格县"},{"v":"2110","n":"宁南县"},{"v":"2111","n":"德昌县"},{"v":"2112","n":"冕宁县"},{"v":"2113","n":"盐源县"},{"v":"2114","n":"金阳县"},{"v":"2115","n":"布拖县"},{"v":"2116","n":"雷波县"},{"v":"2117","n":"越西县"},{"v":"2118","n":"喜德县"},{"v":"2119","n":"甘洛县"},{"v":"2120","n":"木里县"},{"v":"27500","n":"西昌市"}]},{"v":"1930","n":"成都市","c":[{"v":"50947","n":"武侯区"},{"v":"50946","n":"金牛区"},{"v":"50944","n":"青羊区"},{"v":"50948","n":"成华区"},{"v":"50949","n":"高新区"},{"v":"50945","n":"锦江区"},{"v":"49322","n":"郫县"},{"v":"49324","n":"双流县"},{"v":"4284","n":"高新西区"},{"v":"49316","n":"龙泉驿区"},{"v":"49314","n":"新都区"},{"v":"49315","n":"温江区"},{"v":"49321","n":"都江堰市"},{"v":"49318","n":"彭州市"},{"v":"49317","n":"青白江区"},{"v":"49319","n":"崇州市"},{"v":"49327","n":"金堂县"},{"v":"49323","n":"新津县"},{"v":"49320","n":"邛崃市"},{"v":"49325","n":"大邑县"},{"v":"49326","n":"蒲江县"}]},{"v":"1946","n":"自贡市","c":[{"v":"1949","n":"自流井区"},{"v":"3895","n":"沿滩区"},{"v":"1947","n":"荣县"},{"v":"1948","n":"富顺县"},{"v":"43224","n":"大安区"},{"v":"43225","n":"贡井区"}]},{"v":"1950","n":"攀枝花市","c":[{"v":"1953","n":"仁和区"},{"v":"3896","n":"西区"},{"v":"27502","n":"东区"},{"v":"1951","n":"米易县"},{"v":"1952","n":"盐边县"}]},{"v":"1954","n":"泸州市","c":[{"v":"3898","n":"纳溪区"},{"v":"39014","n":"江阳区"},{"v":"39015","n":"龙马潭区"},{"v":"1955","n":"泸县"},{"v":"1956","n":"合江县"},{"v":"1957","n":"叙永县"},{"v":"1958","n":"古蔺县"}]},{"v":"1960","n":"绵阳市","c":[{"v":"38573","n":"江油市"},{"v":"38574","n":"涪城区"},{"v":"38575","n":"游仙区"},{"v":"38576","n":"高新区"},{"v":"38577","n":"经开区"},{"v":"1970","n":"盐亭县"},{"v":"1971","n":"三台县"},{"v":"1972","n":"平武县"},{"v":"1973","n":"北川县"},{"v":"1974","n":"安县"},{"v":"1975","n":"梓潼县"}]},{"v":"1962","n":"德阳市","c":[{"v":"39010","n":"广汉市"},{"v":"39011","n":"什邡市"},{"v":"39012","n":"旌阳区"},{"v":"39013","n":"绵竹市"},{"v":"1965","n":"罗江县"},{"v":"1966","n":"中江县"}]},{"v":"1977","n":"广元市","c":[{"v":"3901","n":"昭化区"},{"v":"3902","n":"朝天区"},{"v":"27499","n":"利州区"},{"v":"1978","n":"青川县"},{"v":"1979","n":"旺苍县"},{"v":"1980","n":"剑阁县"},{"v":"1981","n":"苍溪县"}]},{"v":"1983","n":"遂宁市","c":[{"v":"4961","n":"船山区"},{"v":"1984","n":"射洪县"},{"v":"1985","n":"蓬溪县"},{"v":"1986","n":"大英县"},{"v":"1987","n":"安居区"}]},{"v":"1988","n":"内江市","c":[{"v":"3121","n":"东兴区"},{"v":"1989","n":"资中县"},{"v":"1990","n":"隆昌县"},{"v":"1991","n":"威远县"},{"v":"1992","n":"市中区"}]},{"v":"1993","n":"乐山市","c":[{"v":"36983","n":"市中区"},{"v":"36984","n":"峨眉山市"},{"v":"1994","n":"五通桥区"},{"v":"1995","n":"沙湾区"},{"v":"1996","n":"金口河区"},{"v":"1998","n":"夹江县"},{"v":"1999","n":"井研县"},{"v":"2000","n":"犍为县"},{"v":"2001","n":"沐川县"},{"v":"2002","n":"峨边县"},{"v":"2003","n":"马边县"}]},{"v":"2005","n":"宜宾市","c":[{"v":"2006","n":"宜宾县"},{"v":"2007","n":"南溪区"},{"v":"2008","n":"江安县"},{"v":"2009","n":"长宁县"},{"v":"2010","n":"兴文县"},{"v":"2011","n":"珙县"},{"v":"36315","n":"翠屏区"},{"v":"2012","n":"高县"},{"v":"2013","n":"屏山县"},{"v":"2015","n":"筠连县"}]},{"v":"2016","n":"广安市","c":[{"v":"52607","n":"前锋区"},{"v":"2017","n":"岳池县"},{"v":"2018","n":"武胜县"},{"v":"2019","n":"邻水县"},{"v":"2020","n":"广安区"},{"v":"2021","n":"华蓥市"}]},{"v":"2022","n":"南充市","c":[{"v":"43226","n":"顺庆区"},{"v":"43227","n":"高坪区"},{"v":"43228","n":"嘉陵区"},{"v":"43229","n":"西充县"},{"v":"43230","n":"阆中市"},{"v":"36936","n":"南部县"},{"v":"2028","n":"仪陇县"},{"v":"2029","n":"蓬安县"},{"v":"2030","n":"营山县"}]},{"v":"2033","n":"达州市","c":[{"v":"2034","n":"通川区"},{"v":"2035","n":"达川区"},{"v":"2036","n":"大竹县"},{"v":"2037","n":"渠县"},{"v":"2038","n":"万源市"},{"v":"2039","n":"宣汉县"},{"v":"2040","n":"开江县"}]},{"v":"2042","n":"巴中市","c":[{"v":"3904","n":"巴州区"},{"v":"52623","n":"恩阳区"},{"v":"2044","n":"南江县"},{"v":"2045","n":"平昌县"},{"v":"2046","n":"通江县"}]},{"v":"2047","n":"雅安市","c":[{"v":"2049","n":"芦山县"},{"v":"2052","n":"石棉县"},{"v":"2053","n":"名山区"},{"v":"2054","n":"天全县"},{"v":"2055","n":"荥经县"},{"v":"2056","n":"汉源县"},{"v":"2057","n":"宝兴县"},{"v":"41028","n":"雨城区"}]}]},{"v":"23","n":"海南","c":[{"v":"3115","n":"琼海市","c":[{"v":"3720","n":"嘉积镇"},{"v":"3721","n":"万泉镇"},{"v":"3722","n":"石壁镇"},{"v":"3723","n":"中原镇"},{"v":"3724","n":"博鳌镇"},{"v":"3725","n":"阳江镇"},{"v":"3727","n":"龙江镇"},{"v":"3728","n":"潭门镇"},{"v":"3729","n":"塔洋镇"},{"v":"3730","n":"长坡镇"},{"v":"3731","n":"大路镇"},{"v":"3732","n":"会山镇"},{"v":"12747","n":"彬村山华侨农场"},{"v":"12748","n":"东太农场"},{"v":"12749","n":"东红农场"},{"v":"12750","n":"东升农场"},{"v":"12751","n":"南俸农场"}]},{"v":"3137","n":"万宁市","c":[{"v":"53111","n":"兴隆镇"},{"v":"53112","n":"南林农场"},{"v":"3768","n":"万城镇"},{"v":"3769","n":"龙滚镇"},{"v":"3770","n":"和乐镇"},{"v":"3771","n":"后安镇"},{"v":"3772","n":"大茂镇"},{"v":"3773","n":"东澳镇"},{"v":"3774","n":"礼纪镇"},{"v":"3775","n":"长丰镇"},{"v":"3776","n":"山根镇"},{"v":"3777","n":"北大镇"},{"v":"3778","n":"南桥镇"},{"v":"3779","n":"三更罗镇"},{"v":"12775","n":"六连林场"},{"v":"12776","n":"东兴农场"},{"v":"12777","n":"东和农场"},{"v":"12778","n":"新中农场"},{"v":"12779","n":"兴隆华侨农场"}]},{"v":"2121","n":"海口市","c":[{"v":"22466","n":"秀英区"},{"v":"22467","n":"龙华区"},{"v":"22468","n":"琼山区"},{"v":"22469","n":"美兰区"}]},{"v":"3173","n":"东方市","c":[{"v":"3780","n":"八所镇"},{"v":"3781","n":"东河镇"},{"v":"3782","n":"大田镇"},{"v":"3783","n":"感城镇"},{"v":"3784","n":"板桥镇"},{"v":"3785","n":"三家镇"},{"v":"3786","n":"四更镇"},{"v":"3787","n":"新龙镇"},{"v":"3788","n":"天安乡"},{"v":"3789","n":"江边乡"},{"v":"12780","n":"广坝农场"},{"v":"12781","n":"东方华侨农场"}]},{"v":"3690","n":"三亚市","c":[{"v":"4182","n":"崖城镇"},{"v":"3693","n":"海棠湾镇"},{"v":"3694","n":"吉阳镇"},{"v":"3695","n":"凤凰镇"},{"v":"3696","n":"天涯镇"},{"v":"3697","n":"育才镇"},{"v":"22470","n":"河西区"},{"v":"22471","n":"河东区"},{"v":"22503","n":"南田农场"},{"v":"22504","n":"南新农场"},{"v":"22505","n":"南岛农场"},{"v":"22506","n":"立才农场"},{"v":"22507","n":"南滨农场"}]},{"v":"3698","n":"文昌市","c":[{"v":"3752","n":"文城镇"},{"v":"3753","n":"重兴镇"},{"v":"3754","n":"蓬莱镇"},{"v":"3755","n":"会文镇"},{"v":"3756","n":"东路镇"},{"v":"3757","n":"潭牛镇"},{"v":"3758","n":"东阁镇"},{"v":"3759","n":"文教镇"},{"v":"3760","n":"东郊镇"},{"v":"3761","n":"龙楼镇"},{"v":"3762","n":"昌洒镇"},{"v":"3763","n":"翁田镇"},{"v":"3764","n":"抱罗镇"},{"v":"3765","n":"冯坡镇"},{"v":"3766","n":"锦山镇"},{"v":"3767","n":"铺前镇"},{"v":"12762","n":"公坡镇"},{"v":"12763","n":"迈号镇"},{"v":"12764","n":"清谰镇"},{"v":"12765","n":"南阳镇"},{"v":"12766","n":"新桥镇"},{"v":"12767","n":"头苑镇"},{"v":"12768","n":"宝芳乡"},{"v":"12769","n":"龙马乡"},{"v":"12770","n":"湖山乡"},{"v":"12771","n":"东路农场"},{"v":"12772","n":"南阳农场"},{"v":"12773","n":"罗豆农场"},{"v":"12774","n":"橡胶研究所"}]},{"v":"3699","n":"五指山市","c":[{"v":"3712","n":"通什镇"},{"v":"3713","n":"南圣镇"},{"v":"3714","n":"毛阳镇"},{"v":"3715","n":"番阳镇"},{"v":"3716","n":"畅好乡"},{"v":"3717","n":"毛道乡"},{"v":"3719","n":"水满乡"},{"v":"12746","n":"畅好农场"}]},{"v":"3701","n":"临高县","c":[{"v":"39884","n":"城区"},{"v":"3790","n":"临城镇"},{"v":"3791","n":"波莲镇"},{"v":"3792","n":"东英镇"},{"v":"3793","n":"博厚镇"},{"v":"3794","n":"皇桐镇"},{"v":"3795","n":"多文镇"},{"v":"3796","n":"和舍镇"},{"v":"3797","n":"南宝镇"},{"v":"3798","n":"新盈镇"},{"v":"3799","n":"调楼镇"},{"v":"3800","n":"加来镇"},{"v":"12791","n":"红华农场"},{"v":"12792","n":"加来农场"}]},{"v":"3702","n":"澄迈县","c":[{"v":"39886","n":"城区"},{"v":"3801","n":"金江镇"},{"v":"3802","n":"老城镇"},{"v":"3803","n":"瑞溪镇"},{"v":"3804","n":"永发镇"},{"v":"3805","n":"加乐镇"},{"v":"3806","n":"文儒镇"},{"v":"3807","n":"中兴镇"},{"v":"3808","n":"仁兴镇"},{"v":"3809","n":"福山镇"},{"v":"3810","n":"桥头镇"},{"v":"12787","n":"大丰镇"},{"v":"12788","n":"红光农场"},{"v":"12789","n":"西达农场"},{"v":"12790","n":"金安农场"}]},{"v":"3703","n":"定安县","c":[{"v":"4498","n":"黄竹镇"},{"v":"39887","n":"城区"},{"v":"3811","n":"定城镇"},{"v":"3812","n":"新竹镇"},{"v":"3813","n":"龙湖镇"},{"v":"3814","n":"雷鸣镇"},{"v":"3815","n":"龙门镇"},{"v":"3816","n":"龙河镇"},{"v":"3817","n":"岭口镇"},{"v":"3818","n":"翰林镇"},{"v":"3819","n":"富文镇"},{"v":"12782","n":"金鸡岭农场"},{"v":"12783","n":"中瑞农场"},{"v":"12784","n":"南海农场"}]},{"v":"3704","n":"屯昌县","c":[{"v":"39889","n":"县城内"},{"v":"3820","n":"屯城镇"},{"v":"3821","n":"新兴镇"},{"v":"3822","n":"枫木镇"},{"v":"3823","n":"乌坡镇"},{"v":"3824","n":"南吕镇"},{"v":"3825","n":"南坤镇"},{"v":"12785","n":"中建农场"},{"v":"3826","n":"坡心镇"},{"v":"12786","n":"中坤农场"},{"v":"3827","n":"西昌镇"}]},{"v":"3705","n":"昌江县","c":[{"v":"12800","n":"红林农场"},{"v":"39890","n":"城区"},{"v":"3828","n":"石碌镇"},{"v":"3829","n":"叉河镇"},{"v":"3830","n":"十月田镇"},{"v":"3831","n":"乌烈镇"},{"v":"3832","n":"昌化镇"},{"v":"3833","n":"海尾镇"},{"v":"12796","n":"七叉镇"},{"v":"12797","n":"王下乡"},{"v":"12798","n":"海南矿业公司"},{"v":"12799","n":"霸王岭林场"}]},{"v":"3706","n":"白沙县","c":[{"v":"3840","n":"南开乡"},{"v":"3841","n":"阜龙乡"},{"v":"3842","n":"青松乡"},{"v":"3843","n":"金波乡"},{"v":"3844","n":"荣邦乡"},{"v":"39892","n":"城区"},{"v":"12793","n":"白沙农场"},{"v":"3834","n":"牙叉镇"},{"v":"12794","n":"龙江农场"},{"v":"3835","n":"七坊镇"},{"v":"12795","n":"邦溪农场"},{"v":"3836","n":"邦溪镇"},{"v":"3837","n":"打安镇"},{"v":"3838","n":"细水乡"},{"v":"3839","n":"元门乡"}]},{"v":"3707","n":"琼中县","c":[{"v":"12813","n":"吊罗山乡"},{"v":"12814","n":"黎母山林业公司"},{"v":"12815","n":"阳江农场"},{"v":"12816","n":"乌石农场"},{"v":"12817","n":"加钗农场"},{"v":"12818","n":"长征农场"},{"v":"3878","n":"营根镇"},{"v":"3879","n":"湾岭镇"},{"v":"3880","n":"黎母山镇"},{"v":"3881","n":"和平镇"},{"v":"3882","n":"长征镇"},{"v":"3883","n":"红毛镇"},{"v":"3884","n":"中平镇"},{"v":"3885","n":"上安乡"},{"v":"3886","n":"什运乡"},{"v":"39893","n":"城区"}]},{"v":"3708","n":"陵水县","c":[{"v":"53109","n":"东华镇"},{"v":"53110","n":"南平镇"},{"v":"12806","n":"吊罗山林业公司"},{"v":"12807","n":"岭门农场"},{"v":"12808","n":"南平农场"},{"v":"3858","n":"椰林镇"},{"v":"3859","n":"光坡镇"},{"v":"3860","n":"三才镇"},{"v":"3861","n":"英州镇"},{"v":"3862","n":"隆广镇"},{"v":"3863","n":"文罗镇"},{"v":"3864","n":"本号镇"},{"v":"3865","n":"新村镇"},{"v":"3866","n":"黎安镇"},{"v":"3867","n":"提蒙乡"},{"v":"3868","n":"群英乡"},{"v":"39895","n":"城区"}]},{"v":"3709","n":"保亭县","c":[{"v":"12809","n":"保亭研究所"},{"v":"12810","n":"新星农场"},{"v":"12811","n":"金江农场"},{"v":"12812","n":"三道农场"},{"v":"3869","n":"保城镇"},{"v":"3870","n":"什玲镇"},{"v":"3871","n":"加茂镇"},{"v":"3872","n":"响水镇"},{"v":"3873","n":"新政镇"},{"v":"3874","n":"三道镇"},{"v":"3875","n":"六弓乡"},{"v":"3876","n":"南林乡"},{"v":"3877","n":"毛感乡"}]},{"v":"3710","n":"乐东县","c":[{"v":"12801","n":"尖峰岭林业公司"},{"v":"12802","n":"莺歌海盐场"},{"v":"12803","n":"山荣农场"},{"v":"12804","n":"乐光农场"},{"v":"3845","n":"抱由镇"},{"v":"12805","n":"保国农场"},{"v":"3846","n":"万冲镇"},{"v":"3847","n":"大安镇"},{"v":"3849","n":"志仲镇"},{"v":"3851","n":"千家镇"},{"v":"3852","n":"九所镇"},{"v":"3853","n":"利国镇"},{"v":"3854","n":"黄流镇"},{"v":"3855","n":"佛罗镇"},{"v":"3856","n":"尖峰镇"},{"v":"3857","n":"莺歌海镇"},{"v":"39897","n":"城区"}]},{"v":"3711","n":"三沙市","c":[{"v":"12819","n":"中沙群岛"},{"v":"3887","n":"西沙群岛"},{"v":"3888","n":"南沙群岛"}]},{"v":"3034","n":"儋州市","c":[{"v":"12824","n":"热作学院"},{"v":"3125","n":"那大镇"},{"v":"4214","n":"富克镇"},{"v":"3733","n":"和庆镇"},{"v":"3734","n":"南丰镇"},{"v":"3735","n":"大成镇"},{"v":"3736","n":"雅星镇"},{"v":"3737","n":"兰洋镇"},{"v":"3738","n":"光村镇"},{"v":"3739","n":"木棠镇"},{"v":"3740","n":"海头镇"},{"v":"3741","n":"峨蔓镇"},{"v":"3744","n":"三都镇"},{"v":"3745","n":"王五镇"},{"v":"3746","n":"白马井镇"},{"v":"3747","n":"中和镇"},{"v":"3748","n":"排浦镇"},{"v":"3749","n":"东成镇"},{"v":"3750","n":"新州镇"},{"v":"3751","n":"洋浦经济开发区"},{"v":"12752","n":"西培农场"},{"v":"12753","n":"西联农场"},{"v":"12754","n":"蓝洋农场"},{"v":"12755","n":"八一农场"},{"v":"12756","n":"西华农场"},{"v":"12757","n":"西庆农场"},{"v":"12758","n":"西流农场"},{"v":"12759","n":"新盈农场"},{"v":"12760","n":"龙山农场"},{"v":"12761","n":"红岭农场"}]}]},{"v":"24","n":"贵州","c":[{"v":"2144","n":"贵阳市","c":[{"v":"3906","n":"南明区"},{"v":"21037","n":"云岩区"},{"v":"21038","n":"花溪区"},{"v":"21039","n":"小河区"},{"v":"3909","n":"白云区"},{"v":"2145","n":"清镇市"},{"v":"2146","n":"开阳县"},{"v":"2147","n":"修文县"},{"v":"2148","n":"息烽县"},{"v":"2149","n":"乌当区"},{"v":"24463","n":"观山湖区"}]},{"v":"2150","n":"六盘水市","c":[{"v":"2151","n":"盘县"},{"v":"2152","n":"六枝特区"},{"v":"2153","n":"水城县"},{"v":"2154","n":"钟山区"}]},{"v":"2155","n":"遵义市","c":[{"v":"21035","n":"红花岗区"},{"v":"21036","n":"汇川区"},{"v":"2156","n":"赤水市"},{"v":"2157","n":"仁怀市"},{"v":"2158","n":"播州区"},{"v":"2159","n":"桐梓县"},{"v":"2160","n":"绥阳县"},{"v":"2161","n":"习水县"},{"v":"2162","n":"凤冈县"},{"v":"2163","n":"正安县"},{"v":"2164","n":"湄潭县"},{"v":"2165","n":"余庆县"},{"v":"2166","n":"道真县"},{"v":"2167","n":"务川县"}]},{"v":"2169","n":"铜仁市","c":[{"v":"2170","n":"碧江区"},{"v":"2171","n":"德江县"},{"v":"2172","n":"江口县"},{"v":"2173","n":"思南县"},{"v":"2174","n":"万山区"},{"v":"2175","n":"石阡县"},{"v":"2176","n":"玉屏侗族自治县"},{"v":"2177","n":"松桃苗族自治县"},{"v":"2178","n":"印江土家族苗族自治县"},{"v":"2179","n":"沿河土家族自治县"}]},{"v":"2180","n":"毕节市","c":[{"v":"8891","n":"七星关区"},{"v":"2182","n":"黔西县"},{"v":"2183","n":"大方县"},{"v":"2184","n":"织金县"},{"v":"2185","n":"金沙县"},{"v":"2186","n":"赫章县"},{"v":"2187","n":"纳雍县"},{"v":"2188","n":"威宁彝族回族苗族自治县"}]},{"v":"2189","n":"安顺市","c":[{"v":"2190","n":"西秀区"},{"v":"2191","n":"普定县"},{"v":"2192","n":"平坝县"},{"v":"2193","n":"镇宁布依族苗族自治县"},{"v":"2194","n":"关岭布依族苗族自治县"},{"v":"2195","n":"紫云苗族布依族自治县"}]},{"v":"2196","n":"黔西南州","c":[{"v":"2197","n":"兴义市"},{"v":"2198","n":"望谟县"},{"v":"2199","n":"兴仁县"},{"v":"2200","n":"普安县"},{"v":"2201","n":"册亨县"},{"v":"2202","n":"晴隆县"},{"v":"2203","n":"贞丰县"},{"v":"2204","n":"安龙县"}]},{"v":"2205","n":"黔东南州","c":[{"v":"2206","n":"凯里市"},{"v":"2207","n":"施秉市"},{"v":"2208","n":"从江县"},{"v":"2209","n":"锦屏县"},{"v":"2210","n":"镇远县"},{"v":"2211","n":"麻江县"},{"v":"2212","n":"台江县"},{"v":"2213","n":"天柱县"},{"v":"2214","n":"黄平县"},{"v":"2215","n":"榕江县"},{"v":"2216","n":"剑河县"},{"v":"2217","n":"三穗县"},{"v":"2218","n":"雷山县"},{"v":"2219","n":"黎平县"},{"v":"2220","n":"岑巩县"},{"v":"2221","n":"丹寨县"}]},{"v":"2222","n":"黔南州","c":[{"v":"2223","n":"都匀市"},{"v":"2224","n":"福泉市"},{"v":"2225","n":"贵定县"},{"v":"2226","n":"惠水县"},{"v":"2227","n":"罗甸县"},{"v":"2228","n":"瓮安县"},{"v":"2229","n":"荔波县"},{"v":"2230","n":"龙里县"},{"v":"2231","n":"平塘县"},{"v":"2232","n":"长顺县"},{"v":"2233","n":"独山县"},{"v":"2234","n":"三都县"}]}]},{"v":"25","n":"云南","c":[{"v":"2304","n":"丽江市","c":[{"v":"2305","n":"玉龙县"},{"v":"2306","n":"华坪县"},{"v":"2307","n":"永胜县"},{"v":"2308","n":"宁蒗县"},{"v":"21033","n":"古城区"}]},{"v":"2309","n":"文山州","c":[{"v":"2310","n":"文山市"},{"v":"2311","n":"麻栗坡县"},{"v":"2312","n":"砚山县"},{"v":"2313","n":"广南县"},{"v":"2314","n":"马关县"},{"v":"2315","n":"富宁县"},{"v":"2316","n":"西畴县"},{"v":"2317","n":"丘北县"}]},{"v":"4108","n":"迪庆州","c":[{"v":"6823","n":"香格里拉县"},{"v":"6824","n":"德钦县"},{"v":"6825","n":"维西县"}]},{"v":"2318","n":"红河州","c":[{"v":"2319","n":"个旧市"},{"v":"2320","n":"开远市"},{"v":"2321","n":"弥勒县"},{"v":"2322","n":"红河县"},{"v":"2323","n":"绿春县"},{"v":"2324","n":"蒙自市"},{"v":"2325","n":"泸西县"},{"v":"2326","n":"建水县"},{"v":"2327","n":"元阳县"},{"v":"2328","n":"石屏县"},{"v":"2329","n":"金平县"},{"v":"2330","n":"屏边县"},{"v":"2331","n":"河口县"}]},{"v":"2332","n":"西双版纳州","c":[{"v":"2333","n":"景洪市"},{"v":"2334","n":"勐海县"},{"v":"2335","n":"勐腊县"}]},{"v":"2336","n":"楚雄州","c":[{"v":"2338","n":"元谋县"},{"v":"2339","n":"南华县"},{"v":"2340","n":"牟定县"},{"v":"2341","n":"武定县"},{"v":"2342","n":"大姚县"},{"v":"2343","n":"双柏县"},{"v":"2344","n":"禄丰县"},{"v":"2345","n":"永仁县"},{"v":"3917","n":"姚安县"},{"v":"20817","n":"楚雄市"}]},{"v":"2347","n":"大理州","c":[{"v":"2349","n":"剑川县"},{"v":"2350","n":"弥渡县"},{"v":"2351","n":"云龙县"},{"v":"2352","n":"洱源县"},{"v":"2353","n":"鹤庆县"},{"v":"2354","n":"宾川县"},{"v":"2355","n":"祥云县"},{"v":"2356","n":"永平县"},{"v":"2357","n":"巍山县"},{"v":"2358","n":"漾濞县"},{"v":"2359","n":"南涧县"},{"v":"20818","n":"大理市"}]},{"v":"2360","n":"德宏州","c":[{"v":"2361","n":"芒市"},{"v":"2362","n":"瑞丽市"},{"v":"2363","n":"盈江县"},{"v":"2364","n":"梁河县"},{"v":"2365","n":"陇川县"}]},{"v":"2366","n":"怒江州","c":[{"v":"2367","n":"泸水县"},{"v":"2368","n":"福贡县"},{"v":"2369","n":"兰坪县"},{"v":"2370","n":"贡山县"}]},{"v":"2235","n":"昆明市","c":[{"v":"2246","n":"盘龙区"},{"v":"3912","n":"五华区"},{"v":"3914","n":"西山区"},{"v":"3913","n":"官渡区"},{"v":"27497","n":"呈贡区"},{"v":"2236","n":"东川区"},{"v":"2237","n":"安宁市"},{"v":"2238","n":"富民县"},{"v":"2239","n":"嵩明县"},{"v":"2241","n":"晋宁县"},{"v":"2242","n":"宜良县"},{"v":"2243","n":"禄劝县"},{"v":"2244","n":"石林县"},{"v":"2245","n":"寻甸县"}]},{"v":"2247","n":"曲靖市","c":[{"v":"21034","n":"麒麟区"},{"v":"2249","n":"马龙县"},{"v":"2250","n":"宣威市"},{"v":"2251","n":"富源县"},{"v":"2252","n":"会泽县"},{"v":"2253","n":"陆良县"},{"v":"2254","n":"师宗县"},{"v":"2255","n":"罗平县"},{"v":"2256","n":"沾益县"}]},{"v":"2258","n":"玉溪市","c":[{"v":"2259","n":"红塔区"},{"v":"2260","n":"华宁县"},{"v":"2261","n":"澄江县"},{"v":"2262","n":"易门县"},{"v":"2263","n":"通海县"},{"v":"2264","n":"江川县"},{"v":"2265","n":"元江县"},{"v":"2266","n":"新平县"},{"v":"2267","n":"峨山县"}]},{"v":"2270","n":"昭通市","c":[{"v":"3002","n":"鲁甸县"},{"v":"3003","n":"绥江县"},{"v":"2271","n":"昭阳区"},{"v":"2272","n":"镇雄县"},{"v":"2273","n":"永善县"},{"v":"2274","n":"大关县"},{"v":"2275","n":"盐津县"},{"v":"2276","n":"彝良县"},{"v":"2277","n":"水富县"},{"v":"2278","n":"巧家县"},{"v":"2279","n":"威信县"}]},{"v":"2281","n":"普洱市","c":[{"v":"2958","n":"孟连县"},{"v":"2282","n":"思茅区"},{"v":"2283","n":"宁洱县"},{"v":"2284","n":"景东县"},{"v":"2285","n":"镇沅县"},{"v":"2286","n":"景谷县"},{"v":"2287","n":"墨江县"},{"v":"2288","n":"澜沧县"},{"v":"2289","n":"西盟县"},{"v":"2290","n":"江城县"}]},{"v":"2291","n":"临沧市","c":[{"v":"3915","n":"双江县"},{"v":"3916","n":"沧源县"},{"v":"2292","n":"临翔区"},{"v":"2293","n":"镇康县"},{"v":"2294","n":"凤庆县"},{"v":"2295","n":"云县"},{"v":"2296","n":"永德县"},{"v":"2297","n":"耿马县"}]},{"v":"2298","n":"保山市","c":[{"v":"2299","n":"隆阳区"},{"v":"2300","n":"施甸县"},{"v":"2301","n":"昌宁县"},{"v":"2302","n":"龙陵县"},{"v":"2303","n":"腾冲县"}]}]},{"v":"26","n":"西藏","c":[{"v":"3107","n":"那曲地区","c":[{"v":"53091","n":"双湖县"},{"v":"3108","n":"索县"},{"v":"3961","n":"那曲县"},{"v":"3962","n":"嘉黎县"},{"v":"3963","n":"比如县"},{"v":"3964","n":"聂荣县"},{"v":"3965","n":"安多县"},{"v":"3966","n":"申扎县"},{"v":"3967","n":"班戈县"},{"v":"3968","n":"巴青县"},{"v":"3969","n":"尼玛县"}]},{"v":"3129","n":"山南地区","c":[{"v":"3130","n":"贡嘎县"},{"v":"3934","n":"扎囊县"},{"v":"3935","n":"乃东县"},{"v":"3936","n":"桑日县"},{"v":"3937","n":"琼结县"},{"v":"3938","n":"曲松县"},{"v":"3939","n":"措美县"},{"v":"3940","n":"洛扎县"},{"v":"3941","n":"加查县"},{"v":"3942","n":"隆子县"},{"v":"3943","n":"错那县"},{"v":"3944","n":"浪卡子县"}]},{"v":"3138","n":"昌都地区","c":[{"v":"3139","n":"昌都县"},{"v":"3924","n":"江达县"},{"v":"3925","n":"贡觉县"},{"v":"3926","n":"类乌齐县"},{"v":"3927","n":"丁青县"},{"v":"3928","n":"察雅县"},{"v":"3929","n":"八宿县"},{"v":"3930","n":"左贡县"},{"v":"3931","n":"芒康县"},{"v":"3932","n":"洛隆县"},{"v":"3933","n":"边坝县"}]},{"v":"3144","n":"日喀则地区","c":[{"v":"3160","n":"聂拉木县"},{"v":"3166","n":"昂仁县"},{"v":"3945","n":"日喀则市"},{"v":"3946","n":"南木林县"},{"v":"3947","n":"江孜县"},{"v":"3948","n":"定日县"},{"v":"3949","n":"萨迦县　"},{"v":"3950","n":"拉孜县"},{"v":"3951","n":"谢通门县"},{"v":"3952","n":"白朗县"},{"v":"3953","n":"仁布县"},{"v":"3954","n":"康马县"},{"v":"3955","n":"定结县"},{"v":"3956","n":"仲巴县"},{"v":"3957","n":"亚东县"},{"v":"3958","n":"吉隆县"},{"v":"3959","n":"萨嘎县"},{"v":"3960","n":"岗巴县"}]},{"v":"3970","n":"阿里地区","c":[{"v":"3972","n":"噶尔县"},{"v":"3973","n":"普兰县"},{"v":"3974","n":"札达县　"},{"v":"3975","n":"日土县"},{"v":"3976","n":"革吉县"},{"v":"3977","n":"改则县"},{"v":"3978","n":"措勤县"}]},{"v":"3971","n":"林芝地区","c":[{"v":"3979","n":"林芝县"},{"v":"3980","n":"工布江达县"},{"v":"3981","n":"米林县"},{"v":"3982","n":"墨脱县"},{"v":"3983","n":"波密县"},{"v":"3984","n":"察隅县"},{"v":"3985","n":"朗县"}]},{"v":"2951","n":"拉萨市","c":[{"v":"2952","n":"城关区"},{"v":"3123","n":"林周县"},{"v":"3918","n":"当雄县"},{"v":"3919","n":"尼木县"},{"v":"3920","n":"曲水县"},{"v":"3921","n":"堆龙德庆县"},{"v":"3922","n":"达孜县"},{"v":"3923","n":"墨竹工卡县"}]}]},{"v":"27","n":"陕西","c":[{"v":"2376","n":"西安市","c":[{"v":"51881","n":"新城区"},{"v":"4343","n":"雁塔区"},{"v":"50230","n":"未央区"},{"v":"50231","n":"长安区"},{"v":"50232","n":"灞桥区"},{"v":"50233","n":"碑林区"},{"v":"50235","n":"莲湖区"},{"v":"50236","n":"临潼区"},{"v":"50237","n":"阎良区"},{"v":"52075","n":"西安武警工程学院"},{"v":"2380","n":"高陵县"},{"v":"2381","n":"蓝田县"},{"v":"2382","n":"户县"},{"v":"2383","n":"周至县"}]},{"v":"2386","n":"铜川市","c":[{"v":"2387","n":"印台区"},{"v":"2388","n":"宜君县"},{"v":"2389","n":"王益区"},{"v":"3989","n":"耀州区"}]},{"v":"2390","n":"宝鸡市","c":[{"v":"2401","n":"渭滨区"},{"v":"3990","n":"金台区"},{"v":"2392","n":"岐山县"},{"v":"2393","n":"太白县"},{"v":"2394","n":"凤翔县"},{"v":"2395","n":"陇县"},{"v":"2396","n":"麟游县"},{"v":"2397","n":"千阳县"},{"v":"2398","n":"扶风县"},{"v":"2399","n":"凤县"},{"v":"2400","n":"眉县"},{"v":"40650","n":"陈仓区"}]},{"v":"2402","n":"咸阳市","c":[{"v":"44320","n":"秦都区"},{"v":"44321","n":"渭城区"},{"v":"2403","n":"兴平市"},{"v":"2404","n":"礼泉县"},{"v":"2405","n":"泾阳县"},{"v":"2406","n":"永寿县"},{"v":"2407","n":"三原县"},{"v":"2408","n":"彬县"},{"v":"2409","n":"旬邑县"},{"v":"2411","n":"长武县"},{"v":"2412","n":"乾县"},{"v":"2413","n":"武功县"},{"v":"2414","n":"淳化县"},{"v":"44514","n":"杨陵区"}]},{"v":"2416","n":"渭南市","c":[{"v":"2417","n":"韩城市"},{"v":"2418","n":"华阴市"},{"v":"2419","n":"蒲城县"},{"v":"2420","n":"华县"},{"v":"2421","n":"潼关县"},{"v":"2422","n":"大荔县"},{"v":"2423","n":"澄城县"},{"v":"2424","n":"合阳县"},{"v":"2425","n":"白水县"},{"v":"2426","n":"富平县"},{"v":"38094","n":"临渭区"}]},{"v":"2428","n":"延安市","c":[{"v":"31523","n":"宝塔区"},{"v":"2429","n":"安塞县"},{"v":"2430","n":"洛川县"},{"v":"2431","n":"子长县"},{"v":"2432","n":"黄陵县"},{"v":"2433","n":"延长县"},{"v":"2434","n":"宜川县"},{"v":"2435","n":"延川县"},{"v":"2436","n":"甘泉县"},{"v":"2437","n":"富县"},{"v":"2438","n":"志丹县"},{"v":"2439","n":"黄龙县"},{"v":"2440","n":"吴起县"}]},{"v":"2442","n":"汉中市","c":[{"v":"53107","n":"经济开发区南区"},{"v":"31864","n":"汉台区"},{"v":"2443","n":"南郑县"},{"v":"2444","n":"城固县"},{"v":"2445","n":"洋县"},{"v":"2446","n":"佛坪县"},{"v":"2447","n":"留坝县"},{"v":"2448","n":"镇巴县"},{"v":"2449","n":"西乡县"},{"v":"2450","n":"勉县"},{"v":"2451","n":"略阳县"},{"v":"2452","n":"宁强县"}]},{"v":"2454","n":"榆林市","c":[{"v":"2456","n":"清涧县"},{"v":"2457","n":"绥德县"},{"v":"2459","n":"佳县"},{"v":"2460","n":"神木市"},{"v":"2461","n":"府谷县"},{"v":"2462","n":"子洲县"},{"v":"2464","n":"横山县"},{"v":"2465","n":"米脂县"},{"v":"2466","n":"吴堡县"},{"v":"2467","n":"定边县"},{"v":"31680","n":"榆阳区"},{"v":"4081","n":"靖边县"}]},{"v":"2468","n":"商洛市","c":[{"v":"2469","n":"商州区"},{"v":"2470","n":"镇安县"},{"v":"2471","n":"山阳县"},{"v":"2472","n":"洛南县"},{"v":"2473","n":"商南县"},{"v":"2474","n":"丹凤县"},{"v":"2475","n":"柞水县"}]},{"v":"2476","n":"安康市","c":[{"v":"3993","n":"汉滨区"},{"v":"2478","n":"紫阳县"},{"v":"2479","n":"岚皋县"},{"v":"2480","n":"旬阳县"},{"v":"2481","n":"镇坪县"},{"v":"2482","n":"平利县"},{"v":"2483","n":"宁陕县"},{"v":"2484","n":"汉阴县"},{"v":"2485","n":"石泉县"},{"v":"2486","n":"白河县"}]}]},{"v":"28","n":"甘肃","c":[{"v":"2564","n":"甘南州","c":[{"v":"2565","n":"合作市"},{"v":"2566","n":"夏河县"},{"v":"2567","n":"碌曲县"},{"v":"2568","n":"舟曲县"},{"v":"2569","n":"玛曲县"},{"v":"2570","n":"迭部县"},{"v":"2571","n":"临潭县"},{"v":"2572","n":"卓尼县"}]},{"v":"3080","n":"定西市","c":[{"v":"3081","n":"岷县"},{"v":"4002","n":"安定区"},{"v":"4003","n":"通渭县"},{"v":"4004","n":"临洮县"},{"v":"4005","n":"漳县"},{"v":"4006","n":"渭源县"},{"v":"4007","n":"陇西县"}]},{"v":"2573","n":"临夏州","c":[{"v":"2574","n":"临夏县"},{"v":"2575","n":"康乐县"},{"v":"2576","n":"永靖县"},{"v":"2577","n":"和政县"},{"v":"2578","n":"东乡族自治县"},{"v":"2579","n":"积石山县"},{"v":"3175","n":"临夏市"},{"v":"4008","n":"广河县"}]},{"v":"2487","n":"兰州市","c":[{"v":"21646","n":"七里河区"},{"v":"21647","n":"安宁区"},{"v":"21648","n":"城关区"},{"v":"3995","n":"西固区"},{"v":"3997","n":"红古区"},{"v":"2488","n":"永登县"},{"v":"2489","n":"榆中县"},{"v":"2490","n":"皋兰县"}]},{"v":"2492","n":"金昌市","c":[{"v":"2493","n":"永昌县"},{"v":"2494","n":"金川区"}]},{"v":"2495","n":"白银市","c":[{"v":"2496","n":"白银区"},{"v":"2497","n":"平川区"},{"v":"2498","n":"靖远县"},{"v":"2499","n":"景泰县"},{"v":"2500","n":"会宁县"}]},{"v":"2501","n":"天水市","c":[{"v":"21644","n":"麦积区"},{"v":"21645","n":"秦州区"},{"v":"2504","n":"甘谷县"},{"v":"2505","n":"武山县"},{"v":"2506","n":"清水县"},{"v":"2507","n":"秦安县"},{"v":"2508","n":"张家川县"}]},{"v":"2509","n":"嘉峪关市","c":[{"v":"16899","n":"长城区"},{"v":"16923","n":"镜铁区"},{"v":"2970","n":"雄关区"}]},{"v":"2518","n":"平凉市","c":[{"v":"3998","n":"静宁县"},{"v":"3023","n":"崆峒区"},{"v":"2519","n":"华亭县"},{"v":"2520","n":"崇信县"},{"v":"2521","n":"泾川县"},{"v":"2522","n":"灵台县"},{"v":"2524","n":"庄浪县"}]},{"v":"2525","n":"庆阳市","c":[{"v":"4001","n":"庆城县"},{"v":"2526","n":"西峰区"},{"v":"2528","n":"镇原县"},{"v":"2529","n":"合水县"},{"v":"2530","n":"华池县"},{"v":"2531","n":"环县"},{"v":"2532","n":"宁县"},{"v":"2533","n":"正宁县"}]},{"v":"2534","n":"陇南市","c":[{"v":"2535","n":"成县"},{"v":"2536","n":"礼县"},{"v":"2537","n":"康县"},{"v":"2538","n":"武都区"},{"v":"2539","n":"文县"},{"v":"2540","n":"两当县"},{"v":"2541","n":"徽县"},{"v":"2542","n":"宕昌县"},{"v":"2543","n":"西和县"}]},{"v":"2544","n":"武威市","c":[{"v":"2545","n":"凉州区"},{"v":"2546","n":"古浪县"},{"v":"2547","n":"天祝县"},{"v":"2548","n":"民勤县"}]},{"v":"2549","n":"张掖市","c":[{"v":"2550","n":"甘州区"},{"v":"2551","n":"山丹县"},{"v":"2552","n":"临泽县"},{"v":"2553","n":"高台县"},{"v":"2554","n":"肃南县"},{"v":"2555","n":"民乐县"}]},{"v":"2556","n":"酒泉市","c":[{"v":"2560","n":"金塔县"},{"v":"2562","n":"阿克塞县"},{"v":"2563","n":"肃北县"},{"v":"3999","n":"瓜州县"},{"v":"4000","n":"肃州区"},{"v":"2558","n":"玉门市"},{"v":"2559","n":"敦煌市"}]}]},{"v":"29","n":"青海","c":[{"v":"2580","n":"西宁市","c":[{"v":"2581","n":"湟中县"},{"v":"2582","n":"湟源县"},{"v":"2583","n":"大通县"},{"v":"21652","n":"城中区"},{"v":"21653","n":"城东区"},{"v":"21654","n":"城西区"},{"v":"21655","n":"城北区"}]},{"v":"2585","n":"海东地区","c":[{"v":"2586","n":"平安县"},{"v":"2587","n":"乐都县"},{"v":"2588","n":"民和县"},{"v":"2589","n":"互助县"},{"v":"2590","n":"化隆县"},{"v":"2591","n":"循化县"}]},{"v":"2592","n":"海北州","c":[{"v":"2593","n":"海晏县"},{"v":"2594","n":"祁连县"},{"v":"2595","n":"刚察县"},{"v":"2596","n":"门源县"}]},{"v":"2597","n":"黄南州","c":[{"v":"2598","n":"尖扎县"},{"v":"2599","n":"同仁县"},{"v":"2600","n":"泽库县"},{"v":"2602","n":"河南县"}]},{"v":"2603","n":"海南州","c":[{"v":"4012","n":"共和县"},{"v":"4013","n":"同德县"},{"v":"4014","n":"贵德县"},{"v":"4015","n":"兴海县"},{"v":"4016","n":"贵南县"}]},{"v":"2605","n":"果洛州","c":[{"v":"2606","n":"玛沁县"},{"v":"2607","n":"甘德县"},{"v":"2608","n":"达日县"},{"v":"2609","n":"班玛县"},{"v":"2610","n":"久治县"},{"v":"2611","n":"玛多县"}]},{"v":"2612","n":"玉树州","c":[{"v":"2613","n":"玉树县"},{"v":"2614","n":"称多县"},{"v":"2615","n":"囊谦县"},{"v":"2616","n":"杂多县"},{"v":"2617","n":"治多县"},{"v":"2618","n":"曲麻莱县"}]},{"v":"2620","n":"海西州","c":[{"v":"2621","n":"德令哈市"},{"v":"2622","n":"乌兰县"},{"v":"2623","n":"天峻县"},{"v":"2624","n":"都兰县"},{"v":"2625","n":"大柴旦行委"},{"v":"2626","n":"冷湖行委"},{"v":"2627","n":"茫崖行委"},{"v":"3021","n":"格尔木市"}]}]},{"v":"30","n":"宁夏","c":[{"v":"2628","n":"银川市","c":[{"v":"2629","n":"灵武市"},{"v":"2630","n":"永宁县"},{"v":"2631","n":"贺兰县"},{"v":"21649","n":"兴庆区"},{"v":"21650","n":"金凤区"},{"v":"21651","n":"西夏区"}]},{"v":"2632","n":"石嘴山市","c":[{"v":"2633","n":"平罗县"},{"v":"2635","n":"惠农区"},{"v":"2636","n":"大武口区"}]},{"v":"2637","n":"吴忠市","c":[{"v":"2638","n":"青铜峡市"},{"v":"2641","n":"同心县"},{"v":"2642","n":"盐池县"},{"v":"2643","n":"红寺堡开发区"},{"v":"2966","n":"利通区"}]},{"v":"2644","n":"固原市","c":[{"v":"2647","n":"西吉县"},{"v":"2648","n":"隆德县"},{"v":"2649","n":"泾源县"},{"v":"2650","n":"彭阳县"},{"v":"2651","n":"原州区"}]},{"v":"3071","n":"中卫市","c":[{"v":"3072","n":"中宁县"},{"v":"3148","n":"海原县"},{"v":"4020","n":"沙坡头区"}]}]},{"v":"31","n":"新疆","c":[{"v":"4110","n":"五家渠市","c":[{"v":"4122","n":"五家渠市"}]},{"v":"15945","n":"阿拉尔市","c":[{"v":"15948","n":"阿拉尔市"}]},{"v":"15946","n":"图木舒克市","c":[{"v":"15947","n":"图木舒克市"}]},{"v":"2652","n":"乌鲁木齐市","c":[{"v":"36684","n":"天山区"},{"v":"4024","n":"头屯河区"},{"v":"4025","n":"达坂城区"},{"v":"4026","n":"米东区"},{"v":"36685","n":"新市区"},{"v":"36686","n":"沙依巴克区"},{"v":"36687","n":"水磨沟区"},{"v":"2653","n":"乌鲁木齐县"}]},{"v":"2654","n":"克拉玛依市","c":[{"v":"2655","n":"克拉玛依区"},{"v":"2930","n":"独山子区"},{"v":"4027","n":"乌尔禾区"},{"v":"3006","n":"白碱滩区"}]},{"v":"2656","n":"石河子市","c":[{"v":"2657","n":"石河子市"}]},{"v":"2658","n":"吐鲁番地区","c":[{"v":"2659","n":"吐鲁番市"},{"v":"2660","n":"托克逊县"},{"v":"2661","n":"鄯善县"}]},{"v":"53090","n":"铁门关市","c":[{"v":"53108","n":"铁门关市"}]},{"v":"2662","n":"哈密地区","c":[{"v":"2663","n":"哈密市"},{"v":"2664","n":"巴里坤县"},{"v":"2665","n":"伊吾县"}]},{"v":"2666","n":"和田地区","c":[{"v":"14848","n":"和田县"},{"v":"2667","n":"和田市"},{"v":"2669","n":"墨玉县"},{"v":"2670","n":"洛浦县"},{"v":"2671","n":"策勒县"},{"v":"2672","n":"于田县"},{"v":"2673","n":"民丰县"},{"v":"2674","n":"皮山县"}]},{"v":"2675","n":"阿克苏地区","c":[{"v":"2676","n":"阿克苏市"},{"v":"2678","n":"温宿县"},{"v":"2679","n":"沙雅县"},{"v":"2680","n":"拜城县"},{"v":"2681","n":"阿瓦提县"},{"v":"2682","n":"库车县"},{"v":"2683","n":"柯坪县"},{"v":"2684","n":"新和县"},{"v":"2685","n":"乌什县"}]},{"v":"2686","n":"喀什地区","c":[{"v":"2687","n":"喀什市"},{"v":"2688","n":"巴楚县"},{"v":"2689","n":"泽普县"},{"v":"2690","n":"伽师县"},{"v":"2691","n":"叶城县"},{"v":"2692","n":"岳普湖县"},{"v":"2693","n":"疏附县"},{"v":"2694","n":"疏勒县"},{"v":"2695","n":"英吉沙县"},{"v":"2696","n":"麦盖提县"},{"v":"2697","n":"莎车县"},{"v":"2698","n":"塔什库尔干县"}]},{"v":"2699","n":"克孜勒苏柯尔克孜自治州","c":[{"v":"2700","n":"阿图什市"},{"v":"2701","n":"阿合奇县"},{"v":"2702","n":"乌恰县"},{"v":"2703","n":"阿克陶县"}]},{"v":"2704","n":"巴音郭楞州","c":[{"v":"2705","n":"库尔勒市"},{"v":"2706","n":"尉犁县"},{"v":"2707","n":"和静县"},{"v":"2708","n":"博湖县"},{"v":"2709","n":"和硕县"},{"v":"2710","n":"轮台县"},{"v":"2711","n":"若羌县"},{"v":"2712","n":"且末县"},{"v":"2713","n":"焉耆县"}]},{"v":"2714","n":"昌吉州","c":[{"v":"2715","n":"昌吉市"},{"v":"2716","n":"阜康市"},{"v":"2718","n":"奇台县"},{"v":"2719","n":"玛纳斯县"},{"v":"2720","n":"吉木萨尔县"},{"v":"2721","n":"呼图壁县"},{"v":"2722","n":"木垒县"}]},{"v":"2723","n":"博尔塔拉州","c":[{"v":"52790","n":"阿拉山口市"},{"v":"2724","n":"博乐市"},{"v":"2725","n":"精河县"},{"v":"2726","n":"温泉县"}]},{"v":"2727","n":"伊犁州","c":[{"v":"4499","n":"伊宁县"},{"v":"2728","n":"伊宁市"},{"v":"2729","n":"特克斯县"},{"v":"2730","n":"尼勒克县"},{"v":"2731","n":"昭苏县"},{"v":"2732","n":"新源县"},{"v":"2733","n":"霍城县"},{"v":"2734","n":"察布查尔县"},{"v":"2735","n":"巩留县"},{"v":"4028","n":"奎屯市"}]},{"v":"2736","n":"塔城地区","c":[{"v":"2737","n":"塔城市"},{"v":"2738","n":"乌苏市"},{"v":"2739","n":"额敏县"},{"v":"2740","n":"裕民县"},{"v":"2741","n":"沙湾县"},{"v":"2742","n":"托里县"},{"v":"2743","n":"和布克赛尔县"}]},{"v":"2744","n":"阿勒泰地区","c":[{"v":"6822","n":"北屯市"},{"v":"2745","n":"阿勒泰市"},{"v":"2746","n":"富蕴县"},{"v":"2747","n":"青河县"},{"v":"2748","n":"吉木乃县"},{"v":"2749","n":"布尔津县"},{"v":"2750","n":"福海县"},{"v":"2751","n":"哈巴河县"}]}]},{"v":"32","n":"台湾","c":[{"v":"2768","n":"台湾","c":[{"v":"53504","n":"金门"},{"v":"53505","n":"连江"},{"v":"53506","n":"苗栗"},{"v":"53507","n":"南投"},{"v":"53508","n":"澎湖"},{"v":"53509","n":"屏东"},{"v":"53510","n":"台东"},{"v":"53511","n":"台中"},{"v":"53512","n":"台南"},{"v":"53513","n":"台北"},{"v":"53514","n":"桃园"},{"v":"53515","n":"云林"},{"v":"53516","n":"新北"},{"v":"53497","n":"彰化"},{"v":"53498","n":"嘉义"},{"v":"53499","n":"新竹"},{"v":"53500","n":"花莲"},{"v":"53501","n":"宜兰"},{"v":"53502","n":"高雄"},{"v":"53503","n":"基隆"}]}]},{"v":"84","n":"钓鱼岛","c":[{"v":"1310","n":"钓鱼岛","c":[{"v":"53263","n":"钓鱼岛县1"},{"v":"53281","n":"钓鱼岛全区"},{"v":"53262","n":"钓鱼岛县"}]}]},{"v":"52993","n":"港澳","c":[{"v":"52994","n":"香港特别行政区","c":[{"v":"52996","n":"中西区"},{"v":"52997","n":"东区"},{"v":"52998","n":"九龙城区"},{"v":"52999","n":"观塘区"},{"v":"53000","n":"深水埗区"},{"v":"53001","n":"湾仔区"},{"v":"53002","n":"黄大仙区"},{"v":"53003","n":"油尖旺区"},{"v":"53004","n":"离岛区"},{"v":"53005","n":"葵青区"},{"v":"53006","n":"北区"},{"v":"53007","n":"西贡区"},{"v":"53008","n":"沙田区"},{"v":"53009","n":"屯门区"},{"v":"53010","n":"大埔区"},{"v":"53011","n":"荃湾区"},{"v":"53012","n":"元朗区"},{"v":"53013","n":"香港"},{"v":"53014","n":"九龙"},{"v":"53015","n":"新界"}]},{"v":"52995","n":"澳门特别行政区","c":[{"v":"53016","n":"澳门特别行政区"},{"v":"53017","n":"澳门半岛"},{"v":"53018","n":"凼仔"},{"v":"53019","n":"路凼城"},{"v":"53020","n":"路环"}]}]}];if(true){!(__WEBPACK_AMD_DEFINE_FACTORY__ = (district),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}else{window.YDUI_DISTRICT=district}}();

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return _;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetch_upload_image_in_good = fetch_upload_image_in_good;
function fetch_upload_image_in_good(opt) {
    var self = this;
    ajaxForm({
        type: 'post',
        data: opt.data,
        url: "/shop/public/index/good/upload_image",
        progress: function progress(num) {
            // layer.msg(num + '%');
        },
        success: function success(returnJson) {
            opt.success && opt.success.call(self, returnJson);
        }
    });
}

function _ajax(url) {
    var self = this;
    var index = 0;
    return function (opt) {
        ajax({
            type: 'post',
            data: opt.data,
            url: url,
            before: function before() {
                opt.before && opt.before.call();
            },
            success: function success(returnJson) {
                opt.success && opt.success.call(self, returnJson);
            }
        });
    };
}
var fetch_good_add = exports.fetch_good_add = _ajax("/shop/public/index/good/add");

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "yd-cell-group",
        [
          _c("yd-cell-item", [
            _c("span", { attrs: { slot: "left" }, slot: "left" }, [
              _vm._v("标题")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.good.title,
                  expression: "good.title"
                }
              ],
              attrs: { slot: "right", type: "text" },
              domProps: { value: _vm.good.title },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.good, "title", $event.target.value)
                }
              },
              slot: "right"
            })
          ]),
          _vm._v(" "),
          _c("yd-cell-item", [
            _c("span", { attrs: { slot: "left" }, slot: "left" }, [
              _vm._v("省市县")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.good.a_s_s_x,
                  expression: "good.a_s_s_x"
                }
              ],
              attrs: {
                slot: "right",
                type: "text",
                readonly: "",
                placeholder: "请选择收货地址"
              },
              domProps: { value: _vm.good.a_s_s_x },
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  _vm.show1 = true
                },
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.good, "a_s_s_x", $event.target.value)
                }
              },
              slot: "right"
            })
          ]),
          _vm._v(" "),
          _c("yd-cell-item", [
            _c("span", { attrs: { slot: "left" }, slot: "left" }, [
              _vm._v("街道地址")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.good.a_address,
                  expression: "good.a_address"
                }
              ],
              attrs: { slot: "right", type: "text" },
              domProps: { value: _vm.good.a_address },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.good, "a_address", $event.target.value)
                }
              },
              slot: "right"
            })
          ]),
          _vm._v(" "),
          _c("yd-cell-item", [
            _c("span", { attrs: { slot: "left" }, slot: "left" }, [
              _vm._v("价格")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.good.price,
                  expression: "good.price"
                }
              ],
              attrs: { slot: "right", type: "number" },
              domProps: { value: _vm.good.price },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.good, "price", $event.target.value)
                }
              },
              slot: "right"
            })
          ]),
          _vm._v(" "),
          _c("yd-cell-item", [
            _c("span", { attrs: { slot: "left" }, slot: "left" }, [
              _vm._v("图片上传")
            ]),
            _vm._v(" "),
            _c("input", {
              attrs: { slot: "right", type: "file" },
              on: { change: _vm.file_change },
              slot: "right"
            })
          ]),
          _vm._v(" "),
          _c(
            "yd-cell-item",
            [
              _c("span", { attrs: { slot: "left" }, slot: "left" }, [
                _vm._v("表述")
              ]),
              _vm._v(" "),
              _c("yd-textarea", {
                attrs: {
                  slot: "right",
                  placeholder: "输入商品描述",
                  maxlength: "100"
                },
                slot: "right",
                model: {
                  value: _vm.good.desc,
                  callback: function($$v) {
                    _vm.$set(_vm.good, "desc", $$v)
                  },
                  expression: "good.desc"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "yd-button",
        {
          attrs: { slot: "right", size: "large", type: "primary" },
          nativeOn: {
            click: function($event) {
              return _vm.click_submit($event)
            }
          },
          slot: "right"
        },
        [_vm._v("提交")]
      ),
      _vm._v(" "),
      _c("yd-cityselect", {
        attrs: { callback: _vm.result1, items: _vm.district },
        model: {
          value: _vm.show1,
          callback: function($$v) {
            _vm.show1 = $$v
          },
          expression: "show1"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-718af0a8", esExports)
  }
}

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_header_vue__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_header_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_header_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_header_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_header_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_d4ed99d6_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_header_vue__ = __webpack_require__(149);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_header_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_d4ed99d6_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_header_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "application\\index\\view\\index\\add\\header.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d4ed99d6", Component.options)
  } else {
    hotAPI.reload("data-v-d4ed99d6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

/*! vue-ydui v1.2.0 by YDCSS (c) 2018 Licensed MIT */
!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ydui=t():e.ydui=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="/dist/",t(0)}({0:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.NavBarNextIcon=t.NavBarBackIcon=t.NavBar=void 0;var o=n(110),i=r(o),a=n(108),s=r(a),l=n(109),c=r(l);t.NavBar=i.default,t.NavBarBackIcon=s.default,t.NavBarNextIcon=c.default},1:function(e,t){e.exports=function(e,t,n,r){var o,i=e=e||{},a=typeof e.default;"object"!==a&&"function"!==a||(o=e,i=e.default);var s="function"==typeof i?i.options:i;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),n&&(s._scopeId=n),r){var l=s.computed||(s.computed={});Object.keys(r).forEach(function(e){var t=r[e];l[e]=function(){return t}})}return{esModule:o,exports:i,options:s}}},2:function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var a=t[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},3:function(e,t,n){function r(e){for(var t=0;t<e.length;t++){var n=e[t],r=d[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(i(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var a=[],o=0;o<n.parts.length;o++)a.push(i(n.parts[o]));d[n.id]={id:n.id,refs:1,parts:a}}}}function o(){var e=document.createElement("style");return e.type="text/css",f.appendChild(e),e}function i(e){var t,n,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(r){if(v)return b;r.parentNode.removeChild(r)}if(m){var i=p++;r=u||(u=o()),t=a.bind(null,r,i,!1),n=a.bind(null,r,i,!0)}else r=o(),t=s.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}function a(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=x(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function s(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var l="undefined"!=typeof document,c=n(4),d={},f=l&&(document.head||document.getElementsByTagName("head")[0]),u=null,p=0,v=!1,b=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){v=n;var o=c(e,t);return r(o),function(t){for(var n=[],i=0;i<o.length;i++){var a=o[i],s=d[a.id];s.refs--,n.push(s)}t?(o=c(e,t),r(o)):o=[];for(var i=0;i<n.length;i++){var s=n[i];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete d[s.id]}}}};var x=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},4:function(e,t){e.exports=function(e,t){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],a=i[0],s=i[1],l=i[2],c=i[3],d={id:e+":"+o,css:s,media:l,sourceMap:c};r[a]?r[a].parts.push(d):n.push(r[a]={id:a,parts:[d]})}return n}},5:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var e=function(e){e.preventDefault(),e.stopPropagation()},t=!1;return{lock:function(n){t||(t=!0,(n||document).addEventListener("touchmove",e))},unlock:function(n){t=!1,(n||document).removeEventListener("touchmove",e)}}}(),r=function(){return{lock:function(e){o&&c(e||document.body,"g-fix-ios-prevent-scroll")},unlock:function(e){o&&d(e||document.body,"g-fix-ios-prevent-scroll")}}}(),o=!!(window.navigator&&window.navigator.userAgent||"").match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),i=function(e){var t=/^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/,n=/^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/,r=/^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;return t.test(e)||n.test(e)||r.test(e)},a=function(e){for(var t=e;t&&"HTML"!==t.tagName&&"BODY"!==t.tagName&&1===t.nodeType;){var n=document.defaultView.getComputedStyle(t).overflowY;if("scroll"===n||"auto"===n)return t;t=t.parentNode}return window},s=function(e,t){var n=e===window?document.body.offsetHeight:e.offsetHeight,r=e===window?0:e.getBoundingClientRect().top,o=t.getBoundingClientRect().top-r,i=o+t.offsetHeight;return o>=0&&o<n||i>0&&i<=n},l=function(e,t){return t=t||"",!(0===t.replace(/\s/g,"").length||!e)&&new RegExp(" "+t+" ").test(" "+e.className+" ")},c=function(e,t){l(e,t)||(e.className=""===e.className?t:e.className+" "+t)},d=function(e,t){if(l(e,t)){for(var n=" "+e.className.replace(/[\t\r\n]/g,"")+" ";n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},f=function(e){function t(n,r,o){if(n===r)return void("function"==typeof i&&i());var a=n+o>r?r:n+o;n>r&&(a=n-o<r?r:n-o),e===window?window.scrollTo(a,a):e.scrollTop=a,window.requestAnimationFrame(function(){return t(a,r,o)})}var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments[2],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:500,i=arguments[4];window.requestAnimationFrame||(window.requestAnimationFrame=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return window.setTimeout(e,1e3/60)});var a=Math.abs(n-r),s=Math.ceil(a/o*50);t(n,r,s)};t.pageScroll=n,t.preventScroll=r,t.isIOS=o,t.isColor=i,t.getScrollview=a,t.checkInview=s,t.addClass=c,t.removeClass=d,t.scrollTop=f},61:function(e,t,n){t=e.exports=n(2)(),t.push([e.id,'.yd-navbar{height:45px;position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.yd-navbar:after{content:"";position:absolute;z-index:2;bottom:0;left:0;width:100%;border-bottom:1px solid #b2b2b2;-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}.yd-navbar-fixed{position:fixed;top:0;left:0;width:100%;z-index:100}.yd-navbar-item{-webkit-box-flex:0;-webkit-flex:0 0 25%;-ms-flex:0 0 25%;flex:0 0 25%;padding:0 10px;font-size:15px;white-space:nowrap;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;color:inherit}.yd-navbar-item:first-child{-webkit-box-ordinal-group:2;-webkit-order:1;-ms-flex-order:1;order:1;margin-right:-25%}.yd-navbar-item:last-child{-webkit-box-ordinal-group:4;-webkit-order:3;-ms-flex-order:3;order:3}.yd-navbar-item:last-child,.yd-navbar-item:last-child>a{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}.yd-navbar-item>a{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:45px;min-width:25%;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.yd-navbar-center-box{-webkit-box-ordinal-group:3;-webkit-order:2;-ms-flex-order:2;order:2;height:45px;width:50%;margin-left:25%}.yd-navbar-center{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:inherit}.yd-navbar-center-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.yd-navbar-center img{height:60%}.yd-back-icon:before,.yd-next-icon:before{display:inline-block;font-family:YDUI-INLAY;font-size:18px;color:inherit}.yd-back-icon:before{content:"\\E607"}.yd-next-icon:before{content:"\\E608"}',""])},108:function(e,t,n){var r=n(1)(n(284),n(151),null,null);e.exports=r.exports},109:function(e,t,n){var r=n(1)(n(285),n(163),null,null);e.exports=r.exports},110:function(e,t,n){n(235);var r=n(1)(n(286),n(187),null,null);e.exports=r.exports},151:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("i",{staticClass:"yd-back-icon",style:{color:e.color}}),e._t("default")],2)},staticRenderFns:[]}},163:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[e._t("default"),n("i",{staticClass:"yd-next-icon",style:{color:e.color}})],2)},staticRenderFns:[]}},187:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",{staticClass:"yd-navbar navbar-bottom-line-color",class:e.classes,style:{backgroundColor:e.bgcolor,height:e.height}},[n("div",{staticClass:"yd-navbar-item"},[e._t("left")],2),e._v(" "),n("div",{staticClass:"yd-navbar-center-box",style:{height:e.height}},[n("div",{staticClass:"yd-navbar-center"},[e._t("center",[n("span",{staticClass:"yd-navbar-center-title",style:{color:e.color,fontSize:e.fontsize}},[e._v(e._s(e.title))])])],2)]),e._v(" "),n("div",{staticClass:"yd-navbar-item"},[e._t("right")],2)])},staticRenderFns:[]}},235:function(e,t,n){var r=n(61);"string"==typeof r&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals);n(3)("042d9a98",r,!0)},284:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(5);t.default={name:"yd-navbar-back-icon",props:{color:{validator:function(e){return!e||(0,r.isColor)(e)},default:"#5C5C5C"}}}},285:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(5);t.default={name:"yd-navbar-next-icon",props:{color:{validator:function(e){return!e||(0,r.isColor)(e)},default:"#5C5C5C"}}}},286:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(5);t.default={name:"yd-navbar",props:{title:String,fixed:Boolean,bgcolor:{validator:function(e){return!e||(0,r.isColor)(e)},default:"#FFF"},color:{validator:function(e){return!e||(0,r.isColor)(e)},default:"#5C5C5C"},fontsize:{validator:function(e){return/^(\.|\d+\.)?\d+(px|rem)$/.test(e)},default:"20px"},height:{validator:function(e){return/^(\.|\d+\.)?\d+(px|rem)$/.test(e)},default:"50px"}},computed:{classes:function(){return this.fixed?"yd-navbar-fixed":""}}}}})});

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "yd-navbar",
    { attrs: { title: "添加二手商品" } },
    [
      _c(
        "router-link",
        { attrs: { slot: "left", to: "/app" }, slot: "left" },
        [_c("yd-navbar-back-icon")],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-d4ed99d6", esExports)
  }
}

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("yd-layout", [_c("Header"), _vm._v(" "), _c("Infor")], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-38295204", esExports)
  }
}

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_search_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_search_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_search_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_search_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_search_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_044a669f_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_search_vue__ = __webpack_require__(153);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_search_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_044a669f_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_search_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "application\\index\\view\\index\\index\\search.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-044a669f", Component.options)
  } else {
    hotAPI.reload("data-v-044a669f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

/*! vue-ydui v1.2.0 by YDCSS (c) 2018 Licensed MIT */
!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ydui=t():e.ydui=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="/dist/",t(0)}({0:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Search=void 0;var a=r(126),o=n(a);t.Search=o.default},1:function(e,t){e.exports=function(e,t,r,n){var a,o=e=e||{},i=typeof e.default;"object"!==i&&"function"!==i||(a=e,o=e.default);var s="function"==typeof o?o.options:o;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),r&&(s._scopeId=r),n){var l=s.computed||(s.computed={});Object.keys(n).forEach(function(e){var t=n[e];l[e]=function(){return t}})}return{esModule:a,exports:o,options:s}}},2:function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var r=this[t];r[2]?e.push("@media "+r[2]+"{"+r[1]+"}"):e.push(r[1])}return e.join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},a=0;a<this.length;a++){var o=this[a][0];"number"==typeof o&&(n[o]=!0)}for(a=0;a<t.length;a++){var i=t[a];"number"==typeof i[0]&&n[i[0]]||(r&&!i[2]?i[2]=r:r&&(i[2]="("+i[2]+") and ("+r+")"),e.push(i))}},e}},3:function(e,t,r){function n(e){for(var t=0;t<e.length;t++){var r=e[t],n=c[r.id];if(n){n.refs++;for(var a=0;a<n.parts.length;a++)n.parts[a](r.parts[a]);for(;a<r.parts.length;a++)n.parts.push(o(r.parts[a]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{for(var i=[],a=0;a<r.parts.length;a++)i.push(o(r.parts[a]));c[r.id]={id:r.id,refs:1,parts:i}}}}function a(){var e=document.createElement("style");return e.type="text/css",d.appendChild(e),e}function o(e){var t,r,n=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(n){if(h)return m;n.parentNode.removeChild(n)}if(v){var o=f++;n=p||(p=a()),t=i.bind(null,n,o,!1),r=i.bind(null,n,o,!0)}else n=a(),t=s.bind(null,n),r=function(){n.parentNode.removeChild(n)};return t(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;t(e=n)}else r()}}function i(e,t,r,n){var a=r?"":n.css;if(e.styleSheet)e.styleSheet.cssText=y(t,a);else{var o=document.createTextNode(a),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(o,i[t]):e.appendChild(o)}}function s(e,t){var r=t.css,n=t.media,a=t.sourceMap;if(n&&e.setAttribute("media",n),a&&(r+="\n/*# sourceURL="+a.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var l="undefined"!=typeof document,u=r(4),c={},d=l&&(document.head||document.getElementsByTagName("head")[0]),p=null,f=0,h=!1,m=function(){},v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,r){h=r;var a=u(e,t);return n(a),function(t){for(var r=[],o=0;o<a.length;o++){var i=a[o],s=c[i.id];s.refs--,r.push(s)}t?(a=u(e,t),n(a)):a=[];for(var o=0;o<r.length;o++){var s=r[o];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete c[s.id]}}}};var y=function(){var e=[];return function(t,r){return e[t]=r,e.filter(Boolean).join("\n")}}()},4:function(e,t){e.exports=function(e,t){for(var r=[],n={},a=0;a<t.length;a++){var o=t[a],i=o[0],s=o[1],l=o[2],u=o[3],c={id:e+":"+a,css:s,media:l,sourceMap:u};n[i]?n[i].parts.push(c):r.push(n[i]={id:i,parts:[c]})}return r}},5:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){var e=function(e){e.preventDefault(),e.stopPropagation()},t=!1;return{lock:function(r){t||(t=!0,(r||document).addEventListener("touchmove",e))},unlock:function(r){t=!1,(r||document).removeEventListener("touchmove",e)}}}(),n=function(){return{lock:function(e){a&&u(e||document.body,"g-fix-ios-prevent-scroll")},unlock:function(e){a&&c(e||document.body,"g-fix-ios-prevent-scroll")}}}(),a=!!(window.navigator&&window.navigator.userAgent||"").match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),o=function(e){var t=/^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/,r=/^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/,n=/^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;return t.test(e)||r.test(e)||n.test(e)},i=function(e){for(var t=e;t&&"HTML"!==t.tagName&&"BODY"!==t.tagName&&1===t.nodeType;){var r=document.defaultView.getComputedStyle(t).overflowY;if("scroll"===r||"auto"===r)return t;t=t.parentNode}return window},s=function(e,t){var r=e===window?document.body.offsetHeight:e.offsetHeight,n=e===window?0:e.getBoundingClientRect().top,a=t.getBoundingClientRect().top-n,o=a+t.offsetHeight;return a>=0&&a<r||o>0&&o<=r},l=function(e,t){return t=t||"",!(0===t.replace(/\s/g,"").length||!e)&&new RegExp(" "+t+" ").test(" "+e.className+" ")},u=function(e,t){l(e,t)||(e.className=""===e.className?t:e.className+" "+t)},c=function(e,t){if(l(e,t)){for(var r=" "+e.className.replace(/[\t\r\n]/g,"")+" ";r.indexOf(" "+t+" ")>=0;)r=r.replace(" "+t+" "," ");e.className=r.replace(/^\s+|\s+$/g,"")}},d=function(e){function t(r,n,a){if(r===n)return void("function"==typeof o&&o());var i=r+a>n?n:r+a;r>n&&(i=r-a<n?n:r-a),e===window?window.scrollTo(i,i):e.scrollTop=i,window.requestAnimationFrame(function(){return t(i,n,a)})}var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments[2],a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:500,o=arguments[4];window.requestAnimationFrame||(window.requestAnimationFrame=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return window.setTimeout(e,1e3/60)});var i=Math.abs(r-n),s=Math.ceil(i/a*50);t(r,n,s)};t.pageScroll=r,t.preventScroll=n,t.isIOS=a,t.isColor=o,t.getScrollview=i,t.checkInview=s,t.addClass=u,t.removeClass=c,t.scrollTop=d},15:function(e,t,r){t=e.exports=r(2)(),t.push([e.id,'.yd-input{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.yd-input>input{display:block;width:100%;height:100%;border:none;font-size:inherit}.yd-input>input::-webkit-search-cancel-button{-webkit-appearance:none}.yd-input-clear,.yd-input-error,.yd-input-password,.yd-input-success,.yd-input-warn{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.yd-input-clear:after,.yd-input-error:after,.yd-input-password:after,.yd-input-success:after,.yd-input-warn:after{font-family:YDUI-INLAY}.yd-input-clear{height:100%;padding-right:7px;padding-left:10px}.yd-input-clear:after{content:"\\E60C";color:#b2b2b2;font-size:15px}.yd-input-error:after{content:"\\E614";color:#f43530;font-size:20px}.yd-input-warn:after{content:"\\E614";color:#10aeff;font-size:20px}.yd-input-success:after{content:"\\E601";color:#09bb07;font-size:20px}.yd-input-password:after{content:"\\E77E";color:#b2b2b2;font-size:22px}.yd-input-password-open:after{content:"\\E77D";color:#434343}',""])},19:function(e,t,r){r(26);var n=r(1)(r(30),r(22),null,null);e.exports=n.exports},22:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"yd-input"},["mobile"==e.regex?[r("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],ref:"input",attrs:{type:"tel",pattern:"[0-9]*",name:e.name,maxlength:"11",placeholder:e.placeholder,autocomplete:e.autocomplete,readonly:e.readonly,disabled:e.disabled},domProps:{value:e.currentValue},on:{focus:e.focusHandler,blur:e.blurHandler,input:function(t){t.target.composing||(e.currentValue=t.target.value)}}})]:["password"==e.type?[e.showPwd?e._e():r("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],ref:"input",attrs:{type:"password",name:e.name,maxlength:e.max,placeholder:e.placeholder,autocomplete:e.autocomplete,readonly:e.readonly,disabled:e.disabled},domProps:{value:e.currentValue},on:{focus:e.focusHandler,blur:e.blurHandler,input:function(t){t.target.composing||(e.currentValue=t.target.value)}}}),e._v(" "),e.showPwd?r("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],ref:"input",attrs:{type:"text",name:e.name,maxlength:e.max,placeholder:e.placeholder,autocomplete:e.autocomplete,readonly:e.readonly,disabled:e.disabled},domProps:{value:e.currentValue},on:{focus:e.focusHandler,blur:e.blurHandler,input:function(t){t.target.composing||(e.currentValue=t.target.value)}}}):e._e()]:e._e(),e._v(" "),"text"==e.type?r("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],ref:"input",attrs:{type:"text",name:e.name,maxlength:e.max,placeholder:e.placeholder,autocomplete:e.autocomplete,readonly:e.readonly,disabled:e.disabled},domProps:{value:e.currentValue},on:{focus:e.focusHandler,blur:e.blurHandler,input:function(t){t.target.composing||(e.currentValue=t.target.value)}}}):e._e(),e._v(" "),"search"==e.type?r("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],ref:"input",attrs:{type:"search",name:e.name,maxlength:e.max,placeholder:e.placeholder,autocomplete:e.autocomplete,readonly:e.readonly,disabled:e.disabled},domProps:{value:e.currentValue},on:{focus:e.focusHandler,blur:e.blurHandler,input:function(t){t.target.composing||(e.currentValue=t.target.value)}}}):e._e(),e._v(" "),"number"==e.type?r("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],ref:"input",attrs:{type:"number",name:e.name,maxlength:e.max,placeholder:e.placeholder,autocomplete:e.autocomplete,readonly:e.readonly,disabled:e.disabled},domProps:{value:e.currentValue},on:{focus:e.focusHandler,blur:e.blurHandler,input:function(t){t.target.composing||(e.currentValue=t.target.value)}}}):e._e(),e._v(" "),"email"==e.type?r("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],ref:"input",attrs:{type:"email",name:e.name,maxlength:e.max,placeholder:e.placeholder,autocomplete:e.autocomplete,readonly:e.readonly,disabled:e.disabled},domProps:{value:e.currentValue},on:{focus:e.focusHandler,blur:e.blurHandler,input:function(t){t.target.composing||(e.currentValue=t.target.value)}}}):e._e(),e._v(" "),"tel"==e.type?r("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],ref:"input",attrs:{type:"tel",name:e.name,maxlength:e.max,placeholder:e.placeholder,autocomplete:e.autocomplete,readonly:e.readonly,disabled:e.disabled},domProps:{value:e.currentValue},on:{focus:e.focusHandler,blur:e.blurHandler,input:function(t){t.target.composing||(e.currentValue=t.target.value)}}}):e._e(),e._v(" "),"datetime-local"==e.type?r("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],ref:"input",attrs:{type:"datetime-local",name:e.name,maxlength:e.max,placeholder:e.placeholder,autocomplete:e.autocomplete,readonly:e.readonly,disabled:e.disabled},domProps:{value:e.currentValue},on:{focus:e.focusHandler,blur:e.blurHandler,input:function(t){t.target.composing||(e.currentValue=t.target.value)}}}):e._e(),e._v(" "),"date"==e.type?r("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],ref:"input",attrs:{type:"date",name:e.name,maxlength:e.max,placeholder:e.placeholder,autocomplete:e.autocomplete,readonly:e.readonly,disabled:e.disabled},domProps:{value:e.currentValue},on:{focus:e.focusHandler,blur:e.blurHandler,input:function(t){t.target.composing||(e.currentValue=t.target.value)}}}):e._e(),e._v(" "),"time"==e.type?r("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],ref:"input",attrs:{type:"time",name:e.name,maxlength:e.max,placeholder:e.placeholder,autocomplete:e.autocomplete,readonly:e.readonly,disabled:e.disabled},domProps:{value:e.currentValue},on:{focus:e.focusHandler,blur:e.blurHandler,input:function(t){t.target.composing||(e.currentValue=t.target.value)}}}):e._e()],e._v(" "),r("a",{directives:[{name:"show",rawName:"v-show",value:e.showClearIcon&&e.showClear&&!e.isempty,expression:"showClearIcon && showClear && !isempty"}],staticClass:"yd-input-clear",attrs:{href:"javascript:;",tabindex:"-1"},on:{click:e.clearInput}}),e._v(" "),e.showErrorIcon?r("span",{directives:[{name:"show",rawName:"v-show",value:(!!e.regex||!!e.min||!!e.max||e.required)&&e.iserror&&e.initError,expression:"(!!regex || !!min || !!max || required) && iserror && initError"}],staticClass:"yd-input-error"}):e._e(),e._v(" "),e.showRequiredIcon&&e.showErrorIcon?r("span",{directives:[{name:"show",rawName:"v-show",value:(e.required||!!e.min&&e.min>0)&&e.isempty&&e.showWarn,expression:"(required || (!!min && min > 0)) && isempty && showWarn"}],staticClass:"yd-input-warn"}):e._e(),e._v(" "),e.showSuccessIcon?r("span",{directives:[{name:"show",rawName:"v-show",value:(!!e.regex||!!e.min||!!e.max||e.required)&&!e.iserror&&""!=e.currentValue,expression:"(!!regex || !!min || !!max || required) && !iserror && currentValue != ''"}],staticClass:"yd-input-success"}):e._e(),e._v(" "),"password"==e.type?r("a",{staticClass:"yd-input-password",class:e.showPwd?"yd-input-password-open":"",attrs:{href:"javascript:;",tabindex:"-1"},on:{click:function(t){t.stopPropagation(),e.showPwd=!e.showPwd}}}):e._e()],2)},staticRenderFns:[]}},26:function(e,t,r){var n=r(15);"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals);r(3)("c4b1a676",n,!0)},30:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"yd-input",data:function(){return{currentValue:this.value,isempty:!this.value,iserror:!1,showPwd:!1,showClear:!1,showWarn:!0,initError:!1,valid:!0,errorMsg:"",errorCode:"",regexObj:{email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",mobile:"^(86)?1[3,4,5,7,8]\\d{9}$",bankcard:"^\\d{15,19}$"}}},props:{name:String,placeholder:String,value:[String,Number],readonly:Boolean,disabled:Boolean,regex:String,autocomplete:{type:String,default:"off"},showClearIcon:{type:Boolean,default:!0},showErrorIcon:{type:Boolean,default:!0},showSuccessIcon:{type:Boolean,default:!0},showRequiredIcon:{type:Boolean,default:!0},required:{type:Boolean,default:!1},type:{validator:function(e){return["text","password","search","email","number","tel","datetime-local","date","time"].indexOf(e)>-1},default:"text"},max:{validator:function(e){return/^\d*$/.test(e)}},min:{validator:function(e){return/^\d*$/.test(e)}},onBlur:{type:Function},onFocus:{type:Function}},watch:{value:function(e){this.currentValue=e,this.emitInput()},currentValue:function(e){this.isempty=!e,this.validatorInput(e,!0),this.emitInput()},required:function(e){this.required=e,this.validatorInput(this.currentValue,!1)}},methods:{validatorInput:function(e,t){if(this.initError=t,t&&(this.showWarn=!1),this.required&&""===e)return this.setError("不能为空","NOT_NULL"),void(this.iserror=!0);if(this.min&&e.length<this.min)return this.setError("最少输入"+this.min+"位字符","NOT_MIN_SIZE"),void(this.iserror=!0);var r="bankcard"===this.regex?e.replace(/\s/g,""):e,n=this.regexObj[this.regex]?this.regexObj[this.regex]:this.trim(this.regex,"/");return r&&this.regex&&!new RegExp(n).test(r)?(this.setError("输入字符不符合规则","NOT_REGEX_RULE"),void(this.iserror=!0)):(this.iserror=!1,this.valid=!0,this.errorMsg="",void(this.errorCode=""))},blurHandler:function(e){var t=this;this.validatorInput(this.currentValue,!0),setTimeout(function(){t.showClear=!1},200),this.onBlur&&this.onBlur(e)},focusHandler:function(e){this.showClear=!0,this.onFocus&&this.onFocus(e)},clearInput:function(){this.currentValue="",this.emitInput()},emitInput:function(){return"bankcard"===this.regex?(/\S{5}/.test(this.currentValue)&&(this.currentValue=this.currentValue.replace(/\s/g,"").replace(/(\d{4})(?=\d)/g,"$1 ")),void this.$emit("input",this.currentValue.replace(/\s/g,""))):void this.$emit("input",this.currentValue)},setError:function(e,t){this.errorMsg=e,this.errorCode=t,this.valid=!1},trim:function(e,t){return e?e.replace(new RegExp("^\\"+t+"+|\\"+t+"+$","g"),""):e},setFocus:function(){this.$refs.input.focus()},setBlur:function(){this.$refs.input.blur()}},mounted:function(){this.validatorInput(this.currentValue,!1)}}},60:function(e,t,r){t=e.exports=r(2)(),t.push([e.id,'.yd-search{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.yd-search-fly{width:100%;height:100%;position:fixed;left:0;z-index:1500;-webkit-transition:opacity .15s;transition:opacity .15s;opacity:0;pointer-events:none}.yd-search-show{opacity:1;pointer-events:auto}.yd-search-input{background-color:#efeff4;border-left:none;border-right:none;padding:10px 0 10px 10px;position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.yd-search-input:after{bottom:0;border-bottom:1px solid #d8d8d8}.yd-search-input:after,.yd-search-input:before{content:"";position:absolute;z-index:0;left:0;width:100%;-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}.yd-search-input:before{top:0;border-top:1px solid #d8d8d8}.yd-search-input>.search-input{width:100%;height:30px;background-color:#fff;border:none;border-radius:3px;margin-right:10px;padding-top:1px;overflow:hidden}.yd-search-input>.search-input,.yd-search-input>.search-input .search-icon{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.yd-search-input>.search-input .search-icon{padding-left:8px;padding-right:5px;line-height:28px}.yd-search-input>.search-input .search-icon:after{content:"\\E626";font-family:YDUI-INLAY;font-size:15px;color:#b2b2b2}.yd-search-input>.cancel-text{display:block;white-space:nowrap;padding-left:10px;height:30px;line-height:32px;color:#0bb20c;font-size:14px;padding-right:10px;margin-left:-10px}.yd-search-list{overflow:auto;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;background-color:#fff;-webkit-overflow-scrolling:touch}.yd-search-list-item{position:relative;height:45px;line-height:45px;margin-left:12px;padding-left:4px;overflow:hidden;white-space:nowrap;padding-right:12px;text-overflow:ellipsis}.yd-search-list-item:after{content:"";position:absolute;z-index:0;bottom:0;left:0;width:100%;border-bottom:1px solid #d9d9d9;-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 0;transform-origin:0 0}',""])},126:function(e,t,r){r(234);var n=r(1)(r(302),r(185),null,null);e.exports=n.exports},185:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"yd-search"},[r("div",{staticClass:"yd-search-input"},[r("form",{staticClass:"search-input",attrs:{action:"#"},on:{submit:function(t){t.preventDefault(),e.submit(t)}}},[r("i",{staticClass:"search-icon"}),e._v(" "),r("yd-search-input",{ref:"search",attrs:{type:"search",placeholder:e.placeholder,readonly:e.fullpage},nativeOn:{click:function(t){e.open(t)}},model:{value:e.currentValue,callback:function(t){e.currentValue=t},expression:"currentValue"}})],1),e._v(" "),r("a",{directives:[{name:"show",rawName:"v-show",value:""!==e.currentValue,expression:"currentValue !== ''"}],staticClass:"cancel-text",attrs:{href:"javascript:;"},on:{click:function(t){e.close(!1)}}},[e._v(e._s(e.cancelText))])])]),e._v(" "),e.fullpage?[r("div",{staticClass:"yd-search yd-search-fly",class:e.show?"yd-search-show":"",style:{top:e.top}},[r("div",{staticClass:"yd-search-input"},[r("form",{staticClass:"search-input",attrs:{action:"#"},on:{submit:function(t){t.preventDefault(),e.submit(t)}}},[r("i",{staticClass:"search-icon"}),e._v(" "),r("yd-search-input",{ref:"search",attrs:{type:"search",placeholder:e.placeholder},model:{value:e.currentValue,callback:function(t){e.currentValue=t},expression:"currentValue"}})],1),e._v(" "),r("a",{staticClass:"cancel-text",attrs:{href:"javascript:;"},on:{click:function(t){e.close(!1)}}},[e._v(e._s(e.cancelText))])]),e._v(" "),r("div",{staticClass:"yd-search-list",style:{paddingBottom:e.top}},e._l(e.result,function(t,n){return r("p",{key:n,staticClass:"yd-search-list-item",on:{click:function(r){e.clickHandler(t)}}},[e._v("\n                    "+e._s(t.label||t))])}))])]:e._e()],2)},staticRenderFns:[]}},234:function(e,t,r){var n=r(60);"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals);r(3)("010fb018",n,!0)},302:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(5),o=r(19),i=n(o);t.default={name:"yd-search",extends:i.default,components:{"yd-search-input":i.default},data:function(){return{show:!1,currentValue:this.value}},props:{placeholder:{type:String,default:"搜 索"},cancelText:{type:String,default:"取消"},result:{type:Array,default:function(){return[]}},itemClick:{type:Function},value:{type:String,default:""},fullpage:{type:Boolean,default:!1},top:{validator:function(e){return/^-?(\.|\d+\.)?\d+(px|rem)$/.test(e)},default:"-1px"},onSubmit:{type:Function},onCancel:{type:Function}},watch:{currentValue:function(e){this.$emit("input",e)},value:function(e){this.currentValue=e},show:function(e){e?(this.$refs.search.setFocus(),a.isIOS&&(0,a.addClass)(this.scrollView,"g-fix-ios-overflow-scrolling-bug")):(this.$refs.search.setBlur(),a.isIOS&&(0,a.removeClass)(this.scrollView,"g-fix-ios-overflow-scrolling-bug"))}},methods:{open:function(){this.fullpage&&(this.show=!0)},close:function(e){this.show=!1,e||this.onCancel&&this.onCancel()},submit:function(){this.$refs.search.setBlur(),this.onSubmit&&this.onSubmit(this.currentValue),this.close(!0)},clickHandler:function(e){this.currentValue=e.label?e.label:e,this.itemClick&&this.itemClick(e),this.close(!0)}},destroyed:function(){a.isIOS&&(0,a.removeClass)(this.scrollView,"g-fix-ios-overflow-scrolling-bug")},mounted:function(){this.scrollView=(0,a.getScrollview)(this.$el)}}}})});

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("yd-search", {
        attrs: { "on-submit": _vm.submitHandler },
        model: {
          value: _vm.value1,
          callback: function($$v) {
            _vm.value1 = $$v
          },
          expression: "value1"
        }
      }),
      _vm._v(" "),
      _c(
        "yd-cell-group",
        [
          _c("yd-cell-item", [
            _c("span", { attrs: { slot: "left" }, slot: "left" }, [
              _vm._v("左边内容一")
            ]),
            _vm._v(" "),
            _c("span", { attrs: { slot: "right" }, slot: "right" }, [
              _vm._v("右边内容一")
            ])
          ]),
          _vm._v(" "),
          _c("yd-cell-item", [
            _c("span", { attrs: { slot: "left" }, slot: "left" }, [
              _vm._v("左边内容二")
            ]),
            _vm._v(" "),
            _c("span", { attrs: { slot: "right" }, slot: "right" }, [
              _vm._v("右边内容二")
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("yd-button", { attrs: { size: "large", type: "primary" } }, [
        _vm._v("primary")
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-044a669f", esExports)
  }
}

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(34)))

/***/ })
],[131]);
//# sourceMappingURL=index.js.map