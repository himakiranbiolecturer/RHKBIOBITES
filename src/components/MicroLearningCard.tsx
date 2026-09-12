import React, { useState } from 'react';
import { MicroCard } from '../types';
import { DiagramViewer } from './DiagramViewer';

interface MicroLearningCardProps {
  card: MicroCard;
  isMastered: boolean;
  onToggleMastered: (id: string) => void;
  chapterTitle?: string;
}

export const MicroLearningCard: React.FC<MicroLearningCardProps> = ({
  card,
  isMastered,
  onToggleMastered,
  chapterTitle,
}) => {
  const [showQuickQuiz, setShowQuickQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (!quizSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption !== null) {
      setQuizSubmitted(true);
      if (selectedOption === card.flashTest.correctIndex && !isMastered) {
        onToggleMastered(card.id);
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedOption(null);
    setQuizSubmitted(false);
  };

  const getTagBadgeColor = (tag: MicroCard['highYieldTag']) => {
    switch (tag) {
      case 'Must-Know':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Assertion-Reason Hotspot':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Diagram-Based':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <article
      id={`block-${card.id}`}
      className={`relative bg-white rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden mb-8 ${
        isMastered
          ? 'border-emerald-500/80 ring-2 ring-emerald-500/20'
          : 'border-slate-200/90 hover:border-emerald-300 hover:shadow-md'
      }`}
    >
      {/* Top Meta Header Bar */}
      <div className="bg-slate-50/90 px-5 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getTagBadgeColor(
              card.highYieldTag
            )} flex items-center gap-1.5`}
          >
            <i className="fa-solid fa-star text-[10px]"></i>
            {card.highYieldTag}
          </span>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <i className="fa-regular fa-clock text-slate-400"></i>
            {card.estimatedReadTime}
          </span>
          {chapterTitle && (
            <span className="text-xs text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 hidden sm:inline-block">
              {chapterTitle}
            </span>
          )}
        </div>

        {/* Mastered Status Indicator / Toggle in Header */}
        <button
          onClick={() => onToggleMastered(card.id)}
          className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
            isMastered
              ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
              : 'bg-white text-slate-700 border border-slate-300 hover:border-emerald-500 hover:text-emerald-700'
          }`}
          aria-label={isMastered ? 'Mark as incomplete' : 'Mark as mastered'}
        >
          <i
            className={`fa-solid ${
              isMastered
                ? 'fa-circle-check text-emerald-200 group-hover:scale-110'
                : 'fa-check text-slate-400 group-hover:text-emerald-600'
            } transition-transform`}
          ></i>
          <span>{isMastered ? 'Mastered ✓' : 'Mark as Mastered'}</span>
        </button>
      </div>

      <div className="p-6">
        {/* Title & Subtitle */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
            {card.title}
          </h3>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            {card.subtitle}
          </p>
        </div>

        {/* Core Concept Breakdown */}
        <div className="space-y-3 mb-5">
          <p className="text-slate-700 text-sm leading-relaxed">
            {card.coreConcept.summary}
          </p>
          <ul className="space-y-2 text-sm text-slate-700 pl-1">
            {card.coreConcept.bulletPoints.map((point, index) => {
              const [boldPart, ...rest] = point.split(':');
              return (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                  <span className="leading-relaxed">
                    {rest.length > 0 ? (
                      <>
                        <strong className="font-semibold text-slate-900">{boldPart}:</strong>{' '}
                        {rest.join(':')}
                      </>
                    ) : (
                      point
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Visual / Diagram Schematic Placeholder */}
        <div className="my-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <i className="fa-solid fa-microscope text-emerald-600"></i>
              High-Yield Visual Schematic
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              NCERT Diagram Reference
            </span>
          </div>
          <DiagramViewer diagram={card.diagram} />
        </div>

        {/* Mnemonic Pill if available */}
        {card.mnemonic && (
          <div className="mb-5 bg-amber-50/70 border border-amber-200/90 rounded-xl p-3 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <i className="fa-solid fa-lightbulb text-xs"></i>
            </div>
            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                Memory Mnemonic (NEET Shortcut)
              </span>
              <p className="text-xs text-amber-900/90 font-medium mt-0.5 font-mono">
                {card.mnemonic}
              </p>
            </div>
          </div>
        )}

        {/* DISTINCT CALLOUT 1: NCERT Key Points (Crucial for NEET) */}
        <section className="mb-5 rounded-xl bg-emerald-50/75 border border-emerald-200/90 p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/20 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-emerald-200/80">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-700 text-white flex items-center justify-center text-xs shadow-sm">
                <i className="fa-solid fa-book-bookmark"></i>
              </span>
              <h4 className="font-bold text-sm text-emerald-950 tracking-tight">
                NCERT Verbatim Key Points
              </h4>
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-200">
              {card.ncertKeyPoints.pageReference}
            </span>
          </div>

          <ul className="space-y-2 text-xs text-emerald-950 font-medium leading-relaxed">
            {card.ncertKeyPoints.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <i className="fa-solid fa-check text-emerald-600 text-[11px] mt-1 shrink-0"></i>
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          {card.ncertKeyPoints.trapAlert && (
            <div className="mt-3 pt-2.5 border-t border-emerald-200/70 flex items-start gap-2 text-xs text-rose-900 bg-rose-50/70 p-2.5 rounded-lg border border-rose-200/80">
              <i className="fa-solid fa-triangle-exclamation text-rose-600 mt-0.5 shrink-0"></i>
              <div>
                <strong className="font-bold text-rose-950">Examiner Trap Alert: </strong>
                <span>{card.ncertKeyPoints.trapAlert}</span>
              </div>
            </div>
          )}
        </section>

        {/* DISTINCT CALLOUT 2: Past Year Questions (PYQ) Alerts */}
        <section className="mb-5 rounded-xl bg-amber-50/70 border border-amber-200/90 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-amber-200/80">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-600 text-white flex items-center justify-center text-xs shadow-sm">
                <i className="fa-solid fa-fire"></i>
              </span>
              <h4 className="font-bold text-sm text-amber-950 tracking-tight">
                Past Year Question (PYQ) Alert
              </h4>
            </div>
            <div className="flex gap-1.5">
              {card.pyqAlert.examYears.map((year, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded border border-amber-300 font-mono"
                >
                  {year}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-xs text-amber-950">
            <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200/60">
              <span className="text-[10px] font-bold uppercase text-amber-800 block mb-0.5 tracking-wider">
                Question Tested:
              </span>
              <p className="font-semibold text-slate-800 text-xs italic">
                &ldquo;{card.pyqAlert.questionSnippet}&rdquo;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <div className="flex-1 bg-amber-100/50 p-2 rounded border border-amber-200/50">
                <span className="text-[10px] font-bold text-amber-800 block uppercase">
                  Concept Assessed
                </span>
                <span className="text-slate-800 font-medium">
                  {card.pyqAlert.conceptTested}
                </span>
              </div>
              <div className="flex-1 bg-emerald-50/70 p-2 rounded border border-emerald-200/60">
                <span className="text-[10px] font-bold text-emerald-800 block uppercase">
                  Solution Insight
                </span>
                <span className="text-emerald-950 font-medium">
                  {card.pyqAlert.solutionInsight}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Active Recall Check Toggle */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowQuickQuiz(!showQuickQuiz)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
            >
              <i
                className={`fa-solid fa-chevron-${
                  showQuickQuiz ? 'up' : 'down'
                } text-[10px] transition-transform`}
              ></i>
              <span>
                {showQuickQuiz
                  ? 'Hide Instant Concept Check'
                  : 'Test Yourself (30-Sec NCERT Rapid Check)'}
              </span>
            </button>

            {/* Bottom Mark as Mastered button */}
            <button
              onClick={() => onToggleMastered(card.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                isMastered
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-600 hover:text-white'
              }`}
            >
              <i
                className={`fa-solid ${
                  isMastered ? 'fa-circle-check' : 'fa-check'
                }`}
              ></i>
              <span>{isMastered ? 'Mastered in Syllabus' : 'Mark as Mastered'}</span>
            </button>
          </div>

          {/* Quick Concept Quiz Section */}
          {showQuickQuiz && (
            <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <p className="font-bold text-slate-800 mb-2.5">
                Q: {card.flashTest.question}
              </p>

              <div className="space-y-1.5">
                {card.flashTest.options.map((option, idx) => {
                  let optStyle =
                    'border-slate-200 bg-white text-slate-700 hover:bg-slate-100';
                  if (quizSubmitted) {
                    if (idx === card.flashTest.correctIndex) {
                      optStyle =
                        'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    } else if (idx === selectedOption) {
                      optStyle =
                        'border-rose-500 bg-rose-50 text-rose-900 line-through';
                    }
                  } else if (idx === selectedOption) {
                    optStyle =
                      'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-colors cursor-pointer ${optStyle}`}
                    >
                      <span>
                        <strong className="mr-1.5 text-slate-500">
                          {String.fromCharCode(65 + idx)}.
                        </strong>
                        {option}
                      </span>
                      {quizSubmitted && idx === card.flashTest.correctIndex && (
                        <i className="fa-solid fa-check text-emerald-600"></i>
                      )}
                      {quizSubmitted &&
                        idx === selectedOption &&
                        idx !== card.flashTest.correctIndex && (
                          <i className="fa-solid fa-xmark text-rose-600"></i>
                        )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                {!quizSubmitted ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 disabled:opacity-50 cursor-pointer"
                  >
                    Verify Answer
                  </button>
                ) : (
                  <button
                    onClick={handleResetQuiz}
                    className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg font-bold text-xs hover:bg-slate-300 cursor-pointer"
                  >
                    Try Again
                  </button>
                )}

                {quizSubmitted && (
                  <p
                    className={`text-xs font-semibold ${
                      selectedOption === card.flashTest.correctIndex
                        ? 'text-emerald-700'
                        : 'text-rose-700'
                    }`}
                  >
                    {selectedOption === card.flashTest.correctIndex
                      ? '✓ Correct! Concept mastered.'
                      : '✗ Incorrect. Review explanation below.'}
                  </p>
                )}
              </div>

              {quizSubmitted && (
                <div className="mt-2.5 p-2.5 bg-white rounded-lg border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
                  <strong className="font-bold text-slate-800">
                    NCERT Rationale:{' '}
                  </strong>
                  {card.flashTest.explanation}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
