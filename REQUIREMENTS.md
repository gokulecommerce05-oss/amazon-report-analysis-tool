# Multi-Marketplace Sales Dashboard — Requirements

Scope: one dashboard that combines **Amazon, Flipkart and Meesho** sales, built from report files dropped into the shared Google Drive folder.

Drive folder: https://drive.google.com/drive/folders/13ljEh0tLxs1x_-l-r0qBVPKo3Jnc3dp9
(subfolders `Amazon/`, `Flipkart/`, `Meesho/`, plus the `Master SKU Mapping` sheet)

---

## 1. Decisions (confirmed)

| Topic | Decision |
|---|---|
| When a sale counts | **Delivered**, then customer returns are subtracted in the month the return is processed |
| GST | **Excluded** from all sales figures; GST collected shown as a separate line |
| History | **Last 12 months** (rolling), month-by-month |
| Refresh | **Weekly** — new report files uploaded to Drive, dashboard rebuilt |
| Access | **Owner view** (everything) + **Staff view** (operations only, no fees/settlement/margin) |

## 2. KPI definitions

All amounts in INR, excluding GST, per platform and combined, per month and for the 12-month total.

| KPI | Definition |
|---|---|
| Gross sales | Item price × qty for orders **placed** in the period (before cancellations/RTO/returns). Shown for context only. |
| Net sales | Item price × qty for orders **delivered** in the period − value of **customer returns** processed in the period. Excludes GST, shipping charged to customer, and platform-funded discounts. Seller-funded discounts/coupons are deducted. |
| Orders | Count of distinct order IDs delivered in the period. |
| Units | Sum of quantity delivered − units returned in the period. |
| AOV | Net sales ÷ orders. |
| Cancellations | Orders cancelled before dispatch (by customer or seller). Count and %. Not in net sales. |
| RTO | Orders dispatched but returned undelivered (customer refused / unreachable). Count and % of dispatched. Not in net sales; RTO shipping charges counted under fees. |
| Return rate | Customer returns (after delivery) ÷ delivered units. Reported separately from RTO. |
| Commission & fees | Referral/commission + fixed/closing fee + shipping/weight-handling + collection/payment fee + pick & pack + storage + RTO/return shipping + ads (shown on its own line) — **net of fee refunds**, excluding GST on fees (GST on fees shown separately as input-credit). |
| TCS / TDS | Shown separately; not treated as a cost (claimable). |
| Settlement amount | Actual money credited to bank in the period per the platform's payment/settlement report. Will not equal net sales − fees in the same month because of settlement lag. |
| Top SKUs | Ranked by net sales, at **Master SKU** level (combined across platforms), top 20, with units, return rate and share of sales. |
| State-wise sales | Net sales and orders by the customer's ship-to state. |

## 3. Owner vs staff view

| Section | Owner | Staff |
|---|---|---|
| Net / gross sales, orders, units, AOV | ✔ | ✔ |
| Cancellation, RTO, return rate | ✔ | ✔ |
| Top SKUs (units, returns) | ✔ | ✔ |
| State-wise orders | ✔ | ✔ |
| Commission & fees, ads | ✔ | — |
| Settlement amount, TCS/TDS | ✔ | — |
| Margin (needs cost price from Master SKU sheet) | ✔ | — |

## 4. Master SKU mapping

Sheet: `Master SKU Mapping` in the Drive folder. One row per product the business sells.

Columns: Master SKU · Product Name · Category · Brand · HSN Code · GST Rate % · Cost Price (Rs ex-GST) · Amazon Seller SKU · Amazon ASIN · Flipkart Seller SKU · Flipkart FSN · Flipkart Listing ID · Meesho Supplier SKU · Meesho Product ID · Combo / Pack Size · Active (Y/N) · Notes

Rules:
- Master SKU is the business's own code and never changes.
- If one product has several listings on a platform, add a row per listing with the same Master SKU.
- Any platform SKU not found in the sheet is shown on the dashboard as **Unmapped** so it can be fixed.

## 5. Source reports (per platform, uploaded weekly)

| Platform | Report | Gives |
|---|---|---|
| Amazon | Payments → Transaction View (CSV) | Order payments, refunds, fees, settlement |
| Amazon | Tax Document Library → MTR B2C (monthly) | Ship-to state, SKU, qty, taxable value, GST |
| Flipkart | Payments → Settled transactions report | Commission, fees, settlement |
| Flipkart | Reports → Sales report | Orders, units, cancellations, returns, state, GST |
| Meesho | Payments → Payments report | Settlement, fees, deductions |
| Meesho | Orders → Order report | Orders, units, RTO, returns, state |

File naming: `<platform>_<report>_<YYYY-MM-DD>_to_<YYYY-MM-DD>.csv/.xlsx` inside the platform's subfolder. Overlapping files are de-duplicated by order ID + transaction type.

## 6. Known reconciliation differences

- Platform panels often show sales **including GST** and on **order date**; this dashboard shows **ex-GST** on **delivery date**, so totals will differ by design.
- Settlement lags sales by ~7–15 days (Amazon/Flipkart) and ~7 days post-delivery (Meesho).
- Meesho reports prices inclusive of its commission model; net sales use the supplier's listed price.

## 7. Open items

- [ ] Fill the Master SKU Mapping sheet.
- [ ] Upload the first 12 months of reports to each platform folder.
- [ ] Name the staff users who need the staff view.
