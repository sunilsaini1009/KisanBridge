/* ==========================================================================
   KISANBRIDGE - CART SYSTEM (LOCALSTORAGE ENGINE)
   ========================================================================== */

const Cart = {
  getCart() {
    return LocalStorageManager.load('kisan_cart', []);
  },

  saveCart(cart) {
    LocalStorageManager.save('kisan_cart', cart);
    updateCartCount();
  },

  addItem(productId, quantity = 1, isPreHarvest = false) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === productId && item.isPreHarvest === isPreHarvest);

    // Find product meta from DEFAULT_PRODUCTS or stored list
    const product = DEFAULT_PRODUCTS.find(p => p.id === productId);
    if (!product) {
      showToast("Product not found", "error");
      return;
    }

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price_per_kg: product.price_per_kg,
        image_emoji: product.image_emoji,
        farmer_name: product.farmer_name,
        farmer_location: product.farmer_location,
        grade: product.grade,
        quantity: quantity,
        isPreHarvest: isPreHarvest
      });
    }

    this.saveCart(cart);
    showToast(`Added ${quantity}kg ${product.name} to Cart! 🛒`, "success");
  },

  removeItem(productId, isPreHarvest = false) {
    let cart = this.getCart();
    cart = cart.filter(item => !(item.id === productId && item.isPreHarvest === isPreHarvest));
    this.saveCart(cart);
    this.renderCartPage();
    showToast("Item removed from cart", "info");
  },

  updateQuantity(productId, newQty, isPreHarvest = false) {
    const cart = this.getCart();
    const item = cart.find(i => i.id === productId && i.isPreHarvest === isPreHarvest);
    if (item) {
      if (newQty <= 0) {
        this.removeItem(productId, isPreHarvest);
        return;
      }
      item.quantity = parseInt(newQty);
      this.saveCart(cart);
      this.renderCartPage();
    }
  },

  clear() {
    LocalStorageManager.remove('kisan_cart');
    updateCartCount();
    this.renderCartPage();
  },

  getSubtotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price_per_kg * item.quantity), 0);
  },

  renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const emptyNotice = document.getElementById('cart-empty-state');
    const summaryCard = document.getElementById('cart-summary-card');

    if (!container) return;

    const cart = this.getCart();

    if (cart.length === 0) {
      container.innerHTML = '';
      if (emptyNotice) emptyNotice.style.display = 'block';
      if (summaryCard) summaryCard.style.display = 'none';
      return;
    }

    if (emptyNotice) emptyNotice.style.display = 'none';
    if (summaryCard) summaryCard.style.display = 'block';

    container.innerHTML = cart.map(item => `
      <div class="card flex items-center justify-between gap-4" style="margin-bottom: 16px; padding: 20px;">
        <div class="flex items-center gap-4">
          <div style="font-size: 3rem; background: var(--light-green); width: 64px; height: 64px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
            ${item.image_emoji || '🥬'}
          </div>
          <div>
            <h4 style="margin-bottom: 4px;">${item.name} ${item.isPreHarvest ? '<span class="badge badge-purple">Pre-Harvest Advance</span>' : ''}</h4>
            <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 4px;">👨🌾 ${item.farmer_name} • ${item.farmer_location}</p>
            <div style="font-weight: 700; color: var(--primary-green); font-size: 1.1rem;">₹${item.price_per_kg} / kg</div>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="quantity-stepper">
            <button class="step-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1}, ${item.isPreHarvest})">-</button>
            <span class="quantity-value">${item.quantity} kg</span>
            <button class="step-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1}, ${item.isPreHarvest})">+</button>
          </div>

          <div style="font-weight: 800; font-size: 1.25rem; min-width: 90px; text-align: right; color: var(--text-dark);">
            ₹${item.price_per_kg * item.quantity}
          </div>

          <button class="btn-icon-action danger" onclick="Cart.removeItem('${item.id}', ${item.isPreHarvest})" title="Remove item">
            🗑️
          </button>
        </div>
      </div>
    `).join('');

    // Update Summary
    const subtotal = this.getSubtotal();
    const delivery = subtotal > 0 ? 60 : 0;
    const platformDiscount = Math.round(subtotal * 0.05); // 5% direct bridge discount
    const total = subtotal + delivery - platformDiscount;

    const subtotalEl = document.getElementById('cart-subtotal');
    const deliveryEl = document.getElementById('cart-delivery');
    const discountEl = document.getElementById('cart-discount');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (deliveryEl) deliveryEl.textContent = formatCurrency(delivery);
    if (discountEl) discountEl.textContent = `- ${formatCurrency(platformDiscount)}`;
    if (totalEl) totalEl.textContent = formatCurrency(total);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Cart.renderCartPage();
});
