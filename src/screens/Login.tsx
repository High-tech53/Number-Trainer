import { useState } from 'react';
import type { Screen } from '../types';

export default function Login({ navigate }: { navigate: (s: Screen) => void }) {
  const [role, setRole] = useState<'clinician' | 'patient'>('clinician');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (role === 'clinician') navigate('patient-list');
    else navigate('session-start');
  }

  return (
    <div className="flex min-h-full flex-col bg-surface font-sans">
      {/* Top bar */}
      <div className="flex h-14 items-center justify-between border-b border-line bg-white px-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-[3px] bg-accent text-[11px] font-bold text-white">NT</div>
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-fg">Number Trainer</span>
        </div>
        <button onClick={() => navigate('style-guide')} className="cursor-pointer border-none bg-transparent font-sans text-xs text-muted">Style Guide</button>
      </div>

      {/* Main */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="flex w-[400px] flex-col">
          {/* Card */}
          <div className="overflow-hidden rounded-md border border-line bg-white">
            {/* Role tabs */}
            <div className="grid grid-cols-2 border-b border-line">
              {(['clinician', 'patient'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`border-0 border-b-2 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.02em] ${
                    role === r ? 'border-accent bg-white text-accent' : 'border-transparent bg-surface text-muted'
                  }`}
                >
                  {r === 'clinician' ? 'Clinician' : 'Patient / Family'}
                </button>
              ))}
            </div>

            <div className="px-8 pb-6 pt-8">
              <h1 className="m-0 mb-1 text-[22px] font-bold tracking-[-0.01em] text-fg">
                {role === 'clinician' ? 'Sign in to your account' : 'Enter your session code'}
              </h1>
              <p className="m-0 mb-7 text-[13px] text-muted">
                {role === 'clinician' ? 'Number Trainer Clinical Console' : 'Your clinician will give you the access code'}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {role === 'clinician' ? (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-fg">Email address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="clinician@hospital.it"
                        className="rounded border border-line bg-white px-3 py-2.5 font-sans text-sm text-fg outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(45,108,223,0.15)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-baseline justify-between">
                        <label className="text-xs font-medium text-fg">Password</label>
                        <a href="#" className="text-xs text-accent no-underline">Forgot password?</a>
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="rounded border border-line bg-white px-3 py-2.5 font-sans text-sm text-fg outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(45,108,223,0.15)]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember" className="cursor-pointer text-[13px] text-fg">Keep me signed in</label>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-xs font-medium text-fg">6-character access code</label>
                      <input
                        type="text"
                        value={code}
                        onChange={e => setCode(e.target.value.toUpperCase().slice(0, 6))}
                        placeholder="A7K3M9"
                        className="rounded border border-line bg-surface px-4 py-3.5 text-center font-mono text-[28px] font-bold tracking-[0.25em] text-fg outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(45,108,223,0.15)]"
                      />
                      <p className="m-0 text-center text-xs text-muted">Ask your clinician or parent for the code</p>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="mt-1 rounded border-none bg-accent py-[11px] font-sans text-[15px] font-semibold tracking-[-0.01em] text-white"
                >
                  {role === 'clinician' ? 'Sign in' : 'Start session'}
                </button>
              </form>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-5 text-center text-xs text-muted">
            Number Trainer v2.4 · Clinical Edition · © 2026 RIDInet S.r.l.
          </p>
        </div>
      </div>
    </div>
  );
}
