/* ==========================================================================
   KISANBRIDGE - BUYER REGISTRATION HANDLER
   ========================================================================== */

const BuyerFormController = {
  init(categoryType) {
    const form = document.getElementById('buyer-registration-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitBuyerForm(categoryType);
      });
    }
  },

  async submitBuyerForm(categoryType) {
    const buyerName = document.getElementById('buyerName')?.value || "Priya Sharma";
    const buyerPhone = document.getElementById('buyerPhone')?.value || "9812345678";
    const buyerEmail = document.getElementById('buyerEmail')?.value || "priya@example.com";
    const buyerAddress = document.getElementById('buyerAddress')?.value || "Sector 56, Gurugram";
    
    let payload = {};
    let endpoint = '';

    if (categoryType === 'Family/Household') {
      const familySize = document.getElementById('familySize')?.value || "4-6";
      const buyerCity = document.getElementById('buyerCity')?.value || "Gurugram";
      const buyerPincode = document.getElementById('buyerPincode')?.value || "122011";
      const weeklyBoxOptIn = document.getElementById('weeklyBoxOptIn')?.checked || false;
      
      payload = {
        buyerName, buyerPhone, buyerEmail, familySize, 
        buyerAddress, buyerCity, buyerPincode, weeklyBoxOptIn
      };
      endpoint = 'http://localhost:5000/api/register/family';
    } else {
      const businessName = document.getElementById('businessName')?.value || "";
      const businessType = document.getElementById('businessType')?.value || "";
      const gstin = document.getElementById('gstin')?.value || "";
      const estimatedDailyRequirement = document.getElementById('estimatedDailyRequirement')?.value || "";
      const deliverySlot = document.getElementById('deliverySlot')?.value || "";
      
      payload = {
        businessName, businessType, buyerName, buyerPhone, gstin,
        estimatedDailyRequirement, deliverySlot, buyerAddress
      };
      endpoint = 'http://localhost:5000/api/register/business';
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        const buyerProfile = {
          name: buyerName,
          phone: buyerPhone,
          email: buyerEmail,
          address: buyerAddress,
          category: categoryType,
          role: 'buyer',
          registeredDate: typeof formatDate !== 'undefined' ? formatDate() : new Date().toLocaleDateString()
        };

        if (typeof LocalStorageManager !== 'undefined') {
          LocalStorageManager.save('kisan_buyer_user', buyerProfile);
          LocalStorageManager.save('kisan_user_role', 'buyer');
        }

        showToast("🎉 Welcome to KisanBridge! Onboarding Complete.", "success", 2000);

        setTimeout(() => {
          window.location.href = 'marketplace.html';
        }, 1500);
      } else {
        showToast("Registration failed: " + (result.error || "Unknown error"), "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Could not connect to backend server.", "error");
    }
  }
};
