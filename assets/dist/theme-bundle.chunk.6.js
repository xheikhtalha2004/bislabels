(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./assets/js/theme/bis-pdp-options.js":
/*!********************************************!*\
  !*** ./assets/js/theme/bis-pdp-options.js ***!
  \********************************************/
/*! exports provided: refreshBisPdpOptions, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshBisPdpOptions", function() { return refreshBisPdpOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return initBisPdpOptions; });
/**
 * bis-pdp-options.js
 * Handles: searchable select dropdowns, color swatch dots, Buy Now button,
 *          and hiding unavailable option combinations in the PDP.
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
  for (var k in COLOR_MAP) {
    if (COLOR_MAP.hasOwnProperty(k) && key.indexOf(k) !== -1) {
      return COLOR_MAP[k];
    }
  }
  return null;
}

// ─── Color dot rendering ────────────────────────────────────────────────────
function initColorDots() {
  document.querySelectorAll('[data-product-attribute="set-rectangle"]').forEach(function (group) {
    var dots = group.querySelectorAll('.bis-rect-color-dot');
    var anyColor = false;
    dots.forEach(function (dot) {
      var label = dot.getAttribute('data-color-label') || '';
      var color = getColorForLabel(label);
      if (color) {
        dot.style.backgroundColor = color;
        dot.style.display = 'inline-block';
        if (['#ffffff', '#ffff00', '#facc15', '#f5f0e8', '#ff69b4'].indexOf(color) !== -1) {
          dot.style.border = '1px solid #cbd5e1';
        }
        anyColor = true;
      } else {
        dot.style.display = 'none';
      }
    });
    if (anyColor) group.classList.add('bis-has-colors');
  });
}

// ─── Searchable custom select ───────────────────────────────────────────────
function initSearchableSelects() {
  document.querySelectorAll('[data-searchable-select]').forEach(function (wrap) {
    var nativeSelect = wrap.querySelector('.bis-select-native');
    var customSelect = wrap.querySelector('.bis-custom-select');
    if (!nativeSelect || !customSelect) return;

    // Helper: is a native option available for purchase?
    function isOptionValid(opt) {
      if (!opt) return false;
      if (opt.disabled) return false;
      if (opt.style.display === 'none') return false;
      if (opt.hidden) return false;
      return true;
    }

    // Helper: filter list by search query & availability
    function filterList() {
      var searchIn = customSelect.querySelector('.bis-custom-select-search');
      var list = customSelect.querySelector('.bis-custom-select-list');
      var empty = customSelect.querySelector('.bis-custom-select-empty');
      var query = searchIn ? (searchIn.value || '').toLowerCase().trim() : '';
      var visible = 0;
      if (!list) return;
      var items = list.querySelectorAll('.bis-custom-select-item');
      items.forEach(function (li) {
        var val = li.getAttribute('data-value');
        var label = (li.getAttribute('data-label') || '').toLowerCase();
        var nativeOpt = nativeSelect.querySelector('option[value="' + val + '"]');
        var valid = isOptionValid(nativeOpt);
        var match = !query || label.indexOf(query) !== -1;
        var shouldShow = match && valid;
        li.style.display = shouldShow ? '' : 'none';
        li.classList.toggle('is-disabled', !valid);
        if (shouldShow) visible++;
      });
      if (empty) {
        empty.style.display = visible === 0 ? '' : 'none';
      }
    }

    // Helper: sync label and selection from native select
    function syncFromNative() {
      var valLabel = customSelect.querySelector('.bis-custom-select-value');
      var selectedIndex = nativeSelect.selectedIndex;
      var opt = selectedIndex >= 0 ? nativeSelect.options[selectedIndex] : null;
      if (valLabel) {
        if (opt && opt.value) {
          valLabel.textContent = opt.text;
        } else {
          valLabel.textContent = nativeSelect.options[0] ? nativeSelect.options[0].text : 'Select...';
        }
      }
      var list = customSelect.querySelector('.bis-custom-select-list');
      if (list) {
        list.querySelectorAll('.bis-custom-select-item').forEach(function (li) {
          var val = li.getAttribute('data-value');
          var nativeOpt = nativeSelect.querySelector('option[value="' + val + '"]');
          var valid = isOptionValid(nativeOpt);
          li.classList.toggle('is-selected', val === nativeSelect.value);
          li.classList.toggle('is-disabled', !valid);
          if (!valid) {
            li.style.display = 'none';
          }
        });
      }
    }

    // Prevent duplicate event binding
    if (wrap.getAttribute('data-initialized') !== 'true') {
      wrap.setAttribute('data-initialized', 'true');
      var trigger = customSelect.querySelector('.bis-custom-select-trigger');
      var searchIn = customSelect.querySelector('.bis-custom-select-search');
      var list = customSelect.querySelector('.bis-custom-select-list');

      // Click trigger to toggle dropdown
      if (trigger) {
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var wasOpen = customSelect.classList.contains('is-open');

          // Close all dropdowns on the page
          document.querySelectorAll('.bis-custom-select.is-open').forEach(function (el) {
            el.classList.remove('is-open');
          });
          if (!wasOpen) {
            customSelect.classList.add('is-open');
            if (searchIn) {
              searchIn.value = '';
              filterList();
              searchIn.focus();
            }
          }
        });
      }

      // Search input typing
      if (searchIn) {
        searchIn.addEventListener('input', function () {
          filterList();
        });
        searchIn.addEventListener('click', function (e) {
          e.stopPropagation();
        });
      }

      // Item selection
      if (list) {
        list.addEventListener('click', function (e) {
          var li = e.target.closest('.bis-custom-select-item');
          if (!li || li.classList.contains('is-disabled') || li.style.display === 'none') return;
          var val = li.getAttribute('data-value');
          var nativeOpt = nativeSelect.querySelector('option[value="' + val + '"]');
          if (!isOptionValid(nativeOpt)) return;
          nativeSelect.value = val;
          // Trigger change event to fire BigCommerce optionChange
          var evt = document.createEvent('HTMLEvents');
          evt.initEvent('change', true, false);
          nativeSelect.dispatchEvent(evt);
          customSelect.classList.remove('is-open');
          syncFromNative();
        });
      }

      // Sync when native select changes
      nativeSelect.addEventListener('change', function () {
        syncFromNative();
      });

      // Watch for options being added/removed/disabled by BigCommerce AJAX
      var observer = new MutationObserver(function () {
        syncFromNative();
        filterList();
      });
      observer.observe(nativeSelect, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['disabled', 'style', 'hidden', 'selected']
      });
    }

    // Always do an initial sync & filter
    syncFromNative();
    filterList();
  });
}

// Global outside click listener to close dropdowns
if (typeof document !== 'undefined' && !document._bisOutsideClickListenerAdded) {
  document._bisOutsideClickListenerAdded = true;
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.bis-searchable-select')) {
      document.querySelectorAll('.bis-custom-select.is-open').forEach(function (el) {
        el.classList.remove('is-open');
      });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      document.querySelectorAll('.bis-custom-select.is-open').forEach(function (el) {
        el.classList.remove('is-open');
      });
    }
  });
}

// ─── Hide unavailable rectangle options after selection ─────────────────────
function initUnavailableFilter() {
  var form = document.querySelector('[data-cart-item-add]');
  if (!form) return;
  function refresh() {
    form.querySelectorAll('.bis-rectangle-grid').forEach(function (grid) {
      grid.querySelectorAll('.bis-rectangle-radio').forEach(function (radio) {
        var label = grid.querySelector('label[for="' + radio.id + '"]');
        if (!label) return;
        if (radio.disabled || radio.style.display === 'none') {
          label.style.display = 'none';
        } else {
          label.style.display = '';
        }
      });
    });
  }
  form.addEventListener('change', function () {
    setTimeout(refresh, 50);
  });
  if (window.$) {
    $(form).on('product-attributes-updated', function () {
      setTimeout(refresh, 50);
    });
  }
  refresh();
}

// ─── Buy Now ────────────────────────────────────────────────────────────────
function initBuyNow() {
  var btn = document.getElementById('bis-buy-now-btn');
  if (!btn || btn.getAttribute('data-buynow-initialized') === 'true') return;
  btn.setAttribute('data-buynow-initialized', 'true');
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    var form = btn.closest('form') || document.querySelector('[data-cart-item-add]');
    if (!form) return;
    btn.disabled = true;
    btn.classList.add('is-loading');
    var data = new FormData(form);
    data.set('action', 'add');
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(function () {
      window.location.href = '/checkout';
    }).catch(function () {
      window.location.href = '/checkout';
    })['finally'](function () {
      btn.disabled = false;
      btn.classList.remove('is-loading');
    });
  });
}

// ─── Global Refresh Helper ──────────────────────────────────────────────────
function refreshBisPdpOptions() {
  initColorDots();
  initSearchableSelects();
  initUnavailableFilter();
  initBuyNow();
}

// ─── Init ────────────────────────────────────────────────────────────────────
function initBisPdpOptions() {
  refreshBisPdpOptions();
}

// Self-init via DOMContentLoaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (document.querySelector('.bis-pdp')) {
        refreshBisPdpOptions();
      }
    });
  } else {
    if (document.querySelector('.bis-pdp')) {
      refreshBisPdpOptions();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYmlzLXBkcC1vcHRpb25zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vZm9ybS11dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL21vZGVscy9mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC9yZXZpZXdzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0L3ZpZGVvLWdhbGxlcnkuanMiXSwibmFtZXMiOlsiQ09MT1JfTUFQIiwiZ2V0Q29sb3JGb3JMYWJlbCIsImxhYmVsIiwia2V5IiwidG9Mb3dlckNhc2UiLCJ0cmltIiwiayIsImhhc093blByb3BlcnR5IiwiaW5kZXhPZiIsImluaXRDb2xvckRvdHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZ3JvdXAiLCJkb3RzIiwiYW55Q29sb3IiLCJkb3QiLCJnZXRBdHRyaWJ1dGUiLCJjb2xvciIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiZGlzcGxheSIsImJvcmRlciIsImNsYXNzTGlzdCIsImFkZCIsImluaXRTZWFyY2hhYmxlU2VsZWN0cyIsIndyYXAiLCJuYXRpdmVTZWxlY3QiLCJxdWVyeVNlbGVjdG9yIiwiY3VzdG9tU2VsZWN0IiwiaXNPcHRpb25WYWxpZCIsIm9wdCIsImRpc2FibGVkIiwiaGlkZGVuIiwiZmlsdGVyTGlzdCIsInNlYXJjaEluIiwibGlzdCIsImVtcHR5IiwicXVlcnkiLCJ2YWx1ZSIsInZpc2libGUiLCJpdGVtcyIsImxpIiwidmFsIiwibmF0aXZlT3B0IiwidmFsaWQiLCJtYXRjaCIsInNob3VsZFNob3ciLCJ0b2dnbGUiLCJzeW5jRnJvbU5hdGl2ZSIsInZhbExhYmVsIiwic2VsZWN0ZWRJbmRleCIsIm9wdGlvbnMiLCJ0ZXh0Q29udGVudCIsInRleHQiLCJzZXRBdHRyaWJ1dGUiLCJ0cmlnZ2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIndhc09wZW4iLCJjb250YWlucyIsImVsIiwicmVtb3ZlIiwiZm9jdXMiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiZXZ0IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50Iiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlRmlsdGVyIiwiX2Jpc091dHNpZGVDbGlja0xpc3RlbmVyQWRkZWQiLCJrZXlDb2RlIiwiaW5pdFVuYXZhaWxhYmxlRmlsdGVyIiwiZm9ybSIsInJlZnJlc2giLCJncmlkIiwicmFkaW8iLCJpZCIsInNldFRpbWVvdXQiLCJ3aW5kb3ciLCIkIiwib24iLCJpbml0QnV5Tm93IiwiYnRuIiwiZ2V0RWxlbWVudEJ5SWQiLCJkYXRhIiwiRm9ybURhdGEiLCJzZXQiLCJmZXRjaCIsImFjdGlvbiIsIm1ldGhvZCIsImJvZHkiLCJoZWFkZXJzIiwidGhlbiIsImxvY2F0aW9uIiwiaHJlZiIsImNhdGNoIiwicmVmcmVzaEJpc1BkcE9wdGlvbnMiLCJpbml0QmlzUGRwT3B0aW9ucyIsInJlYWR5U3RhdGUiLCJpbnB1dFRhZ05hbWVzIiwiY2xhc3NpZnlJbnB1dCIsImlucHV0IiwiZm9ybUZpZWxkQ2xhc3MiLCIkaW5wdXQiLCIkZm9ybUZpZWxkIiwicGFyZW50IiwidGFnTmFtZSIsInByb3AiLCJjbGFzc05hbWUiLCJzcGVjaWZpY0NsYXNzTmFtZSIsImlucHV0VHlwZSIsIl9pbmNsdWRlcyIsIl9jYW1lbENhc2UiLCJfY2FwaXRhbGl6ZSIsImFkZENsYXNzIiwiY2xhc3NpZnlGb3JtIiwiZm9ybVNlbGVjdG9yIiwiJGZvcm0iLCIkaW5wdXRzIiwiZmluZCIsImpvaW4iLCJfb3B0aW9ucyIsIl9vcHRpb25zJGZvcm1GaWVsZENsYSIsImVhY2giLCJfXyIsImdldEZpZWxkSWQiLCIkZmllbGQiLCJmaWVsZElkIiwibGVuZ3RoIiwiaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCIsIiRzdGF0ZUZpZWxkIiwic3RhdGVGaWVsZEF0dHJzIiwidHlwZSIsIm5hbWUiLCJhZnRlciIsIlZhbGlkYXRvcnMiLCJzZXRFbWFpbFZhbGlkYXRpb24iLCJ2YWxpZGF0b3IiLCJmaWVsZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsInJlc3VsdCIsImZvcm1zIiwiZW1haWwiLCJlcnJvck1lc3NhZ2UiLCJzZXRQYXNzd29yZFZhbGlkYXRpb24iLCJwYXNzd29yZFNlbGVjdG9yIiwicGFzc3dvcmQyU2VsZWN0b3IiLCJyZXF1aXJlbWVudHMiLCJpc09wdGlvbmFsIiwiJHBhc3N3b3JkIiwicGFzc3dvcmRWYWxpZGF0aW9ucyIsIlJlZ0V4cCIsImFscGhhIiwibnVtZXJpYyIsIm1pbmxlbmd0aCIsImVycm9yIiwic2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uIiwic2VsZWN0b3JzIiwiZXJyb3JTZWxlY3RvciIsImZpZWxkc2V0U2VsZWN0b3IiLCJtYXhQcmljZVNlbGVjdG9yIiwibWluUHJpY2VTZWxlY3RvciIsImNvbmZpZ3VyZSIsInByZXZlbnRTdWJtaXQiLCJzdWNjZXNzQ2xhc3MiLCJzZXRNZXNzYWdlT3B0aW9ucyIsImVycm9yU3BhbiIsInNldFN0YXRlQ291bnRyeVZhbGlkYXRpb24iLCJjbGVhblVwU3RhdGVWYWxpZGF0aW9uIiwiJGZpZWxkQ2xhc3NFbGVtZW50IiwiT2JqZWN0Iiwia2V5cyIsIm5vZCIsImNsYXNzZXMiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwicmUiLCJ0ZXN0IiwicGFzc3dvcmQiLCJub3RFbXB0eSIsIlByb2R1Y3QiLCJfUGFnZU1hbmFnZXIiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidXJsIiwiJHJldmlld0xpbmsiLCIkYnVsa1ByaWNpbmdMaW5rIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwiX3RoaXMyIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInRpdGxlIiwicGF0aG5hbWUiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJwcm9kdWN0RGV0YWlscyIsIlByb2R1Y3REZXRhaWxzIiwiQkNEYXRhIiwicHJvZHVjdF9hdHRyaWJ1dGVzIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJ2aWRlb0dhbGxlcnkiLCIkcmV2aWV3Rm9ybSIsInJldmlldyIsIlJldmlldyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwiYnVsa1ByaWNpbmdIYW5kbGVyIiwiUGFnZU1hbmFnZXIiLCJfZGVmYXVsdCIsInN1Ym1pdCIsIiRyZXZpZXdzQ29udGVudCIsIiRjb2xsYXBzaWJsZSIsImluaXRMaW5rQmluZCIsImluamVjdFBhZ2luYXRpb25MaW5rIiwiY29sbGFwc2VSZXZpZXdzIiwiJGNvbnRlbnQiLCJDb2xsYXBzaWJsZUV2ZW50cyIsImNsaWNrIiwiaGFzaCIsIiRuZXh0TGluayIsIiRwcmV2TGluayIsImF0dHIiLCJyZXZpZXdSYXRpbmciLCJyZXZpZXdTdWJqZWN0IiwicmV2aWV3Q29tbWVudCIsInJldmlld0VtYWlsIiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiJHNlbGVjdGVkVGh1bWIiLCJzZXRNYWluVmlkZW8iLCJzZXRBY3RpdmVUaHVtYiIsImJpbmQiLCJwbHVnaW5LZXkiLCIkdmlkZW9HYWxsZXJ5IiwiaW5kZXgiLCJlbGVtZW50IiwiJGVsIiwiaXNJbml0aWFsaXplZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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KipcbiAqIGJpcy1wZHAtb3B0aW9ucy5qc1xuICogSGFuZGxlczogc2VhcmNoYWJsZSBzZWxlY3QgZHJvcGRvd25zLCBjb2xvciBzd2F0Y2ggZG90cywgQnV5IE5vdyBidXR0b24sXG4gKiAgICAgICAgICBhbmQgaGlkaW5nIHVuYXZhaWxhYmxlIG9wdGlvbiBjb21iaW5hdGlvbnMgaW4gdGhlIFBEUC5cbiAqL1xuXG4vLyDilIDilIDilIAgQ29sb3IgbmFtZSDihpIgQ1NTIGNvbG9yIG1hcCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbnZhciBDT0xPUl9NQVAgPSB7XG4gICdibGFjayc6ICAgICAgICAgICAgICAnIzExMTExMScsXG4gICd3aGl0ZSc6ICAgICAgICAgICAgICAnI2ZmZmZmZicsXG4gICdyZWQnOiAgICAgICAgICAgICAgICAnI2UzMWIyMycsXG4gICdkYXJrIGJsdWUnOiAgICAgICAgICAnIzFhM2E2YicsXG4gICdkYXJrLWJsdWUnOiAgICAgICAgICAnIzFhM2E2YicsXG4gICdibHVlJzogICAgICAgICAgICAgICAnIzI1NjNlYicsXG4gICdsaWdodCBibHVlJzogICAgICAgICAnIzYwYTVmYScsXG4gICdsaWdodC1ibHVlJzogICAgICAgICAnIzYwYTVmYScsXG4gICdrZWxseSBncmVlbic6ICAgICAgICAnIzIyYTM0YScsXG4gICdrZWxseS1ncmVlbic6ICAgICAgICAnIzIyYTM0YScsXG4gICdncmVlbic6ICAgICAgICAgICAgICAnIzE2YTM0YScsXG4gICdmbHVvcmVzY2VudCBncmVlbic6ICAnIzM5ZmYxNCcsXG4gICdmbHVvcmVzY2VudC1ncmVlbic6ICAnIzM5ZmYxNCcsXG4gICdmbHVvcmVzY2VudCBvcmFuZ2UnOiAnI2ZmNmEwMCcsXG4gICdmbHVvcmVzY2VudC1vcmFuZ2UnOiAnI2ZmNmEwMCcsXG4gICdmbHVvcmVzY2VudCBwaW5rJzogICAnI2ZmNjliNCcsXG4gICdmbHVvcmVzY2VudC1waW5rJzogICAnI2ZmNjliNCcsXG4gICdmbHVvcmVzY2VudCByZWQnOiAgICAnI2ZmMWExYScsXG4gICdmbHVvcmVzY2VudC1yZWQnOiAgICAnI2ZmMWExYScsXG4gICdmbHVvcmVzY2VudCB5ZWxsb3cnOiAnI2ZmZmYwMCcsXG4gICdmbHVvcmVzY2VudC15ZWxsb3cnOiAnI2ZmZmYwMCcsXG4gICd5ZWxsb3cnOiAgICAgICAgICAgICAnI2ZhY2MxNScsXG4gICdvcmFuZ2UnOiAgICAgICAgICAgICAnI2Y5NzMxNicsXG4gICdwdXJwbGUnOiAgICAgICAgICAgICAnIzkzMzNlYScsXG4gICdwaW5rJzogICAgICAgICAgICAgICAnI2VjNDg5OScsXG4gICdicm93bic6ICAgICAgICAgICAgICAnIzc4MzUwZicsXG4gICdzaWx2ZXInOiAgICAgICAgICAgICAnIzk0YTNiOCcsXG4gICdnb2xkJzogICAgICAgICAgICAgICAnI2Q5NzcwNicsXG4gICdncmF5JzogICAgICAgICAgICAgICAnIzZiNzI4MCcsXG4gICdncmV5JzogICAgICAgICAgICAgICAnIzZiNzI4MCcsXG4gICd0YW4nOiAgICAgICAgICAgICAgICAnI2M0YTg4MicsXG4gICdiZWlnZSc6ICAgICAgICAgICAgICAnI2Y1ZjBlOCcsXG4gICduYXZ5JzogICAgICAgICAgICAgICAnIzE3MjU1NCcsXG59O1xuXG5mdW5jdGlvbiBnZXRDb2xvckZvckxhYmVsKGxhYmVsKSB7XG4gIGlmICghbGFiZWwpIHJldHVybiBudWxsO1xuICB2YXIga2V5ID0gbGFiZWwudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGlmIChDT0xPUl9NQVBba2V5XSkgcmV0dXJuIENPTE9SX01BUFtrZXldO1xuICBmb3IgKHZhciBrIGluIENPTE9SX01BUCkge1xuICAgIGlmIChDT0xPUl9NQVAuaGFzT3duUHJvcGVydHkoaykgJiYga2V5LmluZGV4T2YoaykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gQ09MT1JfTUFQW2tdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8g4pSA4pSA4pSAIENvbG9yIGRvdCByZW5kZXJpbmcg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5mdW5jdGlvbiBpbml0Q29sb3JEb3RzKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZT1cInNldC1yZWN0YW5nbGVcIl0nKS5mb3JFYWNoKGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgdmFyIGRvdHMgPSBncm91cC5xdWVyeVNlbGVjdG9yQWxsKCcuYmlzLXJlY3QtY29sb3ItZG90Jyk7XG4gICAgdmFyIGFueUNvbG9yID0gZmFsc2U7XG5cbiAgICBkb3RzLmZvckVhY2goZnVuY3Rpb24oZG90KSB7XG4gICAgICB2YXIgbGFiZWwgPSBkb3QuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbG9yLWxhYmVsJykgfHwgJyc7XG4gICAgICB2YXIgY29sb3IgPSBnZXRDb2xvckZvckxhYmVsKGxhYmVsKTtcbiAgICAgIGlmIChjb2xvcikge1xuICAgICAgICBkb3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gICAgICAgIGRvdC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgICAgIGlmIChbJyNmZmZmZmYnLCAnI2ZmZmYwMCcsICcjZmFjYzE1JywgJyNmNWYwZTgnLCAnI2ZmNjliNCddLmluZGV4T2YoY29sb3IpICE9PSAtMSkge1xuICAgICAgICAgIGRvdC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICNjYmQ1ZTEnO1xuICAgICAgICB9XG4gICAgICAgIGFueUNvbG9yID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGFueUNvbG9yKSBncm91cC5jbGFzc0xpc3QuYWRkKCdiaXMtaGFzLWNvbG9ycycpO1xuICB9KTtcbn1cblxuLy8g4pSA4pSA4pSAIFNlYXJjaGFibGUgY3VzdG9tIHNlbGVjdCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbmZ1bmN0aW9uIGluaXRTZWFyY2hhYmxlU2VsZWN0cygpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2VhcmNoYWJsZS1zZWxlY3RdJykuZm9yRWFjaChmdW5jdGlvbih3cmFwKSB7XG4gICAgdmFyIG5hdGl2ZVNlbGVjdCA9IHdyYXAucXVlcnlTZWxlY3RvcignLmJpcy1zZWxlY3QtbmF0aXZlJyk7XG4gICAgdmFyIGN1c3RvbVNlbGVjdCA9IHdyYXAucXVlcnlTZWxlY3RvcignLmJpcy1jdXN0b20tc2VsZWN0Jyk7XG4gICAgaWYgKCFuYXRpdmVTZWxlY3QgfHwgIWN1c3RvbVNlbGVjdCkgcmV0dXJuO1xuXG4gICAgLy8gSGVscGVyOiBpcyBhIG5hdGl2ZSBvcHRpb24gYXZhaWxhYmxlIGZvciBwdXJjaGFzZT9cbiAgICBmdW5jdGlvbiBpc09wdGlvblZhbGlkKG9wdCkge1xuICAgICAgaWYgKCFvcHQpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChvcHQuZGlzYWJsZWQpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChvcHQuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAob3B0LmhpZGRlbikgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gSGVscGVyOiBmaWx0ZXIgbGlzdCBieSBzZWFyY2ggcXVlcnkgJiBhdmFpbGFiaWxpdHlcbiAgICBmdW5jdGlvbiBmaWx0ZXJMaXN0KCkge1xuICAgICAgdmFyIHNlYXJjaEluID0gY3VzdG9tU2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5iaXMtY3VzdG9tLXNlbGVjdC1zZWFyY2gnKTtcbiAgICAgIHZhciBsaXN0ICAgICA9IGN1c3RvbVNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuYmlzLWN1c3RvbS1zZWxlY3QtbGlzdCcpO1xuICAgICAgdmFyIGVtcHR5ICAgID0gY3VzdG9tU2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5iaXMtY3VzdG9tLXNlbGVjdC1lbXB0eScpO1xuICAgICAgdmFyIHF1ZXJ5ICAgID0gc2VhcmNoSW4gPyAoc2VhcmNoSW4udmFsdWUgfHwgJycpLnRvTG93ZXJDYXNlKCkudHJpbSgpIDogJyc7XG4gICAgICB2YXIgdmlzaWJsZSAgPSAwO1xuXG4gICAgICBpZiAoIWxpc3QpIHJldHVybjtcbiAgICAgIHZhciBpdGVtcyA9IGxpc3QucXVlcnlTZWxlY3RvckFsbCgnLmJpcy1jdXN0b20tc2VsZWN0LWl0ZW0nKTtcbiAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24obGkpIHtcbiAgICAgICAgdmFyIHZhbCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpO1xuICAgICAgICB2YXIgbGFiZWwgPSAobGkuZ2V0QXR0cmlidXRlKCdkYXRhLWxhYmVsJykgfHwgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBuYXRpdmVPcHQgPSBuYXRpdmVTZWxlY3QucXVlcnlTZWxlY3Rvcignb3B0aW9uW3ZhbHVlPVwiJyArIHZhbCArICdcIl0nKTtcbiAgICAgICAgdmFyIHZhbGlkID0gaXNPcHRpb25WYWxpZChuYXRpdmVPcHQpO1xuICAgICAgICB2YXIgbWF0Y2ggPSAhcXVlcnkgfHwgbGFiZWwuaW5kZXhPZihxdWVyeSkgIT09IC0xO1xuICAgICAgICB2YXIgc2hvdWxkU2hvdyA9IG1hdGNoICYmIHZhbGlkO1xuXG4gICAgICAgIGxpLnN0eWxlLmRpc3BsYXkgPSBzaG91bGRTaG93ID8gJycgOiAnbm9uZSc7XG4gICAgICAgIGxpLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWRpc2FibGVkJywgIXZhbGlkKTtcbiAgICAgICAgaWYgKHNob3VsZFNob3cpIHZpc2libGUrKztcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgZW1wdHkuc3R5bGUuZGlzcGxheSA9IHZpc2libGUgPT09IDAgPyAnJyA6ICdub25lJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIZWxwZXI6IHN5bmMgbGFiZWwgYW5kIHNlbGVjdGlvbiBmcm9tIG5hdGl2ZSBzZWxlY3RcbiAgICBmdW5jdGlvbiBzeW5jRnJvbU5hdGl2ZSgpIHtcbiAgICAgIHZhciB2YWxMYWJlbCA9IGN1c3RvbVNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuYmlzLWN1c3RvbS1zZWxlY3QtdmFsdWUnKTtcbiAgICAgIHZhciBzZWxlY3RlZEluZGV4ID0gbmF0aXZlU2VsZWN0LnNlbGVjdGVkSW5kZXg7XG4gICAgICB2YXIgb3B0ID0gc2VsZWN0ZWRJbmRleCA+PSAwID8gbmF0aXZlU2VsZWN0Lm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0gOiBudWxsO1xuXG4gICAgICBpZiAodmFsTGFiZWwpIHtcbiAgICAgICAgaWYgKG9wdCAmJiBvcHQudmFsdWUpIHtcbiAgICAgICAgICB2YWxMYWJlbC50ZXh0Q29udGVudCA9IG9wdC50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbExhYmVsLnRleHRDb250ZW50ID0gbmF0aXZlU2VsZWN0Lm9wdGlvbnNbMF0gPyBuYXRpdmVTZWxlY3Qub3B0aW9uc1swXS50ZXh0IDogJ1NlbGVjdC4uLic7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGxpc3QgPSBjdXN0b21TZWxlY3QucXVlcnlTZWxlY3RvcignLmJpcy1jdXN0b20tc2VsZWN0LWxpc3QnKTtcbiAgICAgIGlmIChsaXN0KSB7XG4gICAgICAgIGxpc3QucXVlcnlTZWxlY3RvckFsbCgnLmJpcy1jdXN0b20tc2VsZWN0LWl0ZW0nKS5mb3JFYWNoKGZ1bmN0aW9uKGxpKSB7XG4gICAgICAgICAgdmFyIHZhbCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpO1xuICAgICAgICAgIHZhciBuYXRpdmVPcHQgPSBuYXRpdmVTZWxlY3QucXVlcnlTZWxlY3Rvcignb3B0aW9uW3ZhbHVlPVwiJyArIHZhbCArICdcIl0nKTtcbiAgICAgICAgICB2YXIgdmFsaWQgPSBpc09wdGlvblZhbGlkKG5hdGl2ZU9wdCk7XG4gICAgICAgICAgbGkuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtc2VsZWN0ZWQnLCB2YWwgPT09IG5hdGl2ZVNlbGVjdC52YWx1ZSk7XG4gICAgICAgICAgbGkuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtZGlzYWJsZWQnLCAhdmFsaWQpO1xuICAgICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgIGxpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQcmV2ZW50IGR1cGxpY2F0ZSBldmVudCBiaW5kaW5nXG4gICAgaWYgKHdyYXAuZ2V0QXR0cmlidXRlKCdkYXRhLWluaXRpYWxpemVkJykgIT09ICd0cnVlJykge1xuICAgICAgd3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5pdGlhbGl6ZWQnLCAndHJ1ZScpO1xuXG4gICAgICB2YXIgdHJpZ2dlciA9IGN1c3RvbVNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuYmlzLWN1c3RvbS1zZWxlY3QtdHJpZ2dlcicpO1xuICAgICAgdmFyIHNlYXJjaEluID0gY3VzdG9tU2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5iaXMtY3VzdG9tLXNlbGVjdC1zZWFyY2gnKTtcbiAgICAgIHZhciBsaXN0ID0gY3VzdG9tU2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5iaXMtY3VzdG9tLXNlbGVjdC1saXN0Jyk7XG5cbiAgICAgIC8vIENsaWNrIHRyaWdnZXIgdG8gdG9nZ2xlIGRyb3Bkb3duXG4gICAgICBpZiAodHJpZ2dlcikge1xuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgdmFyIHdhc09wZW4gPSBjdXN0b21TZWxlY3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1vcGVuJyk7XG5cbiAgICAgICAgICAvLyBDbG9zZSBhbGwgZHJvcGRvd25zIG9uIHRoZSBwYWdlXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJpcy1jdXN0b20tc2VsZWN0LmlzLW9wZW4nKS5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIXdhc09wZW4pIHtcbiAgICAgICAgICAgIGN1c3RvbVNlbGVjdC5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICBpZiAoc2VhcmNoSW4pIHtcbiAgICAgICAgICAgICAgc2VhcmNoSW4udmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgZmlsdGVyTGlzdCgpO1xuICAgICAgICAgICAgICBzZWFyY2hJbi5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlYXJjaCBpbnB1dCB0eXBpbmdcbiAgICAgIGlmIChzZWFyY2hJbikge1xuICAgICAgICBzZWFyY2hJbi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGZpbHRlckxpc3QoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlYXJjaEluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBJdGVtIHNlbGVjdGlvblxuICAgICAgaWYgKGxpc3QpIHtcbiAgICAgICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgbGkgPSBlLnRhcmdldC5jbG9zZXN0KCcuYmlzLWN1c3RvbS1zZWxlY3QtaXRlbScpO1xuICAgICAgICAgIGlmICghbGkgfHwgbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1kaXNhYmxlZCcpIHx8IGxpLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykgcmV0dXJuO1xuXG4gICAgICAgICAgdmFyIHZhbCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpO1xuICAgICAgICAgIHZhciBuYXRpdmVPcHQgPSBuYXRpdmVTZWxlY3QucXVlcnlTZWxlY3Rvcignb3B0aW9uW3ZhbHVlPVwiJyArIHZhbCArICdcIl0nKTtcbiAgICAgICAgICBpZiAoIWlzT3B0aW9uVmFsaWQobmF0aXZlT3B0KSkgcmV0dXJuO1xuXG4gICAgICAgICAgbmF0aXZlU2VsZWN0LnZhbHVlID0gdmFsO1xuICAgICAgICAgIC8vIFRyaWdnZXIgY2hhbmdlIGV2ZW50IHRvIGZpcmUgQmlnQ29tbWVyY2Ugb3B0aW9uQ2hhbmdlXG4gICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICAgICAgZXZ0LmluaXRFdmVudCgnY2hhbmdlJywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgIG5hdGl2ZVNlbGVjdC5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cbiAgICAgICAgICBjdXN0b21TZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgICAgICAgIHN5bmNGcm9tTmF0aXZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBTeW5jIHdoZW4gbmF0aXZlIHNlbGVjdCBjaGFuZ2VzXG4gICAgICBuYXRpdmVTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHN5bmNGcm9tTmF0aXZlKCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gV2F0Y2ggZm9yIG9wdGlvbnMgYmVpbmcgYWRkZWQvcmVtb3ZlZC9kaXNhYmxlZCBieSBCaWdDb21tZXJjZSBBSkFYXG4gICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgc3luY0Zyb21OYXRpdmUoKTtcbiAgICAgICAgZmlsdGVyTGlzdCgpO1xuICAgICAgfSk7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKG5hdGl2ZVNlbGVjdCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogWydkaXNhYmxlZCcsICdzdHlsZScsICdoaWRkZW4nLCAnc2VsZWN0ZWQnXSB9KTtcbiAgICB9XG5cbiAgICAvLyBBbHdheXMgZG8gYW4gaW5pdGlhbCBzeW5jICYgZmlsdGVyXG4gICAgc3luY0Zyb21OYXRpdmUoKTtcbiAgICBmaWx0ZXJMaXN0KCk7XG4gIH0pO1xufVxuXG4vLyBHbG9iYWwgb3V0c2lkZSBjbGljayBsaXN0ZW5lciB0byBjbG9zZSBkcm9wZG93bnNcbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmICFkb2N1bWVudC5fYmlzT3V0c2lkZUNsaWNrTGlzdGVuZXJBZGRlZCkge1xuICBkb2N1bWVudC5fYmlzT3V0c2lkZUNsaWNrTGlzdGVuZXJBZGRlZCA9IHRydWU7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGlmICghZS50YXJnZXQuY2xvc2VzdCgnLmJpcy1zZWFyY2hhYmxlLXNlbGVjdCcpKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmlzLWN1c3RvbS1zZWxlY3QuaXMtb3BlbicpLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgfHwgZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJpcy1jdXN0b20tc2VsZWN0LmlzLW9wZW4nKS5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIOKUgOKUgOKUgCBIaWRlIHVuYXZhaWxhYmxlIHJlY3RhbmdsZSBvcHRpb25zIGFmdGVyIHNlbGVjdGlvbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbmZ1bmN0aW9uIGluaXRVbmF2YWlsYWJsZUZpbHRlcigpIHtcbiAgdmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYXJ0LWl0ZW0tYWRkXScpO1xuICBpZiAoIWZvcm0pIHJldHVybjtcblxuICBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgIGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmJpcy1yZWN0YW5nbGUtZ3JpZCcpLmZvckVhY2goZnVuY3Rpb24oZ3JpZCkge1xuICAgICAgZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKCcuYmlzLXJlY3RhbmdsZS1yYWRpbycpLmZvckVhY2goZnVuY3Rpb24ocmFkaW8pIHtcbiAgICAgICAgdmFyIGxhYmVsID0gZ3JpZC5xdWVyeVNlbGVjdG9yKCdsYWJlbFtmb3I9XCInICsgcmFkaW8uaWQgKyAnXCJdJyk7XG4gICAgICAgIGlmICghbGFiZWwpIHJldHVybjtcbiAgICAgICAgaWYgKHJhZGlvLmRpc2FibGVkIHx8IHJhZGlvLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICAgIGxhYmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGFiZWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgc2V0VGltZW91dChyZWZyZXNoLCA1MCk7XG4gIH0pO1xuICBpZiAod2luZG93LiQpIHtcbiAgICAkKGZvcm0pLm9uKCdwcm9kdWN0LWF0dHJpYnV0ZXMtdXBkYXRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgc2V0VGltZW91dChyZWZyZXNoLCA1MCk7XG4gICAgfSk7XG4gIH1cbiAgcmVmcmVzaCgpO1xufVxuXG4vLyDilIDilIDilIAgQnV5IE5vdyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbmZ1bmN0aW9uIGluaXRCdXlOb3coKSB7XG4gIHZhciBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmlzLWJ1eS1ub3ctYnRuJyk7XG4gIGlmICghYnRuIHx8IGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnV5bm93LWluaXRpYWxpemVkJykgPT09ICd0cnVlJykgcmV0dXJuO1xuICBidG4uc2V0QXR0cmlidXRlKCdkYXRhLWJ1eW5vdy1pbml0aWFsaXplZCcsICd0cnVlJyk7XG5cbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgZm9ybSA9IGJ0bi5jbG9zZXN0KCdmb3JtJykgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2FydC1pdGVtLWFkZF0nKTtcbiAgICBpZiAoIWZvcm0pIHJldHVybjtcblxuICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2lzLWxvYWRpbmcnKTtcblxuICAgIHZhciBkYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgIGRhdGEuc2V0KCdhY3Rpb24nLCAnYWRkJyk7XG5cbiAgICBmZXRjaChmb3JtLmFjdGlvbiwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvY2hlY2tvdXQnO1xuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2NoZWNrb3V0JztcbiAgICB9KVxuICAgIFsnZmluYWxseSddKGZ1bmN0aW9uKCkge1xuICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnaXMtbG9hZGluZycpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLy8g4pSA4pSA4pSAIEdsb2JhbCBSZWZyZXNoIEhlbHBlciDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoQmlzUGRwT3B0aW9ucygpIHtcbiAgaW5pdENvbG9yRG90cygpO1xuICBpbml0U2VhcmNoYWJsZVNlbGVjdHMoKTtcbiAgaW5pdFVuYXZhaWxhYmxlRmlsdGVyKCk7XG4gIGluaXRCdXlOb3coKTtcbn1cblxuLy8g4pSA4pSA4pSAIEluaXQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0QmlzUGRwT3B0aW9ucygpIHtcbiAgcmVmcmVzaEJpc1BkcE9wdGlvbnMoKTtcbn1cblxuLy8gU2VsZi1pbml0IHZpYSBET01Db250ZW50TG9hZGVkXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaXMtcGRwJykpIHtcbiAgICAgICAgcmVmcmVzaEJpc1BkcE9wdGlvbnMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJpcy1wZHAnKSkge1xuICAgICAgcmVmcmVzaEJpc1BkcE9wdGlvbnMoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbm9kIGZyb20gJy4vbm9kJztcbmltcG9ydCBmb3JtcyBmcm9tICcuL21vZGVscy9mb3Jtcyc7XG5cbmNvbnN0IGlucHV0VGFnTmFtZXMgPSBbXG4gICAgJ2lucHV0JyxcbiAgICAnc2VsZWN0JyxcbiAgICAndGV4dGFyZWEnLFxuXTtcblxuLyoqXG4gKiBBcHBseSBjbGFzcyBuYW1lIHRvIGFuIGlucHV0IGVsZW1lbnQgb24gaXRzIHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1GaWVsZENsYXNzXG4gKiBAcmV0dXJuIHtvYmplY3R9IEVsZW1lbnQgaXRzZWxmXG4gKi9cbmZ1bmN0aW9uIGNsYXNzaWZ5SW5wdXQoaW5wdXQsIGZvcm1GaWVsZENsYXNzKSB7XG4gICAgY29uc3QgJGlucHV0ID0gJChpbnB1dCk7XG4gICAgY29uc3QgJGZvcm1GaWVsZCA9ICRpbnB1dC5wYXJlbnQoYC4ke2Zvcm1GaWVsZENsYXNzfWApO1xuICAgIGNvbnN0IHRhZ05hbWUgPSAkaW5wdXQucHJvcCgndGFnTmFtZScpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBsZXQgY2xhc3NOYW1lID0gYCR7Zm9ybUZpZWxkQ2xhc3N9LS0ke3RhZ05hbWV9YDtcbiAgICBsZXQgc3BlY2lmaWNDbGFzc05hbWU7XG5cbiAgICAvLyBJbnB1dCBjYW4gYmUgdGV4dC9jaGVja2JveC9yYWRpbyBldGMuLi5cbiAgICBpZiAodGFnTmFtZSA9PT0gJ2lucHV0Jykge1xuICAgICAgICBjb25zdCBpbnB1dFR5cGUgPSAkaW5wdXQucHJvcCgndHlwZScpO1xuXG4gICAgICAgIGlmIChfLmluY2x1ZGVzKFsncmFkaW8nLCAnY2hlY2tib3gnLCAnc3VibWl0J10sIGlucHV0VHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGllOiAuZm9ybS1maWVsZC0tY2hlY2tib3gsIC5mb3JtLWZpZWxkLS1yYWRpb1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gYCR7Zm9ybUZpZWxkQ2xhc3N9LS0ke18uY2FtZWxDYXNlKGlucHV0VHlwZSl9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGllOiAuZm9ybS1maWVsZC0taW5wdXQgLmZvcm0tZmllbGQtLWlucHV0VGV4dFxuICAgICAgICAgICAgc3BlY2lmaWNDbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9JHtfLmNhcGl0YWxpemUoaW5wdXRUeXBlKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQXBwbHkgY2xhc3MgbW9kaWZpZXJcbiAgICByZXR1cm4gJGZvcm1GaWVsZFxuICAgICAgICAuYWRkQ2xhc3MoY2xhc3NOYW1lKVxuICAgICAgICAuYWRkQ2xhc3Moc3BlY2lmaWNDbGFzc05hbWUpO1xufVxuXG4vKipcbiAqIEFwcGx5IGNsYXNzIG5hbWUgdG8gZWFjaCBpbnB1dCBlbGVtZW50IGluIGEgZm9ybSBiYXNlZCBvbiBpdHMgdHlwZVxuICogQGV4YW1wbGVcbiAqIC8vIEJlZm9yZVxuICogPGZvcm0gaWQ9XCJmb3JtXCI+XG4gKiAgICAgPGRpdiBjbGFzcz1cImZvcm0tZmllbGRcIj5cbiAqICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCI+XG4gKiAgICAgPC9kaXY+XG4gKiAgICAgPGRpdiBjbGFzcz1cImZvcm0tZmllbGRcIj5cbiAqICAgICAgICAgPHNlbGVjdD4uLi48L3NlbGVjdD5cbiAqICAgICA8L2Rpdj5cbiAqIDwvZm9ybT5cbiAqXG4gKiBjbGFzc2lmeUZvcm0oJyNmb3JtJywgeyBmb3JtRmllbGRDbGFzczogJ2Zvcm0tZmllbGQnIH0pO1xuICpcbiAqIC8vIEFmdGVyXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZCBmb3JtLWZpZWxkLS1pbnB1dCBmb3JtLWZpZWxkLS1pbnB1dFRleHRcIj4uLi48L2Rpdj5cbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkIGZvcm0tZmllbGQtLXNlbGVjdFwiPi4uLjwvZGl2PlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gZm9ybVNlbGVjdG9yIC0gc2VsZWN0b3Igb3IgZWxlbWVudFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge2pRdWVyeX0gRWxlbWVudCBpdHNlbGZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzaWZ5Rm9ybShmb3JtU2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0ICRmb3JtID0gJChmb3JtU2VsZWN0b3IpO1xuICAgIGNvbnN0ICRpbnB1dHMgPSAkZm9ybS5maW5kKGlucHV0VGFnTmFtZXMuam9pbignLCAnKSk7XG5cbiAgICAvLyBPYnRhaW4gb3B0aW9uc1xuICAgIGNvbnN0IHsgZm9ybUZpZWxkQ2xhc3MgPSAnZm9ybS1maWVsZCcgfSA9IG9wdGlvbnM7XG5cbiAgICAvLyBDbGFzc2lmeSBlYWNoIGlucHV0IGluIGEgZm9ybVxuICAgICRpbnB1dHMuZWFjaCgoX18sIGlucHV0KSA9PiB7XG4gICAgICAgIGNsYXNzaWZ5SW5wdXQoaW5wdXQsIGZvcm1GaWVsZENsYXNzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAkZm9ybTtcbn1cblxuLyoqXG4gKiBHZXQgaWQgZnJvbSBnaXZlbiBmaWVsZFxuICogQHBhcmFtIHtvYmplY3R9ICRmaWVsZCBKUXVlcnkgZmllbGQgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEZpZWxkSWQoJGZpZWxkKSB7XG4gICAgY29uc3QgZmllbGRJZCA9ICRmaWVsZC5wcm9wKCduYW1lJykubWF0Y2goLyhcXFsuKlxcXSkvKTtcblxuICAgIGlmIChmaWVsZElkICYmIGZpZWxkSWQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBmaWVsZElkWzBdO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBJbnNlcnQgaGlkZGVuIGZpZWxkIGFmdGVyIFN0YXRlL1Byb3ZpbmNlIGZpZWxkXG4gKiBAcGFyYW0ge29iamVjdH0gJHN0YXRlRmllbGQgSlF1ZXJ5IGZpZWxkIG9iamVjdFxuICovXG5mdW5jdGlvbiBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKCRzdGF0ZUZpZWxkKSB7XG4gICAgY29uc3QgZmllbGRJZCA9IGdldEZpZWxkSWQoJHN0YXRlRmllbGQpO1xuICAgIGNvbnN0IHN0YXRlRmllbGRBdHRycyA9IHtcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgIG5hbWU6IGBGb3JtRmllbGRJc1RleHQke2ZpZWxkSWR9YCxcbiAgICAgICAgdmFsdWU6ICcxJyxcbiAgICB9O1xuXG4gICAgJHN0YXRlRmllbGQuYWZ0ZXIoJCgnPGlucHV0IC8+Jywgc3RhdGVGaWVsZEF0dHJzKSk7XG59XG5cbmNvbnN0IFZhbGlkYXRvcnMgPSB7XG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIG5ldyB2YWxpZGF0aW9uIHdoZW4gdGhlIGZvcm0gaXMgZGlydHlcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICovXG4gICAgc2V0RW1haWxWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCkgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm9ybXMuZW1haWwodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnWW91IG11c3QgZW50ZXIgYSB2YWxpZCBlbWFpbC4nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgcGFzc3dvcmQgZmllbGRzXG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBwYXNzd29yZFNlbGVjdG9yXG4gICAgICogQHBhcmFtIHBhc3N3b3JkMlNlbGVjdG9yXG4gICAgICogQHBhcmFtIHJlcXVpcmVtZW50c1xuICAgICAqIEBwYXJhbSBpc09wdGlvbmFsXG4gICAgICovXG4gICAgc2V0UGFzc3dvcmRWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBwYXNzd29yZFNlbGVjdG9yLCBwYXNzd29yZDJTZWxlY3RvciwgcmVxdWlyZW1lbnRzLCBpc09wdGlvbmFsKSA9PiB7XG4gICAgICAgIGNvbnN0ICRwYXNzd29yZCA9ICQocGFzc3dvcmRTZWxlY3Rvcik7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkVmFsaWRhdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdZb3UgbXVzdCBlbnRlciBhIHBhc3N3b3JkLicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubWF0Y2gobmV3IFJlZ0V4cChyZXF1aXJlbWVudHMuYWxwaGEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsLm1hdGNoKG5ldyBSZWdFeHAocmVxdWlyZW1lbnRzLm51bWVyaWMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsLmxlbmd0aCA+PSByZXF1aXJlbWVudHMubWlubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG9wdGlvbmFsIGFuZCBub3RoaW5nIGVudGVyZWQsIGl0IGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsICYmIHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHJlcXVpcmVtZW50cy5lcnJvcixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkMlNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnWW91IG11c3QgZW50ZXIgYSBwYXNzd29yZC4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogcGFzc3dvcmQyU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbCA9PT0gJHBhc3N3b3JkLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdZb3VyIHBhc3N3b3JkcyBkbyBub3QgbWF0Y2guJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZChwYXNzd29yZFZhbGlkYXRpb25zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgcGFzc3dvcmQgZmllbGRzXG4gICAgICogQHBhcmFtIHtOb2R9IHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3RvcnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmVycm9yU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmZpZWxkc2V0U2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmZvcm1TZWxlY3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMubWF4UHJpY2VTZWxlY3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMubWluUHJpY2VTZWxlY3RvclxuICAgICAqL1xuICAgIHNldE1pbk1heFByaWNlVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgc2VsZWN0b3JzKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGVycm9yU2VsZWN0b3IsXG4gICAgICAgICAgICBmaWVsZHNldFNlbGVjdG9yLFxuICAgICAgICAgICAgZm9ybVNlbGVjdG9yLFxuICAgICAgICAgICAgbWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIG1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgIH0gPSBzZWxlY3RvcnM7XG5cbiAgICAgICAgdmFsaWRhdG9yLmNvbmZpZ3VyZSh7XG4gICAgICAgICAgICBmb3JtOiBmb3JtU2VsZWN0b3IsXG4gICAgICAgICAgICBwcmV2ZW50U3VibWl0OiB0cnVlLFxuICAgICAgICAgICAgc3VjY2Vzc0NsYXNzOiAnXycsIC8vIEtMVURHRTogRG9uJ3QgYXBwbHkgc3VjY2VzcyBjbGFzc1xuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ01pbiBwcmljZSBtdXN0IGJlIGxlc3MgdGhhbiBtYXguIHByaWNlLicsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiBgbWluLW1heDoke21pblByaWNlU2VsZWN0b3J9OiR7bWF4UHJpY2VTZWxlY3Rvcn1gLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ01pbiBwcmljZSBtdXN0IGJlIGxlc3MgdGhhbiBtYXguIHByaWNlLicsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiBgbWluLW1heDoke21pblByaWNlU2VsZWN0b3J9OiR7bWF4UHJpY2VTZWxlY3Rvcn1gLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ01heC4gcHJpY2UgaXMgcmVxdWlyZWQuJyxcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtYXhQcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnTWluLiBwcmljZSBpcyByZXF1aXJlZC4nLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdJbnB1dCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLicsXG4gICAgICAgICAgICBzZWxlY3RvcjogW21pblByaWNlU2VsZWN0b3IsIG1heFByaWNlU2VsZWN0b3JdLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdtaW4tbnVtYmVyOjAnLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3Iuc2V0TWVzc2FnZU9wdGlvbnMoe1xuICAgICAgICAgICAgc2VsZWN0b3I6IFttaW5QcmljZVNlbGVjdG9yLCBtYXhQcmljZVNlbGVjdG9yXSxcbiAgICAgICAgICAgIHBhcmVudDogZmllbGRzZXRTZWxlY3RvcixcbiAgICAgICAgICAgIGVycm9yU3BhbjogZXJyb3JTZWxlY3RvcixcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBuZXcgdmFsaWRhdGlvbiB3aGVuIHRoZSBmb3JtIGlzIGRpcnR5XG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIHNldFN0YXRlQ291bnRyeVZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkKSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ1RoZSBcXCdTdGF0ZS9Qcm92aW5jZVxcJyBmaWVsZCBjYW5ub3QgYmUgYmxhbmsuJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgY2xhc3NlcyBmcm9tIGRpcnR5IGZvcm0gaWYgcHJldmlvdXNseSBjaGVja2VkXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICovXG4gICAgY2xlYW5VcFN0YXRlVmFsaWRhdGlvbjogKGZpZWxkKSA9PiB7XG4gICAgICAgIGNvbnN0ICRmaWVsZENsYXNzRWxlbWVudCA9ICQoKGBbZGF0YS10eXBlPVwiJHtmaWVsZC5kYXRhKCdmaWVsZFR5cGUnKX1cIl1gKSk7XG5cbiAgICAgICAgT2JqZWN0LmtleXMobm9kLmNsYXNzZXMpLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoJGZpZWxkQ2xhc3NFbGVtZW50Lmhhc0NsYXNzKG5vZC5jbGFzc2VzW3ZhbHVlXSkpIHtcbiAgICAgICAgICAgICAgICAkZmllbGRDbGFzc0VsZW1lbnQucmVtb3ZlQ2xhc3Mobm9kLmNsYXNzZXNbdmFsdWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbn07XG5cbmV4cG9ydCB7IFZhbGlkYXRvcnMsIGluc2VydFN0YXRlSGlkZGVuRmllbGQgfTtcbiIsImNvbnN0IGZvcm1zID0ge1xuICAgIGVtYWlsKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJlID0gL14uK0AuK1xcLi4rLztcbiAgICAgICAgcmV0dXJuIHJlLnRlc3QodmFsdWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBwYXNzd29yZCBmaWVsZFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHBhc3N3b3JkKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdEVtcHR5KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdmFsaWRhdGVzIGlmIGEgZmllbGQgaXMgZW1wdHlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKlxuICAgICAqL1xuICAgIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtcztcbiIsIi8qXG4gSW1wb3J0IGFsbCBwcm9kdWN0IHNwZWNpZmljIGpzXG4gKi9cbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgUmV2aWV3IGZyb20gJy4vcHJvZHVjdC9yZXZpZXdzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gJy4vY29tbW9uL3Byb2R1Y3QtZGV0YWlscyc7XG5pbXBvcnQgdmlkZW9HYWxsZXJ5IGZyb20gJy4vcHJvZHVjdC92aWRlby1nYWxsZXJ5JztcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSB9IGZyb20gJy4vY29tbW9uL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IGluaXRCaXNQZHBPcHRpb25zIGZyb20gJy4vYmlzLXBkcC1vcHRpb25zJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIHRoaXMuJHJldmlld0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScpO1xuICAgICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1idWxrLXByaWNpbmdcIl0nKTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIGZvdW5kYXRpb24gbW9kYWwgY2xvc2UgZXZlbnRzIHRvIHNhbml0aXplIFVSTCBhZnRlciByZXZpZXcuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbG9zZS5mbmR0bi5yZXZlYWwnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI3dyaXRlX3JldmlldycpICE9PSAtMSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdmFsaWRhdG9yO1xuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBQcm9kdWN0RGV0YWlscygkKCcucHJvZHVjdFZpZXcnKSwgdGhpcy5jb250ZXh0LCB3aW5kb3cuQkNEYXRhLnByb2R1Y3RfYXR0cmlidXRlcyk7XG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcblxuICAgICAgICB2aWRlb0dhbGxlcnkoKTtcblxuICAgICAgICAvLyBCSVMgTGFiZWxzIFBEUCBlbmhhbmNlbWVudHM6IHNlYXJjaGFibGUgc2VsZWN0cywgY29sb3Igc3dhdGNoZXMsIEJ1eSBOb3dcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaXMtcGRwJykpIHtcbiAgICAgICAgICAgIGluaXRCaXNQZHBPcHRpb25zKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybSgnLndyaXRlUmV2aWV3LWZvcm0nKTtcbiAgICAgICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldygkcmV2aWV3Rm9ybSk7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScsICgpID0+IHtcbiAgICAgICAgICAgIHZhbGlkYXRvciA9IHJldmlldy5yZWdpc3RlclZhbGlkYXRpb24odGhpcy5jb250ZXh0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJldmlld0Zvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0UmV2aWV3SGFuZGxlcigpO1xuICAgICAgICB0aGlzLmJ1bGtQcmljaW5nSGFuZGxlcigpO1xuICAgIH1cblxuICAgIHByb2R1Y3RSZXZpZXdIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI3dyaXRlX3JldmlldycpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy4kcmV2aWV3TGluay50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVsa1ByaWNpbmdIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI2J1bGtfcHJpY2luZycpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgbm9kIGZyb20gJy4uL2NvbW1vbi9ub2QnO1xuaW1wb3J0IHsgQ29sbGFwc2libGVFdmVudHMgfSBmcm9tICcuLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IGZvcm1zIGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvZm9ybXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoJHJldmlld0Zvcm0pIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAkcmV2aWV3Rm9ybS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJHJldmlld3NDb250ZW50ID0gJCgnI3Byb2R1Y3QtcmV2aWV3cycpO1xuICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZSA9ICQoJ1tkYXRhLWNvbGxhcHNpYmxlXScsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICB0aGlzLmluaXRMaW5rQmluZCgpO1xuICAgICAgICB0aGlzLmluamVjdFBhZ2luYXRpb25MaW5rKCk7XG4gICAgICAgIHRoaXMuY29sbGFwc2VSZXZpZXdzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdGlhbCBwYWdlIGxvYWQsIHRoZSB1c2VyIGNsaWNrcyBvbiBcIigxMiBSZXZpZXdzKVwiIGxpbmtcbiAgICAgKiBUaGUgYnJvd3NlciBqdW1wcyB0byB0aGUgcmV2aWV3IHBhZ2UgYW5kIHNob3VsZCBleHBhbmQgdGhlIHJldmlld3Mgc2VjdGlvblxuICAgICAqL1xuICAgIGluaXRMaW5rQmluZCgpIHtcbiAgICAgICAgY29uc3QgJGNvbnRlbnQgPSAkKCcjcHJvZHVjdFJldmlld3MtY29udGVudCcsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICAkKCcucHJvZHVjdFZpZXctcmV2aWV3TGluaycpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICQoJy5wcm9kdWN0Vmlldy1yZXZpZXdUYWJMaW5rJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgIGlmICghJGNvbnRlbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNvbGxhcHNpYmxlLnRyaWdnZXIoQ29sbGFwc2libGVFdmVudHMuY2xpY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZVJldmlld3MoKSB7XG4gICAgICAgIC8vIFdlJ3JlIGluIHBhZ2luYXRpbmcgc3RhdGUsIGRvIG5vdCBjb2xsYXBzZVxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2ggJiYgd2luZG93LmxvY2F0aW9uLmhhc2guaW5kZXhPZignI3Byb2R1Y3QtcmV2aWV3cycpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3JjZSBjb2xsYXBzZSBvbiBwYWdlIGxvYWRcbiAgICAgICAgdGhpcy4kY29sbGFwc2libGUudHJpZ2dlcihDb2xsYXBzaWJsZUV2ZW50cy5jbGljayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5qZWN0IElEIGludG8gdGhlIHBhZ2luYXRpb24gbGlua1xuICAgICAqL1xuICAgIGluamVjdFBhZ2luYXRpb25MaW5rKCkge1xuICAgICAgICBjb25zdCAkbmV4dExpbmsgPSAkKCcucGFnaW5hdGlvbi1pdGVtLS1uZXh0IC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XG4gICAgICAgIGNvbnN0ICRwcmV2TGluayA9ICQoJy5wYWdpbmF0aW9uLWl0ZW0tLXByZXZpb3VzIC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XG5cbiAgICAgICAgaWYgKCRuZXh0TGluay5sZW5ndGgpIHtcbiAgICAgICAgICAgICRuZXh0TGluay5hdHRyKCdocmVmJywgYCR7JG5leHRMaW5rLmF0dHIoJ2hyZWYnKX0gI3Byb2R1Y3QtcmV2aWV3c2ApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRwcmV2TGluay5sZW5ndGgpIHtcbiAgICAgICAgICAgICRwcmV2TGluay5hdHRyKCdocmVmJywgYCR7JHByZXZMaW5rLmF0dHIoJ2hyZWYnKX0gI3Byb2R1Y3QtcmV2aWV3c2ApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJWYWxpZGF0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IuYWRkKFt7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2cmF0aW5nXCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3UmF0aW5nLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2dGl0bGVcIl0nLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdTdWJqZWN0LFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2dGV4dFwiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld0NvbW1lbnQsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnLndyaXRlUmV2aWV3LWZvcm0gW25hbWU9XCJlbWFpbFwiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmb3Jtcy5lbWFpbCh2YWwpO1xuICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3RW1haWwsXG4gICAgICAgIH1dKTtcblxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3I7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVmlkZW9HYWxsZXJ5IHtcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRwbGF5ZXIgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1wbGF5ZXJdJyk7XG4gICAgICAgIHRoaXMuJHZpZGVvcyA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLWl0ZW1dJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge307XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIHNlbGVjdE5ld1ZpZGVvKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7XG4gICAgICAgICAgICBpZDogJHRhcmdldC5kYXRhKCd2aWRlb0lkJyksXG4gICAgICAgICAgICAkc2VsZWN0ZWRUaHVtYjogJHRhcmdldCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNldE1haW5WaWRlbygpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZVRodW1iKCk7XG4gICAgfVxuXG4gICAgc2V0TWFpblZpZGVvKCkge1xuICAgICAgICB0aGlzLiRwbGF5ZXIuYXR0cignc3JjJywgYC8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dGhpcy5jdXJyZW50VmlkZW8uaWR9YCk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlVGh1bWIoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvLiRzZWxlY3RlZFRodW1iLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3Mub24oJ2NsaWNrJywgdGhpcy5zZWxlY3ROZXdWaWRlby5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvR2FsbGVyeSgpIHtcbiAgICBjb25zdCBwbHVnaW5LZXkgPSAndmlkZW8tZ2FsbGVyeSc7XG4gICAgY29uc3QgJHZpZGVvR2FsbGVyeSA9ICQoYFtkYXRhLSR7cGx1Z2luS2V5fV1gKTtcblxuICAgICR2aWRlb0dhbGxlcnkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgJGVsID0gJChlbGVtZW50KTtcbiAgICAgICAgY29uc3QgaXNJbml0aWFsaXplZCA9ICRlbC5kYXRhKHBsdWdpbktleSkgaW5zdGFuY2VvZiBWaWRlb0dhbGxlcnk7XG5cbiAgICAgICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICRlbC5kYXRhKHBsdWdpbktleSwgbmV3IFZpZGVvR2FsbGVyeSgkZWwpKTtcbiAgICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=