# 2G Vibe – Ads Manager Setup Prompts (Week 1 Test)

Paste these into Claude in Chrome (or any browser agent) **one at a time**, while logged in to Facebook.
Before Prompt 3, download these files to your computer (from the chat or from `meta-ads/2gvibe/creatives/`):
- `video/ad1_realsound_elephant_9x16.mp4`, `video/ad1_realsound_elephant_4x5.mp4`
- `video/ad1b_listen_elephant_9x16.mp4`, `video/ad1b_listen_elephant_4x5.mp4`
- `static/ad2_vastu_elephant_4x5.png`, `static/ad2_vastu_elephant_9x16.png`
- `static/ad3_gift_bundle_4x5.png`, `static/ad3_gift_bundle_9x16.png`

---

## Prompt 1 – Campaign

```
Open https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=1548539273166298&business_id=1121948190012650
Check the top-left account selector shows ad account 1548539273166298 (2G Vibe). If it shows a different account (for example Tucker Toys), stop and tell me.

Create a new campaign:
1. Click "+ Create". Objective: "Sales". Click Continue.
2. If asked to choose a setup, choose "Manual sales campaign" (NOT "Advantage+ sales campaign").
3. Campaign name: 2GV_TEST_W1_Sales
4. Special ad categories: none.
5. Campaign details: buying type Auction. A/B test: OFF.
6. Advantage campaign budget (campaign budget optimisation): OFF — the budget will be set on the ad set.
7. Click Next. Do NOT click Publish at any point. Tell me when you reach the ad set screen.
```

## Prompt 2 – Ad set

```
On the ad set screen of campaign 2GV_TEST_W1_Sales, set:

1. Ad set name: 2GV_W1_Metro_FSR
2. Conversion location: Website.
3. Performance goal: "Maximise number of conversions".
4. Dataset / Pixel: the 2G Vibe pixel for 2gvibe.com. Conversion event: "Add to cart". (If Add to cart shows as inactive, tell me — do not pick another event.)
5. Cost per result goal: leave empty. Bid strategy: Highest volume.
6. Attribution setting: 7-day click and 1-day view.
7. Budget & schedule: Daily budget ₹200. Start date: tomorrow at 06:00 (India time). End date: 7 days after the start date at 23:59.
8. Audience:
   - Keep "Advantage+ audience" ON.
   - Audience controls: Locations → choose "People living in this location" and add these cities, each with a +25 km radius:
     Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad.
     Remove "India" (the country) if it is listed, so only these 8 cities remain.
   - Minimum age: 25.
   - Audience suggestion (optional): age 25–55, all genders, interests: Vastu shastra, Feng shui, Interior design, Home decor, Gardening.
   - Languages: leave empty.
   - Tell me the estimated audience size Meta shows.
9. Placements: choose "Manual placements" (turn OFF Advantage+ placements).
   - Devices: All devices. Platforms: Facebook and Instagram ONLY. Untick Audience Network, Messenger and Threads.
   - In the placement list, keep ONLY these ticked:
       Facebook Feed, Instagram Feed,
       Facebook Stories, Instagram Stories,
       Facebook Reels, Instagram Reels.
   - Untick everything else (Facebook profile feed, Instagram profile feed, Instagram Explore, Explore home, Facebook Marketplace, Facebook right column, video feeds, Business Explore, search results, in-stream videos, ads on Reels/overlay ads, Facebook Notifications, Messenger inbox/stories, Audience Network, Threads).
10. Click Next. Do NOT publish. Give me a short summary of every setting above as it now appears on screen.
```

## Prompt 3 – Three ads

```
You are now on the ad screen of ad set 2GV_W1_Metro_FSR. Create 3 ads. For every ad:
- Identity: Facebook Page "2G Vibe" (Page ID 897765540083386) and the 2G Vibe Instagram account.
- Destination: Website. Call to action: "Shop now".
- URL parameters (Tracking section): utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
- Tracking: the 2G Vibe pixel/dataset is ticked for website events.
- Advantage+ creative / creative enhancements: turn OFF "Add music", "Text improvements", "Add overlays", "Enhance CTA", "Visual touch-ups", "Image animation" and "Add site links". (The videos have real chime sound — Meta must not add music.)
- Multi-advertiser ads: OFF.
When a placement needs a different size, use "Edit/Customise per placement": 9:16 file for Stories and Reels, 4:5 file for Feeds.

AD 1
- Ad name: 2GV_W1_REALSOUND_REEL_ELEPH
- Format: Flexible (if available; otherwise Single image or video and use only the first video).
- Media: upload ad1_realsound_elephant_9x16.mp4, ad1_realsound_elephant_4x5.mp4, ad1b_listen_elephant_9x16.mp4, ad1b_listen_elephant_4x5.mp4
- Website URL: https://2gvibe.com/product/wind-chime-for-home-decoration-with-golden-pipes-bells-elephants/
- Primary text 1: Real sound. No music added 🔊 Turn your sound on and listen to our Elephant wind chime ring on a breezy rooftop.
6 elephant charms · 4 golden pipes · 4 bells. Vastu tip: hang it near your main door for positive energy ✨
Only ₹699 · 💵 Cash on Delivery · 🚚 Free shipping above ₹1,000
- Primary text 2: Asli awaaz, koi music nahi 🔊 Sound ON karke suniye — hamari Elephant wind chime ki sukoon bhari awaaz. Sirf ₹699, COD available 💵
- Headlines: "Hear the Real Sound 🔊" | "Elephant Wind Chime – ₹699" | "COD Available"
- Description: Free shipping above ₹1,000

AD 2
- Ad name: 2GV_W1_VASTU_STATIC_ELEPH
- Format: Single image. Media: ad2_vastu_elephant_4x5.png (Feeds) and ad2_vastu_elephant_9x16.png (Stories/Reels).
- Website URL: https://2gvibe.com/product/wind-chime-for-home-decoration-with-golden-pipes-bells-elephants/
- Primary text 1: Vastu tip ✨ Hang a metal wind chime near your main door, as per Vastu, to welcome positive energy.
Our Elephant wind chime has 6 elephant charms (a symbol of prosperity), 4 golden pipes and 4 bells.
Only ₹699 · 💵 COD available · 🚚 Free shipping above ₹1,000
- Primary text 2: वास्तु टिप ✨ मुख्य द्वार के पास विंड चाइम लगाएं और घर में सकारात्मक ऊर्जा का स्वागत करें। 6 हाथी चार्म्स वाली गोल्डन विंड चाइम — सिर्फ ₹699, कैश ऑन डिलीवरी उपलब्ध।
- Headlines: "Vastu Wind Chime – ₹699" | "Elephant Chime for Prosperity" | "Hang It Near Your Main Door"
- Description: Cash on Delivery available

AD 3
- Ad name: 2GV_W1_GIFT_STATIC_BUNDLE
- Format: Single image. Media: ad3_gift_bundle_4x5.png (Feeds) and ad3_gift_bundle_9x16.png (Stories/Reels).
- Website URL: https://2gvibe.com/product-category/wind-chimes/
- Primary text 1: One for you, one to gift 🎁
Pick any 2 wind chimes and get FREE shipping + a FREE gift.
Perfect for housewarmings, weddings and festive visits.
💵 Cash on Delivery available
- Primary text 2: Ek apne liye, ek gift ke liye 🎁 Koi bhi 2 wind chimes lo — FREE shipping + FREE gift paao. Griha pravesh aur shaadi ke liye perfect!
- Headlines: "Buy 2 → Free Shipping + Gift" | "The Perfect Housewarming Gift" | "Wind Chimes from ₹699"
- Description: Free gift on orders above ₹1,200

After all 3 ads are created:
- Open the preview for each ad in Instagram Reels, Instagram Stories and Instagram Feed and tell me if any text or button is cut off.
- Do NOT click "Publish". Leave everything as a draft and tell me "Ready for your review".
```

## Prompt 4 – Final check (run just before you publish)

```
In ad account 1548539273166298, open campaign 2GV_TEST_W1_Sales in draft and check, without changing anything:
- Budget is ₹200 daily on the ad set, start tomorrow 06:00, end after 7 days.
- Optimisation event is Add to cart on the 2G Vibe pixel.
- Locations are only the 8 metro cities (people living there), minimum age 25.
- Placements are only Facebook/Instagram Feed, Stories and Reels.
- 3 ads, each with the correct URL and the UTM parameters, and "Add music" OFF.
- A payment method is set on the ad account.
List anything that does not match. Do NOT publish.
```
After the check passes and guest checkout is enabled on the website, **you** click Publish.
