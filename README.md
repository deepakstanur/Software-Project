# Dhalam Couture — Premium Ethnic Fashion Catalog

A beautiful static fashion catalog website for Dhalam Couture, an Instagram-first boutique selling premium women's kurtis and sarees.

## 🚀 Getting Started

### View Locally (Simple)
1. Open `index.html` directly in your browser to view the homepage
2. For full functionality (product pages), you need a local server:

**Using Python (if installed):**
```bash
python -m http.server 8000
```
Then open: `http://localhost:8000`

**Using Node.js (if installed):**
```bash
npx -y serve .
```
Then open the URL shown in terminal.

**Using VS Code:**
Install the "Live Server" extension, right-click `index.html` → "Open with Live Server"

## 📦 Project Structure

```
├── index.html              # Homepage
├── collections.html        # Product grid with filters
├── product.html            # Product detail page
├── about.html              # Brand story
├── contact.html            # Contact + FAQ
├── assets/
│   ├── css/custom.css      # Custom styles & design tokens
│   ├── js/
│   │   ├── main.js         # Navigation, mobile menu, WhatsApp FAB
│   │   ├── products.js     # Product rendering from JSON
│   │   ├── filters.js      # Category filtering & pagination
│   │   ├── animations.js   # GSAP scroll animations
│   │   └── whatsapp.js     # WhatsApp URL builder
│   └── images/
│       ├── hero/           # Hero section images
│       ├── products/       # Product images (krt-001/, krt-002/, etc.)
│       ├── categories/     # Category tile images
│       └── reels/          # Instagram reel covers
├── data/
│   ├── products.json       # All product data
│   ├── categories.json     # Category tree
│   └── settings.json       # Site configuration
└── README.md
```

## 🛍️ How to Update Products

### Adding a New Product
1. Open `data/products.json` in any text editor
2. Copy an existing product block (everything between `{ }`)
3. Paste it at the end of the products array (before the final `]`)
4. Update all fields:
   - **id**: Unique ID like `krt-004` or `sar-004`
   - **name**: Product display name
   - **price**: Current price (number only, no ₹ symbol)
   - **originalPrice**: Original price if on sale, or `null`
   - **images**: Array of image paths (see below)
5. Save the file

### Adding Product Images
1. Create a folder: `assets/images/products/YOUR-PRODUCT-ID/`
2. Add 4 WebP images named: `YOUR-ID-1.webp`, `YOUR-ID-2.webp`, etc.
3. Recommended: 800×1067px (3:4 ratio), WebP format
4. Update the `images` array in `products.json` with the correct paths

### Marking a Product Out of Stock
1. Open `data/products.json`
2. Find the product by its `id`
3. Change `"stockStatus": "in_stock"` to `"stockStatus": "out_of_stock"`
4. Change `"stockCount": null` to `"stockCount": 0`
5. For individual sizes, set `"available": false` in the sizes array
6. Save the file

### Marking Low Stock
1. Change `"stockStatus"` to `"low_stock"`
2. Set `"stockCount"` to the actual number remaining (e.g., `2`)

## 📱 Changing WhatsApp Number
1. Open `data/settings.json`
2. Find `"whatsappNumber"` and update to your number (with country code, e.g., `"+919876543210"`)
3. Save the file

## 🌐 Deploy to GitHub Pages
1. Push this entire folder to a GitHub repository
2. Go to your repo → Settings → Pages
3. Under "Source", select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Click Save
6. Your site will be live at `https://yourusername.github.io/your-repo-name/`

## 🎨 Tech Stack
- HTML5 + Tailwind CSS v3 (CDN)
- Vanilla JavaScript ES6+
- GSAP 3 + ScrollTrigger (animations)
- Lucide Icons
- Google Fonts (Cormorant Garamond + DM Sans)

## 📝 Notes
- No backend or database required — everything runs from static files
- Product detail pages require a server to load JSON data via `fetch()`
- All animations respect `prefers-reduced-motion` for accessibility
- Minimum tap target size: 44×44px for mobile accessibility
