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

function readMatchingLogs(index, original) {
  const records = readWorkoutLogs();
  if (!records[index] || JSON.stringify(records[index]) !== JSON.stringify(original)) {
    throw new Error("Workout log changed");
  }
  return records;
}

export function updateWorkoutLog(index, original, metrics) {
  const records = readMatchingLogs(index, original);
  records[index] = { ...records[index], ...metrics };
  localStorage.setItem(storageKey, JSON.stringify(records));
  return records;
}

export function deleteWorkoutLog(index, original) {
  const records = readMatchingLogs(index, original);
  records.splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(records));
  return records;
}
