/* ==========================================================================
   KISANBRIDGE - LEAFLET.JS MAP & DISTANCE INTEGRATION
   ========================================================================== */

const MapIntegration = {
  map: null,
  marker: null,
  // Default Farmer Farm Hub origin coordinate (Dhanwapur, Gurugram agricultural zone)
  farmHubCoord: { lat: 28.4595, lng: 77.0266, name: "Gurugram Central Farm Hub" },
  currentBuyerCoord: { lat: 28.4900, lng: 77.0800 },
  currentDistanceKm: 15,

  init(mapContainerId = 'delivery-map') {
    const mapElement = document.getElementById(mapContainerId);
    if (!mapElement || typeof L === 'undefined') {
      console.warn("Leaflet Map container or library not ready.");
      return;
    }

    // Initialize Leaflet map centered at default location
    this.map = L.map(mapContainerId).setView([this.currentBuyerCoord.lat, this.currentBuyerCoord.lng], 12);

    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add Farm Origin Marker
    const farmIcon = L.divIcon({
      className: 'custom-map-icon farm-marker',
      html: '<div style="background:#2E7D32;color:white;padding:6px 10px;border-radius:12px;font-size:12px;font-weight:700;box-shadow:0 3px 8px rgba(0,0,0,0.3);white-space:nowrap;">🌾 Farm Hub</div>',
      iconSize: [80, 30]
    });
    L.marker([this.farmHubCoord.lat, this.farmHubCoord.lng], { icon: farmIcon })
      .addTo(this.map)
      .bindPopup("<strong>Kisan Farm Cluster</strong><br>Freshly harvested produce source.")
      .openPopup();

    // Add Draggable Buyer Delivery Marker
    const buyerIcon = L.divIcon({
      className: 'custom-map-icon buyer-marker',
      html: '<div style="background:#667eea;color:white;padding:6px 10px;border-radius:12px;font-size:12px;font-weight:700;box-shadow:0 3px 8px rgba(0,0,0,0.3);white-space:nowrap;">📍 Your Address</div>',
      iconSize: [95, 30]
    });

    this.marker = L.marker([this.currentBuyerCoord.lat, this.currentBuyerCoord.lng], {
      draggable: true,
      icon: buyerIcon
    }).addTo(this.map);

    // Marker Drag Event
    this.marker.on('dragend', (event) => {
      const position = event.target.getLatLng();
      this.handleLocationUpdate(position.lat, position.lng);
    });

    // Map Click Event
    this.map.on('click', (event) => {
      this.marker.setLatLng(event.latlng);
      this.handleLocationUpdate(event.latlng.lat, event.latlng.lng);
    });

    // Initial Distance & Pricing Calculation
    this.handleLocationUpdate(this.currentBuyerCoord.lat, this.currentBuyerCoord.lng);

    // Geolocation Auto-detect Button hook
    const geoBtn = document.getElementById('btn-detect-gps');
    if (geoBtn) {
      geoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.detectCurrentLocation();
      });
    }
  },

  // Haversine Formula to compute real spherical distance in KM
  calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  },

  handleLocationUpdate(lat, lng) {
    this.currentBuyerCoord = { lat, lng };
    this.currentDistanceKm = this.calculateHaversineDistance(
      this.farmHubCoord.lat, this.farmHubCoord.lng,
      lat, lng
    );

    // Update UI Badges
    const distanceDisplay = document.getElementById('delivery-distance-display');
    const chargeDisplay = document.getElementById('delivery-charge-display');

    if (distanceDisplay) {
      distanceDisplay.textContent = `${this.currentDistanceKm} km`;
    }

    const deliveryCost = PriceCalculator.calculateDeliveryCharge(this.currentDistanceKm);
    if (chargeDisplay) {
      chargeDisplay.textContent = `₹${deliveryCost} (₹4/km standard)`;
    }

    // Trigger cart checkout recalculation if hook available
    if (typeof updateCheckoutSummaryWithDistance === 'function') {
      updateCheckoutSummaryWithDistance(deliveryCost);
    }
  },

  detectCurrentLocation() {
    if (!navigator.geolocation) {
      showToast("Geolocation is not supported by your browser.", "error");
      return;
    }

    showToast("📍 Detecting your live location...", "info");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (this.map && this.marker) {
          const newLatLng = new L.LatLng(latitude, longitude);
          this.marker.setLatLng(newLatLng);
          this.map.setView(newLatLng, 13);
          this.handleLocationUpdate(latitude, longitude);
          showToast("Location updated successfully from GPS!", "success");
        }
      },
      (err) => {
        console.warn("GPS error", err);
        showToast("Could not access GPS. Pin marked to standard location.", "info");
      },
      { timeout: 8000 }
    );
  }
};
