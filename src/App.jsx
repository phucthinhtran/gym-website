import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExerciseList from "./components/ExerciseList";
import MuscleAnatomy from "./components/MuscleAnatomy";
import BmiCalculator from "./components/BmiCalculator";
import WorkoutSchedule from "./components/WorkoutSchedule";
import WorkoutHistory from "./components/WorkoutHistory";
import { readWorkoutLogs } from "./data/workoutLogs";

import "./App.css";

function App() {
  const [selectedMuscle, setSelectedMuscle] = useState("Tất cả");
  const [scheduledExerciseId, setScheduledExerciseId] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [equipment, setEquipment] = useState("");
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    try {
      return { records: readWorkoutLogs(), error: false };
    } catch {
      return { records: [], error: true };
    }
  });

  function searchExercises(keyword) {
    setQuery(keyword);
    setEquipment("");
    setSelectedMuscle("Tất cả");
    setSelectedExercise(null);
    document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
  }

  const selectMuscle = useCallback((muscle) => {
    setSelectedMuscle(muscle);
    setSelectedExercise(null);
  }, []);

  return (
    <>
      <Navbar onBrowseExercises={() => setSelectedExercise(null)} />
      <Hero
        search={searchInput}
        onSearchChange={setSearchInput}
        onSearch={searchExercises}
        onBrowseExercises={() => setSelectedExercise(null)}
      />

      <MuscleAnatomy onSelectMuscle={selectMuscle} />

      <ExerciseList
        selectedMuscle={selectedMuscle}
        onSelectMuscle={selectMuscle}
        onScheduleExercise={setScheduledExerciseId}
        selectedExercise={selectedExercise}
        onSelectExercise={setSelectedExercise}
        query={query}
        onClearSearch={() => {
          setQuery("");
          setSearchInput("");
        }}
        equipment={equipment}
        onSelectEquipment={setEquipment}
        onWorkoutSaved={(records) => setWorkoutHistory({ records, error: false })}
      />
      <WorkoutSchedule
        exerciseId={scheduledExerciseId}
        onSelectExercise={setScheduledExerciseId}
      />
      <WorkoutHistory {...workoutHistory} />
      <BmiCalculator />
    </>
  );
}
export default App;
