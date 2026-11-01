"""Convert a WooCommerce product CSV export into Meta's catalogue upload template.
Usage: python3 woo_to_meta.py <woo_export.csv> <meta_template.xlsx> <output.xlsx> [site_url]
"""
import csv, re, sys, html, openpyxl

src, tmpl, out = sys.argv[1:4]
site = (sys.argv[4] if len(sys.argv) > 4 else "https://2gvibe.com").rstrip("/")

def clean(t):
    t = html.unescape(re.sub(r"<[^>]+>", " ", t or ""))
    return re.sub(r"\s+", " ", t).strip()

def money(v):
    v = (v or "").replace(",", "").strip()
    return f"{float(v):.2f} INR" if v else ""

rows = list(csv.DictReader(open(src, encoding="utf-8-sig")))
by_id = {r.get("ID"): r for r in rows}
wb = openpyxl.load_workbook(tmpl); ws = wb.active
hdr = [c.value for c in ws[2]]
ws.delete_rows(3, ws.max_row)  # remove Meta's sample row
skipped, n = [], 0
for r in rows:
    typ = (r.get("Type") or "").lower()
    if "variable" in typ and "variation" not in typ:
        continue  # parent of variations: export each variation instead
    if r.get("Published", "1") not in ("1", "") or (r.get("Visibility in catalog") or "visible") == "hidden":
        skipped.append((r.get("Name"), "not published/hidden")); continue
    parent = by_id.get((r.get("Parent") or "").replace("id:", "")) if "variation" in typ else None
    base = parent or r
    pid, sku = r.get("ID"), (r.get("SKU") or "").strip()
    # Meta for WooCommerce content ID format: "<SKU>_<ID>", or "wc_post_id_<ID>" when there's no SKU
    cid = f"{sku}_{pid}" if sku else f"wc_post_id_{pid}"
    imgs = [i.strip() for i in (r.get("Images") or base.get("Images") or "").split(",") if i.strip()]
    price = money(r.get("Regular price") or base.get("Regular price"))
    if not price or not imgs:
        skipped.append((r.get("Name"), "missing price" if not price else "missing image")); continue
    instock = (r.get("In stock?") or "1") in ("1", "backorder")
    desc = clean(base.get("Description")) or clean(base.get("Short description")) or clean(r.get("Name"))
    cats = [c.split(">")[-1].strip() for c in (base.get("Categories") or "").split(",") if c.strip()]
    val = {
        "id": cid, "title": clean(r.get("Name"))[:200], "description": desc[:9999],
        "availability": "in stock" if instock else "out of stock", "condition": "new",
        "link": f"{site}/?p={pid}", "image_link": imgs[0], "brand": "2G Vibe",
        "price": price, "sale_price": money(r.get("Sale price")),
        "item_group_id": f"wc_post_id_{parent.get('ID')}" if parent else "",
        "quantity_to_sell_on_facebook": r.get("Stock") or "",
        "product_tags[0]": cats[0] if cats else "", "product_tags[1]": cats[1] if len(cats) > 1 else "",
        "google_product_category": "Home & Garden > Decor",
    }
    ws.append([val.get(h, "") for h in hdr]); n += 1
wb.save(out)
print(f"Wrote {n} products to {out}")
for name, why in skipped: print(f"SKIPPED: {name} -> {why}")
