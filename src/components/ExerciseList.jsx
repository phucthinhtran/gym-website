import ExerciseDetail from "./ExerciseDetail";
import { exercises } from "../data/exercises";

function normalizeSearch(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/g, "d");
}

const catalog = exercises.map((exercise) => ({
  exercise,
  equipment: exercise.equipment.split(",").map((item) => item.trim()),
  searchText: normalizeSearch(
    [exercise.name, exercise.english, exercise.muscle, exercise.equipment].join(" "),
  ),
}));

const equipmentOptions = [...new Set(catalog.flatMap((entry) => entry.equipment))]
  .sort((a, b) => a.localeCompare(b, "vi"));

function ExerciseList({
  selectedMuscle,
  onSelectMuscle,
  onScheduleExercise,
  selectedExercise,
  onSelectExercise,
  query,
  onClearSearch,
  equipment,
  onSelectEquipment,
  onWorkoutSaved,
}) {
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

  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const filteredExercises = catalog.filter(
    (entry) =>
      (selectedMuscle === "Tất cả" || entry.exercise.muscle === selectedMuscle) &&
      (!equipment || entry.equipment.includes(equipment)) &&
      terms.every((term) => entry.searchText.includes(term)),
  );

  if (selectedExercise) {
    return (
      <div id="exercises">
        <ExerciseDetail
          key={selectedExercise.id}
          exercise={selectedExercise}
          exercises={exercises}
          onBack={() => {
            onSelectExercise(null);
            document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
          }}
          onSelectExercise={onSelectExercise}
          onScheduleExercise={onScheduleExercise}
          onWorkoutSaved={onWorkoutSaved}
        />
      </div>
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
            aria-pressed={selectedMuscle === muscle}
            onClick={() => onSelectMuscle(muscle)}
          >
            {muscle}
          </button>
        ))}
      </div>

      <div className="exercise-tools">
        <label>
          Dụng cụ
          <select value={equipment} onChange={(event) => onSelectEquipment(event.target.value)}>
            <option value="">Tất cả dụng cụ</option>
            {equipmentOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        {query && (
          <button type="button" className="secondary-button" onClick={onClearSearch}>
            Xóa tìm kiếm “{query}”
          </button>
        )}
        <p role="status">
          {filteredExercises.length ? `${filteredExercises.length} bài tập` : "Không tìm thấy bài tập."}
        </p>
      </div>

      <div className="exercise-grid">
        {filteredExercises.map(({ exercise }) => (
          <article
            className="exercise-card"
            key={exercise.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectExercise(exercise)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectExercise(exercise);
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
