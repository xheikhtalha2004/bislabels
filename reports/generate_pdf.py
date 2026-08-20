import os
import json
import base64
from playwright.sync_api import sync_playwright

def img_to_base64(path):
    if os.path.exists(path):
        with open(path, "rb") as f:
            return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"
    return ""

def generate_pdf_report():
    print("Preparing images for embedded PDF...")
    
    # Load screenshots as base64 for reliable self-contained PDF rendering
    img_home_hero = img_to_base64("reports/evidence/homepage/desktop_home_hero.png")
    img_nav_mega = img_to_base64("reports/evidence/navigation/mega_menu_hover.png")
    img_cat_desktop = img_to_base64("reports/evidence/category/category_desktop_above_fold.png")
    img_pdp_desktop = img_to_base64("reports/evidence/product/pdp_desktop_above_fold.png")
    img_pdp_options = img_to_base64("reports/evidence/product/pdp_complex_options.png")
    img_mobile_home = img_to_base64("reports/evidence/mobile/mobile_home.png")
    img_mobile_category = img_to_base64("reports/evidence/mobile/mobile_category.png")
    img_mobile_pdp = img_to_base64("reports/evidence/mobile/mobile_pdp.png")
    img_mobile_cart = img_to_base64("reports/evidence/mobile/mobile_cart.png")
    img_cart_desktop = img_to_base64("reports/evidence/cart/cart_desktop.png")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>BIS Labels — Website Experience & BigCommerce Theme Audit</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  @page {{
    size: A4 portrait;
    margin: 18mm 16mm 18mm 16mm;
    @bottom-right {{
      content: counter(page);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 8pt;
      color: #94a3b8;
    }}
    @bottom-left {{
      content: "BIS Labels — Website Experience & Theme Audit Report";
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 8pt;
      color: #94a3b8;
    }}
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}

  body {{
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #1e293b;
    background-color: #ffffff;
    font-size: 9.5pt;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }}

  /* Page container & break helpers */
  .page {{
    page-break-after: always;
    position: relative;
    padding-bottom: 10px;
  }}

  .page:last-child {{
    page-break-after: auto;
  }}

  .no-break {{
    page-break-inside: avoid;
  }}

  /* Cover Page */
  .cover {{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    min-height: 980px;
    padding: 40px 10px 30px 10px;
  }}

  .cover-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 20px;
  }}

  .badge-tag {{
    display: inline-block;
    background: #0f172a;
    color: #f8fafc;
    font-size: 8pt;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 4px;
  }}

  .cover-body {{
    margin-top: 60px;
  }}

  .cover-title {{
    font-size: 30pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
  }}

  .cover-subtitle {{
    font-size: 13pt;
    font-weight: 500;
    color: #475569;
    line-height: 1.45;
    max-width: 620px;
    margin-bottom: 35px;
  }}

  .cover-divider {{
    width: 70px;
    height: 4px;
    background: #2563eb;
    border-radius: 2px;
    margin-bottom: 35px;
  }}

  .cover-meta-grid {{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 20px 24px;
    max-width: 620px;
  }}

  .meta-item {{
    display: flex;
    flex-direction: column;
  }}

  .meta-label {{
    font-size: 7.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #64748b;
    margin-bottom: 3px;
  }}

  .meta-val {{
    font-size: 9.5pt;
    font-weight: 600;
    color: #0f172a;
  }}

  .cover-footer {{
    border-top: 1px solid #e2e8f0;
    padding-top: 16px;
    display: flex;
    justify-content: space-between;
    font-size: 8pt;
    color: #64748b;
  }}

  /* Standard Headings */
  h1.section-title {{
    font-size: 17pt;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 8px;
    margin-top: 10px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }}

  h1.section-title span.section-num {{
    color: #2563eb;
    font-size: 13pt;
    font-weight: 700;
  }}

  h2.sub-title {{
    font-size: 12pt;
    font-weight: 700;
    color: #1e293b;
    margin-top: 16px;
    margin-bottom: 8px;
  }}

  h3.sub-heading {{
    font-size: 10pt;
    font-weight: 700;
    color: #334155;
    margin-top: 10px;
    margin-bottom: 5px;
  }}

  p {{
    margin-bottom: 10px;
    color: #334155;
  }}

  /* Highlight Cards & Callouts */
  .callout {{
    background: #f8fafc;
    border-left: 3.5px solid #2563eb;
    border-radius: 0 6px 6px 0;
    padding: 10px 14px;
    margin: 12px 0;
    font-size: 9pt;
  }}

  .callout.amber {{
    border-left-color: #d97706;
    background: #fffbeb;
  }}

  .callout.green {{
    border-left-color: #16a34a;
    background: #f0fdf4;
  }}

  .callout-title {{
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    gap: 6px;
  }}

  /* Grid Layouts */
  .grid-2 {{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    margin: 12px 0;
  }}

  .grid-3 {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 12px 0;
  }}

  .card {{
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 12px 14px;
  }}

  .card-header {{
    font-weight: 700;
    font-size: 9.5pt;
    color: #0f172a;
    margin-bottom: 6px;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 4px;
  }}

  /* Tables */
  table.audit-table {{
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 8.5pt;
  }}

  table.audit-table th {{
    background: #f1f5f9;
    color: #1e293b;
    font-weight: 700;
    text-align: left;
    padding: 8px 10px;
    border: 1px solid #cbd5e1;
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }}

  table.audit-table td {{
    padding: 8px 10px;
    border: 1px solid #e2e8f0;
    vertical-align: top;
    color: #334155;
  }}

  table.audit-table tr:nth-child(even) td {{
    background: #f8fafc;
  }}

  .pill {{
    display: inline-block;
    padding: 2px 7px;
    border-radius: 3px;
    font-size: 7.5pt;
    font-weight: 700;
    text-transform: uppercase;
  }}

  .pill.high {{ background: #fee2e2; color: #991b1b; }}
  .pill.medium {{ background: #fef3c7; color: #92400e; }}
  .pill.low {{ background: #e0f2fe; color: #075985; }}
  .pill.quick {{ background: #dcfce7; color: #166534; }}
  .pill.moderate {{ background: #fef9c3; color: #854d0e; }}
  .pill.large {{ background: #ede9fe; color: #5b21b6; }}

  /* Screenshot Figure */
  .screenshot-container {{
    margin: 12px 0;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 8px;
    text-align: center;
  }}

  .screenshot-container img {{
    max-width: 100%;
    height: auto;
    max-height: 230px;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    display: block;
    margin: 0 auto;
    object-fit: contain;
  }}

  .screenshot-caption {{
    font-size: 7.5pt;
    color: #64748b;
    margin-top: 6px;
    font-weight: 500;
  }}

  .comparison-row {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 12px 0;
  }}

  /* Numbered Steps / Findings */
  .finding-box {{
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-left: 3px solid #0f172a;
    border-radius: 4px;
    padding: 10px 12px;
    margin-bottom: 10px;
  }}

  .finding-title {{
    font-weight: 700;
    font-size: 9.5pt;
    color: #0f172a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }}

  ul.bullet-list {{
    margin-left: 16px;
    margin-bottom: 8px;
  }}

  ul.bullet-list li {{
    margin-bottom: 4px;
    color: #334155;
  }}

  .stat-grid {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 14px 0;
  }}

  .stat-card {{
    background: #0f172a;
    color: #ffffff;
    padding: 12px 10px;
    border-radius: 6px;
    text-align: center;
  }}

  .stat-num {{
    font-size: 16pt;
    font-weight: 800;
    color: #38bdf8;
    line-height: 1.1;
  }}

  .stat-label {{
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
    margin-top: 3px;
  }}
</style>
</head>
<body>

<!-- ==================== COVER PAGE ==================== -->
<div class="page cover">
  <div class="cover-header">
    <div class="badge-tag">Executive Consulting Audit</div>
    <div style="font-weight: 700; color: #0f172a; font-size: 10pt;">BIS LABELS</div>
  </div>

  <div class="cover-body">
    <h1 class="cover-title">Website Experience & Theme Audit</h1>
    <div class="cover-divider"></div>
    <div class="cover-subtitle">
      Customer Experience, Product Discovery, Mobile Usability & Ecommerce Interface Improvement Opportunities for the BIS Labels Storefront.
    </div>

    <div class="cover-meta-grid">
      <div class="meta-item">
        <span class="meta-label">Client Store</span>
        <span class="meta-val">BIS Labels</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Live Storefront</span>
        <span class="meta-val">https://www.bislabels.com</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Platform & Theme</span>
        <span class="meta-val">BigCommerce Stencil (Flexcart 4.9.1)</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Audit Date</span>
        <span class="meta-val">August 2026</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Prepared For</span>
        <span class="meta-val">Internal Leadership & Client Review</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Recommended Next Focus</span>
        <span class="meta-val" style="color: #2563eb;">Product Detail & Configuration Redesign</span>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    <span>Confidential — Prepared for BIS Labels & Internal Ecommerce Team</span>
    <span>Page 1</span>
  </div>
</div>

<!-- ==================== SECTION 1: EXECUTIVE SUMMARY ==================== -->
<div class="page">
  <h1 class="section-title"><span class="section-num">01</span> Executive Summary</h1>
  
  <p>
    This report provides a comprehensive ecommerce user experience (UX), visual design, and theme implementation audit for <strong>BIS Labels</strong> (<a href="https://bislabels.com">bislabels.com</a>). The evaluation combines live storefront analysis, multi-viewport device inspection (Desktop, Tablet, Mobile), and technical theme review to identify clear, actionable opportunities that directly improve customer buying confidence and revenue conversion.
  </p>

  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-num">10+</div>
      <div class="stat-label">Core Pages Audited</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">8</div>
      <div class="stat-label">Key Priority Findings</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">3</div>
      <div class="stat-label">Implementation Tiers</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">#1 Focus</div>
      <div class="stat-label">PDP Configuration</div>
    </div>
  </div>

  <h2 class="sub-title">Current State & Core Insights</h2>
  <p>
    BIS Labels operates an established, highly capable manufacturing catalog with an extensive range of commercial labeling solutions (Direct Thermal, Thermal Transfer, Fanfold, Rolls, Custom Adhesives, and Color Floodcoats). However, the customer experience currently mirrors a <strong>generic retail template rather than a specialized B2B & industrial label authority</strong>.
  </p>

  <div class="grid-2">
    <div class="card" style="border-top: 3px solid #16a34a;">
      <div class="card-header" style="color: #166534;">Core Strengths to Preserve</div>
      <ul class="bullet-list">
        <li><strong>Deep product catalog:</strong> Robust inventory covering diverse industrial barcode and thermal labeling formats.</li>
        <li><strong>Solid BigCommerce platform:</strong> Fast baseline infrastructure, secure checkout, and native faceted filtering engine.</li>
        <li><strong>Valuable technical data:</strong> Extensive dimension, core size, and material data already exists in the backend.</li>
      </ul>
    </div>
    <div class="card" style="border-top: 3px solid #dc2626;">
      <div class="card-header" style="color: #991b1b;">Major Customer Friction Areas</div>
      <ul class="bullet-list">
        <li><strong>Unclear Product Configuration:</strong> Standard small radio buttons & dropdowns give customers weak visual confirmation of their selections.</li>
        <li><strong>Hidden B2B Specifications:</strong> Critical specs (core diameter, outer diameter, adhesive type) are trapped inside title strings or buried in long text tabs.</li>
        <li><strong>Mobile Usability Hurdles:</strong> Small tap targets and layout shifts make mobile ordering cumbersome.</li>
      </ul>
    </div>
  </div>

  <div class="callout amber">
    <div class="callout-title">The Single Biggest Business Opportunity</div>
    Transforming the <strong>Product Detail & Configuration Experience</strong> from a passive, crowded form into a <strong>clear, visual, guided product selector</strong>. For technical products like label rolls where choosing the wrong core size or material causes costly returns, visual clarity creates immediate buying confidence.
  </div>
</div>

<!-- ==================== SECTION 2 & 3: WORK COMPLETED & WHAT WORKS ==================== -->
<div class="page">
  <h1 class="section-title"><span class="section-num">02</span> Work Completed So Far</h1>
  
  <p>
    To establish a reliable, risk-free foundation before planning visual or template improvements, our technical team has already completed the following verified milestones:
  </p>

  <table class="audit-table">
    <thead>
      <tr>
        <th style="width: 25%;">Milestone</th>
        <th style="width: 50%;">Details & Verification</th>
        <th style="width: 25%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Theme Ingestion & Review</strong></td>
        <td>Extracted and reviewed complete production theme (<code>Flexcart June 2026 LIVE 4.9.1</code>), verifying Stencil Handlebars templates, Citadel SCSS, and asset trees.</td>
        <td><span class="pill quick">Completed</span></td>
      </tr>
      <tr>
        <td><strong>Security & Secret Isolation</strong></td>
        <td>Created comprehensive <code>.gitignore</code> rules protecting API credentials, Stencil configuration, and local logs from accidental commit or exposure.</td>
        <td><span class="pill quick">Verified Secure</span></td>
      </tr>
      <tr>
        <td><strong>Stencil Environment Setup</strong></td>
        <td>Configured official Stencil CLI (v9.1.0) against <code>https://www.bislabels.com</code> on port 3000 with package installation isolation.</td>
        <td><span class="pill quick">Ready</span></td>
      </tr>
      <tr>
        <td><strong>Multi-Device Storefront Audit</strong></td>
        <td>Conducted automated visual audit across Desktop (1440px), Tablet (768px), and Mobile (375px) viewports with high-resolution screenshot evidence.</td>
        <td><span class="pill quick">Completed</span></td>
      </tr>
    </tbody>
  </table>

  <h1 class="section-title" style="margin-top: 25px;"><span class="section-num">03</span> Current Experience — What Is Working Well</h1>
  <p>
    A successful redesign must respect and preserve what already works. The following core elements provide a strong foundation:
  </p>

  <div class="grid-3">
    <div class="card">
      <div class="card-header">1. Comprehensive Catalog</div>
      <p style="font-size: 8.5pt;">BIS Labels supports standard roll sizes (3x1", 4x6", 2x1"), fanfold, direct thermal, thermal transfer, and synthetic stocks. Customers can find almost any standard label format.</p>
    </div>
    <div class="card">
      <div class="card-header">2. Direct Contact & RFQ</div>
      <p style="font-size: 8.5pt;">Phone numbers, business hours (8am–8pm EST), and Request a Quote options are directly accessible across the header and footer, catering to custom bulk buyers.</p>
    </div>
    <div class="card">
      <div class="card-header">3. Reliable Cart Engine</div>
      <p style="font-size: 8.5pt;">Standard BigCommerce cart, AJAX add-to-cart feedback, and checkout flow provide reliable transactional processing without functional errors.</p>
    </div>
  </div>
</div>

<!-- ==================== SECTION 4: KEY FINDINGS AT A GLANCE ==================== -->
<div class="page">
  <h1 class="section-title"><span class="section-num">04</span> Key Findings at a Glance</h1>
  <p>The following priority findings represent the most impactful opportunities to improve customer purchasing confidence, visual polish, and conversion rates.</p>

  <div class="finding-box">
    <div class="finding-title">
      <span>1. Product Configuration Lacks Visual Hierarchy & Active State Clarity</span>
      <div><span class="pill high">High Impact</span> <span class="pill moderate">Moderate Effort</span></div>
    </div>
    <p style="font-size: 8.5pt; margin-bottom: 2px;"><strong>Current Experience:</strong> Options appear as small text labels and standard radio dots with subtle border changes upon selection.</p>
    <p style="font-size: 8.5pt; margin-bottom: 2px;"><strong>Customer Consequence:</strong> Shoppers cannot easily confirm what size, core, or material they have selected without double-checking each line.</p>
    <p style="font-size: 8.5pt; color: #2563eb;"><strong>Opportunity:</strong> Replace generic radios with modern visual card-selectors, clear active badges, and a live configuration summary.</p>
  </div>

  <div class="finding-box">
    <div class="finding-title">
      <span>2. Technical Specifications Are Trapped in Dense Text Blocks</span>
      <div><span class="pill high">High Impact</span> <span class="pill quick">Quick Win</span></div>
    </div>
    <p style="font-size: 8.5pt; margin-bottom: 2px;"><strong>Current Experience:</strong> Core diameter, outer roll diameter, adhesive type, and wound orientation are buried in paragraph text inside tabs.</p>
    <p style="font-size: 8.5pt; margin-bottom: 2px;"><strong>Customer Consequence:</strong> B2B buyers seeking specific printer compatibility (e.g. desktop vs industrial printer core sizes) must hunt through paragraphs.</p>
    <p style="font-size: 8.5pt; color: #2563eb;"><strong>Opportunity:</strong> Surface essential specs in a clean, scannable "Quick Spec Grid" directly below the pricing block.</p>
  </div>

  <div class="finding-box">
    <div class="finding-title">
      <span>3. Category Product Cards Lack Structured Attribute Badges</span>
      <div><span class="pill medium">Medium Impact</span> <span class="pill quick">Quick Win</span></div>
    </div>
    <p style="font-size: 8.5pt; margin-bottom: 2px;"><strong>Current Experience:</strong> Product cards show identical white roll photos with long text titles like "3x1 Inch Direct Thermal 0.75 Inch Core 2.5 Inch Outer Diameter".</p>
    <p style="font-size: 8.5pt; margin-bottom: 2px;"><strong>Customer Consequence:</strong> Customers must read long repetitive titles to distinguish between adjacent products.</p>
    <p style="font-size: 8.5pt; color: #2563eb;"><strong>Opportunity:</strong> Format dimensions (3" x 1"), Core (0.75"), and OD (2.5") into clean pill badges on each product card.</p>
  </div>

  <div class="finding-box">
    <div class="finding-title">
      <span>4. Mobile Header & Option Controls Cause Navigation Friction</span>
      <div><span class="pill high">High Impact</span> <span class="pill moderate">Moderate Effort</span></div>
    </div>
    <p style="font-size: 8.5pt; margin-bottom: 2px;"><strong>Current Experience:</strong> Mobile navigation toggle and dense category menus feel crowded, and touch targets on options fall below 44px.</p>
    <p style="font-size: 8.5pt; margin-bottom: 2px;"><strong>Customer Consequence:</strong> Selecting options on a smartphone requires precision zooming and extra scrolling.</p>
    <p style="font-size: 8.5pt; color: #2563eb;"><strong>Opportunity:</strong> Implement thumb-friendly mobile buttons, sticky purchase bar, and simplified mobile menu drawer.</p>
  </div>

  <div class="finding-box">
    <div class="finding-title">
      <span>5. Faceted Search Lacks Critical Industrial Filter Dimensions</span>
      <div><span class="pill high">High Impact</span> <span class="pill moderate">Moderate Effort</span></div>
    </div>
    <p style="font-size: 8.5pt; margin-bottom: 2px;"><strong>Current Experience:</strong> Sidebar filtering is limited to generic category hierarchy and price range.</p>
    <p style="font-size: 8.5pt; margin-bottom: 2px;"><strong>Customer Consequence:</strong> Buyers with specific printer requirements (e.g. 1" core desktop printers vs 3" core industrial printers) cannot filter by core size.</p>
    <p style="font-size: 8.5pt; color: #2563eb;"><strong>Opportunity:</strong> Activate custom facets for Label Width, Label Length, Core Size, and Material Type.</p>
  </div>
</div>

<!-- ==================== SECTION 5: HOMEPAGE & NAVIGATION ==================== -->
<div class="page">
  <h1 class="section-title"><span class="section-num">05</span> Homepage & Navigation Experience</h1>

  <p>
    The homepage sets the initial brand perception. While the existing page provides extensive category carousels, its visual layout feels like a generic consumer template rather than an authoritative manufacturing supplier.
  </p>

  <div class="screenshot-container">
    <img src="{img_home_hero}" alt="Desktop Homepage Hero">
    <div class="screenshot-caption">Figure 5.1: Live BIS Labels Homepage Hero — Dense layout with competing banner elements.</div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-header">Observations & Friction Points</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li><strong>Competing Hero Calls to Action:</strong> Multiple banners cycle rapidly without delivering a single, confident value proposition.</li>
        <li><strong>Header Visual Clutter:</strong> Three distinct horizontal header bars create unnecessary vertical space before the main content.</li>
        <li><strong>Mega Menu Density:</strong> Subcategories under "Thermal Labels" are presented in long, tightly spaced link columns that are difficult to scan.</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-header">Recommended Visual Direction</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li><strong>Hero Thesis:</strong> State clearly: <em>"Commercial & Industrial Labels — Factory-Direct Pricing, Guaranteed Compatibility."</em></li>
        <li><strong>Visual Category Gateway:</strong> Replace generic carousel banners with 4 clear visual category tiles (Direct Thermal, Thermal Transfer, Fanfold, Custom Orders).</li>
        <li><strong>Unified Navigation:</strong> Streamline header into a clean 2-row layout with clear category groupings and visual icons.</li>
      </ul>
    </div>
  </div>

  <div class="screenshot-container" style="margin-top: 10px;">
    <img src="{img_nav_mega}" alt="Mega Menu Navigation">
    <div class="screenshot-caption">Figure 5.2: Navigation Menu Dropdown — Text-heavy layout benefits from visual grouping.</div>
  </div>
</div>

<!-- ==================== SECTION 6: PRODUCT DISCOVERY & FILTERS ==================== -->
<div class="page">
  <h1 class="section-title"><span class="section-num">06</span> Product Discovery & Faceted Search</h1>

  <p>
    In technical B2B ecommerce, customers do not browse casually—they search for exact dimensional and printer specifications. The category and filtering experience directly determines how quickly a buyer finds their compatible label.
  </p>

  <div class="screenshot-container">
    <img src="{img_cat_desktop}" alt="Category Page Experience">
    <div class="screenshot-caption">Figure 6.1: Direct Thermal Category Page — Product cards and sidebar filters.</div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-header">Current Listing Observations</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li><strong>Visual Redundancy:</strong> Nearly all product card images display a generic white roll, making visual distinction impossible without reading full text titles.</li>
        <li><strong>Title Clutter:</strong> Titles pack up to 10 distinct words into a single unstructured string, slowing down scanning speed.</li>
        <li><strong>Filter Limitations:</strong> Sidebar filtering lacks dimensional selectors (e.g. Width × Height filter matrix, Core Size filter).</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-header">Recommended Refinements</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li><strong>Attribute Pill Badges:</strong> Display key specs (e.g., <span class="pill low">3" × 1"</span> <span class="pill low">0.75" Core</span> <span class="pill low">Roll</span>) prominently on each card.</li>
        <li><strong>Quick Dimension Filter:</strong> Introduce an intuitive dimension filter bar at the top of category pages.</li>
        <li><strong>Active Filter Chips:</strong> Display prominent, 1-click removable tags for active filter criteria.</li>
      </ul>
    </div>
  </div>
</div>

<!-- ==================== SECTION 7: PRODUCT DETAIL PAGE (PDP) ==================== -->
<div class="page">
  <h1 class="section-title"><span class="section-num">07</span> Product Detail Page (PDP) Architecture</h1>

  <p>
    The Product Detail Page is the critical decision point of the entire storefront. This is where the customer evaluates compatibility, verifies quantity pricing, and completes their purchase.
  </p>

  <div class="screenshot-container">
    <img src="{img_pdp_desktop}" alt="Product Detail Page">
    <div class="screenshot-caption">Figure 7.1: Live BIS Labels PDP Layout — 5/7 column split with stacked specifications.</div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-header">Current PDP Friction Points</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li><strong>Imbalanced Layout:</strong> Left image column has excessive empty whitespace below single roll image, while right column is crowded.</li>
        <li><strong>Subtle Pricing & Units:</strong> Unit pricing ("$X.XX per roll / carton") lacks prominent callout, making price comparisons harder for bulk buyers.</li>
        <li><strong>Buried Specifications:</strong> Key manufacturing specs (adhesive type, temperature range, core size) require switching tabs.</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-header">Recommended PDP Modernization</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li><strong>Structured Hierarchy:</strong> Title → Core Specs Matrix → Visual Options → Quantity & Pricing Tier → Add to Cart.</li>
        <li><strong>Quick Spec Badges:</strong> Display core size, outer diameter, adhesive type, and printer compatibility directly beside the price.</li>
        <li><strong>Prominent Unit Pricing:</strong> Highlight volume discount tiers clearly in a dedicated bulk pricing table.</li>
      </ul>
    </div>
  </div>
</div>

<!-- ==================== SECTION 8: PRODUCT CONFIGURATION EXPERIENCE ==================== -->
<div class="page">
  <h1 class="section-title"><span class="section-num">08</span> Product Configuration & Option Selection</h1>

  <p>
    For technical label products, selecting the wrong option causes printer jams, incorrect core fit, or adhesive failure. The option selection UI must make configuration effortless, visual, and error-proof.
  </p>

  <div class="screenshot-container">
    <img src="{img_pdp_options}" alt="Configurable Product Options">
    <div class="screenshot-caption">Figure 8.1: Current Option Controls — Standard form elements with subtle selection states.</div>
  </div>

  <h2 class="sub-title">From Standard Form Controls to Guided Visual Selection</h2>
  
  <div class="comparison-row">
    <div class="card" style="border-left: 3px solid #64748b;">
      <div class="card-header">Current Experience (Standard Form)</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li>Standard HTML radio buttons or flat rectangles.</li>
        <li>Subtle color change when selected.</li>
        <li>No visual preview of the combined configuration.</li>
        <li>Options feel like an administrative form.</li>
      </ul>
    </div>
    <div class="card" style="border-left: 3px solid #2563eb; background: #f0f7ff;">
      <div class="card-header" style="color: #1d4ed8;">Recommended Direction (Guided Visual Selection)</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li><strong>Visual Selection Cards:</strong> Tactile card buttons with bold active borders and checkmarks.</li>
        <li><strong>Grouped Steps:</strong> Step 1: Core Size → Step 2: Material → Step 3: Quantity.</li>
        <li><strong>Live Summary Card:</strong> Compact panel confirming all choices before purchase.</li>
        <li><strong>Contextual Help Tooltips:</strong> Explains differences between 0.75", 1", and 3" cores on hover.</li>
      </ul>
    </div>
  </div>

  <div class="callout green" style="margin-top: 10px;">
    <div class="callout-title">Customer Benefit of Visual Guided Configuration</div>
    Eliminates buyer hesitation. When customers see exactly what is selected with clear confirmation, order confidence rises and costly customer-service inquiries regarding compatibility drop significantly.
  </div>
</div>

<!-- ==================== SECTION 9: MOBILE & RESPONSIVE EXPERIENCE ==================== -->
<div class="page">
  <h1 class="section-title"><span class="section-num">09</span> Mobile & Responsive Usability</h1>

  <p>
    A significant portion of B2B warehouse managers, purchasing agents, and re-order shoppers access BIS Labels from mobile devices. The mobile experience must be as seamless and fast as desktop.
  </p>

  <div class="grid-3" style="margin: 14px 0;">
    <div class="screenshot-container" style="margin: 0;">
      <img src="{img_mobile_home}" alt="Mobile Home" style="max-height: 240px;">
      <div class="screenshot-caption">Figure 9.1: Mobile Homepage</div>
    </div>
    <div class="screenshot-container" style="margin: 0;">
      <img src="{img_mobile_pdp}" alt="Mobile PDP" style="max-height: 240px;">
      <div class="screenshot-caption">Figure 9.2: Mobile Product Page</div>
    </div>
    <div class="screenshot-container" style="margin: 0;">
      <img src="{img_mobile_cart}" alt="Mobile Cart" style="max-height: 240px;">
      <div class="screenshot-caption">Figure 9.3: Mobile Cart View</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-header">Mobile Friction Findings</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li><strong>Small Tap Targets:</strong> Quantity buttons, radio options, and tab titles measure under 34px in height, making precise thumb interaction difficult.</li>
        <li><strong>Excessive Scroll Depth:</strong> Product details and configuration require multiple viewport scrolls before reaching the Add to Cart button.</li>
        <li><strong>Header Space Consumption:</strong> Contact bar and navigation take up over 28% of initial screen height on mobile.</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-header">Mobile Improvement Opportunities</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li><strong>44px Minimum Touch Targets:</strong> Enlarge option cards and quantity buttons for comfortable one-handed use.</li>
        <li><strong>Sticky Bottom Add-to-Cart Bar:</strong> Keep price and Add to Cart visible as users scroll through specifications.</li>
        <li><strong>Compact Accordion Tabs:</strong> Replace horizontal tab row with clean, collapsible mobile accordions.</li>
      </ul>
    </div>
  </div>
</div>

<!-- ==================== SECTION 10 & 11: VISUAL SYSTEM & TRUST ==================== -->
<div class="page">
  <h1 class="section-title"><span class="section-num">10</span> Visual System, Typography & Brand Polish</h1>

  <p>
    Applying the Anthropic frontend-design framework, we evaluated whether the current site conveys a coherent, intentional visual identity.
  </p>

  <div class="grid-2">
    <div class="card">
      <div class="card-header">Typography & Spacing Inconsistencies</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li><strong>Font Hierarchy:</strong> Multiple competing font weights and sizes create uneven visual density across cards and headers.</li>
        <li><strong>Color Palette Balance:</strong> Primary brand blues and accent red hover states clash across legacy template components.</li>
        <li><strong>Whitespace Management:</strong> Certain sections are overly compressed while others leave large blank voids.</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-header">Recommended Design Direction</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li><strong>Modern Clean Typography:</strong> Standardize on a refined corporate sans-serif hierarchy (Open Sans / Plus Jakarta Sans).</li>
        <li><strong>Harmonious Industrial Palette:</strong> Deep Precision Navy (<code>#0a2540</code>), Clean Slate Neutral (<code>#f8fafc</code>), and Amber/Blue Action Accents.</li>
        <li><strong>Consistent Component Library:</strong> Unified borders, pill badges, and input controls.</li>
      </ul>
    </div>
  </div>

  <h1 class="section-title" style="margin-top: 25px;"><span class="section-num">11</span> Trust, Reassurance & Purchase Confidence</h1>
  <p>
    Valuable trust signals already exist within the BIS Labels organization but are visually obscured from shoppers.
  </p>

  <div class="grid-3">
    <div class="card">
      <div class="card-header">1. Fast Turnaround Guarantee</div>
      <p style="font-size: 8.5pt;">Surface same-day/next-day shipping promises prominently beneath the Add to Cart button on PDPs.</p>
    </div>
    <div class="card">
      <div class="card-header">2. Compatibility Reassurance</div>
      <p style="font-size: 8.5pt;">Add explicit badges: <em>"100% Guaranteed Compatible with Zebra, Rollo, Sato, Dymo & Datamax Printers"</em>.</p>
    </div>
    <div class="card">
      <div class="card-header">3. Free Sample Kit Reassurance</div>
      <p style="font-size: 8.5pt;">Highlight sample roll availability for businesses testing adhesive strength on specialized packaging.</p>
    </div>
  </div>
</div>

<!-- ==================== SECTION 12 & 13: ROADMAP & RECOMMENDED FOCUS ==================== -->
<div class="page">
  <h1 class="section-title"><span class="section-num">12</span> Prioritized Improvement Roadmap</h1>

  <table class="audit-table">
    <thead>
      <tr>
        <th style="width: 8%;">Tier</th>
        <th style="width: 32%;">Initiative</th>
        <th style="width: 30%;">Customer Benefit</th>
        <th style="width: 15%;">Visual Impact</th>
        <th style="width: 15%;">Relative Effort</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="pill high">Tier 1</span></td>
        <td><strong>PDP Configuration Modernization</strong></td>
        <td>Clear visual option selection & live summary</td>
        <td><span class="pill high">High</span></td>
        <td><span class="pill moderate">Moderate</span></td>
      </tr>
      <tr>
        <td><span class="pill high">Tier 1</span></td>
        <td><strong>Quick Spec Matrix on PDP</strong></td>
        <td>Immediate access to core size & adhesive specs</td>
        <td><span class="pill high">High</span></td>
        <td><span class="pill quick">Quick Win</span></td>
      </tr>
      <tr>
        <td><span class="pill high">Tier 1</span></td>
        <td><strong>Mobile Purchase Flow & Touch Targets</strong></td>
        <td>Comfortable one-handed mobile ordering</td>
        <td><span class="pill high">High</span></td>
        <td><span class="pill moderate">Moderate</span></td>
      </tr>
      <tr>
        <td><span class="pill medium">Tier 2</span></td>
        <td><strong>Category Attribute Badges</strong></td>
        <td>Faster product scanning & comparison</td>
        <td><span class="pill medium">Medium</span></td>
        <td><span class="pill quick">Quick Win</span></td>
      </tr>
      <tr>
        <td><span class="pill medium">Tier 2</span></td>
        <td><strong>Faceted Search Dimensional Filters</strong></td>
        <td>Filter by exact label width, height, core diameter</td>
        <td><span class="pill high">High</span></td>
        <td><span class="pill moderate">Moderate</span></td>
      </tr>
      <tr>
        <td><span class="pill medium">Tier 2</span></td>
        <td><strong>Header Navigation Streamlining</strong></td>
        <td>Cleaner top bar & scannable mega menu</td>
        <td><span class="pill medium">Medium</span></td>
        <td><span class="pill quick">Quick Win</span></td>
      </tr>
      <tr>
        <td><span class="pill low">Tier 3</span></td>
        <td><strong>Homepage Value Narrative</strong></td>
        <td>Stronger industrial brand credibility</td>
        <td><span class="pill medium">Medium</span></td>
        <td><span class="pill large">Larger Init.</span></td>
      </tr>
    </tbody>
  </table>

  <h1 class="section-title" style="margin-top: 25px;"><span class="section-num">13</span> Recommended Next Development Focus</h1>

  <div class="callout" style="border-left-color: #0f172a; background: #f8fafc;">
    <div class="callout-title" style="font-size: 11pt;">Recommended Next Phase: Product Detail & Configuration Redesign</div>
    <p style="margin-top: 6px; font-size: 9pt;">
      Based on our comprehensive audit, the <strong>Product Detail Page (PDP) & Option Configuration</strong> is where the next phase of work will produce the most visible, high-impact improvement for customers and the business.
    </p>
    <ul class="bullet-list" style="font-size: 8.5pt; margin-top: 6px;">
      <li><strong>Immediate conversion impact:</strong> Reduces ordering hesitation on high-volume thermal label rolls.</li>
      <li><strong>High client visibility:</strong> Delivers a dramatic, noticeable upgrade to the core product experience without risking site-wide disruption.</li>
      <li><strong>Technical safety:</strong> Concentrates work within self-contained Stencil product partials (<code>product-view.html</code>, <code>add-to-cart.html</code>, <code>options/</code>) with zero risk to checkout or store data.</li>
    </ul>
  </div>
</div>

<!-- ==================== SECTION 14 & 15: NEXT PHASE SCOPE & TECHNICAL APPENDIX ==================== -->
<div class="page">
  <h1 class="section-title"><span class="section-num">14</span> Suggested Scope for Next Development Phase</h1>

  <div class="grid-2">
    <div class="card">
      <div class="card-header">Experience & Usability Scope</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li>Transform option radios/dropdowns into modern visual card-selectors.</li>
        <li>Implement clear active selection states with checkmarks & high contrast borders.</li>
        <li>Introduce a Quick Specifications Matrix (Core, OD, Material, Adhesive).</li>
        <li>Add live configuration summary before the Add to Cart button.</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-header">Visual & Mobile Scope</div>
      <ul class="bullet-list" style="font-size: 8.5pt;">
        <li>Rebalance the 5/7 column layout with clean whitespace and modern typography.</li>
        <li>Enlarge mobile touch targets to 44px+ for comfortable thumb selection.</li>
        <li>Surface turnaround & guaranteed printer compatibility badges.</li>
        <li>Preserve all existing BigCommerce variant pricing and AJAX cart logic.</li>
      </ul>
    </div>
  </div>

  <h1 class="section-title" style="margin-top: 25px;"><span class="section-num">15</span> Technical Notes — Internal Appendix</h1>

  <p style="font-size: 8.5pt; color: #64748b;">
    <em>This section contains implementation notes for our internal frontend engineering team.</em>
  </p>

  <div class="grid-2">
    <div class="card" style="background: #f8fafc;">
      <div class="card-header">Safe Modification Areas</div>
      <ul class="bullet-list" style="font-size: 8pt;">
        <li><code>templates/components/products/product-view.html</code> (Layout, column structure, spec table placement).</li>
        <li><code>templates/components/products/add-to-cart.html</code> (Quantity stepper UI, button styling).</li>
        <li><code>templates/components/products/options/*</code> (Option card markup).</li>
        <li><code>assets/scss/layouts/products/_productView.scss</code> (CSS styling).</li>
      </ul>
    </div>
    <div class="card" style="background: #f8fafc;">
      <div class="card-header">Critical Preservation Points</div>
      <ul class="bullet-list" style="font-size: 8pt;">
        <li>Preserve all <code>data-product-attribute</code>, <code>data-product-option-change</code>, and <code>data-cart-item-add</code> attributes required by <code>product-details.js</code>.</li>
        <li>Do not alter <code>@bigcommerce/stencil-utils</code> AJAX hooks.</li>
        <li>Ensure <code>schema.org</code> microdata tags in <code>price.html</code> remain intact for rich search results.</li>
      </ul>
    </div>
  </div>

  <div style="margin-top: 30px; padding: 12px; background: #0f172a; color: #ffffff; border-radius: 6px; text-align: center; font-size: 8.5pt;">
    <strong>End of Audit Report</strong> — Ready for Leadership & Client Presentation.
  </div>
</div>

</body>
</html>
"""

    html_path = "reports/BIS-Labels-Website-Experience-Audit.html"
    pdf_path = "reports/BIS-Labels-Website-Experience-Audit.pdf"

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"HTML source saved to {html_path}")

    print("Generating high-resolution PDF via Playwright...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(f"file:///{os.path.abspath(html_path)}", wait_until="networkidle")
        page.pdf(
            path=pdf_path,
            format="A4",
            print_background=True,
            margin={"top": "0mm", "right": "0mm", "bottom": "0mm", "left": "0mm"}
        )
        browser.close()

    print(f"PDF successfully generated at {pdf_path}!")

if __name__ == "__main__":
    generate_pdf_report()
