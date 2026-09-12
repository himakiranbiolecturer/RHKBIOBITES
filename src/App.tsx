import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './lib/firebase';
import { CHAPTERS, MICRO_CARDS } from './data/biologyData';
import { MicroCard } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Sidebar } from './components/Sidebar';
import { MicroLearningCard } from './components/MicroLearningCard';
import { StudentDashboardModal } from './components/StudentDashboardModal';
import { FlashcardsModal } from './components/FlashcardsModal';
import { MockTestModal } from './components/MockTestModal';
import { AdminCMSModal } from './components/AdminCMSModal';

export default function App() {
  // Custom cards loaded dynamically in real-time from Firestore
  const [customCards, setCustomCards] = useState<MicroCard[]>([]);
  // Live announcements from Firestore
  const [liveAnnouncements, setLiveAnnouncements] = useState<any[]>([]);

  // Local storage persistence for mastered cards
  const [masteredCardIds, setMasteredCardIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('neetbio_mastered_cards');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
    // Default initial mastered cards for instant rich preview
    return new Set(['card-dna-structure', 'card-glycolysis']);
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [activeSubLessonId, setActiveSubLessonId] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'unmastered' | 'class11' | 'class12'>('all');

  // Modals state
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);
  const [isMockTestOpen, setIsMockTestOpen] = useState(false);
  const [isAdminCMSOpen, setIsAdminCMSOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toast notification for mastery
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Real-time Firestore sync for custom published cards
  useEffect(() => {
    try {
      const cardsCol = collection(db, 'microCards');
      const unsub = onSnapshot(
        cardsCol,
        (snapshot) => {
          const fetchedCards: MicroCard[] = [];
          snapshot.forEach((doc) => {
            fetchedCards.push({ id: doc.id, ...doc.data() } as MicroCard);
          });
          setCustomCards(fetchedCards);
        },
        (error) => {
          console.warn('Firestore real-time sync offline:', error.message);
        }
      );
      return () => unsub();
    } catch (err) {
      console.warn('Firestore initialization fallback:', err);
    }
  }, []);

  // Real-time Firestore sync for instructor announcements
  useEffect(() => {
    try {
      const annCol = collection(db, 'announcements');
      const unsub = onSnapshot(
        annCol,
        (snapshot) => {
          const list: any[] = [];
          snapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setLiveAnnouncements(list);
        },
        (error) => {
          console.warn('Announcements offline:', error.message);
        }
      );
      return () => unsub();
    } catch {
      // Fallback
    }
  }, []);

  // Combined cards: core built-in + live published from Firestore
  const allCards = useMemo(() => {
    return [...MICRO_CARDS, ...customCards];
  }, [customCards]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('neetbio_mastered_cards', JSON.stringify(Array.from(masteredCardIds)));
    } catch {
      // Ignore
    }
  }, [masteredCardIds]);

  // Mastered toggle handler
  const handleToggleMastered = (cardId: string) => {
    setMasteredCardIds((prev) => {
      const next = new Set(prev);
      const isCurrentlyMastered = next.has(cardId);
      if (isCurrentlyMastered) {
        next.delete(cardId);
        showToast('Block marked as pending review', 'info');
      } else {
        next.add(cardId);
        showToast('🎉 Block Mastered! Progress updated.', 'success');
      }
      return next;
    });
  };

  const showToast = (message: string, type: 'success' | 'info') => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleResetProgress = () => {
    setMasteredCardIds(new Set());
    showToast('All progress reset to 0.', 'info');
    setIsDashboardOpen(false);
  };

  const handleMasterAll = () => {
    const allIds = MICRO_CARDS.map((c) => c.id);
    setMasteredCardIds(new Set(allIds));
    showToast('🎉 All high-yield blocks marked as mastered!', 'success');
    setIsDashboardOpen(false);
  };

  const handleSelectSubLesson = (subId: string | null, chapterId: string) => {
    setActiveSubLessonId(subId);
    setActiveChapterId(chapterId);
    setIsMobileSidebarOpen(false);

    // Scroll to the respective block
    if (subId) {
      const matchingCard = MICRO_CARDS.find((c) => c.subLessonId === subId);
      if (matchingCard) {
        const el = document.getElementById(`block-${matchingCard.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const handleQuickTopic = (query: string) => {
    setSearchQuery(query);
    setActiveChapterId(null);
    setActiveSubLessonId(null);
    const contentEl = document.getElementById('course-content');
    if (contentEl) {
      contentEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Build card to chapter lookup map
  const cardChapterMap = useMemo(() => {
    const map: Record<string, string> = {};
    allCards.forEach((card) => {
      const chap = CHAPTERS.find((c) => c.id === card.chapterId);
      if (chap) map[card.id] = chap.title;
    });
    return map;
  }, [allCards]);

  // Filter cards based on search, chapter, and filterMode
  const filteredCards = useMemo(() => {
    return allCards.filter((card) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = card.title.toLowerCase().includes(q);
        const matchesSubtitle = card.subtitle.toLowerCase().includes(q);
        const matchesSummary = card.coreConcept.summary.toLowerCase().includes(q);
        const matchesChapter = (cardChapterMap[card.id] || '').toLowerCase().includes(q);
        const matchesMnemonic = (card.mnemonic || '').toLowerCase().includes(q);
        const matchesPYQ = card.pyqAlert.questionSnippet.toLowerCase().includes(q);
        if (
          !matchesTitle &&
          !matchesSubtitle &&
          !matchesSummary &&
          !matchesChapter &&
          !matchesMnemonic &&
          !matchesPYQ
        ) {
          return false;
        }
      }

      // Chapter filter
      if (activeChapterId && card.chapterId !== activeChapterId) {
        return false;
      }

      // Sub-lesson filter
      if (activeSubLessonId && card.subLessonId !== activeSubLessonId) {
        return false;
      }

      // Filter mode
      if (filterMode === 'unmastered' && masteredCardIds.has(card.id)) {
        return false;
      }
      if (filterMode === 'class11' && card.ncertClass !== 'Class XI') {
        return false;
      }
      if (filterMode === 'class12' && card.ncertClass !== 'Class XII') {
        return false;
      }

      return true;
    });
  }, [
    allCards,
    searchQuery,
    activeChapterId,
    activeSubLessonId,
    filterMode,
    masteredCardIds,
    cardChapterMap,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 text-xs font-semibold animate-bounce">
          <i className="fa-solid fa-sparkles text-emerald-400"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        masteredCount={masteredCardIds.size}
        totalCards={allCards.length}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenFlashcards={() => setIsFlashcardsOpen(true)}
        onOpenMockTest={() => setIsMockTestOpen(true)}
        onOpenAdminCMS={() => setIsAdminCMSOpen(true)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
      />

      {/* Live Notice Banner from Instructor CMS */}
      {liveAnnouncements.length > 0 && (
        <div className="bg-emerald-950 text-white border-b border-emerald-800 py-2.5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0">
                Notice
              </span>
              <span className="truncate font-medium text-emerald-100">
                {liveAnnouncements[0]?.content}
              </span>
            </div>
            <button
              onClick={() => setIsAdminCMSOpen(true)}
              className="text-[11px] text-emerald-300 hover:text-white underline shrink-0 font-semibold cursor-pointer"
            >
              CMS Portal
            </button>
          </div>
        </div>
      )}

      {/* Hero Section with Search and Global Top Progress Bar */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        masteredCount={masteredCardIds.size}
        totalCards={allCards.length}
        onQuickTopicClick={handleQuickTopic}
      />

      {/* Main Two-Column Layout (The Core Feature) */}
      <main
        id="course-content"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Sticky Syllabus Navigation Menu */}
          <Sidebar
            chapters={CHAPTERS}
            activeChapterId={activeChapterId}
            activeSubLessonId={activeSubLessonId}
            onSelectChapter={(chapId) => {
              setActiveChapterId(chapId);
              setActiveSubLessonId(null);
            }}
            onSelectSubLesson={handleSelectSubLesson}
            masteredCardIds={masteredCardIds}
            cardChapterMap={cardChapterMap}
            filterMode={filterMode}
            onFilterChange={setFilterMode}
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />

          {/* Right Column: High-Yield Micro-learning Cards */}
          <section className="flex-1 w-full min-w-0">
            {/* Active Filter & Context Banner */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Viewing:
                </span>
                <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {activeChapterId
                    ? CHAPTERS.find((c) => c.id === activeChapterId)?.title
                    : searchQuery
                    ? `Search: "${searchQuery}"`
                    : 'All High-Yield NEET Modules'}
                </span>
                {activeSubLessonId && (
                  <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                    Subtopic Filtered
                  </span>
                )}
                {filterMode !== 'all' && (
                  <span className="text-xs text-amber-800 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                    Filter: {filterMode.toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">
                  Showing <strong className="text-slate-900">{filteredCards.length}</strong> of{' '}
                  {MICRO_CARDS.length} blocks
                </span>

                {(activeChapterId || activeSubLessonId || searchQuery || filterMode !== 'all') && (
                  <button
                    onClick={() => {
                      setActiveChapterId(null);
                      setActiveSubLessonId(null);
                      setSearchQuery('');
                      setFilterMode('all');
                    }}
                    className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold underline underline-offset-2 ml-2 cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* List of Micro-learning Cards */}
            {filteredCards.length > 0 ? (
              <div className="space-y-6">
                {filteredCards.map((card) => (
                  <MicroLearningCard
                    key={card.id}
                    card={card}
                    isMastered={masteredCardIds.has(card.id)}
                    onToggleMastered={handleToggleMastered}
                    chapterTitle={cardChapterMap[card.id]}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl mb-4">
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  No matching NEET biology blocks found
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
                  Try clearing your search query or switching to &ldquo;All Chapters&rdquo; in the syllabus sidebar.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveChapterId(null);
                    setActiveSubLessonId(null);
                    setFilterMode('all');
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Academic High-Focus Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs">
              <i className="fa-solid fa-dna"></i>
            </span>
            <span className="font-bold text-slate-800 text-sm">NEETBio Hub LMS</span>
            <span className="text-slate-300">|</span>
            <span>Strictly NCERT-Aligned Syllabus (Classes XI &amp; XII)</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsFlashcardsOpen(true)}
              className="hover:text-emerald-700 cursor-pointer"
            >
              NCERT Flashcards
            </button>
            <button
              onClick={() => setIsMockTestOpen(true)}
              className="hover:text-emerald-700 cursor-pointer"
            >
              Rapid Mock Test
            </button>
            <button
              onClick={() => setIsDashboardOpen(true)}
              className="hover:text-emerald-700 cursor-pointer"
            >
              Student Dashboard
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <StudentDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        masteredCount={masteredCardIds.size}
        totalCards={allCards.length}
        chapters={CHAPTERS}
        masteredCardIds={masteredCardIds}
        onResetProgress={handleResetProgress}
        onMasterAll={handleMasterAll}
      />

      <FlashcardsModal
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
      />

      <MockTestModal
        isOpen={isMockTestOpen}
        onClose={() => setIsMockTestOpen(false)}
      />

      <AdminCMSModal
        isOpen={isAdminCMSOpen}
        onClose={() => setIsAdminCMSOpen(false)}
        customCards={customCards}
      />
    </div>
  );
}
