import { useState } from 'react';
import type { AppState } from '../../types';
import PlayerShell from './PlayerShell';

const SLOTS = [
  { type: 'number' as const, value: '200' },
  { type: 'blank' as const, answer: '300', index: 0 },
  { type: 'number' as const, value: '400' },
  { type: 'blank' as const, answer: '500', index: 1 },
  { type: 'number' as const, value: '600' },
];

const CHOICES = ['250', '300', '350', '450', '500', '550'];

export default function ExerciseInsertions({ onExerciseComplete }: AppState) {
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [errors, setErrors] = useState(0);

  function place(blankIndex: number, value: string) {
    const slot = SLOTS.find(s => s.type === 'blank' && s.index === blankIndex);
    if (!slot || slot.type !== 'blank') return;
    if (value !== slot.answer) setErrors(e => e + 1);
    setPlaced(prev => ({ ...prev, [blankIndex]: value }));
  }

  const allPlaced = Object.keys(placed).length === SLOTS.filter(s => s.type === 'blank').length;

  return (
    <PlayerShell label="Insertions — Number Line" timer="01:04" errors={errors} sessionProgress={70}>
      <div className="flex w-full max-w-[560px] flex-col items-center gap-8">
        {/* Instruction */}
        <div className="text-center">
          <div className="mb-2 text-[13px] font-medium uppercase tracking-[0.06em] text-muted">Number Line</div>
          <h2 className="m-0 text-xl font-semibold text-fg">Place the missing numbers in the correct gaps</h2>
        </div>

        {/* Target numbers */}
        <div className="flex flex-wrap justify-center gap-1.5 rounded-[10px] border border-accent bg-accent-soft px-5 py-2.5">
          <span className="text-[13px] font-semibold text-accent">Place:</span>
          {CHOICES.map(c => {
            const used = Object.values(placed).includes(c);
            return (
              <span key={c} className={`font-mono text-sm font-bold ${used ? 'text-muted line-through' : 'text-fg'}`}>{c}</span>
            );
          })}
        </div>

        {/* Number line */}
        <div className="relative flex w-full items-center">
          {/* Line */}
          <div className="absolute left-0 right-0 top-1/2 z-0 h-[3px] bg-line" />
          <div className="relative z-10 flex w-full items-center justify-between">
            {SLOTS.map((slot, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                {slot.type === 'number' ? (
                  <>
                    <div className="h-2 w-2 rounded-full bg-fg" />
                    <span className="font-mono text-lg font-bold text-fg">{slot.value}</span>
                  </>
                ) : (
                  <>
                    <div className={`h-2 w-2 rounded-full ${placed[slot.index] ? 'bg-success' : 'bg-accent'}`} />
                    <div className={`flex h-[46px] w-[70px] items-center justify-center rounded-lg border-2 border-dashed font-mono text-lg font-bold ${
                      placed[slot.index] ? 'border-success bg-success-soft text-success' : 'border-accent bg-accent-soft text-accent'
                    }`}>
                      {placed[slot.index] || '?'}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Choice buttons */}
        {!allPlaced && (
          <div className="flex w-full flex-col gap-3">
            {SLOTS.filter(s => s.type === 'blank').map(slot => {
              if (slot.type !== 'blank') return null;
              if (placed[slot.index]) return null;
              return (
                <div key={slot.index}>
                  <div className="mb-2 text-[13px] font-medium text-muted">Gap {slot.index + 1}: tap to place a number</div>
                  <div className="flex flex-wrap gap-2">
                    {CHOICES.filter(c => !Object.values(placed).includes(c)).map(c => (
                      <button
                        key={c}
                        onClick={() => place(slot.index, c)}
                        className="cursor-pointer rounded-lg border border-line bg-white px-[18px] py-2.5 font-mono text-base font-bold text-fg"
                      >{c}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={onExerciseComplete}
          disabled={!allPlaced}
          className={`w-full rounded-[10px] border-none py-4 font-sans text-lg font-semibold ${
            allPlaced ? 'cursor-pointer bg-accent text-white' : 'cursor-not-allowed bg-line text-muted'
          }`}
        >
          {allPlaced ? 'Great! Continue →' : 'Fill all gaps to continue'}
        </button>
      </div>
    </PlayerShell>
  );
}
