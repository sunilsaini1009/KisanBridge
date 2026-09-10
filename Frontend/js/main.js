/* ==========================================================================
   KISANBRIDGE - MAIN JAVASCRIPT (GLOBAL UTILITIES & DATA STORE)
   ========================================================================== */

// --- Default Mock Datasets (guarantees 100% functionality even when offline or file:// protocol) ---
const DEFAULT_PRODUCTS = [
  {
    id: "prod_1",
    name: "Organic Hybrid Tomato",
    grade: "Grade A",
    farmer_name: "Ramesh Kumar",
    farmer_location: "Dhanwapur, Gurugram (HR)",
    price_per_kg: 25,
    farmer_share: 18,
    platform_fee: 3,
    logistics_fee: 4,
    image: "assets/images/tomato.jpg",
    image_emoji: "🍅",
    rating: 4.8,
    reviews_count: 142,
    quantity_available_kg: 850,
    harvest_date: "10-15 September 2026",
    category: "vegetables",
    is_organic: true,
    is_local: true,
    description: "Farm-fresh, pesticide-free ripe red tomatoes handpicked at optimal maturity. High lycopene content, firm texture, and juicy pulp perfect for salads and rich curries."
  },
  {
    id: "prod_2",
    name: "Nasik Red Onion",
    grade: "Grade A",
    farmer_name: "Suresh Patil",
    farmer_location: "Lasalgaon, Nashik (MH)",
    price_per_kg: 18,
    farmer_share: 13,
    platform_fee: 2,
    logistics_fee: 3,
    image: "assets/images/onion.jpg",
    image_emoji: "🧅",
    rating: 4.7,
    reviews_count: 98,
    quantity_available_kg: 1500,
    harvest_date: "05-10 September 2026",
    category: "vegetables",
    is_organic: false,
    is_local: false,
    description: "Aromatic Nasik red onions cured under sun for extended shelf-life and intense flavor punch. Naturally rich in quercetin."
  },
  {
    id: "prod_3",
    name: "Agra Kufri Jyoti Potato",
    grade: "Grade A",
    farmer_name: "Baldev Singh",
    farmer_location: "Khandauli, Agra (UP)",
    price_per_kg: 20,
    farmer_share: 14,
    platform_fee: 2.5,
    logistics_fee: 3.5,
    image: "assets/images/potato.jpg",
    image_emoji: "🥔",
    rating: 4.6,
    reviews_count: 210,
    quantity_available_kg: 2200,
    harvest_date: "Ready for dispatch",
    category: "vegetables",
    is_organic: false,
    is_local: true,
    description: "Golden skin, thin peel, low sugar content potatoes ideal for boiling, frying, and everyday sabzis without turning sweet."
  },
  {
    id: "prod_4",
    name: "Crisp Green Cabbage",
    grade: "Grade A",
    farmer_name: "Om Prakash",
    farmer_location: "Sonipat, Haryana (HR)",
    price_per_kg: 15,
    farmer_share: 10.5,
    platform_fee: 2,
    logistics_fee: 2.5,
    image: "assets/images/cabbage.jpg",
    image_emoji: "🥦",
    rating: 4.5,
    reviews_count: 76,
    quantity_available_kg: 600,
    harvest_date: "Harvested Daily",
    category: "vegetables",
    is_organic: true,
    is_local: true,
    description: "Tightly packed fresh green heads cultivated using compost enrichment. Crisp crunch and sweet mild undertone."
  },
  {
    id: "prod_5",
    name: "Polyhouse Seedless Cucumber",
    grade: "Grade A",
    farmer_name: "Mahesh Choudhary",
    farmer_location: "Jaipur Outskirts (RJ)",
    price_per_kg: 28,
    farmer_share: 20,
    platform_fee: 3.5,
    logistics_fee: 4.5,
    image: "assets/images/cucumber.jpg",
    image_emoji: "🥒",
    rating: 4.9,
    reviews_count: 115,
    quantity_available_kg: 400,
    harvest_date: "08-12 September 2026",
    category: "vegetables",
    is_organic: true,
    is_local: false,
    description: "Crisp, thin-skinned Dutch cucumber grown in climate-controlled polyhouses. Zero bitterness and 95% natural hydration."
  },
  {
    id: "prod_6",
    name: "Delhi Local Red Carrot",
    grade: "Grade A",
    farmer_name: "Jagdish Prasad",
    farmer_location: "Nuh, Haryana (HR)",
    price_per_kg: 32,
    farmer_share: 23,
    platform_fee: 4,
    logistics_fee: 5,
    image: "assets/images/carrot.jpg",
    image_emoji: "🥕",
    rating: 4.8,
    reviews_count: 64,
    quantity_available_kg: 750,
    harvest_date: "15-20 September 2026",
    category: "vegetables",
    is_organic: true,
    is_local: true,
    description: "Sweet, naturally deep red carrots packed with beta carotene. Perfect for juicing, salads, and traditional Gajar Ka Halwa."
  },
  {
    "id": "prod_7",
    "name": "Kinnaur Royal Delicious Apple",
    "grade": "Grade A",
    "farmer_name": "Tenzin Negi",
    "farmer_location": "Kalpa, Kinnaur (HP)",
    "price_per_kg": 135,
    "farmer_share": 105,
    "platform_fee": 12,
    "logistics_fee": 18,
    image: "assets/images/apple.jpg",
    "image_emoji": "🍎",
    "rating": 4.9,
    "reviews_count": 320,
    "quantity_available_kg": 1800,
    "harvest_date": "Fresh Mountain Pick",
    "category": "fruits",
    "is_organic": true,
    "is_local": false,
    "description": "High altitude orchard apples with crisp bite, natural wax-free sheen, and sweet aromatic nectar from the Himalayas."
  },
  {
    "id": "prod_8",
    "name": "Grand Naine Robusta Banana",
    "grade": "Grade A",
    "farmer_name": "Gopalakrishnan",
    "farmer_location": "Theni, Tamil Nadu (TN)",
    "price_per_kg": 38,
    "farmer_share": 27,
    "platform_fee": 4,
    "logistics_fee": 7,
    image: "assets/images/banana.jpg",
    "image_emoji": "🍌",
    "rating": 4.7,
    "reviews_count": 189,
    "quantity_available_kg": 3000,
    "harvest_date": "Daily Ripening Batches",
    "category": "fruits",
    "is_organic": false,
    "is_local": false,
    "description": "Naturally carbide-free ripened yellow bananas rich in potassium and instant energy. Clean golden peel."
  },
  {
    "id": "prod_9",
    "name": "Nagpur Fresh Mandarin Orange",
    "grade": "Grade A",
    "farmer_name": "Prashant Deshmukh",
    "farmer_location": "Katol, Nagpur (MH)",
    "price_per_kg": 65,
    "farmer_share": 48,
    "platform_fee": 7,
    "logistics_fee": 10,
    image: "assets/images/orange.jpg",
    "image_emoji": "🍊",
    "rating": 4.6,
    "reviews_count": 145,
    "quantity_available_kg": 1200,
    "harvest_date": "12-18 September 2026",
    "category": "fruits",
    "is_organic": true,
    "is_local": false,
    "description": "Loose-skinned succulent Nagpur santra bursting with vitamin C and refreshing citrus juice."
  },
  {
    "id": "prod_10",
    "name": "Hydroponic Tender Spinach",
    "grade": "Grade A",
    "farmer_name": "Ananya Sharma",
    "farmer_location": "Sohna Farms, Gurugram (HR)",
    "price_per_kg": 35,
    "farmer_share": 26,
    "platform_fee": 4,
    "logistics_fee": 5,
    image: "assets/images/spinach.jpg",
    "image_emoji": "🥬",
    "rating": 4.9,
    "reviews_count": 93,
    "quantity_available_kg": 250,
    "harvest_date": "Harvested Same Morning",
    "category": "organic",
    "is_organic": true,
    "is_local": true,
    "description": "Zero chemical, mineral-rich tender baby spinach leaves with intact roots for maximum freshness."
  },
  {
    "id": "prod_11",
    "name": "Snowball Pure White Cauliflower",
    "grade": "Grade A",
    "farmer_name": "Ratan Lal",
    "farmer_location": "Meerut, Uttar Pradesh (UP)",
    "price_per_kg": 28,
    "farmer_share": 20,
    "platform_fee": 3.5,
    "logistics_fee": 4.5,
    image: "assets/images/cauliflower.jpg",
    "image_emoji": "🥦",
    "rating": 4.5,
    "reviews_count": 82,
    "quantity_available_kg": 700,
    "harvest_date": "Ready for dispatch",
    "category": "vegetables",
    "is_organic": false,
    "is_local": true,
    "description": "Compact white curd surrounded by protective green wrapper leaves. Free from dark spots and blemishes."
  },
  {
    "id": "prod_12",
    "name": "Purple Bharta Brinjal",
    "grade": "Grade A",
    "farmer_name": "Devendra Yadav",
    "farmer_location": "Alwar, Rajasthan (RJ)",
    "price_per_kg": 22,
    "farmer_share": 15.5,
    "platform_fee": 2.5,
    "logistics_fee": 4,
    image: "assets/images/brinjal.jpg",
    "image_emoji": "🍆",
    "rating": 4.6,
    "reviews_count": 56,
    "quantity_available_kg": 500,
    "harvest_date": "09-14 September 2026",
    "category": "local",
    "is_organic": true,
    "is_local": true,
    "description": "Glossy, seed-sparse large purple brinjals ideal for roasting and authentic smoky baingan bharta."
  }
];

const DEFAULT_MANDI_PRICES = [
  { crop: "Tomato (Hybrid)", price_per_kg: 25, prev_price_per_kg: 28, trend: "down", mandi_location: "Azadpur Mandi, Delhi", date: "01 September 2026", icon: "🍅", state: "Delhi" },
  { crop: "Nasik Red Onion", price_per_kg: 18, prev_price_per_kg: 16, trend: "up", mandi_location: "Lasalgaon APMC, Nashik", date: "01 September 2026", icon: "🧅", state: "Maharashtra" },
  { crop: "Potato (Jyoti)", price_per_kg: 20, prev_price_per_kg: 20, trend: "stable", mandi_location: "Fatehabad Mandi, Agra", date: "01 September 2026", icon: "🥔", state: "Uttar Pradesh" },
  { crop: "Green Cabbage", price_per_kg: 15, prev_price_per_kg: 17, trend: "down", mandi_location: "Sonipat Grain & Veg Mandi", date: "01 September 2026", icon: "🥦", state: "Haryana" }
];

const DEFAULT_SCHEMES = [
  {
    id: "scheme_1",
    name: "PM-Kisan Samman Nidhi",
    benefit: "₹6,000 / year direct cash benefit",
    eligibility: "All landholding farmer families with cultivable land",
    apply_link: "https://pmkisan.gov.in",
    icon_emoji: "💰",
    description: "Financial assistance disbursed in 3 equal installments directly into Aadhaar-linked bank accounts."
  },
  {
    id: "scheme_2",
    name: "Kisan Credit Card (KCC)",
    benefit: "Low interest institutional loan at 4% p.a.",
    eligibility: "Farmers, sharecroppers, tenant farmers, and SHGs",
    apply_link: "https://www.myscheme.gov.in/schemes/kcc",
    icon_emoji: "🏦",
    description: "Flexible, hassle-free credit facility up to ₹3,00,000 for crop inputs and post-harvest working capital."
  },
  {
    id: "scheme_3",
    name: "FPO Promotion & Formation Scheme",
    benefit: "Up to ₹18 Lakh matching equity grant & support",
    eligibility: "Groups of 300+ farmers in plains / 100+ in hilly areas",
    apply_link: "https://enam.gov.in",
    icon_emoji: "🤝",
    description: "Empowering farmer groups with bulk buying leverage and institutional direct-to-consumer infrastructure."
  }
];

const DEFAULT_SEASONAL_CROPS = [
  { crop: "Hybrid Tomato", avg_price_per_kg: 25, demand: "High", growing_time_days: "75-90 Days", image_emoji: "🍅" },
  { crop: "Nasik Red Onion", avg_price_per_kg: 18, demand: "Very High", growing_time_days: "110-125 Days", image_emoji: "🧅" },
  { crop: "Early Potato", avg_price_per_kg: 20, demand: "Medium", growing_time_days: "80-100 Days", image_emoji: "🥔" },
  { crop: "Green Cabbage", avg_price_per_kg: 15, demand: "High", growing_time_days: "65-75 Days", image_emoji: "🥦" }
];

// --- LocalStorage Helpers ---
const LocalStorageManager = {
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error("LocalStorage save error", e);
      return false;
    }
  },
  load(key, fallback = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error("LocalStorage load error", e);
      return fallback;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("LocalStorage remove error", e);
    }
  }
};

// --- Currency and Number Formatter ---
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// --- Date Formatter ---
function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
}

// --- Toast Notification Display ---
function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ==========================================================================
// KISANBRIDGE - REUSABLE DYNAMIC NAVBAR & LANGUAGE SELECTOR SYSTEM
// ==========================================================================

// 1. getCurrentUser()
function getCurrentUser() {
  try {
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    if (user && (user.role === "farmer" || user.role === "buyer")) {
      return user;
    }
    return null;
  } catch (e) {
    return null;
  }
}

// Farmer Gate: Access Protection for Farmer-only pages
function requireFarmerAccess() {
  const user = getCurrentUser();

  if (!user || user.role !== "farmer" || user.registered !== true) {
    const currentPage = (typeof window !== "undefined" && window.location && window.location.pathname)
      ? (window.location.pathname.split("/").pop() || "farmer-dashboard.html")
      : "farmer-dashboard.html";
    try {
      localStorage.setItem("redirectAfterFarmerRegistration", currentPage);
    } catch (e) {}

    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.style.display = "none";
    }
    if (typeof window !== "undefined" && window.location) {
      window.location.href = "farmer-register.html";
    }
    return false;
  }

  return true;
}

// Redirect already registered farmer away from registration page
function redirectRegisteredFarmerFromRegistration() {
  const user = getCurrentUser();
  if (user && user.role === "farmer" && user.registered === true) {
    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.style.display = "none";
    }
    if (typeof window !== "undefined" && window.location) {
      window.location.href = "farmer-dashboard.html";
    }
    return true;
  }
  return false;
}

// Reusable farmer registration saver
function saveFarmerRegistration(data) {
  if (!data || !data.name || !data.phone) return false;

  const currentUserData = {
    name: data.name,
    role: "farmer",
    registered: true,
    phone: data.phone,
    village: data.village,
    district: data.district,
    state: data.state,
    primaryCrop: data.primaryCrop,
    farmSize: data.farmSize
  };
  if (data.email) currentUserData.email = data.email;
  Object.keys(currentUserData).forEach(key => {
    if (currentUserData[key] === undefined) delete currentUserData[key];
  });
  localStorage.setItem("currentUser", JSON.stringify(currentUserData));

  const farmerProfileData = {
    name: data.name,
    phone: data.phone,
    village: data.village,
    district: data.district,
    state: data.state,
    primaryCrop: data.primaryCrop,
    farmSize: data.farmSize,
    registeredAt: new Date().toISOString()
  };
  if (data.email) farmerProfileData.email = data.email;
  Object.keys(farmerProfileData).forEach(key => {
    if (farmerProfileData[key] === undefined) delete farmerProfileData[key];
  });
  localStorage.setItem("farmerProfile", JSON.stringify(farmerProfileData));

  if (data.selectedLanguage) {
    localStorage.setItem("selectedLanguage", data.selectedLanguage);
  }

  return true;
}

// Recognized & Official Languages of India (8th Schedule + Associate Official & Regional)
const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", native: "English", voice: "en-IN" },
  { code: "hi", label: "Hindi", native: "हिन्दी", voice: "hi-IN" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ", voice: "pa-IN" },
  { code: "bn", label: "Bengali", native: "বাংলা", voice: "bn-IN" },
  { code: "mr", label: "Marathi", native: "मराठी", voice: "mr-IN" },
  { code: "te", label: "Telugu", native: "తెలుగు", voice: "te-IN" },
  { code: "ta", label: "Tamil", native: "தமிழ்", voice: "ta-IN" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી", voice: "gu-IN" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ", voice: "kn-IN" },
  { code: "ml", label: "Malayalam", native: "മലയാളം", voice: "ml-IN" },
  { code: "or", label: "Odia", native: "ଓଡ଼ିଆ", voice: "or-IN" },
  { code: "as", label: "Assamese", native: "অসমীয়া", voice: "as-IN" },
  { code: "bho", label: "Bhojpuri", native: "भोजपुरी", voice: "hi-IN" },
  { code: "mai", label: "Maithili", native: "मैथिली", voice: "hi-IN" },
  { code: "doi", label: "Dogri", native: "डोगरी", voice: "hi-IN" },
  { code: "gom", label: "Konkani", native: "कोंकणी", voice: "gom-IN" },
  { code: "ne", label: "Nepali", native: "नेपाली", voice: "ne-NP" },
  { code: "ur", label: "Urdu", native: "اردو", voice: "ur-IN" },
  { code: "sd", label: "Sindhi", native: "سنڌي", voice: "sd-IN" },
  { code: "sa", label: "Sanskrit", native: "संस्कृतम्", voice: "hi-IN" },
  { code: "sat", label: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ", voice: "sat-IN" },
  { code: "mni-Mtei", label: "Manipuri", native: "মৈতৈলোন্", voice: "mni-IN" },
  { code: "ks", label: "Kashmiri", native: "कॉशुर / كٲشُر", voice: "ks-IN" }
];

// 2. getSelectedLanguage()
function getSelectedLanguage() {
  const lang = localStorage.getItem("selectedLanguage");
  const validCodes = SUPPORTED_LANGUAGES.map(l => l.code);
  return validCodes.includes(lang) ? lang : "en";
}

// Google Translate Cookie management helper
function clearGoogleTranslateCookie() {
  const host = window.location.hostname;
  const isLocal = (host === 'localhost' || host === '127.0.0.1');

  // Clear cookie on standard root path
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "googtrans=/en/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  if (!isLocal && host) {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${host}; path=/;`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${host}; path=/;`;
    document.cookie = `googtrans=/en/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${host}; path=/;`;
    document.cookie = `googtrans=/en/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${host}; path=/;`;
  }
}

function setGoogleTranslateCookie(lang) {
  if (lang === 'en') {
    clearGoogleTranslateCookie();
    return;
  }

  const host = window.location.hostname;
  const isLocal = (host === 'localhost' || host === '127.0.0.1');
  const val = `/en/${lang}`;

  document.cookie = `googtrans=${val}; path=/;`;
  if (!isLocal && host) {
    document.cookie = `googtrans=${val}; domain=${host}; path=/;`;
    document.cookie = `googtrans=${val}; domain=.${host}; path=/;`;
  }
}

// Trigger Google Translate dropdown element programmatically
function triggerGoogleTranslateChange(langCode) {
  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    const targetVal = (langCode === 'en') ? '' : langCode;
    combo.value = targetVal;
    combo.dispatchEvent(new Event('change', { bubbles: true }));
    combo.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  }
  return false;
}

// 3. setSelectedLanguage(languageCode)
function setSelectedLanguage(languageCode) {
  const validCodes = SUPPORTED_LANGUAGES.map(l => l.code);
  if (!validCodes.includes(languageCode)) return;

  const prevLang = localStorage.getItem("selectedLanguage") || "en";
  localStorage.setItem("selectedLanguage", languageCode);

  // Update all language select elements on the page (desktop & mobile)
  document.querySelectorAll(".language-select").forEach(select => {
    select.value = languageCode;
  });

  // Sync Voice Assistant language if available
  const langObj = SUPPORTED_LANGUAGES.find(l => l.code === languageCode);
  if (window.VoiceAssistant && typeof window.VoiceAssistant.setLanguage === 'function' && langObj) {
    window.VoiceAssistant.setLanguage(langObj.voice);
  }

  // If user selects English from another language:
  if (languageCode === 'en') {
    clearGoogleTranslateCookie();
    showLanguageToast("Language changed to English");
    if (prevLang !== 'en') {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = '';
        combo.dispatchEvent(new Event('change', { bubbles: true }));
      }
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
    return;
  }

  // Switching to an Indian language:
  setGoogleTranslateCookie(languageCode);
  const langName = langObj ? `${langObj.native} (${langObj.label})` : languageCode;
  showLanguageToast(`Language changed to ${langName}`);

  const triggered = triggerGoogleTranslateChange(languageCode);
  if (!triggered) {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (triggerGoogleTranslateChange(languageCode) || attempts > 10) {
        clearInterval(interval);
      }
    }, 200);
  }
}

// Non-blocking language toast
function showLanguageToast(msg) {
  let toast = document.getElementById("kisan-language-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "kisan-language-toast";
    toast.className = "kisan-lang-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// 4. renderLanguageSelector(selectId)
function renderLanguageSelector(selectId = "languageSelect") {
  const currentLang = getSelectedLanguage();
  const optionsHtml = SUPPORTED_LANGUAGES.map(lang => `
    <option value="${lang.code}" ${currentLang === lang.code ? "selected" : ""}>
      ${lang.native} (${lang.label})
    </option>
  `).join("");

  return `
    <div class="language-selector notranslate" translate="no" title="Choose Language / भाषा चुनें">
      <span class="language-icon" aria-hidden="true">🌐</span>
      <select id="${selectId}" class="language-select notranslate" translate="no" aria-label="Select language">
        ${optionsHtml}
      </select>
    </div>
  `;
}

// 5. initializeLanguageSelector()
function initializeLanguageSelector() {
  const currentLang = getSelectedLanguage();
  document.querySelectorAll(".language-select").forEach(select => {
    // Populate options if not present or incomplete
    if (select.options.length < SUPPORTED_LANGUAGES.length) {
      select.innerHTML = SUPPORTED_LANGUAGES.map(lang => `
        <option value="${lang.code}" ${currentLang === lang.code ? "selected" : ""}>
          ${lang.native} (${lang.label})
        </option>
      `).join("");
    }
    select.value = currentLang;

    if (select._hasChangeListener) return;
    select._hasChangeListener = true;
    select.addEventListener("change", function() {
      setSelectedLanguage(this.value);
    });
  });
}

// --- Translation Engine Initializer (Google Translate Integration) ---
function initTranslationEngine() {
  // 1. Create hidden element for Google Translate
  let elem = document.getElementById("google_translate_element");
  if (!elem) {
    elem = document.createElement("div");
    elem.id = "google_translate_element";
    elem.className = "notranslate";
    elem.style.display = "none";
    document.body.appendChild(elem);
  }

  // 2. Ensure cookie is synced with current preference
  const currentLang = getSelectedLanguage();
  if (currentLang && currentLang !== "en") {
    setGoogleTranslateCookie(currentLang);
  } else {
    clearGoogleTranslateCookie();
  }

  // 3. Google Translate callback
  window.googleTranslateElementInit = function() {
    try {
      const allCodes = SUPPORTED_LANGUAGES.map(l => l.code).join(',');
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: allCodes,
        autoDisplay: false
      }, 'google_translate_element');

      // Check if translation is needed on page startup
      setTimeout(() => {
        const lang = getSelectedLanguage();
        if (lang && lang !== 'en') {
          triggerGoogleTranslateChange(lang);
        }
      }, 400);
    } catch (e) {
      console.warn("Translation engine init notice:", e);
    }
  };

  // 4. Inject Google Translate script if not loaded
  if (!document.getElementById("google-translate-script")) {
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.type = "text/javascript";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }
}




// 6. renderNavbar()
function renderNavbar() {
  const navbarContainer = document.querySelector(".navbar-container") || document.getElementById("navbarContainer");
  if (!navbarContainer) return;

  const user = getCurrentUser();
  const role = user ? user.role : "visitor";

  let desktopNavHtml = "";
  let mobileDrawerHtml = "";

  // 1. Center Links: Always present (Home, Marketplace, Farmer, Buyer)
  const centerNavHtml = `
    <nav class="nav-center-wrapper desktop-nav" aria-label="Primary Navigation">
      <ul class="nav-menu nav-links nav-center-links">
        <li><a href="index.html" class="nav-link" data-nav="home">Home</a></li>
        <li><a href="marketplace.html" class="nav-link" data-nav="marketplace">Marketplace</a></li>
        <li><a href="farmer-register.html" class="nav-link" data-nav="farmer">Farmer</a></li>
        <li><a href="buyer-category.html" class="nav-link" data-nav="buyer">Buyer</a></li>
      </ul>
    </nav>
  `;

  // 2. Right Group: Contact + Language Selector (Profile and Cart removed as requested)
  desktopNavHtml = `
    ${centerNavHtml}
    <div class="navbar-right-group desktop-nav">
      <a href="index.html#contact" class="nav-link" data-nav="contact">Contact</a>
      ${renderLanguageSelector("languageSelect")}
    </div>
  `;

  // 3. Mobile Drawer Links
  mobileDrawerHtml = `
    <ul class="mobile-nav-links">
      <li><a href="index.html" class="nav-link" data-nav="home">Home</a></li>
      <li><a href="marketplace.html" class="nav-link" data-nav="marketplace">Marketplace</a></li>
      <li><a href="farmer-register.html" class="nav-link" data-nav="farmer">Farmer</a></li>
      <li><a href="buyer-category.html" class="nav-link" data-nav="buyer">Buyer</a></li>
      <li><a href="index.html#contact" class="nav-link" data-nav="contact">Contact</a></li>
    </ul>
    <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border-light, #E5E7EB);">
      ${renderLanguageSelector("mobileLanguageSelect")}
    </div>
  `;

  // Render inside navbar container
  navbarContainer.innerHTML = `
    <a href="index.html" class="nav-logo" aria-label="KisanBridge Home">
      <span class="logo-icon">🌾</span>
      <span>Kisan<span class="accent">Bridge</span></span>
    </a>
    ${desktopNavHtml}
    <button class="hamburger-btn" id="hamburger-btn" aria-label="Toggle navigation menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  `;

  // Render or update mobile drawer
  let mobileDrawer = document.getElementById("mobile-nav-drawer");
  if (!mobileDrawer) {
    mobileDrawer = document.createElement("div");
    mobileDrawer.id = "mobile-nav-drawer";
    mobileDrawer.className = "mobile-nav-drawer";
    const header = document.querySelector(".site-header");
    if (header) {
      header.after(mobileDrawer);
    } else {
      navbarContainer.after(mobileDrawer);
    }
  }
  mobileDrawer.innerHTML = mobileDrawerHtml;
}

// 7. updateCartCount()
function updateCartCount() {
  const cart = LocalStorageManager.load("kisan_cart", []);
  const totalCount = Array.isArray(cart) ? cart.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0) : 0;

  const badges = document.querySelectorAll(".nav-cart-badge, .cart-count, .mobile-cart-badge");
  badges.forEach(badge => {
    badge.textContent = totalCount;
    if (totalCount > 0) {
      badge.style.display = "flex";
      badge.classList.add("bump");
      setTimeout(() => badge.classList.remove("bump"), 300);
    } else {
      badge.textContent = "0";
    }
  });
}

// 8. setActiveNavLink()
function setActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const currentHash = window.location.hash;

  // Clear active on all nav links
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
  });

  const isFarmer = getCurrentUser()?.role === "farmer";
  const isBuyer = getCurrentUser()?.role === "buyer";

  document.querySelectorAll(".nav-link").forEach(link => {
    const navType = link.getAttribute("data-nav");

    if (currentPath === "index.html" || currentPath === "") {
      if (currentHash === "#contact") {
        if (navType === "contact") link.classList.add("active");
      } else {
        if (navType === "home") link.classList.add("active");
      }
    } else if (currentPath === "marketplace.html" || currentPath === "product-detail.html") {
      if (navType === "marketplace") link.classList.add("active");
    } else if (currentPath === "farmer-register.html") {
      if (navType === "farmer") link.classList.add("active");
    } else if (currentPath.includes("buyer-") || currentPath === "buyer-category.html") {
      if (navType === "buyer") link.classList.add("active");
    } else if (currentPath === "farmer-dashboard.html") {
      if (navType === "profile" && isFarmer) link.classList.add("active");
    } else if (currentPath === "customer-dashboard.html") {
      if (currentHash === "#orders") {
        if (navType === "my-orders") link.classList.add("active");
      } else {
        if (navType === "profile" && isBuyer) link.classList.add("active");
      }
    } else if (currentPath === "cart.html" || currentPath === "checkout.html") {
      if (navType === "cart") link.classList.add("active");
    }
  });
}

// --- Mobile Bottom Navigation Auto-Injector ---
function initMobileNavigation() {
  const user = getCurrentUser();
  // Bottom navigation only if needed
  let bottomNav = document.querySelector(".mobile-bottom-nav");
  if (!bottomNav) {
    bottomNav = document.createElement("nav");
    bottomNav.className = "mobile-bottom-nav";
    
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    
    if (user && user.role === "farmer") {
      bottomNav.innerHTML = `
        <a href="index.html" class="mobile-bottom-nav-item ${currentPath === "index.html" || currentPath === "" ? "active" : ""}">
          <span class="nav-icon">🌾</span>
          <span>Home</span>
        </a>
        <a href="marketplace.html" class="mobile-bottom-nav-item ${currentPath === "marketplace.html" ? "active" : ""}">
          <span class="nav-icon">🛒</span>
          <span>Market</span>
        </a>
        <a href="cart.html" class="mobile-bottom-nav-item ${currentPath === "cart.html" ? "active" : ""}">
          <span class="nav-icon">🛍️</span>
          <span>Cart</span>
          <span class="nav-cart-badge mobile-cart-badge">0</span>
        </a>
        <a href="farmer-dashboard.html" class="mobile-bottom-nav-item ${currentPath.includes("farmer") ? "active" : ""}">
          <span class="nav-icon">👨🌾</span>
          <span>Profile</span>
        </a>
      `;
    } else if (user && user.role === "buyer") {
      bottomNav.innerHTML = `
        <a href="index.html" class="mobile-bottom-nav-item ${currentPath === "index.html" || currentPath === "" ? "active" : ""}">
          <span class="nav-icon">🌾</span>
          <span>Home</span>
        </a>
        <a href="marketplace.html" class="mobile-bottom-nav-item ${currentPath === "marketplace.html" ? "active" : ""}">
          <span class="nav-icon">🛒</span>
          <span>Market</span>
        </a>
        <a href="cart.html" class="mobile-bottom-nav-item ${currentPath === "cart.html" ? "active" : ""}">
          <span class="nav-icon">🛍️</span>
          <span>Cart</span>
          <span class="nav-cart-badge mobile-cart-badge">0</span>
        </a>
        <a href="customer-dashboard.html" class="mobile-bottom-nav-item ${currentPath.includes("customer") ? "active" : ""}">
          <span class="nav-icon">👤</span>
          <span>Profile</span>
        </a>
      `;
    } else {
      bottomNav.innerHTML = `
        <a href="index.html" class="mobile-bottom-nav-item ${currentPath === "index.html" || currentPath === "" ? "active" : ""}">
          <span class="nav-icon">🌾</span>
          <span>Home</span>
        </a>
        <a href="marketplace.html" class="mobile-bottom-nav-item ${currentPath === "marketplace.html" ? "active" : ""}">
          <span class="nav-icon">🛒</span>
          <span>Market</span>
        </a>
        <a href="farmer-register.html" class="mobile-bottom-nav-item ${currentPath.includes("farmer") ? "active" : ""}">
          <span class="nav-icon">👨🌾</span>
          <span>Farmer</span>
        </a>
        <a href="buyer-category.html" class="mobile-bottom-nav-item ${currentPath.includes("buyer") ? "active" : ""}">
          <span class="nav-icon">👤</span>
          <span>Buyer</span>
        </a>
      `;
    }
    document.body.appendChild(bottomNav);
  }

  // Floating Action Button (FAB) for Voice Help & Support
  let fab = document.querySelector(".mobile-floating-fab");
  if (!fab) {
    fab = document.createElement("button");
    fab.className = "mobile-floating-fab";
    fab.setAttribute("aria-label", "Voice Help & Support");
    fab.innerHTML = "🎙️";
    fab.title = "Kisan Voice Assistant & Helpline";
    fab.onclick = () => {
      if (window.VoiceAssistant && typeof VoiceAssistant.speakGuidance === "function") {
        VoiceAssistant.speakGuidance("नमस्ते! KisanBridge में आपका स्वागत है। आप सीधे खेत से ताज़ा फसलें खरीद सकते हैं या किसान के रूप में फसल बेच सकते हैं।", "hi-IN");
        showToast("🎙️ Kisan Voice Assistant active: Playing Hindi assistance...", "info");
      } else {
        showToast("📞 Toll-Free Helpline: 1800-180-1551", "info");
      }
    };
    document.body.appendChild(fab);
  }
}

// --- Mobile Navigation Drawer Toggle ---
function initNavbar() {
  const hamburger = document.getElementById("hamburger-btn");
  const mobileDrawer = document.getElementById("mobile-nav-drawer");

  if (hamburger && mobileDrawer) {
    hamburger.onclick = () => {
      hamburger.classList.toggle("active");
      mobileDrawer.classList.toggle("open");
    };

    // Close on link click
    mobileDrawer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileDrawer.classList.remove("open");
      });
    });
  }

  // Header scroll shadow effect
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
}

// ==========================================================================
// KISANBRIDGE 0ms INSTANT DATA ENGINE (STALE-WHILE-REVALIDATE + PARALLEL BATCH)
// ==========================================================================

const InstantDataEngine = {
  memoryCache: new Map(),

  // Get data immediately (0ms) from RAM -> LocalStorage -> Embedded Fallback
  getInstant(filename, defaultFallback) {
    const cacheKey = `kisan_cache_${filename}`;

    // 1. Check RAM memory cache (Fastest: ~0.01ms)
    if (this.memoryCache.has(cacheKey)) {
      return this.memoryCache.get(cacheKey);
    }

    // 2. Check persistent LocalStorage cache (~0.5ms)
    try {
      const stored = localStorage.getItem(cacheKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.data) {
          this.memoryCache.set(cacheKey, parsed.data);
          return parsed.data;
        }
      }
    } catch (e) {
      console.warn("Cache read error:", e);
    }

    // 3. Instant embedded fallback (Guaranteed 0ms render)
    if (defaultFallback) {
      this.memoryCache.set(cacheKey, defaultFallback);
      return defaultFallback;
    }

    return null;
  },

  // Save fresh data to RAM + LocalStorage
  saveCache(filename, data) {
    const cacheKey = `kisan_cache_${filename}`;
    this.memoryCache.set(cacheKey, data);
    try {
      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: Date.now(),
        data: data
      }));
    } catch (e) {
      // Ignore private mode or storage limit errors
    }
  },

  // Non-blocking background fetch with timeout abort (never blocks UI)
  async revalidate(filename, defaultFallback, onUpdateCallback = null) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
      const response = await fetch(`./data/${filename}`, {
        signal: controller.signal,
        headers: { 'Cache-Control': 'max-age=60' }
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const freshData = await response.json();
      
      this.saveCache(filename, freshData);

      if (typeof onUpdateCallback === 'function') {
        onUpdateCallback(freshData);
      }
      return freshData;
    } catch (err) {
      clearTimeout(timeoutId);
      return this.getInstant(filename, defaultFallback);
    }
  },

  // Parallel Batch Revalidator: runs all fetches in parallel in 1 network tick
  revalidateAll(configs) {
    return Promise.allSettled(
      configs.map(({ filename, fallback, callback }) => 
        this.revalidate(filename, fallback, callback)
      )
    );
  }
};

// Drop-in replacement for fetchDataset: returns in 0ms if cached, revalidates silently in background
async function fetchDataset(filename, defaultFallback) {
  const cached = InstantDataEngine.getInstant(filename, defaultFallback);
  // Revalidate in background without awaiting
  InstantDataEngine.revalidate(filename, defaultFallback).catch(() => {});
  return cached;
}

// --- Dynamic Section Renderers (Synchronous & Smooth) ---
function renderMandiGrid(mandiData) {
  const mandiContainer = document.getElementById('mandi-prices-grid');
  if (!mandiContainer || !Array.isArray(mandiData)) return;

  mandiContainer.innerHTML = mandiData.slice(0, 4).map(item => `
    <div class="mandi-price-card">
      <div class="mandi-card-header">
        <div class="mandi-crop-icon">${item.icon || '🌾'}</div>
        <span class="badge ${item.trend === 'up' ? 'badge-amber' : 'badge-green'}">
          ${item.trend === 'up' ? '▲ Up' : (item.trend === 'down' ? '▼ Best Value' : '● Stable')}
        </span>
      </div>
      <h4>${item.crop}</h4>
      <div class="mandi-price-display">
        <span class="mandi-price-value">₹${item.price_per_kg}</span>
        <span class="mandi-price-unit"> / kg</span>
      </div>
      <div class="mandi-location-tag">
        📍 ${item.mandi_location}
      </div>
    </div>
  `).join('');
}

function renderSchemesGrid(schemesData) {
  const schemesContainer = document.getElementById('schemes-grid');
  if (!schemesContainer || !Array.isArray(schemesData)) return;

  schemesContainer.innerHTML = schemesData.map(scheme => `
    <div class="scheme-card">
      <div class="scheme-header">
        <div class="scheme-icon">${scheme.icon_emoji || '🏛️'}</div>
        <div>
          <h3 class="scheme-title">${scheme.name}</h3>
          <div class="scheme-benefit">${scheme.benefit}</div>
        </div>
      </div>
      <p class="scheme-eligibility">${scheme.description || scheme.eligibility}</p>
      <a href="${scheme.apply_link}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-green btn-sm" style="margin-top: auto; align-self: flex-start;">
        Apply Now ↗
      </a>
    </div>
  `).join('');
}

function renderSeasonalGrid(seasonalData) {
  const seasonalContainer = document.getElementById('seasonal-crops-grid');
  if (!seasonalContainer || !Array.isArray(seasonalData)) return;

  seasonalContainer.innerHTML = seasonalData.slice(0, 4).map(crop => `
    <div class="seasonal-crop-card">
      <span class="badge badge-green seasonal-demand-badge">${crop.demand} Demand</span>
      <div class="seasonal-crop-icon">${crop.image_emoji || '🌱'}</div>
      <h3>${crop.crop}</h3>
      <p style="font-size: 0.9rem; color: var(--text-light); margin-top: 4px;">Harvest cycle: ${crop.growing_time_days}</p>
      <div class="seasonal-meta-row">
        <span>Avg Market Rate:</span>
        <strong class="text-green">₹${crop.avg_price_per_kg}/kg</strong>
      </div>
    </div>
  `).join('');
}

// --- Initialize Homepage Dynamic Sections with 0ms First Paint ---
function initHomepage() {
  // 1. INSTANT FIRST PAINT (0ms): render immediately from instant RAM/LocalStorage/Embedded store
  renderMandiGrid(InstantDataEngine.getInstant('mandiPrices.json', DEFAULT_MANDI_PRICES));
  renderSchemesGrid(InstantDataEngine.getInstant('schemes.json', DEFAULT_SCHEMES));
  renderSeasonalGrid(InstantDataEngine.getInstant('seasonalCrops.json', DEFAULT_SEASONAL_CROPS));

  // 2. SINGLE PARALLEL BACKGROUND BATCH (Non-blocking):
  // Revalidates all sections simultaneously and pre-warms marketplace data in background!
  InstantDataEngine.revalidateAll([
    { filename: 'mandiPrices.json', fallback: DEFAULT_MANDI_PRICES, callback: renderMandiGrid },
    { filename: 'schemes.json', fallback: DEFAULT_SCHEMES, callback: renderSchemesGrid },
    { filename: 'seasonalCrops.json', fallback: DEFAULT_SEASONAL_CROPS, callback: renderSeasonalGrid },
    { filename: 'products.json', fallback: DEFAULT_PRODUCTS } // Pre-warms marketplace for 0ms transition!
  ]);
}

// Global App Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  initializeLanguageSelector();
  updateCartCount();
  setActiveNavLink();
  initNavbar();
  initMobileNavigation();
  initHomepage();
  initTranslationEngine();
  window.addEventListener('hashchange', setActiveNavLink);
});

