export type Screen =
  | 'style-guide'
  | 'login'
  | 'patient-list'
  | 'patient-profile'
  | 'session-start'
  | 'exercise-counting'
  | 'exercise-transcoding-read'
  | 'exercise-transcoding-write'
  | 'exercise-triplets'
  | 'exercise-insertions'
  | 'exercise-decimal-reading'
  | 'exercise-feedback'
  | 'session-feedback'
  | 'mini-game-dots'
  | 'mini-game-puzzle';

export type ExerciseScreen = Extract<
  Screen,
  | 'exercise-counting'
  | 'exercise-transcoding-read'
  | 'exercise-transcoding-write'
  | 'exercise-triplets'
  | 'exercise-insertions'
  | 'exercise-decimal-reading'
>;

export interface DecimalReadingResult {
  items: number;
  correct: number;
  avgSpeed: number;
}

export interface AppState {
  navigate: (screen: Screen) => void;
  exerciseIndex: number;
  lastExercise: ExerciseScreen;
  patientProfileTab: 'overview' | 'parameters' | 'monitoring';
  setPatientProfileTab: (tab: 'overview' | 'parameters' | 'monitoring') => void;
  showNotifications: boolean;
  setShowNotifications: (v: boolean) => void;
  showSessionDetail: boolean;
  setShowSessionDetail: (v: boolean) => void;
  startExercises: () => void;
  onExerciseComplete: () => void;
  onTryAgain: () => void;
  onContinueExercise: () => void;
  isLastExercise: boolean;
  decimalReadingResult: DecimalReadingResult;
  setDecimalReadingResult: (r: DecimalReadingResult) => void;
}
