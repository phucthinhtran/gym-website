const storageKey = "gym-workout-logs";

export function readWorkoutLogs() {
  const records = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
  if (!Array.isArray(records)) throw new Error("Invalid workout log");
  return records;
}

export function appendWorkoutLog(record) {
  const records = [...readWorkoutLogs(), record];
  localStorage.setItem(storageKey, JSON.stringify(records));
  return records;
}
