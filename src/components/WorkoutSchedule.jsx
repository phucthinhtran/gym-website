import { useState } from "react";
import { exercises } from "../data/exercises";
import "./WorkoutSchedule.css";

const storageKey = "gym-workout-plans";
const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
const exerciseNames = new Map(exercises.map(({ id, name }) => [String(id), name]));

function parsePlans(raw) {
  const plans = JSON.parse(raw);
  if (!Array.isArray(plans) || !plans.every((plan) =>
    typeof plan?.id === "string" && plan.id &&
    typeof plan.name === "string" && plan.name.trim() &&
    Array.isArray(plan.days) && plan.days.length === days.length &&
    plan.days.every((day) => Array.isArray(day) &&
      day.every((id) => typeof id === "string" && id) &&
      new Set(day).size === day.length)
  ) || new Set(plans.map(({ id }) => id)).size !== plans.length) {
    throw new Error("Dữ liệu lịch tập không hợp lệ.");
  }
  return plans;
}

function loadSchedule() {
  try {
    return { plans: parsePlans(localStorage.getItem(storageKey) ?? "[]"), message: "" };
  } catch {
    return { plans: [], message: "Không thể đọc lịch đã lưu trên trình duyệt." };
  }
}

export default function WorkoutSchedule({ exerciseId, onSelectExercise }) {
  const [schedule, setSchedule] = useState(loadSchedule);
  const [selectedId, setSelectedId] = useState("");
  const { plans, message } = schedule;
  const activePlan = plans.find((plan) => plan.id === selectedId) ?? plans[0];

  function savePlans(nextPlans, successMessage) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(nextPlans));
      setSchedule({ plans: nextPlans, message: successMessage });
      return true;
    } catch {
      setSchedule({ plans, message: "Không thể lưu lịch trên trình duyệt." });
      return false;
    }
  }

  function createPlan(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = new FormData(form).get("name").trim();
    if (!name) {
      setSchedule({ plans, message: "Hãy nhập tên lịch tập." });
      return;
    }
    const id = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");
    if (savePlans([...plans, { id, name, days: days.map(() => []) }], "Đã tạo lịch tập.")) {
      setSelectedId(id);
      form.reset();
    }
  }

  function updatePlan(updatedPlan, message) {
    savePlans(
      plans.map((plan) => plan.id === updatedPlan.id ? updatedPlan : plan),
      message,
    );
  }

  function renamePlan(event) {
    event.preventDefault();
    const name = new FormData(event.currentTarget).get("name").trim();
    if (!name) {
      setSchedule({ plans, message: "Hãy nhập tên lịch tập." });
      return;
    }
    updatePlan({ ...activePlan, name }, "Đã đổi tên lịch tập.");
  }

  function updateDay(dayIndex, nextDay, message) {
    updatePlan({
      ...activePlan,
      days: activePlan.days.map((day, index) => index === dayIndex ? nextDay : day),
    }, message);
  }

  function addExercise(event) {
    event.preventDefault();
    const dayIndex = Number(new FormData(event.currentTarget).get("day"));
    const day = activePlan.days[dayIndex];
    if (!exerciseNames.has(exerciseId) || !day) return;
    if (day.includes(exerciseId)) {
      setSchedule({ plans, message: "Bài này đã có trong ngày được chọn." });
      return;
    }
    updateDay(dayIndex, [...day, exerciseId], `Đã thêm bài tập vào ${days[dayIndex]}.`);
  }

  function deletePlan() {
    if (window.confirm(`Xóa lịch “${activePlan.name}”?`)) {
      savePlans(plans.filter((plan) => plan.id !== activePlan.id), "Đã xóa lịch tập.");
    }
  }

  function downloadBackup() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(plans, null, 2)], {
      type: "application/json",
    }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "gymatlas-lich-tap.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function restoreBackup(event) {
    const input = event.currentTarget;
    const file = input.files[0];
    input.value = "";
    if (!file) return;

    try {
      const restoredPlans = parsePlans(await file.text());
      if (window.confirm("Thay lịch tập hiện tại bằng bản sao lưu đã chọn?") &&
          savePlans(restoredPlans, "Đã khôi phục lịch tập.")) {
        setSelectedId("");
      }
    } catch {
      setSchedule((current) => ({ ...current, message: "Tệp sao lưu không hợp lệ hoặc không đọc được." }));
    }
  }

  return (
    <section id="schedule" className="schedule" aria-labelledby="schedule-title">
      <header className="schedule-header">
        <div>
          <h2 id="schedule-title">Lịch tập của tôi</h2>
          <p>Lịch được lưu trên trình duyệt này.</p>
        </div>
        <p className="schedule-count">
          <strong>{activePlan?.days.filter((day) => day.length > 0).length ?? 0}</strong>
          {" "}buổi mỗi tuần
        </p>
      </header>

      <form className="schedule-form" onSubmit={createPlan}>
        <label>
          Tên lịch mới
          <input name="name" maxLength={80} placeholder="Ví dụ: Lịch tập 3 buổi" required />
        </label>
        <button className="primary-button" type="submit">Tạo lịch</button>
      </form>

      {activePlan && (
        <>
          <div className="schedule-picker" aria-label="Chọn lịch tập" role="group">
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                className="secondary-button"
                aria-pressed={plan.id === activePlan.id}
                onClick={() => setSelectedId(plan.id)}
              >
                {plan.name}
              </button>
            ))}
          </div>

          <form className="schedule-form" key={activePlan.id + ":" + activePlan.name} onSubmit={renamePlan}>
            <label>
              Tên lịch đang chọn
              <input name="name" maxLength={80} defaultValue={activePlan.name} required />
            </label>
            <button className="secondary-button" type="submit">Đổi tên</button>
            <button className="schedule-delete" type="button" onClick={deletePlan}>Xóa lịch</button>
          </form>

          <form className="schedule-form" onSubmit={addExercise}>
            <label>
              Bài tập
              <select value={exerciseId} onChange={(event) => onSelectExercise(event.target.value)} required>
                <option value="">Chọn bài tập</option>
                {exercises.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
              </select>
            </label>
            <label>
              Ngày tập
              <select name="day">
                {days.map((day, index) => <option key={day} value={index}>{day}</option>)}
              </select>
            </label>
            <button className="primary-button" type="submit">Thêm bài</button>
          </form>
        </>
      )}

      <div className="schedule-week">
        {days.map((day, index) => {
          const entries = activePlan?.days[index] ?? [];
          return (
            <article className="schedule-day" key={day}>
              <h3>{day}</h3>
              {entries.length === 0 ? <p>Nghỉ</p> : (
                <ul>
                  {entries.map((id) => (
                    <li key={id}>
                      <span>{exerciseNames.get(id) ?? `Bài tập #${id}`}</span>
                      <button
                        type="button"
                        className="schedule-delete"
                        aria-label={`Bỏ ${exerciseNames.get(id) ?? `bài tập #${id}`} khỏi ${day}`}
                        onClick={() => updateDay(index, entries.filter((item) => item !== id), "Đã bỏ bài khỏi lịch.")}
                      >
                        Bỏ
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>

      <p className="schedule-status" role="status">{message}</p>

      <details className="schedule-backup">
        <summary>Sao lưu và khôi phục</summary>
        <div className="schedule-form">
          <button className="secondary-button" type="button" onClick={downloadBackup}>Tải bản sao lưu</button>
          <label>
            Khôi phục từ tệp JSON
            <input type="file" accept=".json,application/json" onChange={restoreBackup} />
          </label>
        </div>
      </details>
    </section>
  );
}
