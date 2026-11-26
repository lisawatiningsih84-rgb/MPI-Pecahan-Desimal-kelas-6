export type FruitTheme =
  | 'jeruk'
  | 'anggur'
  | 'apel'
  | 'semangka'
  | 'stroberi'
  | 'pisang'
  | 'mangga';

export type AnswerKind = 'decimal' | 'digit' | 'fraction';

export interface QuizQuestion {
  id: number;
  topic: string;
  fruit: FruitTheme;
  prompt: string;
  placeholder: string;
  answerKind: AnswerKind;
  acceptedAnswer: string;
  hint: string;
  unsimplifiedFractionHint?: {
    rawFraction: string;
    message: string;
  };
}

export interface QuestionProgress {
  attempts: number;
  isLocked: boolean;
  firstTryCorrect: boolean;
  lastInput: string;
  feedbackType: 'idle' | 'correct' | 'wrong';
  feedbackMessage: string;
}

export interface QuizState {
  currentIndex: number;
  questions: Record<number, QuestionProgress>;
  isCompleted: boolean;
}

export interface QuizSummary {
  totalQuestions: number;
  completedCount: number;
  firstTryCorrectCount: number;
  score: number;
  maxScore: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Konsep Persepuluhan',
    fruit: 'jeruk',
    prompt:
      'Sebuah jeruk dibagi menjadi 10 bagian sama besar. Rina memakan 3 bagian. Tuliskan bagian jeruk yang dimakan Rina dalam bentuk pecahan desimal!',
    placeholder: 'Contoh: 0,5',
    answerKind: 'decimal',
    acceptedAnswer: '0,3',
    hint: 'Ada 3 bagian dari 10 bagian keseluruhan (3/10). Satu angka di belakang koma menunjukkan persepuluhan. Tulis 0 di depan koma, lalu angka pembilangnya.',
  },
  {
    id: 2,
    topic: 'Nilai Tempat Desimal',
    fruit: 'anggur',
    prompt:
      'Pada bilangan desimal 4,75, angka berapakah yang menempati nilai tempat persepuluhan?',
    placeholder: 'Tulis satu angka saja',
    answerKind: 'digit',
    acceptedAnswer: '7',
    hint: 'Perhatikan angka tepat satu langkah di sebelah kanan tanda koma. Angka pertama setelah koma adalah persepuluhan, sedangkan angka kedua adalah perseratusan.',
  },
  {
    id: 3,
    topic: 'Pecahan Biasa ke Desimal',
    fruit: 'stroberi',
    prompt: 'Ubahlah pecahan biasa 9/10 menjadi bentuk pecahan desimal!',
    placeholder: 'Contoh: 0,5',
    answerKind: 'decimal',
    acceptedAnswer: '0,9',
    hint: 'Penyebutnya adalah 10, berarti hanya ada 1 angka di belakang tanda koma. Karena pembilangnya lebih kecil dari penyebut, angka satuannya adalah 0.',
  },
  {
    id: 4,
    topic: 'Pecahan Senilai ke Desimal',
    fruit: 'anggur',
    prompt:
      'Ibu membeli 3/4 kg buah anggur ungu. Ubahlah pecahan 3/4 menjadi bentuk pecahan desimal!',
    placeholder: 'Contoh: 0,50',
    answerKind: 'decimal',
    acceptedAnswer: '0,75',
    hint: 'Ubah penyebut 4 menjadi 100 dengan mengalikan pembilang dan penyebut dengan angka 25, lalu tuliskan hasilnya sebagai bilangan dua angka di belakang koma.',
  },
  {
    id: 5,
    topic: 'Desimal ke Pecahan Sederhana',
    fruit: 'apel',
    prompt:
      'Ubahlah pecahan desimal 0,4 menjadi pecahan biasa paling sederhana (contoh penulisan: 1/2)!',
    placeholder: 'Contoh: 1/2',
    answerKind: 'fraction',
    acceptedAnswer: '2/5',
    hint: '0,4 sama dengan 4/10. Sekarang sederhanakan pecahan tersebut dengan membagi pembilang dan penyebut menggunakan angka yang sama.',
    unsimplifiedFractionHint: {
      rawFraction: '4/10',
      message:
        '4/10 nilainya memang sama dengan 0,4, tetapi belum paling sederhana! Bagi angka atas dan bawah dengan 2.',
    },
  },
  {
    id: 6,
    topic: 'Membandingkan Desimal',
    fruit: 'semangka',
    prompt:
      'Manakah bilangan desimal yang lebih besar antara 0,65 dan 0,7? Tuliskan bilangan yang lebih besar!',
    placeholder: 'Tulis bilangan desimal',
    answerKind: 'decimal',
    acceptedAnswer: '0,7',
    hint: 'Samakan banyaknya angka di belakang koma dengan menambahkan nol di belakang angka kedua agar sama-sama punya dua angka di belakang koma, lalu bandingkan angkanya!',
  },
  {
    id: 7,
    topic: 'Penjumlahan Desimal',
    fruit: 'apel',
    prompt:
      'Dito membeli 1,4 kg apel dan 0,5 kg stroberi. Berapa kg total berat buah yang dibeli Dito? (tulis angkanya saja)',
    placeholder: 'Contoh: 1,2',
    answerKind: 'decimal',
    acceptedAnswer: '1,9',
    hint: 'Sejajarkan tanda koma secara bersusun: 1,4 + 0,5. Jumlahkan angka di belakang koma terlebih dahulu, lalu jumlahkan angka di depan koma.',
  },
  {
    id: 8,
    topic: 'Penjumlahan Beda Digit',
    fruit: 'semangka',
    prompt:
      'Sebuah keranjang berisi 2,25 kg semangka dan 1,5 kg jeruk. Berapa kg berat seluruh buah di keranjang? (tulis angkanya saja)',
    placeholder: 'Contoh: 2,50',
    answerKind: 'decimal',
    acceptedAnswer: '3,75',
    hint: 'Sejajarkan tanda komanya! Kamu bisa menulis 1,5 sebagai 1,50 agar sama-sama memiliki dua angka di belakang koma, lalu jumlahkan dari kanan ke kiri.',
  },
  {
    id: 9,
    topic: 'Pengurangan Desimal',
    fruit: 'pisang',
    prompt:
      'Ibu memiliki 2,8 kg buah pisang. Sebanyak 1,35 kg digunakan untuk membuat kue. Berapa kg sisa pisang Ibu? (tulis angkanya saja)',
    placeholder: 'Contoh: 1,25',
    answerKind: 'decimal',
    acceptedAnswer: '1,45',
    hint: 'Tulis 2,8 menjadi 2,80 agar sejajar dengan 1,35. Kurangkan dari belakang: 0 dikurangi 5 meminjam 1 dari angka 8 di depannya.',
  },
  {
    id: 10,
    topic: 'Perkalian Desimal Sederhana',
    fruit: 'mangga',
    prompt:
      'Satu kantong buah mangga beratnya 0,6 kg. Jika Budi membeli 3 kantong mangga, berapa kg berat seluruh mangga Budi? (tulis angkanya saja)',
    placeholder: 'Contoh: 1,2',
    answerKind: 'decimal',
    acceptedAnswer: '1,8',
    hint: 'Kalikan dulu tanpa koma seperti biasa (6 × 3). Karena pada 0,6 ada satu angka di belakang koma, berilah satu angka di belakang koma pada hasil akhirmu.',
  },
];

export function formatDecimalID(value: number, maxDecimals = 2): string {
  const rounded = Number(value.toFixed(maxDecimals));
  return rounded.toString().replace('.', ',');
}

export function normalizeAnswer(raw: string, answerKind: AnswerKind): string {
  let cleaned = raw.trim().toLowerCase();
  if (!cleaned) return '';

  if (answerKind === 'digit') {
    return cleaned.replace(/\s+/g, '');
  }

  if (answerKind === 'fraction') {
    return cleaned.replace(/\s+/g, '');
  }

  // Decimal normalization: support Indonesian comma, dot, optional 'kg' unit, leading comma
  cleaned = cleaned.replace(/\s*kg$/i, '').replace(/\s+/g, '');
  cleaned = cleaned.replace(/\./g, ',');

  if (cleaned.startsWith(',')) {
    cleaned = `0${cleaned}`;
  }

  // Validate basic decimal shape before stripping trailing zeros
  if (!/^\d+(,\d+)?$/.test(cleaned)) {
    return cleaned;
  }

  if (cleaned.includes(',')) {
    const [intPartRaw, decPartRaw] = cleaned.split(',');
    const intPart = intPartRaw.replace(/^0+(?=\d)/, '');
    const decPart = decPartRaw.replace(/0+$/, '');
    return decPart.length > 0 ? `${intPart},${decPart}` : intPart;
  }

  return cleaned.replace(/^0+(?=\d)/, '');
}

export function createEmptyQuestionProgress(): QuestionProgress {
  return {
    attempts: 0,
    isLocked: false,
    firstTryCorrect: false,
    lastInput: '',
    feedbackType: 'idle',
    feedbackMessage: '',
  };
}

export function createInitialQuizState(): QuizState {
  const questions: Record<number, QuestionProgress> = {};
  for (const q of QUIZ_QUESTIONS) {
    questions[q.id] = createEmptyQuestionProgress();
  }
  return {
    currentIndex: 0,
    questions,
    isCompleted: false,
  };
}

export function isAnswerCorrect(question: QuizQuestion, rawInput: string): boolean {
  const normalizedInput = normalizeAnswer(rawInput, question.answerKind);
  const normalizedTarget = normalizeAnswer(question.acceptedAnswer, question.answerKind);
  return normalizedInput.length > 0 && normalizedInput === normalizedTarget;
}

export function submitQuizAnswer(
  state: QuizState,
  questionIndex: number,
  rawInput: string
): { nextState: QuizState; outcome: 'empty' | 'locked' | 'correct' | 'wrong' } {
  const question = QUIZ_QUESTIONS[questionIndex];
  if (!question) {
    return { nextState: state, outcome: 'locked' };
  }

  const currentProgress = state.questions[question.id] ?? createEmptyQuestionProgress();

  // Locked questions cannot be answered repeatedly
  if (currentProgress.isLocked) {
    return { nextState: state, outcome: 'locked' };
  }

  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      nextState: {
        ...state,
        questions: {
          ...state.questions,
          [question.id]: {
            ...currentProgress,
            feedbackType: 'wrong',
            feedbackMessage: 'Tuliskan jawabanmu terlebih dahulu pada kotak isian, ya!',
          },
        },
      },
      outcome: 'empty',
    };
  }

  const correct = isAnswerCorrect(question, trimmed);
  if (correct) {
    const isFirstTry = currentProgress.attempts === 0;
    return {
      nextState: {
        ...state,
        questions: {
          ...state.questions,
          [question.id]: {
            attempts: currentProgress.attempts + 1,
            isLocked: true,
            firstTryCorrect: isFirstTry,
            lastInput: trimmed,
            feedbackType: 'correct',
            feedbackMessage: 'KamuHebat!',
          },
        },
      },
      outcome: 'correct',
    };
  }

  // Wrong answer: increment attempts, keep unlocked, give helpful hint without revealing answer
  const normalizedFraction = normalizeAnswer(trimmed, question.answerKind);
  const hintMessage =
    question.unsimplifiedFractionHint &&
    normalizedFraction === question.unsimplifiedFractionHint.rawFraction
      ? question.unsimplifiedFractionHint.message
      : question.hint;

  return {
    nextState: {
      ...state,
      questions: {
        ...state.questions,
        [question.id]: {
          attempts: currentProgress.attempts + 1,
          isLocked: false,
          firstTryCorrect: false,
          lastInput: trimmed,
          feedbackType: 'wrong',
          feedbackMessage: hintMessage,
        },
      },
    },
    outcome: 'wrong',
  };
}

export function goToNextQuestion(state: QuizState): QuizState {
  const currentQuestion = QUIZ_QUESTIONS[state.currentIndex];
  if (!currentQuestion) return state;

  const progress = state.questions[currentQuestion.id];
  // Must answer correctly (locked) before advancing
  if (!progress?.isLocked) {
    return state;
  }

  if (state.currentIndex >= QUIZ_QUESTIONS.length - 1) {
    return {
      ...state,
      isCompleted: true,
    };
  }

  return {
    ...state,
    currentIndex: state.currentIndex + 1,
  };
}

export function calculateQuizSummary(state: QuizState): QuizSummary {
  const totalQuestions = QUIZ_QUESTIONS.length;
  let completedCount = 0;
  let firstTryCorrectCount = 0;

  for (const q of QUIZ_QUESTIONS) {
    const progress = state.questions[q.id];
    if (progress?.isLocked) {
      completedCount += 1;
      if (progress.firstTryCorrect) {
        firstTryCorrectCount += 1;
      }
    }
  }

  return {
    totalQuestions,
    completedCount,
    firstTryCorrectCount,
    score: firstTryCorrectCount * 10,
    maxScore: totalQuestions * 10,
  };
}

export const BASKET_FRUITS = [
  { id: 'apel', name: 'Apel Merah', weight: 0.25, fruit: 'apel' as FruitTheme },
  { id: 'anggur', name: 'Anggur Ungu', weight: 0.4, fruit: 'anggur' as FruitTheme },
  { id: 'jeruk', name: 'Jeruk Manis', weight: 0.5, fruit: 'jeruk' as FruitTheme },
  { id: 'semangka', name: 'Semangka Segar', weight: 1.25, fruit: 'semangka' as FruitTheme },
] as const;

export function calculateBasketTotal(counts: Record<string, number>): number {
  let totalCents = 0;
  for (const item of BASKET_FRUITS) {
    const qty = Math.max(0, counts[item.id] ?? 0);
    totalCents += Math.round(item.weight * 100) * qty;
  }
  return totalCents / 100;
}
