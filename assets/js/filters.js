/* ===== Dhalam Couture — Filters Module ===== */

const Filters = (() => {
  let allProducts = [];
  let filteredProducts = [];
  let currentCategory = 'all';
  let currentSubcategory = null;
  let currentTag = null;
  let productsPerPage = 12;
  let currentPage = 1;
  let categories = [];

  async function init() {
    allProducts = await Products.fetchProducts();
    categories = await Products.fetchCategories();
    setupFilterBar();
    applyFilters();
  }

  function setupFilterBar() {
    const mainFilters = document.getElementById('main-filters');
    const subFilters = document.getElementById('sub-filters');
    if (!mainFilters) return;

    // Main category pills
    const pills = [
      { label: 'All', value: 'all', type: 'category' },
      { label: 'Kurtis', value: 'kurtis', type: 'category' },
      { label: 'Sarees', value: 'sarees', type: 'category' },
      { label: 'New Arrivals', value: 'newArrival', type: 'tag' },
      { label: 'Bestsellers', value: 'hotSelling', type: 'tag' }
    ];

    mainFilters.innerHTML = pills.map(p =>
      `<button class="filter-pill ${p.value === 'all' ? 'active' : ''}" data-filter-type="${p.type}" data-filter-value="${p.value}" aria-label="Filter by ${p.label}">${p.label}</button>`
    ).join('');

    mainFilters.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => handleMainFilter(btn));
    });
  }

  function handleMainFilter(btn) {
    const type = btn.dataset.filterType;
    const value = btn.dataset.filterValue;

    // Update active state
    document.querySelectorAll('#main-filters .filter-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');

    currentSubcategory = null;
    currentPage = 1;

    if (type === 'tag') {
      currentCategory = 'all';
      currentTag = value;
    } else {
      currentCategory = value;
      currentTag = null;
    }

    updateSubcategoryPills();
    applyFilters();
  }

  function updateSubcategoryPills() {
    const subFilters = document.getElementById('sub-filters');
    if (!subFilters) return;

    if (currentCategory === 'all' || currentTag) {
      subFilters.innerHTML = '';
      return;
    }

    const cat = categories.find(c => c.id === currentCategory);
    if (!cat || !cat.subcategories?.length) {
      subFilters.innerHTML = '';
      return;
    }

    subFilters.innerHTML = `<button class="filter-pill active" data-sub="all">All ${cat.name}</button>` +
      cat.subcategories.map(s =>
        `<button class="filter-pill" data-sub="${s.id}">${s.name}</button>`
      ).join('');

    subFilters.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        subFilters.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        currentSubcategory = btn.dataset.sub === 'all' ? null : btn.dataset.sub;
        currentPage = 1;
        applyFilters();
      });
    });
  }

  function filterProducts() {
    let result = [...allProducts];

    if (currentTag) {
      result = result.filter(p => p[currentTag] === true);
    } else if (currentCategory !== 'all') {
      result = result.filter(p => p.category === currentCategory);
      if (currentSubcategory) {
        result = result.filter(p => p.subcategory === currentSubcategory);
      }
    }

    return result;
  }

  function applyFilters() {
    filteredProducts = filterProducts();
    updateProductCount(filteredProducts.length);
    renderCurrentPage();
  }

  function renderCurrentPage() {
    const grid = document.getElementById('products-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!grid) return;

    const visible = filteredProducts.slice(0, currentPage * productsPerPage);
    grid.innerHTML = '';
    Products.renderProductGrid(visible, '#products-grid');

    if (loadMoreBtn) {
      loadMoreBtn.style.display = visible.length < filteredProducts.length ? 'inline-flex' : 'none';
    }

    // Re-init scroll animations for new cards
    if (typeof Animations !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }

  function loadMore() {
    currentPage++;
    renderCurrentPage();
  }

  function updateProductCount(count) {
    const el = document.getElementById('product-count');
    if (el) el.textContent = `Showing ${count} product${count !== 1 ? 's' : ''}`;
  }

  return { init, loadMore, applyFilters };
})();
