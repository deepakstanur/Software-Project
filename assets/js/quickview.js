/* ===== Dhalam Couture — Quick View Module ===== */

const QuickView = (() => {
  let currentProduct = null;
  let currentImageIndex = 0;
  let overlay = null;

  function init() {
    // Inject modal HTML into the page
    const modalHTML = `
    <div id="quickview-overlay" class="qv-overlay" role="dialog" aria-modal="true" aria-label="Quick view">
      <div class="qv-modal">
        <button class="qv-close" aria-label="Close quick view">&times;</button>
        <div class="qv-gallery">
          <div class="qv-main-image">
            <button class="qv-arrow qv-arrow-left" aria-label="Previous image">&#8249;</button>
            <img id="qv-main-img" src="" alt="" />
            <button class="qv-arrow qv-arrow-right" aria-label="Next image">&#8250;</button>
            <span class="qv-counter" id="qv-counter"></span>
          </div>
          <div class="qv-thumbs" id="qv-thumbs"></div>
        </div>
        <div class="qv-details" id="qv-details"></div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    overlay = document.getElementById('quickview-overlay');
    const modal = overlay.querySelector('.qv-modal');

    // Close handlers
    overlay.querySelector('.qv-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    // Arrow handlers
    overlay.querySelector('.qv-arrow-left').addEventListener('click', () => navigate(-1));
    overlay.querySelector('.qv-arrow-right').addEventListener('click', () => navigate(1));

    // Keyboard handlers
    document.addEventListener('keydown', (e) => {
      if (!overlay || !overlay.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });

    // Event delegation for Quick View buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-view-btn');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        const productId = btn.dataset.productId;
        if (productId) open(productId);
      }
    });
  }

  async function open(productId) {
    if (typeof Products === 'undefined') return;
    const products = await Products.fetchProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentProduct = product;
    currentImageIndex = 0;

    // Populate gallery
    renderGallery(product);
    goToImage(0);

    // Populate details
    renderDetails(product);

    // Show modal
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
    currentImageIndex = 0;
  }

  function renderGallery(product) {
    const images = product.images || [];
    const thumbsContainer = document.getElementById('qv-thumbs');

    // Render thumbnails
    thumbsContainer.innerHTML = images.map((img, i) =>
      `<div class="qv-thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
        <img src="${img}" alt="${product.name} - Image ${i + 1}" />
      </div>`
    ).join('');

    // Thumbnail click handlers
    thumbsContainer.querySelectorAll('.qv-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        goToImage(parseInt(thumb.dataset.index));
      });
    });
  }

  function renderDetails(product) {
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const waURL = typeof WhatsApp !== 'undefined' ? WhatsApp.buildInquiryURL(product) : '#';
    const isSaree = product.category === 'sarees';
    const productLink = isSaree ? '#' : `product.html?id=${product.id}`;

    const detailsEl = document.getElementById('qv-details');
    detailsEl.innerHTML = `
      <div class="qv-category">${product.subcategory || product.category}</div>
      <h3 class="qv-title">${product.name}</h3>
      <div class="qv-price">
        ${product.currency}${product.price.toLocaleString('en-IN')}
        ${hasDiscount ? `<span class="original-price">${product.currency}${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
      </div>
      ${product.description ? `<p class="qv-description">${truncateDescription(product.description, 200)}</p>` : ''}
      <div class="qv-actions">
        ${!isSaree ? `<a href="${waURL}" target="_blank" rel="noopener" class="qv-wa-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          Order on WhatsApp
        </a>` : ''}
        ${!isSaree ? `<a href="${productLink}" class="qv-view-link">View Full Details <span>→</span></a>` : ''}
      </div>
    `;
  }

  function goToImage(index) {
    if (!currentProduct) return;
    const images = currentProduct.images || [];
    if (images.length === 0) return;

    currentImageIndex = index;
    const mainImg = document.getElementById('qv-main-img');
    mainImg.src = images[currentImageIndex];
    mainImg.alt = `${currentProduct.name} - Image ${currentImageIndex + 1}`;

    // Update counter
    document.getElementById('qv-counter').textContent = `${currentImageIndex + 1} / ${images.length}`;

    // Update active thumbnail
    const thumbs = document.querySelectorAll('#qv-thumbs .qv-thumb');
    thumbs.forEach((t, i) => {
      t.classList.toggle('active', i === currentImageIndex);
    });

    // Scroll active thumb into view
    const activeThumb = thumbs[currentImageIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  function navigate(direction) {
    if (!currentProduct) return;
    const images = currentProduct.images || [];
    if (images.length === 0) return;

    let newIndex = currentImageIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    goToImage(newIndex);
  }

  function truncateDescription(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '…';
  }

  return { init, open, close };
})();
