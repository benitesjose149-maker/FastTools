"use client";
import { useState, useCallback } from "react";
import Link from "next/link";

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function hexToHsl(hex) {
  let { r, g, b } = hexToRgb(hex);
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

function generatePalette(mode, count) {
  const baseHue = Math.floor(Math.random() * 360);
  let colors = [];

  switch (mode) {
    case "analogous":
      for (let i = 0; i < count; i++) {
        const offset = -30 + (60 / (count - 1)) * i;
        colors.push(hslToHex((baseHue + offset + 360) % 360, randRange(55, 75), randRange(45, 60)));
      }
      break;

    case "complementary":
      {
        const half = Math.ceil(count / 2);
        for (let i = 0; i < half; i++) {
          colors.push(hslToHex(baseHue, randRange(50, 70), 35 + (i * 30 / half)));
        }
        for (let i = 0; i < count - half; i++) {
          colors.push(hslToHex((baseHue + 180) % 360, randRange(50, 70), 35 + (i * 30 / (count - half))));
        }
      }
      break;

    case "triadic":
      for (let i = 0; i < count; i++) {
        const hueIndex = i % 3;
        const hue = (baseHue + hueIndex * 120) % 360;
        colors.push(hslToHex(hue, randRange(55, 70), randRange(42, 62)));
      }
      break;

    case "split-complementary":
      {
        const split1 = (baseHue + 150) % 360;
        const split2 = (baseHue + 210) % 360;
        const hues = [baseHue, split1, split2];
        for (let i = 0; i < count; i++) {
          colors.push(hslToHex(hues[i % 3], randRange(55, 70), randRange(42, 58)));
        }
      }
      break;

    case "square":
      for (let i = 0; i < count; i++) {
        const hue = (baseHue + (i % 4) * 90) % 360;
        colors.push(hslToHex(hue, randRange(55, 70), randRange(42, 58)));
      }
      break;

    case "rectangular":
      {
        const hues = [baseHue, (baseHue + 60) % 360, (baseHue + 180) % 360, (baseHue + 240) % 360];
        for (let i = 0; i < count; i++) {
          colors.push(hslToHex(hues[i % 4], randRange(55, 70), randRange(42, 58)));
        }
      }
      break;

    case "monochromatic":
      for (let i = 0; i < count; i++) {
        const lightness = 25 + (50 / (count - 1)) * i;
        colors.push(hslToHex(baseHue, randRange(40, 65), lightness));
      }
      break;

    case "warm":
      for (let i = 0; i < count; i++) {
        const hue = randRange(0, 60);
        colors.push(hslToHex(hue, randRange(60, 85), randRange(45, 60)));
      }
      break;

    case "cool":
      for (let i = 0; i < count; i++) {
        const hue = randRange(180, 270);
        colors.push(hslToHex(hue, randRange(50, 75), randRange(42, 58)));
      }
      break;

    case "pastel":
      for (let i = 0; i < count; i++) {
        const hue = (baseHue + (360 / count) * i) % 360;
        colors.push(hslToHex(hue, randRange(40, 60), randRange(75, 88)));
      }
      break;

    case "neon":
      for (let i = 0; i < count; i++) {
        const hue = (baseHue + (360 / count) * i) % 360;
        colors.push(hslToHex(hue, randRange(90, 100), randRange(50, 60)));
      }
      break;

    case "earth":
      {
        const earthHues = [25, 35, 45, 90, 140];
        for (let i = 0; i < count; i++) {
          const hue = earthHues[i % earthHues.length] + randRange(-10, 10);
          colors.push(hslToHex(hue, randRange(30, 55), randRange(30, 55)));
        }
      }
      break;

    case "jewel":
      {
        const jewelHues = [0, 270, 210, 140, 330];
        for (let i = 0; i < count; i++) {
          const hue = jewelHues[i % jewelHues.length] + randRange(-15, 15);
          colors.push(hslToHex(hue, randRange(60, 85), randRange(30, 45)));
        }
      }
      break;

    case "gradient":
      {
        const endHue = (baseHue + randRange(30, 120)) % 360;
        for (let i = 0; i < count; i++) {
          const t = i / (count - 1);
          const hue = baseHue + t * (endHue - baseHue);
          colors.push(hslToHex((hue + 360) % 360, randRange(55, 70), 40 + t * 20));
        }
      }
      break;

    case "sunset":
      {
        const sunsetStops = [350, 15, 35, 45, 270];
        for (let i = 0; i < count; i++) {
          const hue = sunsetStops[i % sunsetStops.length] + randRange(-5, 5);
          const lightness = 35 + (i / count) * 25;
          colors.push(hslToHex((hue + 360) % 360, randRange(65, 90), lightness));
        }
      }
      break;

    case "ocean":
      for (let i = 0; i < count; i++) {
        const hue = 180 + randRange(-20, 30);
        const lightness = 25 + (i / count) * 40;
        colors.push(hslToHex(hue, randRange(50, 80), lightness));
      }
      break;

    case "forest":
      for (let i = 0; i < count; i++) {
        const hue = 100 + randRange(-20, 40);
        const lightness = 20 + (i / count) * 35;
        colors.push(hslToHex(hue, randRange(35, 65), lightness));
      }
      break;

    default: // random
      for (let i = 0; i < count; i++) {
        colors.push(hslToHex(Math.floor(Math.random() * 360), randRange(50, 80), randRange(40, 65)));
      }
  }
  return colors;
}

const modes = [
  { id: "random", label: "🎲 Aleatorio" },
  { id: "analogous", label: "Análogo" },
  { id: "complementary", label: "Complementario" },
  { id: "split-complementary", label: "Split Complementario" },
  { id: "triadic", label: "Triádico" },
  { id: "square", label: "Cuadrado" },
  { id: "rectangular", label: "Rectangular" },
  { id: "monochromatic", label: "Monocromático" },
  { id: "gradient", label: "Degradado" },
  { id: "warm", label: "🔥 Cálidos" },
  { id: "cool", label: "❄️ Fríos" },
  { id: "pastel", label: "🌸 Pastel" },
  { id: "neon", label: "⚡ Neón" },
  { id: "earth", label: "🌍 Tierra" },
  { id: "jewel", label: "💎 Joya" },
  { id: "sunset", label: "🌅 Atardecer" },
  { id: "ocean", label: "🌊 Océano" },
  { id: "forest", label: "🌲 Bosque" },
];

const colorCounts = [3, 4, 5, 6, 7, 8];

export default function ColorPalette() {
  const [mode, setMode] = useState("random");
  const [count, setCount] = useState(5);
  const [palette, setPalette] = useState(() => generatePalette("random", 5));
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [format, setFormat] = useState("hex");

  const generate = useCallback(() => {
    setPalette(generatePalette(mode, count));
    setCopiedIndex(null);
  }, [mode, count]);

  function getColorString(hex) {
    if (format === "hex") return hex.toUpperCase();
    if (format === "rgb") {
      const { r, g, b } = hexToRgb(hex);
      return `rgb(${r}, ${g}, ${b})`;
    }
    const { h, s, l } = hexToHsl(hex);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  const copyColor = (hex, index) => {
    navigator.clipboard.writeText(getColorString(hex));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const copyAll = () => {
    const all = palette.map((c) => getColorString(c)).join(", ");
    navigator.clipboard.writeText(all);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const exportCSS = () => {
    const css = palette.map((c, i) => `  --color-${i + 1}: ${getColorString(c)};`).join("\n");
    const text = `:root {\n${css}\n}`;
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  function getContrastColor(hex) {
    const { r, g, b } = hexToRgb(hex);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? "#000" : "#fff";
  }

  return (
    <div className="tool-page">
      <div className="tool-page-header">
        <div className="tool-page-breadcrumb">
          <Link href="/">Inicio</Link> / <span>Paleta de Colores</span>
        </div>
        <h1>Generador de Paleta de Colores</h1>
        <p className="tool-page-description">
          Genera paletas de colores armoniosas con 18 modos diferentes.
          Haz clic en un color para copiar su código. No necesita API — todo se genera con matemáticas.
        </p>
      </div>

      <div className="tool-panel">
        <div className="color-palette-display">
          {palette.map((color, i) => (
            <div
              key={i}
              className="color-swatch"
              style={{ background: color }}
              onClick={() => copyColor(color, i)}
              title={`Clic para copiar ${getColorString(color)}`}
            >
              {copiedIndex === i && (
                <span className="color-swatch-copied">¡Copiado!</span>
              )}
              <span style={{
                color: getContrastColor(color) === "#000" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)",
                background: getContrastColor(color) === "#000" ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.25)"
              }}>
                {getColorString(color)}
              </span>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label className="form-label">Modo de armonía ({modes.length} tipos)</label>
          <div className="converter-category-tabs">
            {modes.map((m) => (
              <button
                key={m.id}
                className={`converter-tab ${mode === m.id ? "active" : ""}`}
                onClick={() => { setMode(m.id); setPalette(generatePalette(m.id, count)); }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Cantidad de colores</label>
            <div className="converter-category-tabs">
              {colorCounts.map((n) => (
                <button
                  key={n}
                  className={`converter-tab ${count === n ? "active" : ""}`}
                  onClick={() => { setCount(n); setPalette(generatePalette(mode, n)); }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Formato</label>
            <div className="converter-category-tabs">
              <button className={`converter-tab ${format === "hex" ? "active" : ""}`} onClick={() => setFormat("hex")}>HEX</button>
              <button className={`converter-tab ${format === "rgb" ? "active" : ""}`} onClick={() => setFormat("rgb")}>RGB</button>
              <button className={`converter-tab ${format === "hsl" ? "active" : ""}`} onClick={() => setFormat("hsl")}>HSL</button>
            </div>
          </div>
        </div>

        <div className="btn-group">
          <button className="btn btn-primary" onClick={generate}>
            Generar Nueva Paleta
          </button>
          <button className="btn btn-secondary" onClick={copyAll}>
            {copiedAll ? "✓ Copiado" : "Copiar Todos"}
          </button>
          <button className="btn btn-secondary" onClick={exportCSS}>
            Exportar CSS
          </button>
        </div>
      </div>

      <div className="tool-panel">
        <h2>Detalle de Colores</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {palette.map((color, i) => {
            const rgb = hexToRgb(color);
            const hsl = hexToHsl(color);
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "12px 16px", background: "var(--color-surface-alt)",
                borderRadius: "var(--radius-sm)", cursor: "pointer"
              }} onClick={() => copyColor(color, i)}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: color, border: "1px solid var(--color-border)", flexShrink: 0
                }} />
                <div style={{ flex: 1, display: "flex", gap: 24, flexWrap: "wrap", fontSize: "0.85rem" }}>
                  <span style={{ fontWeight: 600, minWidth: 80 }}>{color.toUpperCase()}</span>
                  <span style={{ color: "var(--color-text-secondary)" }}>rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
                  <span style={{ color: "var(--color-text-secondary)" }}>hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)</span>
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  {copiedIndex === i ? "✓" : "Copiar"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="ad-space">Espacio publicitario</div>

      <div className="tool-panel">
        <h2>Tipos de Armonía de Colores</h2>
        <div style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
          <p style={{ marginBottom: 12 }}><strong>Análogo:</strong> Colores adyacentes en la rueda cromática. Crean armonía natural y suave.</p>
          <p style={{ marginBottom: 12 }}><strong>Complementario:</strong> Colores opuestos en la rueda. Máximo contraste y energía visual.</p>
          <p style={{ marginBottom: 12 }}><strong>Split Complementario:</strong> Un color base + los dos adyacentes a su complementario. Balance entre contraste y armonía.</p>
          <p style={{ marginBottom: 12 }}><strong>Triádico:</strong> 3 colores equidistantes (120°). Variedad equilibrada.</p>
          <p style={{ marginBottom: 12 }}><strong>Cuadrado:</strong> 4 colores equidistantes (90°). Muy diverso.</p>
          <p style={{ marginBottom: 12 }}><strong>Rectangular:</strong> 4 colores en pares complementarios. Versatilidad.</p>
          <p style={{ marginBottom: 12 }}><strong>Monocromático:</strong> Variaciones de un solo tono. Elegancia y cohesión.</p>
          <p style={{ marginBottom: 12 }}><strong>Degradado:</strong> Transición suave entre dos tonos.</p>
          <p style={{ marginBottom: 12 }}><strong>Cálidos / Fríos:</strong> Paletas basadas en temperatura del color.</p>
          <p style={{ marginBottom: 12 }}><strong>Pastel / Neón:</strong> Saturación y luminosidad específicas.</p>
          <p><strong>Temáticos (Tierra, Joya, Atardecer, Océano, Bosque):</strong> Inspirados en la naturaleza y gemas.</p>
        </div>
      </div>
    </div>
  );
}
