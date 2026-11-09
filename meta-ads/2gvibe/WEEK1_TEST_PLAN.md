# 2G Vibe – Meta Ads Week 1 Test Plan (₹200/day × 7 days)

## 1. Target metrics (minimums set by the owner)
| Stage | Metric | Definition | Minimum |
|---|---|---|---|
| Ad | **Link CTR** | Link clicks ÷ impressions | **≥ 2.0%** |
| Site | **Add-to-cart rate** | Add to carts ÷ landing page views | **≥ 10%** |
| Site | **Purchase conversion** | Purchases ÷ landing page views | **≥ 1.2%** |

### What these targets mean for ₹1,400
| Step | Calculation | Expected |
|---|---|---|
| Impressions | ₹1,400 ÷ ₹100 cost per 1,000 views × 1,000 | ~14,000 |
| Link clicks | 14,000 × 2.0% | ~280 |
| Landing page views | 280 × 85% | ~240 |
| Add to carts | 240 × 10% | ~24 |
| Purchases | 240 × 1.2% | **~3** |
| Cost per purchase | ₹1,400 ÷ 3 | **~₹470** |

⚠️ At a ₹699 order, a ₹470 cost per purchase is **not profitable**. 1.2% is a floor, not the goal:
- 10% add-to-cart and 1.2% purchase means only **12% of carts are bought**. A healthy store converts **30–40% of carts**, which gives a **3–4% purchase rate** and a **₹120–160 cost per purchase**.
- The bundle (2 chimes = ₹1,398) doubles the order value at the same ad cost.

## 2. Website flow (fix before launch, in priority order)
Tested on 9 Nov 2026 with a simulated Pixel 5 phone on 4G.

| # | Problem found | Fix | Effect |
|---|---|---|---|
| **1** | 🚨 **Checkout requires login** ("You must be logged in to checkout") | WooCommerce → Settings → **Accounts & Privacy** → tick **"Allow customers to place orders without an account"**, plus **"Allow customers to create an account during checkout"** | Biggest blocker. Forced sign-up can lose a large share of buyers before payment |
| 2 | Product page shows **"No reviews yet · Write the first review"** above the fold | Hide the rating row when there are 0 reviews, or show the Amazon rating ("★4.x on Amazon") **only if it's real** | Removes a reason not to trust you |
| 3 | No **Buy Now** button (only Add to cart) | Add a "Buy Now" button that goes straight to checkout, next to Add to cart in the sticky bar | Shorter path to purchase |
| 4 | Header + search bar take about 22% of the screen before the product | Hide the search bar on product pages for mobile (or make it an icon) | Product photo and price appear sooner |
| 5 | No delivery date or COD line near the price | Under the price: "🚚 Delivered in 3–7 days · 💵 COD available · ↩️ Easy returns" | Answers trust questions at the moment of decision |
| 6 | No product **video with sound** in the gallery | Add a 10–15 second clip of the real chime sound as gallery item #2 | The sound is the product |
| 7 | Default blue WooCommerce notices (off-brand) | Restyle notices in brand cream/brown | Looks more polished and trustworthy |
| 8 | Adding to cart goes to the full cart page | Use a side cart that opens with a "**Add a 2nd chime → free shipping**" suggestion | Raises order value |
| 9 | Checkout has no visible payment choice before login | After fix 1: show **UPI first, then cards, then COD** | Faster payment |

### Speed (mobile, 4G, 4× slower CPU)
| Page | TTFB | LCP | CLS | Size* | Verdict |
|---|---|---|---|---|---|
| Product: Big 30" | 0.14 s | **1.0 s** | 0.06 | 2.2 MB | ✅ Good (ads land here) |
| Product: Elephant | 0.18 s | **1.0 s** | 0.06 | 2.4 MB | ✅ Good |
| Shop | 0.14 s | **1.0 s** | 0.06 | 2.1 MB | ✅ Good |
| Home | 1.35 s | **4.7 s** | 0.06 | 2.7 MB | ⚠️ Slow (don't send ads here) |
| Checkout | – | ~4.2 s to load | – | – | ⚠️ Speed up after the guest-checkout fix |
\*Uncompressed size. Targets: LCP < 2.5 s, CLS < 0.1.

Speed fixes:
- "Golden Love" and "Golden Butterflies" product images are **0.9–2.9 MB PNGs**. Convert them to WebP at under 200 KB each (LiteSpeed Image Optimization or ShortPixel).
- Combined CSS is about 780 KB and JS about 740 KB uncompressed. In LiteSpeed Cache, turn on **Remove Unused CSS (UCSS)** and **Delay JS**.
- Home page TTFB is 1.35 s on an uncached hit. Turn on the LiteSpeed **crawler / cache warm-up**.
- Logo file is only 92×92 px. Upload a 512 px version (it looks blurry on retina screens and in ads).

## 3. Campaign setup
```
CAMPAIGN  2GV_TEST_W1_Sales          Sales → Website, ₹200/day ad-set budget, 7 days
 AD SET   2GV_W1_Metro_FSR           Optimise for: Add to Cart (switch to Purchase in week 2)
          Advantage+ audience · 8 metros (+25 km): Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad · min age 25
          Placements (manual): Facebook + Instagram Feed, Stories, Reels only
          Attribution: 7-day click / 1-day view
  AD 1  2GV_W1_REALSOUND_REEL_ELEPH  Flexible format: video/ad1_realsound_elephant_9x16.mp4 + ad1b_listen_elephant_9x16.mp4 (+ 4x5)
                                     → Elephant product page  (real owner footage, original sound enhanced)
  AD 2  2GV_W1_VASTU_STATIC_ELEPH    static/ad2_vastu_elephant_4x5.png (+ 9x16) → Elephant product page
  AD 3  2GV_W1_GIFT_STATIC_BUNDLE    static/ad3_gift_bundle_4x5.png (+ 9x16)   → /product-category/wind-chimes/
```
UTM on every ad: `utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}`

## 4. Ad copy

### AD 1 – Real-sound Reel (Elephant, ₹699)
**Primary (EN):**
> Real sound. No music added 🔊 Turn your sound on and listen to our Elephant wind chime ring on a breezy rooftop.
> 6 elephant charms · 4 golden pipes · 4 bells. Vastu tip: hang it near your main door for positive energy ✨
> Only ₹699 · 💵 Cash on Delivery · 🚚 Free shipping above ₹1,000

**Primary (Hinglish):**
> Asli awaaz, koi music nahi 🔊 Sound ON karke suniye — hamari Elephant wind chime ki sukoon bhari awaaz. Sirf ₹699, COD available 💵

**Headlines:** "Hear the Real Sound 🔊" · "Elephant Wind Chime – ₹699" · "COD Available"
**Description:** "Free shipping above ₹1,000"

### Spare – Sound Reel (Big 30" Black, ₹999), template-made from website photos
**Primary (EN):**
> Your balcony is missing this 🎐
> Our Big 30" wind chime has 6 deep-tone metal pipes that turn every breeze into calm, soothing music.
> ✨ Only ₹999 · 💵 Cash on Delivery · 🚚 Free shipping above ₹1,000
> 👉 Tap Shop Now

**Primary (Hinglish):**
> Balcony mein bas yeh kami thi 🎐 30 inch ki badi wind chime, 6 deep-tone pipes — har hawa ke jhonke ke saath sukoon bhari awaaz. Sirf ₹999, COD available 💵

**Headlines:** "Big 30" Wind Chime – ₹999" · "Deep, Soothing Sound" · "COD Available"
**Description:** "Free shipping above ₹1,000"

### AD 2 – Vastu (Elephant, ₹699)
**Primary (EN):**
> Vastu tip ✨ Hang a metal wind chime near your main door, as per Vastu, to welcome positive energy.
> Our Elephant wind chime has 6 elephant charms (a symbol of prosperity), 4 golden pipes and 4 bells.
> Only ₹699 · 💵 COD available · 🚚 Free shipping above ₹1,000

**Primary (Hindi):**
> वास्तु टिप ✨ मुख्य द्वार के पास विंड चाइम लगाएं और घर में सकारात्मक ऊर्जा का स्वागत करें। 6 हाथी चार्म्स वाली गोल्डन विंड चाइम — सिर्फ ₹699, कैश ऑन डिलीवरी उपलब्ध।

**Headlines:** "Vastu Wind Chime – ₹699" · "Elephant Chime for Prosperity" · "Hang It Near Your Main Door"

### AD 3 – Gift bundle (any 2 × ₹699 = ₹1,398)
**Primary (EN):**
> One for you, one to gift 🎁
> Pick any 2 wind chimes and get FREE shipping + a FREE gift.
> Perfect for housewarmings, weddings and festive visits.
> 💵 Cash on Delivery available

**Primary (Hinglish):**
> Ek apne liye, ek gift ke liye 🎁 Koi bhi 2 wind chimes lo — FREE shipping + FREE gift paao. Griha pravesh aur shaadi ke liye perfect!

**Headlines:** "Buy 2 → Free Shipping + Gift" · "The Perfect Housewarming Gift" · "Wind Chimes from ₹699"

### Copy rules (Meta policy + trust)
- Say "as per Vastu" or "for positive energy". **Never** promise results ("brings wealth", "cures stress").
- Only show a strikethrough price (₹2,999) if that price was genuinely charged.
- Use the Amazon rating only if it's real and current.

## 5. Daily routine and decisions
- Days 1–3: no edits. Turn off an ad only if it has spent > ₹300 and has CTR < 1.0% (half the 2% target).
- Day 7 decision:
  - CTR < 2% → new hooks/visuals (raw videos from the owner)
  - CTR ≥ 2%, add-to-cart < 10% → product page fixes 2–6
  - Add-to-cart ≥ 10%, purchase < 1.2% → checkout fixes 1, 9 and the side cart
  - All targets met → week 2: optimise for Purchase, ₹300–400/day, add a retargeting ad

## 6. Creatives v1 (`creatives/`)
| File | Format | Notes |
|---|---|---|
| `video/ad1_realsound_elephant_9x16.mp4` / `_4x5.mp4` | 1080×1920 / 1080×1350, 15.7 s | **AD 1 main.** Owner's rooftop clip A, original sound cleaned and lifted to −14 LUFS. Build: `src/build_realsound_reel.sh` |
| `video/ad1b_listen_elephant_9x16.mp4` / `_4x5.mp4` | 9.2 s | **AD 1 variant** ("Close your eyes & just listen"). Clip B brightened. Build: `src/build_listen_reel.sh` |
| `video/ad1_sound_big30_9x16.mp4` / `_4x5.mp4` | 14.6 s | Spare (made from website photos, silent). Use only after real Big 30" footage is added |
| `static/ad2_vastu_elephant_4x5.png` / `_9x16.png` | Feed / Stories | |
| `static/ad3_gift_bundle_4x5.png` / `_9x16.png` | Feed / Stories | |
| `src/` | HTML templates + `render.js` | Edit the text and re-render: `node render.js in.html out.png 1080 1350` |

Raw clips are WhatsApp-compressed (478×850) and upscaled to 1080×1920. Send the **original camera files** (Google Drive or a file transfer, not WhatsApp) for sharper video.
Audio chain: high-pass 120 Hz (wind rumble) → light denoise → +3 dB at 3.5 kHz (chime clarity) → −2 dB at 250 Hz → gentle compression → loudness −14 LUFS, true peak −1.5 dB.
