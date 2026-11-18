import { useState } from "react";

function formatDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date.split("-").reverse().join("/") : date;
}

export default function WorkoutHistory({ records, error }) {
  const [exerciseId, setExerciseId] = useState("");
  const entries = records
    .map((record, index) => ({ record, index }))
    .filter(({ record }) =>
      record && typeof record.exerciseName === "string" && typeof record.date === "string"
    );
  const exerciseOptions = new Map(entries.map(({ record }) => [
    String(record.exerciseId), record.exerciseName,
  ]));
  const visibleEntries = entries
    .filter(({ record }) => !exerciseId || String(record.exerciseId) === exerciseId)
    .sort((a, b) => b.record.date.localeCompare(a.record.date) || b.index - a.index);

  return (
    <section className="workout-history" id="workout-history" aria-labelledby="history-title">
      <h2 id="history-title">Nhật ký tập luyện</h2>
      {error && <p role="status">Không thể đọc nhật ký đã lưu trên trình duyệt.</p>}
      {!error && entries.length === 0 && (
        <p>Chưa có bản ghi. Mở chi tiết một bài tập để ghi lại buổi tập đầu tiên.</p>
      )}
      {entries.length > 0 && (
        <>
          <div className="exercise-tools">
            <label>
              Bài tập
              <select value={exerciseId} onChange={(event) => setExerciseId(event.target.value)}>
                <option value="">Tất cả bài tập</option>
                {Array.from(exerciseOptions, ([id, name]) => <option key={id} value={id}>{name}</option>)}
              </select>
            </label>
          </div>
          <div className="workout-history-table">
            <table aria-label="Các buổi tập đã lưu">
              <thead>
                <tr>
                  {["Ngày", "Bài tập", "Mức tạ (kg)", "Số hiệp", "Số lần lặp"].map((heading) => (
                    <th scope="col" key={heading}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleEntries.map(({ record, index }) => (
                  <tr key={index}>
                    <td>{formatDate(record.date)}</td>
                    <td>{record.exerciseName}</td>
                    <td>{record.weight}</td>
                    <td>{record.sets}</td>
                    <td>{record.reps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
