import type { Screen } from '../../types';

interface ClinicianShellProps {
  children: React.ReactNode;
  navigate: (s: Screen) => void;
  activeNav?: 'patients' | 'reports' | 'settings';
  pageTitle: string;
  showNotifications?: boolean;
  setShowNotifications?: (v: boolean) => void;
  notificationCount?: number;
}

const NAV_ITEMS = [
  { id: 'patients' as const, label: 'Patients', icon: '👤' },
  { id: 'reports' as const, label: 'Reports', icon: '📊' },
  { id: 'settings' as const, label: 'Settings', icon: '⚙' },
];

export default function ClinicianShell({
  children, navigate, activeNav = 'patients', pageTitle,
  showNotifications, setShowNotifications, notificationCount = 2,
}: ClinicianShellProps) {
  return (
    <div className="flex h-full font-sans">
      {/* Sidebar */}
      <div className="flex w-[220px] flex-shrink-0 flex-col bg-sidebar">
        {/* Logo */}
        <div className="border-b border-white/[0.08] px-5 pb-4 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded bg-accent text-xs font-bold text-white">NT</div>
            <div>
              <div className="text-[13px] font-bold tracking-[-0.01em] text-white">Number Trainer</div>
              <div className="text-[10px] uppercase tracking-[0.06em] text-white/40">Clinical Console</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2.5">
          {NAV_ITEMS.map(({ id, label, icon }) => {
            const active = activeNav === id;
            return (
              <button
                key={id}
                onClick={() => id === 'patients' && navigate('patient-list')}
                className={`mb-0.5 flex w-full items-center gap-2.5 rounded py-2.5 px-3 text-left font-sans text-[13px] ${
                  active ? 'bg-accent/25 font-semibold text-white' : 'font-normal text-white/50'
                }`}
              >
                <span className="text-sm">{icon}</span>
                {label}
                {active && <span className="ml-auto h-4 w-[3px] rounded bg-accent" />}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-white/[0.08] px-3.5 py-3">
          <div className="mb-2.5 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-white/80">MF</div>
            <div>
              <div className="text-xs font-semibold text-white">Dr. M. Ferrante</div>
              <div className="text-[10px] text-white/40">Neuropsychologist</div>
            </div>
          </div>
          <button
            onClick={() => navigate('login')}
            className="w-full rounded border-none bg-white/[0.07] py-1.5 font-sans text-xs text-white/50"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-line bg-white px-7">
          <h1 className="m-0 text-base font-bold tracking-[-0.01em] text-fg">{pageTitle}</h1>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input
                readOnly
                placeholder="Search patients..."
                className="w-[200px] rounded border border-line bg-surface py-[7px] pl-8 pr-3 font-sans text-[13px] text-fg outline-none"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted">⌕</span>
            </div>

            {/* Bell */}
            <button
              onClick={() => setShowNotifications?.(!showNotifications)}
              className={`relative flex h-9 w-9 items-center justify-center rounded border text-base ${
                showNotifications ? 'border-accent bg-accent-soft' : 'border-line bg-transparent'
              }`}
            >
              🔔
              {notificationCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-line text-xs font-semibold text-fg">MF</div>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
