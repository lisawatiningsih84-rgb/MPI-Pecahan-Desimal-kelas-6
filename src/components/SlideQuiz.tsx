import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Lock,
  Send,
} from 'lucide-react';
import {
  QUIZ_QUESTIONS,
  calculateQuizSummary,
  type QuizState,
} from '../utils/decimalQuiz';
import { FruitIcon, ResilientImage } from './FruitVisuals';

interface SlideQuizProps {
  quizState: QuizState;
  onSubmitAnswer: (questionIndex: number, answer: string) => void;
  onNextQuestion: () => void;
  onBackToActivity: () => void;
  onFinishToReflection: () => void;
}

export const SlideQuiz: React.FC<SlideQuizProps> = ({
  quizState,
  onSubmitAnswer,
  onNextQuestion,
  onBackToActivity,
  onFinishToReflection,
}) => {
  const currentIndex = quizState.currentIndex;
  const question = QUIZ_QUESTIONS[currentIndex];
  const progress = quizState.questions[question.id];
  const summary = calculateQuizSummary(quizState);

  const [inputValue, setInputValue] = useState(progress.lastInput);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(progress.lastInput);
    if (!progress.isLocked) {
      inputRef.current?.focus();
    }
  }, [question.id, progress.isLocked, progress.lastInput]);

  const progressPercent = Math.round(
    (summary.completedCount / summary.totalQuestions) * 100
  );
  const isLastQuestion = currentIndex === QUIZ_QUESTIONS.length - 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (progress.isLocked) return;
    onSubmitAnswer(currentIndex, inputValue);
  };

  return (
    <section
      aria-labelledby="quiz-heading"
      className="space-y-6 animate-slide-enter"
    >
      {/* Top Progress Header */}
      <div className="bg-white border border-violet-200 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-violet-700">
              Slide 5 dari 6 · Kuis Evaluasi Isian
            </div>
            <h2 id="quiz-heading" className="text-xl md:text-2xl font-bold text-indigo-950">
              Soal <span className="tabular-nums">{currentIndex + 1}</span> dari{' '}
              <span className="tabular-nums">{QUIZ_QUESTIONS.length}</span>
            </h2>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-slate-600">Kemajuan: </span>
              <strong className="font-mono text-violet-800 tabular-nums">
                {summary.completedCount}/10 ({progressPercent}%)
              </strong>
            </div>
            <div>
              <span className="text-slate-600">Skor Sementara: </span>
              <strong
                data-testid="quiz-live-score"
                className="font-mono text-indigo-950 tabular-nums"
              >
                {summary.score}
              </strong>
            </div>
          </div>
        </div>

        {/* 10-step progress bar */}
        <div
          className="grid grid-cols-10 gap-1.5"
          role="progressbar"
          aria-valuenow={summary.completedCount}
          aria-valuemin={0}
          aria-valuemax={10}
          aria-label="Kemajuan belajar kuis pecahan desimal"
        >
          {QUIZ_QUESTIONS.map((q, idx) => {
            const qProg = quizState.questions[q.id];
            const isCurrent = idx === currentIndex;
            let barColor = 'bg-violet-100 border-violet-200';
            if (qProg?.isLocked) {
              barColor = qProg.firstTryCorrect
                ? 'bg-emerald-500 border-emerald-600'
                : 'bg-violet-500 border-violet-600';
            } else if (isCurrent) {
              barColor = 'bg-amber-300 border-amber-500';
            }
            return (
              <div
                key={q.id}
                title={`Soal ${idx + 1}: ${qProg?.isLocked ? 'Selesai' : isCurrent ? 'Sedang dikerjakan' : 'Belum dikerjakan'}`}
                className={`h-3 rounded-full border transition-colors ${barColor}`}
              />
            );
          })}
        </div>
      </div>

      {/* Single Question Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 bg-white border border-violet-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4 border-b border-violet-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0">
                  <FruitIcon fruit={question.fruit} className="w-9 h-9" />
                </div>
                <div>
                  <div className="text-xs font-mono font-semibold text-violet-700">
                    Soal Nomor {question.id} · {question.topic}
                  </div>
                  <div className="text-xs text-slate-600">
                    {progress.isLocked ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                        <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                        Soal Terkunci (Sudah Benar)
                      </span>
                    ) : (
                      <span>
                        Percobaan ke-{progress.attempts + 1} · Nilai penuh 10 poin jika benar di percobaan ke-1
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg md:text-xl font-semibold text-indigo-950 leading-relaxed">
              {question.prompt}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor={`quiz-answer-q${question.id}`}
                  className="block text-sm font-semibold text-violet-900"
                >
                  Jawabanmu (Isian Singkat):
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    ref={inputRef}
                    id={`quiz-answer-q${question.id}`}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={progress.isLocked}
                    placeholder={question.placeholder}
                    autoComplete="off"
                    className="flex-1 px-4 py-3.5 rounded-2xl border-2 border-violet-300 bg-violet-50/40 text-lg font-mono font-semibold text-indigo-950 placeholder:text-violet-400 placeholder:font-sans placeholder:font-normal placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:bg-white disabled:bg-slate-100 disabled:text-slate-600 disabled:border-slate-200 disabled:cursor-not-allowed transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={progress.isLocked}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-violet-700 hover:bg-violet-800 text-white font-semibold text-base transition-colors cursor-pointer disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
                  >
                    {progress.isLocked ? (
                      <>
                        <Lock className="w-4 h-4" aria-hidden="true" />
                        <span>Terkunci</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Periksa Jawaban</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Feedback Panel */}
            {progress.feedbackType === 'correct' && (
              <div
                role="status"
                aria-live="polite"
                className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-start gap-3.5 animate-feedback-pop"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <div className="text-xl font-display font-bold text-emerald-800">
                    {progress.feedbackMessage}
                  </div>
                  <p className="text-sm text-emerald-900">
                    {progress.firstTryCorrect
                      ? 'Luar biasa! Kamu menjawab benar pada percobaan pertama (+10 poin). Soal ini telah dikunci.'
                      : 'Bagus, kamu tidak menyerah sampai menemukan jawaban yang tepat! Soal ini telah dikunci dan sekarang kamu bisa melanjutkan.'}
                  </p>
                </div>
              </div>
            )}

            {progress.feedbackType === 'wrong' && (
              <div
                role="status"
                aria-live="polite"
                className="p-5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3.5 animate-feedback-pop"
              >
                <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <div className="text-base font-bold text-amber-950">
                    Belum tepat, yuk coba pikirkan lagi!
                  </div>
                  <p className="text-sm text-amber-900 leading-relaxed">
                    <strong>Petunjuk:</strong> {progress.feedbackMessage}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-violet-100">
            <button
              type="button"
              onClick={onBackToActivity}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-violet-300 bg-white hover:bg-violet-50 text-violet-900 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Kembali ke Aktivitas</span>
            </button>

            {isLastQuestion && progress.isLocked ? (
              <button
                type="button"
                onClick={onFinishToReflection}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm md:text-base transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Lihat Umpan Balik & Refleksi</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onNextQuestion}
                disabled={!progress.isLocked}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-semibold text-sm md:text-base transition-colors cursor-pointer disabled:bg-violet-200 disabled:text-violet-500 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
              >
                <span>Soal Berikutnya</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Side Visual & Tip Card */}
        <aside className="lg:col-span-4 bg-white border border-violet-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-violet-100 aspect-[4/3] bg-violet-50">
              <ResilientImage
                src="/src/assets/images/fruit_basket_quiz_1795663089290.jpg"
                alt="Keranjang piknik ungu berisi apel, anggur, jeruk, dan pisang"
                fallbackFruit="apel"
                fallbackTitle="Kuis Buah Desimal"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-indigo-950">
                Aturan Main Kuis
              </h3>
              <ul className="text-sm text-slate-700 space-y-2 leading-relaxed">
                <li>1. Tulis jawabanmu menggunakan tanda koma (misal: <span className="font-mono font-semibold text-violet-800">0,5</span>).</li>
                <li>2. Jika benar di percobaan pertama, kamu mendapat 10 poin penuh.</li>
                <li>3. Jika masih salah, baca petunjuk dan coba lagi sampai benar agar bisa lanjut!</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-violet-50 border border-violet-200 text-xs text-violet-900">
            Soal selesai: <strong className="font-mono tabular-nums">{summary.completedCount}</strong> dari 10 · Benar percobaan pertama:{' '}
            <strong className="font-mono tabular-nums">{summary.firstTryCorrectCount}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
};
