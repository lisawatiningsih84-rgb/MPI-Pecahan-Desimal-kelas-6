import test from 'node:test';
import assert from 'node:assert/strict';
import {
  QUIZ_QUESTIONS,
  calculateBasketTotal,
  calculateQuizSummary,
  createInitialQuizState,
  formatDecimalID,
  goToNextQuestion,
  normalizeAnswer,
  submitQuizAnswer,
} from './decimalQuiz';

test('QUIZ_QUESTIONS has exactly 10 unambiguous questions and hints do not leak answers', () => {
  assert.equal(QUIZ_QUESTIONS.length, 10);
  for (const q of QUIZ_QUESTIONS) {
    assert.ok(q.prompt.length > 10);
    assert.ok(q.hint.length > 10);
    // Ensure hint does not literally reveal the final decimal answer like "0,75" or "2/5"
    if (q.answerKind === 'fraction' || q.answerKind === 'decimal') {
      assert.equal(
        q.hint.includes(q.acceptedAnswer),
        false,
        `Hint for Q${q.id} should not leak answer ${q.acceptedAnswer}`
      );
    }
  }
});

test('normalizeAnswer handles Indonesian comma, dot, spaces, leading comma, and kg unit', () => {
  assert.equal(normalizeAnswer('0,3', 'decimal'), '0,3');
  assert.equal(normalizeAnswer('0.3', 'decimal'), '0,3');
  assert.equal(normalizeAnswer(' ,3 ', 'decimal'), '0,3');
  assert.equal(normalizeAnswer('1,90 kg', 'decimal'), '1,9');
  assert.equal(normalizeAnswer(' 2 / 5 ', 'fraction'), '2/5');
  assert.equal(normalizeAnswer(' 7 ', 'digit'), '7');
});

test('first-attempt correct answer yields KamuHebat!, locks question, and awards 10 points', () => {
  let state = createInitialQuizState();
  const res = submitQuizAnswer(state, 0, '0,3');
  assert.equal(res.outcome, 'correct');
  state = res.nextState;

  const q1 = state.questions[1];
  assert.equal(q1.feedbackMessage, 'KamuHebat!');
  assert.equal(q1.isLocked, true);
  assert.equal(q1.firstTryCorrect, true);

  const summary = calculateQuizSummary(state);
  assert.equal(summary.firstTryCorrectCount, 1);
  assert.equal(summary.score, 10);

  // Attempting to re-answer locked question is ignored and does not mutate score
  const resRepeat = submitQuizAnswer(state, 0, '0,3');
  assert.equal(resRepeat.outcome, 'locked');
  assert.equal(calculateQuizSummary(resRepeat.nextState).score, 10);
});

test('wrong answer gives hint, prevents advancing, and retry does not add first-try score', () => {
  let state = createInitialQuizState();

  // Wrong attempt on Q1
  const wrongRes = submitQuizAnswer(state, 0, '0,8');
  assert.equal(wrongRes.outcome, 'wrong');
  state = wrongRes.nextState;
  assert.equal(state.questions[1].isLocked, false);
  assert.equal(state.questions[1].attempts, 1);
  assert.equal(state.questions[1].feedbackType, 'wrong');

  // Cannot advance while wrong / unlocked
  const blockedAdvance = goToNextQuestion(state);
  assert.equal(blockedAdvance.currentIndex, 0);

  // Correct on 2nd attempt
  const retryRes = submitQuizAnswer(state, 0, '0.3');
  assert.equal(retryRes.outcome, 'correct');
  state = retryRes.nextState;
  assert.equal(state.questions[1].feedbackMessage, 'KamuHebat!');
  assert.equal(state.questions[1].isLocked, true);
  assert.equal(state.questions[1].firstTryCorrect, false);

  // Score remains 0 because Q1 was not solved on first attempt
  const summary = calculateQuizSummary(state);
  assert.equal(summary.completedCount, 1);
  assert.equal(summary.firstTryCorrectCount, 0);
  assert.equal(summary.score, 0);

  // Now advancing to Q2 succeeds
  state = goToNextQuestion(state);
  assert.equal(state.currentIndex, 1);
});

test('unsimplified fraction 4/10 on Q5 triggers helpful simplify hint without unlocking', () => {
  const state = createInitialQuizState();
  const res = submitQuizAnswer(state, 4, '4/10');
  assert.equal(res.outcome, 'wrong');
  assert.match(res.nextState.questions[5].feedbackMessage, /belum paling sederhana/i);
  assert.equal(res.nextState.questions[5].isLocked, false);
});

test('full 10-question flow computes accurate score and reset clears everything', () => {
  let state = createInitialQuizState();
  const answers = ['0,3', '7', '0,9', '0,75', '2/5', '0,7', '1,9', '3,75', '1,45', '1,8'];

  // Intentionally miss Q2 and Q5 first, pass the other 8 on first try
  for (let i = 0; i < answers.length; i++) {
    if (i === 1 || i === 4) {
      state = submitQuizAnswer(state, i, '999').nextState;
    }
    state = submitQuizAnswer(state, i, answers[i]).nextState;
    state = goToNextQuestion(state);
  }

  assert.equal(state.isCompleted, true);
  const summary = calculateQuizSummary(state);
  assert.equal(summary.completedCount, 10);
  assert.equal(summary.firstTryCorrectCount, 8);
  assert.equal(summary.score, 80);

  // Reset
  const resetState = createInitialQuizState();
  assert.equal(resetState.currentIndex, 0);
  assert.equal(resetState.isCompleted, false);
  assert.equal(calculateQuizSummary(resetState).score, 0);
  assert.equal(calculateQuizSummary(resetState).completedCount, 0);
});

test('fruit basket decimal addition avoids floating point drift', () => {
  assert.equal(calculateBasketTotal({ apel: 1, jeruk: 1 }), 0.75);
  assert.equal(calculateBasketTotal({ semangka: 1, jeruk: 1 }), 1.75);
  assert.equal(formatDecimalID(calculateBasketTotal({ anggur: 3 })), '1,2');
});
