import json, re, html, sys, struct, urllib.request, openpyxl
S = sys.argv[1]; TMPL = sys.argv[2]; OUT = sys.argv[3]
p = json.load(open(f"{S}/site/products.json"))
SKIP = {5226: "duplicate of 5015 (same images & description, '-copy' URL)"}
def clean(t):
    t = re.sub(r"<(br|/p|/li)[^>]*>", "\n", t or "")
    t = html.unescape(html.unescape(re.sub(r"<[^>]+>", " ", t)))
    t = re.sub(r"[ \t]+", " ", t); t = re.sub(r"\s*\n\s*", "\n", t)
    return t.strip()
def money(v, mu): return f"{int(v)/10**mu:.2f} INR" if v not in (None, "", "0") else ""
wb = openpyxl.load_workbook(TMPL); ws = wb.active
hdr = [c.value for c in ws[2]]; ws.delete_rows(3, ws.max_row)
n = 0
for x in p:
    if x["id"] in SKIP: print("SKIP", x["id"], SKIP[x["id"]]); continue
    pr = x["prices"]; mu = pr["currency_minor_unit"]; sku = x["sku"].strip()
    title = clean(x["name"])
    size = (re.search(r"(\d+)\s*Inch", title, re.I) or [None, ""])[1]
    color = "Black" if "black" in title.lower() else "Golden"
    cats = [clean(c["name"]) for c in x["categories"] if "Car Accessories" not in c["name"]]
    tags = ["Wind Chimes"] + [c for c in cats if c != "Wind Chimes"]
    row = {
        "id": f"{sku}_{x['id']}" if sku else f"wc_post_id_{x['id']}",
        "title": title[:200],
        "description": clean(x["description"]) or clean(x["short_description"]),
        "availability": "in stock" if x["is_in_stock"] else "out of stock",
        "condition": "new", "link": x["permalink"], "image_link": x["images"][0]["src"],
        "brand": "2G Vibe", "price": money(pr["regular_price"], mu),
        "sale_price": money(pr["sale_price"], mu) if pr["sale_price"] != pr["regular_price"] else "",
        "google_product_category": "Home & Garden > Decor > Wind Chimes",
        "age_group": "adult", "gender": "unisex", "color": color, "material": "Metal",
        "size": f"{size} inch" if size else "",
        "product_tags[0]": tags[0], "product_tags[1]": "Diwali Gifts",
    }
    ws.append([row.get(h, "") for h in hdr]); n += 1
    print(row["id"], "|", row["price"], "->", row["sale_price"], "|", row["size"], row["color"], "|", title[:60])
wb.save(OUT); print("rows:", n)
