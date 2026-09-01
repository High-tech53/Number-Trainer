interface PlayerShellProps {
  children: React.ReactNode;
  label?: string;
  timer?: string;
  errors?: number;
  sessionProgress?: number;
  showErrors?: boolean;
}

export default function PlayerShell({
  children, label, timer = '00:00', errors = 0, sessionProgress = 33, showErrors = true,
}: PlayerShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans">
      {/* Top bar */}
      <div className="flex h-[52px] flex-shrink-0 items-center justify-between border-b border-line bg-white px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[3px] bg-accent text-[10px] font-bold text-white">NT</div>
          {label && <span className="text-[13px] font-medium text-muted">{label}</span>}
        </div>
        <div className="flex items-center gap-5">
          {showErrors && (
            <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
              <span className="font-bold text-danger">✕</span>
              <span className="font-semibold text-fg">{errors}</span>
              <span>errors</span>
            </div>
          )}
          <div className="font-mono text-sm font-semibold text-fg">{timer}</div>
        </div>
      </div>

      {/* Session progress bar */}
      <div className="h-1 flex-shrink-0 bg-line">
        <div className="h-full rounded-r-sm bg-accent" style={{ width: `${sessionProgress}%` }} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        {children}
      </div>
    </div>
  );
}
