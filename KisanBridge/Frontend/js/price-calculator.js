/* ==========================================================================
   KISANBRIDGE - PRICE & DISTANCE CALCULATOR
   ========================================================================== */

const PriceCalculator = {
  // Fair Transparency Breakdown Engine
  calculateBreakdown(totalConsumerPrice) {
    const price = parseFloat(totalConsumerPrice) || 0;
    
    // Farmer receives ~72% direct value
    const farmerShare = Math.round(price * 0.72);
    // Platform operational fee ~12%
    const platformFee = Math.round(price * 0.12);
    // Cold chain logistics ~16%
    const logisticsFee = price - farmerShare - platformFee;

    return {
      farmerShare,
      platformFee,
      logisticsFee,
      totalConsumerPrice: price
    };
  },

  // Calculate Distance-Based Logistics Fee
  calculateDeliveryCharge(distanceKm, weightKg = 5) {
    const baseDistanceCharge = 40; // Base rate for up to 5 km
    const perKmRate = 4; // ₹4 per km
    
    let totalDelivery = baseDistanceCharge;
    if (distanceKm > 5) {
      totalDelivery += (distanceKm - 5) * perKmRate;
    }

    // Weight slab surcharge (if bulk order > 20kg)
    if (weightKg > 20) {
      totalDelivery += Math.floor((weightKg - 20) / 10) * 15;
    }

    return Math.round(totalDelivery);
  },

  // Mandi Benchmark Comparison
  calculateSavings(mandiRate, kisanBridgeRate) {
    const traditionalRetailPrice = Math.round(mandiRate * 1.6); // Middleman markup in traditional retail
    const buyerSavings = traditionalRetailPrice - kisanBridgeRate;
    const buyerSavingsPercent = Math.round((buyerSavings / traditionalRetailPrice) * 100);

    return {
      traditionalRetailPrice,
      buyerSavings,
      buyerSavingsPercent
    };
  },

  // Update UI in Product Detail or Checkout
  updateProductDetailBreakdown(pricePerKg, quantity = 1, isPreHarvest = false) {
    const subtotal = pricePerKg * quantity;
    const breakdown = this.calculateBreakdown(subtotal);
    
    const farmerReceiveEl = document.getElementById('breakdown-farmer-share');
    const platformFeeEl = document.getElementById('breakdown-platform-fee');
    const logisticsFeeEl = document.getElementById('breakdown-logistics-fee');
    const youPayEl = document.getElementById('breakdown-you-pay');
    const preHarvestNoticeEl = document.getElementById('pre-harvest-advance-amount');

    if (farmerReceiveEl) farmerReceiveEl.textContent = formatCurrency(breakdown.farmerShare);
    if (platformFeeEl) platformFeeEl.textContent = formatCurrency(breakdown.platformFee);
    if (logisticsFeeEl) logisticsFeeEl.textContent = formatCurrency(breakdown.logisticsFee);
    if (youPayEl) youPayEl.textContent = formatCurrency(subtotal);

    if (preHarvestNoticeEl) {
      const advance30 = Math.round(subtotal * 0.3);
      preHarvestNoticeEl.textContent = `Pay ₹${advance30} (30% advance) now, balance ₹${subtotal - advance30} on harvest delivery.`;
    }
  }
};
