import { useState, useEffect, useRef, useCallback } from 'react';
import type { AppState } from '../../types';
import PlayerShell from './PlayerShell';

// ─── Number generation ────────────────────────────────────────────────────────
// Uses European/Italian notation: period = thousands sep, comma = decimal sep.
// Config mirrors app parameter system (digit range, decimal-place range).
const CONFIG = {
  wholeDigitsMin: 1,
  wholeDigitsMax: 4,
  decimalPlacesMin: 0,
  decimalPlacesMax: 2,
};

function formatThousands(n: number): string {
  return n.toLocaleString('de-DE').replace(/\./g, '·').replace(/,/g, '.').replace(/·/g, ',');
}

function generateNumber(): string {
  const maxWhole = Math.pow(10, CONFIG.wholeDigitsMax) - 1;
  const minWhole = Math.pow(10, CONFIG.wholeDigitsMin - 1);
  const wholePart = Math.floor(Math.random() * (maxWhole - minWhole + 1)) + minWhole;
  const decPlaces = Math.floor(
    Math.random() * (CONFIG.decimalPlacesMax - CONFIG.decimalPlacesMin + 1)
  ) + CONFIG.decimalPlacesMin;

  const wholeStr = formatThousands(wholePart);

  if (decPlaces === 0) return wholeStr;

  // Generate decimal digits, never trailing zeros for 2-place
  let dec = Math.floor(Math.random() * Math.pow(10, decPlaces));
  if (decPlaces === 2 && dec % 10 === 0) dec += 1;
  const decStr = dec.toString().padStart(decPlaces, '0');
  return `${wholeStr},${decStr}`;
}

// ─── Annotation chip ─────────────────────────────────────────────────────────
function AnnotationChip({ text }: { text: string }) {
  return (
    <div
      title={text}
      className="absolute right-3.5 top-3 cursor-help select-none whitespace-nowrap rounded border border-dashed border-[#D4B800] bg-[#FFF9C4] px-2 py-[3px] font-mono text-[10px] text-[#7A6800]"
    >
      ⏱ stopwatch hidden — annotation
    </div>
  );
}

// ─── Grading button ───────────────────────────────────────────────────────────
interface GradeBtnProps {
  label: string;
  icon: string;
  colorClass: string;
  onClick: () => void;
}

function GradeBtn({ label, icon, colorClass, onClick }: GradeBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-1.5 rounded-xl border-none py-5 font-sans text-lg font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-75 hover:brightness-90 active:scale-[0.97] active:shadow-none ${colorClass}`}
    >
      <span className="text-[28px] leading-none">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// ─── Stop button ─────────────────────────────────────────────────────────────
function StopBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border-[1.5px] border-line bg-white px-7 py-[11px] font-sans text-sm font-medium text-fg transition-transform duration-75 hover:border-muted hover:bg-surface active:scale-[0.97]"
    >
      <span className="text-[13px]">■</span>
      Stop exercise
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ExerciseDecimalReading({ onExerciseComplete, setDecimalReadingResult, exerciseIndex }: AppState) {
  const [current, setCurrent] = useState(generateNumber);
  const [animKey, setAnimKey] = useState(0);
  const [items, setItems] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [times, setTimes] = useState<number[]>([]);

  const itemStartRef = useRef(Date.now());

  const sessionProgress = Math.round(((exerciseIndex + 0.5) / 4) * 100);

  const advance = useCallback((wasCorrect: boolean) => {
    const elapsed = (Date.now() - itemStartRef.current) / 1000;
    setItems(n => n + 1);
    if (wasCorrect) setCorrect(n => n + 1);
    setTimes(prev => [...prev, elapsed]);

    const next = generateNumber();
    setCurrent(next);
    setAnimKey(k => k + 1);
    itemStartRef.current = Date.now();
  }, []);

  function handleStop() {
    const elapsed = (Date.now() - itemStartRef.current) / 1000;
    const totalItems = items + 1;
    const allTimes = [...times, elapsed];
    const avg = allTimes.reduce((a, b) => a + b, 0) / allTimes.length;

    setDecimalReadingResult({
      items: totalItems,
      correct: correct,
      avgSpeed: parseFloat(avg.toFixed(1)),
    });
    onExerciseComplete();
  }

  // Reset item timer when number changes
  useEffect(() => {
    itemStartRef.current = Date.now();
  }, [animKey]);

  const accuracyNow = items === 0 ? 100 : Math.round((correct / items) * 100);

  return (
    <PlayerShell
      label="Decimal Number Reading"
      timer={undefined}
      showErrors={false}
      sessionProgress={sessionProgress}
    >
      <div className="flex w-full max-w-[520px] flex-col items-center gap-7">
        {/* Eyebrow */}
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          Decimal Number Reading · Exercise {exerciseIndex + 1} of 4
        </div>

        {/* Number card */}
        <div className="relative flex w-full flex-col items-center gap-4 rounded-[20px] border-[1.5px] border-line bg-white px-10 pb-9 pt-12 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <AnnotationChip text="Stopwatch starts when number appears; elapsed time per item is logged on True/False tap but not displayed to the child." />

          {/* The number — key drives the CSS animation on each swap */}
          <div
            key={animKey}
            className="decimal-number-appear select-none text-center font-mono text-7xl font-bold leading-none tracking-[-0.02em] text-fg"
          >
            {current}
          </div>

          {/* Live counter */}
          <div className="font-mono text-[13px] text-muted">
            Item {items + 1} · Accuracy so far: {accuracyNow}%
          </div>
        </div>

        {/* Grading buttons — True / False (matched pair) */}
        <div className="flex w-full gap-3">
          <GradeBtn label="True" icon="✓" colorClass="bg-[#2E7D32] hover:bg-[#1B5E20]" onClick={() => advance(true)} />
          <GradeBtn label="False" icon="✕" colorClass="bg-[#C62828] hover:bg-[#B71C1C]" onClick={() => advance(false)} />
        </div>

        {/* Stop — visually secondary, set apart with margin */}
        <div className="mt-1">
          <StopBtn onClick={handleStop} />
        </div>

        {/* Prototype annotation */}
        <div className="mt-1 w-full rounded-md border border-dashed border-[#D4B800] bg-[#FFF9C4] px-4 py-2.5 text-[11px] leading-relaxed text-[#7A6800]">
          <strong>Prototype note:</strong> True/False log the response + elapsed time per item, then immediately generate a new number (fade-in transition). Stop ends the exercise and sends stats to the Result screen. Number generation is configured by digit range (1–4) and decimal-place range (0–2) from the patient's Parameters tab.
        </div>
      </div>
    </PlayerShell>
  );
}
