/* ===== Dhalam Couture — Animations Module (Premium Upgrade) ===== */
/* Replaces GSAP with vanilla Intersection Observer for scroll reveals */

const Animations = (() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initScrollReveal() {
    if (prefersReducedMotion) {
      // Immediately show all reveal elements
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Apply stagger delay if data attribute is present
          const delay = el.dataset.revealDelay;
          if (delay) {
            el.style.transitionDelay = delay + 'ms';
          }
          el.classList.add('revealed');
          observer.unobserve(el); // Once revealed, never re-animate
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }

  /* Dynamically add .reveal to key elements that aren't manually tagged */
  function autoTagRevealElements() {
    // Section titles
    document.querySelectorAll('.section-title, .section-subtitle, .section-eyebrow').forEach(el => {
      if (!el.classList.contains('reveal') && !el.closest('.hero-section')) {
        el.classList.add('reveal');
      }
    });

    // Product cards — stagger them
    document.querySelectorAll('.product-card').forEach((card, i) => {
      if (!card.classList.contains('reveal')) {
        card.classList.add('reveal');
        card.dataset.revealDelay = (i % 4) * 80; // stagger in groups of 4
      }
    });

    // Category tiles — stagger
    document.querySelectorAll('.category-tile').forEach((tile, i) => {
      if (!tile.classList.contains('reveal')) {
        tile.classList.add('reveal');
        tile.dataset.revealDelay = i * 120;
      }
    });

    // Brand story elements
    const storyImg = document.querySelector('.brand-story-image');
    const storyText = document.querySelector('.brand-story-text');
    if (storyImg && !storyImg.classList.contains('reveal')) storyImg.classList.add('reveal');
    if (storyText && !storyText.classList.contains('reveal')) {
      storyText.classList.add('reveal');
      storyText.dataset.revealDelay = 150;
    }

    // Reel cards — stagger
    document.querySelectorAll('.reels-card').forEach((card, i) => {
      if (!card.classList.contains('reveal')) {
        card.classList.add('reveal');
        card.dataset.revealDelay = i * 80;
      }
    });

    // Review cards — stagger
    document.querySelectorAll('.review-card, .testimonial-card').forEach((card, i) => {
      if (!card.classList.contains('reveal')) {
        card.classList.add('reveal');
        card.dataset.revealDelay = i * 100;
      }
    });

    // Offer / CTA banners
    document.querySelectorAll('.offer-banner, .wa-cta-banner').forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    // Footer columns
    document.querySelectorAll('.site-footer > div > div').forEach((col, i) => {
      if (!col.classList.contains('reveal')) {
        col.classList.add('reveal');
        col.dataset.revealDelay = i * 100;
      }
    });

    // Trust strip items (collections page)
    document.querySelectorAll('[aria-label="Customer trust strip"] .flex.flex-col').forEach((item, i) => {
      if (!item.classList.contains('reveal')) {
        item.classList.add('reveal');
        item.dataset.revealDelay = i * 120;
      }
    });
  }

  function init() {
    autoTagRevealElements();
    initScrollReveal();
  }

  return { init, initScrollReveal, autoTagRevealElements };
})();
