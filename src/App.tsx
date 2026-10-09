import { useState, useMemo } from 'react';
import { models, systemSpecs, quantizationGuide, tips, LLMModel } from './data/models';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'performance' | 'ram' | 'date'>('date');
  const [filterCompat, setFilterCompat] = useState<string>('all');
  const [filterTags, setFilterTags] = useState<string>('all');
  const [showGuide, setShowGuide] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    models.forEach(m => m.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  const filteredModels = useMemo(() => {
    let result = [...models];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.organization.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Compatibility filter
    if (filterCompat !== 'all') {
      result = result.filter(m => m.compatibility === filterCompat);
    }

    // Tag filter
    if (filterTags !== 'all') {
      result = result.filter(m => m.tags.includes(filterTags));
    }

    // Sort
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'performance':
        result.sort((a, b) => b.performanceScore - a.performanceScore);
        break;
      case 'ram':
        result.sort((a, b) => a.ramRequired - b.ramRequired);
        break;
      case 'date':
        result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
    }

    return result;
  }, [searchQuery, sortBy, filterCompat, filterTags]);

  const getCompatibilityColor = (compat: string) => {
    switch (compat) {
      case 'excellent': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'moderate': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'tight': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCompatibilityIcon = (compat: string) => {
    switch (compat) {
      case 'excellent': return '🟢';
      case 'good': return '🔵';
      case 'moderate': return '🟡';
      case 'tight': return '🔴';
      default: return '⚪';
    }
  };

  const getPerformanceBar = (score: number) => {
    const color = score >= 8 ? 'bg-emerald-500' : score >= 6 ? 'bg-blue-500' : score >= 4 ? 'bg-amber-500' : 'bg-red-500';
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${score * 10}%` }} />
        </div>
        <span className="text-sm font-medium text-gray-600">{score}/10</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
                🧠
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LiteLLM Tracker</h1>
                <p className="text-xs text-gray-500">Open Source LLMs for Low-Spec Hardware</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm">
              <span className="text-gray-500">Target System:</span>
              <span className="font-mono font-medium text-gray-700">
                {systemSpecs.cpu} • {systemSpecs.cores} cores • {systemSpecs.ram} RAM
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 md:p-8 text-white shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Run AI on Your Budget PC</h2>
            <p className="text-indigo-100 text-lg mb-4">
              Track the latest open-source language models that actually run on a {systemSpecs.ram} RAM, {systemSpecs.cores}-core machine.
              No GPU required.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                <div className="text-xs text-indigo-200">Models Tracked</div>
                <div className="text-xl font-bold">{models.length}</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                <div className="text-xs text-indigo-200">New This Month</div>
                <div className="text-xl font-bold">{models.filter(m => m.isNew).length}</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                <div className="text-xs text-indigo-200">Excellent Fit</div>
                <div className="text-xl font-bold">{models.filter(m => m.compatibility === 'excellent').length}</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                <div className="text-xs text-indigo-200">Min RAM Needed</div>
                <div className="text-xl font-bold">2 GB</div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search models, organizations, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="date">Sort: Latest</option>
              <option value="performance">Sort: Performance</option>
              <option value="ram">Sort: Lowest RAM</option>
              <option value="name">Sort: Name</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Compatibility filter */}
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setFilterCompat('all')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${filterCompat === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterCompat('excellent')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${filterCompat === 'excellent' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                🟢 Excellent
              </button>
              <button
                onClick={() => setFilterCompat('good')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${filterCompat === 'good' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                🔵 Good
              </button>
              <button
                onClick={() => setFilterCompat('moderate')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${filterCompat === 'moderate' ? 'bg-amber-100 text-amber-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                🟡 Moderate
              </button>
              <button
                onClick={() => setFilterCompat('tight')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${filterCompat === 'tight' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                🔴 Tight
              </button>
            </div>

            {/* Tag filter */}
            <select
              value={filterTags}
              onChange={(e) => setFilterTags(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            {/* Guide & Tips toggles */}
            <button
              onClick={() => { setShowGuide(!showGuide); setShowTips(false); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${showGuide ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              📊 Quantization Guide
            </button>
            <button
              onClick={() => { setShowTips(!showTips); setShowGuide(false); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${showTips ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              💡 Performance Tips
            </button>
          </div>
        </section>

        {/* Quantization Guide */}
        {showGuide && (
          <section className="mb-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-in">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quantization Guide for 8GB RAM</h3>
            <p className="text-sm text-gray-600 mb-4">
              Quantization reduces model precision to save RAM. Here's what each level means for your {systemSpecs.ram} system:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {quantizationGuide.map(q => (
                <div key={q.quant} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-gray-800">{q.quant}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      q.color === 'red' ? 'bg-red-100 text-red-700' :
                      q.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                      q.color === 'green' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{q.quality}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">Size: ~{q.sizeRatio} of original</div>
                  <p className="text-xs text-gray-600">{q.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-sm text-indigo-800">
                <strong>💡 Recommendation:</strong> For your {systemSpecs.ram} system, <strong>Q4_K_M</strong> is the sweet spot.
                For models under 3B parameters, you can safely use <strong>Q5_K_M</strong> or even <strong>Q6_K</strong>.
              </p>
            </div>
          </section>
        )}

        {/* Tips */}
        {showTips && (
          <section className="mb-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Tips for Low-Spec Systems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tips.map((tip, i) => (
                <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className={`fas fa-${tip.icon} text-indigo-600 text-sm`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800">{tip.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <strong>{filteredModels.length}</strong> of {models.length} models
          </p>
          <p className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Model Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModels.map(model => (
            <ModelCard
              key={model.id}
              model={model}
              getCompatibilityColor={getCompatibilityColor}
              getCompatibilityIcon={getCompatibilityIcon}
              getPerformanceBar={getPerformanceBar}
            />
          ))}
        </section>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500">No models match your filters. Try adjusting your search.</p>
          </div>
        )}

        {/* Recommended Setup Section */}
        <section className="mt-12 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Recommended Setup for Your System</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Software Stack</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5">▸</span>
                  <div>
                    <span className="font-medium">Ollama</span>
                    <span className="text-gray-500 text-sm ml-2">— Easiest setup, one command install</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5">▸</span>
                  <div>
                    <span className="font-medium">LM Studio</span>
                    <span className="text-gray-500 text-sm ml-2">— GUI with model browser, great for beginners</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5">▸</span>
                  <div>
                    <span className="font-medium">llama.cpp</span>
                    <span className="text-gray-500 text-sm ml-2">— Maximum control & performance tuning</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5">▸</span>
                  <div>
                    <span className="font-medium">KoboldCpp</span>
                    <span className="text-gray-500 text-sm ml-2">— Great for creative writing & roleplay</span>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Quick Start (Ollama)</h4>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100">
                <div className="text-gray-500"># Install Ollama</div>
                <div className="text-green-400">$ curl -fsSL https://ollama.com/install.sh | sh</div>
                <div className="mt-3 text-gray-500"># Run a recommended model</div>
                <div className="text-green-400">$ ollama run qwen2.5:3b</div>
                <div className="mt-3 text-gray-500"># Or try the reasoning model</div>
                <div className="text-green-400">$ ollama run deepseek-r1:1.5b</div>
                <div className="mt-3 text-gray-500"># For coding tasks</div>
                <div className="text-green-400">$ ollama run qwen2.5-coder:3b</div>
              </div>
            </div>
          </div>
        </section>

        {/* Compatibility Legend */}
        <section className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Compatibility Legend</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🟢</span>
              <div>
                <h4 className="font-semibold text-gray-800">Excellent</h4>
                <p className="text-xs text-gray-500">Runs comfortably with room to spare. Can use higher quantization.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔵</span>
              <div>
                <h4 className="font-semibold text-gray-800">Good</h4>
                <p className="text-xs text-gray-500">Runs well at Q4. Close other apps for best experience.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🟡</span>
              <div>
                <h4 className="font-semibold text-gray-800">Moderate</h4>
                <p className="text-xs text-gray-500">Tight fit. May need Q3 or mmap. Expect slower speeds.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔴</span>
              <div>
                <h4 className="font-semibold text-gray-800">Tight</h4>
                <p className="text-xs text-gray-500">Barely fits. Requires aggressive quantization or mmap.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              LiteLLM Tracker — Helping you run AI on any hardware.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Data sourced from HuggingFace & community benchmarks</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Model Card Component
function ModelCard({
  model,
  getCompatibilityColor,
  getCompatibilityIcon,
  getPerformanceBar
}: {
  model: LLMModel;
  getCompatibilityColor: (compat: string) => string;
  getCompatibilityIcon: (compat: string) => string;
  getPerformanceBar: (score: number) => JSX.Element;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900">{model.name}</h3>
            {model.isNew && (
              <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">NEW</span>
            )}
          </div>
          <p className="text-sm text-gray-500">{model.organization} • {model.parameters} params</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCompatibilityColor(model.compatibility)}`}>
          {getCompatibilityIcon(model.compatibility)} {model.compatibility}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">{model.description}</p>

      {/* Stats */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">RAM Required</span>
          <span className="font-medium text-gray-800">{model.ramRequired} GB</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Quantized Size</span>
          <span className="font-medium text-gray-800">{model.quantizedSize}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Context</span>
          <span className="font-medium text-gray-800">{model.contextLength.toLocaleString()} tokens</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">License</span>
          <span className="font-medium text-gray-800">{model.license}</span>
        </div>
      </div>

      {/* Performance */}
      <div className="mb-3">
        <div className="text-xs text-gray-500 mb-1">Performance Score</div>
        {getPerformanceBar(model.performanceScore)}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {model.tags.slice(0, 4).map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Use Cases */}
      <div className="mb-3">
        <div className="text-xs text-gray-500 mb-1">Best For</div>
        <div className="flex flex-wrap gap-1">
          {model.useCases.map(uc => (
            <span key={uc} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full">
              {uc}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          Updated {new Date(model.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <a
          href={model.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition"
        >
          Download
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;
