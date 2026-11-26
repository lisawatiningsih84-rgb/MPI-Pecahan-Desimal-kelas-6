/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { SlideActivity } from './components/SlideActivity';
import { SlideIntro, SlideObjectives } from './components/SlideIntroAndObjectives';
import { SlideMaterial } from './components/SlideMaterial';
import { SlideQuiz } from './components/SlideQuiz';
import { SlideReflection, type ReflectionMood } from './components/SlideReflection';
import {
  createInitialQuizState,
  goToNextQuestion,
  submitQuizAnswer,
  type QuizState,
} from './utils/decimalQuiz';

type SlideNumber = 1 | 2 | 3 | 4 | 5 | 6;

const STORAGE_KEY = 'modul_desimal_kelas6_v1';

const NAV_ITEMS: Array<{ slide: SlideNumber; label: string }> = [
  { slide: 2, label: 'Tujuan' },
  { slide: 3, label: 'Materi' },
  { slide: 4, label: 'Aktivitas' },
  { slide: 5, label: 'Kuis' },
  { slide: 6, label: 'Refleksi' },
];

interface PersistedProgress {
  activeSlide: SlideNumber;
  studentName: string;
  wheelSlices: number;
  basketCounts: Record<string, number>;
  quizState: QuizState;
  reflectionMood: ReflectionMood | null;
  reflectionNote: string;
  reflectionSaved: boolean;
}

const DEFAULT_BASKET: Record<string, number> = {
  apel: 0,
  anggur: 0,
  jeruk: 0,
  semangka: 0,
};

function getInitialProgress(): PersistedProgress {
  let initialSlide: SlideNumber = 1;
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const slideParam = Number(params.get('slide'));
    if (slideParam >= 1 && slideParam <= 6) {
      initialSlide = slideParam as SlideNumber;
    } else if (params.get('autostart') === '1') {
      initialSlide = 2;
    }

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<PersistedProgress>;
        return {
          activeSlide:
            params.has('slide') || params.has('autostart')
              ? initialSlide
              : parsed.activeSlide ?? 1,
          studentName: parsed.studentName ?? '',
          wheelSlices: typeof parsed.wheelSlices === 'number' ? parsed.wheelSlices : 3,
          basketCounts: parsed.basketCounts ?? { ...DEFAULT_BASKET },
          quizState: parsed.quizState ?? createInitialQuizState(),
          reflectionMood: parsed.reflectionMood ?? null,
          reflectionNote: parsed.reflectionNote ?? '',
          reflectionSaved: Boolean(parsed.reflectionSaved),
        };
      }
    } catch {
      // Ignore invalid localStorage payload
    }
  }

  return {
    activeSlide: initialSlide,
    studentName: '',
    wheelSlices: 3,
    basketCounts: { ...DEFAULT_BASKET },
    quizState: createInitialQuizState(),
    reflectionMood: null,
    reflectionNote: '',
    reflectionSaved: false,
  };
}

export default function App() {
  const [initial] = useState<PersistedProgress>(getInitialProgress);
  const [activeSlide, setActiveSlide] = useState<SlideNumber>(initial.activeSlide);
  const [studentName, setStudentName] = useState<string>(initial.studentName);
  const [wheelSlices, setWheelSlices] = useState<number>(initial.wheelSlices);
  const [basketCounts, setBasketCounts] = useState<Record<string, number>>(
    initial.basketCounts
  );
  const [quizState, setQuizState] = useState<QuizState>(initial.quizState);
  const [reflectionMood, setReflectionMood] = useState<ReflectionMood | null>(
    initial.reflectionMood
  );
  const [reflectionNote, setReflectionNote] = useState<string>(initial.reflectionNote);
  const [reflectionSaved, setReflectionSaved] = useState<boolean>(
    initial.reflectionSaved
  );

  useEffect(() => {
    try {
      const payload: PersistedProgress = {
        activeSlide,
        studentName,
        wheelSlices,
        basketCounts,
        quizState,
        reflectionMood,
        reflectionNote,
        reflectionSaved,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors
    }
  }, [
    activeSlide,
    studentName,
    wheelSlices,
    basketCounts,
    quizState,
    reflectionMood,
    reflectionNote,
    reflectionSaved,
  ]);

  const handleSubmitQuizAnswer = (questionIndex: number, answer: string) => {
    setQuizState((prev) => submitQuizAnswer(prev, questionIndex, answer).nextState);
  };

  const handleNextQuestion = () => {
    setQuizState((prev) => goToNextQuestion(prev));
  };

  const handleResetAll = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    setActiveSlide(1);
    setStudentName('');
    setWheelSlices(3);
    setBasketCounts({ ...DEFAULT_BASKET });
    setQuizState(createInitialQuizState());
    setReflectionMood(null);
    setReflectionNote('');
    setReflectionSaved(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateSlide = (slide: SlideNumber) => {
    setActiveSlide(slide);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF] text-indigo-950">
      {/* Clean 3-Zone Top Bar Contract */}
      <header className="bg-white border-b border-violet-200">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text wordmark */}
          <button
            type="button"
            onClick={() => navigateSlide(1)}
            className="font-display text-xl font-bold tracking-tight text-violet-800 hover:text-violet-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            DesimalBuah
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label="Navigasi slide modul ajar"
            className="hidden md:flex items-center gap-6 text-sm font-semibold"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSlide === item.slide;
              return (
                <button
                  key={item.slide}
                  type="button"
                  onClick={() => navigateSlide(item.slide)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-violet-700 text-violet-800'
                      : 'border-transparent text-slate-600 hover:text-violet-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            {activeSlide === 1 ? (
              <button
                type="button"
                onClick={() => navigateSlide(2)}
                className="px-4 py-2 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Mulai Belajar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetAll}
                className="px-4 py-2 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-900 text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Ulang Awal
              </button>
            )}
          </div>
        </div>

        {/* Mobile slide navigation strip */}
        <nav
          aria-label="Navigasi slide mobile"
          className="md:hidden border-t border-violet-100 px-3 py-2 flex items-center justify-between gap-1 overflow-x-auto"
        >
          <button
            type="button"
            onClick={() => navigateSlide(1)}
            className={`px-2 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
              activeSlide === 1
                ? 'bg-violet-700 text-white'
                : 'text-slate-700 hover:bg-violet-50'
            }`}
          >
            Pembuka
          </button>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSlide === item.slide;
            return (
              <button
                key={item.slide}
                type="button"
                onClick={() => navigateSlide(item.slide)}
                className={`px-2 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-violet-700 text-white'
                    : 'text-slate-700 hover:bg-violet-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Stage */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-8 md:py-10">
        {activeSlide === 1 && (
          <SlideIntro
            studentName={studentName}
            onChangeName={setStudentName}
            onStart={() => navigateSlide(2)}
          />
        )}

        {activeSlide === 2 && (
          <SlideObjectives
            studentName={studentName}
            onBack={() => navigateSlide(1)}
            onNext={() => navigateSlide(3)}
          />
        )}

        {activeSlide === 3 && (
          <SlideMaterial
            onBack={() => navigateSlide(2)}
            onNext={() => navigateSlide(4)}
          />
        )}

        {activeSlide === 4 && (
          <SlideActivity
            wheelSlices={wheelSlices}
            onChangeWheelSlices={setWheelSlices}
            basketCounts={basketCounts}
            onChangeBasketCounts={setBasketCounts}
            onBack={() => navigateSlide(3)}
            onNext={() => navigateSlide(5)}
          />
        )}

        {activeSlide === 5 && (
          <SlideQuiz
            quizState={quizState}
            onSubmitAnswer={handleSubmitQuizAnswer}
            onNextQuestion={handleNextQuestion}
            onBackToActivity={() => navigateSlide(4)}
            onFinishToReflection={() => navigateSlide(6)}
          />
        )}

        {activeSlide === 6 && (
          <SlideReflection
            studentName={studentName}
            quizState={quizState}
            reflectionMood={reflectionMood}
            reflectionNote={reflectionNote}
            reflectionSaved={reflectionSaved}
            onChangeMood={setReflectionMood}
            onChangeNote={setReflectionNote}
            onSaveReflection={() => setReflectionSaved(true)}
            onRetryModule={handleResetAll}
          />
        )}
      </main>

      <footer className="border-t border-violet-200/80 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <span>Modul Ajar Matematika Kelas 6 SD · Topik Pecahan Desimal</span>
          <span>Slide {activeSlide} dari 6</span>
        </div>
      </footer>
    </div>
  );
}
