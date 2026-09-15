import { useState } from 'react';
import { Gamepad2, Search, Plus, Code, EyeOff, Eye, Shuffle } from 'lucide-react';

export function Navbar({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  onOpenAddModal,
  onOpenJsonModal,
  onPlayRandom,
  totalGames,
  favoriteCount,
}) {
  const [isCloaked, setIsCloaked] = useState(false);

  const toggleCloak = () => {
    if (!isCloaked) {
      document.title = 'Google Docs - Untitled Document';
      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico';
      }
      setIsCloaked(true);
    } else {
      document.title = 'Unblocked Games Portal';
      setIsCloaked(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div 
            id="portal-logo"
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <Gamepad2 className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                UNBLOCKED<span className="text-emerald-400">GAMES</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider hidden sm:block">
                HTML5 & Iframe Portal • {totalGames} Games
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-games-input"
              type="text"
              placeholder="Search games by title, genre, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/70 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Random Game */}
            <button
              id="random-game-btn"
              onClick={onPlayRandom}
              title="Play a Random Game"
              className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800/90 hover:bg-slate-700/80 hover:text-white rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <Shuffle className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline">Random</span>
            </button>

            {/* Add Game (with Iframe) */}
            <button
              id="add-game-btn"
              onClick={onOpenAddModal}
              title="Add New Game Iframe to JSON"
              className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 rounded-xl shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">Add Game</span>
            </button>

            {/* View/Export JSON */}
            <button
              id="view-json-btn"
              onClick={onOpenJsonModal}
              title="View & Export games.json"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800/90 hover:bg-slate-700/80 hover:text-white rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <Code className="w-4 h-4 text-cyan-400" />
              <span className="hidden xl:inline">games.json</span>
            </button>

            {/* Cloak Tab / Stealth Mode */}
            <button
              id="stealth-mode-btn"
              onClick={toggleCloak}
              title={isCloaked ? "Restore original tab title" : "Stealth Cloak (disguise as Google Docs tab)"}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isCloaked 
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30' 
                  : 'bg-slate-800/90 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80'
              }`}
            >
              {isCloaked ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile search bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
