import { useState } from "react";
import { videos } from "../data/videos";
import ExerciseDetail from "./ExerciseDetail";
import { exercises } from "../data/exercises";

function ExerciseList({ selectedMuscle, onSelectMuscle }) {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const muscles = [
    "Tất cả",
    "Ngực",
    "Lưng",
    "Vai",
    "Tay",
    "Chân",
    "Bụng",
    "Mông",
  ];

  const filteredExercises = exercises.filter(
    (exercise) =>
      selectedMuscle === "Tất cả" ||
      exercise.muscle === selectedMuscle
  );

  if (selectedExercise) {
    return (
      <ExerciseDetail
        exercise={selectedExercise}
        exercises={exercises}
        onBack={() => setSelectedExercise(null)}
        onSelectExercise={setSelectedExercise}
      />
    );
  }

  return (
    <section className="exercises-section" id="exercises">
      <div className="section-heading">
        <p className="eyebrow">THƯ VIỆN GYM</p>
        <h2>
          KHÁM PHÁ <span>BÀI TẬP</span>
        </h2>
        <p>Khám phá các bài tập theo từng nhóm cơ.</p>
      </div>

      <div className="exercise-filters">
        {muscles.map((muscle) => (
          <button
            key={muscle}
            className={selectedMuscle === muscle ? "active" : ""}
            onClick={() => setSelectedMuscle(muscle)}
          >
            {muscle}
          </button>
        ))}
      </div>

      <div className="exercise-grid">
        {filteredExercises.map((exercise) => (
          <article
            className="exercise-card"
            key={exercise.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedExercise(exercise)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedExercise(exercise);
              }
            }}
          >
            <video
              className="exercise-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={exercise.video} type="video/mp4" />
              Trình duyệt không hỗ trợ video.
            </video>

            <div className="exercise-info">
              <span className="exercise-tag">{exercise.muscle}</span>

              <h3>{exercise.name}</h3>

              <p>Dụng cụ: {exercise.equipment}</p>
              <p>Độ khó: {exercise.level}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ExerciseList;
