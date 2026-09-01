import { useState } from 'react';
import type { AppState } from '../../types';
import PlayerShell from './PlayerShell';

export default function ExerciseTranscodingWrite({ onExerciseComplete }: AppState) {
  const [input, setInput] = useState('');
  const [played, setPlayed] = useState(false);
  const [errors, setErrors] = useState(0);

  const correct = '2438';

  function handlePlay() {
    setPlayed(true);
  }

  function handleSubmit() {
    if (input !== correct) setErrors(e => e + 1);
    onExerciseComplete();
  }

  function isWrongChar(i: number) {
    if (!input[i]) return false;
    return input[i] !== correct[i];
  }

  return (
    <PlayerShell label="Transcoding — Write" timer="00:47" errors={errors} sessionProgress={55}>
      <div className="flex w-full max-w-[440px] flex-col items-center gap-8">
        {/* Instruction */}
        <div className="text-center">
          <div className="mb-2 text-[13px] font-medium uppercase tracking-[0.06em] text-muted">Exercise 3 of 3</div>
          <h2 className="m-0 text-xl font-semibold text-fg">Write what you hear</h2>
          <p className="m-0 mt-1.5 text-sm text-muted">Press the speaker to listen, then type the number</p>
        </div>

        {/* Speaker button */}
        <button
          onClick={handlePlay}
          className={`flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border-2 transition-all ${
            played ? 'border-accent bg-accent-soft' : 'border-line bg-white'
          }`}
        >
          <span className="text-4xl">🔊</span>
          <span className={`text-[11px] font-medium ${played ? 'text-accent' : 'text-muted'}`}>{played ? 'Again' : 'Listen'}</span>
        </button>

        {/* Digit preview with error highlight */}
        {input && (
          <div className="flex gap-1.5">
            {input.split('').map((ch, i) => {
              const wrong = isWrongChar(i);
              return (
                <div
                  key={i}
                  className={`flex h-[52px] w-10 items-center justify-center rounded-md border-2 font-mono text-2xl font-bold ${
                    wrong ? 'border-danger bg-danger-soft text-danger underline decoration-danger' : 'border-line bg-white text-fg'
                  }`}
                >{ch}</div>
              );
            })}
          </div>
        )}

        {/* Text input */}
        <div className="flex w-full flex-col gap-2.5">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value.replace(/\D/g, '').slice(0, 8))}
            placeholder={played ? 'Type the number here...' : 'Listen first, then type'}
            disabled={!played}
            className={`w-full rounded-[10px] border-2 px-5 py-[18px] text-center font-mono text-3xl font-bold tracking-[0.12em] text-fg outline-none ${
              input ? 'border-accent' : 'border-line'
            } ${played ? 'bg-white opacity-100' : 'bg-surface opacity-50'}`}
          />
          <p className="m-0 text-center text-xs text-muted">
            💡 Each digit you type will be read back to you
          </p>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!input || !played}
          className={`w-full rounded-[10px] border-none py-4 font-sans text-lg font-semibold ${
            input && played ? 'cursor-pointer bg-accent text-white' : 'cursor-not-allowed bg-line text-muted'
          }`}
        >
          Submit answer →
        </button>
      </div>
    </PlayerShell>
  );
}
