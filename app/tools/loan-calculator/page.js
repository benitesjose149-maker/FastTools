"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

function calculateLoan(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  if (monthlyRate === 0) {
    return { monthly: principal / months, totalInterest: 0, total: principal };
  }
  const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const total = monthly * months;
  const totalInterest = total - principal;
  return { monthly, totalInterest, total };
}

function formatCurrency(value) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(value);
}

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("15");

  const result = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!p || !r || !y || p <= 0 || r < 0 || y <= 0) return null;
    return calculateLoan(p, r, y);
  }, [principal, rate, years]);

  const principalPercent = result ? (parseFloat(principal) / result.total) * 100 : 0;
  const interestPercent = result ? (result.totalInterest / result.total) * 100 : 0;

  return (
    <div className="tool-page">
      <div className="tool-page-header">
        <div className="tool-page-breadcrumb">
          <Link href="/">Inicio</Link> / <span>Calculadora de Préstamos</span>
        </div>
        <h1>Calculadora de Préstamos</h1>
        <p className="tool-page-description">Calcula cuotas mensuales, intereses totales y el costo total de tu préstamo.</p>
      </div>

      <div className="tool-panel">
        <h2>Datos del Préstamo</h2>
        <div className="form-group">
          <label className="form-label">Monto del préstamo (USD)</label>
          <input type="number" className="form-input" value={principal} onChange={(e) => setPrincipal(e.target.value)} min="1" placeholder="100000" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Tasa de interés anual (%)</label>
            <input type="number" className="form-input" value={rate} onChange={(e) => setRate(e.target.value)} min="0" step="0.1" placeholder="5" />
          </div>
          <div className="form-group">
            <label className="form-label">Plazo (años)</label>
            <input type="number" className="form-input" value={years} onChange={(e) => setYears(e.target.value)} min="1" max="50" placeholder="15" />
          </div>
        </div>
      </div>

      {result && (
        <div className="tool-panel">
          <h2>Resultados</h2>
          <div className="loan-summary">
            <div className="loan-summary-item">
              <div className="result-value" style={{ fontSize: "1.4rem" }}>{formatCurrency(result.monthly)}</div>
              <div className="result-label">Cuota Mensual</div>
            </div>
            <div className="loan-summary-item">
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--color-warning)" }}>{formatCurrency(result.totalInterest)}</div>
              <div className="result-label">Total Intereses</div>
            </div>
            <div className="loan-summary-item">
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--color-text)" }}>{formatCurrency(result.total)}</div>
              <div className="result-label">Costo Total</div>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.85rem" }}>
              <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>Capital: {principalPercent.toFixed(1)}%</span>
              <span style={{ color: "var(--color-warning)", fontWeight: 600 }}>Intereses: {interestPercent.toFixed(1)}%</span>
            </div>
            <div style={{ display: "flex", height: 16, borderRadius: 8, overflow: "hidden" }}>
              <div style={{ width: `${principalPercent}%`, background: "var(--color-primary)" }} />
              <div style={{ width: `${interestPercent}%`, background: "var(--color-warning)" }} />
            </div>
          </div>

          <div className="loan-legend" style={{ marginTop: 16 }}>
            <div className="loan-legend-item">
              <div className="loan-legend-dot" style={{ background: "var(--color-primary)" }} />
              <span>Capital: {formatCurrency(parseFloat(principal))}</span>
            </div>
            <div className="loan-legend-item">
              <div className="loan-legend-dot" style={{ background: "var(--color-warning)" }} />
              <span>Intereses: {formatCurrency(result.totalInterest)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="ad-space">Espacio publicitario</div>

      <div className="tool-panel">
        <h2>Sobre esta calculadora</h2>
        <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
          Esta calculadora usa la fórmula de amortización francesa (cuota fija) para calcular los pagos mensuales de tu préstamo. Es ideal para hipotecas, préstamos personales y de auto. Los resultados son aproximados y pueden variar según las condiciones específicas de tu entidad financiera.
        </p>
      </div>
    </div>
  );
}
