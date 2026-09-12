import React, { useState } from 'react';

interface NavbarProps {
  masteredCount: number;
  totalCards: number;
  onOpenDashboard: () => void;
  onOpenFlashcards: () => void;
  onOpenMockTest: () => void;
  onOpenAdminCMS: () => void;
  onToggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  masteredCount,
  totalCards,
  onOpenDashboard,
  onOpenFlashcards,
  onOpenMockTest,
  onOpenAdminCMS,
  onToggleMobileSidebar,
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const percent = Math.round((masteredCount / Math.max(totalCards, 1)) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Syllabus button */}
          <div className="flex items-center gap-3">
            {/* Mobile Syllabus Drawer Trigger */}
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 cursor-pointer"
              title="Open Syllabus Navigation"
            >
              <i className="fa-solid fa-bars-staggered text-lg"></i>
            </button>

            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 text-slate-900 group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <i className="fa-solid fa-dna text-lg"></i>
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-1">
                  NEET<span className="text-emerald-600">Bio</span>
                  <span className="text-xs uppercase bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded tracking-normal">
                    Hub
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium block -mt-1 tracking-wider uppercase">
                  NCERT Master LMS
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="#course-content"
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fa-solid fa-book-open text-emerald-600 text-xs"></i>
              <span>Courses</span>
            </a>

            <button
              onClick={onOpenFlashcards}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-layer-group text-emerald-600 text-xs"></i>
              <span>Flashcards</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                Active
              </span>
            </button>

            <button
              onClick={onOpenMockTest}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-vial-circle-check text-emerald-600 text-xs"></i>
              <span>Mock Tests</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">
                PYQ Drill
              </span>
            </button>
          </nav>

          {/* Right Action / Progress & Student Dashboard */}
          <div className="flex items-center gap-3">
            {/* Quick mini-progress pill */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-100/90 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                {masteredCount}/{totalCards} Mastered
              </span>
              <span className="text-emerald-700 font-bold font-mono">
                ({percent}%)
              </span>
            </div>

            {/* Instructor / CMS Portal Button */}
            <button
              onClick={onOpenAdminCMS}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 text-xs sm:text-sm font-bold rounded-xl shadow-xs border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Instructor CMS Portal - Update content in real time"
            >
              <i className="fa-solid fa-screwdriver-wrench text-xs text-emerald-400"></i>
              <span className="hidden xl:inline">Teacher CMS</span>
              <span className="xl:hidden">CMS</span>
            </button>

            {/* Prominent Student Dashboard Button */}
            <button
              onClick={onOpenDashboard}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-user-graduate"></i>
              <span className="hidden sm:inline">Student Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
            </button>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-emerald-700 rounded-lg"
            >
              <i
                className={`fa-solid ${
                  isMobileNavOpen ? 'fa-xmark' : 'fa-ellipsis-vertical'
                } text-lg`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileNavOpen && (
          <div className="md:hidden py-3 border-t border-slate-200/80 space-y-1">
            <a
              href="#course-content"
              onClick={() => setIsMobileNavOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50"
            >
              <i className="fa-solid fa-book-open text-emerald-600 mr-2"></i> Courses
            </a>
            <button
              onClick={() => {
                setIsMobileNavOpen(false);
                onOpenFlashcards();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 flex items-center justify-between"
            >
              <span>
                <i className="fa-solid fa-layer-group text-emerald-600 mr-2"></i>{' '}
                Flashcards
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Active Recall
              </span>
            </button>
            <button
              onClick={() => {
                setIsMobileNavOpen(false);
                onOpenMockTest();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 flex items-center justify-between"
            >
              <span>
                <i className="fa-solid fa-vial-circle-check text-emerald-600 mr-2"></i>{' '}
                Rapid Mock Test
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                5 Questions
              </span>
            </button>
            <button
              onClick={() => {
                setIsMobileNavOpen(false);
                onOpenAdminCMS();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-screwdriver-wrench text-emerald-700"></i> Teacher Cloud CMS
              </span>
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">
                Live Edit
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
