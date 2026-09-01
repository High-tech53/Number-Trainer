import { useState } from 'react';
import type { AppState } from '../../types';
import PlayerShell from './PlayerShell';

const KEYPAD = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '⌫', '0', '↵'];

export default function ExerciseCounting({ onExerciseComplete }: AppState) {
  const [input, setInput] = useState('');
  const [errors, setErrors] = useState(2);

  function handleKey(k: string) {
    if (k === '⌫') setInput(prev => prev.slice(0, -1));
    else if (k === '↵') {
      if (input !== '347') setErrors(e => e + 1);
      onExerciseComplete();
    } else if (input.length < 6) {
      setInput(prev => prev + k);
    }
  }

  return (
    <PlayerShell label="Counting" timer="00:23" errors={errors} sessionProgress={10}>
      <div className="flex w-full max-w-[480px] flex-col items-center gap-7">
        {/* Exercise instruction */}
        <div className="text-center">
          <div className="mb-2.5 text-[13px] font-medium uppercase tracking-[0.06em] text-muted">Exercise 1 of 3</div>
          <p className="m-0 text-lg font-medium text-fg">How many items do you count?</p>
        </div>

        {/* Number display */}
        <div className="w-full rounded-2xl border-2 border-line bg-white px-10 py-7 text-center">
          <div className="font-mono text-[88px] font-bold leading-none tracking-[-0.04em] text-fg">347</div>
          <div className="mt-2 text-[13px] text-muted">objects</div>
        </div>

        {/* Answer input */}
        <div className={`flex min-h-16 w-full items-center justify-center rounded-[10px] border-2 px-5 py-3.5 font-mono text-3xl font-bold tracking-[0.08em] text-fg transition-colors ${input ? 'border-accent' : 'border-line'} bg-white`}>
          {input || <span className="text-line">_ _ _</span>}
        </div>

        {/* Keypad */}
        <div className="grid w-full grid-cols-3 gap-2.5">
          {KEYPAD.map(k => (
            <button
              key={k}
              onClick={() => handleKey(k)}
              className={`cursor-pointer rounded-[10px] border py-[18px] font-bold ${
                k === '↵'
                  ? 'border-accent bg-accent text-lg text-white'
                  : k === '⌫'
                  ? 'border-line bg-surface font-sans text-lg text-fg'
                  : 'border-line bg-white font-mono text-2xl text-fg'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </PlayerShell>
  );
}
