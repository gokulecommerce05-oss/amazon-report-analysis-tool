# 2G VIBE Payout Analyser

A single-page tool that reads Amazon Seller Central transaction CSVs and shows where your order money went: fees, refunds, ads, coupons, free orders, Easy Ship charges and amounts on hold, with a "fix these first" list.

It is one self-contained file (`index.html`). There is no server and no sign-in, and your CSV never leaves your browser.

## Use it

**On your computer:** download `index.html` and double-click it to open it in Chrome or Edge.

**Online (GitHub Pages):** in this repo go to **Settings → Pages**, set **Source** to *Deploy from a branch*, pick the branch and the `/ (root)` folder, and save. The tool will be live at
`https://gokulecommerce05-oss.github.io/amazon-report-analysis-tool/`.

## Get the CSV

Seller Central → **Payments → Transaction view** → choose a date range or statement period → **Download** (CSV). You can drop several files at once.
