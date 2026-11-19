
import { useState } from "react";
import { appendWorkoutLog } from "../data/workoutLogs";
import "./ExerciseDetail.css";

function ExerciseDetail({
  exercise,
  onBack,
  exercises = [],
  onSelectExercise,
  onScheduleExercise,
  onWorkoutSaved,
}) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [message, setMessage] = useState("");

  if (!exercise) return null;

  const instructions = exercise.instructions || [];
  const tips = exercise.tips || [];
  const mistakes = exercise.mistakes || [];
  const safety = exercise.safety || [];

  const relatedExercises = exercises
    .filter(
      (item) =>
        item.id !== exercise.id &&
        item.muscle === exercise.muscle
    )
    .slice(0, 3);

  const handleSave = (e) => {
    e.preventDefault();

    const record = {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      weight: Number(weight),
      reps: Number(reps),
      sets: Number(sets),
      date,
    };

    try {
      const records = appendWorkoutLog(record);
      onWorkoutSaved(records);

      setMessage("Đã lưu nhật ký tập luyện!");
      setWeight("");
      setReps("");
      setSets("");
    } catch {
      setMessage("Không thể lưu. Hãy kiểm tra bộ nhớ trình duyệt.");
    }
  };

  return (
    <main className="detail-page">
      <nav className="detail-breadcrumb">
        <button onClick={onBack}>Trang chủ</button>
        <span>›</span>
        <button onClick={onBack}>Thư viện bài tập</button>
        <span>›</span>
        <strong>{exercise.name}</strong>
      </nav>

      <div className="detail-hero">
        <div className="detail-media">
          <video
            key={exercise.id}
            src={exercise.video}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
          />
          {exercise.videoSource && (
            <p className="detail-video-source">
              Nguồn video <a href={exercise.videoSource.url}>{exercise.videoSource.label}</a>
            </p>
          )}
        </div>

        <div className="detail-summary">
          <div className="detail-tags">
            <span>{exercise.level}</span>
            <span>{exercise.type}</span>
          </div>

          <h1>{exercise.name}</h1>
          <p className="detail-english">{exercise.english}</p>

          <p className="detail-description">
            {exercise.description || "Đang cập nhật mô tả bài tập."}
          </p>

          <div className="detail-stats">
            <div>
              <small>CƠ CHÍNH</small>
              <strong className="accent-text">{exercise.primaryMuscle || exercise.muscle}</strong>
            </div>
            <div>
              <small>CƠ PHỤ</small>
              <strong>{exercise.secondaryMuscle || "Đang cập nhật"}</strong>
            </div>
            <div>
              <small>DỤNG CỤ</small>
              <strong>{exercise.equipment}</strong>
            </div>
            <div>
              <small>ĐỘ KHÓ</small>
              <strong>{exercise.level}</strong>
            </div>
            <div>
              <small>LOẠI BÀI TẬP</small>
              <strong>{exercise.type}</strong>
            </div>
            <div>
              <small>VÙNG CƠ THỂ</small>
              <strong>{exercise.bodyRegion || "Đang cập nhật"}</strong>
            </div>
          </div>

          <button
            className="detail-add-button"
            onClick={() => {
              document
                .getElementById("workout-log")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            ＋ Thêm vào nhật ký tập
          </button>

          <a
            className="secondary-button detail-schedule-link"
            href="#schedule"
            onClick={() => onScheduleExercise(String(exercise.id))}
          >
            Thêm vào lịch tập
          </a>
        </div>
      </div>

      <div className="detail-content-grid">
        <section className="detail-panel">
          <h2>HƯỚNG DẪN THỰC HIỆN</h2>

          {instructions.length > 0 ? (
            <ol className="detail-steps">
              {instructions.map((step, index) => (
                <li key={index}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p>Đang cập nhật hướng dẫn.</p>
          )}

          <h3>♧ MẸO TẬP LUYỆN</h3>
          {tips.length > 0 ? (
            <ul>
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          ) : (
            <p>Đang cập nhật mẹo tập luyện.</p>
          )}
        </section>

        <div className="detail-side-panels">
          <section className="detail-panel">
            <h2>⚠ LỖI THƯỜNG GẶP</h2>
            {mistakes.length > 0 ? (
              <ul>
                {mistakes.map((mistake, index) => (
                  <li key={index}>{mistake}</li>
                ))}
              </ul>
            ) : (
              <p>Đang cập nhật lỗi thường gặp.</p>
            )}
          </section>

          <section className="detail-panel">
            <h2>♧ LƯU Ý AN TOÀN</h2>
            {safety.length > 0 ? (
              <ul>
                {safety.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            ) : (
              <p>Chọn mức tập phù hợp và thực hiện đúng kỹ thuật.</p>
            )}
          </section>
        </div>
      </div>

      <section className="detail-panel workout-log" id="workout-log">
        <h2>↗ NHẬT KÝ & TIẾN ĐỘ</h2>
        <p>Ghi lại mức tạ, số lần lặp và số hiệp của bạn.</p>

        <form className="workout-form" onSubmit={handleSave}>
          <label>
            Mức tạ (kg)
            <input
              type="number"
              min="0"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="0 = không tạ"
              required
            />
          </label>

          <label>
            Số lần lặp
            <input
              type="number"
              min="1"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
            />
          </label>

          <label>
            Số hiệp
            <input
              type="number"
              min="1"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              required
            />
          </label>

          <label>
            Ngày
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <button type="submit">Lưu</button>
        </form>

        <p className="save-message" role="status">{message}</p>
        <a className="secondary-button" href="#workout-history">Xem nhật ký</a>
      </section>

      <section className="detail-related">
        <h2>BÀI TẬP LIÊN QUAN</h2>

        {relatedExercises.length > 0 ? (
          <div className="related-grid">
            {relatedExercises.map((item) => (
              <button
                className="related-card"
                key={item.id}
                onClick={() => {
                  onSelectExercise?.(item);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <video
                  src={item.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.english}</p>
                  <span>{item.muscle}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p>Chưa có bài tập liên quan.</p>
        )}
      </section>
    </main>
  );
}

export default ExerciseDetail;
