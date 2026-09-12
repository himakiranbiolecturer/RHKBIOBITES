import React, { useState } from 'react';
import { FLASHCARDS_DATA } from '../data/biologyData';

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  const currentCard = FLASHCARDS_DATA[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % FLASHCARDS_DATA.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + FLASHCARDS_DATA.length) % FLASHCARDS_DATA.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-sm">
              <i className="fa-solid fa-layer-group"></i>
            </span>
            <div>
              <h3 className="text-sm font-bold">NCERT Active Recall Flashcards</h3>
              <span className="text-[11px] text-slate-400">
                Card {currentIndex + 1} of {FLASHCARDS_DATA.length}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Flashcard Area */}
        <div className="p-6">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[220px] p-6 rounded-2xl border-2 border-dashed border-emerald-300 bg-gradient-to-br from-emerald-50/50 to-slate-50 flex flex-col justify-between cursor-pointer hover:border-emerald-500 transition-all shadow-xs select-none"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                {currentCard.badge}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <i className="fa-solid fa-rotate text-emerald-600"></i> Click to flip
              </span>
            </div>

            <div className="my-4 text-center">
              {!isFlipped ? (
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Question
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-900">
                    {currentCard.question}
                  </p>
                </div>
              ) : (
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                    NCERT Answer / Key Insight
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-emerald-950 leading-relaxed">
                    {currentCard.answer}
                  </p>
                </div>
              )}
            </div>

            <div className="text-center text-xs font-semibold text-slate-400">
              {isFlipped ? 'Tap card to show question' : 'Tap card to reveal answer'}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left"></i> Previous
            </button>

            <span className="text-xs font-semibold text-slate-500 font-mono">
              {currentIndex + 1} / {FLASHCARDS_DATA.length}
            </span>

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              Next <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
