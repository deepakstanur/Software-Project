/* ===== Dhalam Couture — Reviews Module (Google Sheets Integration) ===== */

const Reviews = (() => {
  let apiUrl = "";
  const mockReviews = [
    {
      name: "Priya S.",
      location: "Mumbai",
      rating: 5,
      comment: "Absolutely love the quality! The fabric feels premium and the fit is perfect. Got so many compliments when I wore it to a family event. Will definitely order again!"
    },
    {
      name: "Anamika R.",
      location: "Bangalore",
      rating: 5,
      comment: "The cord set is stunning! Ordered through WhatsApp and the service was quick and very helpful. Packaging was also so elegant. Highly recommend Dhalam Couture!"
    },
    {
      name: "Meera K.",
      location: "Chennai",
      rating: 5,
      comment: "Beautiful kurti, exactly as shown. Delivery was fast and the fabric is breathable — perfect for summer. The colour is even more gorgeous in person!"
    }
  ];

  async function init() {
    // 1. Load settings to get API Url
    try {
      const res = await fetch('data/settings.json', { cache: 'no-store' });
      const settings = await res.json();
      apiUrl = settings.reviewsApiUrl || "";
    } catch (e) {
      console.warn("Could not load reviews API settings, using local mock reviews fallback:", e);
    }

    // 2. Fetch and render reviews
    await fetchReviews();

    // 3. Attach write review button listener
    const writeBtn = document.getElementById('write-review-btn');
    if (writeBtn) {
      writeBtn.addEventListener('click', openModal);
    }

    // Set initial rating highlight in form
    setRating(5);
  }

  async function fetchReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    if (!apiUrl) {
      console.log("No Reviews API URL configured. Rendering default mock reviews.");
      renderReviews(mockReviews);
      return;
    }

    try {
      const res = await fetch(apiUrl, { cache: 'no-store' });
      const data = await res.json();
      
      // Filter approved reviews (approved is 'TRUE', true, 'true', or empty string if not moderating)
      const approvedReviews = data.filter(r => r.approved === true || r.approved === 'TRUE' || r.approved === 'true' || r.approved === 1 || r.approved === '1');
      
      if (approvedReviews.length > 0) {
        renderReviews(approvedReviews);
      } else {
        // Fallback to default reviews if no approved ones yet
        renderReviews(mockReviews);
      }
    } catch (e) {
      console.error("Error fetching reviews from Google Sheet, falling back to mock reviews:", e);
      renderReviews(mockReviews);
    }
  }

  function renderReviews(reviewsList) {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    grid.innerHTML = "";
    reviewsList.forEach(review => {
      // Build stars string
      let stars = "";
      const rating = parseInt(review.rating) || 5;
      for (let i = 0; i < 5; i++) {
        stars += i < rating ? "★" : "☆";
      }

      const card = document.createElement('article');
      card.className = "review-card animate-fade-in";
      card.style.cssText = "background:#fff;border-radius:16px;padding:1.75rem;box-shadow:0 4px 24px rgba(0,0,0,0.06);border:1px solid #F0EAE3;display:flex;flex-direction:column;gap:1rem;transition:transform 0.3s ease,box-shadow 0.3s ease";
      
      card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
      });
      card.addEventListener('mouseout', () => {
        card.style.transform = '';
        card.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
      });

      card.innerHTML = `
        <div class="review-stars" style="display:flex;gap:3px">
          <span style="color:#E2A94B;font-size:1.1rem">${stars}</span>
        </div>
        <p style="font-family:'DM Sans',sans-serif;font-size:0.92rem;line-height:1.7;color:#4A4A4A;font-style:italic">"${review.comment}"</p>
        <div style="display:flex;align-items:center;gap:0.75rem;margin-top:auto">
          <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#2C3D2E,#7A9E7E);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:0.9rem;flex-shrink:0">
            ${review.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style="font-weight:600;font-size:0.88rem;color:#1E2A1F">${review.name}</p>
            <p style="font-size:0.75rem;color:#5A6B5C">${review.location || 'Verified Buyer'}</p>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function openModal() {
    const modal = document.getElementById('review-modal');
    const form = document.getElementById('review-form');
    const success = document.getElementById('review-success');
    
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    if (form) form.classList.remove('hidden');
    if (success) success.classList.add('hidden');
  }

  function closeModal() {
    const modal = document.getElementById('review-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function setRating(rating) {
    const hiddenInput = document.getElementById('review-rating');
    if (hiddenInput) hiddenInput.value = rating;

    const stars = document.querySelectorAll('.star-selector .star');
    stars.forEach((star, idx) => {
      if (idx < rating) {
        star.style.color = "#E2A94B"; // Gold active
      } else {
        star.style.color = "#9E9E9E"; // Muted gray
      }
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('review-form');
    const success = document.getElementById('review-success');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!apiUrl) {
      alert("Review submissions are temporarily disabled (no API URL configured in settings.json).");
      return;
    }

    const payload = {
      name: document.getElementById('review-name').value,
      location: document.getElementById('review-location').value,
      rating: document.getElementById('review-rating').value,
      comment: document.getElementById('review-comment').value,
      date: new Date().toISOString().split('T')[0]
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' }, // Bypass pre-flight CORS check
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.status === 'success') {
        form.classList.add('hidden');
        success.classList.remove('hidden');
        form.reset();
        setRating(5);
        
        // Re-fetch to load new reviews if user wants to see immediately
        // Note: New reviews start as approved='FALSE' so they won't render until moderator marks them as TRUE
      } else {
        alert("There was an issue submitting your review. Please try again.");
      }
    } catch (e) {
      console.error("Error submitting review:", e);
      alert("Failed to submit review. Please check your network and try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Review";
    }
  }

  return { init, setRating, handleSubmit, closeModal };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('write-review-btn')) {
    Reviews.init();
  }
});
