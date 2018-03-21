webpackJsonp([4],{

/***/ 1:
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

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_app_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_app_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_app_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_app_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_app_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_4d4c9384_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_app_vue__ = __webpack_require__(27);
var disposed = false
var normalizeComponent = __webpack_require__(1)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_app_vue__["default"],
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

/***/ 27:
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

/***/ 6:
/***/ (function(module, exports) {

throw new Error("Module build failed: D:/phpStudy/WWW/shop/application/index/view/index/app.vue: Duplicate declaration \"Search\"\n\n  58 | } from \"vue-ydui/dist/lib.px/navbar\";\n  59 | import { Search } from \"vue-ydui/dist/lib.px/search\";\n> 60 | import Search from \"./index/search\";\n     |        ^\n  61 | import { Layout } from \"vue-ydui/dist/lib.px/layout\";\n  62 | import { TabBar, TabBarItem } from \"vue-ydui/dist/lib.px/tabbar\";\n  63 | import { Icons } from \"vue-ydui/dist/lib.px/icons\";\n");

/***/ })

});
//# sourceMappingURL=4.js.map