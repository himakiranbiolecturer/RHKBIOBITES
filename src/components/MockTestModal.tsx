import React, { useState } from 'react';
import { RAPID_MOCK_TEST } from '../data/biologyData';

interface MockTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MockTestModal: React.FC<MockTestModalProps> = ({ isOpen, onClose }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = RAPID_MOCK_TEST[currentQIndex];

  const handleSelectOption = (optIndex: number) => {
    if (!isFinished) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQ.id]: optIndex,
      }));
    }
  };

  const calculateScore = () => {
    let score = 0;
    RAPID_MOCK_TEST.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 4; // NEET scoring +4
      } else if (selectedAnswers[q.id] !== undefined) {
        score -= 1; // NEET negative marking -1
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <i className="fa-solid fa-vial-circle-check"></i>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">NEET Rapid Mock Test</h3>
              <p className="text-xs text-emerald-300">
                Pattern: +4 for correct, -1 for incorrect
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Test Body */}
        <div className="p-6">
          {!isFinished ? (
            <div>
              {/* Question progress */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-3">
                <span>
                  Question {currentQIndex + 1} of {RAPID_MOCK_TEST.length}
                </span>
                <span className="text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {currentQ.ncertRef}
                </span>
              </div>

              {/* Question Text */}
              <p className="text-base font-bold text-slate-900 mb-4 leading-snug">
                {currentQ.question}
              </p>

              {/* Options */}
              <div className="space-y-2 mb-6">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-500 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <button
                  onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>

                {currentQIndex < RAPID_MOCK_TEST.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex((prev) => prev + 1)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={() => setIsFinished(true)}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs"
                  >
                    Submit Test &amp; View Analysis
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6">
              <div className="text-center bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-bold block mb-1">
                  Your NEET Score
                </span>
                <div className="text-4xl font-black text-emerald-950 font-mono">
                  {calculateScore()}{' '}
                  <span className="text-lg font-normal text-slate-600">
                    / {RAPID_MOCK_TEST.length * 4}
                  </span>
                </div>
                <p className="text-xs text-emerald-800 mt-2 font-medium">
                  {calculateScore() >= 16
                    ? '🌟 Exceptional command! Ready for full 360 target.'
                    : 'Good attempt. Review the rationale and NCERT lines below.'}
                </p>
              </div>

              {/* Detailed Question Review */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs">
                {RAPID_MOCK_TEST.map((q, idx) => {
                  const userAns = selectedAnswers[q.id];
                  const isCorrect = userAns === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-3 rounded-xl border ${
                        isCorrect
                          ? 'border-emerald-200 bg-emerald-50/40'
                          : 'border-rose-200 bg-rose-50/40'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span className="text-slate-800">Q{idx + 1}: {q.question}</span>
                        <span
                          className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? '+4 Marks' : userAns !== undefined ? '-1 Mark' : '0 (Skipped)'}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1">
                        <strong className="text-slate-800">Correct Answer: </strong>
                        {q.options[q.correctIndex]}
                      </p>
                      <p className="text-slate-500 mt-0.5 italic">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-slate-300 text-xs font-bold text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  Retake Test
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg hover:bg-emerald-800 cursor-pointer"
                >
                  Done Reviewing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
