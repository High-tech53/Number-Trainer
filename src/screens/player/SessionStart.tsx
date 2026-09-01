import type { AppState, ExerciseScreen } from '../../types';

interface ExerciseItem {
  name: string;
  level: number;
  screen: ExerciseScreen;
  category: string;
  duration: string;
  color: string;
  icon: JSX.Element;
}

export default function SessionStart({ navigate }: AppState) {
  const exercises: ExerciseItem[] = [
    {
      name: 'Counting',
      level: 12,
      screen: 'exercise-counting',
      category: 'Numbers',
      duration: '5 min',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
    },
    {
      name: 'Transcoding Read',
      level: 9,
      screen: 'exercise-transcoding-read',
      category: 'Reading',
      duration: '7 min',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      name: 'Transcoding Write',
      level: 8,
      screen: 'exercise-transcoding-write',
      category: 'Writing',
      duration: '6 min',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
    },
    {
      name: 'Triplets',
      level: 10,
      screen: 'exercise-triplets',
      category: 'Logic',
      duration: '8 min',
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      name: 'Insertions',
      level: 5,
      screen: 'exercise-insertions',
      category: 'Focus',
      duration: '4 min',
      color: 'bg-rose-50 text-rose-600 border-rose-200',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: 'Decimal Reading',
      level: 7,
      screen: 'exercise-decimal-reading',
      category: 'Math',
      duration: '5 min',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white shadow-sm">
          NT
        </div>
        <button
          onClick={() => navigate('login')}
          className="cursor-pointer font-sans text-xs font-medium text-slate-500 transition-colors hover:text-slate-800"
        >
          Exit
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl space-y-8">
          {/* Greeting Section */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Welcome back
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Hi Emma! 👋
            </h1>
            <p className="mt-2 text-base font-normal text-slate-600 sm:text-lg">
              Choose an exercise below to start your training session today.
            </p>
          </div>

          {/* 6 Exercise Cards Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exercises.map((ex) => (
              <div
                key={ex.screen}
                onClick={() => navigate(ex.screen)}
                className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg active:translate-y-0"
              >
                {/* Card Top Row: Category & Level Badge */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium ${ex.color}`}>
                    {ex.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Level {ex.level}
                  </span>
                </div>

                {/* Card Middle Section: Custom SVG Icon & Title */}
                <div className="my-6 flex items-center gap-4">
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${ex.color}`}>
                    {ex.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">
                      {ex.name}
                    </h3>
                    <p className="text-xs text-slate-400">Est. {ex.duration}</p>
                  </div>
                </div>

                {/* Card Bottom Row: Action Prompt */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-blue-600">
                  <span>Start Exercise</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Link */}
          <div className="text-center">
            <button
              onClick={() => navigate('login')}
              className="cursor-pointer text-xs font-medium text-slate-400 hover:text-slate-600 hover:underline"
            >
              Not now, take me to login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}