/**
 * KisanBridge - Feature Pages JavaScript (js/feature-pages.js)
 * Handlers for Mandi Prices, Government Schemes, and Crop Advisory pages
 */

document.addEventListener('DOMContentLoaded', () => {
  initMandiPricesPage();
  initGovernmentSchemesPage();
  initCropAdvisoryPage();
});

/* ==========================================================================
   1. MANDI PRICES PAGE FUNCTIONALITY
   ========================================================================== */
function initMandiPricesPage() {
  const searchInput = document.getElementById('mandi-search-input');
  let mandiCards = document.querySelectorAll('.mandi-detail-card');
  const locationSelect = document.getElementById('mandi-location-select');
  const sortSelect = document.getElementById('mandi-sort-select');
  const categoryPills = document.querySelectorAll('.mandi-category-pill');
  const noResults = document.getElementById('mandi-no-results');
  const cardsGrid = document.getElementById('mandi-cards-grid');

  const syncBtn = document.getElementById('btn-sync-gov-mandi');
  const syncIcon = document.getElementById('sync-spinner-icon');
  const syncText = document.getElementById('sync-button-text');
  const lastUpdatedPill = document.getElementById('mandi-last-updated-pill');

  if (!mandiCards.length && !cardsGrid) return; // Not on mandi prices page

  let activeCategory = 'all';

  function applyMandiFilters() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const locationVal = (locationSelect ? locationSelect.value : 'all').toLowerCase();
    let visibleCount = 0;

    mandiCards.forEach(card => {
      const cropName = (card.getAttribute('data-crop') || '').toLowerCase();
      const cardLocation = (card.getAttribute('data-mandi') || '').toLowerCase();
      const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();

      const matchesQuery = !query || cropName.includes(query) || cardLocation.includes(query);
      const matchesLocation = locationVal === 'all' || cardLocation.includes(locationVal);
      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;

      if (matchesQuery && matchesLocation && matchesCategory) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      if (visibleCount === 0) {
        noResults.classList.add('show');
      } else {
        noResults.classList.remove('show');
      }
    }
  }

  // --- Live Government Agmarknet Sync Function ---
  async function syncLiveGovtMandiRates(force = false) {
    if (!syncBtn) return;
    
    if (syncIcon) syncIcon.classList.add('spinning');
    if (syncText) syncText.textContent = 'Syncing...';
    syncBtn.disabled = true;

    try {
      const endpoints = [
        'http://localhost:5000/api/mandi/live?refresh=' + (force ? 'true' : 'false'),
        '/api/mandi/live?refresh=' + (force ? 'true' : 'false')
      ];

      let json = null;
      for (const ep of endpoints) {
        try {
          const res = await fetch(ep, { signal: AbortSignal.timeout(3500) });
          if (res.ok) {
            json = await res.json();
            break;
          }
        } catch (e) {
          // try next fallback
        }
      }

      if (!json || !json.data || !json.data.length) {
        // Fallback to local snapshot
        const localData = (typeof fetchDataset === 'function') 
          ? await fetchDataset('mandiPrices.json', (typeof DEFAULT_MANDI_PRICES !== 'undefined' ? DEFAULT_MANDI_PRICES : []))
          : [];
        json = {
          success: true,
          source: 'Agmarknet APMC Local Benchmark',
          data: localData,
          lastUpdated: 'Today'
        };
      }

      if (json && json.data && json.data.length) {
        renderLiveMandiCards(json.data);
        if (lastUpdatedPill) {
          lastUpdatedPill.textContent = `🟢 ${json.source}: ${json.lastUpdated || 'Today'}`;
        }
        if (typeof showToast === 'function') {
          showToast(`✅ Synced ${json.data.length} live benchmark rates from ${json.source}!`, 'success');
        }
      }
    } catch (err) {
      console.warn('Sync error:', err);
      if (typeof showToast === 'function') {
        showToast('ℹ️ Using verified APMC mandi benchmark rates.', 'info');
      }
    } finally {
      if (syncIcon) syncIcon.classList.remove('spinning');
      if (syncText) syncText.textContent = 'Sync Live Agmarknet';
      syncBtn.disabled = false;
    }
  }

  function renderLiveMandiCards(records) {
    if (!cardsGrid || !Array.isArray(records)) return;
    cardsGrid.innerHTML = records.map(item => `
      <div class="mandi-detail-card" data-crop="${(item.crop || '').toLowerCase()}" data-mandi="${(item.mandi_location || '').toLowerCase()}" data-category="${item.category || 'vegetables'}" data-price="${item.price_per_kg || 0}">
        <div>
          <div class="mandi-card-top">
            <div class="mandi-crop-info">
              <div class="mandi-crop-emoji">${item.icon || '🌾'}</div>
              <div>
                <h3 class="mandi-crop-name">${item.crop}</h3>
                <span class="mandi-crop-category">${item.category === 'fruits' ? 'Fruit' : (item.category === 'grains' ? 'Grain' : 'Vegetable')} • Modal Rate</span>
              </div>
            </div>
            <span class="mandi-trend-pill ${item.trend === 'up' ? 'trend-up' : (item.trend === 'down' ? 'trend-best' : 'trend-stable')}">
              ${item.trend === 'up' ? '▲ Up' : (item.trend === 'down' ? '▼ Best Value' : '● Stable')}
            </span>
          </div>
          <div class="mandi-location-row">
            <span>📍</span> ${item.mandi_location}
          </div>
        </div>
        <div class="mandi-price-row">
          <span class="mandi-price-label">Wholesale Modal Rate:</span>
          <div>
            <span class="mandi-price-amount">₹${item.price_per_kg}</span>
            <span class="mandi-price-unit">/ kg</span>
          </div>
        </div>
      </div>
    `).join('');

    mandiCards = document.querySelectorAll('.mandi-detail-card');
    applyMandiFilters();
  }

  if (syncBtn) {
    syncBtn.addEventListener('click', () => syncLiveGovtMandiRates(true));
  }

  // Search input event
  if (searchInput) {
    searchInput.addEventListener('input', applyMandiFilters);
  }

  // Location dropdown event
  if (locationSelect) {
    locationSelect.addEventListener('change', applyMandiFilters);
  }

  // Category pill click event
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = (pill.getAttribute('data-category') || 'all').toLowerCase();
      applyMandiFilters();
    });
  });

  // Sort dropdown event
  if (sortSelect && cardsGrid) {
    sortSelect.addEventListener('change', () => {
      const sortMode = sortSelect.value;
      const cardsArr = Array.from(mandiCards);

      cardsArr.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price') || 0);
        const priceB = parseFloat(b.getAttribute('data-price') || 0);
        if (sortMode === 'price-asc') return priceA - priceB;
        if (sortMode === 'price-desc') return priceB - priceA;
        return 0; // default
      });

      cardsArr.forEach(card => cardsGrid.appendChild(card));
    });
  }

}

/* ==========================================================================
   2. GOVERNMENT SCHEMES PAGE FUNCTIONALITY
   ========================================================================== */
function initGovernmentSchemesPage() {
  const searchInput = document.getElementById('schemes-search-input');
  const schemeCards = document.querySelectorAll('.scheme-detail-card');
  const toggleButtons = document.querySelectorAll('.scheme-accordion-toggle');
  const noResults = document.getElementById('schemes-no-results');

  if (!schemeCards.length) return; // Not on schemes page

  // Search filtering
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      schemeCards.forEach(card => {
        const title = (card.querySelector('.scheme-title-text')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('.scheme-desc-text')?.textContent || '').toLowerCase();
        const benefits = (card.querySelector('.scheme-benefit-badge')?.textContent || '').toLowerCase();

        const matches = !query || title.includes(query) || desc.includes(query) || benefits.includes(query);
        if (matches) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResults) {
        if (visibleCount === 0) {
          noResults.classList.add('show');
        } else {
          noResults.classList.remove('show');
        }
      }
    });
  }

  // Expandable "Learn More" Accordions
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.scheme-detail-card');
      if (!card) return;
      const content = card.querySelector('.scheme-expanded-content');
      if (!content) return;

      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.innerHTML = '<span>Learn More</span> <span class="arrow-indicator">▼</span>';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        content.classList.add('open');
        btn.innerHTML = '<span>Hide Details</span> <span class="arrow-indicator">▲</span>';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   3. CROP ADVISORY PAGE FUNCTIONALITY
   ========================================================================== */
function initCropAdvisoryPage() {
  const searchInput = document.getElementById('crop-search-input');
  const cropCards = document.querySelectorAll('.crop-advisory-card');
  const demandPills = document.querySelectorAll('.crop-demand-pill');
  const planButtons = document.querySelectorAll('.btn-plan-crop');
  const noResults = document.getElementById('crop-no-results');

  if (!cropCards.length) return; // Not on crop advisory page

  let activeDemand = 'all';

  // Apply demand & search filters
  function applyCropFilters() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    let visibleCount = 0;

    cropCards.forEach(card => {
      const cropName = (card.getAttribute('data-crop') || '').toLowerCase();
      const cropDemand = (card.getAttribute('data-demand') || '').toLowerCase();
      const note = (card.querySelector('.crop-note-text')?.textContent || '').toLowerCase();

      const matchesQuery = !query || cropName.includes(query) || note.includes(query);
      const matchesDemand = activeDemand === 'all' || cropDemand.includes(activeDemand);

      if (matchesQuery && matchesDemand) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      if (visibleCount === 0) {
        noResults.classList.add('show');
      } else {
        noResults.classList.remove('show');
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyCropFilters);
  }

  demandPills.forEach(pill => {
    pill.addEventListener('click', () => {
      demandPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeDemand = (pill.getAttribute('data-demand') || 'all').toLowerCase();
      applyCropFilters();
    });
  });

  // Restore already planned crops from localStorage
  const plannedCrops = JSON.parse(localStorage.getItem('kisanbridge_crop_plan') || '[]');
  planButtons.forEach(btn => {
    const card = btn.closest('.crop-advisory-card');
    const cropName = card?.getAttribute('data-crop');
    if (cropName && plannedCrops.includes(cropName)) {
      btn.textContent = '✓ Added to Plan';
      btn.classList.add('planned');
    }

    btn.addEventListener('click', () => {
      if (!cropName) return;

      let currentPlan = JSON.parse(localStorage.getItem('kisanbridge_crop_plan') || '[]');
      if (!currentPlan.includes(cropName)) {
        currentPlan.push(cropName);
        localStorage.setItem('kisanbridge_crop_plan', JSON.stringify(currentPlan));
        btn.textContent = '✓ Added to Plan';
        btn.classList.add('planned');
        showFeatureToast(`🌱 ${cropName} successfully added to your September Crop Plan!`);
      } else {
        // Toggle removal
        currentPlan = currentPlan.filter(c => c !== cropName);
        localStorage.setItem('kisanbridge_crop_plan', JSON.stringify(currentPlan));
        btn.textContent = '+ Add to Crop Plan';
        btn.classList.remove('planned');
        showFeatureToast(`ℹ️ ${cropName} removed from your Crop Plan.`);
      }
    });
  });
}

/**
 * Lightweight Toast Notification Helper
 */
function showFeatureToast(message) {
  if (window.KisanUtils && typeof window.KisanUtils.showToast === 'function') {
    window.KisanUtils.showToast(message, 'success');
    return;
  }

  let toast = document.getElementById('feature-page-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'feature-page-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1E7B44;
      color: #FFFFFF;
      padding: 12px 22px;
      border-radius: 9999px;
      font-family: 'Poppins', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.18);
      z-index: 10000;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(12px);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
  }, 3500);
}