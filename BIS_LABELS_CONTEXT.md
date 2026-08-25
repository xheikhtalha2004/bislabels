# BIS LABELS — PROJECT CONTEXT & AGENT HANDOFF HUB
`BIS_LABELS_CONTEXT.md`

> **Active Development Hub for AI Agents & Engineers**  
> **Repository:** `xheikhtalha2004/bislabels` (Local Theme: Flexcart 4.9.1 / Cornerstone Base)  
> **Production Storefront:** `https://www.bislabels.com`  
> **Local Preview Environment:** `http://localhost:3000`  
> **Active Git Branch:** `feature/product-page-redesign` (tracked on `origin`)  
> **Last Updated:** August 25, 2026

---

## 1. Store & Business Overview

- **Business:** BIS Labels Inc. — B2B/B2C manufacturer and distributor of direct thermal labels, thermal transfer labels, ribbons, RFID tags, and custom industrial labeling solutions.
- **Core Value Proposition:** High-volume fulfillment, guaranteed printer compatibility, factory-direct pricing, 30+ years manufacturing experience.
- **Store Platform:** BigCommerce Enterprise using Stencil framework.
- **Primary Customer Persona:** Operations managers, warehouse supervisors, fulfillment centers, purchasing agents needing fast repeat ordering, precise technical dimensions, and clear bulk pricing.

---

## 2. Catalog & Data Architecture Model

### Critical Catalog Architecture Discovery
- **Catalog Model:** **Model B (Separate Standalone Products)**.
- **How Dimensions are Handled:** Each size, diameter, core size, and packaging configuration (e.g., `1.5" Diameter 3" Core` vs `2" Diameter 3" Core`) is an **independent BigCommerce product record** with a unique SKU, product ID, and URL.
- **Options / Variants Status:** Products do **not** use native BigCommerce parent-child variant option sets for label sizes. `product.options` is empty on these standalone products.
- **Implication for "Choose Size" Dropdowns:** Any size dropdown/selector must be built as a **frontend sibling-product navigation control** (linking related standalone product URLs) rather than expecting native BigCommerce variant option state changes.

### Custom Fields Data Schema
The catalog relies on structured `product.custom_fields` key-value pairs:
- `Label Width`: e.g. `1.5 Diam. Circle Inch`, `4x6 Inch`
- `Core Size`: e.g. `3 Inch`, `1 Inch`
- `Labels Per Roll`: e.g. `1000`, `3500`
- `Labels Per Case`: e.g. `4000`, `28000`
- `Price Per Roll`: e.g. `$13.24` (raw pricing metadata)
- `Price Per Case`: e.g. `$52.95` (raw pricing metadata)
- `Product Type`: e.g. `Thermal Transfer`, `Direct Thermal`
- `Labels Across`: e.g. `1`, `2`

---

## 3. Stencil Theme Architecture & Technology Stack

- **Base Framework:** Derived from BigCommerce Cornerstone / ThemeVale Flexcart 4.9.1.
- **Template Engine:** Handlebars (`.html` partials inside `templates/`).
- **Styling:** SCSS compiled via Stencil CLI webpack pipeline (`assets/scss/theme.scss`).
- **Scripts:** ES6 modules bundled with Webpack (`assets/js/theme/`).
- **Icons:** Inline SVG and Feather/custom vector icons.

### Compilation & Cascade Hierarchy
1. `assets/scss/settings/*` (theme variables, breakpoints)
2. `assets/scss/components/*` (Cornerstone / Flexcart component defaults)
3. `assets/scss/layouts/*` (layout templates, including `layouts/products/_productView.scss`)

---

## 4. Preserved Commerce Hooks & Invariants

To avoid breaking BigCommerce AJAX cart, pricing updates, analytics, or third-party apps, **NEVER REMOVE** these DOM hooks:

| Hook / Attribute | Purpose | Critical Location |
| :--- | :--- | :--- |
| `[data-cart-item-add]` | AJAX Add to Cart form handler | `templates/components/products/product-view.html` |
| `[data-product-option-change]` | Option & variant change listener | `templates/components/products/product-view.html` |
| `[data-product-attribute]` | BigCommerce option field identifier | `templates/components/products/options/*` |
| `[data-product-sku]` | SKU display & microdata binding | `templates/components/products/product-view.html` |
| `[data-product-weight]` | Dynamic weight calculation target | `templates/components/products/product-view.html` |
| `[data-product-stock]` | Real-time stock display target | `templates/components/products/product-view.html` |
| `[data-quantity-change]` | Quantity increment/decrement buttons | `templates/components/products/add-to-cart.html` |
| `[data-image-gallery]` | Slick gallery and zoom controller | `templates/components/products/product-view.html` |
| `[data-event-type="product"]`| Enhanced ecommerce analytics tag | Root container in `product-view.html` |

---

## 5. PDP Component & Layout Mapping

The active PDP layout on `feature/product-page-redesign` is structured as follows:

```text
product.html
└── product-view.html (.productView.bis-pdp)
    ├── .bis-pdp-main-grid (2-Column Hero Grid)
    │   ├── LEFT: .bis-pdp-gallery (Product Media Card, SALE Badge, Main Image)
    │   └── RIGHT: .bis-pdp-details
    │       ├── .bis-pdp-title (Uppercase Product Title)
    │       ├── .bis-pdp-subtitle ("Reliable. Durable. Built for High-Volume Printing.")
    │       ├── price.html (.bis-price-row: Active Price / CASE + Strike MSRP + SAVE Pill)
    │       ├── .bis-quick-specs (Filtered 4-item physical dimension strip)
    │       ├── Form [data-cart-item-add]
    │       │   ├── options/* (Option wrappers - when variants exist)
    │       │   └── add-to-cart.html (.bis-qty-stepper [- 1 +] & .bis-btn-add-cart)
    │       ├── .bis-talk-expert-wrap (Secondary phone CTA: tel:+15137725252)
    │       └── .bis-wishlist-wrap (Add to Wish List)
    ├── .bis-trust-strip (4 Reassurance Badges: Shipping, Support, Fulfillment, Experience)
    ├── .bis-feature-section (4-Column Grid of 8 Structured Custom Field Spec Cards)
    ├── .productView-description (Product description & technical content)
    └── Related Products Carousel
```

---

## 6. Safe vs. Risky Modification Points

### Safe to Modify
- `assets/scss/layouts/products/_productView.scss`: Safe when strictly scoped under `.productView.bis-pdp`.
- `templates/components/products/product-view.html`: Main PDP structure.
- `templates/components/products/price.html`: PDP price presentation.
- `templates/components/products/add-to-cart.html`: Quantity and add to cart controls.
- `templates/components/products/options/*`: Option input formatting.
- `reports/*`: Analysis scripts, verification tests, and documentation.

### Risky / Do Not Modify Without Explicit Requirement
- `config.json`: Modifying `product_size` triggers theme-wide `lazyLoad` mixin ratio recalibration across the entire site.
- `templates/components/common/header.html` / `footer.html`: Global templates affecting all storefront pages.
- `assets/js/theme/common/product-details.js`: Core Stencil commerce controller.
- BigCommerce Catalog API / Backend: **Strictly read-only** during theme development.

---

## 7. Important Files Inventory

```text
c:\Work\Hexenex Projects\Flexcart+June+2026+LIVE-4.9.1/
├── BIS_LABELS_CONTEXT.md                                # Centralized active context hub (THIS FILE)
├── BIS_LABELS_CATALOG_ARCHITECTURE_ANALYSIS.md          # Architectural Blueprint & Catalog Strategy Analysis
├── .gitignore                                           # Git exclusion rules (includes cache & reports)
├── config.json                                          # BigCommerce theme configuration
├── templates/
│   ├── pages/
│   │   └── product.html                                 # Top-level PDP page wrapper
│   └── components/
│       ├── common/
│       │   └── breadcrumbs.html                         # Navigational breadcrumb trail
│       └── products/
│           ├── product-view.html                        # Main redesigned PDP template
│           ├── price.html                               # Dynamic price & savings component
│           ├── add-to-cart.html                         # Quantity stepper & Add to Cart CTA
│           ├── description.html                         # Product description partial
│           ├── description-tabs.html                    # Secondary tabbed content partial
│           └── options/
│               ├── set-select.html                      # Dropdown option selector
│               ├── set-rectangle.html                   # Rectangle/swatch option selector
│               └── set-radio.html                       # Radio option selector
├── assets/
│   └── scss/
│       ├── theme.scss                                   # Root stylesheet bundle
│       └── layouts/products/
│           └── _productView.scss                        # Scoped PDP styles (.bis-pdp)
└── reports/                                             # Historical and active development reports
```

---

## 8. Document & Report Ecosystem

| File Path | Classification | Purpose / Summary |
| :--- | :--- | :--- |
| `BIS_LABELS_CONTEXT.md` | **ACTIVE CONTEXT** | Master project context and agent handoff hub. |
| `BIS_LABELS_CATALOG_ARCHITECTURE_ANALYSIS.md` | **ACTIVE BLUEPRINT** | Future catalog restructuring & variant strategy analysis blueprint. |
| `reports/pdp-redesign-progress/BIS-Labels-PDP-Progress-Report.md` | **ACTIVE REFERENCE** | Comprehensive End-of-Day report matching commit `3100716`. |
| `reports/pdp-redesign-progress/BIS-Labels-PDP-Progress-Report.pdf` | **ACTIVE DELIVERABLE** | Formatted executive PDF report for management review. |
| `reports/pdp-redesign-progress/evidence/*` | **ACTIVE ASSETS** | Responsive & functional verification screenshots. |
| `reports/BIS-Labels-Website-Experience-Audit.pdf` | **HISTORICAL REFERENCE** | Baseline site-wide UX/UI audit produced during initial audit. |

---

## 9. Current Development Phase

```text
==================================================
CURRENT DEVELOPMENT PHASE: Catalog Architecture & PDP Planning
==================================================

Status Overview:
- Theme Initialization & Stencil Setup:  COMPLETE
- Site-wide Experience Audit:           COMPLETE
- PDP 2-Column Responsive Layout:       COMPLETE
- Price, Savings & Cart UX:             COMPLETE
- Quick Specs & 4-Column Feature Grid:  COMPLETE
- Catalog Architecture & Variant Strategy: ANALYSIS COMPLETE
- Visual Polish & Responsive QA:        IN PROGRESS
- Secondary Info / Description Tabs:    IN PROGRESS
- Sibling Product Size Selector:        PENDING IMPLEMENTATION
- Category & Search Experience:         PLANNED (PHASE 5)
==================================================
```

---

## 10. Next Recommended Actions

- **Priority 1: Business Review of Catalog Architecture Blueprint (`BIS_LABELS_CATALOG_ARCHITECTURE_ANALYSIS.md`)**
  - Stakeholders review material separation, pricing rules, and Option B 2-tier variant strategy.
- **Priority 2: Rebuild Secondary Product Information Container**
  - Reinstate complete technical specifications (`SKU`, `Weight`, `Shipping`), full product description copy, and review triggers (`Write a Review`) in a clean tabbed/accordion section below `.bis-feature-section`.
- **Priority 3: Sibling Product Size Selector Feasibility**
  - Implement a category-based sibling navigation dropdown/pill list for related standalone sizes without restructuring the BigCommerce catalog.
- **Priority 4: Cross-Category Template Validation**
  - Test the template against Thermal Transfer Ribbons, Fanfold Labels, and Direct Thermal rolls to verify custom field fallback behavior.

---

## 11. Agent Session Update Log

### 2026-08-25 (Session 5 — Catalog Architecture & PDP Future Planning Analysis)
- **Agent:** Antigravity (Gemini 3.6 Flash)
- **Completed:** Created master architectural analysis document `BIS_LABELS_CATALOG_ARCHITECTURE_ANALYSIS.md`; evaluated Option A vs B vs C variant models; classified attributes into Options, Specs, Filters, and Parent Dividers; documented BigCommerce limits, migration risks, and a 6-phase catalog roadmap.
- **Changed Files:** `BIS_LABELS_CATALOG_ARCHITECTURE_ANALYSIS.md`, `BIS_LABELS_CONTEXT.md`.
- **Decisions:** Recommended Option B (2-Tier Configuration: Core Size + Roll Packaging); defined strict non-combinatorial variant creation rule; outlined PLP Faceted Filters vs. PDP Variant Selectors.
- **Next Agent Should:** Await business decision review or proceed with Priority 2 (Rebuilding secondary info container).

### 2026-08-25 (Session 4 — Context Hub & Repository Documentation)
- **Agent:** Antigravity (Gemini 3.7 Flash)
- **Completed:** Created centralized `BIS_LABELS_CONTEXT.md` master documentation hub; reviewed existing audit reports; cataloged active vs. historical assets.
- **Changed Files:** `BIS_LABELS_CONTEXT.md`.
- **Decisions:** Established single source of truth for future AI agents; documented Model B catalog architecture (standalone products vs. options).
- **Next Agent Should:** Resume Priority 1 by rebuilding the secondary product information container in `product-view.html`.

### 2026-08-22 (Session 3 — Git Remote Linking & Branch Management)
- **Agent:** Antigravity (Gemini 3.7 Flash)
- **Completed:** Linked local repository to remote `https://github.com/xheikhtalha2004/bislabels.git`; pushed `main` and `feature/product-page-redesign`.
- **Changed Files:** Git remotes and branch tracking configuration.
- **Decisions:** Renamed baseline branch from `master` to `main`.
- **Next Agent Should:** Maintain active commits on `feature/product-page-redesign`.

### 2026-08-21 (Session 2 — PDP Redesign Implementation & Visual Correction)
- **Agent:** Antigravity (Claude 3.7 Sonnet / Gemini 3.7 Flash)
- **Completed:** Implemented 2-column grid, fixed gallery aspect ratio, styled price savings hierarchy, built Quick Specs bar and 4-column feature cards grid, verified cart submission on `/cart.php`, created EOD progress report and PDF.
- **Changed Files:** `_productView.scss`, `product-view.html`, `price.html`, `add-to-cart.html`, `options/*`, `.gitignore`, `reports/pdp-redesign-progress/*`.
- **Decisions:** Preserved all BigCommerce commerce hooks (`data-cart-item-add`, `data-product-sku`); filtered redundant price metadata from top Quick Specs bar.
- **Next Agent Should:** Inspect secondary information tabs and sibling size selector.

---

## 12. Context Maintenance Rules for Future Agents

All future agents working in this repository **MUST** follow these rules:

1. **Before Starting Work:**
   - Read `BIS_LABELS_CONTEXT.md` thoroughly.
   - Check **Section 9 (Current Development Phase)** and **Section 10 (Next Recommended Actions)**.
   - Inspect only the files relevant to the active task.
   - Do not restart Stencil server unless explicitly instructed.
   - Do not execute BigCommerce catalog write operations.

2. **During Work:**
   - Always scope CSS changes under `.productView.bis-pdp` or appropriate module namespaces.
   - Always preserve BigCommerce data hooks listed in **Section 4**.
   - Keep diffs minimal, clean, and purposeful.

3. **After Completing Work:**
   - Update `BIS_LABELS_CONTEXT.md`:
     - Update **Section 9 (Current Development Phase)**.
     - Update **Section 10 (Next Recommended Actions)**.
     - Add a new dated entry to **Section 11 (Agent Session Update Log)** summarizing completed work, changed files, decisions, and next steps.
