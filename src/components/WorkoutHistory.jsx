import { useState } from "react";
import { exercises } from "../data/exercises";
import { appendWorkoutLog, deleteWorkoutLog, updateWorkoutLog } from "../data/workoutLogs";

function formatDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date.split("-").reverse().join("/") : date;
}

function today() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export default function WorkoutHistory({ records, error, onWorkoutSaved }) {
  const [exerciseId, setExerciseId] = useState("");
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");
  const entries = records
    .map((record, index) => ({ record, index }))
    .filter(({ record }) =>
      record && typeof record.exerciseName === "string" && typeof record.date === "string"
    );
  const exerciseOptions = new Map(exercises.map(({ id, name }) => [String(id), name]));
  for (const { record } of entries) {
    if (!exerciseOptions.has(String(record.exerciseId))) {
      exerciseOptions.set(String(record.exerciseId), record.exerciseName);
    }
  }
  const visibleEntries = entries
    .filter(({ record }) => !exerciseId || String(record.exerciseId) === exerciseId)
    .sort((a, b) => b.record.date.localeCompare(a.record.date) || b.index - a.index);

  function saveWorkout(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const metrics = {
      weight: Number(fields.get("weight")),
      sets: Number(fields.get("sets")),
      reps: Number(fields.get("reps")),
    };
    const exercise = exercises.find(({ id }) => String(id) === fields.get("exercise"));
    const date = fields.get("date");
    if (!Number.isFinite(metrics.weight) || metrics.weight < 0 ||
        !Number.isSafeInteger(metrics.sets) || metrics.sets < 1 ||
        !Number.isSafeInteger(metrics.reps) || metrics.reps < 1 ||
        (!editing && (!exercise || !date))) {
      setMessage("Hãy kiểm tra lại thông tin bài tập.");
      return;
    }

    try {
      const nextRecords = editing
        ? updateWorkoutLog(editing.index, editing.record, metrics)
        : appendWorkoutLog({
            exerciseId: exercise.id, exerciseName: exercise.name, date, ...metrics,
          });
      onWorkoutSaved(nextRecords);
      if (!editing && exerciseId && exerciseId !== String(exercise.id)) setExerciseId("");
      setMessage(editing ? "Đã cập nhật bản ghi." : "Đã thêm bài vào nhật ký.");
      setEditing(null);
      form.reset();
    } catch {
      setMessage("Không thể lưu bản ghi. Hãy tải lại trang và thử lại.");
    }
  }

  function deleteWorkout({ record, index }) {
    if (!window.confirm(`Xóa bản ghi “${record.exerciseName}” ngày ${formatDate(record.date)}?`)) return;

    try {
      const nextRecords = deleteWorkoutLog(index, record);
      onWorkoutSaved(nextRecords);
      if (editing?.index === index) setEditing(null);
      else if (editing && editing.index > index) {
        setEditing({ ...editing, index: editing.index - 1 });
      }
      if (exerciseId && !nextRecords.some((item) => String(item?.exerciseId) === exerciseId)) {
        setExerciseId("");
      }
      setMessage("Đã xóa bản ghi.");
    } catch {
      setMessage("Không thể xóa bản ghi. Hãy tải lại trang và thử lại.");
    }
  }

  return (
    <section className="workout-history" id="workout-history" aria-labelledby="history-title">
      <h2 id="history-title">Nhật ký tập luyện</h2>
      {error && <p role="status">Không thể đọc nhật ký đã lưu trên trình duyệt.</p>}
      <form
        className="journal-form"
        key={editing?.formKey ?? "new"}
        id="journal-form"
        onSubmit={saveWorkout}
      >
        <h3>{editing ? `Chỉnh sửa ${editing.record.exerciseName}` : "Thêm bài vào nhật ký"}</h3>
        {!editing && (
          <>
            <label>
              Bài tập
              <select name="exercise" required defaultValue="">
                <option value="">Chọn bài tập</option>
                {exercises.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
              </select>
            </label>
            <label>
              Ngày tập
              <input type="date" name="date" defaultValue={today()} required />
            </label>
          </>
        )}
        <label>
          Mức tạ (kg)
          <input type="number" name="weight" min="0" step="any" defaultValue={editing?.record.weight} placeholder="0 = không tạ" required />
        </label>
        <label>
          Số hiệp
          <input type="number" name="sets" min="1" defaultValue={editing?.record.sets} required />
        </label>
        <label>
          Số lần lặp
          <input type="number" name="reps" min="1" defaultValue={editing?.record.reps} required />
        </label>
        <button className="primary-button" type="submit">{editing ? "Lưu thay đổi" : "Thêm bài"}</button>
        {editing && (
          <button className="secondary-button" type="button" onClick={() => setEditing(null)}>Hủy</button>
        )}
      </form>
      <p role="status" className="journal-message">{message}</p>
      {!error && entries.length === 0 && (
        <p>Chưa có bản ghi nào.</p>
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
          {visibleEntries.length === 0 && <p>Chưa có bản ghi cho bài tập này.</p>}
          <div className="workout-history-table">
            <table aria-label="Các buổi tập đã lưu">
              <thead>
                <tr>
                  {["Ngày", "Bài tập", "Mức tạ (kg)", "Số hiệp", "Số lần lặp", "Thao tác"].map((heading) => (
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
                    <td>
                      <div className="journal-actions">
                        <a
                          className="secondary-button"
                          href="#journal-form"
                          onClick={() => {
                            setEditing((current) => ({
                              index,
                              record,
                              formKey: (current?.formKey ?? 0) + 1,
                            }));
                            setMessage("");
                          }}
                        >
                          Sửa
                        </a>
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => deleteWorkout({ record, index })}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
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
