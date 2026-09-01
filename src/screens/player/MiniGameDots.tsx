import { useState } from 'react';
import type { Screen } from '../../types';

// Dots arranged roughly as a cat silhouette
const DOTS = [
  { id: 1, x: 200, y: 280 }, { id: 2, x: 260, y: 220 }, { id: 3, x: 300, y: 160 },
  { id: 4, x: 340, y: 100 }, { id: 5, x: 380, y: 60 }, { id: 6, x: 420, y: 100 },
  { id: 7, x: 460, y: 160 }, { id: 8, x: 500, y: 220 }, { id: 9, x: 540, y: 280 },
  { id: 10, x: 520, y: 340 }, { id: 11, x: 480, y: 380 }, { id: 12, x: 440, y: 400 },
  { id: 13, x: 380, y: 420 }, { id: 14, x: 320, y: 400 }, { id: 15, x: 260, y: 380 },
  { id: 16, x: 220, y: 340 },
];

export default function MiniGameDots({ navigate }: { navigate: (s: Screen) => void }) {
  const [next, setNext] = useState(1);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  function handleDot(dot: typeof DOTS[number]) {
    if (dot.id !== next) return;
    if (next > 1) {
      const prev = DOTS.find(d => d.id === next - 1)!;
      setLines(l => [...l, { x1: prev.x, y1: prev.y, x2: dot.x, y2: dot.y }]);
    }
    setNext(n => n + 1);
  }

  const done = next > DOTS.length;

  return (
    <div className="flex min-h-full flex-col bg-surface font-sans">
      {/* Header */}
      <div className="flex h-[52px] items-center justify-between border-b border-line bg-white px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[3px] bg-accent text-[10px] font-bold text-white">NT</div>
          <span className="text-sm font-semibold text-fg">Mini-Game: Connect the Dots</span>
        </div>
        <button onClick={() => navigate('session-feedback')} className="cursor-pointer border-none bg-transparent font-sans text-xs text-muted">Exit game</button>
      </div>

      <div className="flex flex-1 flex-col items-center p-6">
        {/* Instruction banner */}
        <div className="mb-4 flex items-center gap-5 rounded-xl border border-line bg-white px-6 py-3">
          <span className="text-xl">🐱</span>
          <div>
            <div className="text-sm font-semibold text-fg">Connect the dots in order to reveal the hidden picture!</div>
            <div className="text-[13px] text-muted">
              {done ? '🎉 You did it! Amazing!' : `Next: tap dot ${next}`}
            </div>
          </div>
          {done && (
            <button
              onClick={() => navigate('mini-game-puzzle')}
              className="ml-auto cursor-pointer rounded-lg border-none bg-accent px-5 py-2 font-sans text-sm font-semibold text-white"
            >
              Next Game →
            </button>
          )}
        </div>

        {/* Canvas */}
        <div className="relative overflow-hidden rounded-xl border border-line bg-white">
          <svg width="740" height="480" viewBox="0 0 740 480">
            {/* Completed lines */}
            {lines.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#2D6CDF" strokeWidth="2.5" strokeLinecap="round" />
            ))}

            {/* Dots */}
            {DOTS.map(dot => {
              const connected = dot.id < next;
              const isNext = dot.id === next;
              return (
                <g key={dot.id} onClick={() => handleDot(dot)} className={isNext ? 'cursor-pointer' : 'cursor-default'}>
                  <circle
                    cx={dot.x} cy={dot.y} r={isNext ? 16 : 12}
                    fill={connected ? '#2D6CDF' : isNext ? '#E3EEFF' : '#F5F5F5'}
                    stroke={connected ? '#2D6CDF' : isNext ? '#2D6CDF' : '#E0E0E0'}
                    strokeWidth={isNext ? 2.5 : 1.5}
                  />
                  <text x={dot.x} y={dot.y + 5} textAnchor="middle" className="font-mono text-[11px] font-bold" fill={connected ? '#FFFFFF' : isNext ? '#2D6CDF' : '#9E9E9E'}>
                    {dot.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 w-[200px] rounded-full bg-line">
            <div className="h-full rounded-full bg-accent" style={{ width: `${((next - 1) / DOTS.length) * 100}%` }} />
          </div>
          <span className="font-mono text-xs text-muted">{next - 1}/{DOTS.length}</span>
        </div>
      </div>
    </div>
  );
}
