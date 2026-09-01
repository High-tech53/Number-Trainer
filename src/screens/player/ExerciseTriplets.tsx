import { useState } from 'react';
import type { AppState } from '../../types';
import PlayerShell from './PlayerShell';

const ROUNDS = [
  { prompt: 'Tap the BIGGEST number', nums: ['247', '1,043', '856'], correct: 1 },
  { prompt: 'Tap the SMALLEST number', nums: ['3,210', '987', '4,056'], correct: 1 },
  { prompt: 'Tap the BIGGEST number', nums: ['72', '618', '203'], correct: 1 },
];

export default function ExerciseTriplets({ onExerciseComplete }: AppState) {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);

  const current = ROUNDS[round];

  function handleTap(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i !== current.correct) setErrors(e => e + 1);
    setTimeout(() => {
      if (round + 1 < ROUNDS.length) {
        setRound(r => r + 1);
        setSelected(null);
      } else {
        onExerciseComplete();
      }
    }, 1000);
  }

  function cardClass(i: number): string {
    if (selected === null) return 'cursor-pointer border-2 border-line bg-white';
    if (i === current.correct) return 'cursor-default border-2 border-success bg-success-soft';
    if (i === selected && i !== current.correct) return 'cursor-default border-2 border-danger bg-danger-soft';
    return 'cursor-default border-2 border-line bg-surface opacity-40';
  }

  return (
    <PlayerShell label="Triplets — Comparison" timer="00:38" errors={errors} sessionProgress={25}>
      <div className="flex w-full max-w-[560px] flex-col items-center gap-8">
        {/* Instruction */}
        <div className="text-center">
          <div className="mb-3 text-[13px] font-medium uppercase tracking-[0.06em] text-muted">
            Round {round + 1} of {ROUNDS.length}
          </div>
          <h2 className="m-0 text-2xl font-bold tracking-[-0.01em] text-fg">{current.prompt}</h2>
        </div>

        {/* Cards */}
        <div className="grid w-full grid-cols-3 gap-4">
          {current.nums.map((num, i) => (
            <button
              key={`${round}-${i}`}
              onClick={() => handleTap(i)}
              className={`flex flex-col items-center gap-2 rounded-2xl px-4 py-8 font-sans transition-all ${cardClass(i)}`}
            >
              <span className="font-mono text-4xl font-bold tracking-[0.02em] text-fg">{num}</span>
              {selected !== null && i === current.correct && <span className="text-xl">✓</span>}
              {selected === i && i !== current.correct && <span className="text-xl">✕</span>}
            </button>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {ROUNDS.map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${i < round ? 'bg-success' : i === round ? 'bg-accent' : 'bg-line'}`} />
          ))}
        </div>
      </div>
    </PlayerShell>
  );
}
