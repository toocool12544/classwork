import { Layers, Heart, Gamepad, Puzzle, History, Zap } from 'lucide-react';

export function CategoryBar({
  activeCategory,
  setActiveCategory,
  gameCounts,
  favoritesCount,
}) {
  const categories = [
    { key: 'All', label: 'All Games', icon: Layers },
    { key: 'Favorites', label: 'Favorites', icon: Heart },
    { key: 'Arcade', label: 'Arcade', icon: Gamepad },
    { key: 'Puzzle', label: 'Puzzle', icon: Puzzle },
    { key: 'Retro', label: 'Retro 8-Bit', icon: History },
    { key: 'Action', label: 'Action', icon: Zap },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.key;
        const count = cat.key === 'Favorites' 
          ? favoritesCount 
          : cat.key === 'All' 
          ? (gameCounts['total'] || 0)
          : (gameCounts[cat.key] || 0);

        return (
          <button
            key={cat.key}
            id={`filter-${cat.key.toLowerCase()}`}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer border ${
              isActive
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20 font-bold'
                : 'bg-slate-850/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
            <span>{cat.label}</span>
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                isActive
                  ? 'bg-slate-950/20 text-slate-950'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
