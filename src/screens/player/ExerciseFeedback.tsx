import type { AppState } from '../../types';
import { TOTAL_EXERCISES } from '../../App';

const EXERCISE_LABELS: Record<string, string> = {
  'exercise-counting': 'Counting',
  'exercise-transcoding-read': 'Transcoding — Read',
  'exercise-transcoding-write': 'Transcoding — Write',
  'exercise-triplets': 'Triplets',
  'exercise-insertions': 'Insertions',
  'exercise-decimal-reading': 'Decimal Number Reading',
};

// Gauge color depends on a runtime accuracy value, so it's computed rather
// than a static Tailwind class — kept as an inline SVG stroke/fill.
function gaugeColor(value: number) {
  return value >= 85 ? '#2A7A2A' : value >= 70 ? '#E8750A' : '#C0392B';
}

function SpeedometerGauge({ value }: { value: number }) {
  const cx = 110, cy = 100, r = 78;
  const startX = cx - r, startY = cy;
  const endX = cx + r, endY = cy;
  const valueAngle = Math.PI - (value / 100) * Math.PI;
  const vx = cx + r * Math.cos(valueAngle);
  const vy = cy - r * Math.sin(valueAngle);
  const color = gaugeColor(value);

  return (
    <svg width={220} height={130} viewBox={`0 0 ${220} ${130}`}>
      <path d={`M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`} fill="none" stroke="#E0E0E0" strokeWidth="16" strokeLinecap="round" />
      {value > 0 && (
        <path d={`M ${startX} ${startY} A ${r} ${r} 0 0 1 ${vx.toFixed(2)} ${vy.toFixed(2)}`} fill="none" stroke={color} strokeWidth="16" strokeLinecap="round" />
      )}
      <circle cx={vx} cy={vy} r="7" fill={color} />
      <text x={cx} y={cy + 14} textAnchor="middle" className="font-mono text-[36px] font-bold fill-fg">{value}%</text>
      <text x={cx} y={cy + 32} textAnchor="middle" className="font-sans text-xs fill-muted">accuracy</text>
      <text x={startX - 4} y={startY + 14} textAnchor="middle" className="fill-muted text-[10px]">0</text>
      <text x={endX + 4} y={endY + 14} textAnchor="middle" className="fill-muted text-[10px]">100</text>
    </svg>
  );
}

export default function ExerciseFeedback({
  lastExercise, onTryAgain, onContinueExercise, isLastExercise,
  exerciseIndex, decimalReadingResult,
}: AppState) {
  const label = EXERCISE_LABELS[lastExercise] ?? 'Exercise';
  const isDecimal = lastExercise === 'exercise-decimal-reading';

  // Accuracy value
  const accuracy = isDecimal
    ? (decimalReadingResult.items > 0
        ? Math.round((decimalReadingResult.correct / decimalReadingResult.items) * 100)
        : 0)
    : 87; // prototype placeholder for other exercises

  const lowAccuracy = accuracy < 85;

  // Session % — fraction of exercises done so far
  const sessionPct = Math.round(((exerciseIndex + 1) / TOTAL_EXERCISES) * 100);

  // Stat row — different labels for decimal reading
  const stats = isDecimal
    ? [
        { label: 'Avg. Speed', value: `${decimalReadingResult.avgSpeed}s` },
        { label: 'Items Read', value: String(decimalReadingResult.items) },
        { label: 'Session', value: `${sessionPct}%` },
      ]
    : [
        { label: 'Avg. Speed', value: '4.2s' },
        { label: 'Exercise', value: `${exerciseIndex + 1} of ${TOTAL_EXERCISES}` },
        { label: 'Session', value: `${sessionPct}%` },
      ];

  return (
    <div className="flex min-h-full flex-col bg-surface font-sans">
      {/* Header */}
      <div className="flex h-[52px] items-center border-b border-line bg-white px-6">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[3px] bg-accent text-[10px] font-bold text-white">NT</div>
      </div>

      {/* Session progress bar */}
      <div className="h-1 bg-line">
        <div className="h-full rounded-r-sm bg-accent" style={{ width: `${sessionPct}%` }} />
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        <div className="flex w-full max-w-[440px] flex-col items-center gap-6">
          {/* Eyebrow + title */}
          <div className="text-center">
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              Exercise Complete
            </div>
            <h2 className="m-0 text-[22px] font-bold tracking-[-0.01em] text-fg">{label}</h2>
          </div>

          {/* Card with gauge + stats */}
          <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-line bg-white px-8 py-6">
            <SpeedometerGauge value={accuracy} />

            {/* Stats row */}
            <div className="grid w-full grid-cols-3 border-t border-line pt-4">
              {stats.map(({ label: l, value }) => (
                <div key={l} className="text-center">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-muted">{l}</div>
                  <div className="mt-1 font-mono text-lg font-bold text-fg">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback banner */}
          {lowAccuracy ? (
            <div className="w-full rounded-lg border border-warning bg-warning-soft px-4 py-3 text-center text-[13px] text-warning-text">
              Let's try again — you can do it! 💪
            </div>
          ) : (
            <div className="w-full rounded-lg border border-success bg-success-soft px-4 py-3 text-center text-[13px] text-success-text">
              Great work! Keep going! ⭐
            </div>
          )}

          {/* Action buttons */}
          <div className="flex w-full gap-3">
            <button
              onClick={onTryAgain}
              className={`rounded-[10px] border border-line py-3.5 font-sans text-base font-semibold transition-colors ${
                lowAccuracy ? 'flex-[2] bg-accent text-white' : 'flex-1 bg-white text-fg'
              }`}
            >
              ↺ Try Again
            </button>
            <button
              onClick={onContinueExercise}
              className={`rounded-[10px] border py-3.5 font-sans text-base font-semibold transition-colors ${
                lowAccuracy ? 'flex-1 border-line bg-white text-fg' : 'flex-[2] border-accent bg-accent text-white'
              }`}
            >
              {isLastExercise ? 'Finish Session →' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
