async function initReelsSection() {
  try {
    const response = await fetch('data/reels.json');
    if (!response.ok) return;
    const { reels } = await response.json();
    
    const container = document.querySelector('.reels-strip');
    if (!container) return;

    // Clear any placeholders
    container.innerHTML = '';

    reels.forEach(reel => {
      const card = document.createElement('div');
      card.className = 'reel-card';
      card.innerHTML = `
        <div class="reel-thumb" style="background-image: url('${reel.coverImage}')">
          <div class="reel-overlay">
            <div class="reel-play-btn" aria-label="Play reel">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <polygon points="6,3 20,12 6,21"/>
              </svg>
            </div>
          </div>
          <div class="reel-caption">${reel.caption}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        // Try local video first, fall back to Instagram URL
        openReelLightbox(reel);
      });

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load reels", error);
  }
}

function openReelLightbox(reel) {
  const lightbox = document.getElementById('reel-lightbox');
  const videoEl = document.getElementById('lightbox-video');
  const instagramLink = document.getElementById('lightbox-instagram-link');
  if (!lightbox) return;

  // Try to load local video
  const localVideo = reel.videoFile;
  
  // Check if local video path is valid (file exists)
  // Strategy: attempt to fetch HEAD request — if 404, redirect to Instagram
  fetch(localVideo, { method: 'HEAD' })
    .then(res => {
      if (res.ok) {
        // Local video available — play it
        videoEl.src = localVideo;
        videoEl.style.display = 'block';
        instagramLink.style.display = 'none';
        videoEl.load();
        videoEl.play();
      } else {
        throw new Error('Local video not found');
      }
    })
    .catch(() => {
      // Local video not available — show Instagram link option
      videoEl.style.display = 'none';
      instagramLink.href = reel.instagramUrl;
      instagramLink.style.display = 'flex';
    });

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeReelLightbox() {
  const lightbox = document.getElementById('reel-lightbox');
  if (!lightbox) return;
  const videoEl = document.getElementById('lightbox-video');
  if (videoEl) {
    videoEl.pause();
    videoEl.src = '';
  }
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// ESC key closes lightbox
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeReelLightbox();
});

// Auto-init if DOM is ready
document.addEventListener('DOMContentLoaded', initReelsSection);
