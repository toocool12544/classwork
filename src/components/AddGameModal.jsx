import { useState } from 'react';
import { X, Plus, Code, Eye, AlertCircle } from 'lucide-react';
import { parseIframeSource } from '../utils/gameUtils';

export function AddGameModal({ isOpen, onClose, onAddGame }) {
  const [title, setTitle] = useState('');
  const [iframeInput, setIframeInput] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [description, setDescription] = useState('');
  const [controls, setControls] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [previewActive, setPreviewActive] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleTestPreview = () => {
    if (!iframeInput.trim()) {
      setError('Please enter an iframe HTML code or game URL.');
      return;
    }
    setError('');
    setPreviewActive(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a game title.');
      return;
    }
    if (!iframeInput.trim()) {
      setError('Please provide an iframe embed tag or game URL.');
      return;
    }

    const { url, iframeHtml } = parseIframeSource(iframeInput);
    if (!url) {
      setError('Invalid iframe format. Could not extract a valid src URL.');
      return;
    }

    const newGame = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category: category || 'Arcade',
      description: description.trim() || 'Custom unblocked game embedded via iframe.',
      iframe: iframeHtml,
      url: url,
      controls: controls.trim() || 'Standard keyboard & mouse',
      thumbnail: thumbnail.trim() || undefined,
      color: 'from-cyan-500 to-blue-700',
      badge: 'Custom',
      plays: 1,
      isCustom: true,
    };

    onAddGame(newGame);
    onClose();
    // Reset fields
    setTitle('');
    setIframeInput('');
    setDescription('');
    setControls('');
    setThumbnail('');
    setPreviewActive(false);
    setError('');
  };

  const { url: previewUrl } = parseIframeSource(iframeInput);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Add Game via Iframe</h3>
              <p className="text-xs text-slate-400">Store a new HTML5 game in the JSON catalog</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Game Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Slope Run, Cookie Clicker, Moto X3M"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Iframe Embed Tag or Game URL *</span>
              <span className="text-[11px] text-emerald-400 font-normal">Accepts &lt;iframe&gt; or https://</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder={`<iframe src="https://example.com/game" width="100%" height="600"></iframe>`}
              value={iframeInput}
              onChange={(e) => {
                setIframeInput(e.target.value);
                setPreviewActive(false);
              }}
              className="w-full font-mono text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-cyan-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Action">Action</option>
                <option value="Retro">Retro</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Controls Guide (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. WASD or Arrow Keys"
                value={controls}
                onChange={(e) => setControls(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Short Description (optional)
            </label>
            <input
              type="text"
              placeholder="Brief description of gameplay"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Cover Image URL (optional)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... or leave blank for gradient"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Iframe Preview Box */}
          {previewActive && previewUrl && (
            <div className="mt-3 rounded-xl border border-slate-700 overflow-hidden bg-black">
              <div className="px-3 py-1.5 bg-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Live Iframe Preview</span>
                <span className="text-emerald-400 font-mono text-[10px] truncate max-w-xs">{previewUrl}</span>
              </div>
              <iframe
                src={previewUrl}
                title="Preview"
                className="w-full h-48 border-0"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleTestPreview}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              {previewActive ? 'Refresh Preview' : 'Test Iframe'}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                Save to Games JSON
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
