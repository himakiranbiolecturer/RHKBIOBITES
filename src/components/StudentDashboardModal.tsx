import React from 'react';
import { Chapter } from '../types';

interface StudentDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  masteredCount: number;
  totalCards: number;
  chapters: Chapter[];
  masteredCardIds: Set<string>;
  onResetProgress: () => void;
  onMasterAll: () => void;
}

export const StudentDashboardModal: React.FC<StudentDashboardModalProps> = ({
  isOpen,
  onClose,
  masteredCount,
  totalCards,
  chapters,
  masteredCardIds,
  onResetProgress,
  onMasterAll,
}) => {
  if (!isOpen) return null;

  const percent = Math.round((masteredCount / Math.max(totalCards, 1)) * 100);
  const projectedScore = Math.min(360, Math.round(180 + (percent / 100) * 180));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-700/60 border border-emerald-500/40 flex items-center justify-center text-xl text-emerald-300">
                <i className="fa-solid fa-user-graduate"></i>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">Student Academic Dashboard</h3>
                <p className="text-xs text-emerald-300">
                  NEET Biology Preparation &amp; Mastery Metrics
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
              <span className="text-[10px] uppercase tracking-wider text-emerald-300 block">
                Target Projection
              </span>
              <span className="text-2xl font-black text-white font-mono">{projectedScore}</span>
              <span className="text-[10px] text-slate-300 block">/ 360 Marks</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
              <span className="text-[10px] uppercase tracking-wider text-teal-300 block">
                Concepts Mastered
              </span>
              <span className="text-2xl font-black text-white font-mono">
                {masteredCount} <span className="text-sm font-normal text-slate-300">/ {totalCards}</span>
              </span>
              <span className="text-[10px] text-slate-300 block">{percent}% Completed</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
              <span className="text-[10px] uppercase tracking-wider text-amber-300 block">
                Study Streak
              </span>
              <span className="text-2xl font-black text-amber-300 font-mono">14 Days</span>
              <span className="text-[10px] text-slate-300 block">Active Habit</span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Chapter Mastery Breakdown */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <i className="fa-solid fa-chart-column text-emerald-600"></i>
              Chapter-Wise Progress Breakdown
            </h4>

            <div className="space-y-3">
              {chapters.map((chapter) => {
                const total = chapter.subLessons.reduce((acc, s) => acc + s.cardCount, 0);
                let mastered = 0;
                chapter.subLessons.forEach((sub) => {
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
                const chapPercent = total > 0 ? Math.round((mastered / total) * 100) : 0;

                return (
                  <div key={chapter.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                      <span className="flex items-center gap-2">
                        <i className={`${chapter.iconClass} text-emerald-600`}></i>
                        <span>{chapter.title}</span>
                      </span>
                      <span className="font-mono text-emerald-700">
                        {mastered} / {total} ({chapPercent}%)
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${chapPercent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NCERT Revision Strategy Advice */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <h5 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <i className="fa-solid fa-lightbulb text-emerald-600"></i>
              High-Yield Examiner Advice
            </h5>
            <p className="text-xs text-emerald-900 leading-relaxed">
              95%+ of NEET Biology questions directly correspond to exact lines, diagrams, summary paragraphs, and scientist introductions in NCERT. Don&apos;t waste time on non-NCERT reference books until every card here is 100% mastered.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <button
              onClick={onResetProgress}
              className="text-xs text-rose-700 hover:text-rose-900 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-rotate-left"></i>
              Reset All Progress
            </button>

            <button
              onClick={onMasterAll}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
            >
              Mark All as Mastered
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
