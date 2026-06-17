/* ===== Dhalam Couture — Main JS ===== */

const App = (() => {
  let settings = null;

  async function loadSettings() {
    try {
      const res = await fetch('data/settings.json', { cache: 'no-store' });
      settings = await res.json();
    } catch {
      try {
        const res = await fetch('./data/settings.json', { cache: 'no-store' });
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
    const announcementBar = document.getElementById('announcement-bar');
    const dismissBtn = document.getElementById('dismiss-announcement');
    if (!announcementBar) return;

    if (localStorage.getItem('announcementDismissed') === 'true') {
      announcementBar.style.display = 'none';
    }

    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        announcementBar.style.opacity = '0';
        announcementBar.style.height = '0';
        announcementBar.style.padding = '0';
        announcementBar.style.overflow = 'hidden';
        setTimeout(() => announcementBar.remove(), 300);
        localStorage.setItem('announcementDismissed', 'true');
      });
    }
  }

  /* --- Scroll to Top --- */
  function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (!scrollToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
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
    fab.addEventListener('click', (e) => {
      e.preventDefault();
      const url = typeof WhatsApp !== 'undefined' ? WhatsApp.buildGeneralURL() : 'https://wa.me/919526352500?text=Hi%20Dhalam%20Couture!%20I%20found%20you%20on%20Instagram.';
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
    initScrollToTop();
    initMobileMenu();
    initFloatingWA();
    initLightbox();
    // Init Quick View modal
    if (typeof QuickView !== 'undefined') QuickView.init();
    // Init animations after a tick to let content render
    requestAnimationFrame(() => {
      if (typeof Animations !== 'undefined') Animations.init();
    });
  }

  return { init, settings: () => settings, openImageLightbox };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
