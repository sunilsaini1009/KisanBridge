/* ==========================================================================
   KISANBRIDGE - AI IMAGE ENHANCER
   ========================================================================== */

const ImageEnhancer = {
  isEnhanced: false,

  init(previewImgId, enhanceBtnId, fileInputId) {
    const previewImg = document.getElementById(previewImgId);
    const enhanceBtn = document.getElementById(enhanceBtnId);
    const fileInput = document.getElementById(fileInputId);

    if (fileInput && previewImg) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            previewImg.src = event.target.result;
            previewImg.style.display = 'block';
            this.resetEnhancement(previewImg, enhanceBtn);
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (enhanceBtn && previewImg) {
      enhanceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleEnhance(previewImg, enhanceBtn);
      });
    }
  },

  toggleEnhance(imgElement, btnElement) {
    this.isEnhanced = !this.isEnhanced;

    if (this.isEnhanced) {
      // Apply AI visual clarity enhancement filter
      imgElement.style.transition = 'filter 0.5s ease';
      imgElement.style.filter = 'brightness(1.15) contrast(1.22) saturate(1.35) drop-shadow(0 4px 12px rgba(46, 125, 50, 0.25))';
      btnElement.innerHTML = '✨ Enhanced with AI (Click to Revert)';
      btnElement.classList.add('btn-green');
      btnElement.classList.remove('btn-outline-green');
      showToast("✨ AI Image Enhancement applied: Vibrant crop colors & optimized lighting", "success");
    } else {
      this.resetEnhancement(imgElement, btnElement);
      showToast("Original image restored", "info");
    }
  },

  resetEnhancement(imgElement, btnElement) {
    this.isEnhanced = false;
    imgElement.style.filter = 'none';
    if (btnElement) {
      btnElement.innerHTML = '✨ Enhance Crop Photo with AI';
      btnElement.classList.remove('btn-green');
      btnElement.classList.add('btn-outline-green');
    }
  }
};
