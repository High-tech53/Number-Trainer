import { useState } from 'react';
import type { AppState } from '../../types';
import ClinicianShell from './ClinicianShell';

interface Patient {
  id: number;
  name: string;
  age: number;
  initials: string;
  lastSession: string;
  level: number;
  accuracy: number;
  trend: number[];
  status: 'on-track' | 'attention' | 'critical';
}

const PATIENTS: Patient[] = [
  { id: 1, name: 'Emma Rossi', age: 8, initials: 'ER', lastSession: '2026-08-25', level: 12, accuracy: 91, trend: [78, 82, 85, 88, 91, 91], status: 'on-track' },
  { id: 2, name: 'Luca Bianchi', age: 7, initials: 'LB', lastSession: '2026-08-20', level: 8, accuracy: 64, trend: [80, 75, 72, 68, 67, 64], status: 'critical' },
  { id: 3, name: 'Sofia Conti', age: 9, initials: 'SC', lastSession: '2026-08-24', level: 15, accuracy: 88, trend: [81, 84, 85, 87, 88, 88], status: 'on-track' },
  { id: 4, name: 'Marco Ferrari', age: 8, initials: 'MF', lastSession: '2026-08-18', level: 6, accuracy: 72, trend: [78, 76, 74, 73, 72, 72], status: 'attention' },
  { id: 5, name: 'Giulia Ricci', age: 7, initials: 'GR', lastSession: '2026-08-26', level: 10, accuracy: 79, trend: [82, 80, 79, 78, 79, 79], status: 'attention' },
  { id: 6, name: 'Alessandro Marini', age: 10, initials: 'AM', lastSession: '2026-08-22', level: 18, accuracy: 95, trend: [88, 90, 91, 93, 95, 95], status: 'on-track' },
  { id: 7, name: 'Chiara Bruno', age: 8, initials: 'CB', lastSession: '2026-08-15', level: 4, accuracy: 58, trend: [65, 62, 60, 59, 58, 55], status: 'critical' },
];

const STATUS_CONFIG = {
  'on-track': { label: 'On Track', bgClass: 'bg-success-soft', textClass: 'text-success' },
  'attention': { label: 'Attention', bgClass: 'bg-warning-soft', textClass: 'text-warning' },
  'critical': { label: 'Critical', bgClass: 'bg-danger-soft', textClass: 'text-danger' },
};

const SPARK_COLORS = { 'on-track': '#2A7A2A', 'critical': '#C0392B', 'attention': '#E8750A' };

function Sparkline({ values, status }: { values: number[]; status: Patient['status'] }) {
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  const w = 64, h = 24, pad = 3;
  const pts = values.map((v, i) => ({
    x: pad + (i / (values.length - 1)) * (w - 2 * pad),
    y: h - pad - ((v - min) / range) * (h - 2 * pad),
  }));
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const color = SPARK_COLORS[status];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2.5" fill={color} />
    </svg>
  );
}

const FILTERS = ['All', 'On Track', 'Attention', 'Critical'] as const;

const GRID_COLS = '2fr 80px 130px 80px 80px 130px 100px';

export default function PatientList({ navigate, showNotifications, setShowNotifications }: AppState) {
  const [filter, setFilter] = useState<typeof FILTERS[number]>('All');

  const filtered = PATIENTS.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'On Track') return p.status === 'on-track';
    if (filter === 'Attention') return p.status === 'attention';
    if (filter === 'Critical') return p.status === 'critical';
    return true;
  });

  return (
    <ClinicianShell
      navigate={navigate}
      pageTitle="Patients"
      activeNav="patients"
      showNotifications={showNotifications}
      setShowNotifications={setShowNotifications}
      notificationCount={3}
    >
      <div className="p-7 pt-6 font-sans">
        {/* Toolbar */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-1.5">
            {FILTERS.map(f => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded px-3.5 py-1.5 font-sans text-xs ${
                    active ? 'border border-accent bg-accent-soft font-semibold text-accent' : 'border border-line bg-white font-normal text-fg'
                  }`}
                >
                  {f}
                  {f === 'Critical' && <span className="ml-1.5 rounded-full bg-danger-soft px-[5px] py-px text-[10px] font-bold text-danger">2</span>}
                </button>
              );
            })}
          </div>
          <button
            className="flex items-center gap-1.5 rounded border-none bg-accent px-4 py-2 font-sans text-[13px] font-semibold text-white"
          >
            <span>＋</span> Add new patient
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded border border-line bg-white">
          {/* Header */}
          <div className="grid border-b border-line bg-surface px-5 py-2.5" style={{ gridTemplateColumns: GRID_COLS }}>
            {['Patient', 'Age', 'Last Session', 'Level', 'Trend', 'Accuracy', 'Status'].map(h => (
              <div key={h} className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">{h}</div>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((p, i) => {
            const s = STATUS_CONFIG[p.status];
            return (
              <div
                key={p.id}
                onClick={() => navigate('patient-profile')}
                className={`grid cursor-pointer items-center px-5 py-3.5 hover:bg-surface ${i < filtered.length - 1 ? 'border-b border-line' : ''}`}
                style={{ gridTemplateColumns: GRID_COLS }}
              >
                {/* Name */}
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    p.status === 'critical' ? 'bg-danger-soft text-danger' : 'bg-surface text-muted'
                  }`}>
                    {p.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-fg">{p.name}</div>
                    <div className="text-[11px] text-muted">Dyscalculia</div>
                  </div>
                  {p.status === 'critical' && <span className="ml-1 text-xs text-danger">⚠</span>}
                </div>

                {/* Age */}
                <div className="text-sm text-fg">{p.age} yr</div>

                {/* Last session */}
                <div className="font-mono text-[13px] text-fg">{p.lastSession}</div>

                {/* Level */}
                <div className="font-mono text-sm font-medium text-fg">{p.level}</div>

                {/* Trend sparkline */}
                <div><Sparkline values={p.trend} status={p.status} /></div>

                {/* Accuracy */}
                <div className="flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                    <div
                      className={`h-full rounded-full ${p.accuracy >= 85 ? 'bg-success' : p.accuracy >= 70 ? 'bg-warning' : 'bg-danger'}`}
                      style={{ width: `${p.accuracy}%` }}
                    />
                  </div>
                  <span className="w-9 text-right font-mono text-[13px] font-medium text-fg">{p.accuracy}%</span>
                </div>

                {/* Status */}
                <div>
                  <span className={`rounded-xl px-2.5 py-[3px] text-[11px] font-semibold ${s.bgClass} ${s.textClass}`}>{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-3 text-xs text-muted">
          Showing {filtered.length} of {PATIENTS.length} patients
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute right-0 top-0 z-50 flex h-full w-[360px] flex-col border-l border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="m-0 text-[15px] font-bold text-fg">Notifications</h2>
            <button onClick={() => setShowNotifications(false)} className="cursor-pointer border-none bg-transparent p-0 text-lg leading-none text-muted">×</button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            {[
              { type: 'critical', patient: 'Luca Bianchi', msg: 'Accuracy below critical threshold (64%) for 3 consecutive sessions', time: '2h ago' },
              { type: 'critical', patient: 'Chiara Bruno', msg: 'Accuracy below critical threshold (55%) for 2 consecutive sessions', time: '1d ago' },
              { type: 'warning', patient: 'Marco Ferrari', msg: "Progression on Level 6 — Counting has stalled for 4 sessions", time: '3d ago' },
              { type: 'info', patient: 'Emma Rossi', msg: 'Patient exceeded last enabled level — consider unlocking Level 13', time: '5d ago' },
              { type: 'info', patient: 'Alessandro Marini', msg: 'Session streak: 8 consecutive completed sessions without interruption', time: '1wk ago' },
            ].map((n, i) => (
              <div
                key={i}
                className={`border-b border-line px-5 py-3.5 border-l-[3px] ${
                  n.type === 'critical' ? 'border-l-danger' : n.type === 'warning' ? 'border-l-warning' : 'border-l-accent'
                }`}
              >
                <div className="mb-1 flex justify-between">
                  <span className={`text-xs font-bold ${
                    n.type === 'critical' ? 'text-danger' : n.type === 'warning' ? 'text-warning' : 'text-accent'
                  }`}>
                    {n.type === 'critical' ? '⚠ CRITICAL' : n.type === 'warning' ? '△ WARNING' : 'ℹ INFO'}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{n.time}</span>
                </div>
                <div className="mb-0.5 text-[13px] font-semibold text-fg">{n.patient}</div>
                <div className="text-xs leading-relaxed text-muted">{n.msg}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-line px-5 py-3">
            <button className="w-full rounded border border-line bg-surface py-2 font-sans text-xs text-muted">Mark all as read</button>
          </div>
        </div>
      )}
    </ClinicianShell>
  );
}
