/**
 * KisanBridge - Homepage JavaScript (js/home.js)
 * Interactive card navigation, accessibility, and scroll reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  initFeatureCardsClick();
  initScrollReveals();
});

/**
 * Make entire preview card clickable and accessible
 */
function initFeatureCardsClick() {
  const cards = document.querySelectorAll('.feature-preview-card, .profile-choice-card');

  cards.forEach(card => {
    // Add role and tabindex for keyboard accessibility if not an anchor
    if (card.tagName.toLowerCase() !== 'a') {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
    }

    card.addEventListener('click', (e) => {
      // If user clicked directly on a link/button inside the card, let the link handle it
      if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) {
        return;
      }
      
      const targetUrl = card.getAttribute('data-href') || card.getAttribute('href');
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    });

    // Keyboard navigation (Enter or Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const targetUrl = card.getAttribute('data-href') || card.getAttribute('href');
        if (targetUrl) {
          window.location.href = targetUrl;
        }
      }
    });
  });
}

/**
 * Smooth subtle reveal animations on scroll
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.feature-preview-card, .profile-choice-card, .home-section-header, .profile-section-header');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el, idx) => {
    el.classList.add('reveal-fade');
    el.style.transitionDelay = `${(idx % 3) * 0.1}s`;
    observer.observe(el);
  });
}