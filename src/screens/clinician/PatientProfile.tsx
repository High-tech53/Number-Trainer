import { useState } from 'react';
import type { AppState } from '../../types';
import ClinicianShell from './ClinicianShell';

// --- Overview Tab ---
function OverviewTab() {
  const stats = [
    { label: 'Sessions Completed', value: '24', sub: 'since Mar 2026' },
    { label: 'Current Accuracy', value: '91%', sub: 'last 3 sessions avg' },
    { label: 'Current Level', value: '12', sub: 'Counting: L12 · Coding: L9' },
  ];

  const recentSessions = [
    { date: '2026-08-25', type: 'In-clinic', status: 'completed', exercises: 6, accuracy: 91, duration: '22 min' },
    { date: '2026-08-22', type: 'Home', status: 'completed', exercises: 5, accuracy: 88, duration: '18 min' },
    { date: '2026-08-19', type: 'In-clinic', status: 'completed', exercises: 6, accuracy: 85, duration: '24 min' },
    { date: '2026-08-17', type: 'Home', status: 'interrupted', exercises: 3, accuracy: 79, duration: '11 min' },
    { date: '2026-08-13', type: 'In-clinic', status: 'completed', exercises: 6, accuracy: 82, duration: '22 min' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, sub }) => (
          <div key={label} className="rounded border border-line bg-white px-5 py-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">{label}</div>
            <div className="font-mono text-[28px] font-bold tracking-[-0.02em] text-fg">{value}</div>
            <div className="mt-1 text-xs text-muted">{sub}</div>
          </div>
        ))}
      </div>

      {/* Recent sessions */}
      <div className="overflow-hidden rounded border border-line bg-white">
        <div className="border-b border-line px-5 py-3.5">
          <h3 className="m-0 text-sm font-bold text-fg">Recent Sessions</h3>
        </div>
        {recentSessions.map((s, i) => (
          <div
            key={i}
            className={`grid items-center gap-0 px-5 py-3 ${i < recentSessions.length - 1 ? 'border-b border-line' : ''}`}
            style={{ gridTemplateColumns: '120px 90px 100px 80px 80px 80px' }}
          >
            <span className="font-mono text-xs text-fg">{s.date}</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px]">{s.type === 'In-clinic' ? '▲' : '●'}</span>
              <span className="text-xs text-muted">{s.type}</span>
            </div>
            <span className={`w-fit rounded-full px-2 py-0.5 text-[11px] font-medium ${
              s.status === 'completed' ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'
            }`}>{s.status}</span>
            <span className="font-mono text-xs text-fg">{s.exercises} ex.</span>
            <span className={`font-mono text-xs font-semibold ${
              s.accuracy >= 85 ? 'text-success' : s.accuracy >= 70 ? 'text-warning' : 'text-danger'
            }`}>{s.accuracy}%</span>
            <span className="text-xs text-muted">{s.duration}</span>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="rounded border border-line bg-white px-5 py-4">
        <h3 className="m-0 mb-3 text-sm font-bold text-fg">Clinician Notes</h3>
        <p className="m-0 text-[13px] leading-relaxed text-muted">Emma shows consistent improvement in counting exercises. Transcoding (writing) remains the weakest area — consider increasing syntactic marker support at Level 13. Parent reports good motivation at home sessions. Next in-clinic review: 2026-09-01.</p>
      </div>
    </div>
  );
}

// --- Parameters Tab ---
function ParametersTab() {
  const [exercises, setExercises] = useState({
    counting: true, transcodingRead: true, transcodingWrite: true, triplets: true, insertions: false, games: true,
  });
  const [selectedEx, setSelectedEx] = useState('counting');
  const [saved, setSaved] = useState(false);

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: '200px 1fr' }}>
      {/* Exercise path */}
      <div className="h-fit overflow-hidden rounded border border-line bg-white">
        <div className="border-b border-line px-4 py-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Exercise Path</div>
        </div>
        {[
          { key: 'counting', label: 'Counting' },
          { key: 'transcodingRead', label: 'Transcoding — Read' },
          { key: 'transcodingWrite', label: 'Transcoding — Write' },
          { key: 'triplets', label: 'Triplets / Comparison' },
          { key: 'insertions', label: 'Insertions' },
          { key: 'games', label: 'Mini-Games' },
        ].map(({ key, label }) => {
          const active = selectedEx === key;
          return (
            <div
              key={key}
              onClick={() => setSelectedEx(key)}
              className={`flex cursor-pointer items-center justify-between border-b border-line px-4 py-2.5 ${active ? 'bg-accent-soft' : ''}`}
            >
              <span className={`text-[13px] ${active ? 'font-medium text-accent' : 'font-normal text-fg'}`}>{label}</span>
              <input
                type="checkbox"
                checked={exercises[key as keyof typeof exercises]}
                onChange={e => setExercises(prev => ({ ...prev, [key]: e.target.checked }))}
                onClick={e => e.stopPropagation()}
              />
            </div>
          );
        })}
      </div>

      {/* Settings panel */}
      <div className="flex flex-col gap-4">
        {/* Exercise settings */}
        <div className="rounded border border-line bg-white px-6 py-5">
          <h3 className="m-0 mb-5 text-sm font-bold text-fg">Counting — Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Matrix cell count', options: ['6 cells (2×3)', '9 cells (3×3)', '12 cells (3×4)'], value: '9 cells (3×3)' },
              { label: 'Number of digits', options: ['1 digit', '2 digits', '3 digits', '4 digits'], value: '3 digits' },
              { label: 'Numeric range', options: ['1–99', '1–999', '1–9,999', '1–99,999'], value: '1–999' },
              { label: 'Zero-padding', options: ['Off', 'On'], value: 'Off' },
            ].map(({ label, options, value }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-fg">{label}</label>
                <select defaultValue={value} className="rounded border border-line bg-white px-3 py-2 font-sans text-[13px] text-fg">
                  {options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            {[
              { label: 'Thousands separator', key: 'sep', defaultChecked: true },
              { label: 'Syntactic marker', key: 'syn', defaultChecked: false },
            ].map(({ label, key, defaultChecked }) => (
              <div key={key} className="flex items-center gap-2">
                <input type="checkbox" id={key} defaultChecked={defaultChecked} />
                <label htmlFor={key} className="text-[13px] text-fg">{label}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Session settings */}
        <div className="rounded border border-line bg-white px-6 py-5">
          <h3 className="m-0 mb-4 text-sm font-bold text-fg">Session Configuration</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-fg">Frequency (per week)</label>
              <select defaultValue="3" className="rounded border border-line bg-white px-3 py-2 font-sans text-[13px] text-fg">
                {[2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}×</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-fg">Session duration (min)</label>
              <select defaultValue="20" className="rounded border border-line bg-white px-3 py-2 font-sans text-[13px] text-fg">
                {[15, 20, 25, 30].map(n => <option key={n} value={n}>{n} min</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-fg">Player font size</label>
              <select defaultValue="large" className="rounded border border-line bg-white px-3 py-2 font-sans text-[13px] text-fg">
                {['Small', 'Medium', 'Large', 'X-Large'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2.5">
          <button className="rounded border border-line bg-transparent px-5 py-[9px] font-sans text-sm text-fg">Cancel</button>
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            className={`rounded border-none px-6 py-[9px] font-sans text-sm font-semibold text-white transition-colors ${saved ? 'bg-success' : 'bg-accent'}`}
          >
            {saved ? '✓ Saved' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Monitoring SVG Chart ---
function MonitoringChart() {
  const sessions = [
    { day: 0, type: 'clinic', acc: 78, status: 'completed' },
    { day: 2, type: 'home', acc: 74, status: 'completed' },
    { day: 5, type: 'clinic', acc: 82, status: 'completed' },
    { day: 7, type: 'home', acc: 79, status: 'completed' },
    { day: 10, type: 'clinic', acc: 71, status: 'interrupted' },
    { day: 12, type: 'home', acc: 83, status: 'completed' },
    { day: 14, type: 'clinic', acc: 85, status: 'completed' },
    { day: 16, type: 'home', acc: 87, status: 'completed' },
    { day: 17, type: 'clinic', acc: 88, status: 'completed' },
    { day: 19, type: 'home', acc: 89, status: 'completed' },
    { day: 20, type: 'clinic', acc: 88, status: 'completed' },
    { day: 22, type: 'home', acc: 91, status: 'completed' },
    { day: 20, type: 'clinic', acc: 91, status: 'completed' },
  ];

  const W = 520, H = 160, padL = 40, padR = 16, padT = 12, padB = 28;
  const maxDay = 22;
  const minAcc = 60, maxAcc = 100;

  const toX = (day: number) => padL + (day / maxDay) * (W - padL - padR);
  const toY = (acc: number) => padT + ((maxAcc - acc) / (maxAcc - minAcc)) * (H - padT - padB);

  const sorted = [...sessions].sort((a, b) => a.day - b.day);
  const linePath = sorted.map((s, i) => `${i === 0 ? 'M' : 'L'} ${toX(s.day).toFixed(1)} ${toY(s.acc).toFixed(1)}`).join(' ');

  const yTicks = [60, 70, 80, 90, 100];
  const xLabels = ['Aug 5', 'Aug 10', 'Aug 15', 'Aug 20', 'Aug 25'];

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="font-mono">
      {/* Grid lines */}
      {yTicks.map(v => (
        <g key={v}>
          <line x1={padL} y1={toY(v)} x2={W - padR} y2={toY(v)} stroke="#E0E0E0" strokeWidth="1" />
          <text x={padL - 6} y={toY(v) + 4} textAnchor="end" fontSize="9" fill="#9E9E9E">{v}</text>
        </g>
      ))}
      {/* X labels */}
      {xLabels.map((l, i) => (
        <text key={l} x={toX(i * 5.5)} y={H - 6} textAnchor="middle" fontSize="9" fill="#9E9E9E">{l}</text>
      ))}
      {/* 85% threshold line */}
      <line x1={padL} y1={toY(85)} x2={W - padR} y2={toY(85)} stroke="#2D6CDF" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <text x={W - padR + 2} y={toY(85) + 3} fontSize="8" fill="#2D6CDF">85%</text>
      {/* Line */}
      <path d={linePath} fill="none" stroke="#E0E0E0" strokeWidth="1.5" />
      {/* Points */}
      {sessions.map((s, i) => {
        const x = toX(s.day), y = toY(s.acc);
        const color = s.status === 'completed' ? '#2A7A2A' : '#C0392B';
        return s.type === 'clinic' ? (
          <polygon key={i} points={`${x},${y - 6} ${x - 5},${y + 4} ${x + 5},${y + 4}`} fill={color} />
        ) : (
          <circle key={i} cx={x} cy={y} r="4.5" fill={color} />
        );
      })}
    </svg>
  );
}

// --- Monitoring Tab ---
function MonitoringTab({ onOpenDetail }: { onOpenDetail: () => void }) {
  const [subTab, setSubTab] = useState<'sessions' | 'path' | 'events'>('sessions');

  const allSessions = [
    { date: '2026-08-25', loc: 'In-clinic', status: 'completed', exercises: 6, accuracy: 91, level: 12, duration: '22 min' },
    { date: '2026-08-22', loc: 'Home', status: 'completed', exercises: 5, accuracy: 88, level: 12, duration: '18 min' },
    { date: '2026-08-19', loc: 'In-clinic', status: 'completed', exercises: 6, accuracy: 85, level: 11, duration: '24 min' },
    { date: '2026-08-17', loc: 'Home', status: 'interrupted', exercises: 3, accuracy: 79, level: 11, duration: '11 min' },
    { date: '2026-08-15', loc: 'In-clinic', status: 'completed', exercises: 6, accuracy: 87, level: 11, duration: '23 min' },
    { date: '2026-08-12', loc: 'Home', status: 'completed', exercises: 5, accuracy: 83, level: 10, duration: '20 min' },
  ];

  const pathLevels = [
    { level: 1, name: 'Counting 1-digit', status: 'completed' },
    { level: 2, name: 'Counting 2-digit', status: 'completed' },
    { level: 3, name: 'Transcoding read 2-digit', status: 'completed' },
    { level: 4, name: 'Counting 3-digit', status: 'completed' },
    { level: 10, name: 'Triplets 3-digit', status: 'completed' },
    { level: 11, name: 'Counting 4-digit', status: 'completed' },
    { level: 12, name: 'Transcoding write 4-digit', status: 'current' },
    { level: 13, name: 'Insertions 4-digit', status: 'locked' },
    { level: 14, name: 'Triplets 4-digit', status: 'locked' },
  ];

  const events = [
    { time: '2026-08-25 09:42', icon: '↑', colorClass: 'text-success', msg: 'Level up: Counting → Level 13' },
    { time: '2026-08-19 10:15', icon: '✓', colorClass: 'text-success', msg: 'Level 11 acquired — Counting 4-digit' },
    { time: '2026-08-17 14:30', icon: '⚠', colorClass: 'text-warning', msg: 'Session interrupted after 11 min (home)' },
    { time: '2026-08-10 09:55', icon: '↑', colorClass: 'text-success', msg: 'Level up: Transcoding Read → Level 9' },
    { time: '2026-08-05 10:00', icon: 'ℹ', colorClass: 'text-accent', msg: 'Session started — In-clinic (Dr. M. Ferrante)' },
    { time: '2026-07-28 10:20', icon: '↑', colorClass: 'text-success', msg: 'Level up: Counting → Level 11' },
    { time: '2026-07-15 11:00', icon: 'ℹ', colorClass: 'text-accent', msg: 'Assessment: Dyscalculia confirmed. Pathway initiated.' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Chart card */}
      <div className="rounded border border-line bg-white px-5 pb-3 pt-4">
        <div className="mb-3.5 flex items-center justify-between">
          <div>
            <h3 className="m-0 text-sm font-bold text-fg">Accuracy over time</h3>
            <div className="mt-0.5 flex gap-3.5 text-[11px] text-muted">
              <span>▲ In-clinic</span><span>● Home</span>
              <span className="text-success">■ Completed</span>
              <span className="text-danger">■ Interrupted</span>
            </div>
          </div>
          <button className="rounded border-none bg-accent px-3.5 py-[7px] font-sans text-xs font-semibold text-white">
            ⬇ Download PDF Report
          </button>
        </div>
        <MonitoringChart />
        <div className="relative mt-2 h-1.5 rounded-[3px] bg-surface">
          <div className="absolute bottom-0 left-[5%] right-[10%] top-0 rounded-[3px] bg-line" />
          <div className="absolute -top-0.5 left-[5%] h-2.5 w-2.5 cursor-ew-resize rounded-full bg-fg" />
          <div className="absolute -top-0.5 right-[10%] h-2.5 w-2.5 cursor-ew-resize rounded-full bg-fg" />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-muted">
          <span>Aug 5, 2026</span><span>Aug 25, 2026</span>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="overflow-hidden rounded border border-line bg-white">
        <div className="flex border-b border-line">
          {(['sessions', 'path', 'events'] as const).map(t => {
            const active = subTab === t;
            return (
              <button
                key={t}
                onClick={() => setSubTab(t)}
                className={`-mb-px border-0 border-b-2 px-5 py-3 font-sans text-[13px] capitalize ${
                  active ? 'border-accent font-semibold text-accent' : 'border-transparent font-normal text-muted'
                }`}
              >
                {t === 'sessions' ? 'All Sessions' : t === 'path' ? 'Learning Path' : 'Events'}
              </button>
            );
          })}
        </div>

        {subTab === 'sessions' && (
          <div>
            <div className="grid gap-0 bg-surface px-5 py-2" style={{ gridTemplateColumns: '110px 90px 100px 70px 80px 60px 70px 60px' }}>
              {['Date', 'Location', 'Status', 'Exercises', 'Accuracy', 'Level', 'Duration', ''].map(h => (
                <div key={h} className="text-[10px] font-semibold uppercase tracking-[0.06em] text-muted">{h}</div>
              ))}
            </div>
            {allSessions.map((s, i) => (
              <div
                key={i}
                className={`grid items-center px-5 py-3 ${i < allSessions.length - 1 ? 'border-b border-line' : ''}`}
                style={{ gridTemplateColumns: '110px 90px 100px 70px 80px 60px 70px 60px' }}
              >
                <span className="font-mono text-xs">{s.date}</span>
                <div className="flex items-center gap-1 text-xs text-muted">
                  <span className="text-[10px]">{s.loc === 'In-clinic' ? '▲' : '●'}</span>{s.loc}
                </div>
                <span className={`w-fit rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  s.status === 'completed' ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'
                }`}>{s.status}</span>
                <span className="font-mono text-xs">{s.exercises}</span>
                <span className={`font-mono text-xs font-semibold ${
                  s.accuracy >= 85 ? 'text-success' : s.accuracy >= 70 ? 'text-warning' : 'text-danger'
                }`}>{s.accuracy}%</span>
                <span className="font-mono text-xs">{s.level}</span>
                <span className="text-xs text-muted">{s.duration}</span>
                <button onClick={onOpenDetail} className="cursor-pointer border-none bg-transparent p-0 font-sans text-[11px] text-accent">Details →</button>
              </div>
            ))}
          </div>
        )}

        {subTab === 'path' && (
          <div className="py-2">
            {pathLevels.map((l) => (
              <div
                key={l.level}
                className={`flex items-center gap-4 border-b border-line px-5 py-2.5 ${l.status === 'current' ? 'bg-accent-soft' : ''}`}
              >
                <span className="w-14 font-mono text-xs text-muted">Lv. {l.level}</span>
                <span className={`text-[13px] ${l.status === 'locked' ? 'text-muted' : 'text-fg'} ${l.status === 'current' ? 'font-semibold' : 'font-normal'}`}>{l.name}</span>
                <div className="ml-auto">
                  {l.status === 'completed' && <span className="text-[11px] font-semibold text-success">✓ Completed</span>}
                  {l.status === 'current' && <span className="text-[11px] font-semibold text-accent">● Current</span>}
                  {l.status === 'locked' && <span className="text-[11px] text-muted">🔒 Locked</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {subTab === 'events' && (
          <div className="py-2">
            {events.map((e, i) => (
              <div key={i} className={`flex items-start gap-3.5 px-5 py-2.5 ${i < events.length - 1 ? 'border-b border-line' : ''}`}>
                <span className="w-[130px] flex-shrink-0 font-mono text-[11px] text-muted">{e.time}</span>
                <span className={`flex-shrink-0 text-[13px] ${e.colorClass}`}>{e.icon}</span>
                <span className="text-[13px] text-fg">{e.msg}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Session Detail Drawer ---
function SessionDetailDrawer({ onClose }: { onClose: () => void }) {
  const exercises = [
    { name: 'Counting 3-digit', level: 12, duration: '4:12', accuracy: 94, speed: '3.8s', acquired: true },
    { name: 'Transcoding Read', level: 9, duration: '3:45', accuracy: 89, speed: '4.1s', acquired: true },
    { name: 'Triplets Comparison', level: 10, duration: '2:58', accuracy: 91, speed: '3.2s', acquired: true },
    { name: 'Transcoding Write', level: 8, duration: '5:02', accuracy: 88, speed: '5.7s', acquired: false },
    { name: 'Counting 3-digit (repeat)', level: 12, duration: '3:20', accuracy: 95, speed: '3.5s', acquired: true },
    { name: 'Triplets Comparison', level: 11, duration: '2:43', accuracy: 92, speed: '3.0s', acquired: true },
  ];

  return (
    <div className="absolute right-0 top-0 z-50 flex h-full w-[420px] flex-col border-l border-line bg-white">
      <div className="flex items-start justify-between border-b border-line px-5 py-4">
        <div>
          <h2 className="m-0 mb-0.5 text-[15px] font-bold text-fg">Session Detail</h2>
          <div className="font-mono text-xs text-muted">2026-08-25 · In-clinic · 22 min</div>
        </div>
        <button onClick={onClose} className="cursor-pointer border-none bg-transparent p-0 text-xl leading-none text-muted">×</button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-0 border-b border-line">
        {[{ label: 'Avg Accuracy', value: '91%' }, { label: 'Exercises', value: '6' }, { label: 'Duration', value: '22 min' }].map(({ label, value }, i) => (
          <div key={label} className={`px-4 py-3 ${i < 2 ? 'border-r border-line' : ''}`}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-muted">{label}</div>
            <div className="mt-1 font-mono text-xl font-bold text-fg">{value}</div>
          </div>
        ))}
      </div>

      {/* Exercises list */}
      <div className="flex-1 overflow-auto">
        {exercises.map((ex, i) => (
          <div key={i} className="border-b border-line px-5 py-3.5">
            <div className="mb-1.5 flex items-start justify-between">
              <div>
                <div className="text-[13px] font-semibold text-fg">{ex.name}</div>
                <div className="text-[11px] text-muted">Level {ex.level} · {ex.duration}</div>
              </div>
              <div className="flex gap-1.5">
                <span className={`font-mono text-[11px] font-bold ${ex.accuracy >= 85 ? 'text-success' : 'text-warning'}`}>{ex.accuracy}%</span>
                {ex.acquired && <span className="rounded-lg bg-success-soft px-1.5 py-px text-[10px] font-semibold text-success">Acquired</span>}
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-[11px] text-muted">Avg speed: <span className="font-mono text-fg">{ex.speed}</span></span>
              <button className="cursor-pointer border-none bg-transparent p-0 font-sans text-[11px] text-accent">View exercise content →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main PatientProfile ---
export default function PatientProfile({ navigate, patientProfileTab, setPatientProfileTab, showNotifications, setShowNotifications, showSessionDetail, setShowSessionDetail }: AppState) {
  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'parameters' as const, label: 'Parameters' },
    { id: 'monitoring' as const, label: 'Monitoring' },
  ];

  return (
    <ClinicianShell
      navigate={navigate}
      pageTitle="Patient Profile"
      activeNav="patients"
      showNotifications={showNotifications}
      setShowNotifications={setShowNotifications}
      notificationCount={3}
    >
      <div className="px-7 py-5 font-sans">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-1.5 text-xs text-muted">
          <button onClick={() => navigate('patient-list')} className="cursor-pointer border-none bg-transparent p-0 font-sans text-xs text-accent">← Patients</button>
          <span>/</span>
          <span>Emma Rossi</span>
        </div>

        {/* Patient header */}
        <div className="mb-5 flex items-start justify-between rounded border border-line bg-white px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-xl font-bold text-accent">ER</div>
            <div>
              <div className="mb-1 flex items-center gap-2.5">
                <h2 className="m-0 text-xl font-bold tracking-[-0.01em] text-fg">Emma Rossi</h2>
                <span className="rounded-xl bg-success-soft px-2.5 py-[3px] text-[11px] font-semibold text-success">On Track</span>
              </div>
              <div className="flex gap-5 text-[13px] text-muted">
                <span>8 years · DOB: 2018-03-14</span>
                <span>Diagnosis: Dyscalculia (F81.2)</span>
                <span>Clinician: Dr. M. Ferrante</span>
                <span>Since: 2026-03-10</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('session-start')} className="rounded border-none bg-accent px-4 py-2 font-sans text-[13px] font-semibold text-white">▶ Start Session</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex border-b border-line">
          {tabs.map(({ id, label }) => {
            const active = patientProfileTab === id;
            return (
              <button
                key={id}
                onClick={() => setPatientProfileTab(id)}
                className={`-mb-px border-0 border-b-2 px-5 py-2.5 font-sans text-sm ${
                  active ? 'border-accent font-semibold text-accent' : 'border-transparent font-normal text-muted'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {patientProfileTab === 'overview' && <OverviewTab />}
        {patientProfileTab === 'parameters' && <ParametersTab />}
        {patientProfileTab === 'monitoring' && <MonitoringTab onOpenDetail={() => setShowSessionDetail(true)} />}
      </div>

      {/* Session Detail Drawer */}
      {showSessionDetail && <SessionDetailDrawer onClose={() => setShowSessionDetail(false)} />}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute right-0 top-0 z-50 flex h-full w-[360px] flex-col border-l border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="m-0 text-[15px] font-bold">Notifications</h2>
            <button onClick={() => setShowNotifications(false)} className="cursor-pointer border-none bg-transparent text-lg text-muted">×</button>
          </div>
          <div className="px-5 py-4 text-[13px] text-muted">3 unread notifications. <button onClick={() => navigate('patient-list')} className="cursor-pointer border-none bg-transparent font-sans text-[13px] text-accent">View all →</button></div>
        </div>
      )}
    </ClinicianShell>
  );
}
