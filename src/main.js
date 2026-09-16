/**
 * Unblocked Games Portal - Core Application Entry Point
 * Pure JavaScript, standalone compatible for GitHub Pages & Vite
 */

// Initial default catalog with Omoggle
const DEFAULT_GAMES = [
  {
    id: "omoggle",
    title: "Omoggle",
    category: "Arcade",
    description: "Live online interactive video, camera, and voice connection game. Chat, play, and meet players worldwide in real-time.",
    iframe: '<iframe src="https://omogglegame.com" width="100%" height="600px" style="border:none;" allow="camera; microphone; display-capture"></iframe>',
    url: "https://omogglegame.com",
    allow: "camera; microphone; display-capture; fullscreen; autoplay",
    controls: "Camera, Microphone & Mouse",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    color: "from-purple-600 to-indigo-800",
    badge: "Featured",
    plays: 2480
  }
];

const FAVORITES_KEY = 'unblocked_games_favorites_v1';
const CUSTOM_GAMES_KEY = 'unblocked_games_custom_v1';

// Application state
let allGames = [];
let favorites = [];
let activeCategory = 'All';
let searchQuery = '';
let selectedGame = null;
let isCloaked = false;
let isTheater = false;
let isPlayerFullscreen = false;

// Storage helpers
function getStoredFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredFavorites(favs) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  } catch (e) {
    console.warn('Storage error', e);
  }
}

function getStoredCustomGames() {
  try {
    const raw = localStorage.getItem(CUSTOM_GAMES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredCustomGames(customs) {
  try {
    localStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(customs));
  } catch (e) {
    console.warn('Storage error', e);
  }
}

// Iframe string parser
export function parseIframeSource(input) {
  const trimmed = (input || '').trim();
  let extractedUrl = '';
  let iframeHtml = '';

  if (trimmed.startsWith('<iframe') || trimmed.includes('<iframe')) {
    const match = trimmed.match(/src=["']([^"']+)["']/i);
    extractedUrl = match ? match[1] : '';
    iframeHtml = trimmed;
  } else {
    extractedUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`;
    iframeHtml = `<iframe src="${extractedUrl}" width="100%" height="600px" style="border:none;" allow="camera; microphone; display-capture; fullscreen; autoplay"></iframe>`;
  }

  // Handle tracking redirect wrappers
  if (extractedUrl.includes('partnerpixels?url=') || extractedUrl.includes('?url=') || extractedUrl.includes('&url=')) {
    try {
      const match = extractedUrl.match(/[?&]url=([^&]+)/i);
      if (match && match[1]) {
        const decoded = decodeURIComponent(match[1]);
        if (decoded.startsWith('http://') || decoded.startsWith('https://')) {
          extractedUrl = decoded;
          iframeHtml = `<iframe src="${extractedUrl}" width="100%" height="600px" style="border:none;" allow="camera; microphone; display-capture; fullscreen; autoplay"></iframe>`;
        }
      }
    } catch {
      // ignore
    }
  }

  return { url: extractedUrl, iframeHtml };
}

// Load games from games.json with fallback to DEFAULT_GAMES
async function loadGames() {
  let loaded = DEFAULT_GAMES;
  try {
    const response = await fetch('./games.json');
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        loaded = data;
      }
    }
  } catch {
    // Keep DEFAULT_GAMES
  }

  const customs = getStoredCustomGames();
  const map = new Map();
  loaded.forEach((g) => map.set(g.id, g));
  customs.forEach((g) => map.set(g.id, { ...g, isCustom: true }));

  allGames = Array.from(map.values()).filter((g) => g.id !== 'youtube' && g.id !== 'youtube-player');
  favorites = getStoredFavorites().filter((id) => id !== 'youtube' && id !== 'youtube-player');
  render();
}

// Filter games based on category and search
function getFilteredGames() {
  return allGames.filter((game) => {
    if (activeCategory === 'Favorites') {
      if (!favorites.includes(game.id)) return false;
    } else if (activeCategory !== 'All') {
      if ((game.category || '').toLowerCase() !== activeCategory.toLowerCase()) {
        return false;
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = (game.title || '').toLowerCase().includes(q);
      const catMatch = (game.category || '').toLowerCase().includes(q);
      const descMatch = (game.description || '').toLowerCase().includes(q);
      const badgeMatch = (game.badge || '').toLowerCase().includes(q);
      return titleMatch || catMatch || descMatch || badgeMatch;
    }

    return true;
  });
}

// Render the application
function render() {
  renderNavbar();
  renderHero();
  renderCategories();
  renderGamesGrid();
}

function renderNavbar() {
  const countEl = document.getElementById('navbar-game-count');
  if (countEl) {
    countEl.textContent = `HTML5 & Iframe Portal • ${allGames.length} ${allGames.length === 1 ? 'Game' : 'Games'}`;
  }
}

function renderHero() {
  const heroContainer = document.getElementById('hero-banner');
  if (!heroContainer) return;

  const featured = allGames.find((g) => g.badge === 'Featured') || allGames[0];

  if (searchQuery || activeCategory !== 'All' || !featured) {
    heroContainer.classList.add('hidden');
    return;
  }

  heroContainer.classList.remove('hidden');
  const titleEl = document.getElementById('hero-title');
  const descEl = document.getElementById('hero-desc');
  const imgEl = document.getElementById('hero-img');
  const playBtn = document.getElementById('hero-play-btn');
  const previewCard = document.getElementById('hero-preview-card');

  if (titleEl) titleEl.textContent = featured.title;
  if (descEl) descEl.textContent = featured.description;
  if (imgEl && featured.thumbnail) {
    imgEl.src = featured.thumbnail;
    imgEl.alt = featured.title;
  }

  if (playBtn) {
    playBtn.onclick = () => openGamePlayer(featured);
  }
  if (previewCard) {
    previewCard.onclick = () => openGamePlayer(featured);
  }
}

function renderCategories() {
  const container = document.getElementById('category-bar');
  if (!container) return;

  const categories = [
    { key: 'All', label: 'All Games', icon: 'layers' },
    { key: 'Favorites', label: 'Favorites', icon: 'heart' },
    { key: 'Arcade', label: 'Arcade', icon: 'gamepad' },
    { key: 'Media', label: 'Media', icon: 'play' },
    { key: 'Puzzle', label: 'Puzzle', icon: 'puzzle' },
    { key: 'Retro', label: 'Retro', icon: 'history' },
    { key: 'Action', label: 'Action', icon: 'zap' },
  ];

  const counts = { All: allGames.length, Favorites: favorites.length };
  allGames.forEach((g) => {
    const cat = g.category || 'Arcade';
    counts[cat] = (counts[cat] || 0) + 1;
  });

  container.innerHTML = categories.map((cat) => {
    const isActive = activeCategory === cat.key;
    const count = counts[cat.key] || 0;
    return `
      <button
        data-category="${cat.key}"
        class="category-btn flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer border ${
          isActive
            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20 font-bold'
            : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
        }"
      >
        <span>${cat.label}</span>
        <span class="text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
          isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
        }">${count}</span>
      </button>
    `;
  }).join('');

  container.querySelectorAll('.category-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-category');
      render();
    });
  });

  const countDisplay = document.getElementById('results-count-display');
  if (countDisplay) {
    const filtered = getFilteredGames();
    countDisplay.innerHTML = `Showing <strong class="text-white">${filtered.length}</strong> ${filtered.length === 1 ? 'game' : 'games'}${
      searchQuery ? ` for "${escapeHtml(searchQuery)}"` : ''
    }`;
  }
}

function renderGamesGrid() {
  const grid = document.getElementById('games-grid');
  const emptyState = document.getElementById('empty-state');
  if (!grid || !emptyState) return;

  const filtered = getFilteredGames();

  if (filtered.length === 0) {
    grid.classList.add('hidden');
    emptyState.classList.remove('hidden');

    const emptyTitle = document.getElementById('empty-title');
    const emptyDesc = document.getElementById('empty-desc');

    if (emptyTitle && emptyDesc) {
      if (allGames.length === 0) {
        emptyTitle.textContent = 'No games in library';
        emptyDesc.textContent = 'Click "Add Game" above or import your games.json file to add games.';
      } else if (searchQuery) {
        emptyTitle.textContent = 'No games found';
        emptyDesc.textContent = `No games match "${searchQuery}". Try a different keyword or add a new game iframe.`;
      } else if (activeCategory === 'Favorites') {
        emptyTitle.textContent = 'No favorites yet';
        emptyDesc.textContent = 'Click the heart icon on any game card to pin it to your favorites.';
      } else {
        emptyTitle.textContent = 'No games in this category';
        emptyDesc.textContent = 'Try selecting "All Games" or adding a game to this category.';
      }
    }
    return;
  }

  emptyState.classList.add('hidden');
  grid.classList.remove('hidden');

  grid.innerHTML = filtered.map((game) => {
    const isFav = favorites.includes(game.id);
    const gradient = game.color || 'from-emerald-500 to-teal-700';

    return `
      <div
        data-game-id="${game.id}"
        class="game-card group relative bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-950/30 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
      >
        <div class="relative h-44 w-full overflow-hidden bg-slate-950">
          ${
            game.thumbnail
              ? `<img src="${game.thumbnail}" alt="${escapeHtml(game.title)}" referrerpolicy="no-referrer" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />`
              : `<div class="w-full h-full bg-gradient-to-tr ${gradient} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <span class="text-4xl font-black text-white/40 tracking-wider">${escapeHtml(game.title.slice(0, 4).toUpperCase())}</span>
                 </div>`
          }
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div class="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            <span class="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm shadow-sm">
              ${escapeHtml(game.category || 'Arcade')}
            </span>
            ${
              game.badge
                ? `<span class="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500/90 text-slate-950 shadow-sm">${escapeHtml(game.badge)}</span>`
                : ''
            }
            ${
              game.isCustom
                ? `<span class="px-2 py-0.5 text-[10px] font-bold rounded-md bg-cyan-500/90 text-slate-950 shadow-sm">Custom</span>`
                : ''
            }
          </div>

          <div class="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            ${
              game.isCustom
                ? `<button data-action="delete" data-id="${game.id}" title="Delete Custom Game" class="p-1.5 rounded-lg bg-slate-950/70 hover:bg-rose-600/90 text-slate-300 hover:text-white transition-colors backdrop-blur-sm">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
                   </button>`
                : ''
            }
            <button data-action="fav" data-id="${game.id}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}" class="p-1.5 rounded-lg backdrop-blur-sm transition-all ${
              isFav
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-rose-400'
            }">
              <svg class="w-4 h-4 ${isFav ? 'fill-current' : ''}" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>

          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
            <div class="w-13 h-13 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/50 transform scale-90 group-hover:scale-100 transition-transform">
              <svg class="w-6 h-6 fill-slate-950 ml-1" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            </div>
          </div>
        </div>

        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2">
              <h3 class="font-bold text-base text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                ${escapeHtml(game.title)}
              </h3>
              ${
                game.plays
                  ? `<span class="text-[11px] text-slate-400 shrink-0 font-medium">${game.plays.toLocaleString()} plays</span>`
                  : ''
              }
            </div>
            <p class="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              ${escapeHtml(game.description || '')}
            </p>
          </div>

          <div class="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span class="truncate max-w-[180px]">🎮 ${escapeHtml(game.controls || 'Mouse & Keyboard')}</span>
            <span class="text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Play <svg class="w-3 h-3 fill-emerald-400" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.game-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      const target = e.target.closest('button');
      const gameId = card.getAttribute('data-game-id');
      const game = allGames.find((g) => g.id === gameId);
      if (!game) return;

      if (target) {
        const action = target.getAttribute('data-action');
        if (action === 'fav') {
          toggleFavorite(gameId);
          return;
        }
        if (action === 'delete') {
          deleteCustomGame(gameId);
          return;
        }
      }

      openGamePlayer(game);
    });
  });
}

// Game Player
export function openGamePlayer(game) {
  selectedGame = game;
  const modal = document.getElementById('game-player-modal');
  const iframe = document.getElementById('active-game-iframe');
  const titleEl = document.getElementById('player-game-title');
  const catEl = document.getElementById('player-game-cat');
  const controlsEl = document.getElementById('player-game-controls');
  const directLink = document.getElementById('player-direct-link');
  const footerDirect = document.getElementById('player-footer-direct');
  const favBtn = document.getElementById('player-fav-btn');
  const spinner = document.getElementById('player-loading-spinner');

  if (!modal || !iframe) return;

  if (titleEl) titleEl.textContent = game.title;
  if (catEl) catEl.textContent = game.category || 'Arcade';
  if (controlsEl) controlsEl.textContent = game.controls ? `Controls: ${game.controls}` : '';
  if (directLink) directLink.href = game.url;
  if (footerDirect) footerDirect.href = game.url;

  updatePlayerFavButton();

  const ytToolbar = document.getElementById('player-youtube-toolbar');
  const isYouTube = game.id === 'youtube' || game.id === 'youtube-player' || (game.url && (game.url.includes('youtube.com') || game.url.includes('youtu.be')));
  let targetUrl = game.url;

  if (ytToolbar) {
    if (isYouTube) {
      ytToolbar.classList.remove('hidden');
      const ytInput = document.getElementById('youtube-url-input');
      const ytDirectLink = document.getElementById('yt-direct-external-btn');
      if (ytDirectLink) {
        ytDirectLink.href = (game.url && (game.url.startsWith('http://') || game.url.startsWith('https://'))) ? game.url : 'https://www.youtube.com';
      }
      if (ytInput) {
        ytInput.value = (game.url && !game.url.includes('VIDEO_ID') && !game.url.endsWith('youtube.com') && !game.url.endsWith('youtube.com/')) ? game.url : '';
      }
      if (game.url === 'https://www.youtube.com' || game.url === 'https://youtube.com' || game.url === 'http://www.youtube.com') {
        targetUrl = 'https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=0';
      }
    } else {
      ytToolbar.classList.add('hidden');
    }
  }

  // Configure permissions for Omoggle and rich HTML5 games
  const allowAttr = game.allow || "camera; microphone; display-capture; fullscreen; autoplay; gamepad; keyboard-lock; accelerometer; gyroscope; cross-origin-isolated";
  iframe.setAttribute('allow', allowAttr);
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-modals');

  if (spinner) spinner.classList.remove('hidden');

  iframe.onload = () => {
    if (spinner) spinner.classList.add('hidden');
  };

  iframe.src = targetUrl;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

export function closeGamePlayer() {
  const modal = document.getElementById('game-player-modal');
  const iframe = document.getElementById('active-game-iframe');
  if (modal) modal.classList.add('hidden');
  if (iframe) iframe.src = 'about:blank';
  selectedGame = null;
  document.body.style.overflow = '';
}

function updatePlayerFavButton() {
  const favBtn = document.getElementById('player-fav-btn');
  if (!favBtn || !selectedGame) return;
  const isFav = favorites.includes(selectedGame.id);
  if (isFav) {
    favBtn.className = 'p-2 rounded-xl border bg-rose-500/20 border-rose-500/40 text-rose-400 transition-colors cursor-pointer';
    favBtn.innerHTML = '<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
  } else {
    favBtn.className = 'p-2 rounded-xl border bg-slate-800 border-slate-700 text-slate-300 hover:text-rose-400 hover:bg-slate-700 transition-colors cursor-pointer';
    favBtn.innerHTML = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
  }
}

// User Actions
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((f) => f !== id);
  } else {
    favorites.push(id);
  }
  saveStoredFavorites(favorites);
  render();
  if (selectedGame && selectedGame.id === id) {
    updatePlayerFavButton();
  }
}

function deleteCustomGame(id) {
  if (confirm('Are you sure you want to remove this custom game?')) {
    allGames = allGames.filter((g) => g.id !== id);
    const customs = allGames.filter((g) => g.isCustom);
    saveStoredCustomGames(customs);
    render();
    if (selectedGame && selectedGame.id === id) {
      closeGamePlayer();
    }
  }
}

function playRandomGame() {
  if (allGames.length === 0) return;
  const rand = allGames[Math.floor(Math.random() * allGames.length)];
  openGamePlayer(rand);
}

function toggleCloak() {
  isCloaked = !isCloaked;
  const btn = document.getElementById('stealth-mode-btn');
  if (isCloaked) {
    document.title = 'Google Docs - Untitled Document';
    const link = document.querySelector("link[rel~='icon']");
    if (link) link.href = 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico';
    if (btn) {
      btn.className = 'p-2 rounded-xl border bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30 transition-all cursor-pointer';
    }
  } else {
    document.title = 'Unblocked Games Portal';
    if (btn) {
      btn.className = 'p-2 rounded-xl border bg-slate-800/90 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80 transition-all cursor-pointer';
    }
  }
}

// Add Game Modal
function setupAddGameModal() {
  const modal = document.getElementById('add-game-modal');
  const openBtn = document.getElementById('add-game-btn');
  const emptyAddBtn = document.getElementById('empty-add-btn');
  const footerAddBtn = document.getElementById('footer-add-btn');
  const closeBtn = document.getElementById('close-add-modal-btn');
  const cancelBtn = document.getElementById('cancel-add-btn');
  const form = document.getElementById('add-game-form');
  const iframeInput = document.getElementById('add-game-iframe');
  const testPreviewBtn = document.getElementById('test-preview-btn');
  const previewBox = document.getElementById('preview-box');
  const previewIframe = document.getElementById('preview-iframe');
  const previewUrlDisplay = document.getElementById('preview-url-display');
  const errorAlert = document.getElementById('add-game-error');

  const openModal = () => {
    if (modal) modal.classList.remove('hidden');
    if (errorAlert) errorAlert.classList.add('hidden');
    if (previewBox) previewBox.classList.add('hidden');
  };

  const closeModal = () => {
    if (modal) modal.classList.add('hidden');
    if (form) form.reset();
  };

  if (openBtn) openBtn.onclick = openModal;
  if (emptyAddBtn) emptyAddBtn.onclick = openModal;
  if (footerAddBtn) footerAddBtn.onclick = openModal;
  if (closeBtn) closeBtn.onclick = closeModal;
  if (cancelBtn) cancelBtn.onclick = closeModal;

  if (testPreviewBtn && iframeInput) {
    testPreviewBtn.onclick = () => {
      const raw = iframeInput.value.trim();
      if (!raw) {
        if (errorAlert) {
          errorAlert.textContent = 'Please enter an iframe embed code or game URL.';
          errorAlert.classList.remove('hidden');
        }
        return;
      }
      const { url } = parseIframeSource(raw);
      if (!url) {
        if (errorAlert) {
          errorAlert.textContent = 'Could not extract a valid URL from the iframe.';
          errorAlert.classList.remove('hidden');
        }
        return;
      }
      if (errorAlert) errorAlert.classList.add('hidden');
      if (previewUrlDisplay) previewUrlDisplay.textContent = url;
      if (previewIframe) previewIframe.src = url;
      if (previewBox) previewBox.classList.remove('hidden');
    };
  }

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('add-game-title')?.value.trim();
      const rawIframe = iframeInput?.value.trim();
      const category = document.getElementById('add-game-category')?.value || 'Arcade';
      const controls = document.getElementById('add-game-controls')?.value.trim();
      const desc = document.getElementById('add-game-desc')?.value.trim();
      const thumb = document.getElementById('add-game-thumb')?.value.trim();

      if (!title || !rawIframe) {
        if (errorAlert) {
          errorAlert.textContent = 'Please fill out both the title and the iframe source.';
          errorAlert.classList.remove('hidden');
        }
        return;
      }

      const { url, iframeHtml } = parseIframeSource(rawIframe);
      if (!url) {
        if (errorAlert) {
          errorAlert.textContent = 'Invalid iframe format. Could not extract a valid src URL.';
          errorAlert.classList.remove('hidden');
        }
        return;
      }

      const newGame = {
        id: `custom-${Date.now()}`,
        title: title,
        category: category,
        description: desc || 'Custom unblocked game embedded via iframe.',
        iframe: iframeHtml,
        url: url,
        controls: controls || 'Keyboard & Mouse',
        thumbnail: thumb || '',
        color: 'from-cyan-500 to-blue-700',
        badge: 'Custom',
        plays: 1,
        isCustom: true
      };

      allGames.unshift(newGame);
      const customs = allGames.filter((g) => g.isCustom);
      saveStoredCustomGames(customs);
      closeModal();
      render();
    };
  }
}

// JSON Database Modal
function setupJsonModal() {
  const modal = document.getElementById('json-modal');
  const openBtn = document.getElementById('view-json-btn');
  const emptyJsonBtn = document.getElementById('empty-json-btn');
  const footerJsonBtn = document.getElementById('footer-json-btn');
  const closeBtn = document.getElementById('close-json-modal-btn');
  const codeEl = document.getElementById('json-code-view');
  const countEl = document.getElementById('json-games-count');
  const copyBtn = document.getElementById('copy-json-btn');
  const downloadBtn = document.getElementById('download-json-btn');
  const resetBtn = document.getElementById('reset-defaults-btn');
  const fileInput = document.getElementById('import-json-file');

  const updateJsonView = () => {
    const formatted = JSON.stringify(allGames, null, 2);
    if (codeEl) codeEl.textContent = formatted;
    if (countEl) countEl.textContent = `Storing ${allGames.length} game configurations with embedded iframe tags`;
  };

  const openModal = () => {
    updateJsonView();
    if (modal) modal.classList.remove('hidden');
  };

  const closeModal = () => {
    if (modal) modal.classList.add('hidden');
  };

  if (openBtn) openBtn.onclick = openModal;
  if (emptyJsonBtn) emptyJsonBtn.onclick = openModal;
  if (footerJsonBtn) footerJsonBtn.onclick = openModal;
  if (closeBtn) closeBtn.onclick = closeModal;

  if (copyBtn) {
    copyBtn.onclick = () => {
      const text = JSON.stringify(allGames, null, 2);
      navigator.clipboard.writeText(text);
      copyBtn.innerHTML = '<span class="text-emerald-400">Copied!</span>';
      setTimeout(() => {
        copyBtn.innerHTML = '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Copy';
      }, 2000);
    };
  }

  if (downloadBtn) {
    downloadBtn.onclick = () => {
      const blob = new Blob([JSON.stringify(allGames, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'games.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
  }

  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm('Reset to original default catalog with Omoggle?')) {
        localStorage.removeItem(CUSTOM_GAMES_KEY);
        allGames = [...DEFAULT_GAMES];
        render();
        updateJsonView();
      }
    };
  }

  if (fileInput) {
    fileInput.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (!Array.isArray(parsed)) throw new Error('JSON root must be an array.');
          allGames = parsed.map((item, idx) => ({
            id: item.id || `game-${Date.now()}-${idx}`,
            title: item.title || 'Untitled Game',
            category: item.category || 'Arcade',
            description: item.description || '',
            iframe: item.iframe || `<iframe src="${item.url}" width="100%" height="600px"></iframe>`,
            url: item.url || (item.iframe?.match(/src=["']([^"']+)["']/i)?.[1] || ''),
            allow: item.allow || "camera; microphone; display-capture; fullscreen; autoplay",
            controls: item.controls || 'Keyboard & Mouse',
            thumbnail: item.thumbnail || '',
            badge: item.badge || 'Imported',
            plays: item.plays || 0,
            isCustom: true
          }));
          const customs = allGames.filter((g) => g.isCustom);
          saveStoredCustomGames(customs);
          render();
          closeModal();
        } catch (err) {
          alert('Failed to parse JSON file: ' + err.message);
        }
      };
      reader.readAsText(file);
    };
  }
}

// Player controls setup
function setupPlayerControls() {
  const closeBtn = document.getElementById('close-player-btn');
  const reloadBtn = document.getElementById('player-reload-btn');
  const theaterBtn = document.getElementById('player-theater-btn');
  const fullscreenBtn = document.getElementById('player-fullscreen-btn');
  const shareBtn = document.getElementById('player-share-btn');
  const favBtn = document.getElementById('player-fav-btn');
  const iframeContainer = document.getElementById('player-iframe-container');

  if (closeBtn) closeBtn.onclick = closeGamePlayer;

  if (reloadBtn) {
    reloadBtn.onclick = () => {
      const iframe = document.getElementById('active-game-iframe');
      const spinner = document.getElementById('player-loading-spinner');
      if (iframe && selectedGame) {
        if (spinner) spinner.classList.remove('hidden');
        iframe.src = selectedGame.url;
      }
    };
  }

  if (theaterBtn) {
    theaterBtn.onclick = () => {
      isTheater = !isTheater;
      if (iframeContainer) {
        if (isTheater) {
          iframeContainer.className = 'relative mx-auto w-full transition-all duration-300 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex flex-col max-w-7xl flex-1 min-h-[78vh]';
          theaterBtn.className = 'p-2 rounded-xl border bg-emerald-500/20 border-emerald-500/40 text-emerald-400 cursor-pointer';
        } else {
          iframeContainer.className = 'relative mx-auto w-full transition-all duration-300 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex flex-col max-w-5xl flex-1 min-h-[68vh]';
          theaterBtn.className = 'p-2 rounded-xl border bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer';
        }
      }
    };
  }

  if (fullscreenBtn) {
    fullscreenBtn.onclick = async () => {
      if (!iframeContainer) return;
      try {
        if (!document.fullscreenElement) {
          await iframeContainer.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      } catch (err) {
        console.warn('Fullscreen request failed:', err);
      }
    };
  }

  if (shareBtn) {
    shareBtn.onclick = () => {
      navigator.clipboard.writeText(window.location.href);
      shareBtn.innerHTML = '<span class="text-emerald-400 text-xs">Copied!</span>';
      setTimeout(() => {
        shareBtn.innerHTML = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>';
      }, 2000);
    };
  }

  if (favBtn) {
    favBtn.onclick = (e) => {
      e.stopPropagation();
      if (selectedGame) {
        toggleFavorite(selectedGame.id);
      }
    };
  }

  // YouTube toolbar interactions
  const ytLoadBtn = document.getElementById('load-youtube-btn');
  const ytInput = document.getElementById('youtube-url-input');
  const ytPresetLofi = document.getElementById('yt-preset-lofi');
  const ytPresetGame = document.getElementById('yt-preset-gameplay');

  function extractYouTubeId(urlOrId) {
    const trimmed = (urlOrId || '').trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
    const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
    return match ? match[1] : trimmed;
  }

  const playYouTubeVideo = (inputVal) => {
    const iframe = document.getElementById('active-game-iframe');
    const spinner = document.getElementById('player-loading-spinner');
    if (!iframe) return;
    const cleanId = extractYouTubeId(inputVal);
    if (cleanId) {
      if (spinner) spinner.classList.remove('hidden');
      iframe.src = `https://www.youtube.com/embed/${cleanId}?autoplay=1`;
      if (ytInput) ytInput.value = `https://www.youtube.com/watch?v=${cleanId}`;
    }
  };

  if (ytLoadBtn && ytInput) {
    ytLoadBtn.onclick = () => {
      if (ytInput.value) playYouTubeVideo(ytInput.value);
    };
    ytInput.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (ytInput.value) playYouTubeVideo(ytInput.value);
      }
    };
  }

  if (ytPresetLofi) {
    ytPresetLofi.onclick = () => {
      playYouTubeVideo('jfKfPfyJRdk');
    };
  }

  if (ytPresetGame) {
    ytPresetGame.onclick = () => {
      playYouTubeVideo('DWcJFNfaw9c');
    };
  }

  // Keyboard shortcut Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.fullscreenElement) {
      if (selectedGame) {
        closeGamePlayer();
      }
    }
  });

  // Fullscreen change listener
  document.addEventListener('fullscreenchange', () => {
    isPlayerFullscreen = !!document.fullscreenElement;
    if (fullscreenBtn) {
      fullscreenBtn.innerHTML = isPlayerFullscreen
        ? '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/></svg> <span class="hidden sm:inline">Exit</span>'
        : '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg> <span class="hidden sm:inline">Fullscreen</span>';
    }
  });
}

// Global search inputs
function setupSearchInputs() {
  const desktopInput = document.getElementById('search-games-input');
  const mobileInput = document.getElementById('mobile-search-input');
  const clearBtn = document.getElementById('clear-search-btn');

  const onSearch = (val) => {
    searchQuery = val;
    if (desktopInput) desktopInput.value = val;
    if (mobileInput) mobileInput.value = val;
    if (clearBtn) {
      if (val) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }
    render();
  };

  if (desktopInput) {
    desktopInput.addEventListener('input', (e) => onSearch(e.target.value));
  }
  if (mobileInput) {
    mobileInput.addEventListener('input', (e) => onSearch(e.target.value));
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => onSearch(''));
  }
}

// Utility HTML escaper
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Bootstrapping
function init() {
  // Stealth mode button
  const stealthBtn = document.getElementById('stealth-mode-btn');
  if (stealthBtn) stealthBtn.onclick = toggleCloak;

  // Random game buttons
  const randomBtn = document.getElementById('random-game-btn');
  if (randomBtn) randomBtn.onclick = playRandomGame;

  const heroRandomBtn = document.getElementById('hero-random-btn');
  if (heroRandomBtn) heroRandomBtn.onclick = playRandomGame;

  // Logo reset
  const logo = document.getElementById('portal-logo');
  if (logo) {
    logo.onclick = () => {
      activeCategory = 'All';
      searchQuery = '';
      if (document.getElementById('search-games-input')) {
        document.getElementById('search-games-input').value = '';
      }
      render();
    };
  }

  setupSearchInputs();
  setupAddGameModal();
  setupJsonModal();
  setupPlayerControls();
  loadGames();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
