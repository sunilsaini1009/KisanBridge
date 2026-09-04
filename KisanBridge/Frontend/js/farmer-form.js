/* ==========================================================================
   KISANBRIDGE - 4-STEP FARMER REGISTRATION CONTROLLER
   ========================================================================== */

const FarmerFormController = {
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

  validateStep(stepNumber) {
    let isValid = true;
    const currentPane = document.getElementById(`step-pane-${stepNumber}`);
    if (!currentPane) return true;

    // Validate required inputs
    const inputs = currentPane.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }

      // Phone number check
      if (input.type === 'tel' && input.value.trim().length < 10) {
        input.classList.add('is-invalid');
        isValid = false;
      }
    });

    if (!isValid) {
      showToast("Kripya sabhi jaruri fields sahi se bharein (Please fill required fields)", "error");
    }

    return isValid;
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
          stepHeader.querySelector('.step-circle').innerHTML = '✓';
        } else if (i === this.currentStep) {
          stepHeader.className = 'wizard-step active';
          stepHeader.querySelector('.step-circle').innerHTML = i;
        } else {
          stepHeader.className = 'wizard-step';
          stepHeader.querySelector('.step-circle').innerHTML = i;
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

  async submitForm() {
    if (!this.validateStep(this.currentStep)) return;

    // Collect all form data
    const preferredLanguage = document.getElementById('preferredLanguage')?.value || "Hindi";
    const farmerFullName = document.getElementById('farmerFullName')?.value || "राम सिंह (Ram Singh)";
    const farmerFatherName = document.getElementById('farmerFatherName')?.value || "";
    const farmerMobile = document.getElementById('farmerMobile')?.value || "9876543210";
    const farmerState = document.getElementById('farmerState')?.value || "Haryana";
    const farmerDistrict = document.getElementById('farmerDistrict')?.value || "Gurugram";
    const farmerVillage = document.getElementById('farmerVillage')?.value || "Dhanwapur";
    const farmerPincode = document.getElementById('farmerPincode')?.value || "";
    const farmSizeAcres = document.getElementById('farmSizeAcres')?.value || "5";
    
    const cropCheckboxes = document.querySelectorAll('input[name="crops"]:checked');
    const crops = Array.from(cropCheckboxes).map(cb => cb.value);

    const farmerAadhaar = document.getElementById('farmerAadhaar')?.value || "";
    const bankAccount = document.getElementById('bankAccount')?.value || "";
    const bankIfsc = document.getElementById('bankIfsc')?.value || "";
    
    const fpoMemberInput = document.querySelector('input[name="fpoMember"]:checked');
    const fpoMember = fpoMemberInput ? fpoMemberInput.value : 'no';
    
    const fpoName = document.getElementById('fpoName')?.value || "";
    const fpoId = document.getElementById('fpoId')?.value || "";

    const payload = {
      preferredLanguage, farmerFullName, farmerFatherName, farmerMobile,
      farmerState, farmerDistrict, farmerVillage, farmerPincode,
      farmSizeAcres, crops, farmerAadhaar, bankAccount, bankIfsc,
      fpoMember, fpoName, fpoId
    };

    try {
      const response = await fetch('http://localhost:5000/api/register/farmer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        // Keep saving locally for UI consistency in dashboard
        const farmerProfile = {
          name: farmerFullName,
          phone: farmerMobile,
          village: farmerVillage,
          district: farmerDistrict,
          state: farmerState,
          farmSize: `${farmSizeAcres} Acres`,
          registeredDate: typeof formatDate !== 'undefined' ? formatDate() : new Date().toLocaleDateString(),
          role: 'farmer',
          verified: true
        };

        if (typeof LocalStorageManager !== 'undefined') {
          LocalStorageManager.save('kisan_farmer_user', farmerProfile);
          LocalStorageManager.save('kisan_user_role', 'farmer');
        }

        showToast("🎉 Badhai ho! Registration safal raha! (Redirecting to Dashboard...)", "success", 2500);

        setTimeout(() => {
          window.location.href = 'farmer-dashboard.html';
        }, 1800);
      } else {
        showToast("Registration failed: " + (result.error || "Unknown error"), "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Could not connect to backend server.", "error");
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  FarmerFormController.init();
});
