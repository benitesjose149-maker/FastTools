"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

const categories = {
  length: {
    label: "Longitud",
    units: {
      mm: { name: "Milímetros", factor: 0.001 },
      cm: { name: "Centímetros", factor: 0.01 },
      m: { name: "Metros", factor: 1 },
      km: { name: "Kilómetros", factor: 1000 },
      in: { name: "Pulgadas", factor: 0.0254 },
      ft: { name: "Pies", factor: 0.3048 },
      yd: { name: "Yardas", factor: 0.9144 },
      mi: { name: "Millas", factor: 1609.344 },
    },
  },
  weight: {
    label: "Peso",
    units: {
      mg: { name: "Miligramos", factor: 0.000001 },
      g: { name: "Gramos", factor: 0.001 },
      kg: { name: "Kilogramos", factor: 1 },
      t: { name: "Toneladas", factor: 1000 },
      oz: { name: "Onzas", factor: 0.0283495 },
      lb: { name: "Libras", factor: 0.453592 },
    },
  },
  temperature: {
    label: "Temperatura",
    units: {
      c: { name: "Celsius" },
      f: { name: "Fahrenheit" },
      k: { name: "Kelvin" },
    },
    convert: (value, from, to) => {
      let celsius;
      if (from === "c") celsius = value;
      else if (from === "f") celsius = (value - 32) * 5 / 9;
      else celsius = value - 273.15;

      if (to === "c") return celsius;
      if (to === "f") return celsius * 9 / 5 + 32;
      return celsius + 273.15;
    },
  },
  area: {
    label: "Área",
    units: {
      mm2: { name: "mm²", factor: 0.000001 },
      cm2: { name: "cm²", factor: 0.0001 },
      m2: { name: "m²", factor: 1 },
      ha: { name: "Hectáreas", factor: 10000 },
      km2: { name: "km²", factor: 1000000 },
      ft2: { name: "Pies²", factor: 0.092903 },
      ac: { name: "Acres", factor: 4046.86 },
    },
  },
  volume: {
    label: "Volumen",
    units: {
      ml: { name: "Mililitros", factor: 0.001 },
      l: { name: "Litros", factor: 1 },
      m3: { name: "m³", factor: 1000 },
      gal: { name: "Galones (US)", factor: 3.78541 },
      qt: { name: "Cuartos", factor: 0.946353 },
      pt: { name: "Pintas", factor: 0.473176 },
      floz: { name: "Onzas líquidas", factor: 0.0295735 },
    },
  },
  speed: {
    label: "Velocidad",
    units: {
      ms: { name: "m/s", factor: 1 },
      kmh: { name: "km/h", factor: 0.277778 },
      mph: { name: "mph", factor: 0.44704 },
      kn: { name: "Nudos", factor: 0.514444 },
    },
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [fromValue, setFromValue] = useState("1");

  const cat = categories[category];
  const unitKeys = Object.keys(cat.units);

  const result = useMemo(() => {
    const val = parseFloat(fromValue);
    if (isNaN(val)) return "";
    if (cat.convert) {
      return cat.convert(val, fromUnit, toUnit);
    }
    const base = val * cat.units[fromUnit].factor;
    return base / cat.units[toUnit].factor;
  }, [fromValue, fromUnit, toUnit, cat]);

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const keys = Object.keys(categories[newCat].units);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
    setFromValue("1");
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(result !== "" ? String(parseFloat(Number(result).toFixed(6))) : "");
  };

  return (
    <div className="tool-page">
      <div className="tool-page-header">
        <div className="tool-page-breadcrumb">
          <Link href="/">Inicio</Link> / <span>Conversor de Unidades</span>
        </div>
        <h1>Conversor de Unidades</h1>
        <p className="tool-page-description">
          Convierte entre diferentes unidades de longitud, peso, temperatura, área, volumen y velocidad.
        </p>
      </div>

      <div className="tool-panel">
        <div className="converter-category-tabs">
          {Object.entries(categories).map(([key, val]) => (
            <button
              key={key}
              className={`converter-tab ${category === key ? "active" : ""}`}
              onClick={() => handleCategoryChange(key)}
            >
              {val.label}
            </button>
          ))}
        </div>

        <div className="form-group">
          <label className="form-label">Valor</label>
          <input
            type="number"
            className="form-input"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            placeholder="Ingresa un valor"
          />
        </div>

        <div className="form-group">
          <label className="form-label">De</label>
          <select
            className="form-select"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            {unitKeys.map((key) => (
              <option key={key} value={key}>
                {cat.units[key].name}
              </option>
            ))}
          </select>
        </div>

        <div className="converter-swap">
          <button onClick={swap} title="Intercambiar unidades">⇅</button>
        </div>

        <div className="form-group">
          <label className="form-label">A</label>
          <select
            className="form-select"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            {unitKeys.map((key) => (
              <option key={key} value={key}>
                {cat.units[key].name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Resultado</label>
          <div className="result-box">
            {result !== ""
              ? `${fromValue} ${cat.units[fromUnit].name} = ${Number(result).toFixed(6).replace(/\.?0+$/, "")} ${cat.units[toUnit].name}`
              : "Ingresa un valor para convertir"}
          </div>
        </div>
      </div>

      <div className="ad-space">Espacio publicitario</div>

      <div className="tool-panel">
        <h2>Sobre el conversor de unidades</h2>
        <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
          Nuestro conversor de unidades soporta las categorías más usadas: longitud, peso, temperatura,
          área, volumen y velocidad. Es perfecto para estudiantes, profesionales, viajeros y cualquier
          persona que necesite convertir unidades rápidamente. Todas las conversiones se realizan con
          precisión utilizando factores de conversión estándar.
        </p>
      </div>
    </div>
  );
}
