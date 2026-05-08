/* ===== Dhalam Couture — Animations Module ===== */

const Animations = (() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initHeroAnimation() {
    if (prefersReducedMotion) return;
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-label', { opacity: 0, y: 20, duration: 0.8 })
      .from('.hero-headline', { opacity: 0, y: 40, duration: 1 }, '-=0.5')
      .from('.hero-sub', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
      .from('.hero-ctas > *', { opacity: 0, y: 20, duration: 0.6, stagger: 0.15 }, '-=0.4')
      .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.2');
  }

  function initScrollAnimations() {
    if (prefersReducedMotion) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Section titles
    gsap.utils.toArray('.section-title, .section-subtitle').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 0, y: 30, duration: 0.8, ease: 'power2.out'
      });
    });

    // Product cards batch
    ScrollTrigger.batch('.product-card', {
      onEnter: (elements) => {
        gsap.from(elements, { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
      },
      start: 'top 88%'
    });

    // Category tiles
    gsap.utils.toArray('.category-tile').forEach((tile, i) => {
      gsap.from(tile, {
        scrollTrigger: { trigger: tile, start: 'top 85%' },
        opacity: 0, y: 30, duration: 0.7, delay: i * 0.15, ease: 'power2.out'
      });
    });

    // Brand story
    const storyImg = document.querySelector('.brand-story-image');
    const storyText = document.querySelector('.brand-story-text');
    if (storyImg) {
      gsap.from(storyImg, {
        scrollTrigger: { trigger: storyImg, start: 'top 80%' },
        opacity: 0, x: -50, duration: 1, ease: 'power2.out'
      });
    }
    if (storyText) {
      gsap.from(storyText, {
        scrollTrigger: { trigger: storyText, start: 'top 80%' },
        opacity: 0, x: 50, duration: 1, ease: 'power2.out'
      });
    }

    // Offer / CTA banners
    gsap.utils.toArray('.offer-banner, .wa-cta-banner').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out'
      });
    });

    // Reel cards
    ScrollTrigger.batch('.reel-card', {
      onEnter: (elements) => {
        gsap.from(elements, { opacity: 0, scale: 0.92, duration: 0.5, stagger: 0.08, ease: 'power2.out' });
      },
      start: 'top 90%'
    });
  }

  function initHoverEffects() {
    // Handled via CSS transitions for performance
  }

  function init() {
    initHeroAnimation();
    initScrollAnimations();
    initHoverEffects();
  }

  return { init, initHeroAnimation, initScrollAnimations, initHoverEffects };
})();
