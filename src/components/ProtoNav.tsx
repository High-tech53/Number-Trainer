import { useState } from 'react';
import type { Screen } from '../types';

const ITEMS: { label: string; screen: Screen; group: string }[] = [
  { label: 'Style Guide', screen: 'style-guide', group: 'Shared' },
  { label: 'Login', screen: 'login', group: 'Shared' },
  { label: 'Patient List', screen: 'patient-list', group: 'Clinician' },
  { label: 'Patient Profile', screen: 'patient-profile', group: 'Clinician' },
  { label: 'Session Start', screen: 'session-start', group: 'Player' },
  { label: 'Counting', screen: 'exercise-counting', group: 'Player' },
  { label: 'Transcoding Read', screen: 'exercise-transcoding-read', group: 'Player' },
  { label: 'Transcoding Write', screen: 'exercise-transcoding-write', group: 'Player' },
  { label: 'Triplets', screen: 'exercise-triplets', group: 'Player' },
  { label: 'Insertions', screen: 'exercise-insertions', group: 'Player' },
  { label: 'Decimal Number Reading', screen: 'exercise-decimal-reading', group: 'Player' },
  { label: 'Exercise Feedback', screen: 'exercise-feedback', group: 'Player' },
  { label: 'Session Feedback', screen: 'session-feedback', group: 'Player' },
  { label: 'Connect the Dots', screen: 'mini-game-dots', group: 'Mini-Games' },
  { label: 'Number Puzzle', screen: 'mini-game-puzzle', group: 'Mini-Games' },
];

const GROUPS = ['Shared', 'Clinician', 'Player', 'Mini-Games'];

export default function ProtoNav({ navigate, currentScreen }: { navigate: (s: Screen) => void; currentScreen: Screen }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-[999] bg-black/20" />
      )}

      {open && (
        <div className="fixed bottom-16 right-4 z-[1000] w-[260px] overflow-hidden rounded-[10px] border border-line bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          <div className="border-b border-line px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
            Prototype Navigator
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {GROUPS.map(group => (
              <div key={group}>
                <div className="bg-surface px-3.5 pb-1 pt-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-muted">{group}</div>
                {ITEMS.filter(i => i.group === group).map(({ label, screen }) => {
                  const active = currentScreen === screen;
                  return (
                    <button
                      key={screen}
                      onClick={() => { navigate(screen); setOpen(false); }}
                      className={`flex w-full items-center gap-1.5 px-3.5 py-2 text-left font-sans text-[13px] ${
                        active ? 'bg-accent-soft font-semibold text-accent' : 'font-normal text-fg'
                      }`}
                    >
                      {active && <span className="inline-block h-1 w-1 rounded-full bg-accent" />}
                      {label}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(v => !v)}
        title="Prototype Navigator"
        className={`fixed bottom-4 right-4 z-[1001] flex h-10 w-10 items-center justify-center rounded-full text-base text-white shadow-[0_2px_12px_rgba(0,0,0,0.2)] ${
          open ? 'bg-fg' : 'bg-accent'
        }`}
      >
        {open ? '×' : '⚡'}
      </button>
    </>
  );
}
