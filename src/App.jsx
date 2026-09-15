/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  Gamepad2, Play, Shuffle, 
  Flame, Plus, Code, ShieldCheck, Compass 
} from 'lucide-react';
import { 
  loadAllGames, getFavorites, saveFavorites, 
  saveCustomGames 
} from './utils/gameUtils';
import { Navbar } from './components/Navbar';
import { CategoryBar } from './components/CategoryBar';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { AddGameModal } from './components/AddGameModal';
import { JsonModal } from './components/JsonModal';

export default function App() {
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);

  // Initialize games and favorites on mount
  useEffect(() => {
    const initialGames = loadAllGames();
    setGames(initialGames);
    setFavorites(getFavorites());
  }, []);

  // Toggle favorite
  const handleToggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id) 
        ? prev.filter((item) => item !== id) 
        : [...prev, id];
      saveFavorites(next);
      return next;
    });
  };

  // Add new game via modal
  const handleAddGame = (newGame) => {
    setGames((prev) => {
      const updated = [newGame, ...prev];
      const customOnes = updated.filter((g) => g.isCustom);
      saveCustomGames(customOnes);
      return updated;
    });
  };

  // Delete custom game
  const handleDeleteCustom = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this custom game?')) {
      setGames((prev) => {
        const updated = prev.filter((g) => g.id !== id);
        const customOnes = updated.filter((g) => g.isCustom);
        saveCustomGames(customOnes);
        return updated;
      });
      if (selectedGame?.id === id) {
        setSelectedGame(null);
      }
    }
  };

  // Import games from JSON modal
  const handleImportGames = (imported) => {
    setGames(imported);
    const customOnes = imported.filter((g) => g.isCustom);
    saveCustomGames(customOnes);
  };

  // Reset to default games.json
  const handleResetDefaults = () => {
    if (confirm('Reset to original default games list?')) {
      localStorage.removeItem('unblocked_games_custom_v1');
      const reset = loadAllGames();
      setGames(reset);
      setIsJsonModalOpen(false);
    }
  };

  // Play random game
  const handlePlayRandom = () => {
    if (games.length === 0) return;
    const randomIndex = Math.floor(Math.random() * games.length);
    setSelectedGame(games[randomIndex]);
  };

  // Category counts
  const gameCounts = useMemo(() => {
    const counts = { total: games.length };
    games.forEach((g) => {
      counts[g.category] = (counts[g.category] || 0) + 1;
    });
    return counts;
  }, [games]);

  // Filtered games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Category filter
      if (activeCategory === 'Favorites') {
        if (!favorites.includes(game.id)) return false;
      } else if (activeCategory !== 'All') {
        if (game.category.toLowerCase() !== activeCategory.toLowerCase()) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(query);
        const matchesCat = game.category.toLowerCase().includes(query);
        const matchesDesc = game.description.toLowerCase().includes(query);
        const matchesBadge = game.badge?.toLowerCase().includes(query);
        return matchesTitle || matchesCat || matchesDesc || matchesBadge;
      }

      return true;
    });
  }, [games, activeCategory, favorites, searchQuery]);

  // Featured game for the hero showcase (defaults to 2048 or first featured)
  const featuredGame = useMemo(() => {
    return games.find((g) => g.badge === 'Featured') || games[0];
  }, [games]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onPlayRandom={handlePlayRandom}
        totalGames={games.length}
        favoriteCount={favorites.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Hero / Spotlight Banner (shown when no search and on 'All' category) */}
        {!searchQuery && activeCategory === 'All' && featuredGame && (
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 fill-emerald-400" />
                  Featured Iframe Game
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {featuredGame.title}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {featuredGame.description}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    id="play-featured-btn"
                    onClick={() => setSelectedGame(featuredGame)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    Play Now
                  </button>
                  <button
                    onClick={handlePlayRandom}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                  >
                    <Shuffle className="w-4 h-4 text-emerald-400" />
                    Random Pick
                  </button>
                </div>
              </div>

              {/* Featured preview card */}
              <div 
                onClick={() => setSelectedGame(featuredGame)}
                className="w-full md:w-72 aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-xl group cursor-pointer relative shrink-0"
              >
                {featuredGame.thumbnail ? (
                  <img
                    src={featuredGame.thumbnail}
                    alt={featuredGame.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-emerald-600 to-teal-800 flex items-center justify-center">
                    <Gamepad2 className="w-12 h-12 text-white/50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 fill-emerald-400" /> Quick Launch
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <CategoryBar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            gameCounts={gameCounts}
            favoritesCount={favorites.length}
          />

          <div className="text-xs text-slate-400 font-medium shrink-0 flex items-center gap-2">
            <span>Showing <strong className="text-white">{filteredGames.length}</strong> {filteredGames.length === 1 ? 'game' : 'games'}</span>
            {searchQuery && (
              <span className="text-slate-500">for &ldquo;{searchQuery}&rdquo;</span>
            )}
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={handleToggleFavorite}
                onSelectGame={(g) => setSelectedGame(g)}
                onDeleteCustom={handleDeleteCustom}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="py-16 text-center rounded-3xl border border-slate-800 bg-slate-900/50 p-8 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
              <Compass className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">
                {games.length === 0 ? 'No games in library' : 'No games found'}
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                {games.length === 0
                  ? 'All games have been removed. Click "Add New Game" or import your games.json file to add games.'
                  : searchQuery
                  ? `No games match "${searchQuery}". Try a different keyword or add a new game iframe.`
                  : activeCategory === 'Favorites'
                  ? "You haven't added any favorites yet! Click the heart icon on any game card to pin it here."
                  : 'No games available in this category.'}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              )}
              {activeCategory !== 'All' && games.length > 0 && (
                <button
                  onClick={() => setActiveCategory('All')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  View All Games
                </button>
              )}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                Add New Game
              </button>
              {games.length === 0 && (
                <button
                  onClick={() => setIsJsonModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-cyan-300 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Code className="w-4 h-4 text-cyan-400" />
                  Import games.json
                </button>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800/80 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Unblocked Games Portal • JSON Iframe Storage Engine</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" /> View games.json
            </button>
            <span>•</span>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Iframe Game
            </button>
          </div>
        </div>
      </footer>

      {/* Game Player Screen (when a game is active) */}
      {selectedGame && (
        <GamePlayer
          game={selectedGame}
          isFavorite={favorites.includes(selectedGame.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setSelectedGame(null)}
        />
      )}

      {/* Add Game Modal */}
      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />

      {/* JSON Viewer & Exporter Modal */}
      <JsonModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        games={games}
        onImportGames={handleImportGames}
        onResetDefaults={handleResetDefaults}
      />

    </div>
  );
}
