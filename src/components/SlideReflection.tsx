import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Heart,
  MessageSquareHeart,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  QUIZ_QUESTIONS,
  calculateQuizSummary,
  type QuizState,
} from '../utils/decimalQuiz';
import { ResilientImage } from './FruitVisuals';

export type ReflectionMood = 'sangat_paham' | 'cukup_paham' | 'perlu_latihan';

interface SlideReflectionProps {
  studentName: string;
  quizState: QuizState;
  reflectionMood: ReflectionMood | null;
  reflectionNote: string;
  reflectionSaved: boolean;
  onChangeMood: (mood: ReflectionMood) => void;
  onChangeNote: (note: string) => void;
  onSaveReflection: () => void;
  onRetryModule: () => void;
}

const MOOD_OPTIONS: Array<{
  id: ReflectionMood;
  label: string;
  desc: string;
}> = [
  {
    id: 'sangat_paham',
    label: 'Sangat Paham',
    desc: 'Aku siap mengerjakan soal desimal lainnya!',
  },
  {
    id: 'cukup_paham',
    label: 'Cukup Paham',
    desc: 'Aku sudah mengerti dasarnya, tinggal berlatih lagi.',
  },
  {
    id: 'perlu_latihan',
    label: 'Masih Perlu Latihan',
    desc: 'Aku mau mengulang materi supaya makin lancar.',
  },
];

export const SlideReflection: React.FC<SlideReflectionProps> = ({
  studentName,
  quizState,
  reflectionMood,
  reflectionNote,
  reflectionSaved,
  onChangeMood,
  onChangeNote,
  onSaveReflection,
  onRetryModule,
}) => {
  const summary = calculateQuizSummary(quizState);
  const [validationMsg, setValidationMsg] = useState('');

  const displayName = studentName.trim() || 'Juara Matematika';

  let motivationTitle = 'Terus Semangat Berlatih!';
  let motivationBody =
    'Kamu sudah menyelesaikan seluruh 10 soal sampai tuntas! Yuk ulangi lagi modul ini agar makin banyak soal yang terjawab benar di percobaan pertama.';

  if (summary.score >= 80) {
    motivationTitle = `Hebat Sekali, ${displayName}!`;
    motivationBody =
      'Pemahamanmu tentang pecahan desimal sangat mantap! Kamu berhasil menjawab hampir semua soal dengan tepat pada percobaan pertama.';
  } else if (summary.score >= 50) {
    motivationTitle = `Bagus Sekali, ${displayName}!`;
    motivationBody =
      'Kamu sudah memahami dasar pecahan desimal dengan baik dan pantang menyerah menyelesaikan semua soal hingga tuntas.';
  }

  const handleReflectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionMood) {
      setValidationMsg('Pilih perasaan belajarmu terlebih dahulu ya!');
      return;
    }
    setValidationMsg('');
    onSaveReflection();
  };

  return (
    <section
      aria-labelledby="reflection-heading"
      className="space-y-6 animate-slide-enter"
    >
      {/* Feedback & Final Score Banner */}
      <div className="bg-white border border-violet-200 rounded-3xl p-6 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 flex justify-center">
          <div className="w-60 h-60 md:w-64 md:h-64 rounded-3xl overflow-hidden border border-violet-200 bg-violet-50">
            <ResilientImage
              src="/src/assets/images/trophy_fruit_celebration_1795663091163.jpg"
              alt="Ilustrasi piala bintang emas bersama anggur ungu, stroberi, dan jeruk merayakan hasil belajar"
              fallbackFruit="anggur"
              fallbackTitle="Selamat Menyelesaikan Modul!"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center gap-2 text-sm font-medium text-violet-700">
            <Award className="w-4 h-4" aria-hidden="true" />
            <span>Slide 6 dari 6 · Umpan Balik & Refleksi</span>
          </div>

          <h2 id="reflection-heading" className="text-3xl md:text-4xl font-bold text-indigo-950">
            {motivationTitle}
          </h2>

          <p className="text-slate-700 leading-relaxed max-w-2xl">{motivationBody}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-violet-700 text-white">
              <div className="text-xs font-semibold text-violet-200">Skor Akhir</div>
              <div
                data-testid="final-score-value"
                className="text-3xl font-mono font-bold mt-1 tabular-nums"
              >
                {summary.score} / {summary.maxScore}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-violet-50 border border-violet-200">
              <div className="text-xs font-semibold text-violet-700">
                Benar Percobaan Pertama
              </div>
              <div className="text-3xl font-mono font-bold text-indigo-950 mt-1 tabular-nums">
                {summary.firstTryCorrectCount} / 10
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-violet-50 border border-violet-200">
              <div className="text-xs font-semibold text-violet-700">Soal Diselesaikan</div>
              <div className="text-3xl font-mono font-bold text-indigo-950 mt-1 tabular-nums">
                {summary.completedCount} / 10
              </div>
            </div>
          </div>

          {summary.completedCount < 10 && (
            <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
              Catatan: Kamu baru menyelesaikan {summary.completedCount} dari 10 soal di kuis. Selesaikan semua soal di tab Kuis untuk hasil lengkap!
            </p>
          )}
        </div>
      </div>

      {/* Question Breakdown + Reflection Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 10-question summary */}
        <div className="lg:col-span-6 bg-white border border-violet-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-indigo-950">
            Ringkasan Jawaban per Soal
          </h3>
          <p className="text-xs text-slate-600">
            Skor dihitung hanya dari soal yang dijawab benar pada percobaan pertama (+10 poin per soal).
          </p>
          <div className="divide-y divide-violet-100">
            {QUIZ_QUESTIONS.map((q) => {
              const p = quizState.questions[q.id];
              let statusLabel = 'Belum dikerjakan';
              let statusClass = 'text-slate-500';
              if (p?.isLocked) {
                if (p.firstTryCorrect) {
                  statusLabel = 'Percobaan 1 Benar (+10)';
                  statusClass = 'text-emerald-700 font-semibold';
                } else {
                  statusLabel = `Tuntas (${p.attempts}× coba, +0)`;
                  statusClass = 'text-violet-700 font-semibold';
                }
              }
              return (
                <div
                  key={q.id}
                  className="py-2.5 flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-violet-100 text-violet-900 font-mono font-bold text-xs flex items-center justify-center tabular-nums">
                      {q.id}
                    </span>
                    <span className="font-medium text-indigo-950">{q.topic}</span>
                  </div>
                  <span className={`text-xs tabular-nums ${statusClass}`}>{statusLabel}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Student Reflection */}
        <div className="lg:col-span-6 bg-white border border-violet-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5">
            <MessageSquareHeart className="w-5 h-5 text-violet-700" aria-hidden="true" />
            <h3 className="text-lg font-bold text-indigo-950">Refleksi Diri Murid</h3>
          </div>

          <form onSubmit={handleReflectionSubmit} className="space-y-4">
            <fieldset className="space-y-2.5">
              <legend className="text-sm font-semibold text-indigo-950">
                Bagaimana pemahamanmu setelah belajar pecahan desimal hari ini?
              </legend>
              <div className="space-y-2">
                {MOOD_OPTIONS.map((option) => {
                  const selected = reflectionMood === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        onChangeMood(option.id);
                        setValidationMsg('');
                      }}
                      aria-pressed={selected}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                        selected
                          ? 'bg-violet-100 border-violet-600 text-indigo-950'
                          : 'bg-violet-50/40 border-violet-200 text-slate-800 hover:bg-violet-50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm">{option.label}</div>
                        <div className="text-xs text-slate-600">{option.desc}</div>
                      </div>
                      {selected && (
                        <CheckCircle2 className="w-5 h-5 text-violet-700 shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="space-y-1.5">
              <label
                htmlFor="reflection-note-input"
                className="block text-sm font-semibold text-indigo-950"
              >
                Ceritakan 1 hal yang paling kamu ingat dari modul ini:
              </label>
              <textarea
                id="reflection-note-input"
                rows={3}
                value={reflectionNote}
                onChange={(e) => onChangeNote(e.target.value)}
                placeholder="Contoh: Aku jadi tahu kalau 0,7 lebih besar daripada 0,65 karena 0,7 sama dengan 0,70!"
                className="w-full px-4 py-3 rounded-2xl border border-violet-300 bg-violet-50/40 text-sm text-indigo-950 placeholder:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:bg-white transition-colors"
              />
            </div>

            {validationMsg && (
              <p className="text-xs font-semibold text-amber-800">{validationMsg}</p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Heart className="w-4 h-4" aria-hidden="true" />
                <span>Simpan Refleksi</span>
              </button>

              <button
                type="button"
                onClick={onRetryModule}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-violet-700 bg-white hover:bg-violet-50 text-violet-800 font-bold text-sm md:text-base transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Coba Lagi</span>
              </button>
            </div>
          </form>

          {reflectionSaved && (
            <div
              role="status"
              className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-sm text-emerald-900 flex items-start gap-2.5"
            >
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong>Terima kasih atas refleksimu, {displayName}!</strong> Semangat terus belajar Matematika di kelas 6!
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
