import React from 'react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  masteredCount: number;
  totalCards: number;
  onQuickTopicClick: (topic: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  masteredCount,
  totalCards,
  onQuickTopicClick,
}) => {
  const percent = Math.round((masteredCount / Math.max(totalCards, 1)) * 100);

  // Projected NEET biology score calculation (scale: 360)
  // Baseline starts at 180, and scaling up to 360
  const projectedScore = Math.min(
    360,
    Math.round(180 + (percent / 100) * 180)
  );

  const quickTopics = [
    { label: 'Cell Structure & Functions', query: 'Cell' },
    { label: 'Cell-The Unit of Life', query: 'Unit of Life' },
    { label: 'Biomolecules & Enzymes', query: 'Biomolecules' },
    { label: 'Cell Cycle & Division', query: 'Cell Cycle' },
    { label: 'Human Physiology', query: 'Human Physiology' },
    { label: 'Breathing & Gas Exchange', query: 'Breathing' },
    { label: 'Cardiac & ECG', query: 'Cardiac' },
    { label: 'Nephron & Ultrafiltration', query: 'Nephron' },
    { label: 'Sarcomere & Muscle', query: 'Sarcomere' },
    { label: 'Structure of DNA', query: 'DNA' },
    { label: 'Steps of Glycolysis', query: 'Glycolysis' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-900 text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-800/60">
      {/* Background Subtle Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {/* Academic High-Focus Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/70 border border-emerald-600/40 text-xs font-semibold text-emerald-200 shadow-sm">
          <i className="fa-solid fa-graduation-cap text-emerald-400"></i>
          <span>Targeting 360/360 in NEET Biology</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="text-emerald-300 font-mono">100% NCERT Pure</span>
        </div>

        {/* Motivating Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Master NEET Biology: <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
            NCERT-Aligned, Concept by Concept
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
          High-yield micro-learning cards engineered specifically for medical aspirants.
          Verbatim NCERT line traps, interactive biological schematics, and past 10-year PYQ alerts.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto pt-2">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-400">
              <i className="fa-solid fa-magnifying-glass text-base"></i>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search specific topics (e.g., Genetics, Glycolysis, Nephron, Lac Operon, DNA)..."
              className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-500/30 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-slate-900/90 transition-all shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-12 text-slate-400 hover:text-white text-xs px-2 py-1 cursor-pointer"
                title="Clear search"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
            <div className="absolute right-3 hidden sm:block">
              <kbd className="px-2 py-1 text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-700/50 rounded-md">
                Fast Find
              </kbd>
            </div>
          </div>

          {/* Quick Topic Chips */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap mt-3 text-xs">
            <span className="text-slate-400 text-[11px] font-medium mr-1">
              Popular Topics:
            </span>
            {quickTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => onQuickTopicClick(topic.query)}
                className="px-2.5 py-1 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 transition-colors text-[11px] cursor-pointer"
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Global Visual Progress Bar (Requested) */}
        <div className="max-w-3xl mx-auto pt-4">
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-emerald-800/70 shadow-xl text-left">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-300 text-sm">
                  <i className="fa-solid fa-chart-pie"></i>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    Real-time Syllabus Mastery
                  </span>
                  <span className="text-sm font-bold text-white">
                    {masteredCount} of {totalCards} High-Yield Blocks Mastered
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                    Projected Biology Score
                  </span>
                  <span className="text-base font-extrabold text-emerald-300 font-mono">
                    {projectedScore}{' '}
                    <span className="text-xs font-normal text-slate-400">/ 360</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                    Completion
                  </span>
                  <span className="text-base font-extrabold text-white font-mono">
                    {percent}%
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Progress Bar Track with Smooth Fill */}
            <div className="relative w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full transition-all duration-500 ease-out relative shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                style={{ width: `${percent}%` }}
              >
                {/* Subtle animated shine */}
                <div className="absolute inset-0 bg-white/20 rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-circle-info text-emerald-500 text-[10px]"></i>
                Mark blocks as mastered below to update your readiness in real time.
              </span>
              <span className="text-emerald-400 font-medium">
                {percent === 100
                  ? '🎉 Outstanding! Full Syllabus Mastered'
                  : `${totalCards - masteredCount} concepts pending review`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
