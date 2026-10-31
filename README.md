# 2G VIBE Payout Analyser

One page that reads your **Amazon, Flipkart and Meesho** payment reports and shows where your order money went: fees, shipping, returns and RTO, ads, discounts, tax held back (TCS/TDS) and fines, with a "fix these first" list and a product-by-product view. Load files from several platforms at once to compare them side by side.

It is one self-contained file (`index.html`). There is no server and no sign-in, and your files never leave your browser.

## Use it

Online: `https://gokulecommerce05-oss.github.io/amazon-report-analysis-tool/`

Or download `index.html` and double-click it to open it in Chrome or Edge (needs internet the first time for the Excel reader).

## Which file to download

| Platform | Where | File |
|---|---|---|
| Amazon (best) | Seller Central → Payments → All statements → Download XML for each settlement | XML (settlement report, has SKUs) |
| Amazon | Seller Central → Payments → Transaction view → date range → Download | CSV |
| Flipkart | Seller Hub → Payments → Previous payments → download the order-level settlement report | .xlsx (sheets *Orders*, *Ads*, …) |
| Meesho | Supplier Panel → Payments → Download → payment file for the date range | .xlsx (sheets *Order Payments*, *Ads Cost*, …) |
| Flipkart returns (optional) | Seller Hub → Returns → Download returns report | CSV (has order IDs, value, courier) |
| Meesho returns (optional) | Supplier Panel → Returns/RTO → download In transit, Delivered and Lost | CSV, one per tab |

## Returns and RTO

Add the Flipkart and Meesho returns reports together with your business sheet. The tool matches every return to the **Orders** tab and shows the real RTO and customer-return rate by COD vs prepaid, courier, state and product, why parcels came back, and a **Check or claim** list: parcels lost in transit, returns not back after 30 days, and customer returns for damaged, missing or wrong items.

## Profit & loss

The **Profit & loss** card shows each month (by payment date) and the total: order value, discounts, refunds, net sales, platform fees, shipping, ads, TCS/TDS held, other charges, paid to you, product cost, packing, gross profit, fixed monthly costs and net profit with margin. Enter your packing cost per order and fixed monthly costs (rent, salary, tools) on the card; they are saved only in that browser. Fixed costs are split by the days each month's files cover, and appear in the All platforms view.

## Money to recover

With payment files and your business sheet loaded, the **Money to recover** card lists:

- **Orders shipped but never paid**: orders in the Orders tab shipped inside the dates your payment files cover (and at least 21 days before the last payment), that appear in no payment file and did not come back as RTO. Raise a ticket for each.
- **Shipping charged above usual**: single-unit orders whose shipping charge is 20% (and ₹8) above the usual charge for the same product to the same state. Ask for a weight-slab review.
- **Weight Flipkart measured**: the dead weight Flipkart's system measured, compared with an optional **Packed weight (g)** column in the Purchase Cost tab.
- **Returns to claim**: lost parcels, returns not back after 30 days and damaged/missing/wrong-item returns from the returns reports (SPF on Flipkart, SAFE-T on Amazon, Meesho claims).

## Profit after product cost

Download your business Google Sheet (**File → Download → Microsoft Excel**) and drop it on the page once. The tool reads the **SKU Mapping** tab (platform SKU → Master SKU) and the **Purchase Cost** tab (cost per Master SKU), and from then on shows profit per platform and per product, groups the same product across platforms, and flags products that lose money, sold SKUs with no cost, and SKUs mapped to two Master SKUs. The costs are saved only in that browser (never on GitHub); click × on the "Product costs" chip to forget them.

Profit = paid to you − purchase cost of units the buyer kept. RTO and returned units are assumed back in stock; packaging is not included. Amazon transaction CSVs have no SKU, so Amazon products are matched by their title in SKU Mapping.

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
