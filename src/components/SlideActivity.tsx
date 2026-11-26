import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  RotateCcw,
  ShoppingBasket,
  SlidersHorizontal,
} from 'lucide-react';
import {
  BASKET_FRUITS,
  calculateBasketTotal,
  formatDecimalID,
} from '../utils/decimalQuiz';
import {
  FruitIcon,
  InteractiveFruitWheel,
  type WheelFruit,
} from './FruitVisuals';

interface SlideActivityProps {
  wheelSlices: number;
  onChangeWheelSlices: (count: number) => void;
  basketCounts: Record<string, number>;
  onChangeBasketCounts: (counts: Record<string, number>) => void;
  onNext: () => void;
  onBack: () => void;
}

const WHEEL_TARGETS = [7, 5, 9, 4, 10];
const BASKET_TARGETS = [0.75, 1.75, 1.15, 2.0];

export const SlideActivity: React.FC<SlideActivityProps> = ({
  wheelSlices,
  onChangeWheelSlices,
  basketCounts,
  onChangeBasketCounts,
  onNext,
  onBack,
}) => {
  const [activityTab, setActivityTab] = useState<'potongan' | 'keranjang'>('potongan');
  const [wheelFruit, setWheelFruit] = useState<WheelFruit>('jeruk');
  const [wheelTargetIdx, setWheelTargetIdx] = useState(0);
  const [basketTargetIdx, setBasketTargetIdx] = useState(0);

  const decimalWheelString =
    wheelSlices === 10 ? '1,0' : `0,${wheelSlices}`;
  const wheelTarget = WHEEL_TARGETS[wheelTargetIdx];
  const wheelMatched = wheelSlices === wheelTarget;

  const basketTotal = calculateBasketTotal(basketCounts);
  const basketTarget = BASKET_TARGETS[basketTargetIdx];
  const basketMatched = Math.abs(basketTotal - basketTarget) < 0.001;

  const updateFruitCount = (id: string, delta: number) => {
    const current = basketCounts[id] ?? 0;
    const next = Math.max(0, Math.min(5, current + delta));
    onChangeBasketCounts({ ...basketCounts, [id]: next });
  };

  const resetBasket = () => {
    onChangeBasketCounts({ apel: 0, anggur: 0, jeruk: 0, semangka: 0 });
  };

  return (
    <section
      aria-labelledby="activity-heading"
      className="bg-white border border-violet-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-6 animate-slide-enter"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-violet-100 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm font-medium text-violet-700">
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            <span>Slide 4 dari 6 · Aktivitas Interaktif</span>
          </div>
          <h2 id="activity-heading" className="text-2xl md:text-3xl font-bold text-indigo-950">
            Lab Buah Pecahan Desimal
          </h2>
        </div>

        <div
          className="flex items-center gap-1.5 p-1.5 bg-violet-100/80 rounded-2xl"
          role="tablist"
          aria-label="Pilih aktivitas interaktif"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activityTab === 'potongan'}
            onClick={() => setActivityTab('potongan')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activityTab === 'potongan'
                ? 'bg-white text-violet-900 shadow-sm'
                : 'text-violet-800 hover:bg-white/60'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            <span>1. Potongan Buah</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activityTab === 'keranjang'}
            onClick={() => setActivityTab('keranjang')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activityTab === 'keranjang'
                ? 'bg-white text-violet-900 shadow-sm'
                : 'text-violet-800 hover:bg-white/60'
            }`}
          >
            <ShoppingBasket className="w-4 h-4" aria-hidden="true" />
            <span>2. Keranjang Berat Buah</span>
          </button>
        </div>
      </div>

      {/* Activity 1: Interactive 10-slice fruit wheel */}
      {activityTab === 'potongan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 p-6 rounded-2xl bg-violet-50/60 border border-violet-200 flex flex-col items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-violet-800 mr-1">Pilih Buah:</span>
              {(['jeruk', 'semangka', 'anggur'] as WheelFruit[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setWheelFruit(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    wheelFruit === f
                      ? 'bg-violet-700 text-white border-violet-700'
                      : 'bg-white text-violet-900 border-violet-200 hover:bg-violet-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <InteractiveFruitWheel
              slicesFilled={wheelSlices}
              fruit={wheelFruit}
              onSelectCount={onChangeWheelSlices}
            />

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onChangeWheelSlices(Math.max(0, wheelSlices - 1))}
                aria-label="Kurangi satu potongan buah"
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white border border-violet-300 hover:bg-violet-50 text-violet-900 text-sm font-semibold cursor-pointer"
              >
                <Minus className="w-4 h-4" aria-hidden="true" />
                <span>Kurangi</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeWheelSlices(Math.min(10, wheelSlices + 1))}
                aria-label="Tambah satu potongan buah"
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Tambah</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="p-6 rounded-2xl bg-white border border-violet-200 space-y-4">
              <h3 className="text-lg font-bold text-indigo-950">
                Hasil Pengamatan Desimal
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-violet-50 border border-violet-200">
                  <div className="text-xs font-semibold text-violet-700">Pecahan Biasa</div>
                  <div className="text-3xl font-mono font-bold text-indigo-950 mt-1 tabular-nums">
                    {wheelSlices}/10
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-violet-700 text-white">
                  <div className="text-xs font-semibold text-violet-200">Pecahan Desimal</div>
                  <div
                    data-testid="wheel-decimal-value"
                    className="text-3xl font-mono font-bold mt-1 tabular-nums"
                  >
                    {decimalWheelString}
                  </div>
                </div>
              </div>

              {/* Place value sync table */}
              <div className="border border-violet-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 bg-violet-100/70 text-xs font-semibold text-violet-900 text-center py-2">
                  <span>Satuan</span>
                  <span>Tanda Koma</span>
                  <span>Persepuluhan</span>
                </div>
                <div className="grid grid-cols-3 bg-white text-2xl font-mono font-bold text-indigo-950 text-center py-3 tabular-nums">
                  <span>{wheelSlices === 10 ? 1 : 0}</span>
                  <span className="text-amber-600">,</span>
                  <span className="text-violet-700">{wheelSlices === 10 ? 0 : wheelSlices}</span>
                </div>
              </div>
            </div>

            {/* Mini Target Challenge */}
            <div
              className={`p-5 rounded-2xl border transition-colors ${
                wheelMatched
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-indigo-950">
                    Misi Kecil Potongan Buah
                  </div>
                  <p className="text-sm text-slate-800">
                    Atur potongan buah menjadi bentuk desimal{' '}
                    <strong className="font-mono text-base text-violet-800">
                      {wheelTarget === 10 ? '1,0' : `0,${wheelTarget}`}
                    </strong>
                    !
                  </p>
                  {wheelMatched && (
                    <div className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 pt-1">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span>Tepat sekali! {wheelTarget}/10 = {wheelTarget === 10 ? '1,0' : `0,${wheelTarget}`}</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setWheelTargetIdx((prev) => (prev + 1) % WHEEL_TARGETS.length)
                  }
                  className="px-3.5 py-2 rounded-xl bg-white border border-violet-300 hover:bg-violet-50 text-xs font-semibold text-violet-900 cursor-pointer whitespace-nowrap shrink-0"
                >
                  Misi Lain
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity 2: Fruit Basket Decimal Weight Addition */}
      {activityTab === 'keranjang' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-indigo-950">
                Tambahkan Buah ke Keranjang Ungu
              </h3>
              <button
                type="button"
                onClick={resetBasket}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-violet-300 text-xs font-semibold text-violet-900 hover:bg-violet-50 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Kosongkan</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {BASKET_FRUITS.map((item) => {
                const count = basketCounts[item.id] ?? 0;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-violet-50/70 border border-violet-200 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <FruitIcon fruit={item.fruit} className="w-11 h-11 shrink-0" />
                      <div>
                        <div className="font-bold text-indigo-950 text-sm">{item.name}</div>
                        <div className="text-xs font-mono font-semibold text-violet-700">
                          {formatDecimalID(item.weight)} kg / buah
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateFruitCount(item.id, -1)}
                        disabled={count === 0}
                        aria-label={`Kurangi ${item.name}`}
                        className="w-8 h-8 rounded-lg border border-violet-300 bg-white text-violet-900 flex items-center justify-center hover:bg-violet-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <span
                        data-testid={`basket-count-${item.id}`}
                        className="w-6 text-center font-mono font-bold text-indigo-950 tabular-nums"
                      >
                        {count}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateFruitCount(item.id, 1)}
                        disabled={count >= 5}
                        aria-label={`Tambah ${item.name}`}
                        className="w-8 h-8 rounded-lg bg-violet-700 text-white flex items-center justify-center hover:bg-violet-800 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-violet-900 text-white space-y-4">
              <div className="text-xs font-semibold text-violet-200">
                Total Berat Keranjang Buah
              </div>
              <div
                data-testid="basket-total-weight"
                className="text-4xl font-mono font-bold tabular-nums"
              >
                {formatDecimalID(basketTotal)} kg
              </div>
              <div className="border-t border-violet-700/80 pt-3 space-y-1.5 text-sm font-mono tabular-nums">
                {BASKET_FRUITS.filter((f) => (basketCounts[f.id] ?? 0) > 0).length === 0 ? (
                  <p className="text-violet-200 font-sans text-xs">
                    Belum ada buah di keranjang. Klik tombol + untuk menambahkan buah!
                  </p>
                ) : (
                  BASKET_FRUITS.map((f) => {
                    const qty = basketCounts[f.id] ?? 0;
                    if (qty === 0) return null;
                    const subtotal = (Math.round(f.weight * 100) * qty) / 100;
                    return (
                      <div key={f.id} className="flex items-center justify-between text-violet-100">
                        <span className="font-sans text-xs">
                          {qty} × {f.name} ({formatDecimalID(f.weight)})
                        </span>
                        <span>{formatDecimalID(subtotal)} kg</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div
              className={`p-5 rounded-2xl border transition-colors ${
                basketMatched
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-indigo-950">
                    Misi Timbangan Buah
                  </div>
                  <p className="text-sm text-slate-800">
                    Susun buah di keranjang agar total beratnya tepat{' '}
                    <strong className="font-mono text-base text-violet-800">
                      {formatDecimalID(basketTarget)} kg
                    </strong>
                    !
                  </p>
                  {basketMatched && (
                    <div className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 pt-1">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span>Berhasil! Total keranjang tepat {formatDecimalID(basketTarget)} kg!</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBasketTargetIdx((prev) => (prev + 1) % BASKET_TARGETS.length);
                    resetBasket();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white border border-violet-300 hover:bg-violet-50 text-xs font-semibold text-violet-900 cursor-pointer whitespace-nowrap shrink-0"
                >
                  Target Lain
                </button>
              </div>
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
          <span>Kembali ke Materi</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-semibold text-sm md:text-base transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Mulai Kuis 10 Soal</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
