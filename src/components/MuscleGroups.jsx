
const muscleGroups = [
  { id: 1, name: "Ngực", english: "Chest", icon: "💪" },
  { id: 2, name: "Lưng", english: "Back", icon: "🏋️" },
  { id: 3, name: "Vai", english: "Shoulders", icon: "🔥" },
  { id: 4, name: "Tay", english: "Arms", icon: "💪" },
  { id: 5, name: "Chân", english: "Legs", icon: "🦵" },
  { id: 6, name: "Bụng", english: "Abs", icon: "⚡" },
];

function MuscleGroups() {
  return (
    <section className="muscles-section" id="muscles">
      <div className="section-heading">
        <p className="eyebrow">KHÁM PHÁ CƠ THỂ</p>
        <h2>
          CÁC NHÓM <span>CƠ</span>
        </h2>
        <p>Chọn nhóm cơ để khám phá các bài tập phù hợp.</p>
      </div>

      <div className="muscle-grid">
        {muscleGroups.map((muscle) => (
          <div className="muscle-card" key={muscle.id}>
            <div className="muscle-icon">{muscle.icon}</div>
            <h3>{muscle.name}</h3>
            <p>{muscle.english}</p>
            <span className="muscle-arrow">Xem bài tập →</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MuscleGroups;
