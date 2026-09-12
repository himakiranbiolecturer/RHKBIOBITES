import React from 'react';
import { Chapter } from '../types';

interface SidebarProps {
  chapters: Chapter[];
  activeChapterId: string | null;
  activeSubLessonId: string | null;
  onSelectChapter: (chapterId: string | null) => void;
  onSelectSubLesson: (subLessonId: string | null, chapterId: string) => void;
  masteredCardIds: Set<string>;
  cardChapterMap: Record<string, string>;
  filterMode: 'all' | 'unmastered' | 'class11' | 'class12';
  onFilterChange: (mode: 'all' | 'unmastered' | 'class11' | 'class12') => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chapters,
  activeChapterId,
  activeSubLessonId,
  onSelectChapter,
  onSelectSubLesson,
  masteredCardIds,
  filterMode,
  onFilterChange,
  isMobileOpen,
  onCloseMobile,
}) => {
  // Count mastery by chapter
  const getChapterStats = (chapter: Chapter) => {
    // Collect all card count for this chapter
    const totalCards = chapter.subLessons.reduce((acc, sub) => acc + sub.cardCount, 0);
    // Approximate or direct count
    let mastered = 0;
    chapter.subLessons.forEach((sub) => {
      // Check if sublesson's cards are mastered
      if (sub.id === 'sub-dna-structure' && masteredCardIds.has('card-dna-structure')) mastered++;
      if (sub.id === 'sub-nucleosome' && masteredCardIds.has('card-nucleosome')) mastered++;
      if (sub.id === 'sub-lac-operon' && masteredCardIds.has('card-lac-operon')) mastered++;
      if (sub.id === 'sub-glycolysis' && masteredCardIds.has('card-glycolysis')) mastered++;
      if (sub.id === 'sub-krebs-ets' && masteredCardIds.has('card-krebs-cycle')) mastered++;
      if (sub.id === 'sub-breathing-exchange' && masteredCardIds.has('card-breathing-gas-exchange')) mastered++;
      if (sub.id === 'sub-body-fluids-circulation' && masteredCardIds.has('card-body-fluids-circulation')) mastered++;
      if (sub.id === 'sub-excretory-products') {
        if (masteredCardIds.has('card-nephron-anatomy')) mastered++;
        if (masteredCardIds.has('card-counter-current')) mastered++;
      }
      if (sub.id === 'sub-locomotion-movement' && masteredCardIds.has('card-locomotion-movement')) mastered++;
      if (sub.id === 'sub-neural-control' && masteredCardIds.has('card-neural-control')) mastered++;
      if (sub.id === 'sub-chemical-coordination' && masteredCardIds.has('card-chemical-coordination')) mastered++;
      if (sub.id === 'sub-cell-unit-of-life' && masteredCardIds.has('card-cell-unit-of-life')) mastered++;
      if (sub.id === 'sub-biomolecules' && masteredCardIds.has('card-biomolecules')) mastered++;
      if (sub.id === 'sub-cell-cycle-division' && masteredCardIds.has('card-cell-cycle-division')) mastered++;
      if (sub.id === 'sub-dihybrid-cross' && masteredCardIds.has('card-dihybrid-cross')) mastered++;
      if (sub.id === 'sub-linkage' && masteredCardIds.has('card-dihybrid-cross')) mastered++;
      if (sub.id === 'sub-biomagnification' && masteredCardIds.has('card-biomagnification')) mastered++;
    });
    return { total: totalCards, mastered };
  };

  const content = (
    <div className="flex flex-col h-full min-h-0">
      {/* Syllabus Header */}
      <div className="p-4 border-b border-slate-200/80 bg-slate-50/50 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-list-check text-emerald-600"></i>
            NEET UG Syllabus
          </h2>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
            NCERT Core
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Select chapters &amp; sub-topics to navigate high-yield micro-lessons.
        </p>

        {/* Filter Tabs */}
        <div className="grid grid-cols-2 gap-1.5 mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-semibold">
          <button
            onClick={() => onFilterChange('all')}
            className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-colors ${
              filterMode === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Chapters
          </button>
          <button
            onClick={() => onFilterChange('unmastered')}
            className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-colors ${
              filterMode === 'unmastered'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Pending Only
          </button>
          <button
            onClick={() => onFilterChange('class11')}
            className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-colors ${
              filterMode === 'class11'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Class XI (11th)
          </button>
          <button
            onClick={() => onFilterChange('class12')}
            className={`py-1.5 px-2 rounded-lg text-center cursor-pointer transition-colors ${
              filterMode === 'class12'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Class XII (12th)
          </button>
        </div>
      </div>

      {/* Chapter List with Dedicated Scroll Bar */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2 syllabus-scrollbar overscroll-contain">
        {chapters
          .filter((chap) => {
            if (filterMode === 'class11') return chap.classLevel === 'Class XI';
            if (filterMode === 'class12') return chap.classLevel === 'Class XII';
            return true;
          })
          .map((chapter) => {
            const isSelected = activeChapterId === chapter.id;
            const stats = getChapterStats(chapter);
            const isAllMastered = stats.total > 0 && stats.mastered >= stats.total;

            return (
              <div
                key={chapter.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                    : 'border-slate-200/90 bg-white hover:border-slate-300'
                }`}
              >
                {/* Chapter Title Header */}
                <button
                  onClick={() => {
                    if (isSelected) {
                      onSelectChapter(null);
                    } else {
                      onSelectChapter(chapter.id);
                    }
                  }}
                  className="w-full text-left p-3 flex items-start justify-between gap-2 cursor-pointer"
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs ${
                        isAllMastered
                          ? 'bg-emerald-600 text-white'
                          : isSelected
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <i className={chapter.iconClass}></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                          {chapter.classLevel} • {chapter.unit}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 leading-snug mt-0.5">
                        {chapter.title}
                      </h3>
                      <div className="text-[10px] text-emerald-700 font-medium mt-0.5 flex items-center gap-2">
                        <span>{chapter.weightage}</span>
                        <span>•</span>
                        <span className="font-semibold">
                          {stats.mastered}/{stats.total} Mastered
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 mt-1">
                    {isAllMastered && (
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px]">
                        ✓
                      </span>
                    )}
                    <i
                      className={`fa-solid fa-chevron-down text-[11px] text-slate-400 transition-transform ${
                        isSelected ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    ></i>
                  </div>
                </button>

                {/* Sub-lessons list */}
                {isSelected && (
                  <div className="bg-white/80 border-t border-slate-100 px-3 py-2 space-y-1">
                    {chapter.subLessons.map((sub) => {
                      const isSubActive = activeSubLessonId === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => onSelectSubLesson(sub.id, chapter.id)}
                          className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSubActive
                              ? 'bg-emerald-700 text-white font-semibold'
                              : 'text-slate-700 hover:bg-emerald-50/70 hover:text-emerald-900'
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSubActive ? 'bg-white' : 'bg-emerald-500'
                              }`}
                            ></span>
                            <span className="truncate">{sub.title}</span>
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                              isSubActive
                                ? 'bg-emerald-800 text-emerald-100'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {sub.cardCount} card
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Sidebar Footer Stats */}
      <div className="p-3 bg-emerald-950 text-white border-t border-emerald-900 shrink-0">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-emerald-300 font-medium">NEET 360/360 Target</span>
          <span className="text-amber-300 font-bold font-mono">Bio Goal</span>
        </div>
        <p className="text-[11px] text-emerald-200/80 leading-tight">
          38 NCERT Chapters. Zero fluff. Focus on verbatim diagrams &amp; PYQ statements.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar with Scrollable Syllabus */}
      <aside className="hidden lg:flex lg:flex-col w-80 shrink-0 self-start sticky top-24 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden h-[calc(100vh-7.5rem)] max-h-[calc(100vh-7.5rem)]">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          ></div>
          <div className="relative w-80 max-w-full bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <i className="fa-solid fa-dna text-emerald-600"></i> Syllabus Menu
              </span>
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 text-xs cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">{content}</div>
          </div>
        </div>
      )}
    </>
  );
};
