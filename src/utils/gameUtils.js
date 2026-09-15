import defaultGamesData from '../data/games.json';

const FAVORITES_STORAGE_KEY = 'unblocked_games_favorites_v1';
const CUSTOM_GAMES_STORAGE_KEY = 'unblocked_games_custom_v1';

export function parseIframeSource(input) {
  const trimmed = input.trim();
  let extractedUrl = '';
  let iframeHtml = '';
  
  // If it is already an iframe tag: <iframe ... src="..." ...>
  if (trimmed.startsWith('<iframe') || trimmed.includes('<iframe')) {
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    extractedUrl = srcMatch ? srcMatch[1] : '';
    iframeHtml = trimmed;
  } else {
    // If it's just a regular URL:
    extractedUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://') 
      ? trimmed 
      : `https://${trimmed}`;
    iframeHtml = `<iframe src="${extractedUrl}" width="100%" height="600" frameborder="0" allow="fullscreen; autoplay; gamepad; keyboard" allowfullscreen></iframe>`;
  }

  // If the extracted URL contains an embedded 'url=' parameter (e.g. tracking pixels or redirects)
  if (extractedUrl.includes('partnerpixels?url=') || extractedUrl.includes('?url=') || extractedUrl.includes('&url=')) {
    try {
      const match = extractedUrl.match(/[?&]url=([^&]+)/i);
      if (match && match[1]) {
        const decoded = decodeURIComponent(match[1]);
        if (decoded.startsWith('http://') || decoded.startsWith('https://')) {
          extractedUrl = decoded;
          iframeHtml = `<iframe src="${extractedUrl}" width="100%" height="600" frameborder="0" allow="fullscreen; autoplay; gamepad; keyboard" allowfullscreen></iframe>`;
        }
      }
    } catch {
      // Keep original
    }
  }

  return {
    url: extractedUrl,
    iframeHtml: iframeHtml,
  };
}

export function getFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favs) {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs));
  } catch (err) {
    console.error('Failed to save favorites', err);
  }
}

export function getCustomGames() {
  try {
    const stored = localStorage.getItem(CUSTOM_GAMES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveCustomGames(customGames) {
  try {
    localStorage.setItem(CUSTOM_GAMES_STORAGE_KEY, JSON.stringify(customGames));
  } catch (err) {
    console.error('Failed to save custom games', err);
  }
}

export function loadAllGames() {
  const defaults = defaultGamesData;
  const customs = getCustomGames();

  // Deduplicate by ID (custom overwrites default if matching ID)
  const map = new Map();
  defaults.forEach((g) => map.set(g.id, g));
  customs.forEach((g) => map.set(g.id, { ...g, isCustom: true }));

  return Array.from(map.values());
}

export function exportGamesToJson(games) {
  return JSON.stringify(games, null, 2);
}

export function downloadJsonFile(content, fileName = 'games.json') {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
