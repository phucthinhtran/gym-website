import { useState } from "react";
import "./BmiCalculator.css";

const bmiFormat = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 2,
});

function getBmiCategory(bmi) {
  if (bmi < 18.5) return "Thiếu cân";
  if (bmi < 25) return "Cân nặng khỏe mạnh";
  if (bmi < 30) return "Thừa cân";
  return "Béo phì";
}

export default function BmiCalculator() {
  const [result, setResult] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const height = Number(formData.get("height")) / 100;
    const weight = Number(formData.get("weight"));
    const bmi = weight / height ** 2;

    if (height <= 0 || weight <= 0 || !Number.isFinite(bmi) || bmi <= 0) {
      setResult({ error: "Hãy nhập chiều cao và cân nặng hợp lệ." });
      return;
    }

    setResult({ bmi, category: getBmiCategory(bmi) });
  }

  return (
    <section className="bmi-section" id="bmi" aria-labelledby="bmi-title">
      <div className="bmi-card">
        <h2 id="bmi-title">Tính chỉ số BMI</h2>
        <p>Phân loại tham khảo theo CDC dành cho người từ 20 tuổi.</p>

        <form
          className="bmi-form"
          onSubmit={handleSubmit}
          onChange={() => setResult(null)}
        >
          <label>
            Chiều cao (cm)
            <input name="height" type="number" min="0" step="any" placeholder="170" required />
          </label>
          <label>
            Cân nặng (kg)
            <input name="weight" type="number" min="0" step="any" placeholder="65" required />
          </label>
          <button className="primary-button" type="submit">Tính BMI</button>
        </form>

        <div role="status">
          {result?.error && <p className="bmi-result">{result.error}</p>}
          {result && !result.error && (
            <p className="bmi-result">
              <strong>BMI {bmiFormat.format(result.bmi)} kg/m²</strong>
              <span>{result.category}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
