(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./assets/js/theme/bis-pdp-options.js":
/*!********************************************!*\
  !*** ./assets/js/theme/bis-pdp-options.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return initBisPdpOptions; });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * bis-pdp-options.js
 * Handles: searchable select dropdowns, color swatch dots, Buy Now button,
 *          and hiding unavailable option combinations in the PDP.
 *
 * Loaded by assets/js/theme/product.js via import.
 * ponytail: no framework deps, pure DOM + BC cart API fetch.
 */

// ─── Color name → CSS color map ────────────────────────────────────────────
var COLOR_MAP = {
  'black': '#111111',
  'white': '#ffffff',
  'red': '#e31b23',
  'dark blue': '#1a3a6b',
  'dark-blue': '#1a3a6b',
  'blue': '#2563eb',
  'light blue': '#60a5fa',
  'light-blue': '#60a5fa',
  'kelly green': '#22a34a',
  'kelly-green': '#22a34a',
  'green': '#16a34a',
  'fluorescent green': '#39ff14',
  'fluorescent-green': '#39ff14',
  'fluorescent orange': '#ff6a00',
  'fluorescent-orange': '#ff6a00',
  'fluorescent pink': '#ff69b4',
  'fluorescent-pink': '#ff69b4',
  'fluorescent red': '#ff1a1a',
  'fluorescent-red': '#ff1a1a',
  'fluorescent yellow': '#ffff00',
  'fluorescent-yellow': '#ffff00',
  'yellow': '#facc15',
  'orange': '#f97316',
  'purple': '#9333ea',
  'pink': '#ec4899',
  'brown': '#78350f',
  'silver': '#94a3b8',
  'gold': '#d97706',
  'gray': '#6b7280',
  'grey': '#6b7280',
  'tan': '#c4a882',
  'beige': '#f5f0e8',
  'navy': '#172554'
};
function getColorForLabel(label) {
  if (!label) return null;
  var key = label.toLowerCase().trim();
  if (COLOR_MAP[key]) return COLOR_MAP[key];
  // Partial match: find first key contained in the label
  for (var _i = 0, _Object$entries = Object.entries(COLOR_MAP); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _Object$entries[_i],
      k = _Object$entries$_i[0],
      v = _Object$entries$_i[1];
    if (key.includes(k)) return v;
  }
  return null;
}

// ─── Color dot rendering ────────────────────────────────────────────────────
function initColorDots() {
  document.querySelectorAll('[data-product-attribute="set-rectangle"]').forEach(function (group) {
    var dots = group.querySelectorAll('.bis-rect-color-dot');
    var anyColor = false;
    dots.forEach(function (dot) {
      var label = dot.dataset.colorLabel || '';
      var color = getColorForLabel(label);
      if (color) {
        dot.style.backgroundColor = color;
        dot.style.display = 'inline-block';
        // Add border for light colors
        if (['#ffffff', '#ffff00', '#facc15', '#f5f0e8', '#ff69b4'].includes(color)) {
          dot.style.border = '1px solid #cbd5e1';
        }
        anyColor = true;
      } else {
        dot.style.display = 'none';
      }
    });

    // If this group has color dots, add class so grid auto-sizes correctly
    if (anyColor) group.classList.add('bis-has-colors');
  });
}

// ─── Searchable custom select ───────────────────────────────────────────────
function initSearchableSelects() {
  document.querySelectorAll('[data-searchable-select]').forEach(function (wrap) {
    var nativeSelect = wrap.querySelector('.bis-select-native');
    var customSelect = wrap.querySelector('.bis-custom-select');
    if (!nativeSelect || !customSelect) return;
    var trigger = customSelect.querySelector('.bis-custom-select-trigger');
    var valLabel = customSelect.querySelector('.bis-custom-select-value');
    var dropdown = customSelect.querySelector('.bis-custom-select-dropdown');
    var searchIn = customSelect.querySelector('.bis-custom-select-search');
    var list = customSelect.querySelector('.bis-custom-select-list');
    var empty = customSelect.querySelector('.bis-custom-select-empty');
    var items = function items() {
      return list.querySelectorAll('.bis-custom-select-item');
    };
    var isOpen = false;
    function syncFromNative() {
      var opt = nativeSelect.options[nativeSelect.selectedIndex];
      valLabel.textContent = opt && opt.value ? opt.text : nativeSelect.options[0].text;
      items().forEach(function (li) {
        li.classList.toggle('is-selected', li.dataset.value === nativeSelect.value);
      });
    }
    function open() {
      isOpen = true;
      customSelect.classList.add('is-open');
      dropdown.style.display = 'block';
      searchIn.value = '';
      filterList('');
      searchIn.focus();
    }
    function close() {
      isOpen = false;
      customSelect.classList.remove('is-open');
      dropdown.style.display = 'none';
    }
    function filterList(q) {
      var query = q.toLowerCase();
      var visible = 0;
      items().forEach(function (li) {
        // Skip already-disabled options
        var opt = nativeSelect.querySelector("option[value=\"" + li.dataset.value + "\"]");
        var disabled = opt && opt.disabled;
        var match = !query || li.dataset.label.toLowerCase().includes(query);
        li.style.display = match && !disabled ? '' : 'none';
        if (match && !disabled) visible++;
      });
      empty.style.display = visible === 0 ? '' : 'none';
    }
    function selectItem(li) {
      nativeSelect.value = li.dataset.value;
      nativeSelect.dispatchEvent(new Event('change', {
        bubbles: true
      }));
      syncFromNative();
      close();
    }
    trigger.addEventListener('click', function () {
      return isOpen ? close() : open();
    });
    searchIn.addEventListener('input', function (e) {
      return filterList(e.target.value);
    });
    list.addEventListener('click', function (e) {
      var li = e.target.closest('.bis-custom-select-item');
      if (li && li.style.display !== 'none') selectItem(li);
    });

    // Keyboard: escape closes, enter/space selects focused item
    customSelect.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (isOpen && !wrap.contains(e.target)) close();
    });

    // Keep custom UI in sync when BC JS changes the native select
    nativeSelect.addEventListener('change', syncFromNative);

    // Initial sync
    syncFromNative();
    dropdown.style.display = 'none';
  });
}

// ─── Hide unavailable options after selection ───────────────────────────────
// BC JS sets `disabled` on unavailable <option> elements and adds
// .form-option--unavailable on rectangle/swatch labels.
// We additionally hide them so the customer never hits dead ends.
function initUnavailableFilter() {
  var form = document.querySelector('[data-cart-item-add]');
  if (!form) return;
  function refresh() {
    // Dropdowns: hide disabled options
    form.querySelectorAll('.bis-select-native').forEach(function (sel) {
      var _wrap$querySelector;
      // Re-filter visible items in custom UI
      var wrap = sel.closest('[data-searchable-select]');
      if (!wrap) return;
      var searchVal = ((_wrap$querySelector = wrap.querySelector('.bis-custom-select-search')) == null ? void 0 : _wrap$querySelector.value) || '';
      var list = wrap.querySelector('.bis-custom-select-list');
      if (!list) return;
      list.querySelectorAll('.bis-custom-select-item').forEach(function (li) {
        var opt = sel.querySelector("option[value=\"" + li.dataset.value + "\"]");
        if (opt && opt.disabled) {
          li.style.display = 'none';
        }
      });
    });

    // Rectangle cards: hide unavailable ones
    form.querySelectorAll('.bis-rectangle-card').forEach(function (card) {
      var radio = document.getElementById(card.getAttribute('for'));
      if (radio && radio.disabled) {
        var _card$closest;
        (_card$closest = card.closest('.bis-rectangle-radio + .bis-rectangle-card')) == null || (_card$closest = _card$closest.parentElement) == null || _card$closest.style;
        card.classList.add('bis-option--unavailable');
      } else {
        card.classList.remove('bis-option--unavailable');
      }
    });
  }

  // Watch for BC JS triggering option changes
  form.addEventListener('change', function () {
    return setTimeout(refresh, 50);
  });
  refresh();
}

// ─── Buy Now ────────────────────────────────────────────────────────────────
function initBuyNow() {
  var btn = document.getElementById('bis-buy-now-btn');
  if (!btn) return;
  btn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var form, data, res, hidden, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          form = btn.closest('form') || document.querySelector('[data-cart-item-add]');
          if (form) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          btn.disabled = true;
          btn.classList.add('is-loading');
          _context.p = 2;
          data = new FormData(form);
          data.set('action', 'add');
          _context.n = 3;
          return fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
          });
        case 3:
          res = _context.v;
          if (res.ok || res.redirected) {
            window.location.href = '/checkout';
          } else {
            // Fall back: submit form normally
            hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = 'action';
            hidden.value = 'add';
            form.appendChild(hidden);
            form.submit();
          }
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          // Network error fallback
          window.location.href = '/checkout';
        case 5:
          _context.p = 5;
          btn.disabled = false;
          btn.classList.remove('is-loading');
          return _context.f(5);
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[2, 4, 5, 6]]);
  })));
}

// ─── Init ────────────────────────────────────────────────────────────────────
function initBisPdpOptions() {
  initColorDots();
  initSearchableSelects();
  initUnavailableFilter();
  initBuyNow();
}

// Run color dots + Buy Now immediately via DOMContentLoaded
// so they work even if BC product-details.js throws (e.g. special chars in product name)
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (document.querySelector('.bis-pdp')) {
        initColorDots();
        initBuyNow();
        initSearchableSelects();
        initUnavailableFilter();
      }
    });
  } else {
    // Already loaded (module evaluated after DOM ready)
    if (document.querySelector('.bis-pdp')) {
      initColorDots();
      initBuyNow();
      initSearchableSelects();
      initUnavailableFilter();
    }
  }
}

/***/ }),

/***/ "./assets/js/theme/common/form-utils.js":
/*!**********************************************!*\
  !*** ./assets/js/theme/common/form-utils.js ***!
  \**********************************************/
/*! exports provided: classifyForm, Validators, insertStateHiddenField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classifyForm", function() { return classifyForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validators", function() { return Validators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertStateHiddenField", function() { return insertStateHiddenField; });
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/capitalize */ "./node_modules/lodash/capitalize.js");
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/camelCase */ "./node_modules/lodash/camelCase.js");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _models_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/forms */ "./assets/js/theme/common/models/forms.js");





var inputTagNames = ['input', 'select', 'textarea'];

/**
 * Apply class name to an input element on its type
 * @param {object} input
 * @param {string} formFieldClass
 * @return {object} Element itself
 */
function classifyInput(input, formFieldClass) {
  var $input = $(input);
  var $formField = $input.parent("." + formFieldClass);
  var tagName = $input.prop('tagName').toLowerCase();
  var className = formFieldClass + "--" + tagName;
  var specificClassName;

  // Input can be text/checkbox/radio etc...
  if (tagName === 'input') {
    var inputType = $input.prop('type');
    if (lodash_includes__WEBPACK_IMPORTED_MODULE_2___default()(['radio', 'checkbox', 'submit'], inputType)) {
      // ie: .form-field--checkbox, .form-field--radio
      className = formFieldClass + "--" + lodash_camelCase__WEBPACK_IMPORTED_MODULE_1___default()(inputType);
    } else {
      // ie: .form-field--input .form-field--inputText
      specificClassName = "" + className + lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default()(inputType);
    }
  }

  // Apply class modifier
  return $formField.addClass(className).addClass(specificClassName);
}

/**
 * Apply class name to each input element in a form based on its type
 * @example
 * // Before
 * <form id="form">
 *     <div class="form-field">
 *         <input type="text">
 *     </div>
 *     <div class="form-field">
 *         <select>...</select>
 *     </div>
 * </form>
 *
 * classifyForm('#form', { formFieldClass: 'form-field' });
 *
 * // After
 * <div class="form-field form-field--input form-field--inputText">...</div>
 * <div class="form-field form-field--select">...</div>
 *
 * @param {string|object} formSelector - selector or element
 * @param {object} options
 * @return {jQuery} Element itself
 */
function classifyForm(formSelector, options) {
  if (options === void 0) {
    options = {};
  }
  var $form = $(formSelector);
  var $inputs = $form.find(inputTagNames.join(', '));

  // Obtain options
  var _options = options,
    _options$formFieldCla = _options.formFieldClass,
    formFieldClass = _options$formFieldCla === void 0 ? 'form-field' : _options$formFieldCla;

  // Classify each input in a form
  $inputs.each(function (__, input) {
    classifyInput(input, formFieldClass);
  });
  return $form;
}

/**
 * Get id from given field
 * @param {object} $field JQuery field object
 * @return {string}
 */
function getFieldId($field) {
  var fieldId = $field.prop('name').match(/(\[.*\])/);
  if (fieldId && fieldId.length !== 0) {
    return fieldId[0];
  }
  return '';
}

/**
 * Insert hidden field after State/Province field
 * @param {object} $stateField JQuery field object
 */
function insertStateHiddenField($stateField) {
  var fieldId = getFieldId($stateField);
  var stateFieldAttrs = {
    type: 'hidden',
    name: "FormFieldIsText" + fieldId,
    value: '1'
  };
  $stateField.after($('<input />', stateFieldAttrs));
}
var Validators = {
  /**
   * Sets up a new validation when the form is dirty
   * @param validator
   * @param field
   */
  setEmailValidation: function setEmailValidation(validator, field) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = _models_forms__WEBPACK_IMPORTED_MODULE_4__["default"].email(val);
          cb(result);
        },
        errorMessage: 'You must enter a valid email.'
      });
    }
  },
  /**
   * Validate password fields
   * @param validator
   * @param passwordSelector
   * @param password2Selector
   * @param requirements
   * @param isOptional
   */
  setPasswordValidation: function setPasswordValidation(validator, passwordSelector, password2Selector, requirements, isOptional) {
    var $password = $(passwordSelector);
    var passwordValidations = [{
      selector: passwordSelector,
      validate: function validate(cb, val) {
        var result = val.length;
        if (isOptional) {
          return cb(true);
        }
        cb(result);
      },
      errorMessage: 'You must enter a password.'
    }, {
      selector: passwordSelector,
      validate: function validate(cb, val) {
        var result = val.match(new RegExp(requirements.alpha)) && val.match(new RegExp(requirements.numeric)) && val.length >= requirements.minlength;

        // If optional and nothing entered, it is valid
        if (isOptional && val.length === 0) {
          return cb(true);
        }
        cb(result);
      },
      errorMessage: requirements.error
    }, {
      selector: password2Selector,
      validate: function validate(cb, val) {
        var result = val.length;
        if (isOptional) {
          return cb(true);
        }
        cb(result);
      },
      errorMessage: 'You must enter a password.'
    }, {
      selector: password2Selector,
      validate: function validate(cb, val) {
        var result = val === $password.val();
        cb(result);
      },
      errorMessage: 'Your passwords do not match.'
    }];
    validator.add(passwordValidations);
  },
  /**
   * Validate password fields
   * @param {Nod} validator
   * @param {Object} selectors
   * @param {string} selectors.errorSelector
   * @param {string} selectors.fieldsetSelector
   * @param {string} selectors.formSelector
   * @param {string} selectors.maxPriceSelector
   * @param {string} selectors.minPriceSelector
   */
  setMinMaxPriceValidation: function setMinMaxPriceValidation(validator, selectors) {
    var errorSelector = selectors.errorSelector,
      fieldsetSelector = selectors.fieldsetSelector,
      formSelector = selectors.formSelector,
      maxPriceSelector = selectors.maxPriceSelector,
      minPriceSelector = selectors.minPriceSelector;
    validator.configure({
      form: formSelector,
      preventSubmit: true,
      successClass: '_' // KLUDGE: Don't apply success class
    });
    validator.add({
      errorMessage: 'Min price must be less than max. price.',
      selector: minPriceSelector,
      validate: "min-max:" + minPriceSelector + ":" + maxPriceSelector
    });
    validator.add({
      errorMessage: 'Min price must be less than max. price.',
      selector: maxPriceSelector,
      validate: "min-max:" + minPriceSelector + ":" + maxPriceSelector
    });
    validator.add({
      errorMessage: 'Max. price is required.',
      selector: maxPriceSelector,
      validate: 'presence'
    });
    validator.add({
      errorMessage: 'Min. price is required.',
      selector: minPriceSelector,
      validate: 'presence'
    });
    validator.add({
      errorMessage: 'Input must be greater than 0.',
      selector: [minPriceSelector, maxPriceSelector],
      validate: 'min-number:0'
    });
    validator.setMessageOptions({
      selector: [minPriceSelector, maxPriceSelector],
      parent: fieldsetSelector,
      errorSpan: errorSelector
    });
  },
  /**
   * Sets up a new validation when the form is dirty
   * @param validator
   * @param field
   */
  setStateCountryValidation: function setStateCountryValidation(validator, field) {
    if (field) {
      validator.add({
        selector: field,
        validate: 'presence',
        errorMessage: 'The \'State/Province\' field cannot be blank.'
      });
    }
  },
  /**
   * Removes classes from dirty form if previously checked
   * @param field
   */
  cleanUpStateValidation: function cleanUpStateValidation(field) {
    var $fieldClassElement = $("[data-type=\"" + field.data('fieldType') + "\"]");
    Object.keys(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes).forEach(function (value) {
      if ($fieldClassElement.hasClass(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes[value])) {
        $fieldClassElement.removeClass(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes[value]);
      }
    });
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/models/forms.js":
/*!************************************************!*\
  !*** ./assets/js/theme/common/models/forms.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var forms = {
  email: function email(value) {
    var re = /^.+@.+\..+/;
    return re.test(value);
  },
  /**
   * Validates a password field
   * @param value
   * @returns {boolean}
   */
  password: function password(value) {
    return this.notEmpty(value);
  },
  /**
   * validates if a field is empty
   * @param value
   * @returns {boolean}
   *
   */
  notEmpty: function notEmpty(value) {
    return value.length > 0;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/form-utils */ "./assets/js/theme/common/form-utils.js");
/* harmony import */ var _bis_pdp_options__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bis-pdp-options */ "./assets/js/theme/bis-pdp-options.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/*
 Import all product specific js
 */







var Product = /*#__PURE__*/function (_PageManager) {
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    return _this;
  }
  _inheritsLoose(Product, _PageManager);
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();

    // BIS Labels PDP enhancements: searchable selects, color swatches, Buy Now
    if (document.querySelector('.bis-pdp')) {
      Object(_bis_pdp_options__WEBPACK_IMPORTED_MODULE_6__["default"])();
    }
    var $reviewForm = Object(_common_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.writeReview-form');
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]($reviewForm);
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }
      return false;
    });
    this.productReviewHandler();
    this.bulkPricingHandler();
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/reviews.js":
/*!********************************************!*\
  !*** ./assets/js/theme/product/reviews.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/models/forms */ "./assets/js/theme/common/models/forms.js");



var _default = /*#__PURE__*/function () {
  function _default($reviewForm) {
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_0__["default"])({
      submit: $reviewForm.find('input[type="submit"]')
    });
    this.$reviewsContent = $('#product-reviews');
    this.$collapsible = $('[data-collapsible]', this.$reviewsContent);
    this.initLinkBind();
    this.injectPaginationLink();
    this.collapseReviews();
  }

  /**
   * On initial page load, the user clicks on "(12 Reviews)" link
   * The browser jumps to the review page and should expand the reviews section
   */
  var _proto = _default.prototype;
  _proto.initLinkBind = function initLinkBind() {
    var _this = this;
    var $content = $('#productReviews-content', this.$reviewsContent);
    $('.productView-reviewLink').on('click', function () {
      $('.productView-reviewTabLink').trigger('click');
      if (!$content.hasClass('is-open')) {
        _this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
      }
    });
  };
  _proto.collapseReviews = function collapseReviews() {
    // We're in paginating state, do not collapse
    if (window.location.hash && window.location.hash.indexOf('#product-reviews') === 0) {
      return;
    }

    // force collapse on page load
    this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
  }

  /**
   * Inject ID into the pagination link
   */;
  _proto.injectPaginationLink = function injectPaginationLink() {
    var $nextLink = $('.pagination-item--next .pagination-link', this.$reviewsContent);
    var $prevLink = $('.pagination-item--previous .pagination-link', this.$reviewsContent);
    if ($nextLink.length) {
      $nextLink.attr('href', $nextLink.attr('href') + " #product-reviews");
    }
    if ($prevLink.length) {
      $prevLink.attr('href', $prevLink.attr('href') + " #product-reviews");
    }
  };
  _proto.registerValidation = function registerValidation(context) {
    this.context = context;
    this.validator.add([{
      selector: '[name="revrating"]',
      validate: 'presence',
      errorMessage: this.context.reviewRating
    }, {
      selector: '[name="revtitle"]',
      validate: 'presence',
      errorMessage: this.context.reviewSubject
    }, {
      selector: '[name="revtext"]',
      validate: 'presence',
      errorMessage: this.context.reviewComment
    }, {
      selector: '.writeReview-form [name="email"]',
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.reviewEmail
    }]);
    return this.validator;
  };
  _proto.validate = function validate() {
    return this.validator.performCheck();
  };
  return _default;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYmlzLXBkcC1vcHRpb25zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vZm9ybS11dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL21vZGVscy9mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC9yZXZpZXdzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0L3ZpZGVvLWdhbGxlcnkuanMiXSwibmFtZXMiOlsiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJyZXR1cm4iLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJDT0xPUl9NQVAiLCJnZXRDb2xvckZvckxhYmVsIiwibGFiZWwiLCJrZXkiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJfaSIsIl9PYmplY3QkZW50cmllcyIsImVudHJpZXMiLCJfT2JqZWN0JGVudHJpZXMkX2kiLCJrIiwiaW5jbHVkZXMiLCJpbml0Q29sb3JEb3RzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImdyb3VwIiwiZG90cyIsImFueUNvbG9yIiwiZG90IiwiZGF0YXNldCIsImNvbG9yTGFiZWwiLCJjb2xvciIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiZGlzcGxheSIsImJvcmRlciIsImNsYXNzTGlzdCIsImFkZCIsImluaXRTZWFyY2hhYmxlU2VsZWN0cyIsIndyYXAiLCJuYXRpdmVTZWxlY3QiLCJxdWVyeVNlbGVjdG9yIiwiY3VzdG9tU2VsZWN0IiwidHJpZ2dlciIsInZhbExhYmVsIiwiZHJvcGRvd24iLCJzZWFyY2hJbiIsImxpc3QiLCJlbXB0eSIsIml0ZW1zIiwiaXNPcGVuIiwic3luY0Zyb21OYXRpdmUiLCJvcHQiLCJvcHRpb25zIiwic2VsZWN0ZWRJbmRleCIsInRleHRDb250ZW50IiwidGV4dCIsImxpIiwidG9nZ2xlIiwib3BlbiIsImZpbHRlckxpc3QiLCJmb2N1cyIsImNsb3NlIiwicmVtb3ZlIiwicSIsInF1ZXJ5IiwidmlzaWJsZSIsImRpc2FibGVkIiwibWF0Y2giLCJzZWxlY3RJdGVtIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiYnViYmxlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiY29udGFpbnMiLCJpbml0VW5hdmFpbGFibGVGaWx0ZXIiLCJmb3JtIiwicmVmcmVzaCIsInNlbCIsIl93cmFwJHF1ZXJ5U2VsZWN0b3IiLCJzZWFyY2hWYWwiLCJjYXJkIiwicmFkaW8iLCJnZXRFbGVtZW50QnlJZCIsImdldEF0dHJpYnV0ZSIsIl9jYXJkJGNsb3Nlc3QiLCJwYXJlbnRFbGVtZW50Iiwic2V0VGltZW91dCIsImluaXRCdXlOb3ciLCJidG4iLCJfY2FsbGVlIiwiZGF0YSIsInJlcyIsImhpZGRlbiIsIl90IiwiX2NvbnRleHQiLCJGb3JtRGF0YSIsInNldCIsImZldGNoIiwiYWN0aW9uIiwibWV0aG9kIiwiYm9keSIsImhlYWRlcnMiLCJvayIsInJlZGlyZWN0ZWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsIm5hbWUiLCJhcHBlbmRDaGlsZCIsInN1Ym1pdCIsImluaXRCaXNQZHBPcHRpb25zIiwicmVhZHlTdGF0ZSIsImlucHV0VGFnTmFtZXMiLCJjbGFzc2lmeUlucHV0IiwiaW5wdXQiLCJmb3JtRmllbGRDbGFzcyIsIiRpbnB1dCIsIiQiLCIkZm9ybUZpZWxkIiwicGFyZW50IiwidGFnTmFtZSIsInByb3AiLCJjbGFzc05hbWUiLCJzcGVjaWZpY0NsYXNzTmFtZSIsImlucHV0VHlwZSIsIl9pbmNsdWRlcyIsIl9jYW1lbENhc2UiLCJfY2FwaXRhbGl6ZSIsImFkZENsYXNzIiwiY2xhc3NpZnlGb3JtIiwiZm9ybVNlbGVjdG9yIiwiJGZvcm0iLCIkaW5wdXRzIiwiZmluZCIsImpvaW4iLCJfb3B0aW9ucyIsIl9vcHRpb25zJGZvcm1GaWVsZENsYSIsImVhY2giLCJfXyIsImdldEZpZWxkSWQiLCIkZmllbGQiLCJmaWVsZElkIiwiaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCIsIiRzdGF0ZUZpZWxkIiwic3RhdGVGaWVsZEF0dHJzIiwiYWZ0ZXIiLCJWYWxpZGF0b3JzIiwic2V0RW1haWxWYWxpZGF0aW9uIiwidmFsaWRhdG9yIiwiZmllbGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJ2YWwiLCJyZXN1bHQiLCJmb3JtcyIsImVtYWlsIiwiZXJyb3JNZXNzYWdlIiwic2V0UGFzc3dvcmRWYWxpZGF0aW9uIiwicGFzc3dvcmRTZWxlY3RvciIsInBhc3N3b3JkMlNlbGVjdG9yIiwicmVxdWlyZW1lbnRzIiwiaXNPcHRpb25hbCIsIiRwYXNzd29yZCIsInBhc3N3b3JkVmFsaWRhdGlvbnMiLCJSZWdFeHAiLCJhbHBoYSIsIm51bWVyaWMiLCJtaW5sZW5ndGgiLCJlcnJvciIsInNldE1pbk1heFByaWNlVmFsaWRhdGlvbiIsInNlbGVjdG9ycyIsImVycm9yU2VsZWN0b3IiLCJmaWVsZHNldFNlbGVjdG9yIiwibWF4UHJpY2VTZWxlY3RvciIsIm1pblByaWNlU2VsZWN0b3IiLCJjb25maWd1cmUiLCJwcmV2ZW50U3VibWl0Iiwic3VjY2Vzc0NsYXNzIiwic2V0TWVzc2FnZU9wdGlvbnMiLCJlcnJvclNwYW4iLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsIiRmaWVsZENsYXNzRWxlbWVudCIsImtleXMiLCJub2QiLCJjbGFzc2VzIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInJlIiwidGVzdCIsInBhc3N3b3JkIiwibm90RW1wdHkiLCJQcm9kdWN0IiwiX1BhZ2VNYW5hZ2VyIiwiY29udGV4dCIsIl90aGlzIiwidXJsIiwiJHJldmlld0xpbmsiLCIkYnVsa1ByaWNpbmdMaW5rIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJvblJlYWR5IiwiX3RoaXMyIiwib24iLCJpbmRleE9mIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInRpdGxlIiwicGF0aG5hbWUiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJwcm9kdWN0RGV0YWlscyIsIlByb2R1Y3REZXRhaWxzIiwiQkNEYXRhIiwicHJvZHVjdF9hdHRyaWJ1dGVzIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJ2aWRlb0dhbGxlcnkiLCIkcmV2aWV3Rm9ybSIsInJldmlldyIsIlJldmlldyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwiYnVsa1ByaWNpbmdIYW5kbGVyIiwiUGFnZU1hbmFnZXIiLCJfZGVmYXVsdCIsIiRyZXZpZXdzQ29udGVudCIsIiRjb2xsYXBzaWJsZSIsImluaXRMaW5rQmluZCIsImluamVjdFBhZ2luYXRpb25MaW5rIiwiY29sbGFwc2VSZXZpZXdzIiwiJGNvbnRlbnQiLCJDb2xsYXBzaWJsZUV2ZW50cyIsImNsaWNrIiwiaGFzaCIsIiRuZXh0TGluayIsIiRwcmV2TGluayIsImF0dHIiLCJyZXZpZXdSYXRpbmciLCJyZXZpZXdTdWJqZWN0IiwicmV2aWV3Q29tbWVudCIsInJldmlld0VtYWlsIiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsInByZXZlbnREZWZhdWx0IiwiJHRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJpZCIsIiRzZWxlY3RlZFRodW1iIiwic2V0TWFpblZpZGVvIiwic2V0QWN0aXZlVGh1bWIiLCJwbHVnaW5LZXkiLCIkdmlkZW9HYWxsZXJ5IiwiaW5kZXgiLCJlbGVtZW50IiwiJGVsIiwiaXNJbml0aWFsaXplZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzBCQUNBLHVLQUFBQSxDQUFBLEVBQUFDLENBQUEsRUFBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssV0FBQSw4QkFBQUMsRUFBQU4sQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBQyxDQUFBLEdBQUFMLENBQUEsSUFBQUEsQ0FBQSxDQUFBTSxTQUFBLFlBQUFDLFNBQUEsR0FBQVAsQ0FBQSxHQUFBTyxTQUFBLEVBQUFDLENBQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLENBQUFMLENBQUEsQ0FBQUMsU0FBQSxVQUFBSyxtQkFBQSxDQUFBSCxDQUFBLHVCQUFBVixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBRSxDQUFBLEVBQUFDLENBQUEsRUFBQUcsQ0FBQSxFQUFBSSxDQUFBLE1BQUFDLENBQUEsR0FBQVgsQ0FBQSxRQUFB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O0VBQUEsT0FBQStRLFlBQUE7QUFBQTtBQUdVLFNBQVMzQixZQUFZQSxDQUFBLEVBQUc7RUFDbkMsSUFBTXlDLFNBQVMsR0FBRyxlQUFlO0VBQ2pDLElBQU1DLGFBQWEsR0FBRzdJLENBQUMsWUFBVTRJLFNBQVMsTUFBRyxDQUFDO0VBRTlDQyxhQUFhLENBQUN6SCxJQUFJLENBQUMsVUFBQzBILEtBQUssRUFBRUMsT0FBTyxFQUFLO0lBQ25DLElBQU1DLEdBQUcsR0FBR2hKLENBQUMsQ0FBQytJLE9BQU8sQ0FBQztJQUN0QixJQUFNRSxhQUFhLEdBQUdELEdBQUcsQ0FBQzdLLElBQUksQ0FBQ3lLLFNBQVMsQ0FBQyxZQUFZZCxZQUFZO0lBRWpFLElBQUltQixhQUFhLEVBQUU7TUFDZjtJQUNKO0lBRUFELEdBQUcsQ0FBQzdLLElBQUksQ0FBQ3lLLFNBQVMsRUFBRSxJQUFJZCxZQUFZLENBQUNrQixHQUFHLENBQUMsQ0FBQztFQUM5QyxDQUFDLENBQUM7QUFDTixDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay42LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBiaXMtcGRwLW9wdGlvbnMuanNcbiAqIEhhbmRsZXM6IHNlYXJjaGFibGUgc2VsZWN0IGRyb3Bkb3ducywgY29sb3Igc3dhdGNoIGRvdHMsIEJ1eSBOb3cgYnV0dG9uLFxuICogICAgICAgICAgYW5kIGhpZGluZyB1bmF2YWlsYWJsZSBvcHRpb24gY29tYmluYXRpb25zIGluIHRoZSBQRFAuXG4gKlxuICogTG9hZGVkIGJ5IGFzc2V0cy9qcy90aGVtZS9wcm9kdWN0LmpzIHZpYSBpbXBvcnQuXG4gKiBwb255dGFpbDogbm8gZnJhbWV3b3JrIGRlcHMsIHB1cmUgRE9NICsgQkMgY2FydCBBUEkgZmV0Y2guXG4gKi9cblxuLy8g4pSA4pSA4pSAIENvbG9yIG5hbWUg4oaSIENTUyBjb2xvciBtYXAg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5jb25zdCBDT0xPUl9NQVAgPSB7XG4gICdibGFjayc6ICAgICAgICAgICAgJyMxMTExMTEnLFxuICAnd2hpdGUnOiAgICAgICAgICAgICcjZmZmZmZmJyxcbiAgJ3JlZCc6ICAgICAgICAgICAgICAnI2UzMWIyMycsXG4gICdkYXJrIGJsdWUnOiAgICAgICAgJyMxYTNhNmInLFxuICAnZGFyay1ibHVlJzogICAgICAgICcjMWEzYTZiJyxcbiAgJ2JsdWUnOiAgICAgICAgICAgICAnIzI1NjNlYicsXG4gICdsaWdodCBibHVlJzogICAgICAgJyM2MGE1ZmEnLFxuICAnbGlnaHQtYmx1ZSc6ICAgICAgICcjNjBhNWZhJyxcbiAgJ2tlbGx5IGdyZWVuJzogICAgICAnIzIyYTM0YScsXG4gICdrZWxseS1ncmVlbic6ICAgICAgJyMyMmEzNGEnLFxuICAnZ3JlZW4nOiAgICAgICAgICAgICcjMTZhMzRhJyxcbiAgJ2ZsdW9yZXNjZW50IGdyZWVuJzonIzM5ZmYxNCcsXG4gICdmbHVvcmVzY2VudC1ncmVlbic6JyMzOWZmMTQnLFxuICAnZmx1b3Jlc2NlbnQgb3JhbmdlJzonI2ZmNmEwMCcsXG4gICdmbHVvcmVzY2VudC1vcmFuZ2UnOicjZmY2YTAwJyxcbiAgJ2ZsdW9yZXNjZW50IHBpbmsnOiAnI2ZmNjliNCcsXG4gICdmbHVvcmVzY2VudC1waW5rJzogJyNmZjY5YjQnLFxuICAnZmx1b3Jlc2NlbnQgcmVkJzogICcjZmYxYTFhJyxcbiAgJ2ZsdW9yZXNjZW50LXJlZCc6ICAnI2ZmMWExYScsXG4gICdmbHVvcmVzY2VudCB5ZWxsb3cnOicjZmZmZjAwJyxcbiAgJ2ZsdW9yZXNjZW50LXllbGxvdyc6JyNmZmZmMDAnLFxuICAneWVsbG93JzogICAgICAgICAgICcjZmFjYzE1JyxcbiAgJ29yYW5nZSc6ICAgICAgICAgICAnI2Y5NzMxNicsXG4gICdwdXJwbGUnOiAgICAgICAgICAgJyM5MzMzZWEnLFxuICAncGluayc6ICAgICAgICAgICAgICcjZWM0ODk5JyxcbiAgJ2Jyb3duJzogICAgICAgICAgICAnIzc4MzUwZicsXG4gICdzaWx2ZXInOiAgICAgICAgICAgJyM5NGEzYjgnLFxuICAnZ29sZCc6ICAgICAgICAgICAgICcjZDk3NzA2JyxcbiAgJ2dyYXknOiAgICAgICAgICAgICAnIzZiNzI4MCcsXG4gICdncmV5JzogICAgICAgICAgICAgJyM2YjcyODAnLFxuICAndGFuJzogICAgICAgICAgICAgICcjYzRhODgyJyxcbiAgJ2JlaWdlJzogICAgICAgICAgICAnI2Y1ZjBlOCcsXG4gICduYXZ5JzogICAgICAgICAgICAgJyMxNzI1NTQnLFxufTtcblxuZnVuY3Rpb24gZ2V0Q29sb3JGb3JMYWJlbChsYWJlbCkge1xuICBpZiAoIWxhYmVsKSByZXR1cm4gbnVsbDtcbiAgY29uc3Qga2V5ID0gbGFiZWwudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGlmIChDT0xPUl9NQVBba2V5XSkgcmV0dXJuIENPTE9SX01BUFtrZXldO1xuICAvLyBQYXJ0aWFsIG1hdGNoOiBmaW5kIGZpcnN0IGtleSBjb250YWluZWQgaW4gdGhlIGxhYmVsXG4gIGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKENPTE9SX01BUCkpIHtcbiAgICBpZiAoa2V5LmluY2x1ZGVzKGspKSByZXR1cm4gdjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8g4pSA4pSA4pSAIENvbG9yIGRvdCByZW5kZXJpbmcg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5mdW5jdGlvbiBpbml0Q29sb3JEb3RzKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZT1cInNldC1yZWN0YW5nbGVcIl0nKS5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICBjb25zdCBkb3RzID0gZ3JvdXAucXVlcnlTZWxlY3RvckFsbCgnLmJpcy1yZWN0LWNvbG9yLWRvdCcpO1xuICAgIGxldCBhbnlDb2xvciA9IGZhbHNlO1xuXG4gICAgZG90cy5mb3JFYWNoKGRvdCA9PiB7XG4gICAgICBjb25zdCBsYWJlbCA9IGRvdC5kYXRhc2V0LmNvbG9yTGFiZWwgfHwgJyc7XG4gICAgICBjb25zdCBjb2xvciA9IGdldENvbG9yRm9yTGFiZWwobGFiZWwpO1xuICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIGRvdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgZG90LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICAgICAgLy8gQWRkIGJvcmRlciBmb3IgbGlnaHQgY29sb3JzXG4gICAgICAgIGlmIChbJyNmZmZmZmYnLCAnI2ZmZmYwMCcsICcjZmFjYzE1JywgJyNmNWYwZTgnLCAnI2ZmNjliNCddLmluY2x1ZGVzKGNvbG9yKSkge1xuICAgICAgICAgIGRvdC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICNjYmQ1ZTEnO1xuICAgICAgICB9XG4gICAgICAgIGFueUNvbG9yID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gSWYgdGhpcyBncm91cCBoYXMgY29sb3IgZG90cywgYWRkIGNsYXNzIHNvIGdyaWQgYXV0by1zaXplcyBjb3JyZWN0bHlcbiAgICBpZiAoYW55Q29sb3IpIGdyb3VwLmNsYXNzTGlzdC5hZGQoJ2Jpcy1oYXMtY29sb3JzJyk7XG4gIH0pO1xufVxuXG4vLyDilIDilIDilIAgU2VhcmNoYWJsZSBjdXN0b20gc2VsZWN0IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuZnVuY3Rpb24gaW5pdFNlYXJjaGFibGVTZWxlY3RzKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zZWFyY2hhYmxlLXNlbGVjdF0nKS5mb3JFYWNoKHdyYXAgPT4ge1xuICAgIGNvbnN0IG5hdGl2ZVNlbGVjdCA9IHdyYXAucXVlcnlTZWxlY3RvcignLmJpcy1zZWxlY3QtbmF0aXZlJyk7XG4gICAgY29uc3QgY3VzdG9tU2VsZWN0ID0gd3JhcC5xdWVyeVNlbGVjdG9yKCcuYmlzLWN1c3RvbS1zZWxlY3QnKTtcbiAgICBpZiAoIW5hdGl2ZVNlbGVjdCB8fCAhY3VzdG9tU2VsZWN0KSByZXR1cm47XG5cbiAgICBjb25zdCB0cmlnZ2VyICA9IGN1c3RvbVNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuYmlzLWN1c3RvbS1zZWxlY3QtdHJpZ2dlcicpO1xuICAgIGNvbnN0IHZhbExhYmVsID0gY3VzdG9tU2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5iaXMtY3VzdG9tLXNlbGVjdC12YWx1ZScpO1xuICAgIGNvbnN0IGRyb3Bkb3duID0gY3VzdG9tU2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5iaXMtY3VzdG9tLXNlbGVjdC1kcm9wZG93bicpO1xuICAgIGNvbnN0IHNlYXJjaEluID0gY3VzdG9tU2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5iaXMtY3VzdG9tLXNlbGVjdC1zZWFyY2gnKTtcbiAgICBjb25zdCBsaXN0ICAgICA9IGN1c3RvbVNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuYmlzLWN1c3RvbS1zZWxlY3QtbGlzdCcpO1xuICAgIGNvbnN0IGVtcHR5ICAgID0gY3VzdG9tU2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5iaXMtY3VzdG9tLXNlbGVjdC1lbXB0eScpO1xuICAgIGNvbnN0IGl0ZW1zICAgID0gKCkgPT4gbGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcuYmlzLWN1c3RvbS1zZWxlY3QtaXRlbScpO1xuXG4gICAgbGV0IGlzT3BlbiA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gc3luY0Zyb21OYXRpdmUoKSB7XG4gICAgICBjb25zdCBvcHQgPSBuYXRpdmVTZWxlY3Qub3B0aW9uc1tuYXRpdmVTZWxlY3Quc2VsZWN0ZWRJbmRleF07XG4gICAgICB2YWxMYWJlbC50ZXh0Q29udGVudCA9IG9wdCAmJiBvcHQudmFsdWUgPyBvcHQudGV4dCA6IG5hdGl2ZVNlbGVjdC5vcHRpb25zWzBdLnRleHQ7XG4gICAgICBpdGVtcygpLmZvckVhY2gobGkgPT4ge1xuICAgICAgICBsaS5jbGFzc0xpc3QudG9nZ2xlKCdpcy1zZWxlY3RlZCcsIGxpLmRhdGFzZXQudmFsdWUgPT09IG5hdGl2ZVNlbGVjdC52YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgaXNPcGVuID0gdHJ1ZTtcbiAgICAgIGN1c3RvbVNlbGVjdC5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XG4gICAgICBkcm9wZG93bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHNlYXJjaEluLnZhbHVlID0gJyc7XG4gICAgICBmaWx0ZXJMaXN0KCcnKTtcbiAgICAgIHNlYXJjaEluLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICBpc09wZW4gPSBmYWxzZTtcbiAgICAgIGN1c3RvbVNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XG4gICAgICBkcm9wZG93bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlckxpc3QocSkge1xuICAgICAgY29uc3QgcXVlcnkgPSBxLnRvTG93ZXJDYXNlKCk7XG4gICAgICBsZXQgdmlzaWJsZSA9IDA7XG4gICAgICBpdGVtcygpLmZvckVhY2gobGkgPT4ge1xuICAgICAgICAvLyBTa2lwIGFscmVhZHktZGlzYWJsZWQgb3B0aW9uc1xuICAgICAgICBjb25zdCBvcHQgPSBuYXRpdmVTZWxlY3QucXVlcnlTZWxlY3Rvcihgb3B0aW9uW3ZhbHVlPVwiJHtsaS5kYXRhc2V0LnZhbHVlfVwiXWApO1xuICAgICAgICBjb25zdCBkaXNhYmxlZCA9IG9wdCAmJiBvcHQuZGlzYWJsZWQ7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gIXF1ZXJ5IHx8IGxpLmRhdGFzZXQubGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSk7XG4gICAgICAgIGxpLnN0eWxlLmRpc3BsYXkgPSAobWF0Y2ggJiYgIWRpc2FibGVkKSA/ICcnIDogJ25vbmUnO1xuICAgICAgICBpZiAobWF0Y2ggJiYgIWRpc2FibGVkKSB2aXNpYmxlKys7XG4gICAgICB9KTtcbiAgICAgIGVtcHR5LnN0eWxlLmRpc3BsYXkgPSB2aXNpYmxlID09PSAwID8gJycgOiAnbm9uZSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VsZWN0SXRlbShsaSkge1xuICAgICAgbmF0aXZlU2VsZWN0LnZhbHVlID0gbGkuZGF0YXNldC52YWx1ZTtcbiAgICAgIG5hdGl2ZVNlbGVjdC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICAgIHN5bmNGcm9tTmF0aXZlKCk7XG4gICAgICBjbG9zZSgpO1xuICAgIH1cblxuICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBpc09wZW4gPyBjbG9zZSgpIDogb3BlbigpKTtcbiAgICBzZWFyY2hJbi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGUgPT4gZmlsdGVyTGlzdChlLnRhcmdldC52YWx1ZSkpO1xuXG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgY29uc3QgbGkgPSBlLnRhcmdldC5jbG9zZXN0KCcuYmlzLWN1c3RvbS1zZWxlY3QtaXRlbScpO1xuICAgICAgaWYgKGxpICYmIGxpLnN0eWxlLmRpc3BsYXkgIT09ICdub25lJykgc2VsZWN0SXRlbShsaSk7XG4gICAgfSk7XG5cbiAgICAvLyBLZXlib2FyZDogZXNjYXBlIGNsb3NlcywgZW50ZXIvc3BhY2Ugc2VsZWN0cyBmb2N1c2VkIGl0ZW1cbiAgICBjdXN0b21TZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgY2xvc2UoKTtcbiAgICB9KTtcblxuICAgIC8vIENsb3NlIG9uIG91dHNpZGUgY2xpY2tcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgaWYgKGlzT3BlbiAmJiAhd3JhcC5jb250YWlucyhlLnRhcmdldCkpIGNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBLZWVwIGN1c3RvbSBVSSBpbiBzeW5jIHdoZW4gQkMgSlMgY2hhbmdlcyB0aGUgbmF0aXZlIHNlbGVjdFxuICAgIG5hdGl2ZVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzeW5jRnJvbU5hdGl2ZSk7XG5cbiAgICAvLyBJbml0aWFsIHN5bmNcbiAgICBzeW5jRnJvbU5hdGl2ZSgpO1xuICAgIGRyb3Bkb3duLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH0pO1xufVxuXG4vLyDilIDilIDilIAgSGlkZSB1bmF2YWlsYWJsZSBvcHRpb25zIGFmdGVyIHNlbGVjdGlvbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbi8vIEJDIEpTIHNldHMgYGRpc2FibGVkYCBvbiB1bmF2YWlsYWJsZSA8b3B0aW9uPiBlbGVtZW50cyBhbmQgYWRkc1xuLy8gLmZvcm0tb3B0aW9uLS11bmF2YWlsYWJsZSBvbiByZWN0YW5nbGUvc3dhdGNoIGxhYmVscy5cbi8vIFdlIGFkZGl0aW9uYWxseSBoaWRlIHRoZW0gc28gdGhlIGN1c3RvbWVyIG5ldmVyIGhpdHMgZGVhZCBlbmRzLlxuZnVuY3Rpb24gaW5pdFVuYXZhaWxhYmxlRmlsdGVyKCkge1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2FydC1pdGVtLWFkZF0nKTtcbiAgaWYgKCFmb3JtKSByZXR1cm47XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICAvLyBEcm9wZG93bnM6IGhpZGUgZGlzYWJsZWQgb3B0aW9uc1xuICAgIGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmJpcy1zZWxlY3QtbmF0aXZlJykuZm9yRWFjaChzZWwgPT4ge1xuICAgICAgLy8gUmUtZmlsdGVyIHZpc2libGUgaXRlbXMgaW4gY3VzdG9tIFVJXG4gICAgICBjb25zdCB3cmFwID0gc2VsLmNsb3Nlc3QoJ1tkYXRhLXNlYXJjaGFibGUtc2VsZWN0XScpO1xuICAgICAgaWYgKCF3cmFwKSByZXR1cm47XG4gICAgICBjb25zdCBzZWFyY2hWYWwgPSB3cmFwLnF1ZXJ5U2VsZWN0b3IoJy5iaXMtY3VzdG9tLXNlbGVjdC1zZWFyY2gnKT8udmFsdWUgfHwgJyc7XG4gICAgICBjb25zdCBsaXN0ID0gd3JhcC5xdWVyeVNlbGVjdG9yKCcuYmlzLWN1c3RvbS1zZWxlY3QtbGlzdCcpO1xuICAgICAgaWYgKCFsaXN0KSByZXR1cm47XG4gICAgICBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaXMtY3VzdG9tLXNlbGVjdC1pdGVtJykuZm9yRWFjaChsaSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdCA9IHNlbC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke2xpLmRhdGFzZXQudmFsdWV9XCJdYCk7XG4gICAgICAgIGlmIChvcHQgJiYgb3B0LmRpc2FibGVkKSB7XG4gICAgICAgICAgbGkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBSZWN0YW5nbGUgY2FyZHM6IGhpZGUgdW5hdmFpbGFibGUgb25lc1xuICAgIGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmJpcy1yZWN0YW5nbGUtY2FyZCcpLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICBjb25zdCByYWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhcmQuZ2V0QXR0cmlidXRlKCdmb3InKSk7XG4gICAgICBpZiAocmFkaW8gJiYgcmFkaW8uZGlzYWJsZWQpIHtcbiAgICAgICAgY2FyZC5jbG9zZXN0KCcuYmlzLXJlY3RhbmdsZS1yYWRpbyArIC5iaXMtcmVjdGFuZ2xlLWNhcmQnKT8ucGFyZW50RWxlbWVudD8uc3R5bGU7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnYmlzLW9wdGlvbi0tdW5hdmFpbGFibGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnYmlzLW9wdGlvbi0tdW5hdmFpbGFibGUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFdhdGNoIGZvciBCQyBKUyB0cmlnZ2VyaW5nIG9wdGlvbiBjaGFuZ2VzXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gc2V0VGltZW91dChyZWZyZXNoLCA1MCkpO1xuICByZWZyZXNoKCk7XG59XG5cbi8vIOKUgOKUgOKUgCBCdXkgTm93IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuZnVuY3Rpb24gaW5pdEJ1eU5vdygpIHtcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jpcy1idXktbm93LWJ0bicpO1xuICBpZiAoIWJ0bikgcmV0dXJuO1xuXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gYnRuLmNsb3Nlc3QoJ2Zvcm0nKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYXJ0LWl0ZW0tYWRkXScpO1xuICAgIGlmICghZm9ybSkgcmV0dXJuO1xuXG4gICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnaXMtbG9hZGluZycpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgICBkYXRhLnNldCgnYWN0aW9uJywgJ2FkZCcpO1xuXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChmb3JtLmFjdGlvbiwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzLm9rIHx8IHJlcy5yZWRpcmVjdGVkKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9jaGVja291dCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGYWxsIGJhY2s6IHN1Ym1pdCBmb3JtIG5vcm1hbGx5XG4gICAgICAgIGNvbnN0IGhpZGRlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGhpZGRlbi50eXBlID0gJ2hpZGRlbic7XG4gICAgICAgIGhpZGRlbi5uYW1lID0gJ2FjdGlvbic7XG4gICAgICAgIGhpZGRlbi52YWx1ZSA9ICdhZGQnO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGhpZGRlbik7XG4gICAgICAgIGZvcm0uc3VibWl0KCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBOZXR3b3JrIGVycm9yIGZhbGxiYWNrXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvY2hlY2tvdXQnO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdpcy1sb2FkaW5nJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8g4pSA4pSA4pSAIEluaXQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0QmlzUGRwT3B0aW9ucygpIHtcbiAgaW5pdENvbG9yRG90cygpO1xuICBpbml0U2VhcmNoYWJsZVNlbGVjdHMoKTtcbiAgaW5pdFVuYXZhaWxhYmxlRmlsdGVyKCk7XG4gIGluaXRCdXlOb3coKTtcbn1cblxuLy8gUnVuIGNvbG9yIGRvdHMgKyBCdXkgTm93IGltbWVkaWF0ZWx5IHZpYSBET01Db250ZW50TG9hZGVkXG4vLyBzbyB0aGV5IHdvcmsgZXZlbiBpZiBCQyBwcm9kdWN0LWRldGFpbHMuanMgdGhyb3dzIChlLmcuIHNwZWNpYWwgY2hhcnMgaW4gcHJvZHVjdCBuYW1lKVxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJpcy1wZHAnKSkge1xuICAgICAgICBpbml0Q29sb3JEb3RzKCk7XG4gICAgICAgIGluaXRCdXlOb3coKTtcbiAgICAgICAgaW5pdFNlYXJjaGFibGVTZWxlY3RzKCk7XG4gICAgICAgIGluaXRVbmF2YWlsYWJsZUZpbHRlcigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIEFscmVhZHkgbG9hZGVkIChtb2R1bGUgZXZhbHVhdGVkIGFmdGVyIERPTSByZWFkeSlcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJpcy1wZHAnKSkge1xuICAgICAgaW5pdENvbG9yRG90cygpO1xuICAgICAgaW5pdEJ1eU5vdygpO1xuICAgICAgaW5pdFNlYXJjaGFibGVTZWxlY3RzKCk7XG4gICAgICBpbml0VW5hdmFpbGFibGVGaWx0ZXIoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbm9kIGZyb20gJy4vbm9kJztcbmltcG9ydCBmb3JtcyBmcm9tICcuL21vZGVscy9mb3Jtcyc7XG5cbmNvbnN0IGlucHV0VGFnTmFtZXMgPSBbXG4gICAgJ2lucHV0JyxcbiAgICAnc2VsZWN0JyxcbiAgICAndGV4dGFyZWEnLFxuXTtcblxuLyoqXG4gKiBBcHBseSBjbGFzcyBuYW1lIHRvIGFuIGlucHV0IGVsZW1lbnQgb24gaXRzIHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1GaWVsZENsYXNzXG4gKiBAcmV0dXJuIHtvYmplY3R9IEVsZW1lbnQgaXRzZWxmXG4gKi9cbmZ1bmN0aW9uIGNsYXNzaWZ5SW5wdXQoaW5wdXQsIGZvcm1GaWVsZENsYXNzKSB7XG4gICAgY29uc3QgJGlucHV0ID0gJChpbnB1dCk7XG4gICAgY29uc3QgJGZvcm1GaWVsZCA9ICRpbnB1dC5wYXJlbnQoYC4ke2Zvcm1GaWVsZENsYXNzfWApO1xuICAgIGNvbnN0IHRhZ05hbWUgPSAkaW5wdXQucHJvcCgndGFnTmFtZScpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBsZXQgY2xhc3NOYW1lID0gYCR7Zm9ybUZpZWxkQ2xhc3N9LS0ke3RhZ05hbWV9YDtcbiAgICBsZXQgc3BlY2lmaWNDbGFzc05hbWU7XG5cbiAgICAvLyBJbnB1dCBjYW4gYmUgdGV4dC9jaGVja2JveC9yYWRpbyBldGMuLi5cbiAgICBpZiAodGFnTmFtZSA9PT0gJ2lucHV0Jykge1xuICAgICAgICBjb25zdCBpbnB1dFR5cGUgPSAkaW5wdXQucHJvcCgndHlwZScpO1xuXG4gICAgICAgIGlmIChfLmluY2x1ZGVzKFsncmFkaW8nLCAnY2hlY2tib3gnLCAnc3VibWl0J10sIGlucHV0VHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGllOiAuZm9ybS1maWVsZC0tY2hlY2tib3gsIC5mb3JtLWZpZWxkLS1yYWRpb1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gYCR7Zm9ybUZpZWxkQ2xhc3N9LS0ke18uY2FtZWxDYXNlKGlucHV0VHlwZSl9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGllOiAuZm9ybS1maWVsZC0taW5wdXQgLmZvcm0tZmllbGQtLWlucHV0VGV4dFxuICAgICAgICAgICAgc3BlY2lmaWNDbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9JHtfLmNhcGl0YWxpemUoaW5wdXRUeXBlKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQXBwbHkgY2xhc3MgbW9kaWZpZXJcbiAgICByZXR1cm4gJGZvcm1GaWVsZFxuICAgICAgICAuYWRkQ2xhc3MoY2xhc3NOYW1lKVxuICAgICAgICAuYWRkQ2xhc3Moc3BlY2lmaWNDbGFzc05hbWUpO1xufVxuXG4vKipcbiAqIEFwcGx5IGNsYXNzIG5hbWUgdG8gZWFjaCBpbnB1dCBlbGVtZW50IGluIGEgZm9ybSBiYXNlZCBvbiBpdHMgdHlwZVxuICogQGV4YW1wbGVcbiAqIC8vIEJlZm9yZVxuICogPGZvcm0gaWQ9XCJmb3JtXCI+XG4gKiAgICAgPGRpdiBjbGFzcz1cImZvcm0tZmllbGRcIj5cbiAqICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCI+XG4gKiAgICAgPC9kaXY+XG4gKiAgICAgPGRpdiBjbGFzcz1cImZvcm0tZmllbGRcIj5cbiAqICAgICAgICAgPHNlbGVjdD4uLi48L3NlbGVjdD5cbiAqICAgICA8L2Rpdj5cbiAqIDwvZm9ybT5cbiAqXG4gKiBjbGFzc2lmeUZvcm0oJyNmb3JtJywgeyBmb3JtRmllbGRDbGFzczogJ2Zvcm0tZmllbGQnIH0pO1xuICpcbiAqIC8vIEFmdGVyXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZCBmb3JtLWZpZWxkLS1pbnB1dCBmb3JtLWZpZWxkLS1pbnB1dFRleHRcIj4uLi48L2Rpdj5cbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkIGZvcm0tZmllbGQtLXNlbGVjdFwiPi4uLjwvZGl2PlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gZm9ybVNlbGVjdG9yIC0gc2VsZWN0b3Igb3IgZWxlbWVudFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge2pRdWVyeX0gRWxlbWVudCBpdHNlbGZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzaWZ5Rm9ybShmb3JtU2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0ICRmb3JtID0gJChmb3JtU2VsZWN0b3IpO1xuICAgIGNvbnN0ICRpbnB1dHMgPSAkZm9ybS5maW5kKGlucHV0VGFnTmFtZXMuam9pbignLCAnKSk7XG5cbiAgICAvLyBPYnRhaW4gb3B0aW9uc1xuICAgIGNvbnN0IHsgZm9ybUZpZWxkQ2xhc3MgPSAnZm9ybS1maWVsZCcgfSA9IG9wdGlvbnM7XG5cbiAgICAvLyBDbGFzc2lmeSBlYWNoIGlucHV0IGluIGEgZm9ybVxuICAgICRpbnB1dHMuZWFjaCgoX18sIGlucHV0KSA9PiB7XG4gICAgICAgIGNsYXNzaWZ5SW5wdXQoaW5wdXQsIGZvcm1GaWVsZENsYXNzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAkZm9ybTtcbn1cblxuLyoqXG4gKiBHZXQgaWQgZnJvbSBnaXZlbiBmaWVsZFxuICogQHBhcmFtIHtvYmplY3R9ICRmaWVsZCBKUXVlcnkgZmllbGQgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEZpZWxkSWQoJGZpZWxkKSB7XG4gICAgY29uc3QgZmllbGRJZCA9ICRmaWVsZC5wcm9wKCduYW1lJykubWF0Y2goLyhcXFsuKlxcXSkvKTtcblxuICAgIGlmIChmaWVsZElkICYmIGZpZWxkSWQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBmaWVsZElkWzBdO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBJbnNlcnQgaGlkZGVuIGZpZWxkIGFmdGVyIFN0YXRlL1Byb3ZpbmNlIGZpZWxkXG4gKiBAcGFyYW0ge29iamVjdH0gJHN0YXRlRmllbGQgSlF1ZXJ5IGZpZWxkIG9iamVjdFxuICovXG5mdW5jdGlvbiBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKCRzdGF0ZUZpZWxkKSB7XG4gICAgY29uc3QgZmllbGRJZCA9IGdldEZpZWxkSWQoJHN0YXRlRmllbGQpO1xuICAgIGNvbnN0IHN0YXRlRmllbGRBdHRycyA9IHtcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgIG5hbWU6IGBGb3JtRmllbGRJc1RleHQke2ZpZWxkSWR9YCxcbiAgICAgICAgdmFsdWU6ICcxJyxcbiAgICB9O1xuXG4gICAgJHN0YXRlRmllbGQuYWZ0ZXIoJCgnPGlucHV0IC8+Jywgc3RhdGVGaWVsZEF0dHJzKSk7XG59XG5cbmNvbnN0IFZhbGlkYXRvcnMgPSB7XG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIG5ldyB2YWxpZGF0aW9uIHdoZW4gdGhlIGZvcm0gaXMgZGlydHlcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICovXG4gICAgc2V0RW1haWxWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCkgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm9ybXMuZW1haWwodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnWW91IG11c3QgZW50ZXIgYSB2YWxpZCBlbWFpbC4nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgcGFzc3dvcmQgZmllbGRzXG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBwYXNzd29yZFNlbGVjdG9yXG4gICAgICogQHBhcmFtIHBhc3N3b3JkMlNlbGVjdG9yXG4gICAgICogQHBhcmFtIHJlcXVpcmVtZW50c1xuICAgICAqIEBwYXJhbSBpc09wdGlvbmFsXG4gICAgICovXG4gICAgc2V0UGFzc3dvcmRWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBwYXNzd29yZFNlbGVjdG9yLCBwYXNzd29yZDJTZWxlY3RvciwgcmVxdWlyZW1lbnRzLCBpc09wdGlvbmFsKSA9PiB7XG4gICAgICAgIGNvbnN0ICRwYXNzd29yZCA9ICQocGFzc3dvcmRTZWxlY3Rvcik7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkVmFsaWRhdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdZb3UgbXVzdCBlbnRlciBhIHBhc3N3b3JkLicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubWF0Y2gobmV3IFJlZ0V4cChyZXF1aXJlbWVudHMuYWxwaGEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsLm1hdGNoKG5ldyBSZWdFeHAocmVxdWlyZW1lbnRzLm51bWVyaWMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsLmxlbmd0aCA+PSByZXF1aXJlbWVudHMubWlubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG9wdGlvbmFsIGFuZCBub3RoaW5nIGVudGVyZWQsIGl0IGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsICYmIHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHJlcXVpcmVtZW50cy5lcnJvcixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkMlNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnWW91IG11c3QgZW50ZXIgYSBwYXNzd29yZC4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogcGFzc3dvcmQyU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbCA9PT0gJHBhc3N3b3JkLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdZb3VyIHBhc3N3b3JkcyBkbyBub3QgbWF0Y2guJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZChwYXNzd29yZFZhbGlkYXRpb25zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgcGFzc3dvcmQgZmllbGRzXG4gICAgICogQHBhcmFtIHtOb2R9IHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3RvcnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmVycm9yU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmZpZWxkc2V0U2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmZvcm1TZWxlY3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMubWF4UHJpY2VTZWxlY3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMubWluUHJpY2VTZWxlY3RvclxuICAgICAqL1xuICAgIHNldE1pbk1heFByaWNlVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgc2VsZWN0b3JzKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGVycm9yU2VsZWN0b3IsXG4gICAgICAgICAgICBmaWVsZHNldFNlbGVjdG9yLFxuICAgICAgICAgICAgZm9ybVNlbGVjdG9yLFxuICAgICAgICAgICAgbWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIG1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgIH0gPSBzZWxlY3RvcnM7XG5cbiAgICAgICAgdmFsaWRhdG9yLmNvbmZpZ3VyZSh7XG4gICAgICAgICAgICBmb3JtOiBmb3JtU2VsZWN0b3IsXG4gICAgICAgICAgICBwcmV2ZW50U3VibWl0OiB0cnVlLFxuICAgICAgICAgICAgc3VjY2Vzc0NsYXNzOiAnXycsIC8vIEtMVURHRTogRG9uJ3QgYXBwbHkgc3VjY2VzcyBjbGFzc1xuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ01pbiBwcmljZSBtdXN0IGJlIGxlc3MgdGhhbiBtYXguIHByaWNlLicsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiBgbWluLW1heDoke21pblByaWNlU2VsZWN0b3J9OiR7bWF4UHJpY2VTZWxlY3Rvcn1gLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ01pbiBwcmljZSBtdXN0IGJlIGxlc3MgdGhhbiBtYXguIHByaWNlLicsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiBgbWluLW1heDoke21pblByaWNlU2VsZWN0b3J9OiR7bWF4UHJpY2VTZWxlY3Rvcn1gLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ01heC4gcHJpY2UgaXMgcmVxdWlyZWQuJyxcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtYXhQcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnTWluLiBwcmljZSBpcyByZXF1aXJlZC4nLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdJbnB1dCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLicsXG4gICAgICAgICAgICBzZWxlY3RvcjogW21pblByaWNlU2VsZWN0b3IsIG1heFByaWNlU2VsZWN0b3JdLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdtaW4tbnVtYmVyOjAnLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3Iuc2V0TWVzc2FnZU9wdGlvbnMoe1xuICAgICAgICAgICAgc2VsZWN0b3I6IFttaW5QcmljZVNlbGVjdG9yLCBtYXhQcmljZVNlbGVjdG9yXSxcbiAgICAgICAgICAgIHBhcmVudDogZmllbGRzZXRTZWxlY3RvcixcbiAgICAgICAgICAgIGVycm9yU3BhbjogZXJyb3JTZWxlY3RvcixcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBuZXcgdmFsaWRhdGlvbiB3aGVuIHRoZSBmb3JtIGlzIGRpcnR5XG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIHNldFN0YXRlQ291bnRyeVZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkKSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ1RoZSBcXCdTdGF0ZS9Qcm92aW5jZVxcJyBmaWVsZCBjYW5ub3QgYmUgYmxhbmsuJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgY2xhc3NlcyBmcm9tIGRpcnR5IGZvcm0gaWYgcHJldmlvdXNseSBjaGVja2VkXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICovXG4gICAgY2xlYW5VcFN0YXRlVmFsaWRhdGlvbjogKGZpZWxkKSA9PiB7XG4gICAgICAgIGNvbnN0ICRmaWVsZENsYXNzRWxlbWVudCA9ICQoKGBbZGF0YS10eXBlPVwiJHtmaWVsZC5kYXRhKCdmaWVsZFR5cGUnKX1cIl1gKSk7XG5cbiAgICAgICAgT2JqZWN0LmtleXMobm9kLmNsYXNzZXMpLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoJGZpZWxkQ2xhc3NFbGVtZW50Lmhhc0NsYXNzKG5vZC5jbGFzc2VzW3ZhbHVlXSkpIHtcbiAgICAgICAgICAgICAgICAkZmllbGRDbGFzc0VsZW1lbnQucmVtb3ZlQ2xhc3Mobm9kLmNsYXNzZXNbdmFsdWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbn07XG5cbmV4cG9ydCB7IFZhbGlkYXRvcnMsIGluc2VydFN0YXRlSGlkZGVuRmllbGQgfTtcbiIsImNvbnN0IGZvcm1zID0ge1xuICAgIGVtYWlsKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJlID0gL14uK0AuK1xcLi4rLztcbiAgICAgICAgcmV0dXJuIHJlLnRlc3QodmFsdWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBwYXNzd29yZCBmaWVsZFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHBhc3N3b3JkKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdEVtcHR5KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdmFsaWRhdGVzIGlmIGEgZmllbGQgaXMgZW1wdHlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKlxuICAgICAqL1xuICAgIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtcztcbiIsIi8qXG4gSW1wb3J0IGFsbCBwcm9kdWN0IHNwZWNpZmljIGpzXG4gKi9cbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgUmV2aWV3IGZyb20gJy4vcHJvZHVjdC9yZXZpZXdzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gJy4vY29tbW9uL3Byb2R1Y3QtZGV0YWlscyc7XG5pbXBvcnQgdmlkZW9HYWxsZXJ5IGZyb20gJy4vcHJvZHVjdC92aWRlby1nYWxsZXJ5JztcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSB9IGZyb20gJy4vY29tbW9uL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IGluaXRCaXNQZHBPcHRpb25zIGZyb20gJy4vYmlzLXBkcC1vcHRpb25zJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIHRoaXMuJHJldmlld0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScpO1xuICAgICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1idWxrLXByaWNpbmdcIl0nKTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIGZvdW5kYXRpb24gbW9kYWwgY2xvc2UgZXZlbnRzIHRvIHNhbml0aXplIFVSTCBhZnRlciByZXZpZXcuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbG9zZS5mbmR0bi5yZXZlYWwnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI3dyaXRlX3JldmlldycpICE9PSAtMSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdmFsaWRhdG9yO1xuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBQcm9kdWN0RGV0YWlscygkKCcucHJvZHVjdFZpZXcnKSwgdGhpcy5jb250ZXh0LCB3aW5kb3cuQkNEYXRhLnByb2R1Y3RfYXR0cmlidXRlcyk7XG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcblxuICAgICAgICB2aWRlb0dhbGxlcnkoKTtcblxuICAgICAgICAvLyBCSVMgTGFiZWxzIFBEUCBlbmhhbmNlbWVudHM6IHNlYXJjaGFibGUgc2VsZWN0cywgY29sb3Igc3dhdGNoZXMsIEJ1eSBOb3dcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaXMtcGRwJykpIHtcbiAgICAgICAgICAgIGluaXRCaXNQZHBPcHRpb25zKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybSgnLndyaXRlUmV2aWV3LWZvcm0nKTtcbiAgICAgICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldygkcmV2aWV3Rm9ybSk7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScsICgpID0+IHtcbiAgICAgICAgICAgIHZhbGlkYXRvciA9IHJldmlldy5yZWdpc3RlclZhbGlkYXRpb24odGhpcy5jb250ZXh0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJldmlld0Zvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0UmV2aWV3SGFuZGxlcigpO1xuICAgICAgICB0aGlzLmJ1bGtQcmljaW5nSGFuZGxlcigpO1xuICAgIH1cblxuICAgIHByb2R1Y3RSZXZpZXdIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI3dyaXRlX3JldmlldycpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy4kcmV2aWV3TGluay50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVsa1ByaWNpbmdIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI2J1bGtfcHJpY2luZycpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgbm9kIGZyb20gJy4uL2NvbW1vbi9ub2QnO1xuaW1wb3J0IHsgQ29sbGFwc2libGVFdmVudHMgfSBmcm9tICcuLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IGZvcm1zIGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvZm9ybXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoJHJldmlld0Zvcm0pIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAkcmV2aWV3Rm9ybS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJHJldmlld3NDb250ZW50ID0gJCgnI3Byb2R1Y3QtcmV2aWV3cycpO1xuICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZSA9ICQoJ1tkYXRhLWNvbGxhcHNpYmxlXScsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICB0aGlzLmluaXRMaW5rQmluZCgpO1xuICAgICAgICB0aGlzLmluamVjdFBhZ2luYXRpb25MaW5rKCk7XG4gICAgICAgIHRoaXMuY29sbGFwc2VSZXZpZXdzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdGlhbCBwYWdlIGxvYWQsIHRoZSB1c2VyIGNsaWNrcyBvbiBcIigxMiBSZXZpZXdzKVwiIGxpbmtcbiAgICAgKiBUaGUgYnJvd3NlciBqdW1wcyB0byB0aGUgcmV2aWV3IHBhZ2UgYW5kIHNob3VsZCBleHBhbmQgdGhlIHJldmlld3Mgc2VjdGlvblxuICAgICAqL1xuICAgIGluaXRMaW5rQmluZCgpIHtcbiAgICAgICAgY29uc3QgJGNvbnRlbnQgPSAkKCcjcHJvZHVjdFJldmlld3MtY29udGVudCcsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICAkKCcucHJvZHVjdFZpZXctcmV2aWV3TGluaycpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICQoJy5wcm9kdWN0Vmlldy1yZXZpZXdUYWJMaW5rJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgIGlmICghJGNvbnRlbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNvbGxhcHNpYmxlLnRyaWdnZXIoQ29sbGFwc2libGVFdmVudHMuY2xpY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZVJldmlld3MoKSB7XG4gICAgICAgIC8vIFdlJ3JlIGluIHBhZ2luYXRpbmcgc3RhdGUsIGRvIG5vdCBjb2xsYXBzZVxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2ggJiYgd2luZG93LmxvY2F0aW9uLmhhc2guaW5kZXhPZignI3Byb2R1Y3QtcmV2aWV3cycpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3JjZSBjb2xsYXBzZSBvbiBwYWdlIGxvYWRcbiAgICAgICAgdGhpcy4kY29sbGFwc2libGUudHJpZ2dlcihDb2xsYXBzaWJsZUV2ZW50cy5jbGljayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5qZWN0IElEIGludG8gdGhlIHBhZ2luYXRpb24gbGlua1xuICAgICAqL1xuICAgIGluamVjdFBhZ2luYXRpb25MaW5rKCkge1xuICAgICAgICBjb25zdCAkbmV4dExpbmsgPSAkKCcucGFnaW5hdGlvbi1pdGVtLS1uZXh0IC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XG4gICAgICAgIGNvbnN0ICRwcmV2TGluayA9ICQoJy5wYWdpbmF0aW9uLWl0ZW0tLXByZXZpb3VzIC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XG5cbiAgICAgICAgaWYgKCRuZXh0TGluay5sZW5ndGgpIHtcbiAgICAgICAgICAgICRuZXh0TGluay5hdHRyKCdocmVmJywgYCR7JG5leHRMaW5rLmF0dHIoJ2hyZWYnKX0gI3Byb2R1Y3QtcmV2aWV3c2ApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRwcmV2TGluay5sZW5ndGgpIHtcbiAgICAgICAgICAgICRwcmV2TGluay5hdHRyKCdocmVmJywgYCR7JHByZXZMaW5rLmF0dHIoJ2hyZWYnKX0gI3Byb2R1Y3QtcmV2aWV3c2ApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJWYWxpZGF0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IuYWRkKFt7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2cmF0aW5nXCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3UmF0aW5nLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2dGl0bGVcIl0nLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdTdWJqZWN0LFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2dGV4dFwiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld0NvbW1lbnQsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnLndyaXRlUmV2aWV3LWZvcm0gW25hbWU9XCJlbWFpbFwiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmb3Jtcy5lbWFpbCh2YWwpO1xuICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3RW1haWwsXG4gICAgICAgIH1dKTtcblxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3I7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVmlkZW9HYWxsZXJ5IHtcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRwbGF5ZXIgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1wbGF5ZXJdJyk7XG4gICAgICAgIHRoaXMuJHZpZGVvcyA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLWl0ZW1dJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge307XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIHNlbGVjdE5ld1ZpZGVvKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7XG4gICAgICAgICAgICBpZDogJHRhcmdldC5kYXRhKCd2aWRlb0lkJyksXG4gICAgICAgICAgICAkc2VsZWN0ZWRUaHVtYjogJHRhcmdldCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNldE1haW5WaWRlbygpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZVRodW1iKCk7XG4gICAgfVxuXG4gICAgc2V0TWFpblZpZGVvKCkge1xuICAgICAgICB0aGlzLiRwbGF5ZXIuYXR0cignc3JjJywgYC8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dGhpcy5jdXJyZW50VmlkZW8uaWR9YCk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlVGh1bWIoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvLiRzZWxlY3RlZFRodW1iLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3Mub24oJ2NsaWNrJywgdGhpcy5zZWxlY3ROZXdWaWRlby5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvR2FsbGVyeSgpIHtcbiAgICBjb25zdCBwbHVnaW5LZXkgPSAndmlkZW8tZ2FsbGVyeSc7XG4gICAgY29uc3QgJHZpZGVvR2FsbGVyeSA9ICQoYFtkYXRhLSR7cGx1Z2luS2V5fV1gKTtcblxuICAgICR2aWRlb0dhbGxlcnkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgJGVsID0gJChlbGVtZW50KTtcbiAgICAgICAgY29uc3QgaXNJbml0aWFsaXplZCA9ICRlbC5kYXRhKHBsdWdpbktleSkgaW5zdGFuY2VvZiBWaWRlb0dhbGxlcnk7XG5cbiAgICAgICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICRlbC5kYXRhKHBsdWdpbktleSwgbmV3IFZpZGVvR2FsbGVyeSgkZWwpKTtcbiAgICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=