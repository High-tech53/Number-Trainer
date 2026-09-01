import { useState } from 'react';
import type { Screen, ExerciseScreen, AppState, DecimalReadingResult } from './types';
import StyleGuide from './screens/StyleGuide';
import Login from './screens/Login';
import PatientList from './screens/clinician/PatientList';
import PatientProfile from './screens/clinician/PatientProfile';
import SessionStart from './screens/player/SessionStart';
import ExerciseCounting from './screens/player/ExerciseCounting';
import ExerciseTranscodingRead from './screens/player/ExerciseTranscodingRead';
import ExerciseTranscodingWrite from './screens/player/ExerciseTranscodingWrite';
import ExerciseTriplets from './screens/player/ExerciseTriplets';
import ExerciseInsertions from './screens/player/ExerciseInsertions';
import ExerciseDecimalReading from './screens/player/ExerciseDecimalReading';
import ExerciseFeedback from './screens/player/ExerciseFeedback';
import SessionFeedback from './screens/player/SessionFeedback';
import MiniGameDots from './screens/player/MiniGameDots';
import MiniGamePuzzle from './screens/player/MiniGamePuzzle';
import ProtoNav from './components/ProtoNav';

const EXERCISE_FLOW: ExerciseScreen[] = [
  'exercise-counting',
  'exercise-transcoding-read',
  'exercise-triplets',
  'exercise-decimal-reading',
];

export const TOTAL_EXERCISES = EXERCISE_FLOW.length;

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [lastExercise, setLastExercise] = useState<ExerciseScreen>('exercise-counting');
  const [patientProfileTab, setPatientProfileTab] = useState<'overview' | 'parameters' | 'monitoring'>('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSessionDetail, setShowSessionDetail] = useState(false);
  const [decimalReadingResult, setDecimalReadingResult] = useState<DecimalReadingResult>({ items: 0, correct: 0, avgSpeed: 0 });

  function navigate(s: Screen) {
    setScreen(s);
    setShowNotifications(false);
    setShowSessionDetail(false);
  }

  function startExercises() {
    setExerciseIndex(0);
    setLastExercise(EXERCISE_FLOW[0]);
    setScreen(EXERCISE_FLOW[0]);
  }

  function onExerciseComplete() {
    setLastExercise(screen as ExerciseScreen);
    setScreen('exercise-feedback');
  }

  function onTryAgain() {
    setScreen(lastExercise);
  }

  function onContinueExercise() {
    const next = exerciseIndex + 1;
    if (next < EXERCISE_FLOW.length) {
      setExerciseIndex(next);
      const nextEx = EXERCISE_FLOW[next];
      setLastExercise(nextEx);
      setScreen(nextEx);
    } else {
      setScreen('session-feedback');
    }
  }

  const isLastExercise = exerciseIndex >= EXERCISE_FLOW.length - 1;

  const appState: AppState = {
    navigate,
    exerciseIndex,
    lastExercise,
    patientProfileTab,
    setPatientProfileTab,
    showNotifications,
    setShowNotifications,
    showSessionDetail,
    setShowSessionDetail,
    startExercises,
    onExerciseComplete,
    onTryAgain,
    onContinueExercise,
    isLastExercise,
    decimalReadingResult,
    setDecimalReadingResult,
  };

  function renderScreen() {
    switch (screen) {
      case 'style-guide': return <StyleGuide navigate={navigate} />;
      case 'login': return <Login navigate={navigate} />;
      case 'patient-list': return <PatientList {...appState} />;
      case 'patient-profile': return <PatientProfile {...appState} />;
      case 'session-start': return <SessionStart {...appState} />;
      case 'exercise-counting': return <ExerciseCounting {...appState} />;
      case 'exercise-transcoding-read': return <ExerciseTranscodingRead {...appState} />;
      case 'exercise-transcoding-write': return <ExerciseTranscodingWrite {...appState} />;
      case 'exercise-triplets': return <ExerciseTriplets {...appState} />;
      case 'exercise-insertions': return <ExerciseInsertions {...appState} />;
      case 'exercise-decimal-reading': return <ExerciseDecimalReading {...appState} />;
      case 'exercise-feedback': return <ExerciseFeedback {...appState} />;
      case 'session-feedback': return <SessionFeedback {...appState} />;
      case 'mini-game-dots': return <MiniGameDots navigate={navigate} />;
      case 'mini-game-puzzle': return <MiniGamePuzzle navigate={navigate} />;
      default: return <Login navigate={navigate} />;
    }
  }

  return (
    <div className="size-full">
      {renderScreen()}
      <ProtoNav navigate={navigate} currentScreen={screen} />
    </div>
  );
}
