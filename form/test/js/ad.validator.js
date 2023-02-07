/*!
 Javascript framework for building user interfaces
 Copyright (c) 2018 A.D.
 License: Apache-2.0
*/
var ad = ad || {}; ad["validator"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2017 A.D.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template A
 */
var ADFoundation = function () {
  _createClass(ADFoundation, null, [{
    key: "cssClasses",

    /** @return enum{cssClasses} */
    get: function get() {
      // Classes extending ADFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'ad-component-active'}
      return {};
    }

    /** @return enum{strings} */

  }, {
    key: "strings",
    get: function get() {
      // Classes extending ADFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    }

    /** @return enum{numbers} */

  }, {
    key: "numbers",
    get: function get() {
      // Classes extending ADFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    }

    /** @return {!Object} */

  }, {
    key: "defaultAdapter",
    get: function get() {
      // Classes extending ADFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    }

    /**
     * @param {A=} adapter
     */

  }]);

  function ADFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ADFoundation);

    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  _createClass(ADFoundation, [{
    key: "init",
    value: function init() {
      // Subclasses should override this method to perform initialization routines (registering events, etc.)
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    }
  }]);

  return ADFoundation;
}();

/* harmony default export */ __webpack_exports__["a"] = (ADFoundation);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2017 A.D.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * @template F
 */

var ADComponent = function () {
  _createClass(ADComponent, null, [{
    key: 'attachTo',

    /**
     * @param {!Element} root
     * @return {!ADComponent}
     */
    value: function attachTo(root) {
      // Subclasses which extend ADComponent should provide an attachTo() method that takes a root element and
      // returns an instantiated component with its root set to that element. Also note that in the cases of
      // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
      // from getDefaultFoundation().

      var instance = new ADComponent(root, new __WEBPACK_IMPORTED_MODULE_0__foundation__["a" /* default */]());
      // Attach instance to the root
      root.ad = root.ad || {};
      root.ad[__WEBPACK_IMPORTED_MODULE_0__foundation__["a" /* default */].strings.INSTANCE_KEY] = instance;
      return instance;
    }

    /**
     * @param {!Element} root
     * @return {!ADComponent}
     */

  }, {
    key: 'getInstance',
    value: function getInstance(root) {
      return root.ad && root.ad[__WEBPACK_IMPORTED_MODULE_0__foundation__["a" /* default */].strings.INSTANCE_KEY] ? root.ad[__WEBPACK_IMPORTED_MODULE_0__foundation__["a" /* default */].strings.INSTANCE_KEY] : null;
    }

    /**
     * @param {!Element} root
     * @param {F=} foundation
     * @param {...?} args
     */

  }]);

  function ADComponent(root) {
    var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, ADComponent);

    /** @protected {!Element} */
    this.root_ = root;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.initialize.apply(this, args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @protected {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  _createClass(ADComponent, [{
    key: 'initialize',
    value: function initialize() /* ...args */{}
    // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.


    /**
     * @return {!F} foundation
     */

  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      // Subclasses must override this method to return a properly configured foundation class for the
      // component.
      throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
    }
  }, {
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      // Subclasses should override this method if they need to perform work to synchronize with a host DOM
      // object. An example of this would be a form control wrapper that needs to synchronize its internal state
      // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
      // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      // Subclasses may implement this method to release any resources / deregister any listeners they have
      // attached. An example of this might be deregistering a resize event from the window object.
      this.foundation_.destroy();
    }

    /**
     * Wrapper method to add an event listener to the component's root element. This is most useful when
     * listening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: 'listen',
    value: function listen(evtType, handler) {
      this.root_.addEventListener(evtType, handler);
    }

    /**
     * Wrapper method to remove an event listener to the component's root element. This is most useful when
     * unlistening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: 'unlisten',
    value: function unlisten(evtType, handler) {
      this.root_.removeEventListener(evtType, handler);
    }

    /**
     * Fires a cross-browser-compatible custom event from the component root of the given type,
     * with the given data.
     * @param {string} evtType
     * @param {!Object} evtData
     * @param {boolean=} shouldBubble
     */

  }, {
    key: 'emit',
    value: function emit(evtType, evtData) {
      var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var evt = void 0;
      if (typeof CustomEvent === 'function') {
        evt = new CustomEvent(evtType, {
          detail: evtData,
          bubbles: shouldBubble
        });
      } else {
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(evtType, shouldBubble, false, evtData);
      }

      this.root_.dispatchEvent(evt);
    }
  }]);

  return ADComponent;
}();

/* harmony default export */ __webpack_exports__["a"] = (ADComponent);

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADValidator", function() { return ADValidator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_base_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_control_validator__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ADValidatorFoundation", function() { return __WEBPACK_IMPORTED_MODULE_1__foundation__["a"]; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var ADValidator = function (_ADComponent) {
  _inherits(ADValidator, _ADComponent);

  function ADValidator() {
    _classCallCheck(this, ADValidator);

    return _possibleConstructorReturn(this, (ADValidator.__proto__ || Object.getPrototypeOf(ADValidator)).apply(this, arguments));
  }

  _createClass(ADValidator, [{
    key: 'initialize',
    value: function initialize() {
      var valItemFactory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (root, rules) {
        return new __WEBPACK_IMPORTED_MODULE_2__node_modules_control_validator__["a" /* default */](root, undefined, rules);
      };

      // Disable defautl validation if root is a form tag...
      if (this.root_.tagName === 'FORM') {
        this.root_.setAttribute('novalidate', '');
      }
      this.controls_ = [];
      var controls = this.root_.querySelectorAll('[' + __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.VALIDATE + ']');
      for (var i = 0, root; root = controls[i]; i++) {
        var control = valItemFactory(root, __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].rules);
        this.controls_.push(control);
      }
    }
  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this2 = this;

      return new __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */]({
        isValid: function isValid() {
          var valid = true;
          for (var i = 0, control; control = _this2.controls_[i]; i++) {
            if (!control.isValid()) {
              valid = false;
            }
          }
          return valid;
        },
        getDetails: function getDetails() {
          var details = [];
          for (var i = 0, control, detail; control = _this2.controls_[i]; i++) {
            if (control) {
              detail = control.getDetail();
            }
            if (detail.message) {
              // Check if elemet is a part of the group and the
              // message has already been added to the details list
              if (detail.isGroup && !_this2.isInDerailsList_(details, detail) || !detail.isGroup) {
                details.push(detail);
              }
            }
          }
          return details;
        }
      });
    }

    /**
     * isValid - description
     *
     * @return {type}  description
     */

  }, {
    key: 'isValid',
    value: function isValid() {
      return this.foundation_.isValid();
    }

    /**
     * getDetails - description
     *
     * @return {type}  description
     */

  }, {
    key: 'getDetails',
    value: function getDetails() {
      return this.foundation_.getDetails();
    }

    /**
     * isInDerailsList_ - description
     *
     * @param  {type} list   description
     * @param  {type} detail description
     * @return {type}        description
     */

  }, {
    key: 'isInDerailsList_',
    value: function isInDerailsList_(list, detail) {
      var res = false;
      for (var i = 0, el; el = list[i]; i++) {
        if (el.label === detail.label) {
          res = true;
        }
      }
      return res;
    }
  }], [{
    key: 'attachTo',

    /**
     * @param {!Element} root
     * @return {!ADControlValidator}
     */
    value: function attachTo(root) {
      var instance = new ADValidator(root);
      // Attach instance to the root
      root.ad = root.ad || {};
      root.ad[__WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.INSTANCE_KEY] = instance;
      return instance;
    }

    /**
     * @param {!Element} root
     * @return {!ADControlValidator}
     */

  }, {
    key: 'getInstance',
    value: function getInstance(root) {
      return root.ad && root.ad[__WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.INSTANCE_KEY] ? root.ad[__WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.INSTANCE_KEY] : null;
    }
  }]);

  return ADValidator;
}(__WEBPACK_IMPORTED_MODULE_0__node_modules_base_component__["a" /* default */]);

;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_base_foundation__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var cssClasses = {};

var strings = {
  INSTANCE_KEY: 'ad-validator',
  VALIDATE: 'ad-val',
  MATCH: 'ad-val-match',
  ID: 'ad-id',
  GROUP: 'ad-group'

};

var rules = {
  'ad-val-required': {
    hnd: function hnd(el, attrs, value) {
      var res = false;
      if (el.type && (el.type === 'checkbox' || el.type === 'radio')) {
        if (value) {
          res = true;
        } else {
          var group = el.getAttribute(ADValidatorFoundation.strings.GROUP);
          var grEls = document.querySelectorAll('[' + ADValidatorFoundation.strings.GROUP + '=' + group + ']');
          for (var i = 0, gEl; gEl = grEls[i]; i++) {
            if (gEl.checked === true) {
              res = true;
            }
          }
        }
      } else if (value.trim() !== '') {
        res = true;
      }
      return res;
    },
    detail: 'Required'
  },
  'ad-val-phone': {
    pattern: /^\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/,
    detail: 'Phone number is not valid'
  },
  'ad-val-email': {
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    detail: 'Email is not valid'
  },
  'ad-val-url': {
    pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    detail: 'URL is not valid'
  },
  'ad-val-zip': {
    pattern: /^\d{5}(-\d{4})?$/,
    detail: 'ZIP code is not valid'
  },
  'ad-val-decimal': {
    pattern: /^[0-9]+(\.[0-9][0-9]?)?$/,
    detail: 'Decimal number is not valid'
  },
  'ad-val-number': {
    pattern: /^[0-9]*$/,
    detail: 'Number is not valid'
  },
  'ad-val-match': {
    hnd: function hnd(el, attrs, value) {
      var res = false;
      var id = el.getAttribute(ADValidatorFoundation.strings.MATCH);
      var mEl = document.querySelector('[' + ADValidatorFoundation.strings.ID + '=' + id + ']');
      if (mEl) {
        var mValue = mEl.value.trim();
        value = value.trim();

        if (value && (value === '' || value === mValue)) {
          res = true;
        }
      }
      return res;
    },
    detail: 'Does not match'
  }
};

var ADValidatorFoundation = function (_ADFoundation) {
  _inherits(ADValidatorFoundation, _ADFoundation);

  _createClass(ADValidatorFoundation, null, [{
    key: 'addRule',
    value: function addRule(rule, name) {
      rules[name] = rule;
    }

    /** @return {!ADValidatorAdapter} */

  }, {
    key: 'cssClasses',

    /** @return enum {cssClasses} */
    get: function get() {
      return cssClasses;
    }

    /** @return enum {strings} */

  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }
  }, {
    key: 'rules',
    get: function get() {
      return rules;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!ADValidatorAdapter} */{
          isRootForm: function isRootForm() /* boolean */{},
          disableDefaultValidation: function disableDefaultValidation() {},
          registerValidators: function registerValidators() {},
          isValid: function isValid() /* boolean */{},
          getDetails: function getDetails() {}
        }
      );
    }
  }]);

  function ADValidatorFoundation(adapter) {
    _classCallCheck(this, ADValidatorFoundation);

    return _possibleConstructorReturn(this, (ADValidatorFoundation.__proto__ || Object.getPrototypeOf(ADValidatorFoundation)).call(this, _extends(ADValidatorFoundation.defaultAdapter, adapter)));
  }

  _createClass(ADValidatorFoundation, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'isValid',
    value: function isValid() {
      return this.adapter_.isValid();
    }
  }, {
    key: 'getDetails',
    value: function getDetails() {
      return this.adapter_.getDetails();
    }
  }]);

  return ADValidatorFoundation;
}(__WEBPACK_IMPORTED_MODULE_0__node_modules_base_foundation__["a" /* default */]);

;

/* harmony default export */ __webpack_exports__["a"] = (ADValidatorFoundation);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ADControlValidator */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_base_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation__ = __webpack_require__(12);
/* unused harmony reexport ADControlValidatorFoundation */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ADControlValidator = function (_ADComponent) {
  _inherits(ADControlValidator, _ADComponent);

  function ADControlValidator() {
    _classCallCheck(this, ADControlValidator);

    return _possibleConstructorReturn(this, (ADControlValidator.__proto__ || Object.getPrototypeOf(ADControlValidator)).apply(this, arguments));
  }

  _createClass(ADControlValidator, [{
    key: 'initialize',
    value: function initialize(rules) {
      this.rules_ = rules;
    }
  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this2 = this;

      return new __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */]({
        isRequired: function isRequired() {
          return _this2.root_.hasAttribute(__WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.REQUIRED);
        },
        registerEvent: function registerEvent(type, handler) {
          _this2.listen(type, function (e) {
            handler(e.value);
          });
        },
        getAllAtributes: function getAllAtributes() {
          var attributes = [];
          var name = '';
          for (var i = 0, attribute; attribute = _this2.root_.attributes[i]; i++) {
            name = attribute.name;
            if (name.startsWith(__WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.START_WITH)) {
              attributes.push(name);
            }
          }
          return attributes;
        },
        getMessage: function getMessage() {
          var detail = _this2.root_.getAttribute(__WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.MESSAGE);
          return detail;
        },
        getRules: function getRules() {
          return _this2.rules_;
        },
        setNotValidIndicator: function setNotValidIndicator(details) {
          // Set the validator indicator
          var gr = _this2.root_.closest('[' + __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.CONTROL_GROUP + ']');
          if (gr) {
            gr.classList.add(__WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.ERROR_CLASS);
          }
          var det = gr.querySelector('[' + __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.MESSAGE_SHOW + ']');
          if (det) {
            det.innerHTML = details.message;
            det.style.display = 'block';
          }
        },
        removeNotValidIndicator: function removeNotValidIndicator() {
          // Remove the validator indicator
          var gr = _this2.root_.closest('[' + __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.CONTROL_GROUP + ']');
          if (gr) {
            gr.classList.remove(__WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.ERROR_CLASS);
          }
          var det = gr.querySelector('[' + __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.MESSAGE_SHOW + ']');
          if (det) {
            det.innerHTML = '';
            det.style.display = 'none';
          }
        },
        isChangeCheckboxType: function isChangeCheckboxType() {
          var root = _this2.root_;
          var res = root.nodeName === 'SELECT' || root.type && (root.type == 'checkbox' || root.type == 'radio');
          return res;
        },
        getValue: function getValue() {
          return _this2.getValue_();
        },
        getElement: function getElement() {
          return _this2.root_;
        },
        getLabel: function getLabel() {
          var res = '';
          var gr = _this2.root_.closest('[' + __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.CONTROL_GROUP + ']');
          var el = gr.querySelector('[' + __WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.LABEL + ']');
          if (el) {
            res = el.getAttribute(__WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.LABEL);
          }
          return res;
        },
        isInGroup: function isInGroup() {
          return _this2.root_.hasAttribute(__WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.GROUP);
        }
      });
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      var value = this.getValue_();
      return this.foundation_.isValid(value);
    }
  }, {
    key: 'getDetail',
    value: function getDetail() {
      return this.foundation_.getDetail();
    }
  }, {
    key: 'getValue_',
    value: function getValue_() {
      var value = void 0;
      var root = this.root_;
      if (root.type && (root.type === 'checkbox' || root.type === 'radio')) {
        value = root.checked;
      } else {
        value = root.value;
      }
      return value;
    }
  }], [{
    key: 'attachTo',

    /**
     * @param {!Element} root
     * @return {!ADComponent}
     */
    value: function attachTo(root) {
      var instance = new ADControlValidator(root);

      // Attach instance to the root
      root.ad = root.ad || {};
      root.ad[__WEBPACK_IMPORTED_MODULE_1__foundation__["a" /* default */].strings.INSTANCE_KEY] = instance;
      return instance;
    }

    /**
     * @param {!Element} root
     * @return {!MDCComponent}
     */

  }, {
    key: 'getInstance',
    value: function getInstance(root) {
      return root.ad && root.ad[ADValidatorItemFoundation.strings.INSTANCE_KEY] ? root.ad[ADValidatorItemFoundation.strings.INSTANCE_KEY] : null;
    }
  }]);

  return ADControlValidator;
}(__WEBPACK_IMPORTED_MODULE_0__node_modules_base_component__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (ADControlValidator);
;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_base_foundation__ = __webpack_require__(0);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var strings = {
  INSTANCE_KEY: 'ad-validator-item',
  START_WITH: 'ad-val',
  MESSAGE: 'ad-message',
  MESSAGE_SHOW: 'ad-message-show',
  BLUR_EVENT: 'blur',
  KEYUP_EVENT: 'keyup',
  CHANGE_EVENT: 'change',
  REQUIRED: 'ad-val-required',
  ERROR_CLASS: 'ad-error',
  LABEL: 'ad-label',
  CONTROL_GROUP: 'ad-control-group',
  GROUP: 'ad-group'
};

var ADControlValidatorFoundation = function (_ADFoundation) {
  _inherits(ADControlValidatorFoundation, _ADFoundation);

  _createClass(ADControlValidatorFoundation, null, [{
    key: 'strings',

    /** @return enum {strings} */
    get: function get() {
      return strings;
    }

    /** @return {!ADValidatorAdapter} */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!ADValidatorAdapter} */{
          isRequired: function isRequired() /* boolean */{},
          registerEvent: function registerEvent() /* type: string, handler: EventListener  */{},
          getAllAtributes: function getAllAtributes() {},
          getMessage: function getMessage() /* string */{},
          getRules: function getRules() /* Object */{},
          setNotValidIndicator: function setNotValidIndicator() /* string */{},
          removeNotValidIndicator: function removeNotValidIndicator() {},
          isChangeCheckboxType: function isChangeCheckboxType() /* boolean */{},
          getValue: function getValue() /**/{},
          getElement: function getElement() /* Element */{},
          getLabel: function getLabel() /* string */{},
          isInGroup: function isInGroup() /* boolean */{}
        }
      );
    }
  }]);

  function ADControlValidatorFoundation(adapter) {
    _classCallCheck(this, ADControlValidatorFoundation);

    var _this = _possibleConstructorReturn(this, (ADControlValidatorFoundation.__proto__ || Object.getPrototypeOf(ADControlValidatorFoundation)).call(this, _extends(ADControlValidatorFoundation.defaultAdapter, adapter)));

    _this.attributes_ = [];
    _this.required_ = false;
    _this.detail_ = {};
    _this.label_ = 'Control';
    _this.validateHandler_ = function () {
      var value = _this.adapter_.getValue();
      _this.isValid(value);
    };
    return _this;
  }

  _createClass(ADControlValidatorFoundation, [{
    key: 'init',
    value: function init() {
      this.attributes_ = this.adapter_.getAllAtributes();
      this.isRequired_ = this.adapter_.isRequired();
      this.element_ = this.adapter_.getElement();
      if (this.adapter_.isChangeCheckboxType()) {
        // retgiter change event
        this.adapter_.registerEvent(ADControlValidatorFoundation.strings.CHANGE_EVENT, this.validateHandler_);
      } else {
        // register keyup event
        this.adapter_.registerEvent(ADControlValidatorFoundation.strings.KEYUP_EVENT, this.validateHandler_);
        this.adapter_.registerEvent(ADControlValidatorFoundation.strings.BLUR_EVENT, this.validateHandler_);
      }
      var label = this.adapter_.getLabel();
      if (label && label.trim() != '') {
        this.label_ = label;
      }
    }
  }, {
    key: 'isValid',
    value: function isValid(value) {
      var valid = true;
      // First check if required
      if (this.isRequired_) {
        valid = this.validate_(ADControlValidatorFoundation.strings.REQUIRED, value);
      }
      if (!(typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'boolean') {
        value = value.trim() !== '';
      }
      // Check for the rest of validators
      if (valid && value) {
        for (var i = 0, attr; attr = this.attributes_[i]; i++) {
          valid = this.validate_(attr, value);
          if (!valid) {
            break;
          }
        }
      }
      if (!valid) {
        this.adapter_.setNotValidIndicator(this.detail_);
      } else {
        this.adapter_.removeNotValidIndicator();
      }
      return valid;
    }
  }, {
    key: 'getDetail',
    value: function getDetail() {
      return this.detail_;
    }
  }, {
    key: 'validate_',
    value: function validate_(attr, value) {
      var valid = true;

      var _resolveAttribute_ = this.resolveAttribute_(attr, value),
          validated = _resolveAttribute_.validated,
          detail = _resolveAttribute_.detail;

      this.detail_ = {};
      if (!validated) {
        // Second use for custom details
        validated = this.adapter_.getMessage();
        if (validated) {
          detail = validated;
        }
        this.detail_ = {
          label: this.label_,
          message: detail,
          isGroup: this.adapter_.isInGroup()
        };
        valid = false;
      }
      return valid;
    }
  }, {
    key: 'resolveAttribute_',
    value: function resolveAttribute_(attr, value) {
      var rules = this.adapter_.getRules();
      var rule = rules[attr];
      var validated = true;
      var detail = '';
      if (rule) {
        if (rule.hnd) {
          validated = rule.hnd(this.element_, this.attributes_, value);
        } else {
          validated = rule.pattern.exec(value);
        }
        detail = rule.detail;
      }
      return { validated: validated, detail: detail };
    }
  }]);

  return ADControlValidatorFoundation;
}(__WEBPACK_IMPORTED_MODULE_0__node_modules_base_foundation__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (ADControlValidatorFoundation);

/***/ })
/******/ ]);