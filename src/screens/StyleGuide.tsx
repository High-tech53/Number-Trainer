import type { Screen } from '../types';

function Swatch({ hex, name, usage }: { hex: string; name: string; usage: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-16 rounded ${hex === '#FFFFFF' ? 'border border-line' : ''}`} style={{ background: hex }} />
      <div>
        <div className="font-mono text-xs text-fg">{hex}</div>
        <div className="text-[13px] font-semibold text-fg">{name}</div>
        <div className="text-[11px] text-muted">{usage}</div>
      </div>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
        {n} — {title}
      </div>
      {children}
    </section>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded border border-line bg-white p-8 ${className ?? ''}`}>
      {children}
    </div>
  );
}

const PROTO_SCREENS: { label: string; screen: Screen }[] = [
  { label: 'Login', screen: 'login' },
  { label: 'Clinician — Patient List', screen: 'patient-list' },
  { label: 'Clinician — Patient Profile', screen: 'patient-profile' },
  { label: 'Player — Session Start', screen: 'session-start' },
  { label: 'Player — Counting Exercise', screen: 'exercise-counting' },
  { label: 'Player — Transcoding (Read)', screen: 'exercise-transcoding-read' },
  { label: 'Player — Transcoding (Write)', screen: 'exercise-transcoding-write' },
  { label: 'Player — Triplets', screen: 'exercise-triplets' },
  { label: 'Player — Insertions', screen: 'exercise-insertions' },
  { label: 'Player — Decimal Number Reading', screen: 'exercise-decimal-reading' },
  { label: 'Player — Exercise Feedback', screen: 'exercise-feedback' },
  { label: 'Player — Session Feedback', screen: 'session-feedback' },
  { label: 'Mini-Game — Connect the Dots', screen: 'mini-game-dots' },
  { label: 'Mini-Game — Number Puzzle', screen: 'mini-game-puzzle' },
];

export default function StyleGuide({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="min-h-full bg-surface font-sans">
      {/* Header */}
      <div className="flex h-14 items-center justify-between bg-fg px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-[3px] bg-accent text-[11px] font-bold tracking-[0.02em] text-white">NT</div>
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-white">Number Trainer</span>
          <span className="ml-1 text-[13px] text-muted">Style Guide</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate('login')} className="rounded border border-[#555] bg-transparent px-3.5 py-1.5 font-sans text-xs text-[#ccc]">Login</button>
          <button onClick={() => navigate('patient-list')} className="rounded border border-[#555] bg-transparent px-3.5 py-1.5 font-sans text-xs text-[#ccc]">Clinician Console</button>
          <button onClick={() => navigate('session-start')} className="rounded border-none bg-accent px-3.5 py-1.5 font-sans text-xs font-medium text-white">Exercise Player</button>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-12 pb-24 pt-12">
        {/* Color Palette */}
        <Section n="01" title="Color Palette">
          <Card>
            <div className="mb-5 grid grid-cols-5 gap-5">
              <Swatch hex="#F5F5F5" name="Background" usage="Page, canvas" />
              <Swatch hex="#E0E0E0" name="Border / Muted" usage="Dividers, secondary surfaces" />
              <Swatch hex="#9E9E9E" name="Subdued" usage="Labels, captions, placeholders" />
              <Swatch hex="#333333" name="Foreground" usage="Body text, headings" />
              <Swatch hex="#2D6CDF" name="Accent (Primary)" usage="CTAs, active states, progress" />
            </div>
            <div className="grid grid-cols-3 gap-5">
              <Swatch hex="#2A7A2A" name="Success" usage="Completed, correct answers" />
              <Swatch hex="#C0392B" name="Danger" usage="Critical, errors, interrupted" />
              <Swatch hex="#E8750A" name="Warning" usage="Attention needed" />
            </div>
          </Card>
        </Section>

        {/* Type Scale */}
        <Section n="02" title="Type Scale · DM Sans + DM Mono">
          <Card className="flex flex-col gap-0">
            {[
              { label: 'H1', sample: 'Patient Report — Session Analysis', spec: '40px / 700 / −0.02em', className: 'text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-fg' },
              { label: 'H2', sample: 'Emma Rossi · Level 12 · Counting', spec: '28px / 600 / −0.01em', className: 'text-[28px] font-semibold leading-[1.2] tracking-[-0.01em] text-fg' },
              { label: 'H3', sample: 'Exercise Parameters — Transcoding', spec: '20px / 600', className: 'text-xl font-semibold leading-[1.3] text-fg' },
              { label: 'Body', sample: 'The patient completed 3 exercises with an average accuracy of 91% over a 22-minute in-clinic session on 25 Aug 2026.', spec: '15px / 400 / 1.6', className: 'text-[15px] font-normal leading-relaxed text-fg' },
              { label: 'Caption', sample: 'Session recorded 2026-08-25 · In-clinic · Dr. M. Ferrante · Duration: 22 min', spec: '12px / 400 / 1.5 · muted', className: 'text-xs leading-relaxed text-muted' },
            ].map(({ label, sample, spec, className }) => (
              <div key={label} className="flex items-center justify-between gap-4 border-b border-line py-4">
                <div className="flex flex-1 items-baseline gap-4">
                  <span className="w-12 flex-shrink-0 font-mono text-[11px] text-muted">{label}</span>
                  <span className={className}>{sample}</span>
                </div>
                <span className="flex-shrink-0 font-mono text-[11px] text-muted">{spec}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <span className="w-12 font-mono text-[11px] text-muted">Mono</span>
                <span className="rounded-[3px] bg-surface px-2.5 py-1 font-mono text-[13px] text-fg">1,247 · Level 12 · 00:23 · ACC: 87%</span>
              </div>
              <span className="font-mono text-[11px] text-muted">13px · data, timers, codes</span>
            </div>
          </Card>
        </Section>

        {/* Button States */}
        <Section n="03" title="Button States">
          <Card>
            <div className="flex flex-wrap gap-8">
              {/* Primary */}
              <div>
                <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-muted">Primary</div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Default', className: 'bg-accent text-white cursor-pointer' },
                    { label: 'Hover', className: 'bg-accent-hover text-white cursor-pointer' },
                    { label: 'Disabled', className: 'bg-line text-muted cursor-not-allowed' },
                  ].map(({ label, className }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5">
                      <button className={`rounded border-none px-5 py-[9px] font-sans text-sm font-medium ${className}`}>{label}</button>
                      <span className="text-[11px] text-muted">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Secondary */}
              <div>
                <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-muted">Secondary</div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Default', className: 'bg-transparent text-fg border border-line' },
                    { label: 'Hover', className: 'bg-surface text-fg border border-muted' },
                  ].map(({ label, className }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5">
                      <button className={`cursor-pointer rounded px-5 py-[9px] font-sans text-sm font-medium ${className}`}>{label}</button>
                      <span className="text-[11px] text-muted">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Danger / Ghost */}
              <div>
                <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-muted">Danger / Ghost</div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex flex-col items-center gap-1.5">
                    <button className="cursor-pointer rounded border-none bg-danger px-5 py-[9px] font-sans text-sm font-medium text-white">Danger</button>
                    <span className="text-[11px] text-muted">danger</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <button className="cursor-pointer rounded border border-accent bg-transparent px-5 py-[9px] font-sans text-sm font-medium text-accent">Ghost</button>
                    <span className="text-[11px] text-muted">ghost</span>
                  </div>
                </div>
              </div>
              {/* Player large */}
              <div>
                <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-muted">Player — Large CTA</div>
                <button className="cursor-pointer rounded-xl border-none bg-accent px-12 py-[18px] font-sans text-xl font-semibold tracking-[-0.01em] text-white">▶ Start</button>
              </div>
            </div>
          </Card>
        </Section>

        {/* Form Inputs */}
        <Section n="04" title="Form Inputs">
          <Card className="grid grid-cols-3 gap-6">
            {/* Text input default */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-fg">Text Input — Default</label>
              <input readOnly value="" placeholder="e.g. emma.rossi@clinic.it" className="rounded border border-line bg-white px-3 py-[9px] font-sans text-sm text-fg outline-none" />
            </div>
            {/* Text input focus */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-fg">Text Input — Focus</label>
              <input readOnly value="emma.rossi@clinic.it" className="rounded border border-accent bg-white px-3 py-[9px] font-sans text-sm text-fg shadow-[0_0_0_3px_rgba(45,108,223,0.15)] outline-none" />
            </div>
            {/* Text input error */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-fg">Text Input — Error</label>
              <input readOnly value="invalid@" className="rounded border border-danger bg-white px-3 py-[9px] font-sans text-sm text-fg outline-none" />
              <span className="text-[11px] text-danger">Enter a valid email address</span>
            </div>
            {/* Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-fg">Select</label>
              <select className="rounded border border-line bg-white px-3 py-[9px] font-sans text-sm text-fg">
                <option>3× per week</option>
                <option>4× per week</option>
              </select>
            </div>
            {/* Checkboxes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-fg">Toggle / Checkbox</label>
              <div className="flex flex-col gap-2">
                {['Counting exercises', 'Transcoding — Read', 'Insertions (disabled)'].map((label, i) => (
                  <label key={label} className={`flex cursor-pointer items-center gap-2 text-sm ${i === 2 ? 'text-muted' : 'text-fg'}`}>
                    <input type="checkbox" defaultChecked={i < 2} readOnly />
                    {label}
                  </label>
                ))}
              </div>
            </div>
            {/* Access code */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-fg">Access Code (Patient)</label>
              <div className="flex gap-1.5">
                {'A7K3M9'.split('').map((c, i) => (
                  <div key={i} className="flex h-[46px] w-[38px] items-center justify-center rounded border border-line bg-surface font-mono text-xl font-semibold text-fg">{c}</div>
                ))}
              </div>
            </div>
          </Card>
        </Section>

        {/* Status Badges */}
        <Section n="05" title="Status Badges & Icons">
          <Card>
            <div className="mb-5 flex flex-wrap gap-2.5">
              {[
                { label: 'On Track', className: 'bg-success-soft text-success' },
                { label: 'Attention Needed', className: 'bg-warning-soft text-warning' },
                { label: 'Critical', className: 'bg-danger-soft text-danger' },
                { label: 'Active', className: 'bg-accent-soft text-accent' },
                { label: 'Inactive', className: 'bg-surface text-muted' },
                { label: 'Level Up', className: 'bg-[#EDE7F6] text-[#5E35B1]' },
              ].map(({ label, className }) => (
                <span key={label} className={`rounded-xl px-2.5 py-[3px] text-xs font-medium ${className}`}>{label}</span>
              ))}
            </div>
            <div className="text-[13px] leading-loose text-muted">
              <strong className="text-fg">Iconography:</strong> Outlined icons, consistent weight (Heroicons / Lucide). Functional use only: navigation (← →), actions (＋ × ✓), status (! △ ●), media (▶ 🔊 ⏸). Player icons: 24–32px with labels. Session markers: <strong className="text-fg">▲ triangle = in-clinic</strong>, <strong className="text-fg">● circle = home</strong>. Green = completed, red = interrupted.
            </div>
          </Card>
        </Section>

        {/* Prototype Nav */}
        <Section n="06" title="Prototype Screens">
          <div className="grid grid-cols-3 gap-2">
            {PROTO_SCREENS.map(({ label, screen }) => (
              <button
                key={screen}
                onClick={() => navigate(screen)}
                className="flex cursor-pointer items-center gap-2 rounded border border-line bg-white px-4 py-3 text-left font-sans text-[13px] text-fg"
              >
                <span className="flex-shrink-0 text-accent">→</span>
                {label}
              </button>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
