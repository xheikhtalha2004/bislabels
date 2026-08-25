/**
 * bis-pdp-options.js
 * Handles: searchable select dropdowns, color swatch dots, Buy Now button,
 *          and hiding unavailable option combinations in the PDP.
 */

// ─── Color name → CSS color map ────────────────────────────────────────────
var COLOR_MAP = {
  'black':              '#111111',
  'white':              '#ffffff',
  'red':                '#e31b23',
  'dark blue':          '#1a3a6b',
  'dark-blue':          '#1a3a6b',
  'blue':               '#2563eb',
  'light blue':         '#60a5fa',
  'light-blue':         '#60a5fa',
  'kelly green':        '#22a34a',
  'kelly-green':        '#22a34a',
  'green':              '#16a34a',
  'fluorescent green':  '#39ff14',
  'fluorescent-green':  '#39ff14',
  'fluorescent orange': '#ff6a00',
  'fluorescent-orange': '#ff6a00',
  'fluorescent pink':   '#ff69b4',
  'fluorescent-pink':   '#ff69b4',
  'fluorescent red':    '#ff1a1a',
  'fluorescent-red':    '#ff1a1a',
  'fluorescent yellow': '#ffff00',
  'fluorescent-yellow': '#ffff00',
  'yellow':             '#facc15',
  'orange':             '#f97316',
  'purple':             '#9333ea',
  'pink':               '#ec4899',
  'brown':              '#78350f',
  'silver':             '#94a3b8',
  'gold':               '#d97706',
  'gray':               '#6b7280',
  'grey':               '#6b7280',
  'tan':                '#c4a882',
  'beige':              '#f5f0e8',
  'navy':               '#172554',
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
  document.querySelectorAll('[data-product-attribute="set-rectangle"]').forEach(function(group) {
    var dots = group.querySelectorAll('.bis-rect-color-dot');
    var anyColor = false;

    dots.forEach(function(dot) {
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
  document.querySelectorAll('[data-searchable-select]').forEach(function(wrap) {
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
      var list     = customSelect.querySelector('.bis-custom-select-list');
      var empty    = customSelect.querySelector('.bis-custom-select-empty');
      var query    = searchIn ? (searchIn.value || '').toLowerCase().trim() : '';
      var visible  = 0;

      if (!list) return;
      var items = list.querySelectorAll('.bis-custom-select-item');
      items.forEach(function(li) {
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
        list.querySelectorAll('.bis-custom-select-item').forEach(function(li) {
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
        trigger.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();

          var wasOpen = customSelect.classList.contains('is-open');

          // Close all dropdowns on the page
          document.querySelectorAll('.bis-custom-select.is-open').forEach(function(el) {
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
        searchIn.addEventListener('input', function() {
          filterList();
        });
        searchIn.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      }

      // Item selection
      if (list) {
        list.addEventListener('click', function(e) {
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
      nativeSelect.addEventListener('change', function() {
        syncFromNative();
      });

      // Watch for options being added/removed/disabled by BigCommerce AJAX
      var observer = new MutationObserver(function() {
        syncFromNative();
        filterList();
      });
      observer.observe(nativeSelect, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled', 'style', 'hidden', 'selected'] });
    }

    // Always do an initial sync & filter
    syncFromNative();
    filterList();
  });
}

// Global outside click listener to close dropdowns
if (typeof document !== 'undefined' && !document._bisOutsideClickListenerAdded) {
  document._bisOutsideClickListenerAdded = true;
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.bis-searchable-select')) {
      document.querySelectorAll('.bis-custom-select.is-open').forEach(function(el) {
        el.classList.remove('is-open');
      });
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      document.querySelectorAll('.bis-custom-select.is-open').forEach(function(el) {
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
    form.querySelectorAll('.bis-rectangle-grid').forEach(function(grid) {
      grid.querySelectorAll('.bis-rectangle-radio').forEach(function(radio) {
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

  form.addEventListener('change', function() {
    setTimeout(refresh, 50);
  });
  if (window.$) {
    $(form).on('product-attributes-updated', function() {
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

  btn.addEventListener('click', function(e) {
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
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    .then(function() {
      window.location.href = '/checkout';
    })
    .catch(function() {
      window.location.href = '/checkout';
    })
    ['finally'](function() {
      btn.disabled = false;
      btn.classList.remove('is-loading');
    });
  });
}

// ─── Global Refresh Helper ──────────────────────────────────────────────────
export function refreshBisPdpOptions() {
  initColorDots();
  initSearchableSelects();
  initUnavailableFilter();
  initBuyNow();
}

// ─── Init ────────────────────────────────────────────────────────────────────
export default function initBisPdpOptions() {
  refreshBisPdpOptions();
}

// Self-init via DOMContentLoaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
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
