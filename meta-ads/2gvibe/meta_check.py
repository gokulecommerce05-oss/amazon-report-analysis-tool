"""Read-only check of the 2G Vibe Meta System User connection.
Needs env vars: META_ACCESS_TOKEN, META_AD_ACCOUNT_ID (act_...), optional META_PIXEL_ID, META_CATALOG_ID.
Only makes GET requests; it never changes anything in the ad account.
"""
import json, os, sys, urllib.parse, urllib.request

API = "https://graph.facebook.com/v21.0"
TOKEN = os.environ.get("META_ACCESS_TOKEN", "")

def get(path, **params):
    params["access_token"] = TOKEN
    url = f"{API}/{path}?{urllib.parse.urlencode(params)}"
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        return {"error": json.load(e).get("error", {})}

def show(label, res):
    if "error" in res:
        print(f"❌ {label}: {res['error'].get('message')}")
        return False
    print(f"✅ {label}: {json.dumps(res, ensure_ascii=False)[:300]}")
    return True

if not TOKEN:
    sys.exit("META_ACCESS_TOKEN is not set in this environment.")

show("Token owner", get("me", fields="id,name"))
show("Token permissions", get("me/permissions"))
acct = os.environ.get("META_AD_ACCOUNT_ID", "")
if acct:
    if not acct.startswith("act_"):
        acct = f"act_{acct}"
    show("Ad account", get(acct, fields="name,currency,account_status,amount_spent,spend_cap,timezone_name"))
    show("Campaigns", get(f"{acct}/campaigns", fields="name,status,objective", limit=25))
    show("Last 30 days", get(f"{acct}/insights", date_preset="last_30d",
                             fields="spend,impressions,clicks,ctr,cpc,actions,purchase_roas"))
pixel = os.environ.get("META_PIXEL_ID")
if pixel:
    show("Pixel", get(pixel, fields="name,last_fired_time,is_unavailable"))
catalog = os.environ.get("META_CATALOG_ID")
if catalog:
    show("Catalogue", get(catalog, fields="name,product_count"))
    show("Catalogue products", get(f"{catalog}/products", fields="retailer_id,name,price,review_status", limit=50))
