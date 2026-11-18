import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MuscleGroups from "./components/MuscleGroups";
import ExerciseList from "./components/ExerciseList";
import MuscleAnatomy from "./components/MuscleAnatomy";

import "./App.css";

function App() {
  const [selectedMuscle, setSelectedMuscle] = useState("Tất cả");

  return (
    <>
      <Navbar />
      <Hero />

      <MuscleAnatomy onSelectMuscle={setSelectedMuscle} />

      <ExerciseList
        selectedMuscle={selectedMuscle}
        onSelectMuscle={setSelectedMuscle}
      />
    </>
  );
}
export default App;
