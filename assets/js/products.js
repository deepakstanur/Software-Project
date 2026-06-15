/* ===== Dhalam Couture — Products Module ===== */

const Products = (() => {
  let productsCache = null;
  let categoriesCache = null;

  async function fetchProducts() {
    if (productsCache) return productsCache;
    try {
      const res = await fetch('data/products.json', { cache: 'no-store' });
      const data = await res.json();
      productsCache = data.products;
      return productsCache;
    } catch (e) {
      console.warn('Products fetch failed, trying relative path...', e);
      try {
        const res = await fetch('./data/products.json', { cache: 'no-store' });
        const data = await res.json();
        productsCache = data.products;
        return productsCache;
      } catch (e2) {
        console.error('Could not load products.json:', e2);
        return [];
      }
    }
  }

  async function fetchCategories() {
    if (categoriesCache) return categoriesCache;
    try {
      const res = await fetch('data/categories.json', { cache: 'no-store' });
      const data = await res.json();
      categoriesCache = data.categories;
      return categoriesCache;
    } catch {
      try {
        const res = await fetch('./data/categories.json', { cache: 'no-store' });
        const data = await res.json();
        categoriesCache = data.categories;
        return categoriesCache;
      } catch (e) {
        console.error('Could not load categories.json:', e);
        return [];
      }
    }
  }

  function getStockClass(status) {
    if (status === 'in_stock') return 'stock-in';
    if (status === 'low_stock') return 'stock-low';
    return 'stock-out';
  }

  function getStockLabel(product) {
    if (product.stockStatus === 'in_stock') return 'In Stock';
    if (product.stockStatus === 'low_stock') return `Only ${product.stockCount} left`;
    return 'Out of Stock';
  }

  function renderProductCard(product) {
    const isOut = product.stockStatus === 'out_of_stock';
    const isSaree = product.category === 'sarees';
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const badges = [];
    if (product.newArrival && !isSaree) badges.push('<span class="product-card-badge badge-new">New</span>');
    if (hasDiscount && !product.newArrival && !isSaree) badges.push('<span class="product-card-badge badge-sale">Sale</span>');

    const imgSrc = product.images?.[0] || '';
    const placeholderBgs = ['cream', 'blush', 'mauve', 'rose'];
    const bgClass = placeholderBgs[Math.floor(Math.random() * placeholderBgs.length)];

    const waURL = typeof WhatsApp !== 'undefined' ? WhatsApp.buildInquiryURL(product) : '#';

    return `
    <article class="product-card ${isOut ? 'out-of-stock' : ''} ${isSaree ? 'is-coming-soon' : ''}" data-product-id="${product.id}">
      <a href="${isSaree ? 'javascript:void(0)' : `product.html?id=${product.id}`}" class="product-card-link" aria-label="View ${product.name}">
        <div class="product-card-image">
          ${badges.join('')}
          <img src="${imgSrc}" alt="${product.name}" width="400" height="533" loading="lazy" decoding="async"
               data-placeholder-bg="${bgClass}" data-placeholder-name="${product.name}" />
          ${(!isOut && !isSaree) ? `<a href="${waURL}" target="_blank" rel="noopener" class="product-card-wa" aria-label="Order ${product.name} on WhatsApp" onclick="event.stopPropagation()">
            <i data-lucide="message-circle" style="width:20px;height:20px"></i>
          </a>` : ''}
        </div>
        <div class="product-card-info">
          <div class="product-card-category">${product.subcategory || product.category}</div>
          <h3 class="product-card-name">${product.name}</h3>
          <div class="product-card-price">
            ${product.currency}${product.price.toLocaleString('en-IN')}
            ${hasDiscount ? `<span class="original-price">${product.currency}${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          </div>
          ${isSaree ? `
          <div class="stock-badge stock-coming-soon">
            <span class="stock-dot" style="background-color:var(--color-gold)"></span> Coming Soon
          </div>
          ` : `
          <div class="stock-badge ${getStockClass(product.stockStatus)}">
            <span class="stock-dot"></span> ${getStockLabel(product)}
          </div>
          `}
        </div>
      </a>
    </article>`;
  }

  function renderProductGrid(products, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    if (products.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 px-6 flex flex-col items-center justify-center text-center rounded-xl border border-[#C8DCC9]/40 shadow-sm transition-all duration-300 hover:shadow-md max-w-2xl mx-auto my-6" style="background-color: rgba(122, 158, 126, 0.08);">
          <div class="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-4 border border-[#C8DCC9]/30">
            <i data-lucide="sparkles" style="width:28px;height:28px;color:var(--color-mid-green)"></i>
          </div>
          <h3 class="font-display text-2xl font-semibold text-charcoal mb-3">Our collection is being lovingly curated</h3>
          <p class="text-stone text-sm max-w-md mb-6 leading-relaxed">
            We are handpicking the finest threads and patterns to bring you something truly magical. Follow us on Instagram for first looks, BTS, and exclusive launch offers!
          </p>
          <a href="https://www.instagram.com/dhalamcouture/" target="_blank" rel="noopener noreferrer" class="btn-pill btn-deep-rose inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-300">
            <i data-lucide="instagram" style="width:16px;height:16px"></i> Follow @dhalamcouture
          </a>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }
    const html = products.map(p => renderProductCard(p)).join('');
    container.innerHTML = html;
    // Handle broken images with placeholders
    container.querySelectorAll('.product-card-image img').forEach(img => {
      img.addEventListener('error', function() {
        const bg = this.dataset.placeholderBg || 'cream';
        const name = this.dataset.placeholderName || '';
        const div = document.createElement('div');
        div.className = `placeholder-img ${bg}`;
        div.style.aspectRatio = '3/4';
        div.textContent = name;
        this.replaceWith(div);
      });
    });
    // Re-init lucide icons
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  async function renderFeaturedProducts(type, containerSelector, limit = 12) {
    const products = await fetchProducts();
    let filtered;
    if (type === 'hotSelling') filtered = products.filter(p => p.hotSelling);
    else if (type === 'newArrival') filtered = products.filter(p => p.newArrival);
    else if (type === 'featured') filtered = products.filter(p => p.featured);
    else filtered = products;
    renderProductGrid(filtered.slice(0, limit), containerSelector);
  }

  async function renderProductDetail(productId) {
    const products = await fetchProducts();
    const product = products.find(p => p.id === productId);
    if (!product) {
      document.getElementById('product-detail')?.insertAdjacentHTML('beforeend',
        '<p style="text-align:center;padding:4rem;">Product not found.</p>');
      return null;
    }
    return product;
  }

  function getRelatedProducts(product, count = 4) {
    if (!productsCache) return [];
    return productsCache
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, count);
  }

  return { fetchProducts, fetchCategories, renderProductCard, renderProductGrid, renderFeaturedProducts, renderProductDetail, getRelatedProducts };
})();
