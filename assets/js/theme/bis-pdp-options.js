/**
 * bis-pdp-options.js
 * Handles: searchable select dropdowns, color swatch dots, Buy Now button,
 *          and hiding unavailable option combinations in the PDP.
 *
 * Loaded by assets/js/theme/product.js via import.
 * ponytail: no framework deps, pure DOM + BC cart API fetch.
 */

// ─── Color name → CSS color map ────────────────────────────────────────────
const COLOR_MAP = {
  'black':            '#111111',
  'white':            '#ffffff',
  'red':              '#e31b23',
  'dark blue':        '#1a3a6b',
  'dark-blue':        '#1a3a6b',
  'blue':             '#2563eb',
  'light blue':       '#60a5fa',
  'light-blue':       '#60a5fa',
  'kelly green':      '#22a34a',
  'kelly-green':      '#22a34a',
  'green':            '#16a34a',
  'fluorescent green':'#39ff14',
  'fluorescent-green':'#39ff14',
  'fluorescent orange':'#ff6a00',
  'fluorescent-orange':'#ff6a00',
  'fluorescent pink': '#ff69b4',
  'fluorescent-pink': '#ff69b4',
  'fluorescent red':  '#ff1a1a',
  'fluorescent-red':  '#ff1a1a',
  'fluorescent yellow':'#ffff00',
  'fluorescent-yellow':'#ffff00',
  'yellow':           '#facc15',
  'orange':           '#f97316',
  'purple':           '#9333ea',
  'pink':             '#ec4899',
  'brown':            '#78350f',
  'silver':           '#94a3b8',
  'gold':             '#d97706',
  'gray':             '#6b7280',
  'grey':             '#6b7280',
  'tan':              '#c4a882',
  'beige':            '#f5f0e8',
  'navy':             '#172554',
};

function getColorForLabel(label) {
  if (!label) return null;
  const key = label.toLowerCase().trim();
  if (COLOR_MAP[key]) return COLOR_MAP[key];
  // Partial match: find first key contained in the label
  for (const [k, v] of Object.entries(COLOR_MAP)) {
    if (key.includes(k)) return v;
  }
  return null;
}

// ─── Color dot rendering ────────────────────────────────────────────────────
function initColorDots() {
  document.querySelectorAll('[data-product-attribute="set-rectangle"]').forEach(group => {
    const dots = group.querySelectorAll('.bis-rect-color-dot');
    let anyColor = false;

    dots.forEach(dot => {
      const label = dot.dataset.colorLabel || '';
      const color = getColorForLabel(label);
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
  document.querySelectorAll('[data-searchable-select]').forEach(wrap => {
    const nativeSelect = wrap.querySelector('.bis-select-native');
    const customSelect = wrap.querySelector('.bis-custom-select');
    if (!nativeSelect || !customSelect) return;

    const trigger  = customSelect.querySelector('.bis-custom-select-trigger');
    const valLabel = customSelect.querySelector('.bis-custom-select-value');
    const dropdown = customSelect.querySelector('.bis-custom-select-dropdown');
    const searchIn = customSelect.querySelector('.bis-custom-select-search');
    const list     = customSelect.querySelector('.bis-custom-select-list');
    const empty    = customSelect.querySelector('.bis-custom-select-empty');
    const items    = () => list.querySelectorAll('.bis-custom-select-item');

    let isOpen = false;

    function syncFromNative() {
      const opt = nativeSelect.options[nativeSelect.selectedIndex];
      valLabel.textContent = opt && opt.value ? opt.text : nativeSelect.options[0].text;
      items().forEach(li => {
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
      const query = q.toLowerCase();
      let visible = 0;
      items().forEach(li => {
        // Skip already-disabled options
        const opt = nativeSelect.querySelector(`option[value="${li.dataset.value}"]`);
        const disabled = opt && opt.disabled;
        const match = !query || li.dataset.label.toLowerCase().includes(query);
        li.style.display = (match && !disabled) ? '' : 'none';
        if (match && !disabled) visible++;
      });
      empty.style.display = visible === 0 ? '' : 'none';
    }

    function selectItem(li) {
      nativeSelect.value = li.dataset.value;
      nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
      syncFromNative();
      close();
    }

    trigger.addEventListener('click', () => isOpen ? close() : open());
    searchIn.addEventListener('input', e => filterList(e.target.value));

    list.addEventListener('click', e => {
      const li = e.target.closest('.bis-custom-select-item');
      if (li && li.style.display !== 'none') selectItem(li);
    });

    // Keyboard: escape closes, enter/space selects focused item
    customSelect.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });

    // Close on outside click
    document.addEventListener('click', e => {
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
  const form = document.querySelector('[data-cart-item-add]');
  if (!form) return;

  function refresh() {
    // Dropdowns: hide disabled options
    form.querySelectorAll('.bis-select-native').forEach(sel => {
      // Re-filter visible items in custom UI
      const wrap = sel.closest('[data-searchable-select]');
      if (!wrap) return;
      const searchVal = wrap.querySelector('.bis-custom-select-search')?.value || '';
      const list = wrap.querySelector('.bis-custom-select-list');
      if (!list) return;
      list.querySelectorAll('.bis-custom-select-item').forEach(li => {
        const opt = sel.querySelector(`option[value="${li.dataset.value}"]`);
        if (opt && opt.disabled) {
          li.style.display = 'none';
        }
      });
    });

    // Rectangle cards: hide unavailable ones
    form.querySelectorAll('.bis-rectangle-card').forEach(card => {
      const radio = document.getElementById(card.getAttribute('for'));
      if (radio && radio.disabled) {
        card.closest('.bis-rectangle-radio + .bis-rectangle-card')?.parentElement?.style;
        card.classList.add('bis-option--unavailable');
      } else {
        card.classList.remove('bis-option--unavailable');
      }
    });
  }

  // Watch for BC JS triggering option changes
  form.addEventListener('change', () => setTimeout(refresh, 50));
  refresh();
}

// ─── Buy Now ────────────────────────────────────────────────────────────────
function initBuyNow() {
  const btn = document.getElementById('bis-buy-now-btn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const form = btn.closest('form') || document.querySelector('[data-cart-item-add]');
    if (!form) return;

    btn.disabled = true;
    btn.classList.add('is-loading');

    try {
      const data = new FormData(form);
      data.set('action', 'add');

      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });

      if (res.ok || res.redirected) {
        window.location.href = '/checkout';
      } else {
        // Fall back: submit form normally
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = 'action';
        hidden.value = 'add';
        form.appendChild(hidden);
        form.submit();
      }
    } catch {
      // Network error fallback
      window.location.href = '/checkout';
    } finally {
      btn.disabled = false;
      btn.classList.remove('is-loading');
    }
  });
}

// ─── Init ────────────────────────────────────────────────────────────────────
export default function initBisPdpOptions() {
  initColorDots();
  initSearchableSelects();
  initUnavailableFilter();
  initBuyNow();
}

// Run color dots + Buy Now immediately via DOMContentLoaded
// so they work even if BC product-details.js throws (e.g. special chars in product name)
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
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
