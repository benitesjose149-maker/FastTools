"use client";
import { useState } from "react";
import Link from "next/link";

function calculateBMI(weight, height) {
  if (!weight || !height) return null;
  const heightM = height / 100;
  return weight / (heightM * heightM);
}

function getCategory(bmi) {
  if (bmi < 18.5) return { label: "Bajo peso", color: "#4dabf7", bg: "#e7f5ff" };
  if (bmi < 25) return { label: "Normal", color: "#2b8a3e", bg: "#ebfbee" };
  if (bmi < 30) return { label: "Sobrepeso", color: "#e67700", bg: "#fff9db" };
  return { label: "Obesidad", color: "#c92a2a", bg: "#fff0f0" };
}

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");

  let bmi = null;
  let category = null;

  if (weight && height) {
    let w = parseFloat(weight);
    let h = parseFloat(height);
    if (unit === "imperial") { w = w * 0.453592; h = h * 2.54; }
    bmi = calculateBMI(w, h);
    if (bmi) category = getCategory(bmi);
  }

  return (
    <div className="tool-page">
      <div className="tool-page-header">
        <div className="tool-page-breadcrumb">
          <Link href="/">Inicio</Link> / <span>Calculadora de IMC</span>
        </div>
        <h1>Calculadora de IMC</h1>
        <p className="tool-page-description">Calcula tu Índice de Masa Corporal y conoce tu categoría de peso.</p>
      </div>

      <div className="tool-panel">
        <h2>Datos</h2>
        <div className="form-group">
          <label className="form-label">Sistema</label>
          <div className="converter-category-tabs">
            <button className={`converter-tab ${unit === "metric" ? "active" : ""}`} onClick={() => setUnit("metric")}>Métrico (kg, cm)</button>
            <button className={`converter-tab ${unit === "imperial" ? "active" : ""}`} onClick={() => setUnit("imperial")}>Imperial (lb, in)</button>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Peso ({unit === "metric" ? "kg" : "lb"})</label>
            <input type="number" className="form-input" placeholder={unit === "metric" ? "70" : "154"} value={weight} onChange={(e) => setWeight(e.target.value)} min="1" />
          </div>
          <div className="form-group">
            <label className="form-label">Altura ({unit === "metric" ? "cm" : "in"})</label>
            <input type="number" className="form-input" placeholder={unit === "metric" ? "170" : "67"} value={height} onChange={(e) => setHeight(e.target.value)} min="1" />
          </div>
        </div>
      </div>

      {bmi && category && (
        <div className="tool-panel">
          <div className="bmi-result">
            <div className="result-value">{bmi.toFixed(1)}</div>
            <div className="result-label">Tu IMC</div>
            <div className="bmi-category" style={{ background: category.bg, color: category.color }}>{category.label}</div>
            <div className="bmi-scale" style={{ marginTop: 32 }}>
              <div className="bmi-scale-segment" style={{ background: "#4dabf7" }} />
              <div className="bmi-scale-segment" style={{ background: "#2b8a3e" }} />
              <div className="bmi-scale-segment" style={{ background: "#e67700" }} />
              <div className="bmi-scale-segment" style={{ background: "#c92a2a" }} />
            </div>
            <div className="bmi-labels">
              <span>Bajo peso</span><span>Normal</span><span>Sobrepeso</span><span>Obesidad</span>
            </div>
          </div>
        </div>
      )}

      <div className="ad-space">Espacio publicitario</div>

      <div className="tool-panel">
        <h2>Rangos de IMC</h2>
        <div className="result-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          <div className="result-item" style={{ borderTop: "3px solid #4dabf7" }}>
            <div style={{ fontWeight: 700 }}>Bajo peso</div>
            <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>&lt; 18.5</div>
          </div>
          <div className="result-item" style={{ borderTop: "3px solid #2b8a3e" }}>
            <div style={{ fontWeight: 700 }}>Normal</div>
            <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>18.5 - 24.9</div>
          </div>
          <div className="result-item" style={{ borderTop: "3px solid #e67700" }}>
            <div style={{ fontWeight: 700 }}>Sobrepeso</div>
            <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>25 - 29.9</div>
          </div>
          <div className="result-item" style={{ borderTop: "3px solid #c92a2a" }}>
            <div style={{ fontWeight: 700 }}>Obesidad</div>
            <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>&ge; 30</div>
          </div>
        </div>
      </div>

      <div className="tool-panel">
        <h2>Sobre el IMC</h2>
        <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
          El IMC es una medida que relaciona peso y altura. Es un indicador útil pero no tiene en cuenta masa muscular, estructura ósea o distribución de grasa. Consulta con un profesional de salud para una evaluación completa.
        </p>
      </div>
    </div>
  );
}
