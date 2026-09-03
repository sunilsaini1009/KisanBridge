/* ==========================================================================
   KISANBRIDGE - 4-STEP FARMER REGISTRATION CONTROLLER
   ========================================================================== */

var FarmerFormController = {
  currentStep: 1,
  totalSteps: 4,

  init() {
    this.updateWizardUI();
    this.bindEvents();
    this.initFileUploads();
  },

  bindEvents() {
    const nextBtn = document.getElementById('btn-wizard-next');
    const prevBtn = document.getElementById('btn-wizard-prev');
    const form = document.getElementById('farmer-registration-form');

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.nextStep();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.prevStep();
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitForm();
      });
    }

    // Toggle FPO conditional fields
    const fpoYes = document.getElementById('fpo-yes');
    const fpoNo = document.getElementById('fpo-no');
    const fpoDetailsBox = document.getElementById('fpo-details-container');

    if (fpoYes && fpoNo && fpoDetailsBox) {
      fpoYes.addEventListener('change', () => {
        fpoDetailsBox.style.display = 'grid';
      });
      fpoNo.addEventListener('change', () => {
        fpoDetailsBox.style.display = 'none';
      });
    }
  },

  initFileUploads() {
    ['aadhaar-dropzone', 'passbook-dropzone'].forEach(zoneId => {
      const dropzone = document.getElementById(zoneId);
      const input = document.getElementById(zoneId.replace('-dropzone', '-file'));
      const preview = document.getElementById(zoneId.replace('-dropzone', '-preview'));

      if (dropzone && input) {
        dropzone.addEventListener('click', () => input.click());

        input.addEventListener('change', (e) => {
          if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            if (preview) {
              preview.innerHTML = `✅ Selected: <strong>${fileName}</strong>`;
            }
          }
        });

        // Drag events
        ['dragenter', 'dragover'].forEach(eventName => {
          dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
          });
        });

        ['dragleave', 'drop'].forEach(eventName => {
          dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
          });
        });

        dropzone.addEventListener('drop', (e) => {
          if (e.dataTransfer.files.length > 0) {
            input.files = e.dataTransfer.files;
            const fileName = e.dataTransfer.files[0].name;
            if (preview) {
              preview.innerHTML = `✅ Uploaded: <strong>${fileName}</strong>`;
            }
          }
        });
      }
    });
  },

  validateField(input) {
    if (!input) return true;

    let isValid = true;
    let errorMsg = "";

    const id = input.id;
    const val = input.value ? input.value.trim() : "";

    if (id === 'farmerFullName') {
      if (!val || val.length < 2) {
        isValid = false;
        errorMsg = "Please enter your full name (at least 2 characters).";
      }
    } else if (id === 'farmerFatherName') {
      if (!val || val.length < 2) {
        isValid = false;
        errorMsg = "Please enter father's/husband's name.";
      }
    } else if (id === 'farmerMobile') {
      const cleanPhone = this.normalizePhone(val);
      if (!cleanPhone || cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
        isValid = false;
        errorMsg = "Please enter a valid 10-digit mobile number.";
      }
    } else if (id === 'farmerEmail') {
      if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        isValid = false;
        errorMsg = "Please enter a valid email address.";
      }
    } else if (id === 'farmerState') {
      if (!val) {
        isValid = false;
        errorMsg = "Please select your state.";
      }
    } else if (id === 'farmerDistrict') {
      if (!val || val.length < 2) {
        isValid = false;
        errorMsg = "Please enter your district.";
      }
    } else if (id === 'farmerVillage') {
      if (!val || val.length < 2) {
        isValid = false;
        errorMsg = "Please enter your village/town.";
      }
    } else if (id === 'farmerPincode') {
      if (!val || !/^\d{6}$/.test(val)) {
        isValid = false;
        errorMsg = "Please enter 6-digit postal pincode.";
      }
    } else if (id === 'farmSizeAcres') {
      if (!val || isNaN(val) || parseFloat(val) <= 0) {
        isValid = false;
        errorMsg = "Please specify a valid farm size in acres.";
      }
    } else if (id === 'farmerAadhaar') {
      const cleanAadhaar = val.replace(/\s/g, '');
      if (!cleanAadhaar || !/^\d{12}$/.test(cleanAadhaar)) {
        isValid = false;
        errorMsg = "Please enter valid 12-digit Aadhaar number.";
      }
    } else if (id === 'bankAccount') {
      if (!val || val.length < 8) {
        isValid = false;
        errorMsg = "Please enter valid bank account number.";
      }
    } else if (id === 'bankIfsc') {
      if (!val || val.length < 8) {
        isValid = false;
        errorMsg = "Please enter valid bank IFSC code.";
      }
    } else if (id === 'termsAgreement') {
      if (!input.checked) {
        isValid = false;
        errorMsg = "You must agree to the terms to proceed.";
      }
    } else if (input.hasAttribute('required') && !val) {
      isValid = false;
      errorMsg = "This field is required.";
    }

    if (!isValid) {
      this.markInvalid(input, errorMsg);
    } else {
      this.markValid(input);
    }

    return isValid;
  },

  normalizePhone(raw) {
    if (!raw) return "";
    let clean = String(raw).trim().replace(/[\s\-()]/g, "");
    if (clean.startsWith("+91")) clean = clean.substring(3);
    else if (clean.startsWith("91") && clean.length === 12) clean = clean.substring(2);
    else if (clean.startsWith("0") && clean.length === 11) clean = clean.substring(1);
    return clean;
  },

  markInvalid(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');

    const group = input.closest('.form-group') || input.parentElement;
    if (group) {
      group.classList.add('has-error');
      let feedback = group.querySelector('.invalid-feedback');
      if (!feedback) {
        feedback = document.createElement('span');
        feedback.className = 'invalid-feedback';
        group.appendChild(feedback);
      }
      if (message) feedback.textContent = message;
      feedback.style.display = 'block';
    }
  },

  markValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');

    const group = input.closest('.form-group') || input.parentElement;
    if (group) {
      group.classList.remove('has-error');
      const feedback = group.querySelector('.invalid-feedback');
      if (feedback) feedback.style.display = 'none';
    }
  },

  validateStep(stepNumber) {
    let isValid = true;
    const currentPane = document.getElementById(`step-pane-${stepNumber}`);
    
    let inputs = [];
    if (currentPane) {
      inputs = Array.from(currentPane.querySelectorAll('input[required], select[required], input[type="tel"], #farmerFullName, #farmerMobile, #farmerState, #farmerDistrict, #farmerVillage, #farmSizeAcres, #termsAgreement'));
    } else if (stepNumber === 1) {
      inputs = [
        document.getElementById('farmerFullName'),
        document.getElementById('farmerFatherName'),
        document.getElementById('farmerMobile')
      ].filter(Boolean);
    } else if (stepNumber === 2) {
      inputs = [
        document.getElementById('farmerState'),
        document.getElementById('farmerDistrict'),
        document.getElementById('farmerVillage'),
        document.getElementById('farmerPincode'),
        document.getElementById('farmSizeAcres')
      ].filter(Boolean);
    } else if (stepNumber === 3) {
      inputs = [
        document.getElementById('farmerAadhaar'),
        document.getElementById('bankAccount'),
        document.getElementById('bankIfsc')
      ].filter(Boolean);
    } else if (stepNumber === 4) {
      inputs = [
        document.getElementById('termsAgreement')
      ].filter(Boolean);
    }

    inputs.forEach(input => {
      const fieldValid = this.validateField(input);
      if (!fieldValid) {
        isValid = false;
      }
    });

    // Special check for FPO conditional fields if step 4
    if (stepNumber === 4) {
      const fpoYes = document.getElementById('fpo-yes');
      if (fpoYes && fpoYes.checked) {
        const fpoName = document.getElementById('fpoName');
        const fpoId = document.getElementById('fpoId');
        if (fpoName && !fpoName.value.trim()) {
          this.markInvalid(fpoName, "Please enter your FPO name.");
          isValid = false;
        } else if (fpoName) {
          this.markValid(fpoName);
        }
        if (fpoId && !fpoId.value.trim()) {
          this.markInvalid(fpoId, "Please enter FPO registration ID.");
          isValid = false;
        } else if (fpoId) {
          this.markValid(fpoId);
        }
      }

      const terms = document.getElementById('termsAgreement');
      if (terms && !terms.checked) {
        this.markInvalid(terms, "You must agree to the terms to proceed.");
        isValid = false;
      }
    }

    return isValid;
  },

  validateAll() {
    let firstInvalidStep = 0;
    let allValid = true;

    for (let s = 1; s <= this.totalSteps; s++) {
      const stepValid = this.validateStep(s);
      if (!stepValid) {
        allValid = false;
        if (!firstInvalidStep) {
          firstInvalidStep = s;
        }
      }
    }

    if (!allValid && firstInvalidStep) {
      this.goToStep(firstInvalidStep);
      const firstInvalidInput = document.querySelector(`#step-pane-${firstInvalidStep} .is-invalid`) || document.querySelector('.is-invalid');
      if (firstInvalidInput && typeof firstInvalidInput.focus === 'function') {
        firstInvalidInput.focus();
      }
    }

    return allValid;
  },

  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps) return;
    this.currentStep = stepNumber;
    this.updateWizardUI();
    window.scrollTo({ top: 100, behavior: 'smooth' });
  },

  nextStep() {
    if (this.validateStep(this.currentStep)) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.updateWizardUI();
        window.scrollTo({ top: 100, behavior: 'smooth' });
      }
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateWizardUI();
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  },

  updateWizardUI() {
    // 1. Update Step Panes
    for (let i = 1; i <= this.totalSteps; i++) {
      const pane = document.getElementById(`step-pane-${i}`);
      const stepHeader = document.getElementById(`wizard-step-${i}`);

      if (pane) {
        if (i === this.currentStep) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      }

      if (stepHeader) {
        if (i < this.currentStep) {
          stepHeader.className = 'wizard-step completed';
          const circle = stepHeader.querySelector('.step-circle');
          if (circle) circle.innerHTML = '✓';
        } else if (i === this.currentStep) {
          stepHeader.className = 'wizard-step active';
          const circle = stepHeader.querySelector('.step-circle');
          if (circle) circle.innerHTML = i;
        } else {
          stepHeader.className = 'wizard-step';
          const circle = stepHeader.querySelector('.step-circle');
          if (circle) circle.innerHTML = i;
        }
      }
    }

    // 2. Update Progress Bar Line
    const progressBar = document.getElementById('wizard-progress-bar');
    if (progressBar) {
      const progressPercent = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    // 3. Navigation Buttons
    const prevBtn = document.getElementById('btn-wizard-prev');
    const nextBtn = document.getElementById('btn-wizard-next');
    const submitBtn = document.getElementById('btn-wizard-submit');

    if (prevBtn) {
      prevBtn.style.visibility = this.currentStep === 1 ? 'hidden' : 'visible';
    }

    if (nextBtn && submitBtn) {
      if (this.currentStep === this.totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
      } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
      }
    }
  },

  submitForm() {
    const fullNameInput = document.getElementById('farmerFullName');
    const mobileInput = document.getElementById('farmerMobile');
    const terms = document.getElementById('termsAgreement');

    const fullName = fullNameInput ? fullNameInput.value.trim() : "";
    const rawPhone = mobileInput ? mobileInput.value.trim() : "";
    const phone = this.normalizePhone(rawPhone);

    let hasCriticalError = false;
    if (!fullName || fullName.length < 2) {
      if (fullNameInput) this.markInvalid(fullNameInput, "Please enter your full name (at least 2 characters).");
      hasCriticalError = true;
    }
    if (!phone || phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
      if (mobileInput) this.markInvalid(mobileInput, "Please enter a valid 10-digit mobile number.");
      hasCriticalError = true;
    }
    if (terms && !terms.checked) {
      this.markInvalid(terms, "You must agree to the terms to proceed.");
      hasCriticalError = true;
    }

    if (hasCriticalError || !this.validateAll()) {
      return;
    }

    const villageInput = document.getElementById('farmerVillage');
    const districtInput = document.getElementById('farmerDistrict');
    const stateSelect = document.getElementById('farmerState');
    const farmSizeInput = document.getElementById('farmSizeAcres');

    const village = villageInput ? villageInput.value.trim() : "";
    const district = districtInput ? districtInput.value.trim() : "";
    const state = stateSelect ? stateSelect.value.trim() : "";
    const farmSize = farmSizeInput ? farmSizeInput.value.trim() : "";

    const cropChecked = document.querySelectorAll('input[name="crops"]:checked');
    const cropList = Array.from(cropChecked).map(c => c.value);
    const primaryCrop = cropList.length > 0 ? cropList.join(', ') : 'Mixed Crops';

    // Optional email check
    const emailInput = document.getElementById('farmerEmail');
    const email = emailInput && emailInput.value.trim() ? emailInput.value.trim() : undefined;

    // Preferred language
    const prefLangSelect = document.getElementById('preferredLanguage');
    if (prefLangSelect && prefLangSelect.value) {
      const langMap = {
        "Hindi": "hi",
        "English": "en",
        "Punjabi": "pa",
        "Marathi": "mr",
        "Tamil": "ta"
      };
      const selectedLang = langMap[prefLangSelect.value] || "en";
      localStorage.setItem("selectedLanguage", selectedLang);
    }

    // 1. Save currentUser
    const currentUser = {
      name: fullName,
      role: "farmer",
      registered: true,
      phone: phone,
      village: village,
      district: district,
      state: state,
      primaryCrop: primaryCrop,
      farmSize: farmSize
    };
    if (email) currentUser.email = email;
    Object.keys(currentUser).forEach(k => currentUser[k] === undefined && delete currentUser[k]);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // 2. Save farmerProfile
    const farmerProfile = {
      name: fullName,
      phone: phone,
      village: village,
      district: district,
      state: state,
      primaryCrop: primaryCrop,
      farmSize: farmSize,
      registeredAt: new Date().toISOString()
    };
    if (email) farmerProfile.email = email;
    Object.keys(farmerProfile).forEach(k => farmerProfile[k] === undefined && delete farmerProfile[k]);
    localStorage.setItem("farmerProfile", JSON.stringify(farmerProfile));

    // 3. Save legacy dashboard profile for UI compatibility
    try {
      if (typeof LocalStorageManager !== 'undefined') {
        LocalStorageManager.save('kisan_farmer_user', {
          name: fullName,
          phone: phone,
          village: village || "Dhanwapur",
          district: district || "Gurugram",
          state: state || "Haryana",
          farmSize: farmSize ? `${farmSize} Acres` : "4.5 Acres",
          registeredDate: typeof formatDate === 'function' ? formatDate() : new Date().toLocaleDateString(),
          role: 'farmer',
          verified: true
        });
        LocalStorageManager.save('kisan_user_role', 'farmer');
      }
    } catch (e) {}

    // 4. Show success toast (non-blocking)
    if (typeof showToast === 'function') {
      showToast("Farmer registration successful! Welcome to KisanBridge.", "success", 2500);
    }

    // 5. Safe redirect with allowed list
    const allowedFarmerPages = [
      "farmer-dashboard.html"
    ];

    let targetPage = "farmer-dashboard.html";
    const redirectTarget = localStorage.getItem("redirectAfterFarmerRegistration");
    if (redirectTarget && allowedFarmerPages.includes(redirectTarget)) {
      targetPage = redirectTarget;
    }
    localStorage.removeItem("redirectAfterFarmerRegistration");

    setTimeout(() => {
      window.location.href = targetPage;
    }, 1000);
  }
};

function validateFarmerForm(formElement) {
  if (typeof FarmerFormController !== 'undefined' && FarmerFormController.validateAll) {
    return FarmerFormController.validateAll();
  }
  return true;
}

if (typeof window !== 'undefined') {
  window.FarmerFormController = FarmerFormController;
  window.validateFarmerForm = validateFarmerForm;
}
if (typeof global !== 'undefined') {
  global.FarmerFormController = FarmerFormController;
  global.validateFarmerForm = validateFarmerForm;
}

document.addEventListener('DOMContentLoaded', () => {
  FarmerFormController.init();
});
