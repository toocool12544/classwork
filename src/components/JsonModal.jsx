import { useState } from 'react';
import { X, Copy, Check, Download, Upload, RotateCcw, FileJson } from 'lucide-react';
import { exportGamesToJson, downloadJsonFile } from '../utils/gameUtils';

export function JsonModal({
  isOpen,
  onClose,
  games,
  onImportGames,
  onResetDefaults,
}) {
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState('');

  if (!isOpen) return null;

  const jsonString = exportGamesToJson(games);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadJsonFile(jsonString, 'games.json');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) {
          throw new Error('JSON root must be an array of game items.');
        }
        // Verify items have at least id, title, and iframe or url
        const validated = parsed.map((item, idx) => {
          if (!item.title) throw new Error(`Item at index ${idx} missing "title".`);
          return {
            id: item.id || `game-${Date.now()}-${idx}`,
            title: item.title,
            category: item.category || 'Arcade',
            description: item.description || '',
            iframe: item.iframe || `<iframe src="${item.url}" width="100%" height="600"></iframe>`,
            url: item.url || (item.iframe?.match(/src=["']([^"']+)["']/i)?.[1] || ''),
            controls: item.controls || '',
            thumbnail: item.thumbnail || '',
            color: item.color || 'from-emerald-500 to-teal-700',
            badge: item.badge || 'Imported',
            plays: item.plays || 0,
            isCustom: true,
          };
        });

        onImportGames(validated);
        setImportError('');
        onClose();
      } catch (err) {
        setImportError(err.message || 'Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileJson className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">games.json Database</h3>
              <p className="text-xs text-slate-400">
                Storing {games.length} game configurations with embedded iframe tags
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* JSON Code Viewer */}
        <div className="p-4 flex-1 overflow-auto bg-slate-950/70 border-b border-slate-800">
          {importError && (
            <div className="mb-3 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {importError}
            </div>
          )}
          <pre className="text-xs font-mono text-cyan-300/90 leading-relaxed overflow-x-auto whitespace-pre">
            <code>{jsonString}</code>
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-900 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={onResetDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Defaults
            </button>
          </div>

          <p className="text-[11px] text-slate-500 hidden sm:block">
            Stored directly in <code className="text-cyan-400">/games.json</code>
          </p>
        </div>

      </div>
    </div>
  );
}
