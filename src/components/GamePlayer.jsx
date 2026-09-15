import { useState, useRef, useEffect } from 'react';
import { 
  X, Maximize2, Minimize2, RotateCw, ExternalLink, 
  Heart, Share2, Info, Check, Monitor
} from 'lucide-react';

export function GamePlayer({
  game,
  isFavorite,
  onToggleFavorite,
  onClose,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCopied, setHasCopied] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const containerRef = useRef(null);

  // Close on Escape key if not fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request error:', err);
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col p-2 sm:p-4 overflow-y-auto">
      {/* Player Header / Control Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between py-2 px-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl mb-3 shrink-0">
        
        {/* Game Title & Category */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            id="close-player-btn"
            onClick={onClose}
            title="Back to Games List (Esc)"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white truncate">
                {game.title}
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-block">
                {game.category}
              </span>
            </div>
            {game.controls && (
              <p className="text-[11px] text-slate-400 truncate hidden md:block">
                Controls: {game.controls}
              </p>
            )}
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theater Mode */}
          <button
            onClick={() => setIsTheater(!isTheater)}
            title={isTheater ? "Normal Mode" : "Expanded Theater Mode"}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isTheater 
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>

          {/* Reload Iframe */}
          <button
            onClick={handleReload}
            title="Reload Game Iframe"
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Favorite */}
          <button
            onClick={(e) => onToggleFavorite(game.id, e)}
            title={isFavorite ? "Favorited" : "Add to favorites"}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-rose-400 hover:bg-slate-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            title="Copy portal link"
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer hidden sm:block"
          >
            {hasCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Open in New Window/Tab */}
          <a
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Full Tab (Unblocked Direct Access)"
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Game (F)"}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/20"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>
        </div>

      </div>

      {/* Main Iframe Canvas Container */}
      <div 
        ref={containerRef}
        className={`relative mx-auto w-full transition-all duration-300 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex flex-col ${
          isFullscreen 
            ? 'h-screen w-screen rounded-none border-none p-0' 
            : isTheater 
            ? 'max-w-7xl flex-1 min-h-[75vh]' 
            : 'max-w-5xl flex-1 min-h-[68vh]'
        }`}
      >
        {/* Loading overlay spinner */}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center gap-3 z-10">
            <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-400 animate-pulse">
              Connecting to game iframe...
            </p>
          </div>
        )}

        {/* The Game Iframe */}
        <iframe
          key={iframeKey}
          id="active-game-iframe"
          src={game.url}
          title={game.title}
          allow={game.allow || "fullscreen; autoplay; gamepad; keyboard-lock; accelerometer; gyroscope; camera; microphone; display-capture; cross-origin-isolated"}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-modals"
          className="w-full h-full flex-1 border-0 bg-black"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Under-player details / tips */}
      {!isFullscreen && (
        <div className={`mx-auto w-full mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs text-slate-400 ${
          isTheater ? 'max-w-7xl' : 'max-w-5xl'
        }`}>
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Tip:</strong> Click inside the game once to focus keyboard controls. Press <strong>Esc</strong> to return to the catalog.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-slate-400 text-[11px]">
            <span>Stored in: <code className="text-cyan-400">games.json</code></span>
            <a 
              href={game.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1"
            >
              Direct Game Link <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
