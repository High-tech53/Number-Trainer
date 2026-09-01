import { useState } from 'react';
import type { Screen } from '../../types';

// 3x3 grid puzzle, numbered 1-9
const CORRECT_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const COLORS = [
  '#FFD6D6', '#FFE8D6', '#FFFFD6', '#D6FFD6', '#D6FFFF',
  '#D6D6FF', '#FFD6FF', '#E8D6FF', '#D6FFE8',
];

export default function MiniGamePuzzle({ navigate }: { navigate: (s: Screen) => void }) {
  const [tray, setTray] = useState([3, 7, 1, 5, 9, 2, 8, 4, 6]);
  const [grid, setGrid] = useState<(number | null)[]>(Array(9).fill(null));
  const [selected, setSelected] = useState<number | null>(null);

  const done = grid.every((v, i) => v === i + 1);

  function handleTrayClick(val: number) {
    setSelected(val);
  }

  function handleGridClick(pos: number) {
    if (grid[pos] !== null || selected === null) return;
    const newGrid = [...grid];
    newGrid[pos] = selected;
    setGrid(newGrid);
    setTray(prev => prev.filter(v => v !== selected));
    setSelected(null);
  }

  function handleGridRemove(pos: number) {
    const val = grid[pos];
    if (val === null) return;
    const newGrid = [...grid];
    newGrid[pos] = null;
    setGrid(newGrid);
    setTray(prev => [...prev, val].sort((a, b) => a - b));
  }

  function handleReset() {
    setTray([3, 7, 1, 5, 9, 2, 8, 4, 6]);
    setGrid(Array(9).fill(null));
    setSelected(null);
  }

  return (
    <div className="flex min-h-full flex-col bg-surface font-sans">
      {/* Header */}
      <div className="flex h-[52px] items-center justify-between border-b border-line bg-white px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[3px] bg-accent text-[10px] font-bold text-white">NT</div>
          <span className="text-sm font-semibold text-fg">Mini-Game: Number Puzzle</span>
        </div>
        <div className="flex gap-2.5">
          <button onClick={handleReset} className="cursor-pointer rounded border border-line bg-transparent px-3 py-1 font-sans text-xs text-muted">↺ Reset</button>
          <button onClick={() => navigate('session-feedback')} className="cursor-pointer border-none bg-transparent font-sans text-xs text-muted">Finish</button>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center gap-6 p-6">
        {/* Instruction */}
        <div className="flex w-full max-w-[600px] items-center gap-4 rounded-xl border border-line bg-white px-6 py-3">
          <span className="text-2xl">🧩</span>
          <div>
            <div className="text-sm font-semibold text-fg">Put the pieces in the right order!</div>
            <div className="text-[13px] text-muted">
              {done ? '🎉 Perfect! All pieces in the right place!' : selected !== null ? `Placing piece ${selected} — tap a grid slot` : 'Tap a piece from the tray, then tap where to place it'}
            </div>
          </div>
          {done && (
            <button
              onClick={() => navigate('session-feedback')}
              className="ml-auto cursor-pointer rounded-lg border-none bg-accent px-5 py-2 font-sans text-sm font-semibold text-white"
            >
              Finish →
            </button>
          )}
        </div>

        <div className="flex items-start gap-8">
          {/* Puzzle grid */}
          <div>
            <div className="mb-2.5 text-center text-xs font-medium uppercase tracking-[0.06em] text-muted">Puzzle Grid</div>
            <div className="grid grid-cols-3 gap-1.5" style={{ gridTemplateColumns: 'repeat(3, 110px)' }}>
              {CORRECT_ORDER.map((correctVal, pos) => {
                const placed = grid[pos];
                const isCorrect = placed === correctVal;
                return (
                  <div
                    key={pos}
                    onClick={() => placed !== null ? handleGridRemove(pos) : handleGridClick(pos)}
                    className={`flex h-[110px] w-[110px] flex-col items-center justify-center gap-1 rounded-[10px] border-2 transition-all ${
                      placed !== null ? 'border-solid' : 'border-dashed border-line'
                    } ${placed !== null ? (isCorrect ? 'border-success cursor-pointer' : 'border-line cursor-pointer') : selected !== null ? 'cursor-pointer' : 'cursor-default'}`}
                    style={{ background: placed !== null ? COLORS[placed - 1] : '#F5F5F5' }}
                  >
                    {placed !== null ? (
                      <>
                        <span className="font-mono text-[32px] font-bold text-fg">{placed}</span>
                        <span className="text-[10px] text-muted">pos {pos + 1}</span>
                        {isCorrect && <span className="text-xs text-success">✓</span>}
                      </>
                    ) : (
                      <span className="text-lg text-line">#{pos + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Piece tray */}
          <div>
            <div className="mb-2.5 text-center text-xs font-medium uppercase tracking-[0.06em] text-muted">Piece Tray</div>
            <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(3, 76px)' }}>
              {tray.sort((a, b) => a - b).map(val => (
                <button
                  key={val}
                  onClick={() => handleTrayClick(val)}
                  className={`flex h-[76px] w-[76px] items-center justify-center rounded-[10px] border-2 font-mono text-[28px] font-bold transition-all ${
                    selected === val ? 'scale-105 border-accent bg-accent text-white' : 'scale-100 border-line text-fg'
                  }`}
                  style={{ background: selected === val ? undefined : COLORS[val - 1] }}
                >
                  {val}
                </button>
              ))}
              {tray.length === 0 && (
                <div className="col-span-3 p-5 text-center text-[13px] text-muted">
                  {done ? '✓ All placed!' : 'All pieces placed'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-[160px] rounded-full bg-line">
            <div className="h-full rounded-full bg-success" style={{ width: `${(grid.filter((v, i) => v === i + 1).length / 9) * 100}%` }} />
          </div>
          <span className="font-mono text-xs text-muted">
            {grid.filter((v, i) => v === i + 1).length}/9 correct
          </span>
        </div>
      </div>
    </div>
  );
}
