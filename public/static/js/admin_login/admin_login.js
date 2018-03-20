webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 1 */
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

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2)))

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(5)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 6 */
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
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = __webpack_require__(25);

var _fetch = __webpack_require__(42);

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

var set_user_name = _store.actionTypes.set_user_name,
    set_user_password = _store.actionTypes.set_user_password;
exports.default = {
  data: function data() {
    return {};
  },

  methods: {
    input_name: function input_name(event) {
      var self = this;
      var _$store = this.$store,
          dispatch = _$store.dispatch,
          state = _$store.state;
      var user = state.user;

      var input_value = event.target.value;
      if (input_value) {
        dispatch(set_user_name, { name: input_value });
      }
    },
    input_password: function input_password(event) {
      var self = this;
      var _$store2 = this.$store,
          dispatch = _$store2.dispatch,
          state = _$store2.state;
      var user = state.user;

      var input_value = event.target.value;
      if (input_value) {
        dispatch(set_user_password, { password: input_value });
      }
    },
    click_login: function click_login() {
      var self = this;
      var _$store3 = this.$store,
          dispatch = _$store3.dispatch,
          state = _$store3.state;
      var user = state.user;

      (0, _fetch.fetch_logging)({
        data: user,
        success: function success(res) {
          var returnJson = JSON.parse(res);
          if (returnJson["success"]) {
            self.$router.go("/shop/public/admin/index/index");
          } else {
            Vue.toasted.show("密码账户出错");
          }
        }
      });
    }
  },
  mounted: function mounted() {
    // this.dom_captcha = document.querySelector("#captcha");
  }
};

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(1);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _login = __webpack_require__(15);

var _login2 = _interopRequireDefault(_login);

var _store = __webpack_require__(25);

var _vueToasted = __webpack_require__(43);

var _vueToasted2 = _interopRequireDefault(_vueToasted);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueToasted2.default);
var routes = [{ path: '/', component: _login2.default }];
var router = new _vueRouter2.default({
    routes: routes
});

new _vue2.default({
    el: "#root",
    store: _store.store,
    router: router
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_login_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_login_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_login_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_login_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_3f48b986_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_login_vue__ = __webpack_require__(18);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(16)
}
var normalizeComponent = __webpack_require__(6)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3f48b986"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_login_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_3f48b986_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_login_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "application\\admin\\view\\login\\login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3f48b986", Component.options)
  } else {
    hotAPI.reload("data-v-3f48b986", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("3633c3dc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js?sourceMap!../../../../node_modules/_vue-loader@13.7.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3f48b986\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/_vue-loader@13.7.1@vue-loader/lib/selector.js?type=styles&index=0!./login.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js?sourceMap!../../../../node_modules/_vue-loader@13.7.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3f48b986\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/_vue-loader@13.7.1@vue-loader/lib/selector.js?type=styles&index=0!./login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "\na[data-v-3f48b986] {\r\n  -webkit-text-decoration-color: #333;\r\n          text-decoration-color: #333;\r\n  text-decoration: none;\r\n  color: #333;\n}\n.header[data-v-3f48b986] {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  padding: 10px;\r\n  background: cadetblue;\r\n  color: #fff;\n}\n.header .left[data-v-3f48b986] {\r\n  width: 100px;\n}\n.header .left a[data-v-3f48b986] {\r\n  color: #fff;\n}\n.header .right[data-v-3f48b986] {\r\n  width: 100px;\n}\n.header .title[data-v-3f48b986] {\r\n  text-align: center;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\n}\n.form_item[data-v-3f48b986] {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  padding: 30px;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n          align-items: center;\n}\n.form_item .image[data-v-3f48b986] {\r\n  -webkit-box-flex: 1px;\r\n  -webkit-flex: 1px;\r\n          flex: 1px;\r\n  height: 40px;\r\n  background: #eee;\n}\n.form_item .image img[data-v-3f48b986] {\r\n  width: 100%;\r\n  height: 100%;\n}\n.form_item .tlabel[data-v-3f48b986] {\r\n  width: 100px;\r\n  text-align: center;\n}\n.form_item input[data-v-3f48b986] {\r\n  border: none;\r\n  background: #eee;\r\n  height: 40px;\r\n  line-height: 40px;\r\n  width: 100%;\n}\n.form_item button[data-v-3f48b986] {\r\n  height: 40px;\r\n  line-height: 40px;\r\n  margin: 10px;\n}\n.btns[data-v-3f48b986] {\r\n  text-align: center;\r\n  -webkit-box-pack: center;\r\n  -webkit-justify-content: center;\r\n          justify-content: center;\n}\r\n", "", {"version":3,"sources":["C:/phpstudy/WWW/shop/application/admin/view/login/application/admin/view/login/login.vue"],"names":[],"mappings":";AAqFA;EACA,oCAAA;UAAA,4BAAA;EACA,sBAAA;EACA,YAAA;CACA;AACA;EACA,qBAAA;EAAA,sBAAA;EAAA,cAAA;EACA,cAAA;EACA,sBAAA;EACA,YAAA;CACA;AACA;EACA,aAAA;CACA;AACA;EACA,YAAA;CACA;AACA;EACA,aAAA;CACA;AACA;EACA,mBAAA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;CACA;AACA;EACA,qBAAA;EAAA,sBAAA;EAAA,cAAA;EACA,cAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AACA;EACA,sBAAA;EAAA,kBAAA;UAAA,UAAA;EACA,aAAA;EACA,iBAAA;CACA;AACA;EACA,YAAA;EACA,aAAA;CACA;AACA;EACA,aAAA;EACA,mBAAA;CACA;AACA;EACA,aAAA;EACA,iBAAA;EACA,aAAA;EACA,kBAAA;EACA,YAAA;CACA;AACA;EACA,aAAA;EACA,kBAAA;EACA,aAAA;CACA;AACA;EACA,mBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;CACA","file":"login.vue","sourcesContent":["<template>\r\n  <div class=\"app\">\r\n    <div class=\"header\">\r\n\r\n      <div class=\"left\">\r\n        <a href=\"/shop/public/admin\">\r\n          首页\r\n        </a>\r\n      </div>\r\n      <div class=\"title\">登录</div>\r\n      <div class=\"right\"></div>\r\n    </div>\r\n\r\n    <div class=\"input\">\r\n      <div class=\"name form_item\">\r\n        <div class=\"tlabel\">名字</div>\r\n        <input type=\"text\" :value=\"$store.state.user.name\" @input=\"input_name\" />\r\n      </div>\r\n      <div class=\"password form_item\">\r\n        <div class=\"tlabel\">密码</div>\r\n        <input type=\"password\" :value=\"$store.state.user.password\" @input=\"input_password\" />\r\n      </div>\r\n      <!-- <div class=\"captcha form_item\">\r\n        <div class=\"tlabel\">验证码</div>\r\n        <div class=\"image\">\r\n          <img src=\"\" alt=\"\" />\r\n        </div>\r\n      </div> -->\r\n      <div class=\"btns form_item\">\r\n        <button @click=\"click_login\">登录</button>\r\n        <button>注册</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n<script>\r\nimport { actionTypes } from \"./vuex/store\";\r\nimport { fetch_logging } from \"../util/fetch\";\r\nvar { set_user_name, set_user_password } = actionTypes;\r\nexport default {\r\n  data() {\r\n    return {};\r\n  },\r\n  methods: {\r\n    input_name(event) {\r\n      var self = this;\r\n      var { dispatch, state } = this.$store;\r\n      var { user } = state;\r\n      var input_value = event.target.value;\r\n      if (input_value) {\r\n        dispatch(set_user_name, { name: input_value });\r\n      }\r\n    },\r\n    input_password(event) {\r\n      var self = this;\r\n      var { dispatch, state } = this.$store;\r\n      var { user } = state;\r\n      var input_value = event.target.value;\r\n      if (input_value) {\r\n        dispatch(set_user_password, { password: input_value });\r\n      }\r\n    },\r\n    click_login() {\r\n      var self=this;\r\n      var { dispatch, state } = this.$store;\r\n      var { user } = state;\r\n      fetch_logging({\r\n        data: user,\r\n        success(res) {\r\n          var returnJson = JSON.parse(res);\r\n          if (returnJson[\"success\"]) {\r\n            self.$router.go(\"/shop/public/admin/index/index\");\r\n          } else {\r\n            Vue.toasted.show(\"密码账户出错\");\r\n          }\r\n        }\r\n      });\r\n    }\r\n  },\r\n  mounted() {\r\n    // this.dom_captcha = document.querySelector(\"#captcha\");\r\n  }\r\n};\r\n</script>\r\n<style scoped>\r\na {\r\n  text-decoration-color: #333;\r\n  text-decoration: none;\r\n  color: #333;\r\n}\r\n.header {\r\n  display: flex;\r\n  padding: 10px;\r\n  background: cadetblue;\r\n  color: #fff;\r\n}\r\n.header .left {\r\n  width: 100px;\r\n}\r\n.header .left a {\r\n  color: #fff;\r\n}\r\n.header .right {\r\n  width: 100px;\r\n}\r\n.header .title {\r\n  text-align: center;\r\n  flex: 1;\r\n}\r\n.form_item {\r\n  display: flex;\r\n  padding: 30px;\r\n  align-items: center;\r\n}\r\n.form_item .image {\r\n  flex: 1px;\r\n  height: 40px;\r\n  background: #eee;\r\n}\r\n.form_item .image img {\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n.form_item .tlabel {\r\n  width: 100px;\r\n  text-align: center;\r\n}\r\n.form_item input {\r\n  border: none;\r\n  background: #eee;\r\n  height: 40px;\r\n  line-height: 40px;\r\n  width: 100%;\r\n}\r\n.form_item button {\r\n  height: 40px;\r\n  line-height: 40px;\r\n  margin: 10px;\r\n}\r\n.btns {\r\n  text-align: center;\r\n  justify-content: center;\r\n}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "app" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "input" }, [
      _c("div", { staticClass: "name form_item" }, [
        _c("div", { staticClass: "tlabel" }, [_vm._v("名字")]),
        _vm._v(" "),
        _c("input", {
          attrs: { type: "text" },
          domProps: { value: _vm.$store.state.user.name },
          on: { input: _vm.input_name }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "password form_item" }, [
        _c("div", { staticClass: "tlabel" }, [_vm._v("密码")]),
        _vm._v(" "),
        _c("input", {
          attrs: { type: "password" },
          domProps: { value: _vm.$store.state.user.password },
          on: { input: _vm.input_password }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "btns form_item" }, [
        _c("button", { on: { click: _vm.click_login } }, [_vm._v("登录")]),
        _vm._v(" "),
        _c("button", [_vm._v("注册")])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "header" }, [
      _c("div", { staticClass: "left" }, [
        _c("a", { attrs: { href: "/shop/public/admin" } }, [
          _vm._v("\n        首页\n      ")
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "title" }, [_vm._v("登录")]),
      _vm._v(" "),
      _c("div", { staticClass: "right" })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-3f48b986", esExports)
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(24)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(34);
var IE8_DOM_DEFINE = __webpack_require__(35);
var toPrimitive = __webpack_require__(37);
var dP = Object.defineProperty;

exports.f = __webpack_require__(19) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 24 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.store = exports.actionTypes = undefined;

var _defineProperty2 = __webpack_require__(26);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations;

var _vuex = __webpack_require__(39);

var _vuex2 = _interopRequireDefault(_vuex);

var _underscore = __webpack_require__(40);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actionTypes = {};
actionTypes.set_user_name = "set_user_name";
actionTypes.set_user_password = "set_user_password";

var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, actionTypes.set_user_name, function (state, _ref) {
    var name = _ref.name;

    state.user.name = name;
}), (0, _defineProperty3.default)(_mutations, actionTypes.set_user_password, function (state, _ref2) {
    var password = _ref2.password;

    state.user.password = password;
}), _mutations);
var actions = {};
_underscore2.default.each(actionTypes, function (value, key) {
    actions[key] = function (_ref3, payload) {
        var commit = _ref3.commit;

        commit(key, payload);
    };
});

exports.actionTypes = actionTypes;
var store = exports.store = new _vuex2.default.Store({
    state: {
        user: {
            password: "",
            name: ''
        }
    },
    mutations: mutations,
    actions: actions
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(27);

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(28), __esModule: true };

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29);
var $Object = __webpack_require__(22).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(30);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(19), 'Object', { defineProperty: __webpack_require__(23).f });


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(21);
var core = __webpack_require__(22);
var ctx = __webpack_require__(31);
var hide = __webpack_require__(33);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(32);
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
/* 32 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(23);
var createDesc = __webpack_require__(38);
module.exports = __webpack_require__(19) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(20);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(19) && !__webpack_require__(24)(function () {
  return Object.defineProperty(__webpack_require__(36)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(20);
var document = __webpack_require__(21).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(20);
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
/* 38 */
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
/* 39 */
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

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2)))

/***/ }),
/* 40 */
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
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.upload_image_in_artitle = upload_image_in_artitle;
function upload_image_in_artitle(opt) {
    var self = this;
    ajaxForm({
        type: 'post',
        data: opt.data,
        url: "http://localhost/huoshu/public/index/article/upload_image",
        progress: function progress(num) {
            layer.closeAll();
            layer.msg(num + '%');
        },
        success: function success(returnJson) {
            layer.closeAll();
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
                Vue.toasted.clear();
                opt.success && opt.success.call(self, returnJson);
            }
        });
    };
}
var fetch_logging = exports.fetch_logging = _ajax("/shop/public/admin/login/logging");

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=24)}([function(t,e,n){"use strict";function r(){p=!1}function i(t){if(!t)return void(l!==d&&(l=d,r()));if(t!==l){if(t.length!==d.length)throw new Error("Custom alphabet for shortid must be "+d.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter(function(t,e,n){return e!==n.lastIndexOf(t)});if(e.length)throw new Error("Custom alphabet for shortid must be "+d.length+" unique characters. These characters were not unique: "+e.join(", "));l=t,r()}}function o(t){return i(t),l}function a(t){h.seed(t),f!==t&&(r(),f=t)}function s(){l||i(d);for(var t,e=l.split(""),n=[],r=h.nextValue();e.length>0;)r=h.nextValue(),t=Math.floor(r*e.length),n.push(e.splice(t,1)[0]);return n.join("")}function u(){return p?p:p=s()}function c(t){return u()[t]}var l,f,p,h=n(18),d="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";t.exports={characters:o,seed:a,lookup:c,shuffled:u}},function(t,e,n){"use strict";var r=n(6),i=n.n(r),o=300;e.a={animateIn:function(t){i()({targets:t,translateY:"-35px",opacity:1,duration:o,easing:"easeOutCubic"})},animateOut:function(t,e){i()({targets:t,opacity:0,marginTop:"-40px",duration:o,easing:"easeOutExpo",complete:e})},animateOutBottom:function(t,e){i()({targets:t,opacity:0,marginBottom:"-40px",duration:o,easing:"easeOutExpo",complete:e})},animateReset:function(t){i()({targets:t,left:0,opacity:1,duration:o,easing:"easeOutExpo"})},animatePanning:function(t,e,n){i()({targets:t,duration:10,easing:"easeOutQuad",left:e,opacity:n})},animatePanEnd:function(t,e){i()({targets:t,opacity:0,duration:o,easing:"easeOutExpo",complete:e})},clearAnimation:function(t){var e=i.a.timeline();t.forEach(function(t){e.add({targets:t.el,opacity:0,right:"-40px",duration:300,offset:"-=150",easing:"easeOutExpo",complete:function(){t.remove()}})})}}},function(t,e,n){"use strict";t.exports=n(15)},function(t,e,n){"use strict";function r(t,e){for(var n,r=0,o="";!n;)o+=t(e>>4*r&15|i()),n=e<Math.pow(16,r+1),r++;return o}var i=n(17);t.exports=r},function(t,e,n){"use strict";var r=n(8),i=n(1);n.d(e,"a",function(){return s});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=n(2);n(11).polyfill();var s=function t(e){var n=this;return this.id=a.generate(),this.options=e,this.cached_options={},this.global={},this.groups=[],this.toasts=[],c(this),this.group=function(e){e||(e={}),e.globalToasts||(e.globalToasts={}),Object.assign(e.globalToasts,n.global);var r=new t(e);return n.groups.push(r),r},this.register=function(t,e,r){return r=r||{},l(n,t,e,r)},this.show=function(t,e){return u(n,t,e)},this.success=function(t,e){return e=e||{},e.type="success",u(n,t,e)},this.info=function(t,e){return e=e||{},e.type="info",u(n,t,e)},this.error=function(t,e){return e=e||{},e.type="error",u(n,t,e)},this.remove=function(t){n.toasts=n.toasts.filter(function(e){return e.el.hash!==t.hash}),t.parentNode&&t.parentNode.removeChild(t)},this.clear=function(t){return i.a.clearAnimation(n.toasts,function(){t&&t()}),n.toasts=[],!0},this},u=function(t,e,i){i=i||{};var a=null;if("object"!==(void 0===i?"undefined":o(i)))return console.error("Options should be a type of object. given : "+i),null;t.options.singleton&&t.toasts.length>0&&(t.cached_options=i,t.toasts[t.toasts.length-1].goAway(0));var s=Object.assign({},t.options);return Object.assign(s,i),a=n.i(r.a)(t,e,s),t.toasts.push(a),a},c=function(t){var e=t.options.globalToasts,n=function(e,n){return"string"==typeof n&&t[n]?t[n].apply(t,[e,{}]):u(t,e,n)};e&&(t.global={},Object.keys(e).forEach(function(r){t.global[r]=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e[r].apply(null,[t,n])}}))},l=function(t,e,n,r){t.options.globalToasts||(t.options.globalToasts={}),t.options.globalToasts[e]=function(t,e){var i=null;return"string"==typeof n&&(i=n),"function"==typeof n&&(i=n(t)),e(i,r)},c(t)}},function(t,e,n){n(21);var r=n(20)(null,null,null,null);t.exports=r.exports},function(t,e,n){var r,i,o,a=this;!function(n,a){i=[],r=a,o="function"==typeof r?r.apply(e,i):r,void 0!==o&&(t.exports=o)}(this,function(){function t(t){if(!D.col(t))try{return document.querySelectorAll(t)}catch(t){}}function e(t){return t.reduce(function(t,n){return t.concat(D.arr(n)?e(n):n)},[])}function n(e){return D.arr(e)?e:(D.str(e)&&(e=t(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function r(t,e){return t.some(function(t){return t===e})}function i(t){var e,n={};for(e in t)n[e]=t[e];return n}function o(t,e){var n,r=i(t);for(n in t)r[n]=e.hasOwnProperty(n)?e[n]:t[n];return r}function s(t,e){var n,r=i(t);for(n in e)r[n]=D.und(t[n])?e[n]:t[n];return r}function u(t){t=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(t,e,n,r){return e+e+n+n+r+r});var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);t=parseInt(e[1],16);var n=parseInt(e[2],16),e=parseInt(e[3],16);return"rgb("+t+","+n+","+e+")"}function c(t){function e(t,e,n){return 0>n&&(n+=1),1<n&&--n,n<1/6?t+6*(e-t)*n:.5>n?e:n<2/3?t+(e-t)*(2/3-n)*6:t}var n=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t);t=parseInt(n[1])/360;var r=parseInt(n[2])/100,n=parseInt(n[3])/100;if(0==r)r=n=t=n;else{var i=.5>n?n*(1+r):n+r-n*r,o=2*n-i,r=e(o,i,t+1/3),n=e(o,i,t);t=e(o,i,t-1/3)}return"rgb("+255*r+","+255*n+","+255*t+")"}function l(t){if(t=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(t))return t[2]}function f(t){return-1<t.indexOf("translate")?"px":-1<t.indexOf("rotate")||-1<t.indexOf("skew")?"deg":void 0}function p(t,e){return D.fnc(t)?t(e.target,e.id,e.total):t}function h(t,e){if(e in t.style)return getComputedStyle(t).getPropertyValue(e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function d(t,e){return D.dom(t)&&r(_,e)?"transform":D.dom(t)&&(t.getAttribute(e)||D.svg(t)&&t[e])?"attribute":D.dom(t)&&"transform"!==e&&h(t,e)?"css":null!=t[e]?"object":void 0}function m(t,e){var n=f(e),n=-1<e.indexOf("scale")?1:0+n;if(t=t.style.transform,!t)return n;for(var r=[],i=[],o=[],a=/(\w+)\((.+?)\)/g;r=a.exec(t);)i.push(r[1]),o.push(r[2]);return t=o.filter(function(t,n){return i[n]===e}),t.length?t[0]:n}function v(t,e){switch(d(t,e)){case"transform":return m(t,e);case"css":return h(t,e);case"attribute":return t.getAttribute(e)}return t[e]||0}function g(t,e){var n=/^(\*=|\+=|-=)/.exec(t);if(!n)return t;switch(e=parseFloat(e),t=parseFloat(t.replace(n[0],"")),n[0][0]){case"+":return e+t;case"-":return e-t;case"*":return e*t}}function y(t){return D.obj(t)&&t.hasOwnProperty("totalLength")}function b(t,e){function n(n){return n=void 0===n?0:n,t.el.getPointAtLength(1<=e+n?e+n:0)}var r=n(),i=n(-1),o=n(1);switch(t.property){case"x":return r.x;case"y":return r.y;case"angle":return 180*Math.atan2(o.y-i.y,o.x-i.x)/Math.PI}}function x(t,e){var n=/-?\d*\.?\d+/g;if(t=y(t)?t.totalLength:t,D.col(t))e=D.rgb(t)?t:D.hex(t)?u(t):D.hsl(t)?c(t):void 0;else{var r=l(t);t=r?t.substr(0,t.length-r.length):t,e=e?t+e:t}return e+="",{original:e,numbers:e.match(n)?e.match(n).map(Number):[0],strings:e.split(n)}}function T(t,e){return e.reduce(function(e,n,r){return e+t[r-1]+n})}function w(t){return(t?e(D.arr(t)?t.map(n):n(t)):[]).filter(function(t,e,n){return n.indexOf(t)===e})}function E(t){var e=w(t);return e.map(function(t,n){return{target:t,id:n,total:e.length}})}function C(t,e){var r=i(e);if(D.arr(t)){var o=t.length;2!==o||D.obj(t[0])?D.fnc(e.duration)||(r.duration=e.duration/o):t={value:t}}return n(t).map(function(t,n){return n=n?0:e.delay,t=D.obj(t)&&!y(t)?t:{value:t},D.und(t.delay)&&(t.delay=n),t}).map(function(t){return s(t,r)})}function O(t,e){var n,r={};for(n in t){var i=p(t[n],e);D.arr(i)&&(i=i.map(function(t){return p(t,e)}),1===i.length&&(i=i[0])),r[n]=i}return r.duration=parseFloat(r.duration),r.delay=parseFloat(r.delay),r}function S(t){return D.arr(t)?X.apply(this,t):R[t]}function M(t,e){var n;return t.tweens.map(function(r){r=O(r,e);var i=r.value,o=v(e.target,t.name),a=n?n.to.original:o,a=D.arr(i)?i[0]:a,s=g(D.arr(i)?i[1]:i,a),o=l(s)||l(a)||l(o);return r.isPath=y(i),r.from=x(a,o),r.to=x(s,o),r.start=n?n.end:t.offset,r.end=r.start+r.delay+r.duration,r.easing=S(r.easing),r.elasticity=(1e3-Math.min(Math.max(r.elasticity,1),999))/1e3,D.col(r.from.original)&&(r.round=1),n=r})}function k(t,n){return e(t.map(function(t){return n.map(function(e){var n=d(t.target,e.name);if(n){var r=M(e,t);e={type:n,property:e.name,animatable:t,tweens:r,duration:r[r.length-1].end,delay:r[0].delay}}else e=void 0;return e})})).filter(function(t){return!D.und(t)})}function A(t,e,n){var r="delay"===t?Math.min:Math.max;return e.length?r.apply(Math,e.map(function(e){return e[t]})):n[t]}function P(t){var e,n=o(j,t),r=o(N,t),i=E(t.targets),a=[],u=s(n,r);for(e in t)u.hasOwnProperty(e)||"targets"===e||a.push({name:e,offset:u.offset,tweens:C(t[e],r)});return t=k(i,a),s(n,{children:[],animatables:i,animations:t,duration:A("duration",t,r),delay:A("delay",t,r)})}function I(t){function e(){return window.Promise&&new Promise(function(t){return l=t})}function n(t){return p.reversed?p.duration-t:t}function r(t){for(var e=0,n={},r=p.animations,i={};e<r.length;){var o=r[e],a=o.animatable,s=o.tweens;i.tween=s.filter(function(e){return t<e.end})[0]||s[s.length-1],i.isPath$1=i.tween.isPath,i.round=i.tween.round,i.eased=i.tween.easing(Math.min(Math.max(t-i.tween.start-i.tween.delay,0),i.tween.duration)/i.tween.duration,i.tween.elasticity),s=T(i.tween.to.numbers.map(function(t){return function(e,n){return n=t.isPath$1?0:t.tween.from.numbers[n],e=n+t.eased*(e-n),t.isPath$1&&(e=b(t.tween.value,e)),t.round&&(e=Math.round(e*t.round)/t.round),e}}(i)),i.tween.to.strings),z[o.type](a.target,o.property,s,n,a.id),o.currentValue=s,e++,i={isPath$1:i.isPath$1,tween:i.tween,eased:i.eased,round:i.round}}if(n)for(var u in n)L||(L=h(document.body,"transform")?"transform":"-webkit-transform"),p.animatables[u].target.style[L]=n[u].join(" ");p.currentTime=t,p.progress=t/p.duration*100}function i(t){p[t]&&p[t](p)}function o(){p.remaining&&!0!==p.remaining&&p.remaining--}function a(t){var a=p.duration,h=p.offset,d=p.delay,m=p.currentTime,v=p.reversed,g=n(t),g=Math.min(Math.max(g,0),a);if(p.children){var y=p.children;if(g>=p.currentTime)for(var b=0;b<y.length;b++)y[b].seek(g);else for(b=y.length;b--;)y[b].seek(g)}g>h&&g<a?(r(g),!p.began&&g>=d&&(p.began=!0,i("begin")),i("run")):(g<=h&&0!==m&&(r(0),v&&o()),g>=a&&m!==a&&(r(a),v||o())),t>=a&&(p.remaining?(u=s,"alternate"===p.direction&&(p.reversed=!p.reversed)):(p.pause(),"Promise"in window&&(l(),f=e()),p.completed||(p.completed=!0,i("complete"))),c=0),i("update")}t=void 0===t?{}:t;var s,u,c=0,l=null,f=e(),p=P(t);return p.reset=function(){var t=p.direction,e=p.loop;for(p.currentTime=0,p.progress=0,p.paused=!0,p.began=!1,p.completed=!1,p.reversed="reverse"===t,p.remaining="alternate"===t&&1===e?2:e,t=p.children.length;t--;)e=p.children[t],e.seek(e.offset),e.reset()},p.tick=function(t){s=t,u||(u=s),a((c+s-u)*I.speed)},p.seek=function(t){a(n(t))},p.pause=function(){var t=F.indexOf(p);-1<t&&F.splice(t,1),p.paused=!0},p.play=function(){p.paused&&(p.paused=!1,u=0,c=n(p.currentTime),F.push(p),Y||H())},p.reverse=function(){p.reversed=!p.reversed,u=0,c=n(p.currentTime)},p.restart=function(){p.pause(),p.reset(),p.play()},p.finished=f,p.reset(),p.autoplay&&p.play(),p}var L,j={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},N={duration:1e3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},_="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(" "),D={arr:function(t){return Array.isArray(t)},obj:function(t){return-1<Object.prototype.toString.call(t).indexOf("Object")},svg:function(t){return t instanceof SVGElement},dom:function(t){return t.nodeType||D.svg(t)},str:function(t){return"string"==typeof t},fnc:function(t){return"function"==typeof t},und:function(t){return void 0===t},hex:function(t){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)},rgb:function(t){return/^rgb/.test(t)},hsl:function(t){return/^hsl/.test(t)},col:function(t){return D.hex(t)||D.rgb(t)||D.hsl(t)}},X=function(){function t(t,e,n){return(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t}return function(e,n,r,i){if(0<=e&&1>=e&&0<=r&&1>=r){var o=new Float32Array(11);if(e!==n||r!==i)for(var a=0;11>a;++a)o[a]=t(.1*a,e,r);return function(a){if(e===n&&r===i)return a;if(0===a)return 0;if(1===a)return 1;for(var s=0,u=1;10!==u&&o[u]<=a;++u)s+=.1;--u;var u=s+(a-o[u])/(o[u+1]-o[u])*.1,c=3*(1-3*r+3*e)*u*u+2*(3*r-6*e)*u+3*e;if(.001<=c){for(s=0;4>s&&(c=3*(1-3*r+3*e)*u*u+2*(3*r-6*e)*u+3*e,0!==c);++s)var l=t(u,e,r)-a,u=u-l/c;a=u}else if(0===c)a=u;else{var u=s,s=s+.1,f=0;do l=u+(s-u)/2,c=t(l,e,r)-a,0<c?s=l:u=l;while(1e-7<Math.abs(c)&&10>++f);a=l}return t(a,n,i)}}}}(),R=function(){function t(t,e){return 0===t||1===t?t:-Math.pow(2,10*(t-1))*Math.sin(2*(t-1-e/(2*Math.PI)*Math.asin(1))*Math.PI/e)}var e,n="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),r={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],t],Out:[[.25,.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(e,n){return 1-t(1-e,n)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(e,n){return.5>e?t(2*e,n)/2:1-t(-2*e+2,n)/2}]},i={linear:X(.25,.25,.75,.75)},o={};for(e in r)o.type=e,r[o.type].forEach(function(t){return function(e,r){i["ease"+t.type+n[r]]=D.fnc(e)?e:X.apply(a,e)}}(o)),o={type:o.type};return i}(),z={css:function(t,e,n){return t.style[e]=n},attribute:function(t,e,n){return t.setAttribute(e,n)},object:function(t,e,n){return t[e]=n},transform:function(t,e,n,r,i){r[i]||(r[i]=[]),r[i].push(e+"("+n+")")}},F=[],Y=0,H=function(){function t(){Y=requestAnimationFrame(e)}function e(e){var n=F.length;if(n){for(var r=0;r<n;)F[r]&&F[r].tick(e),r++;t()}else cancelAnimationFrame(Y),Y=0}return t}();return I.version="2.0.2",I.speed=1,I.running=F,I.remove=function(t){t=w(t);for(var e=F.length;e--;)for(var n=F[e],i=n.animations,o=i.length;o--;)r(t,i[o].animatable.target)&&(i.splice(o,1),i.length||n.pause())},I.getValue=v,I.path=function(e,n){var r=D.str(e)?t(e)[0]:e,i=n||100;return function(t){return{el:r,property:t,totalLength:r.getTotalLength()*(i/100)}}},I.setDashoffset=function(t){var e=t.getTotalLength();return t.setAttribute("stroke-dasharray",e),e},I.bezier=X,I.easings=R,I.timeline=function(t){var e=I(t);return e.pause(),e.duration=0,e.add=function(t){return e.children.forEach(function(t){t.began=!0,t.completed=!0}),n(t).forEach(function(t){var n=e.duration,r=t.offset;t.autoplay=!1,t.offset=D.und(r)?n:g(r,n),e.seek(t.offset),t=I(t),t.duration>n&&(e.duration=t.duration),t.began=!0,e.children.push(t)}),e.reset(),e.seek(0),e.autoplay&&e.restart(),e},e},I.random=function(t,e){return Math.floor(Math.random()*(e-t+1))+t},I})},function(t,e,n){"use strict";var r=n(1);n.d(e,"a",function(){return u});var i=this,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(t,e,n){return setTimeout(function(){if(n.cached_options.position&&n.cached_options.position.includes("bottom"))return void r.a.animateOutBottom(t,function(){n.remove(t)});r.a.animateOut(t,function(){n.remove(t)})},e),!0},s=function(t,e){return("object"===("undefined"==typeof HTMLElement?"undefined":o(HTMLElement))?e instanceof HTMLElement:e&&"object"===(void 0===e?"undefined":o(e))&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName)?t.appendChild(e):t.innerHTML=e,i},u=function(t,e){var n=!1;return{el:t,text:function(e){return s(t,e),this},goAway:function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:800;return n=!0,a(t,r,e)},remove:function(){e.remove(t)},disposed:function(){return n}}}},function(t,e,n){"use strict";var r=n(12),i=n.n(r),o=n(1),a=n(7),s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u=n(2),c={},l=null,f=function(t){return t.className=t.className||null,t.onComplete=t.onComplete||null,t.position=t.position||"top-right",t.duration=t.duration||null,t.theme=t.theme||"primary",t.type=t.type||"default",t.containerClass=t.containerClass||null,t.fullWidth=t.fullWidth||!1,t.icon=t.icon||null,t.action=t.action||null,t.fitToScreen=t.fitToScreen||null,t.closeOnSwipe=void 0===t.closeOnSwipe||t.closeOnSwipe,t.iconPack=t.iconPack||"material",t.className&&"string"==typeof t.className&&(t.className=t.className.split(" ")),t.className||(t.className=[]),t.theme&&t.className.push(t.theme.trim()),t.type&&t.className.push(t.type),t.containerClass&&"string"==typeof t.containerClass&&(t.containerClass=t.containerClass.split(" ")),t.containerClass||(t.containerClass=[]),t.position&&t.containerClass.push(t.position.trim()),t.fullWidth&&t.containerClass.push("full-width"),t.fitToScreen&&t.containerClass.push("fit-to-screen"),c=t,t},p=function(t,e){var r=document.createElement("div");if(r.classList.add("toasted"),r.hash=u.generate(),e.className&&e.className.forEach(function(t){r.classList.add(t)}),("object"===("undefined"==typeof HTMLElement?"undefined":s(HTMLElement))?t instanceof HTMLElement:t&&"object"===(void 0===t?"undefined":s(t))&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName)?r.appendChild(t):r.innerHTML=t,h(e,r),e.closeOnSwipe){var c=new i.a(r,{prevent_default:!1});c.on("pan",function(t){var e=t.deltaX,n=80;r.classList.contains("panning")||r.classList.add("panning");var i=1-Math.abs(e/n);i<0&&(i=0),o.a.animatePanning(r,e,i)}),c.on("panend",function(t){var n=t.deltaX;Math.abs(n)>80?o.a.animatePanEnd(r,function(){"function"==typeof e.onComplete&&e.onComplete(),r.parentNode&&l.remove(r)}):(r.classList.remove("panning"),o.a.animateReset(r))})}if(Array.isArray(e.action))e.action.forEach(function(t){var e=m(t,n.i(a.a)(r,l));e&&r.appendChild(e)});else if("object"===s(e.action)){var f=m(e.action,n.i(a.a)(r,l));f&&r.appendChild(f)}return r},h=function(t,e){if(t.icon){var n=document.createElement("i");switch(t.iconPack){case"fontawesome":n.classList.add("fa");var r=t.icon.name?t.icon.name:t.icon;r.includes("fa-")?n.classList.add(r.trim()):n.classList.add("fa-"+r.trim());break;default:n.classList.add("material-icons"),n.textContent=t.icon.name?t.icon.name:t.icon}t.icon.after&&n.classList.add("after"),d(t,n,e)}},d=function(t,e,n){t.icon&&(t.icon.after&&t.icon.name?n.appendChild(e):(t.icon.name,n.insertBefore(e,n.firstChild)))},m=function(t,e){if(!t)return null;var n=document.createElement("a");if(n.classList.add("action"),n.classList.add("ripple"),t.text&&(n.text=t.text),t.href&&(n.href=t.href),t.icon){n.classList.add("icon");var r=document.createElement("i");switch(c.iconPack){case"fontawesome":r.classList.add("fa"),t.icon.includes("fa-")?r.classList.add(t.icon.trim()):r.classList.add("fa-"+t.icon.trim());break;default:r.classList.add("material-icons"),r.textContent=t.icon}n.appendChild(r)}return t.class&&("string"==typeof t.class?t.class.split(" ").forEach(function(t){n.classList.add(t)}):Array.isArray(t.class)&&t.class.forEach(function(t){n.classList.add(t.trim())})),t.push&&n.addEventListener("click",function(n){if(n.preventDefault(),!c.router)return void console.warn("[vue-toasted] : Vue Router instance is not attached. please check the docs");c.router.push(t.push),t.push.dontClose||e.goAway(0)}),t.onClick&&"function"==typeof t.onClick&&n.addEventListener("click",function(n){t.onClick&&(n.preventDefault(),t.onClick(n,e))}),n};e.a=function(t,e,r){l=t,r=f(r);var i=document.getElementById(l.id);null===i&&(i=document.createElement("div"),i.id=l.id,document.body.appendChild(i)),r.containerClass.unshift("toasted-container"),i.className!==r.containerClass.join(" ")&&(i.className="",r.containerClass.forEach(function(t){i.classList.add(t)}));var s=p(e,r);e&&i.appendChild(s),s.style.opacity=0,o.a.animateIn(s);var u=r.duration,c=void 0;return null!==u&&(c=setInterval(function(){null===s.parentNode&&window.clearInterval(c),s.classList.contains("panning")||(u-=20),u<=0&&(o.a.animateOut(s,function(){"function"==typeof r.onComplete&&r.onComplete(),s.parentNode&&l.remove(s)}),window.clearInterval(c))},20)),n.i(a.a)(s,l)}},function(t,e,n){e=t.exports=n(10)(),e.push([t.i,".toasted{padding:0 20px}.toasted.rounded{border-radius:24px}.toasted.primary{border-radius:2px;min-height:38px;line-height:1.1em;background-color:#353535;padding:0 20px;font-size:15px;font-weight:300;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.toasted.primary.success{background:#4caf50}.toasted.primary.error{background:#f44336}.toasted.primary.info{background:#3f51b5}.toasted.primary .action{color:#a1c2fa}.toasted.bubble{border-radius:30px;min-height:38px;line-height:1.1em;background-color:#ff7043;padding:0 20px;font-size:15px;font-weight:300;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.toasted.bubble.success{background:#4caf50}.toasted.bubble.error{background:#f44336}.toasted.bubble.info{background:#3f51b5}.toasted.bubble .action{color:#8e2b0c}.toasted.outline{border-radius:30px;min-height:38px;line-height:1.1em;background-color:#fff;border:1px solid #676767;padding:0 20px;font-size:15px;color:#676767;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);font-weight:700}.toasted.outline.success{color:#4caf50;border-color:#4caf50}.toasted.outline.error{color:#f44336;border-color:#f44336}.toasted.outline.info{color:#3f51b5;border-color:#3f51b5}.toasted.outline .action{color:#607d8b}.toasted-container{position:fixed;z-index:10000}.toasted-container,.toasted-container.full-width{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.toasted-container.full-width{max-width:86%;width:100%}.toasted-container.full-width.fit-to-screen{min-width:100%}.toasted-container.full-width.fit-to-screen .toasted:first-child{margin-top:0}.toasted-container.full-width.fit-to-screen.top-right{top:0;right:0}.toasted-container.full-width.fit-to-screen.top-left{top:0;left:0}.toasted-container.full-width.fit-to-screen.top-center{top:0;left:0;-webkit-transform:translateX(0);transform:translateX(0)}.toasted-container.full-width.fit-to-screen.bottom-right{right:0;bottom:0}.toasted-container.full-width.fit-to-screen.bottom-left{left:0;bottom:0}.toasted-container.full-width.fit-to-screen.bottom-center{left:0;bottom:0;-webkit-transform:translateX(0);transform:translateX(0)}.toasted-container.top-right{top:10%;right:7%}.toasted-container.top-left{top:10%;left:7%}.toasted-container.top-center{top:10%;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.toasted-container.bottom-right{right:5%;bottom:7%}.toasted-container.bottom-left{left:5%;bottom:7%}.toasted-container.bottom-center{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:7%}.toasted-container.bottom-left .toasted,.toasted-container.top-left .toasted{float:left}.toasted-container.bottom-right .toasted,.toasted-container.top-right .toasted{float:right}.toasted-container .toasted{top:35px;width:auto;clear:both;margin-top:10px;position:relative;max-width:100%;height:auto;word-break:normal;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;box-sizing:inherit}.toasted-container .toasted .fa,.toasted-container .toasted .material-icons{margin-right:.5rem;margin-left:-.4rem}.toasted-container .toasted .fa.after,.toasted-container .toasted .material-icons.after{margin-left:.5rem;margin-right:-.4rem}.toasted-container .toasted .action{text-decoration:none;font-size:.8rem;padding:8px;margin:5px -7px 5px 7px;border-radius:3px;text-transform:uppercase;letter-spacing:.03em;font-weight:600;cursor:pointer}.toasted-container .toasted .action.icon{padding:4px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.toasted-container .toasted .action.icon .fa,.toasted-container .toasted .action.icon .material-icons{margin-right:0;margin-left:4px}.toasted-container .toasted .action.icon:hover{text-decoration:none}.toasted-container .toasted .action:hover{text-decoration:underline}@media only screen and (max-width:600px){#toasted-container{min-width:100%}#toasted-container .toasted:first-child{margin-top:0}#toasted-container.top-right{top:0;right:0}#toasted-container.top-left{top:0;left:0}#toasted-container.top-center{top:0;left:0;-webkit-transform:translateX(0);transform:translateX(0)}#toasted-container.bottom-right{right:0;bottom:0}#toasted-container.bottom-left{left:0;bottom:0}#toasted-container.bottom-center{left:0;bottom:0;-webkit-transform:translateX(0);transform:translateX(0)}#toasted-container.bottom-center,#toasted-container.top-center{-ms-flex-align:stretch!important;align-items:stretch!important}#toasted-container.bottom-left .toasted,#toasted-container.bottom-right .toasted,#toasted-container.top-left .toasted,#toasted-container.top-right .toasted{float:none}#toasted-container .toasted{border-radius:0}}",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<e.length;i++){var a=e[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(t,e,n){"use strict";function r(t,e){if(void 0===t||null===t)throw new TypeError("Cannot convert first argument to object");for(var n=Object(t),r=1;r<arguments.length;r++){var i=arguments[r];if(void 0!==i&&null!==i)for(var o=Object.keys(Object(i)),a=0,s=o.length;a<s;a++){var u=o[a],c=Object.getOwnPropertyDescriptor(i,u);void 0!==c&&c.enumerable&&(n[u]=i[u])}}return n}function i(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:r})}t.exports={assign:r,polyfill:i}},function(t,e,n){var r;!function(i,o,a,s){"use strict";function u(t,e,n){return setTimeout(h(t,n),e)}function c(t,e,n){return!!Array.isArray(t)&&(l(t,n[e],n),!0)}function l(t,e,n){var r;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==s)for(r=0;r<t.length;)e.call(n,t[r],r,t),r++;else for(r in t)t.hasOwnProperty(r)&&e.call(n,t[r],r,t)}function f(t,e,n){var r="DEPRECATED METHOD: "+e+"\n"+n+" AT \n";return function(){var e=new Error("get-stack-trace"),n=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",o=i.console&&(i.console.warn||i.console.log);return o&&o.call(i.console,r,n),t.apply(this,arguments)}}function p(t,e,n){var r,i=e.prototype;r=t.prototype=Object.create(i),r.constructor=t,r._super=i,n&&mt(r,n)}function h(t,e){return function(){return t.apply(e,arguments)}}function d(t,e){return typeof t==yt?t.apply(e?e[0]||s:s,e):t}function m(t,e){return t===s?e:t}function v(t,e,n){l(x(e),function(e){t.addEventListener(e,n,!1)})}function g(t,e,n){l(x(e),function(e){t.removeEventListener(e,n,!1)})}function y(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function b(t,e){return t.indexOf(e)>-1}function x(t){return t.trim().split(/\s+/g)}function T(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var r=0;r<t.length;){if(n&&t[r][n]==e||!n&&t[r]===e)return r;r++}return-1}function w(t){return Array.prototype.slice.call(t,0)}function E(t,e,n){for(var r=[],i=[],o=0;o<t.length;){var a=e?t[o][e]:t[o];T(i,a)<0&&r.push(t[o]),i[o]=a,o++}return n&&(r=e?r.sort(function(t,n){return t[e]>n[e]}):r.sort()),r}function C(t,e){for(var n,r,i=e[0].toUpperCase()+e.slice(1),o=0;o<vt.length;){if(n=vt[o],r=n?n+i:e,r in t)return r;o++}return s}function O(){return Ct++}function S(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||i}function M(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){d(t.options.enable,[t])&&n.handler(e)},this.init()}function k(t){var e=t.options.inputClass;return new(e?e:Mt?H:kt?W:St?B:Y)(t,A)}function A(t,e,n){var r=n.pointers.length,i=n.changedPointers.length,o=e&Nt&&r-i===0,a=e&(Dt|Xt)&&r-i===0;n.isFirst=!!o,n.isFinal=!!a,o&&(t.session={}),n.eventType=e,P(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function P(t,e){var n=t.session,r=e.pointers,i=r.length;n.firstInput||(n.firstInput=j(e)),i>1&&!n.firstMultiple?n.firstMultiple=j(e):1===i&&(n.firstMultiple=!1);var o=n.firstInput,a=n.firstMultiple,s=a?a.center:o.center,u=e.center=N(r);e.timeStamp=Tt(),e.deltaTime=e.timeStamp-o.timeStamp,e.angle=R(s,u),e.distance=X(s,u),I(n,e),e.offsetDirection=D(e.deltaX,e.deltaY);var c=_(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=c.x,e.overallVelocityY=c.y,e.overallVelocity=xt(c.x)>xt(c.y)?c.x:c.y,e.scale=a?F(a.pointers,r):1,e.rotation=a?z(a.pointers,r):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,L(n,e);var l=t.element;y(e.srcEvent.target,l)&&(l=e.srcEvent.target),e.target=l}function I(t,e){var n=e.center,r=t.offsetDelta||{},i=t.prevDelta||{},o=t.prevInput||{};e.eventType!==Nt&&o.eventType!==Dt||(i=t.prevDelta={x:o.deltaX||0,y:o.deltaY||0},r=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=i.x+(n.x-r.x),e.deltaY=i.y+(n.y-r.y)}function L(t,e){var n,r,i,o,a=t.lastInterval||e,u=e.timeStamp-a.timeStamp;if(e.eventType!=Xt&&(u>jt||a.velocity===s)){var c=e.deltaX-a.deltaX,l=e.deltaY-a.deltaY,f=_(u,c,l);r=f.x,i=f.y,n=xt(f.x)>xt(f.y)?f.x:f.y,o=D(c,l),t.lastInterval=e}else n=a.velocity,r=a.velocityX,i=a.velocityY,o=a.direction;e.velocity=n,e.velocityX=r,e.velocityY=i,e.direction=o}function j(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:bt(t.pointers[n].clientX),clientY:bt(t.pointers[n].clientY)},n++;return{timeStamp:Tt(),pointers:e,center:N(e),deltaX:t.deltaX,deltaY:t.deltaY}}function N(t){var e=t.length;if(1===e)return{x:bt(t[0].clientX),y:bt(t[0].clientY)};for(var n=0,r=0,i=0;i<e;)n+=t[i].clientX,r+=t[i].clientY,i++;return{x:bt(n/e),y:bt(r/e)}}function _(t,e,n){return{x:e/t||0,y:n/t||0}}function D(t,e){return t===e?Rt:xt(t)>=xt(e)?t<0?zt:Ft:e<0?Yt:Ht}function X(t,e,n){n||(n=Ut);var r=e[n[0]]-t[n[0]],i=e[n[1]]-t[n[1]];return Math.sqrt(r*r+i*i)}function R(t,e,n){n||(n=Ut);var r=e[n[0]]-t[n[0]],i=e[n[1]]-t[n[1]];return 180*Math.atan2(i,r)/Math.PI}function z(t,e){return R(e[1],e[0],Bt)+R(t[1],t[0],Bt)}function F(t,e){return X(e[0],e[1],Bt)/X(t[0],t[1],Bt)}function Y(){this.evEl=Gt,this.evWin=Zt,this.pressed=!1,M.apply(this,arguments)}function H(){this.evEl=Kt,this.evWin=te,M.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function q(){this.evTarget=ne,this.evWin=re,this.started=!1,M.apply(this,arguments)}function V(t,e){var n=w(t.touches),r=w(t.changedTouches);return e&(Dt|Xt)&&(n=E(n.concat(r),"identifier",!0)),[n,r]}function W(){this.evTarget=oe,this.targetIds={},M.apply(this,arguments)}function U(t,e){var n=w(t.touches),r=this.targetIds;if(e&(Nt|_t)&&1===n.length)return r[n[0].identifier]=!0,[n,n];var i,o,a=w(t.changedTouches),s=[],u=this.target;if(o=n.filter(function(t){return y(t.target,u)}),e===Nt)for(i=0;i<o.length;)r[o[i].identifier]=!0,i++;for(i=0;i<a.length;)r[a[i].identifier]&&s.push(a[i]),e&(Dt|Xt)&&delete r[a[i].identifier],i++;return s.length?[E(o.concat(s),"identifier",!0),s]:void 0}function B(){M.apply(this,arguments);var t=h(this.handler,this);this.touch=new W(this.manager,t),this.mouse=new Y(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function $(t,e){t&Nt?(this.primaryTouch=e.changedPointers[0].identifier,G.call(this,e)):t&(Dt|Xt)&&G.call(this,e)}function G(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var r=this.lastTouches,i=function(){var t=r.indexOf(n);t>-1&&r.splice(t,1)};setTimeout(i,ae)}}function Z(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,r=0;r<this.lastTouches.length;r++){var i=this.lastTouches[r],o=Math.abs(e-i.x),a=Math.abs(n-i.y);if(o<=se&&a<=se)return!0}return!1}function Q(t,e){this.manager=t,this.set(e)}function J(t){if(b(t,he))return he;var e=b(t,de),n=b(t,me);return e&&n?he:e||n?e?de:me:b(t,pe)?pe:fe}function K(){if(!ce)return!1;var t={},e=i.CSS&&i.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(n){t[n]=!e||i.CSS.supports("touch-action",n)}),t}function tt(t){this.options=mt({},this.defaults,t||{}),this.id=O(),this.manager=null,this.options.enable=m(this.options.enable,!0),this.state=ge,this.simultaneous={},this.requireFail=[]}function et(t){return t&we?"cancel":t&xe?"end":t&be?"move":t&ye?"start":""}function nt(t){return t==Ht?"down":t==Yt?"up":t==zt?"left":t==Ft?"right":""}function rt(t,e){var n=e.manager;return n?n.get(t):t}function it(){tt.apply(this,arguments)}function ot(){it.apply(this,arguments),this.pX=null,this.pY=null}function at(){it.apply(this,arguments)}function st(){tt.apply(this,arguments),this._timer=null,this._input=null}function ut(){it.apply(this,arguments)}function ct(){it.apply(this,arguments)}function lt(){tt.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ft(t,e){return e=e||{},e.recognizers=m(e.recognizers,ft.defaults.preset),new pt(t,e)}function pt(t,e){this.options=mt({},ft.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=k(this),this.touchAction=new Q(this,this.options.touchAction),ht(this,!0),l(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function ht(t,e){var n=t.element;if(n.style){var r;l(t.options.cssProps,function(i,o){r=C(n.style,o),e?(t.oldCssProps[r]=n.style[r],n.style[r]=i):n.style[r]=t.oldCssProps[r]||""}),e||(t.oldCssProps={})}}function dt(t,e){var n=o.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e,e.target.dispatchEvent(n)}var mt,vt=["","webkit","Moz","MS","ms","o"],gt=o.createElement("div"),yt="function",bt=Math.round,xt=Math.abs,Tt=Date.now;mt="function"!=typeof Object.assign?function(t){if(t===s||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var r=arguments[n];if(r!==s&&null!==r)for(var i in r)r.hasOwnProperty(i)&&(e[i]=r[i])}return e}:Object.assign;var wt=f(function(t,e,n){for(var r=Object.keys(e),i=0;i<r.length;)(!n||n&&t[r[i]]===s)&&(t[r[i]]=e[r[i]]),i++;return t},"extend","Use `assign`."),Et=f(function(t,e){return wt(t,e,!0)},"merge","Use `assign`."),Ct=1,Ot=/mobile|tablet|ip(ad|hone|od)|android/i,St="ontouchstart"in i,Mt=C(i,"PointerEvent")!==s,kt=St&&Ot.test(navigator.userAgent),At="touch",Pt="pen",It="mouse",Lt="kinect",jt=25,Nt=1,_t=2,Dt=4,Xt=8,Rt=1,zt=2,Ft=4,Yt=8,Ht=16,qt=zt|Ft,Vt=Yt|Ht,Wt=qt|Vt,Ut=["x","y"],Bt=["clientX","clientY"];M.prototype={handler:function(){},init:function(){this.evEl&&v(this.element,this.evEl,this.domHandler),this.evTarget&&v(this.target,this.evTarget,this.domHandler),this.evWin&&v(S(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&g(this.element,this.evEl,this.domHandler),this.evTarget&&g(this.target,this.evTarget,this.domHandler),this.evWin&&g(S(this.element),this.evWin,this.domHandler)}};var $t={mousedown:Nt,mousemove:_t,mouseup:Dt},Gt="mousedown",Zt="mousemove mouseup";p(Y,M,{handler:function(t){var e=$t[t.type];e&Nt&&0===t.button&&(this.pressed=!0),e&_t&&1!==t.which&&(e=Dt),this.pressed&&(e&Dt&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:It,srcEvent:t}))}});var Qt={pointerdown:Nt,pointermove:_t,pointerup:Dt,pointercancel:Xt,pointerout:Xt},Jt={2:At,3:Pt,4:It,5:Lt},Kt="pointerdown",te="pointermove pointerup pointercancel";i.MSPointerEvent&&!i.PointerEvent&&(Kt="MSPointerDown",te="MSPointerMove MSPointerUp MSPointerCancel"),p(H,M,{handler:function(t){var e=this.store,n=!1,r=t.type.toLowerCase().replace("ms",""),i=Qt[r],o=Jt[t.pointerType]||t.pointerType,a=o==At,s=T(e,t.pointerId,"pointerId");i&Nt&&(0===t.button||a)?s<0&&(e.push(t),s=e.length-1):i&(Dt|Xt)&&(n=!0),s<0||(e[s]=t,this.callback(this.manager,i,{pointers:e,changedPointers:[t],pointerType:o,srcEvent:t}),n&&e.splice(s,1))}});var ee={touchstart:Nt,touchmove:_t,touchend:Dt,touchcancel:Xt},ne="touchstart",re="touchstart touchmove touchend touchcancel";p(q,M,{handler:function(t){var e=ee[t.type];if(e===Nt&&(this.started=!0),this.started){var n=V.call(this,t,e);e&(Dt|Xt)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:At,srcEvent:t})}}});var ie={touchstart:Nt,touchmove:_t,touchend:Dt,touchcancel:Xt},oe="touchstart touchmove touchend touchcancel";p(W,M,{handler:function(t){var e=ie[t.type],n=U.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:At,srcEvent:t})}});var ae=2500,se=25;p(B,M,{handler:function(t,e,n){var r=n.pointerType==At,i=n.pointerType==It;if(!(i&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(r)$.call(this,e,n);else if(i&&Z.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var ue=C(gt.style,"touchAction"),ce=ue!==s,le="compute",fe="auto",pe="manipulation",he="none",de="pan-x",me="pan-y",ve=K();Q.prototype={set:function(t){t==le&&(t=this.compute()),ce&&this.manager.element.style&&ve[t]&&(this.manager.element.style[ue]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return l(this.manager.recognizers,function(e){d(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),J(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var r=this.actions,i=b(r,he)&&!ve[he],o=b(r,me)&&!ve[me],a=b(r,de)&&!ve[de];if(i){var s=1===t.pointers.length,u=t.distance<2,c=t.deltaTime<250;if(s&&u&&c)return}return a&&o?void 0:i||o&&n&qt||a&&n&Vt?this.preventSrc(e):void 0},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var ge=1,ye=2,be=4,xe=8,Te=xe,we=16,Ee=32;tt.prototype={defaults:{},set:function(t){return mt(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(c(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=rt(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return c(t,"dropRecognizeWith",this)?this:(t=rt(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(c(t,"requireFailure",this))return this;var e=this.requireFail;return t=rt(t,this),T(e,t)===-1&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(c(t,"dropRequireFailure",this))return this;t=rt(t,this);var e=T(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){n.manager.emit(e,t)}var n=this,r=this.state;r<xe&&e(n.options.event+et(r)),e(n.options.event),t.additionalEvent&&e(t.additionalEvent),r>=xe&&e(n.options.event+et(r))},tryEmit:function(t){if(this.canEmit())return this.emit(t);this.state=Ee},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(Ee|ge)))return!1;t++}return!0},recognize:function(t){var e=mt({},t);if(!d(this.options.enable,[this,e]))return this.reset(),void(this.state=Ee);this.state&(Te|we|Ee)&&(this.state=ge),this.state=this.process(e),this.state&(ye|be|xe|we)&&this.tryEmit(e)},process:function(t){},getTouchAction:function(){},reset:function(){}},p(it,tt,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,r=e&(ye|be),i=this.attrTest(t);return r&&(n&Xt||!i)?e|we:r||i?n&Dt?e|xe:e&ye?e|be:ye:Ee}}),p(ot,it,{defaults:{event:"pan",threshold:10,pointers:1,direction:Wt},getTouchAction:function(){var t=this.options.direction,e=[];return t&qt&&e.push(me),t&Vt&&e.push(de),e},directionTest:function(t){var e=this.options,n=!0,r=t.distance,i=t.direction,o=t.deltaX,a=t.deltaY;return i&e.direction||(e.direction&qt?(i=0===o?Rt:o<0?zt:Ft,n=o!=this.pX,r=Math.abs(t.deltaX)):(i=0===a?Rt:a<0?Yt:Ht,n=a!=this.pY,r=Math.abs(t.deltaY))),t.direction=i,n&&r>e.threshold&&i&e.direction},attrTest:function(t){return it.prototype.attrTest.call(this,t)&&(this.state&ye||!(this.state&ye)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=nt(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),p(at,it,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[he]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&ye)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),p(st,tt,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[fe]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,r=t.distance<e.threshold,i=t.deltaTime>e.time;if(this._input=t,!r||!n||t.eventType&(Dt|Xt)&&!i)this.reset();else if(t.eventType&Nt)this.reset(),this._timer=u(function(){this.state=Te,this.tryEmit()},e.time,this);else if(t.eventType&Dt)return Te;return Ee},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===Te&&(t&&t.eventType&Dt?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=Tt(),this.manager.emit(this.options.event,this._input)))}}),p(ut,it,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[he]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&ye)}}),p(ct,it,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:qt|Vt,pointers:1},getTouchAction:function(){return ot.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(qt|Vt)?e=t.overallVelocity:n&qt?e=t.overallVelocityX:n&Vt&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&xt(e)>this.options.velocity&&t.eventType&Dt},emit:function(t){var e=nt(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),p(lt,tt,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[pe]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,r=t.distance<e.threshold,i=t.deltaTime<e.time;if(this.reset(),t.eventType&Nt&&0===this.count)return this.failTimeout();if(r&&i&&n){if(t.eventType!=Dt)return this.failTimeout();var o=!this.pTime||t.timeStamp-this.pTime<e.interval,a=!this.pCenter||X(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,a&&o?this.count+=1:this.count=1,this._input=t;if(0===this.count%e.taps)return this.hasRequireFailures()?(this._timer=u(function(){this.state=Te,this.tryEmit()},e.interval,this),ye):Te}return Ee},failTimeout:function(){return this._timer=u(function(){this.state=Ee},this.options.interval,this),Ee},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==Te&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ft.VERSION="2.0.7",ft.defaults={domEvents:!1,touchAction:le,enable:!0,inputTarget:null,inputClass:null,preset:[[ut,{enable:!1}],[at,{enable:!1},["rotate"]],[ct,{direction:qt}],[ot,{direction:qt},["swipe"]],[lt],[lt,{event:"doubletap",taps:2},["tap"]],[st]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var Ce=2;pt.prototype={set:function(t){return mt(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?Ce:1},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var n,r=this.recognizers,i=e.curRecognizer;(!i||i&&i.state&Te)&&(i=e.curRecognizer=null);for(var o=0;o<r.length;)n=r[o],e.stopped===Ce||i&&n!=i&&!n.canRecognizeWith(i)?n.reset():n.recognize(t),!i&&n.state&(ye|be|xe)&&(i=e.curRecognizer=n),o++}},get:function(t){if(t instanceof tt)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(c(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(c(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=T(e,t);n!==-1&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==s&&e!==s){var n=this.handlers;return l(x(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this}},off:function(t,e){if(t!==s){var n=this.handlers;return l(x(t),function(t){e?n[t]&&n[t].splice(T(n[t],e),1):delete n[t]}),this}},emit:function(t,e){this.options.domEvents&&dt(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var r=0;r<n.length;)n[r](e),r++}},destroy:function(){this.element&&ht(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},mt(ft,{INPUT_START:Nt,INPUT_MOVE:_t,INPUT_END:Dt,INPUT_CANCEL:Xt,STATE_POSSIBLE:ge,STATE_BEGAN:ye,STATE_CHANGED:be,STATE_ENDED:xe,STATE_RECOGNIZED:Te,STATE_CANCELLED:we,STATE_FAILED:Ee,DIRECTION_NONE:Rt,DIRECTION_LEFT:zt,DIRECTION_RIGHT:Ft,DIRECTION_UP:Yt,DIRECTION_DOWN:Ht,DIRECTION_HORIZONTAL:qt,DIRECTION_VERTICAL:Vt,DIRECTION_ALL:Wt,Manager:pt,Input:M,TouchAction:Q,TouchInput:W,MouseInput:Y,PointerEventInput:H,TouchMouseInput:B,SingleTouchInput:q,Recognizer:tt,AttrRecognizer:it,Tap:lt,Pan:ot,Swipe:ct,Pinch:at,Rotate:ut,Press:st,on:v,off:g,each:l,merge:Et,extend:wt,assign:mt,inherit:p,bindFn:h,prefixed:C}),(void 0!==i?i:"undefined"!=typeof self?self:{}).Hammer=ft,r=function(){return ft}.call(e,n,e,t),r!==s&&(t.exports=r)}(window,document,"Hammer")},function(t,e,n){"use strict";function r(t){var e="",n=Math.floor(.001*(Date.now()-u));return n===o?i++:(i=0,o=n),e+=a(s.lookup,c),e+=a(s.lookup,t),i>0&&(e+=a(s.lookup,i)),e+=a(s.lookup,n)}var i,o,a=n(3),s=n(0),u=1459707606518,c=6;t.exports=r},function(t,e,n){"use strict";function r(t){var e=i.shuffled();return{version:15&e.indexOf(t.substr(0,1)),worker:15&e.indexOf(t.substr(1,1))}}var i=n(0);t.exports=r},function(t,e,n){"use strict";function r(e){return s.seed(e),t.exports}function i(e){return f=e,t.exports}function o(t){return void 0!==t&&s.characters(t),s.shuffled()}function a(){return c(f)}var s=n(0),u=(n(3),n(14)),c=n(13),l=n(16),f=n(19)||0;t.exports=a,t.exports.generate=a,t.exports.seed=r,t.exports.worker=i,t.exports.characters=o,t.exports.decode=u,t.exports.isValid=l},function(t,e,n){"use strict";function r(t){if(!t||"string"!=typeof t||t.length<6)return!1;for(var e=i.characters(),n=t.length,r=0;r<n;r++)if(e.indexOf(t[r])===-1)return!1;return!0}var i=n(0);t.exports=r},function(t,e,n){"use strict";function r(){if(!i||!i.getRandomValues)return 48&Math.floor(256*Math.random());var t=new Uint8Array(1);return i.getRandomValues(t),48&t[0]}var i="object"==typeof window&&(window.crypto||window.msCrypto);t.exports=r},function(t,e,n){"use strict";function r(){return o=(9301*o+49297)%233280,o/233280}function i(t){o=t}var o=1;t.exports={nextValue:r,seed:i}},function(t,e,n){"use strict";t.exports=0},function(t,e){t.exports=function(t,e,n,r){var i,o=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(i=t,o=t.default);var s="function"==typeof o?o.options:o;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),n&&(s._scopeId=n),r){var u=Object.create(s.computed||null);Object.keys(r).forEach(function(t){var e=r[t];u[t]=function(){return e}}),s.computed=u}return{esModule:i,exports:o,options:s}}},function(t,e,n){var r=n(9);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(22)("514c6ff8",r,!0)},function(t,e,n){function r(t){for(var e=0;e<t.length;e++){var n=t[e],r=l[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(o(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var a=[],i=0;i<n.parts.length;i++)a.push(o(n.parts[i]));l[n.id]={id:n.id,refs:1,parts:a}}}}function i(){var t=document.createElement("style");return t.type="text/css",f.appendChild(t),t}function o(t){var e,n,r=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(r){if(d)return m;r.parentNode.removeChild(r)}if(v){var o=h++;r=p||(p=i()),e=a.bind(null,r,o,!1),n=a.bind(null,r,o,!0)}else r=i(),e=s.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}function a(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=g(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function s(t,e){var n=e.css,r=e.media,i=e.sourceMap;if(r&&t.setAttribute("media",r),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(23),l={},f=u&&(document.head||document.getElementsByTagName("head")[0]),p=null,h=0,d=!1,m=function(){},v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n){d=n;var i=c(t,e);return r(i),function(e){for(var n=[],o=0;o<i.length;o++){var a=i[o],s=l[a.id];s.refs--,n.push(s)}e?(i=c(t,e),r(i)):i=[];for(var o=0;o<n.length;o++){var s=n[o];if(0===s.refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete l[s.id]}}}};var g=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],r={},i=0;i<e.length;i++){var o=e[i],a=o[0],s=o[1],u=o[2],c=o[3],l={id:t+":"+i,css:s,media:u,sourceMap:c};r[a]?r[a].parts.push(l):n.push(r[a]={id:a,parts:[l]})}return n}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(4),i=n(5),o=n.n(i),a={install:function(t,e){e||(e={});var n=new r.a(e);t.component("toasted",o.a),t.toasted=t.prototype.$toasted=n}};"undefined"!=typeof window&&window.Vue&&(window.Toasted=a),e.default=a}])});

/***/ })
],[14]);
//# sourceMappingURL=admin_login.js.map