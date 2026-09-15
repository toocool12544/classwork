import { Play, Heart, Sparkles, Trash2 } from 'lucide-react';

export function GameCard({
  game,
  isFavorite,
  onToggleFavorite,
  onSelectGame,
  onDeleteCustom,
}) {
  const gradientClass = game.color || 'from-emerald-500 to-teal-700';

  return (
    <div
      id={`game-card-${game.id}`}
      onClick={() => onSelectGame(game)}
      className="group relative bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-950/30 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Visual Header / Thumbnail */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        {game.thumbnail ? (
          <img
            src={game.thumbnail}
            alt={game.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-tr ${gradientClass} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
            <span className="text-4xl font-black text-white/40 tracking-wider">
              {game.title.slice(0, 4).toUpperCase()}
            </span>
          </div>
        )}

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* Badges / Category */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm shadow-sm">
            {game.category}
          </span>
          {game.badge && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500/90 text-slate-950 shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {game.badge}
            </span>
          )}
          {game.isCustom && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-cyan-500/90 text-slate-950 shadow-sm">
              Custom
            </span>
          )}
        </div>

        {/* Favorite & Actions Top-Right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {game.isCustom && onDeleteCustom && (
            <button
              onClick={(e) => onDeleteCustom(game.id, e)}
              title="Delete Custom Game"
              className="p-1.5 rounded-lg bg-slate-950/70 hover:bg-rose-600/90 text-slate-300 hover:text-white transition-colors backdrop-blur-sm"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            id={`fav-btn-${game.id}`}
            onClick={(e) => onToggleFavorite(game.id, e)}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-1.5 rounded-lg backdrop-blur-sm transition-all ${
              isFavorite
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-rose-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Play Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
          <div className="w-13 h-13 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/50 transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-slate-950 ml-1" />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
              {game.title}
            </h3>
            {game.plays && (
              <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                {game.plays.toLocaleString()} plays
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Footer info: Controls hint or quick play */}
        <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
          <span className="truncate max-w-[180px]" title={game.controls || 'HTML5 Game'}>
            🎮 {game.controls ? game.controls : 'Mouse & Keyboard'}
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Play <Play className="w-3 h-3 fill-emerald-400" />
          </span>
        </div>
      </div>
    </div>
  );
}
