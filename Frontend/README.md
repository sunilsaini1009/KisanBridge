# 🌾 KisanBridge - Farmer-to-Buyer Digital Marketplace (Bharat)

> **"Kisan aur Consumer ke Beech ka Pul"** — Empowering Indian farmers to sell directly to households, restaurants, hostels, retailers, and event caterers with zero middlemen commission, transparent pricing, and direct logistics.

---

## 🚀 Key Features

1. **Pure HTML5, CSS3, & Modern Vanilla JavaScript (ES6+)**:
   - Zero backend server or Python requirement.
   - Built with local data caching and `localStorage` persistence.
   - 100% self-contained and ready for instant deployment on Netlify, Vercel, or GitHub Pages.

2. **Mobile-First & Ultra-Responsive**:
   - Seamless design across all devices from 320px smartphones to 1920px 4K displays.
   - Smooth native scrolling enabled (`html { scroll-behavior: smooth; }`).

3. **4-Step Interactive Farmer Registration with Voice Assistant**:
   - Web Speech API integration in **Hindi (`hi-IN`)** and **English (`en-IN`)**.
   - Speak into form inputs directly or use the *"Madad"* voice guidance button.
   - Drag-and-drop KYC document and bank passbook upload previews.
   - Automatic state saving and instant redirection to the Farmer Portal.

4. **AI Crop Image Enhancer**:
   - Enhances farmer crop photos using balanced brightness, contrast, and saturation filters to showcase fresh produce vividly.

5. **Live Transparent Price & Distance Calculator**:
   - Transparent price breakdowns: Farmer receives direct ~72% share, platform fee ~12%, cold logistics ~16%.
   - Pre-harvest advance booking mechanism (pay 30% advance, lock prices).

6. **Interactive Leaflet.js Map Integration**:
   - Live GPS location auto-detection.
   - Interactive draggable marker and click-to-pin delivery address.
   - Real-time Haversine distance and dynamic delivery fee computation.

7. **Farmer & Customer Portals**:
   - **Farmer Dashboard**: Real-time sales earnings (`₹12,450`), live mandi rates ticker, active listings controls (Add/Edit/Pause/Delete).
   - **Customer Dashboard**: Weekly Veg Box subscription (`₹299/week`), real-time order tracking, past orders timeline.

---

## 📁 Project Folder Structure

```
KisanBridge/
│
├── index.html                     # Homepage (Hero, Mandi Prices, Schemes, Crops, Role Selection)
├── mandi-prices.html              # Dedicated Mandi Prices with APMC search, location filter, & price sort
├── government-schemes.html        # Dedicated Government Schemes with accordion details & criteria
├── crop-advisory.html             # Dedicated Crop Advisory with demand filter & LocalStorage crop plan
├── farmer-register.html           # 4-Step Registration Wizard with Voice Mic & KYC
├── buyer-category.html            # Category selection (Family, Business, Hostel, Event)
├── buyer-family-register.html     # Household / Family Onboarding
├── buyer-business-register.html   # Hotel / Restaurant / Hostel B2B Onboarding
├── buyer-event-register.html      # Catering / Event Bulk Booking Onboarding
├── marketplace.html               # Product catalog with category filter, search, sort, pagination
├── product-detail.html            # Product detail, transparent price breakdown & advance booking
├── farmer-dashboard.html          # Farmer analytics, crop management & AI image booster
├── customer-dashboard.html        # Customer dashboard, Veg Box subscription & order tracking
├── cart.html                      # Interactive cart with quantity stepper & discount summary
├── checkout.html                  # Multi-step checkout with Leaflet.js map & GPS distance fee
│
├── css/
│   ├── global.css                 # CSS reset, variables, Poppins typography, animations, smooth scroll
│   ├── navbar.css                 # Sticky navbar, logo branding, links (15.2px, #4a4a68), mobile drawer
│   ├── hero.css                   # Hero section gradient, stats counter & phone mockup
│   ├── home.css                   # Compact feature preview cards & profile selection layout
│   ├── feature-pages.css          # Dedicated styling for Mandi, Schemes, and Crop Advisory pages
│   ├── cards.css                  # Product, mandi, scheme, seasonal & role select cards
│   ├── forms.css                  # Form fields, progress bar wizard, dropzones & mic buttons
│   ├── dashboard.css              # Layout for farmer and customer dashboards
│   ├── marketplace.css            # Filter toolbar, 4-col responsive grid, pagination
│   └── responsive.css             # Mobile-first breakpoints (320px, 480px, 768px, 1024px+)
│
├── js/
│   ├── main.js                    # Core utilities, toast notifications & fallback datasets
│   ├── home.js                    # Homepage preview cards navigation & scroll reveal animations
│   ├── feature-pages.js           # Mandi filters/sort, Scheme accordions, and Crop plan persistence
│   ├── voice-assistant.js         # Web Speech API Hindi/English recognition & speech synthesis
│   ├── image-enhancer.js          # AI crop image enhancement filters (brightness/contrast)
│   ├── price-calculator.js        # Transparent price breakdown & distance delivery engine
│   ├── map-integration.js         # Leaflet.js interactive map & Haversine distance calculator
│   ├── cart.js                    # Shopping cart management with LocalStorage sync
│   ├── farmer-form.js             # 4-step wizard validator & KYC file dropzones
│   ├── buyer-form.js              # Buyer onboarding logic
│   └── dashboard.js               # Dynamic farmer listing manager & customer order tracker
│
├── data/
│   ├── products.json              # 12 agricultural products with grades, reviews, locations
│   ├── mandiPrices.json           # Daily mandi rates across Azadpur, Lasalgaon, Agra, Sonipat
│   ├── schemes.json               # PM-Kisan, KCC, FPO Government scheme details
│   └── seasonalCrops.json         # Recommended seasonal crops for September
│
└── assets/
    ├── images/
    └── icons/
```

---

## 💻 How to Run Locally

### Option 1: Direct in Browser
Double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Live Server (VS Code / Python / Node)
For best experience with relative paths and browser speech APIs:
- **VS Code**: Right click `index.html` → *Open with Live Server*
- **Python**: `python -m http.server 8000` → Open `http://localhost:8000`
- **Node**: `npx serve`

---

## 🌐 Deployment Ready

### Deploy on Netlify
1. Drag and drop the `KisanBridge` folder directly to [Netlify Drop](https://app.netlify.com/drop).
2. Site goes live immediately with HTTPS.

### Deploy on Vercel
1. Run `npx vercel` in the project directory or import the repository on [Vercel](https://vercel.com).

### Deploy on GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings > Pages** and select `main` branch root.

---

## 🎨 Design System

- **Primary Green**: `#2E7D32`
- **Light Green**: `#E8F5E9`
- **Accent Green**: `#4CAF50`
- **Background Cream**: `#FFFDF5`
- **Text Dark**: `#1F2937`
- **Text Light**: `#6B7280`
- **Purple**: `#667eea`
- **Purple Dark**: `#5A67D8`
- **Fonts**: `'Inter'`, `'Plus Jakarta Sans'`, system-ui, sans-serif

---

*© 2026 KisanBridge. Direct Farm-to-Table Platform.*
