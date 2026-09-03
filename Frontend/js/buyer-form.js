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

  submitBuyerForm(categoryType) {
    const name = document.getElementById('buyerName')?.value || "Priya Sharma";
    const phone = document.getElementById('buyerPhone')?.value || "9812345678";
    const email = document.getElementById('buyerEmail')?.value || "priya@example.com";
    const address = document.getElementById('buyerAddress')?.value || "Sector 56, Gurugram";
    const pincode = document.getElementById('buyerPincode')?.value || "122011";
    const businessName = document.getElementById('businessName')?.value || "";

    const buyerProfile = {
      name: name,
      phone: phone,
      email: email,
      address: address,
      pincode: pincode,
      businessName: businessName,
      category: categoryType,
      role: 'buyer',
      registeredDate: formatDate()
    };

    LocalStorageManager.save('kisan_buyer_user', buyerProfile);
    LocalStorageManager.save('kisan_user_role', 'buyer');

    showToast("🎉 Welcome to KisanBridge! Onboarding Complete.", "success", 2000);

    setTimeout(() => {
      window.location.href = 'marketplace.html';
    }, 1500);
  }
};
