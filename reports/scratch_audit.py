import json
import os
import time
from playwright.sync_api import sync_playwright

BASE_URL = "https://bislabels.com"

def run_audit():
    os.makedirs("reports/evidence/homepage", exist_ok=True)
    os.makedirs("reports/evidence/navigation", exist_ok=True)
    os.makedirs("reports/evidence/category", exist_ok=True)
    os.makedirs("reports/evidence/product", exist_ok=True)
    os.makedirs("reports/evidence/mobile", exist_ok=True)
    os.makedirs("reports/evidence/tablet", exist_ok=True)
    os.makedirs("reports/evidence/cart", exist_ok=True)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # 1. Desktop Context (1440x900)
        context_desktop = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_desktop.new_page()
        
        print("Auditing PDPs in detail...")
        # Direct Thermal Product
        page.goto(f"{BASE_URL}/3x1-inch-direct-thermal-0-75-inch-core-2-5-inch-outer-diameter/", wait_until="networkidle")
        time.sleep(1)
        page.screenshot(path="reports/evidence/product/pdp_direct_thermal_hero.png")
        page.screenshot(path="reports/evidence/product/pdp_direct_thermal_full.png", full_page=True)
        
        # Thermal Transfer Product with options
        page.goto(f"{BASE_URL}/thermal-transfer/", wait_until="networkidle")
        time.sleep(1)
        links = page.eval_on_selector_all(".card-title a", "elements => elements.map(e => e.href)")
        if links:
            page.goto(links[0], wait_until="networkidle")
            time.sleep(1)
            page.screenshot(path="reports/evidence/product/pdp_tt_options.png")
            page.screenshot(path="reports/evidence/product/pdp_tt_full.png", full_page=True)
            
        context_desktop.close()
        
        # 2. Tablet Context (768x1024 - iPad style)
        print("Auditing Tablet Viewport (768px)...")
        context_tablet = browser.new_context(viewport={"width": 768, "height": 1024})
        page_t = context_tablet.new_page()
        page_t.goto(BASE_URL, wait_until="networkidle")
        time.sleep(1)
        page_t.screenshot(path="reports/evidence/tablet/tablet_home.png")
        
        page_t.goto(f"{BASE_URL}/direct-thermal/", wait_until="networkidle")
        time.sleep(1)
        page_t.screenshot(path="reports/evidence/tablet/tablet_category.png")
        
        page_t.goto(f"{BASE_URL}/3x1-inch-direct-thermal-0-75-inch-core-2-5-inch-outer-diameter/", wait_until="networkidle")
        time.sleep(1)
        page_t.screenshot(path="reports/evidence/tablet/tablet_pdp.png")
        context_tablet.close()
        
        # 3. Mobile Context (375x812 - iPhone style)
        print("Auditing Mobile Viewport (375px)...")
        context_mobile = browser.new_context(viewport={"width": 375, "height": 812}, is_mobile=True, user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1")
        page_m = context_mobile.new_page()
        
        page_m.goto(BASE_URL, wait_until="networkidle")
        time.sleep(1)
        page_m.screenshot(path="reports/evidence/mobile/mobile_home.png")
        
        # Mobile Category
        page_m.goto(f"{BASE_URL}/direct-thermal/", wait_until="networkidle")
        time.sleep(1)
        page_m.screenshot(path="reports/evidence/mobile/mobile_category.png")
        page_m.screenshot(path="reports/evidence/mobile/mobile_category_full.png", full_page=True)
        
        # Mobile PDP
        page_m.goto(f"{BASE_URL}/3x1-inch-direct-thermal-0-75-inch-core-2-5-inch-outer-diameter/", wait_until="networkidle")
        time.sleep(1)
        page_m.screenshot(path="reports/evidence/mobile/mobile_pdp.png")
        page_m.screenshot(path="reports/evidence/mobile/mobile_pdp_full.png", full_page=True)
        
        # Mobile Cart
        page_m.goto(f"{BASE_URL}/cart.php", wait_until="networkidle")
        time.sleep(1)
        page_m.screenshot(path="reports/evidence/mobile/mobile_cart.png")
        
        # Mobile RFQ Quote page
        page_m.goto(f"{BASE_URL}/request-a-quote-rfq/", wait_until="networkidle")
        time.sleep(1)
        page_m.screenshot(path="reports/evidence/mobile/mobile_quote_rfq.png")
        
        context_mobile.close()
        browser.close()
        
    print("All additional evidence captured successfully!")

if __name__ == "__main__":
    run_audit()
