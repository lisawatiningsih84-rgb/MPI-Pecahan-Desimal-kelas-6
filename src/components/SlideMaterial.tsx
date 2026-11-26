import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Calculator, Layers, Repeat } from 'lucide-react';
import { FruitIcon } from './FruitVisuals';

interface SlideMaterialProps {
  onNext: () => void;
  onBack: () => void;
}

type MaterialTab = 'konsep' | 'nilai_tempat' | 'konversi' | 'operasi';

const DIGIT_INFO = [
  {
    id: 'satuan',
    char: '4',
    place: 'Satuan',
    valueText: 'Nilainya 4 buah utuh',
    detail: 'Angka di sebelah kiri tanda koma menunjukkan bilangan bulat (utuh).',
    bgClass: 'bg-violet-100 border-violet-300 text-indigo-950',
  },
  {
    id: 'koma',
    char: ',',
    place: 'Tanda Koma',
    valueText: 'Pemisah utuh & pecahan',
    detail: 'Tanda koma memisahkan bilangan bulat di kiri dan bagian pecahan di kanan.',
    bgClass: 'bg-amber-100 border-amber-300 text-amber-950',
  },
  {
    id: 'persepuluhan',
    char: '7',
    place: 'Persepuluhan',
    valueText: 'Nilainya 7/10 = 0,7',
    detail: 'Angka pertama tepat di kanan koma. Artinya 7 bagian dari 10 potongan.',
    bgClass: 'bg-purple-200 border-purple-400 text-purple-950',
  },
  {
    id: 'perseratusan',
    char: '5',
    place: 'Perseratusan',
    valueText: 'Nilainya 5/100 = 0,05',
    detail: 'Angka kedua di kanan koma. Artinya 5 bagian dari 100 kotak kecil.',
    bgClass: 'bg-fuchsia-100 border-fuchsia-300 text-fuchsia-950',
  },
] as const;

export const SlideMaterial: React.FC<SlideMaterialProps> = ({ onNext, onBack }) => {
  const [activeTab, setActiveTab] = useState<MaterialTab>('konsep');
  const [selectedDigit, setSelectedDigit] = useState<string>('persepuluhan');

  const activeDigitObj =
    DIGIT_INFO.find((d) => d.id === selectedDigit) ?? DIGIT_INFO[2];

  return (
    <section
      aria-labelledby="material-heading"
      className="bg-white border border-violet-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-6 animate-slide-enter"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-violet-100 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm font-medium text-violet-700">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Slide 3 dari 6 · Materi Inti Singkat</span>
          </div>
          <h2 id="material-heading" className="text-2xl md:text-3xl font-bold text-indigo-950">
            Mengenal Rahasia Pecahan Desimal
          </h2>
        </div>

        {/* Interactive segmented topic tabs */}
        <div
          className="flex flex-wrap gap-1.5 p-1.5 bg-violet-100/80 rounded-2xl"
          role="tablist"
          aria-label="Topik materi pecahan desimal"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'konsep'}
            onClick={() => setActiveTab('konsep')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'konsep'
                ? 'bg-white text-violet-900 shadow-sm'
                : 'text-violet-800 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>1. Arti Desimal</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'nilai_tempat'}
            onClick={() => setActiveTab('nilai_tempat')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'nilai_tempat'
                ? 'bg-white text-violet-900 shadow-sm'
                : 'text-violet-800 hover:bg-white/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>2. Nilai Tempat</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'konversi'}
            onClick={() => setActiveTab('konversi')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'konversi'
                ? 'bg-white text-violet-900 shadow-sm'
                : 'text-violet-800 hover:bg-white/60'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" aria-hidden="true" />
            <span>3. Ubah & Bandingkan</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'operasi'}
            onClick={() => setActiveTab('operasi')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'operasi'
                ? 'bg-white text-violet-900 shadow-sm'
                : 'text-violet-800 hover:bg-white/60'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
            <span>4. Operasi Hitung</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Konsep */}
      {activeTab === 'konsep' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-violet-50/70 border border-violet-200 space-y-4">
            <div className="flex items-center gap-3">
              <FruitIcon fruit="jeruk" className="w-11 h-11 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-indigo-950">
                  Apa itu Pecahan Desimal?
                </h3>
                <p className="text-sm text-slate-600">Pecahan dengan tanda koma (,)</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Pecahan desimal adalah cara lain menulis pecahan berpenyebut{' '}
              <strong className="text-violet-800">10, 100, atau 1.000</strong> menggunakan tanda koma.
            </p>
            <div className="bg-white rounded-xl p-4 border border-violet-200 space-y-3">
              <p className="text-sm font-semibold text-indigo-950">
                Contoh: 1 buah jeruk dibagi 10 potong sama besar. Kamu makan 3 potong:
              </p>
              <div className="grid grid-cols-10 gap-1.5" aria-label="3 dari 10 bagian terisi">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className={`h-8 rounded-md border flex items-center justify-center text-xs font-mono font-bold ${
                      i < 3
                        ? 'bg-orange-400 border-orange-600 text-white'
                        : 'bg-orange-50 border-orange-200 text-orange-800'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-indigo-950 pt-1">
                <span>Pecahan biasa: <span className="font-mono text-violet-700">3/10</span></span>
                <span aria-hidden="true">·</span>
                <span>Pecahan desimal: <span className="font-mono text-violet-700 text-base">0,3</span></span>
                <span aria-hidden="true">·</span>
                <span>Dibaca: <em>nol koma tiga</em></span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-violet-50/70 border border-violet-200 space-y-4">
            <div className="flex items-center gap-3">
              <FruitIcon fruit="anggur" className="w-11 h-11 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-indigo-950">
                  Persepuluhan vs Perseratusan
                </h3>
                <p className="text-sm text-slate-600">Jumlah angka di belakang koma</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 border border-violet-200 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-indigo-950">1 angka di belakang koma</p>
                  <p className="text-sm text-slate-600">Menunjukkan persepuluhan (/10)</p>
                </div>
                <div className="text-right font-mono">
                  <div className="text-lg font-bold text-violet-700">0,7 = 7/10</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-violet-200 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-indigo-950">2 angka di belakang koma</p>
                  <p className="text-sm text-slate-600">Menunjukkan perseratusan (/100)</p>
                </div>
                <div className="text-right font-mono">
                  <div className="text-lg font-bold text-violet-700">0,25 = 25/100</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-violet-900 bg-violet-100/80 rounded-xl p-3.5">
              Tips cepat: Angka nol di paling belakang setelah koma tidak mengubah nilai. Jadi <strong className="font-mono">0,5 = 0,50</strong>!
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Nilai Tempat */}
      {activeTab === 'nilai_tempat' && (
        <div className="p-6 rounded-2xl bg-violet-50/60 border border-violet-200 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-indigo-950">
                Klik Setiap Kotak Angka untuk Melihat Nilai Tempatnya!
              </h3>
              <p className="text-sm text-slate-700">
                Perhatikan bilangan desimal berat sekeranjang buah: <strong className="font-mono text-violet-800">4,75 kg</strong>
              </p>
            </div>
            <FruitIcon fruit="stroberi" className="w-11 h-11 shrink-0" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 py-2">
            {DIGIT_INFO.map((item) => {
              const isSelected = selectedDigit === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedDigit(item.id)}
                  aria-pressed={isSelected}
                  className={`min-w-[76px] px-5 py-4 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    item.bgClass
                  } ${
                    isSelected
                      ? 'ring-4 ring-violet-400/50 scale-105 shadow-md'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <span className="text-4xl font-mono font-bold tabular-nums">{item.char}</span>
                  <span className="text-xs font-semibold">{item.place}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-violet-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-violet-700">
                Nilai Tempat Terpilih: {activeDigitObj.place}
              </div>
              <div className="text-xl font-bold text-indigo-950">{activeDigitObj.valueText}</div>
              <p className="text-sm text-slate-700">{activeDigitObj.detail}</p>
            </div>
            <div className="font-mono text-sm bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 text-violet-950 shrink-0">
              4,75 = 4 + 0,7 + 0,05
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Konversi & Membandingkan */}
      {activeTab === 'konversi' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-violet-50/70 border border-violet-200 space-y-4">
            <div className="flex items-center gap-3">
              <FruitIcon fruit="apel" className="w-10 h-10 shrink-0" />
              <h3 className="text-lg font-bold text-indigo-950">
                Mengubah Pecahan ↔ Desimal
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="bg-white p-3.5 rounded-xl border border-violet-200 space-y-1">
                <div className="font-bold text-indigo-950">1. Penyebut 10 langsung jadi 1 angka di belakang koma</div>
                <div className="font-mono text-violet-800">9/10 = 0,9 &nbsp;|&nbsp; 4/10 = 0,4</div>
              </li>
              <li className="bg-white p-3.5 rounded-xl border border-violet-200 space-y-1">
                <div className="font-bold text-indigo-950">2. Penyebut lain? Kalikan agar penyebut jadi 10 atau 100</div>
                <div className="font-mono text-violet-800">3/4 = (3×25)/(4×25) = 75/100 = 0,75</div>
              </li>
              <li className="bg-white p-3.5 rounded-xl border border-violet-200 space-y-1">
                <div className="font-bold text-indigo-950">3. Desimal ke Pecahan Biasa Paling Sederhana</div>
                <div className="font-mono text-violet-800">0,4 = 4/10 = (4:2)/(10:2) = 2/5</div>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-violet-50/70 border border-violet-200 space-y-4">
            <div className="flex items-center gap-3">
              <FruitIcon fruit="semangka" className="w-10 h-10 shrink-0" />
              <h3 className="text-lg font-bold text-indigo-950">
                Membandingkan Pecahan Desimal
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Jangan terkecoh oleh banyaknya angka! Cara paling mudah membandingkan adalah{' '}
              <strong className="text-violet-800">menyamakan banyak angka di belakang koma</strong>.
            </p>
            <div className="bg-white p-4 rounded-xl border border-violet-200 space-y-2.5">
              <div className="text-sm font-semibold text-indigo-950">
                Mana yang lebih besar: <span className="font-mono">0,65</span> atau <span className="font-mono">0,7</span>?
              </div>
              <div className="text-sm text-slate-700 space-y-1 font-mono bg-violet-50 p-3 rounded-lg">
                <div>0,65 tetap ditulis → 0,65</div>
                <div>0,7 diberi nol &nbsp;&nbsp;→ 0,70</div>
              </div>
              <div className="text-sm font-bold text-emerald-700">
                Karena 70 lebih besar dari 65, maka 0,7 &gt; 0,65!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Operasi Hitung */}
      {activeTab === 'operasi' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-violet-50/70 border border-violet-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <FruitIcon fruit="apel" className="w-9 h-9 shrink-0" />
              <h3 className="font-bold text-indigo-950">Penjumlahan</h3>
            </div>
            <p className="text-xs text-slate-700">
              Kunci utama: <strong>sejajarkan tanda koma</strong> lurus ke bawah! Tambahkan nol jika panjang angka berbeda.
            </p>
            <div className="bg-white rounded-xl p-3.5 border border-violet-200 font-mono text-sm tabular-nums space-y-1 text-right">
              <div>2,25</div>
              <div>1,50 +</div>
              <div className="border-t border-violet-300 pt-1 font-bold text-violet-800">3,75</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-violet-50/70 border border-violet-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <FruitIcon fruit="pisang" className="w-9 h-9 shrink-0" />
              <h3 className="font-bold text-indigo-950">Pengurangan</h3>
            </div>
            <p className="text-xs text-slate-700">
              Sejajarkan tanda koma, lalu beri nol di belakang agar jumlah angkanya sama sebelum mengurangkan.
            </p>
            <div className="bg-white rounded-xl p-3.5 border border-violet-200 font-mono text-sm tabular-nums space-y-1 text-right">
              <div>2,80</div>
              <div>1,35 -</div>
              <div className="border-t border-violet-300 pt-1 font-bold text-violet-800">1,45</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-violet-50/70 border border-violet-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <FruitIcon fruit="mangga" className="w-9 h-9 shrink-0" />
              <h3 className="font-bold text-indigo-950">Perkalian Sederhana</h3>
            </div>
            <p className="text-xs text-slate-700">
              Kalikan seperti bilangan biasa tanpa koma, lalu hitung total angka di belakang koma pada hasilnya.
            </p>
            <div className="bg-white rounded-xl p-3.5 border border-violet-200 font-mono text-xs md:text-sm space-y-1">
              <div>0,6 × 3 = ?</div>
              <div className="text-slate-600">6 × 3 = 18</div>
              <div className="font-bold text-violet-800">1 angka di belakang koma → 1,8</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-violet-100">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-violet-300 bg-white hover:bg-violet-50 text-violet-900 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Sebelumnya</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-semibold text-sm md:text-base transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Lanjut ke Aktivitas Interaktif</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
