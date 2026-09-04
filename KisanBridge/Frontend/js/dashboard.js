/* ==========================================================================
   KISANBRIDGE - DASHBOARDS CONTROLLER (FARMER & CUSTOMER)
   ========================================================================== */

const DashboardController = {
  initFarmer() {
    const farmer = LocalStorageManager.load('kisan_farmer_user', {
      name: "राम सिंह (Ram Singh)",
      village: "Dhanwapur",
      district: "Gurugram",
      state: "Haryana",
      farmSize: "4.5 Acres",
      verified: true
    });

    const nameEl = document.getElementById('farmer-display-name');
    const locationEl = document.getElementById('farmer-display-location');
    if (nameEl) nameEl.textContent = `नमस्ते, ${farmer.name}`;
    if (locationEl) locationEl.textContent = `📍 ${farmer.village}, ${farmer.district} (${farmer.state})`;

    this.renderFarmerListings();
    this.bindFarmerActions();
  },

  renderFarmerListings() {
    const tableBody = document.getElementById('farmer-listings-table-body');
    if (!tableBody) return;

    const defaultListings = LocalStorageManager.load('kisan_farmer_listings', [
      { id: 'lst_1', crop: 'Organic Hybrid Tomato', emoji: '🍅', quantity: '450 kg', price: '₹18/kg', mandiComp: '₹14 (Mandi)', status: 'Active' },
      { id: 'lst_2', crop: 'Early Kufri Potato', emoji: '🥔', quantity: '1,200 kg', price: '₹15/kg', mandiComp: '₹11 (Mandi)', status: 'Active' },
      { id: 'lst_3', crop: 'Fresh Green Cabbage', emoji: '🥦', quantity: '300 kg', price: '₹11/kg', mandiComp: '₹8 (Mandi)', status: 'Paused' }
    ]);

    tableBody.innerHTML = defaultListings.map(item => `
      <tr>
        <td>
          <div class="flex items-center gap-3">
            <span style="font-size: 1.8rem;">${item.emoji}</span>
            <strong>${item.crop}</strong>
          </div>
        </td>
        <td><strong>${item.quantity}</strong></td>
        <td><strong class="text-green">${item.price}</strong></td>
        <td><span style="color: var(--text-light); font-size: 0.85rem;">${item.mandiComp}</span></td>
        <td>
          <span class="status-pill ${item.status === 'Active' ? 'status-active' : 'status-paused'}">
            ● ${item.status}
          </span>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn-icon-action" onclick="DashboardController.toggleListingStatus('${item.id}')">
              ${item.status === 'Active' ? '⏸️ Pause' : '▶️ Activate'}
            </button>
            <button class="btn-icon-action danger" onclick="DashboardController.deleteListing('${item.id}')">
              🗑️ Delete
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  toggleListingStatus(listingId) {
    let listings = LocalStorageManager.load('kisan_farmer_listings', [
      { id: 'lst_1', crop: 'Organic Hybrid Tomato', emoji: '🍅', quantity: '450 kg', price: '₹18/kg', mandiComp: '₹14 (Mandi)', status: 'Active' },
      { id: 'lst_2', crop: 'Early Kufri Potato', emoji: '🥔', quantity: '1,200 kg', price: '₹15/kg', mandiComp: '₹11 (Mandi)', status: 'Active' },
      { id: 'lst_3', crop: 'Fresh Green Cabbage', emoji: '🥦', quantity: '300 kg', price: '₹11/kg', mandiComp: '₹8 (Mandi)', status: 'Paused' }
    ]);

    const item = listings.find(l => l.id === listingId);
    if (item) {
      item.status = item.status === 'Active' ? 'Paused' : 'Active';
      LocalStorageManager.save('kisan_farmer_listings', listings);
      this.renderFarmerListings();
      showToast(`Listing status changed to ${item.status}`, "info");
    }
  },

  deleteListing(listingId) {
    let listings = LocalStorageManager.load('kisan_farmer_listings', [
      { id: 'lst_1', crop: 'Organic Hybrid Tomato', emoji: '🍅', quantity: '450 kg', price: '₹18/kg', mandiComp: '₹14 (Mandi)', status: 'Active' },
      { id: 'lst_2', crop: 'Early Kufri Potato', emoji: '🥔', quantity: '1,200 kg', price: '₹15/kg', mandiComp: '₹11 (Mandi)', status: 'Active' },
      { id: 'lst_3', crop: 'Fresh Green Cabbage', emoji: '🥦', quantity: '300 kg', price: '₹11/kg', mandiComp: '₹8 (Mandi)', status: 'Paused' }
    ]);

    listings = listings.filter(l => l.id !== listingId);
    LocalStorageManager.save('kisan_farmer_listings', listings);
    this.renderFarmerListings();
    showToast("Listing deleted successfully", "info");
  },

  bindFarmerActions() {
    const addCropForm = document.getElementById('add-crop-modal-form');
    if (addCropForm) {
      addCropForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('newCropName')?.value || "Fresh Crop";
        const emoji = document.getElementById('newCropEmoji')?.value || "🌱";
        const quantity = document.getElementById('newCropQuantity')?.value || "500";
        const price = document.getElementById('newCropPrice')?.value || "20";

        const listings = LocalStorageManager.load('kisan_farmer_listings', [
          { id: 'lst_1', crop: 'Organic Hybrid Tomato', emoji: '🍅', quantity: '450 kg', price: '₹18/kg', mandiComp: '₹14 (Mandi)', status: 'Active' },
          { id: 'lst_2', crop: 'Early Kufri Potato', emoji: '🥔', quantity: '1,200 kg', price: '₹15/kg', mandiComp: '₹11 (Mandi)', status: 'Active' },
          { id: 'lst_3', crop: 'Fresh Green Cabbage', emoji: '🥦', quantity: '300 kg', price: '₹11/kg', mandiComp: '₹8 (Mandi)', status: 'Paused' }
        ]);

        listings.unshift({
          id: `lst_${Date.now()}`,
          crop: name,
          emoji: emoji,
          quantity: `${quantity} kg`,
          price: `₹${price}/kg`,
          mandiComp: `₹${Math.round(price * 0.75)} (Mandi)`,
          status: 'Active'
        });

        LocalStorageManager.save('kisan_farmer_listings', listings);
        this.renderFarmerListings();
        showToast("Crop listed on marketplace directly! 🌾", "success");
        addCropForm.reset();
        
        const modal = document.getElementById('add-crop-modal');
        if (modal) modal.style.display = 'none';
      });
    }
  },

  initCustomer() {
    const buyer = LocalStorageManager.load('kisan_buyer_user', {
      name: "Priya Sharma",
      address: "Sector 56, Gurugram",
      category: "Family/Household"
    });

    const nameEl = document.getElementById('customer-display-name');
    if (nameEl) nameEl.textContent = `Hi, ${buyer.name}`;

    this.renderCustomerOrders();
  },

  renderCustomerOrders() {
    const tableBody = document.getElementById('customer-orders-table-body');
    if (!tableBody) return;

    const orders = LocalStorageManager.load('kisan_orders_history', [
      { id: 'KB-8492', items: '🍅 Organic Tomato (5kg), 🥔 Jyoti Potato (5kg)', total: '₹225', date: '01 Sep 2026', status: 'In Transit', farmer: 'Ramesh Kumar' },
      { id: 'KB-8104', items: '🧅 Nasik Red Onion (10kg), 🥒 Seedless Cucumber (3kg)', total: '₹264', date: '25 Aug 2026', status: 'Delivered', farmer: 'Suresh Patil' },
      { id: 'KB-7782', items: '🥦 Crisp Cabbage (4kg), 🥕 Local Red Carrot (3kg)', total: '₹156', date: '18 Aug 2026', status: 'Delivered', farmer: 'Om Prakash' }
    ]);

    tableBody.innerHTML = orders.map(order => `
      <tr>
        <td><strong>#${order.id}</strong></td>
        <td>${order.items}</td>
        <td>👨🌾 ${order.farmer}</td>
        <td><strong>${order.total}</strong></td>
        <td><span style="font-size: 0.85rem; color: var(--text-light);">${order.date}</span></td>
        <td>
          <span class="status-pill ${order.status === 'Delivered' ? 'status-delivered' : 'status-transit'}">
            ● ${order.status}
          </span>
        </td>
      </tr>
    `).join('');
  }
};
