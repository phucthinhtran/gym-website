import { useEffect, useMemo, useRef, useState } from "react";
import { BodyChart, ViewSide, MUSCLE_METADATA } from "@emmorts/body-muscles";
import { exercises } from "../data/exercises";
import "./MuscleAnatomy.css";

const categories = {
  "Thân trên": ["Ngực", "Lưng", "Vai", "Tay"],
  "Cơ lõi": ["Bụng"],
  "Thân dưới": ["Chân", "Mông"],
};

const muscleToLibrary = {
  Ngực: ["Chest"],
  Lưng: ["Back"],
  Vai: ["Shoulders"],
  Tay: ["Arms"],
  Bụng: ["Abdominals"],
  Chân: ["Legs"],
  Mông: ["Legs"],
};

function getMuscleGroup(id) {
  const meta = MUSCLE_METADATA[id];
  if (!meta) return null;

  // Ưu tiên phân biệt cơ mông và cơ chân.
  const name = `${id} ${meta.name}`.toLowerCase();

  if (/glute|buttock/.test(name)) return "Mông";

  if (meta.group === "Legs") return "Chân";

  return (
    Object.keys(muscleToLibrary).find((muscle) =>
      muscleToLibrary[muscle].includes(meta.group),
    ) || null
  );
}

function increaseBodySpacing(container, spacing = 12) {
  const svg = container.querySelector(".body-chart-svg");
  if (!svg) return;

  // SVG gốc có viewBox 0 0 72 93
  svg.setAttribute("viewBox", `0 0 ${72 + spacing} 93`);

  // Dịch các vùng thuộc hình mặt sau sang phải
  const elements = svg.querySelectorAll(
    ".body-chart-background path, .body-chart-muscle",
  );

  elements.forEach((element) => {
    const box = element.getBBox();
    const centerX = box.x + box.width / 2;

    if (centerX > 35) {
      element.setAttribute("transform", `translate(${spacing}, 0)`);
    }
  });
}

export default function MuscleAnatomy({ onSelectMuscle }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [selectedMuscle, setSelectedMuscle] = useState("Ngực");
  const [hoveredMuscle, setHoveredMuscle] = useState(null);

  const activeMuscle = hoveredMuscle || selectedMuscle;

  const bodyState = useMemo(() => {
    const result = {};

    Object.keys(MUSCLE_METADATA).forEach((id) => {
      if (getMuscleGroup(id) === activeMuscle) {
        result[id] = {
          intensity: 10,
          selected: true,
        };
      }
    });

    return result;
  }, [activeMuscle]);

  const countExercises = (muscle) =>
    exercises.filter((exercise) => exercise.muscle === muscle).length;

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = new BodyChart(containerRef.current, {
      view: ViewSide.BOTH,
      bodyState: {},
      showTooltip: true,
      showViewLabel: false,
      intensityColor: (value) => (value > 0 ? "#dc2626" : "#737373"),

      onMuscleClick(id) {
        const muscle = getMuscleGroup(id);

        if (muscle) {
          setSelectedMuscle(muscle);
          onSelectMuscle?.(muscle);

          document.getElementById("exercises")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      },

      onMuscleHover(id) {
        setHoveredMuscle(id ? getMuscleGroup(id) : null);
      },
    });

    chartRef.current = chart;
    increaseBodySpacing(containerRef.current, 30);
    return () => {
      chart.destroy();
      chartRef.current = null;
    };
  }, [onSelectMuscle]);

  useEffect(() => {
    chartRef.current?.update({ bodyState });
  }, [bodyState]);

  const viewExercises = () => {
    onSelectMuscle?.(selectedMuscle);

    document.getElementById("exercises")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section id="muscles" className="anatomy-section">
      <div className="anatomy-heading">
        <span>GIẢI PHẪU CƠ THỂ</span>
        <h2>CÁC NHÓM CƠ TRÊN CƠ THỂ</h2>
        <p>Di chuột hoặc nhấn vào nhóm cơ để khám phá các bài tập tương ứng.</p>
      </div>

      <div className="anatomy-layout">
        <div className="anatomy-visual">
          <div ref={containerRef} className="anatomy-body-map" />

          <div className="anatomy-figure-labels">
            <span>MẶT TRƯỚC</span>
            <span>MẶT SAU</span>
          </div>

          <div className="anatomy-selected">
            <h3>{selectedMuscle}</h3>
            <p>{countExercises(selectedMuscle)} bài tập</p>

            <button onClick={viewExercises}>Xem bài tập</button>
          </div>
        </div>

        <div className="anatomy-sidebar">
          {Object.entries(categories).map(([category, muscles]) => (
            <div className="anatomy-category" key={category}>
              <h3>{category.toUpperCase()}</h3>

              <div className="anatomy-muscle-grid">
                {muscles.map((muscle) => (
                  <button
                    key={muscle}
                    className={
                      selectedMuscle === muscle
                        ? "anatomy-muscle active"
                        : "anatomy-muscle"
                    }
                    onMouseEnter={() => setHoveredMuscle(muscle)}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onFocus={() => setHoveredMuscle(muscle)}
                    onBlur={() => setHoveredMuscle(null)}
                    onClick={() => {
                      setSelectedMuscle(muscle);
                      onSelectMuscle?.(muscle);

                      document.getElementById("exercises")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    <span>{muscle}</span>
                    <span>{countExercises(muscle)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
