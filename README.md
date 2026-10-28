# 2G VIBE Payout Analyser

One page that reads your **Amazon, Flipkart and Meesho** payment reports and shows where your order money went: fees, shipping, returns and RTO, ads, discounts, tax held back (TCS/TDS) and fines, with a "fix these first" list and a product-by-product view. Load files from several platforms at once to compare them side by side.

It is one self-contained file (`index.html`). There is no server and no sign-in, and your files never leave your browser.

## Use it

Online: `https://gokulecommerce05-oss.github.io/amazon-report-analysis-tool/`

Or download `index.html` and double-click it to open it in Chrome or Edge (needs internet the first time for the Excel reader).

## Which file to download

| Platform | Where | File |
|---|---|---|
| Amazon | Seller Central → Payments → Transaction view → date range → Download | CSV |
| Flipkart | Seller Hub → Payments → Previous payments → download the order-level settlement report | .xlsx (sheets *Orders*, *Ads*, …) |
| Meesho | Supplier Panel → Payments → Download → payment file for the date range | .xlsx (sheets *Order Payments*, *Ads Cost*, …) |

Flipkart and Meesho figures follow the **payment date**. Everything on each line is split into sale, fees, shipping, returns, discounts, tax and other, and always adds up to what was actually paid.

---

# 2G Vibe Daily Label Entry

`label-entry/index.html` reads today's Amazon, Flipkart and Meesho label PDFs and adds one row per order to the **Orders** tab of your Google Sheet. An Order ID that is already in the sheet is never added twice.

Online: `https://gokulecommerce05-oss.github.io/amazon-report-analysis-tool/label-entry/`

## One-time Google Sheet setup

1. Open your orders Google Sheet → **Extensions → Apps Script**.
2. Delete what is there, paste the contents of [`label-entry/apps-script.gs`](label-entry/apps-script.gs), and change `ACCESS_KEY` to a long secret of your own. Save.
3. **Deploy → New deployment** → type **Web app**. Set *Execute as*: **Me** and *Who has access*: **Anyone**. Click Deploy and allow access.
4. Copy the **Web app URL** (ends in `/exec`).
5. In the tool, open **Google Sheet settings**, paste the URL and your access key, and click **Save**. It shows how many orders are already in the sheet.

The URL and key are saved only in that browser. Anyone without the key cannot read or add orders. If you change the script later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

Without the setup, **Copy rows** still works: paste into the first empty row of the Orders tab.
