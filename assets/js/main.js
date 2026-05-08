/* ===== Dhalam Couture — Main JS ===== */

const App = (() => {
  let settings = null;

  async function loadSettings() {
    try {
      const res = await fetch('data/settings.json');
      settings = await res.json();
    } catch {
      try {
        const res = await fetch('./data/settings.json');
        settings = await res.json();
      } catch (e) {
        console.error('Could not load settings.json:', e);
        settings = {};
      }
    }
    return settings;
  }

  /* --- Announcement Bar --- */
  function initAnnouncement() {
    const bar = document.getElementById('announcement-bar');
    if (!bar) return;
    if (localStorage.getItem('dc-announcement-dismissed') === 'true') {
      bar.remove();
      return;
    }
    bar.style.display = 'block';
    const btn = bar.querySelector('.dismiss-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        bar.style.display = 'none';
        localStorage.setItem('dc-announcement-dismissed', 'true');
      });
    }
  }

  /* --- Navigation Scroll Behavior --- */
  function initNavigation() {
    const nav = document.querySelector('.main-nav');
    const hero = document.querySelector('.hero-section');
    if (!nav) return;

    if (hero) {
      // Use IntersectionObserver for hero
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          nav.classList.add('nav-transparent');
          nav.classList.remove('nav-solid');
        } else {
          nav.classList.remove('nav-transparent');
          nav.classList.add('nav-solid');
        }
      }, { threshold: 0, rootMargin: '-80px 0px 0px 0px' });
      observer.observe(hero);
    } else {
      // No hero: always solid
      nav.classList.remove('nav-transparent');
      nav.classList.add('nav-solid');
    }
  }

  /* --- Mobile Menu --- */
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const close = document.getElementById('mobile-menu-close');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (!toggle || !overlay) return;

    toggle.addEventListener('click', () => {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    const closeMenu = () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };
    if (close) close.addEventListener('click', closeMenu);
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* --- Floating WhatsApp Button --- */
  function initFloatingWA() {
    const fab = document.getElementById('floating-wa');
    if (!fab) return;
    setTimeout(() => fab.classList.add('visible'), 3000);
    fab.addEventListener('click', () => {
      const url = typeof WhatsApp !== 'undefined' ? WhatsApp.buildGeneralURL() : 'https://wa.me/919876543210';
      window.open(url, '_blank');
    });
  }

  /* --- Lightbox --- */
  function initLightbox() {
    const overlay = document.getElementById('lightbox-overlay');
    if (!overlay) return;
    const content = overlay.querySelector('.lightbox-content');
    const closeBtn = overlay.querySelector('.lightbox-close');

    // Close handlers
    const closeLightbox = () => {
      overlay.classList.remove('active');
      if (content) content.innerHTML = '';
      document.body.style.overflow = '';
    };
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

    // Reel cards
    document.querySelectorAll('.reel-card').forEach(card => {
      card.addEventListener('click', () => {
        const videoSrc = card.dataset.video;
        const imgSrc = card.dataset.cover;
        if (videoSrc) {
          content.innerHTML = `<video src="${videoSrc}" controls autoplay playsinline style="max-height:85vh;border-radius:8px"></video>`;
        } else if (imgSrc) {
          content.innerHTML = `<img src="${imgSrc}" alt="Reel" style="max-height:85vh;border-radius:8px" />`;
        }
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  /* --- Image Lightbox (product page) --- */
  function openImageLightbox(src, alt) {
    const overlay = document.getElementById('lightbox-overlay');
    if (!overlay) return;
    const content = overlay.querySelector('.lightbox-content');
    content.innerHTML = `<img src="${src}" alt="${alt || ''}" />`;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /* --- Init --- */
  async function init() {
    const s = await loadSettings();
    if (typeof WhatsApp !== 'undefined') WhatsApp.init(s);
    if (typeof WhatsApp !== 'undefined') WhatsApp.attachHandlers();
    initAnnouncement();
    initNavigation();
    initMobileMenu();
    initFloatingWA();
    initLightbox();
    // Init animations after a tick to let content render
    requestAnimationFrame(() => {
      if (typeof Animations !== 'undefined') Animations.init();
    });
  }

  return { init, settings: () => settings, openImageLightbox };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
