/**
 * NEXUS // PLAY - Interactive Logic, GSAP Scroll Animations, Gallery Filtering,
 * Tilt Parallax, Spotlight Carousel, and Game Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Initialize 3D WebGL Background
  if (typeof HeroBackground3D !== 'undefined') {
    try {
      new HeroBackground3D('webgl-canvas-container');
    } catch (err) {
      console.warn("WebGL initialization skipped:", err);
    }
  }

  // 3. Initialize Interactive Features
  initCustomCursor();
  initNavbarScroll();
  initHeroParallax();
  renderEditorialGames();
  renderTiltGallery();
  initTilt3DEffect();
  initSpotlightCarousel();
  initGenreFilters();
  initGameModal();
  initGSAPAnimations();
  initSmoothScroll();
});

/* -------------------------------------------------------------
 * Custom Cursor
 * ------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  function updateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(updateRing);
  }
  requestAnimationFrame(updateRing);

  // Hover state detection
  document.querySelectorAll('a, button, .tilt-card, .genre-filter-pill, .editorial-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* -------------------------------------------------------------
 * Navbar Sticky & Mobile Drawer
 * ------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const mobileOpen = document.getElementById('mobileMenuOpen');
  const mobileClose = document.getElementById('mobileMenuClose');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  if (mobileOpen && mobileDrawer) {
    mobileOpen.addEventListener('click', () => mobileDrawer.classList.add('open'));
  }
  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener('click', () => mobileDrawer.classList.remove('open'));
  }
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => mobileDrawer.classList.remove('open'));
  });
}

/* -------------------------------------------------------------
 * Hero Parallax Mouse Reaction
 * ------------------------------------------------------------- */
function initHeroParallax() {
  const heroSection = document.querySelector('.hero-section');
  const heroBg = document.querySelector('.hero-background-layer');
  if (!heroSection || !heroBg) return;

  heroSection.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroBg.style.transform = `scale(1.08) translate3d(${-x}px, ${-y}px, 0)`;
  });
}

/* -------------------------------------------------------------
 * 3. Featured Editorial PC Games (Oversized & Asymmetrical)
 * ------------------------------------------------------------- */
function renderEditorialGames() {
  const grid = document.getElementById('featuredEditorialGrid');
  if (!grid || typeof GAMES_DATA === 'undefined') return;

  // Curated 6 editorial showcase items with varied column spans
  const editorialItems = [
    { game: GAMES_DATA[0], span: 'col-span-8' }, // Cyberpunk 2077
    { game: GAMES_DATA[1], span: 'col-span-4' }, // RDR2
    { game: GAMES_DATA[2], span: 'col-span-4' }, // Elden Ring
    { game: GAMES_DATA[3], span: 'col-span-8' }, // Wukong
    { game: GAMES_DATA[4], span: 'col-span-6' }, // Witcher 3
    { game: GAMES_DATA[5], span: 'col-span-6' }  // GTA V
  ];

  grid.innerHTML = editorialItems.map(item => `
    <div class="editorial-card ${item.span}" data-game-id="${item.game.id}">
      <div class="card-top-badges">
        <span class="badge-pc">
          <i data-lucide="monitor" style="width:14px; height:14px;"></i> PC EXCLUSIVE SHOWCASE
        </span>
        <span class="badge-genre">${item.game.genre}</span>
      </div>
      <div class="card-img-wrap">
        <img src="${item.game.wideImage || item.game.image}" alt="${item.game.title}" loading="lazy" />
      </div>
      <div class="card-gradient-overlay"></div>
      <div class="card-body">
        <h3 class="card-title">${item.game.title}</h3>
        <p class="card-desc">${item.game.description}</p>
        <div class="card-footer">
          <button class="btn-card-explore" onclick="openGameModal('${item.game.id}')">
            EXPLORE GAME <i data-lucide="arrow-right" style="width:16px; height:16px;"></i>
          </button>
          <div class="card-specs">
            <span>${item.game.pcFeatures[0]}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* -------------------------------------------------------------
 * 4. Interactive 3D Gallery Cards (All 10 games)
 * ------------------------------------------------------------- */
function renderTiltGallery() {
  const grid = document.getElementById('tiltGalleryGrid');
  if (!grid || typeof GAMES_DATA === 'undefined') return;

  grid.innerHTML = GAMES_DATA.map(game => `
    <div class="tilt-card" data-tilt data-game-id="${game.id}" onclick="openGameModal('${game.id}')">
      <div class="pc-mark">PC OPTIMIZED</div>
      <div class="tilt-inner">
        <img src="${game.image}" alt="${game.title}" class="tilt-img-layer" loading="lazy" />
        <div class="tilt-overlay"></div>
        <div class="tilt-content">
          <span class="game-genre-tag">${game.genre}</span>
          <h3 class="game-title">${game.title}</h3>
          <p class="game-peek">${game.tagline}</p>
          <div class="tilt-cta">
            EXPLORE DETAILS <i data-lucide="chevron-right" style="width:16px; height:16px;"></i>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* -------------------------------------------------------------
 * 3D Card Mouse Tilt & Layered Depth
 * ------------------------------------------------------------- */
function initTilt3DEffect() {
  const cards = document.querySelectorAll('.tilt-card[data-tilt]');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cards.forEach(card => {
    const imgLayer = card.querySelector('.tilt-img-layer');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      if (imgLayer) {
        imgLayer.style.transform = `translate3d(${rotateY * 0.8}px, ${-rotateX * 0.8}px, 0)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      if (imgLayer) {
        imgLayer.style.transform = 'translate3d(0, 0, 0)';
        imgLayer.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      }
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
      if (imgLayer) imgLayer.style.transition = 'none';
    });
  });
}

/* -------------------------------------------------------------
 * 5. Cinematic Spotlight Carousel
 * ------------------------------------------------------------- */
let currentSpotlightIndex = 0;
const spotlightGames = [
  GAMES_DATA[0], // Cyberpunk 2077
  GAMES_DATA[2], // Elden Ring
  GAMES_DATA[3], // Black Myth Wukong
  GAMES_DATA[6], // DOOM: The Dark Ages
  GAMES_DATA[7]  // Forza Horizon 5
];

function initSpotlightCarousel() {
  const bgContainer = document.getElementById('spotlightBgContainer');
  const dotsContainer = document.getElementById('spotlightDots');
  if (!bgContainer || !dotsContainer) return;

  // Create background images
  bgContainer.innerHTML = spotlightGames.map((game, idx) => `
    <img src="${game.wideImage || game.image}" alt="${game.title}" class="spotlight-bg-img ${idx === 0 ? 'active' : ''}" id="spotlightBg-${idx}" />
  `).join('');

  // Create dot indicators
  dotsContainer.innerHTML = spotlightGames.map((_, idx) => `
    <div class="spotlight-dot ${idx === 0 ? 'active' : ''}" onclick="goToSpotlight(${idx})"></div>
  `).join('');

  updateSpotlightContent(0);

  // Prev / Next button listeners
  const prevBtn = document.getElementById('spotlightPrevBtn');
  const nextBtn = document.getElementById('spotlightNextBtn');
  if (prevBtn) prevBtn.addEventListener('click', prevSpotlight);
  if (nextBtn) nextBtn.addEventListener('click', nextSpotlight);

  // Auto rotate every 8 seconds
  setInterval(nextSpotlight, 8000);
}

function updateSpotlightContent(index) {
  const game = spotlightGames[index];
  if (!game) return;

  // Active images
  document.querySelectorAll('.spotlight-bg-img').forEach((img, idx) => {
    img.classList.toggle('active', idx === index);
  });

  // Active dots
  document.querySelectorAll('.spotlight-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });

  // Text contents
  const numEl = document.getElementById('spotlightNumber');
  const badgeEl = document.getElementById('spotlightBadge');
  const titleEl = document.getElementById('spotlightTitle');
  const descEl = document.getElementById('spotlightDesc');
  const tagsEl = document.getElementById('spotlightTags');
  const exploreBtn = document.getElementById('spotlightExploreBtn');

  if (numEl) numEl.textContent = `0${index + 1} / 0${spotlightGames.length}`;
  if (badgeEl) badgeEl.textContent = game.spotlightBadge || 'FEATURED SPOTLIGHT';
  if (titleEl) titleEl.textContent = game.title;
  if (descEl) descEl.textContent = game.description;

  if (tagsEl) {
    tagsEl.innerHTML = game.pcFeatures.map(feat => `
      <span class="spec-pill"><i data-lucide="check-circle-2" style="width:12px; height:12px; display:inline; margin-right:4px;"></i>${feat}</span>
    `).join('');
  }

  if (exploreBtn) {
    exploreBtn.onclick = () => openGameModal(game.id);
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function nextSpotlight() {
  currentSpotlightIndex = (currentSpotlightIndex + 1) % spotlightGames.length;
  updateSpotlightContent(currentSpotlightIndex);
}

function prevSpotlight() {
  currentSpotlightIndex = (currentSpotlightIndex - 1 + spotlightGames.length) % spotlightGames.length;
  updateSpotlightContent(currentSpotlightIndex);
}

window.goToSpotlight = function(idx) {
  currentSpotlightIndex = idx;
  updateSpotlightContent(currentSpotlightIndex);
};

/* -------------------------------------------------------------
 * 6. Game Genres Interactive Filtering
 * ------------------------------------------------------------- */
function initGenreFilters() {
  const pillsContainer = document.getElementById('genresPillBar');
  const gridContainer = document.getElementById('genresGalleryGrid');
  if (!pillsContainer || !gridContainer || typeof GENRES_DATA === 'undefined') return;

  // Render filter pills
  pillsContainer.innerHTML = GENRES_DATA.map(genre => `
    <button class="genre-filter-pill ${genre.id === 'all' ? 'active' : ''}" data-genre="${genre.id}">
      <i data-lucide="${genre.icon}" style="width:16px; height:16px;"></i> ${genre.name}
    </button>
  `).join('');

  renderGenreCards('all');

  // Pill click handlers
  pillsContainer.querySelectorAll('.genre-filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      pillsContainer.querySelectorAll('.genre-filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const genre = btn.getAttribute('data-genre');
      renderGenreCards(genre);
    });
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderGenreCards(selectedGenre) {
  const gridContainer = document.getElementById('genresGalleryGrid');
  if (!gridContainer || typeof GAMES_DATA === 'undefined') return;

  const filtered = selectedGenre === 'all'
    ? GAMES_DATA
    : GAMES_DATA.filter(g => g.genres && g.genres.includes(selectedGenre));

  gridContainer.style.opacity = '0';

  setTimeout(() => {
    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-muted);">
          <h3>No titles found for this genre.</h3>
          <p>Click "All Genres" to view the full PC catalog.</p>
        </div>
      `;
    } else {
      gridContainer.innerHTML = filtered.map(game => `
        <div class="editorial-card col-span-4" data-game-id="${game.id}" onclick="openGameModal('${game.id}')" style="min-height: 380px;">
          <div class="card-top-badges">
            <span class="badge-pc">PC ULTRA</span>
            <span class="badge-genre">${game.genre}</span>
          </div>
          <div class="card-img-wrap">
            <img src="${game.image}" alt="${game.title}" loading="lazy" />
          </div>
          <div class="card-gradient-overlay"></div>
          <div class="card-body">
            <h3 class="card-title" style="font-size: 1.5rem;">${game.title}</h3>
            <p class="card-desc">${game.tagline}</p>
            <div class="card-footer">
              <span class="btn-card-explore">
                EXPLORE <i data-lucide="arrow-right" style="width:14px; height:14px;"></i>
              </span>
            </div>
          </div>
        </div>
      `).join('');
    }
    gridContainer.style.opacity = '1';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }, 200);
}

/* -------------------------------------------------------------
 * Game Modal Overlay
 * ------------------------------------------------------------- */
function initGameModal() {
  const overlay = document.getElementById('gameDetailModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  if (!overlay || !closeBtn) return;

  closeBtn.addEventListener('click', closeGameModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeGameModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeGameModal();
    }
  });
}

window.openGameModal = function(gameId) {
  const game = GAMES_DATA.find(g => g.id === gameId);
  if (!game) return;

  const overlay = document.getElementById('gameDetailModal');
  const modalImg = document.getElementById('modalImage');
  const modalGenre = document.getElementById('modalGenreBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalTagline = document.getElementById('modalTagline');
  const modalDesc = document.getElementById('modalDescription');
  const modalFeatures = document.getElementById('modalFeaturesList');

  if (modalImg) modalImg.src = game.wideImage || game.image;
  if (modalGenre) modalGenre.textContent = game.genre;
  if (modalTitle) modalTitle.textContent = game.title;
  if (modalTagline) modalTagline.textContent = game.tagline;
  if (modalDesc) modalDesc.textContent = game.description;

  if (modalFeatures) {
    modalFeatures.innerHTML = game.pcFeatures.map(f => `
      <div class="modal-feature-item">
        <i data-lucide="cpu" style="width:16px; height:16px;"></i>
        <span>${f}</span>
      </div>
    `).join('');
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeGameModal = function() {
  const overlay = document.getElementById('gameDetailModal');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

/* -------------------------------------------------------------
 * 7. GSAP Scroll-Based Animations
 * ------------------------------------------------------------- */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance animations
  gsap.from('.hero-content .hero-platform-tag', { opacity: 0, y: -20, duration: 1, delay: 0.2, ease: 'power3.out' });
  gsap.from('.hero-content .hero-title', { opacity: 0, y: 40, duration: 1.2, delay: 0.4, ease: 'power4.out' });
  gsap.from('.hero-content .hero-subtitle', { opacity: 0, y: 20, duration: 1, delay: 0.7, ease: 'power3.out' });
  gsap.from('.hero-content .hero-cta-group', { opacity: 0, scale: 0.95, duration: 1, delay: 0.9, ease: 'power3.out' });
  gsap.from('.hero-scroll-indicator', { opacity: 0, y: 15, duration: 1, delay: 1.2, ease: 'power3.out' });

  // Section titles entrance
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%'
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // About stats counter
  gsap.utils.toArray('.stat-card').forEach((card, idx) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: idx * 0.15,
      ease: 'power3.out'
    });
  });
}

/* -------------------------------------------------------------
 * Smooth Scroll Anchor Navigation
 * ------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
