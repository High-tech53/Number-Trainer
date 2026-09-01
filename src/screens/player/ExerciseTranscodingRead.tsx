import { useState } from 'react';
import type { AppState } from '../../types';
import PlayerShell from './PlayerShell';

const NUMBERS = ['1,247', '583', '9,016', '2,438', '761', '4,305', '1,072', '8,950', '327', '6,184', '493', '2,801'];

export default function ExerciseTranscodingRead({ onExerciseComplete }: AppState) {
  const [marks, setMarks] = useState<Record<number, 'correct' | 'wrong' | null>>({});

  function mark(i: number, v: 'correct' | 'wrong') {
    setMarks(prev => ({ ...prev, [i]: prev[i] === v ? null : v }));
  }

  const marked = Object.values(marks).filter(Boolean).length;

  return (
    <PlayerShell label="Transcoding — Read" timer="01:12" errors={1} sessionProgress={40}>
      <div className="flex w-full max-w-[560px] flex-col items-center gap-6">
        {/* Instruction */}
        <div className="text-center">
          <div className="mb-2 text-[13px] font-medium uppercase tracking-[0.06em] text-muted">Exercise 2 of 3</div>
          <h2 className="m-0 text-xl font-semibold text-fg">Read each number aloud</h2>
          <p className="m-0 mt-1.5 text-sm text-muted">Mark ✓ if correct, ✕ if the child makes an error</p>
        </div>

        {/* Number grid */}
        <div className="grid w-full grid-cols-3 gap-2.5">
          {NUMBERS.map((num, i) => {
            const state = marks[i];
            return (
              <div
                key={i}
                className={`flex flex-col items-center gap-2.5 rounded-[10px] border-2 px-3 py-3.5 ${
                  state === 'correct'
                    ? 'border-success bg-success-soft'
                    : state === 'wrong'
                    ? 'border-danger bg-danger-soft'
                    : 'border-line bg-white'
                }`}
              >
                <span className="font-mono text-[22px] font-bold tracking-[0.04em] text-fg">{num}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => mark(i, 'correct')}
                    className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border text-sm ${
                      state === 'correct' ? 'border-success bg-success text-white' : 'border-line bg-white text-muted'
                    }`}
                  >✓</button>
                  <button
                    onClick={() => mark(i, 'wrong')}
                    className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border text-sm ${
                      state === 'wrong' ? 'border-danger bg-danger text-white' : 'border-line bg-white text-muted'
                    }`}
                  >✕</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress + Submit */}
        <div className="flex w-full items-center justify-between">
          <span className="text-[13px] text-muted">{marked} / {NUMBERS.length} marked</span>
          <button
            onClick={onExerciseComplete}
            className="cursor-pointer rounded-[10px] border-none bg-accent px-7 py-3 font-sans text-base font-semibold text-white"
          >
            Submit →
          </button>
        </div>
      </div>
    </PlayerShell>
  );
}
