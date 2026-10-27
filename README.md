# 2G VIBE Payout Analyser

A single-page tool that reads Amazon Seller Central transaction CSVs and shows where your order money went: fees, refunds, ads, coupons, free orders, Easy Ship charges and amounts on hold, with a "fix these first" list.

It is one self-contained file (`index.html`). There is no server and no sign-in, and your CSV never leaves your browser.

## Use it

**On your computer:** download `index.html` and double-click it to open it in Chrome or Edge.

**Online (GitHub Pages):** in this repo go to **Settings → Pages**, set **Source** to *Deploy from a branch*, pick the branch and the `/ (root)` folder, and save. The tool will be live at
`https://gokulecommerce05-oss.github.io/amazon-report-analysis-tool/`.

## Get the CSV

Seller Central → **Payments → Transaction view** → choose a date range or statement period → **Download** (CSV). You can drop several files at once.

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
