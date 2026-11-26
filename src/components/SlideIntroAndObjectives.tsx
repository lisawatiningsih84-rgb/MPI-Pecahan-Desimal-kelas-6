import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Sparkles, Target } from 'lucide-react';
import { FruitIcon, ResilientImage } from './FruitVisuals';
import type { FruitTheme } from '../utils/decimalQuiz';

interface SlideIntroProps {
  studentName: string;
  onChangeName: (name: string) => void;
  onStart: () => void;
}

const MODULE_OUTLINE = [
  { step: '01', title: 'Pembuka & Identitas' },
  { step: '02', title: 'Tujuan Belajar' },
  { step: '03', title: 'Materi Inti Singkat' },
  { step: '04', title: 'Aktivitas Buah' },
  { step: '05', title: 'Kuis 10 Soal Isian' },
  { step: '06', title: 'Hasil & Refleksi' },
];

export const SlideIntro: React.FC<SlideIntroProps> = ({
  studentName,
  onChangeName,
  onStart,
}) => {
  return (
    <section
      aria-labelledby="intro-heading"
      className="space-y-8 animate-slide-enter"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-violet-200 rounded-3xl p-6 md:p-10 shadow-sm">
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-violet-700">
              <span className="whitespace-nowrap">Matematika</span>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">Kelas 6 SD</span>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">Modul Interaktif</span>
            </div>

            <h1
              id="intro-heading"
              className="text-3xl md:text-5xl font-bold text-indigo-950 leading-tight text-balance"
            >
              Petualangan Pecahan Desimal Bersama Buah Segar
            </h1>

            <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-2xl">
              Halo, teman-teman kelas 6! Ayo belajar mengenal pecahan desimal, membaca nilai tempat, mengubah pecahan, dan menghitung berat buah-buahan dengan cara yang seru dan mudah dipahami.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="max-w-md">
              <label
                htmlFor="student-name-input"
                className="block text-sm font-semibold text-indigo-950 mb-1.5"
              >
                Nama Murid (opsional)
              </label>
              <input
                id="student-name-input"
                type="text"
                value={studentName}
                onChange={(e) => onChangeName(e.target.value)}
                placeholder="Tulis nama panggilanmu di sini..."
                className="w-full px-4 py-2.5 rounded-xl border border-violet-300 bg-violet-50/40 text-indigo-950 placeholder:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:bg-white transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-violet-700 hover:bg-violet-800 active:scale-[0.99] text-white font-semibold text-base shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
              >
                <span>Mulai Belajar</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
              <span className="text-sm text-slate-600">
                6 tahapan belajar · 10 soal kuis isian interaktif
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-violet-200 bg-[#EAE0FB]">
            <ResilientImage
              src="/src/assets/images/hero_fruit_decimals_1795663089267.jpg"
              alt="Ilustrasi ceria buah anggur ungu, jeruk terpotong, stroberi, dan semangka untuk belajar pecahan desimal"
              fallbackFruit="anggur"
              fallbackTitle="Pecahan Desimal Bertema Buah"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Identity & Learning Map Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {MODULE_OUTLINE.map((item) => (
          <div
            key={item.step}
            className="bg-white border border-violet-200/80 rounded-2xl p-4 flex flex-col gap-1"
          >
            <span className="text-xs font-mono font-semibold text-violet-700 tabular-nums">
              Slide {item.step}
            </span>
            <span className="text-sm font-semibold text-indigo-950 leading-snug">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

interface SlideObjectivesProps {
  studentName: string;
  onNext: () => void;
  onBack: () => void;
}

const OBJECTIVES: Array<{
  num: string;
  fruit: FruitTheme;
  title: string;
  desc: string;
}> = [
  {
    num: '01',
    fruit: 'jeruk',
    title: 'Memahami Arti Pecahan Desimal',
    desc: 'Mengenal pecahan desimal sebagai bagian dari 10 (persepuluhan) atau 100 (perseratusan) melalui potongan buah.',
  },
  {
    num: '02',
    fruit: 'anggur',
    title: 'Menentukan Nilai Tempat Angka',
    desc: 'Membedakan nilai tempat satuan, persepuluhan, dan perseratusan di kiri dan kanan tanda koma.',
  },
  {
    num: '03',
    fruit: 'stroberi',
    title: 'Mengubah & Membandingkan Pecahan',
    desc: 'Mengubah pecahan biasa menjadi desimal (atau sebaliknya) dan membandingkan besar dua bilangan desimal.',
  },
  {
    num: '04',
    fruit: 'semangka',
    title: 'Menghitung Operasi Desimal',
    desc: 'Menyelesaikan penjumlahan, pengurangan, dan perkalian sederhana pecahan desimal dalam soal cerita sehari-hari.',
  },
];

export const SlideObjectives: React.FC<SlideObjectivesProps> = ({
  studentName,
  onNext,
  onBack,
}) => {
  return (
    <section
      aria-labelledby="objectives-heading"
      className="bg-white border border-violet-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-8 animate-slide-enter"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-violet-100 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-violet-700">
            <Target className="w-4 h-4" aria-hidden="true" />
            <span>Slide 2 dari 6 · Tujuan Pembelajaran</span>
          </div>
          <h2 id="objectives-heading" className="text-2xl md:text-4xl font-bold text-indigo-950 text-balance">
            {studentName.trim()
              ? `Target Belajarmu Hari Ini, ${studentName.trim()}!`
              : 'Apa yang Akan Kita Kuasai Hari Ini?'}
          </h2>
          <p className="text-slate-700 max-w-2xl">
            Setelah mempelajari modul ini, kamu diharapkan dapat menguasai empat keterampilan pecahan desimal berikut:
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-violet-800 bg-violet-50 border border-violet-200 rounded-xl px-4 py-2.5 shrink-0">
          <Sparkles className="w-4 h-4 text-violet-700" aria-hidden="true" />
          <span>Bahasa sederhana · Praktik langsung</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {OBJECTIVES.map((obj) => (
          <div
            key={obj.num}
            className="flex items-start gap-4 p-5 rounded-2xl bg-violet-50/50 border border-violet-200/80"
          >
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-white border border-violet-200 flex items-center justify-center">
              <FruitIcon fruit={obj.fruit} className="w-10 h-10" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-violet-700">
                <span>Tujuan {obj.num}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-indigo-950">{obj.title}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{obj.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-violet-100">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-violet-300 bg-white hover:bg-violet-50 text-violet-900 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          Kembali ke Pembuka
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-semibold text-sm md:text-base transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          <span>Lanjut ke Materi Inti</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
