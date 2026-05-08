import re
import os

# 1. custom.css
with open('assets/css/custom.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace color palette
old_colors = """  --color-cream: #FAF7F2;
  --color-warm-white: #FFFFFF;
  --color-blush: #D4A5A5;
  --color-mauve: #B8869C;
  --color-deep-rose: #8B4565;
  --color-charcoal: #2C2C2C;
  --color-stone: #6B6B6B;
  --color-border: #E0DAD4;
  --color-light-grey: #E8E4DF;
  --color-in-stock: #4A7C59;
  --color-low-stock: #B5823A;
  --color-out-of-stock: #9E9E9E;
  --color-whatsapp: #25D366;
  --gradient-hero: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%);"""

new_colors = """  /* ─── PRIMARY — Deep Botanical Green ─── */
  --color-forest:        #2C3D2E;
  --color-deep-green:    #3D5C40;
  --color-mid-green:     #4A7050;
  --color-sage:          #7A9E7E;
  --color-mint-soft:     #C8DCC9;
  /* ─── ACCENT — Warm Gold ─── */
  --color-gold:          #C9A84C;
  --color-gold-light:    #E2C97E;
  --color-gold-dark:     #9A7A2E;
  --color-gold-muted:    #D4B97A;
  /* ─── NEUTRALS — Warm Ivory Base ─── */
  --color-cream:         #FAF8F3;
  --color-warm-white:    #FFFFFF;
  --color-ivory:         #F5F0E8;
  --color-parchment:     #EDE5D4;
  /* ─── TEXT ─── */
  --color-charcoal:      #1E2A1F;
  --color-stone:         #5A6B5C;
  --color-muted:         #8A9E8C;
  /* ─── STATUS ─── */
  --color-in-stock:      #3D5C40;
  --color-low-stock:     #B5823A;
  --color-out-of-stock:  #9E9E9E;
  /* ─── WHATSAPP ─── */
  --color-whatsapp:      #25D366;
  --color-whatsapp-dark: #128C7E;
  /* ─── GRADIENTS ─── */
  --gradient-hero:    linear-gradient(180deg, rgba(28,42,30,0.15) 0%, rgba(28,42,30,0.65) 100%);
  --gradient-section: linear-gradient(135deg, #2C3D2E 0%, #3D5C40 100%);
  --gradient-gold:    linear-gradient(135deg, #C9A84C 0%, #E2C97E 50%, #C9A84C 100%);
  --gradient-card:    linear-gradient(180deg, transparent 50%, rgba(28,42,30,0.75) 100%);
  --color-border:        #C8DCC9;
  --color-light-grey:    #F5F0E8;
  --color-blush:         #C9A84C;
  --color-mauve:         #E2C97E;
  --color-deep-rose:     #3D5C40;"""

css = css.replace(old_colors, new_colors)

# Replace announcement bar css
old_announcement = """/* --- Announcement Bar --- */
.announcement-bar {
  background: var(--color-charcoal);
  color: #fff;
  font-family: var(--font-ui);
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 60;
}
.announcement-bar .dismiss-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  opacity: 0.7;
  transition: opacity 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.announcement-bar .dismiss-btn:hover { opacity: 1; }
.announcement-marquee {
  display: inline-block;
  white-space: nowrap;
}
@media (max-width: 767px) {
  .announcement-marquee {
    animation: marquee 18s linear infinite;
  }
}
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}"""

new_announcement = """/* --- Announcement Bar --- */
.announcement-bar {
  position: relative; /* NOT fixed, NOT absolute */
  width: 100%;
  z-index: 100;
  background: var(--color-deep-green);
  color: var(--color-gold-light);
  text-align: center;
  padding: 0.5rem 3rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  transition: height 0.3s ease, opacity 0.3s ease;
}
.announcement-bar #dismiss-announcement {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gold-light);
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}"""

css = css.replace(old_announcement, new_announcement)

# Replace nav css
old_nav = """/* --- Navigation --- */
.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, color 0.3s ease-in-out;
  padding: 1rem 1.25rem;
}"""

new_nav = """/* --- Navigation --- */
.main-nav {
  position: sticky;
  top: 0;
  z-index: 200;
  width: 100%;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  padding: 1rem 1.25rem;
}"""

css = css.replace(old_nav, new_nav)

# Buttons
old_buttons = """.btn-primary {
  background: var(--color-blush);
  color: var(--color-charcoal);
}
.btn-primary:hover { background: var(--color-mauve); color: #fff; }
.btn-outline-white {
  background: transparent;
  border: 1.5px solid #fff;
  color: #fff;
}
.btn-outline-white:hover { background: rgba(255,255,255,0.15); }
.btn-whatsapp {
  background: var(--color-whatsapp);
  color: #fff;
  font-weight: 600;
}
.btn-whatsapp:hover { background: #20bd5a; }
.btn-deep-rose {
  background: var(--color-deep-rose);
  color: #fff;
}
.btn-deep-rose:hover { background: #73395a; }"""

new_buttons = """.btn-primary {
  background: var(--color-deep-green);
  color: white;
}
.btn-primary:hover { background: var(--color-mid-green); transform: translateY(-1px); }
.btn-outline-white {
  background: transparent;
  border: 1.5px solid #fff;
  color: #fff;
}
.btn-outline-white:hover { background: rgba(255,255,255,0.15); }
.btn-whatsapp {
  background: var(--color-whatsapp);
  color: #fff;
  font-weight: 600;
  animation: whatsapp-pulse 2.5s ease infinite;
}
.btn-whatsapp:hover { background: var(--color-whatsapp-dark); }
.btn-deep-rose {
  background: var(--color-deep-green);
  color: #fff;
}
.btn-deep-rose:hover { background: var(--color-mid-green); }
.btn-outline-gold {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--color-gold);
  border: 1.5px solid var(--color-gold);
  border-radius: 9999px;
  padding: 0.875rem 2rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
}
.btn-outline-gold:hover {
  background: var(--color-gold);
  color: var(--color-forest);
}
@keyframes whatsapp-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.35); }
  50% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
}"""

css = css.replace(old_buttons, new_buttons)

# Typography/Headings
old_typography = """.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 400;
  color: var(--color-charcoal);
}"""

new_typography = """.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 400;
  color: var(--color-charcoal);
}
.section-eyebrow {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-sage);
  display: block;
  margin-bottom: 0.5rem;
}
.dark-section .section-title,
.footer .section-title,
.hero-content .hero-headline {
  color: var(--color-gold);
}
.section-title::after {
  content: '';
  display: block;
  width: 40px;
  height: 1.5px;
  background: var(--gradient-gold);
  margin: 0.75rem auto 0;
}
.instagram-handle {
  color: var(--color-gold);
  text-decoration: none;
  border-bottom: 1px solid var(--color-gold-light);
  transition: color 0.2s ease;
}
.instagram-handle:hover { color: var(--color-gold-light); }
.product-name, h1, h2 {
  font-family: 'Cormorant Garamond', serif;
  color: var(--color-charcoal);
}"""

css = css.replace(old_typography, new_typography)

# Replace Reels CSS
old_reels_css = """/* --- Reel Gallery --- */
.reel-scroll-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1rem;
  scrollbar-width: none;
}
.reel-scroll-container::-webkit-scrollbar { display: none; }
.reel-card {
  flex: 0 0 180px;
  aspect-ratio: 9/16;
  border-radius: var(--radius-card);
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;
  cursor: pointer;
  background: var(--color-light-grey);
}
.reel-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.reel-play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.2);
  transition: background 0.3s;
}
.reel-card:hover .reel-play-btn { background: rgba(0,0,0,0.35); }
.reel-play-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-charcoal);
}"""

new_reels_css = """/* --- Reel Gallery --- */
.reels-strip {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 1rem 1.25rem 1.5rem;
}
.reels-strip::-webkit-scrollbar { display: none; }
.reel-card {
  scroll-snap-align: start;
  flex: 0 0 auto;
  width: 180px;
  cursor: pointer;
}
.reel-thumb {
  width: 180px;
  height: 320px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}
.reel-overlay {
  position: absolute;
  inset: 0;
  background: rgba(28, 42, 30, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.reel-card:hover .reel-overlay { opacity: 1; }
.reel-play-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(201, 168, 76, 0.85); /* gold */
  display: flex;
  align-items: center;
  justify-content: center;
}
.reel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem;
  background: linear-gradient(transparent, rgba(28,42,30,0.85));
  color: white;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  line-height: 1.3;
}
/* Lightbox Reels additions */
.reel-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.reel-lightbox.active { opacity: 1; pointer-events: all; }
.lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(28, 42, 30, 0.92);
  cursor: pointer;
}
.instagram-fallback-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  border: 1px solid var(--color-gold);
  color: white;
  text-decoration: none;
  text-align: center;
  backdrop-filter: blur(4px);
}"""

css = css.replace(old_reels_css, new_reels_css)

with open('assets/css/custom.css', 'w', encoding='utf-8') as f:
    f.write(css)


# 2. main.js
with open('assets/js/main.js', 'r', encoding='utf-8') as f:
    main_js = f.read()

old_main_announcement = """  function initAnnouncement() {
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
  }"""

new_main_announcement = """  function initAnnouncement() {
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
  }"""

main_js = main_js.replace(old_main_announcement, new_main_announcement)

old_main_nav = """        if (entry.isIntersecting) {
          nav.classList.add('nav-transparent');
          nav.classList.remove('nav-solid');
        } else {
          nav.classList.remove('nav-transparent');
          nav.classList.add('nav-solid');
        }
      }, { threshold: 0, rootMargin: '-80px 0px 0px 0px' });"""

new_main_nav = """        if (entry.isIntersecting) {
          nav.classList.remove('nav-solid');
          nav.classList.add('nav-transparent');
        } else {
          nav.classList.remove('nav-transparent');
          nav.classList.add('nav-solid');
        }
      }, { threshold: 0.1 });"""

main_js = main_js.replace(old_main_nav, new_main_nav)

with open('assets/js/main.js', 'w', encoding='utf-8') as f:
    f.write(main_js)

# 3. index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add favicon
if '<link rel="icon"' not in html:
    html = html.replace('<!-- Fonts -->', '<!-- Favicon -->\n  <link rel="icon" href="assets/images/brand/logo.png" type="image/png" sizes="32x32" />\n  <!-- Fonts -->')

# Replace Announcement bar
old_html_announcement = """  <!-- SECTION 1: Announcement Bar -->
  <div id="announcement-bar" class="announcement-bar" style="display:none">
    <span class="announcement-marquee">✨ Free Shipping on Orders Above ₹999 — Order on WhatsApp</span>
    <button class="dismiss-btn" aria-label="Dismiss announcement"><i data-lucide="x" style="width:16px;height:16px"></i></button>
  </div>"""

new_html_announcement = """  <!-- Layer 1: Announcement bar — part of normal document flow -->
  <div id="announcement-bar" class="announcement-bar">
    ✨ Free Shipping on orders above ₹999 — Order on WhatsApp
    <button id="dismiss-announcement" aria-label="Dismiss">×</button>
  </div>"""

html = html.replace(old_html_announcement, new_html_announcement)

# Replace Nav Header & Logo
old_html_nav = """  <!-- SECTION 2: Navigation -->
  <nav class="main-nav nav-transparent flex items-center justify-between" aria-label="Main navigation">
    <!-- Mobile: hamburger left -->
    <button id="mobile-menu-toggle" class="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Open menu">
      <i data-lucide="menu" style="width:24px;height:24px"></i>
    </button>
    <!-- Logo -->
    <a href="index.html" class="nav-logo">Dhalam Couture</a>"""

new_html_nav = """  <!-- Layer 2: Sticky nav BELOW the announcement bar — NOT fixed from top:0 -->
  <header id="main-nav" class="main-nav nav-transparent flex items-center justify-between" aria-label="Main navigation">
    <!-- Mobile: hamburger left -->
    <button id="mobile-menu-toggle" class="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Open menu">
      <i data-lucide="menu" style="width:24px;height:24px"></i>
    </button>
    <!-- Logo -->
    <a href="index.html" class="nav-logo">
      <img src="assets/images/brand/logo.png" alt="Dhalam Couture" style="height: 44px;" class="lg:!h-[52px] rounded-full" />
    </a>"""

html = html.replace(old_html_nav, new_html_nav)
html = html.replace("</nav>", "</header>") # match the change to header

# Replace Reels section
old_html_reels = """    <!-- SECTION 8: Instagram Reels Gallery -->
    <section class="section-padding bg-white" aria-label="Instagram Reels">
      <div class="max-w-[1400px] mx-auto">
        <h2 class="section-title mb-8 flex items-center gap-3 justify-center">
          <i data-lucide="instagram" style="width:28px;height:28px;color:var(--color-deep-rose)"></i>
          As Seen on @dhalamcouture
        </h2>
        <div class="reel-scroll-container" id="reels-container">
          <!-- Placeholder reels -->
          <div class="reel-card" data-cover="" data-video="" style="background:linear-gradient(135deg,#D4A5A5,#B8869C)">
            <div class="reel-play-btn"><div class="reel-play-circle"><i data-lucide="play" style="width:20px;height:20px"></i></div></div>
          </div>
          <div class="reel-card" data-cover="" data-video="" style="background:linear-gradient(135deg,#B8869C,#8B4565)">
            <div class="reel-play-btn"><div class="reel-play-circle"><i data-lucide="play" style="width:20px;height:20px"></i></div></div>
          </div>
          <div class="reel-card" data-cover="" data-video="" style="background:linear-gradient(135deg,#8B4565,#2C2C2C)">
            <div class="reel-play-btn"><div class="reel-play-circle"><i data-lucide="play" style="width:20px;height:20px"></i></div></div>
          </div>
          <div class="reel-card" data-cover="" data-video="" style="background:linear-gradient(135deg,#D4A5A5,#E8E4DF)">
            <div class="reel-play-btn"><div class="reel-play-circle"><i data-lucide="play" style="width:20px;height:20px"></i></div></div>
          </div>
          <div class="reel-card" data-cover="" data-video="" style="background:linear-gradient(135deg,#E8E4DF,#B8869C)">
            <div class="reel-play-btn"><div class="reel-play-circle"><i data-lucide="play" style="width:20px;height:20px"></i></div></div>
          </div>
          <div class="reel-card" data-cover="" data-video="" style="background:linear-gradient(135deg,#B8869C,#D4A5A5)">
            <div class="reel-play-btn"><div class="reel-play-circle"><i data-lucide="play" style="width:20px;height:20px"></i></div></div>
          </div>
        </div>
      </div>
    </section>"""

new_html_reels = """    <!-- SECTION 8: Instagram Reels Gallery -->
    <section class="reels-section">
      <div class="section-header text-center pt-8 pb-4">
        <span class="section-eyebrow">Follow Along</span>
        <h2 class="section-title">As Seen on
          <a href="https://www.instagram.com/dhalamcouture/" 
             target="_blank" rel="noopener noreferrer" 
             class="instagram-handle">@dhalamcouture</a>
        </h2>
        <p class="section-subtitle text-stone">Watch our reels, fall in love with our pieces</p>
      </div>

      <!-- Horizontal scroll strip -->
      <div class="reels-strip" role="list" aria-label="Instagram Reels">
        <!-- JS populated from reels.json -->
      </div>

      <!-- View all CTA -->
      <div class="reels-cta text-center pb-8">
        <a href="https://www.instagram.com/dhalamcouture/" 
           target="_blank" rel="noopener noreferrer"
           class="btn-outline-gold">
          View All on Instagram →
        </a>
      </div>
    </section>"""

html = html.replace(old_html_reels, new_html_reels)

# Add Reel Lightbox
html_reel_lightbox = """  <!-- Reel Lightbox -->
  <div id="reel-lightbox" class="reel-lightbox" role="dialog" aria-modal="true" aria-label="Reel viewer">
    <button class="lightbox-close" onclick="closeReelLightbox()" aria-label="Close">×</button>
    <div class="lightbox-content">
      <video id="lightbox-video" controls playsinline preload="none"
             style="max-height: 85vh; max-width: 100%; border-radius: 12px;">
      </video>
      <!-- Fallback when local video not downloaded yet -->
      <a id="lightbox-instagram-link" 
         href="#" target="_blank" rel="noopener noreferrer"
         class="instagram-fallback-link" style="display:none;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        <span>Watch on Instagram</span>
        <small>Local video not yet available</small>
      </a>
    </div>
    <div class="lightbox-backdrop" onclick="closeReelLightbox()"></div>
  </div>

  <!-- Scripts -->"""

html = html.replace('  <!-- Scripts -->', html_reel_lightbox)

# Add reels.js to scripts
html_scripts = """  <script src="assets/js/whatsapp.js" defer></script>
  <script src="assets/js/products.js" defer></script>
  <script src="assets/js/reels.js" defer></script>
  <script src="assets/js/animations.js" defer></script>"""

html = html.replace("""  <script src="assets/js/whatsapp.js" defer></script>
  <script src="assets/js/products.js" defer></script>
  <script src="assets/js/animations.js" defer></script>""", html_scripts)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 4. README.md
readme_addition = """
## Instagram Reels Setup

**HOW TO ADD REEL COVER IMAGES:**
1. Go to each Instagram reel link
2. Take a screenshot of the reel thumbnail
3. Crop to 540×960px (9:16 portrait)
4. Convert to WebP at 80% quality (use squoosh.app)
5. Name it: reel-001-cover.webp, reel-002-cover.webp, etc.
6. Upload to: `assets/images/reels/` on GitHub

**HOW TO ADD REEL VIDEOS (OPTIONAL):**
1. Download reel video from Instagram (use snapinsta.app or similar)
2. Compress to under 5MB (use handbrake.fr — free)
3. Name it: reel-001.mp4, reel-002.mp4, etc.
4. Upload to: `assets/videos/reels/` on GitHub
5. If not added, clicking the reel will open Instagram instead — that's fine!
"""

with open('README.md', 'a', encoding='utf-8') as f:
    f.write(readme_addition)
