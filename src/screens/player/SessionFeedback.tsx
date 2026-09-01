import type { AppState } from '../../types';

function ProgressRing({ progress, size = 120 }: { progress: number; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E0E0E0" strokeWidth="10" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#2D6CDF" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2 + 6} textAnchor="middle" className="fill-fg font-mono text-xl font-bold">{progress}%</text>
    </svg>
  );
}

export default function SessionFeedback({ navigate }: AppState) {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans">
      {/* Minimal header */}
      <div className="flex h-[52px] items-center border-b border-line bg-white px-6">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[3px] bg-accent text-[10px] font-bold text-white">NT</div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="flex w-full max-w-[480px] flex-col items-center gap-7">
          {/* Header */}
          <div className="text-center">
            <h1 className="m-0 text-4xl font-bold tracking-[-0.02em] text-fg">Session Complete! 🎉</h1>
            <p className="m-0 mt-2 text-base text-muted">You did an amazing job today, Emma!</p>
          </div>

          {/* Summary card */}
          <div className="w-full rounded-2xl border border-line bg-white px-8 py-7">
            {/* Stars */}
            <div className="mb-5 flex justify-center gap-1.5 text-4xl">
              ⭐⭐⭐<span className="opacity-30">⭐⭐</span>
            </div>

            {/* Progress ring + stats */}
            <div className="mb-5 flex items-center justify-around">
              <div className="text-center">
                <ProgressRing progress={100} />
                <div className="mt-1.5 text-xs text-muted">Session done</div>
              </div>
              <div className="flex flex-col gap-3.5">
                {[
                  { label: 'Exercises', value: '3 / 3' },
                  { label: 'Avg. Accuracy', value: '87%' },
                  { label: 'Time', value: '21 min' },
                  { label: 'Errors', value: '4' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-baseline justify-between gap-8">
                    <span className="text-[13px] text-muted">{label}</span>
                    <span className="font-mono text-[15px] font-bold text-fg">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-success bg-success-soft px-4 py-2.5 text-center text-[13px] text-success-text">
              ✓ Well done! You're on track. Keep it up! 🌟
            </div>
          </div>

          {/* Exit buttons */}
          <div className="grid w-full grid-cols-2 gap-3">
            <button
              onClick={() => navigate('mini-game-dots')}
              className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-line bg-white px-4 py-5 font-sans"
            >
              <span className="text-4xl">🏠</span>
              <div>
                <div className="text-[15px] font-bold text-fg">Play Games</div>
                <div className="text-xs text-muted">Connect the Dots & Puzzle</div>
              </div>
            </button>
            <button
              onClick={() => navigate('patient-list')}
              className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-none bg-accent px-4 py-5 font-sans"
            >
              <span className="text-4xl brightness-[10]">🏁</span>
              <div>
                <div className="text-[15px] font-bold text-white">Finish</div>
                <div className="text-xs text-white/70">Return to console</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
