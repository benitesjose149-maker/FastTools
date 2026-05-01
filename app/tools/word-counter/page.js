"use client";
import { useState } from "react";
import Link from "next/link";

function analyzeText(text) {
  if (!text.trim()) {
    return { characters: 0, charactersNoSpaces: 0, words: 0, sentences: 0, paragraphs: 0, readingTime: "0 min", speakingTime: "0 min" };
  }
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || (text.trim() ? 1 : 0);
  const readingMinutes = Math.ceil(words / 200);
  const speakingMinutes = Math.ceil(words / 130);
  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    readingTime: `${readingMinutes} min`,
    speakingTime: `${speakingMinutes} min`,
  };
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = analyzeText(text);

  return (
    <div className="tool-page">
      <div className="tool-page-header">
        <div className="tool-page-breadcrumb">
          <Link href="/">Inicio</Link> / <span>Contador de Palabras</span>
        </div>
        <h1>Contador de Palabras y Caracteres</h1>
        <p className="tool-page-description">
          Analiza tu texto al instante: cuenta palabras, caracteres, oraciones y estima el tiempo de lectura.
        </p>
      </div>

      <div className="tool-panel">
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">{stats.words}</span>
            <span className="stat-label">Palabras</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.characters}</span>
            <span className="stat-label">Caracteres</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.charactersNoSpaces}</span>
            <span className="stat-label">Sin espacios</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.sentences}</span>
            <span className="stat-label">Oraciones</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.paragraphs}</span>
            <span className="stat-label">Párrafos</span>
          </div>
        </div>

        <div className="form-group">
          <textarea
            className="form-textarea"
            style={{ minHeight: 200 }}
            placeholder="Escribe o pega tu texto aquí..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="btn-group">
          <button className="btn btn-secondary" onClick={() => setText("")}>
            Limpiar
          </button>
          <button className="btn btn-secondary" onClick={() => {
            navigator.clipboard.writeText(text);
          }}>
            Copiar Texto
          </button>
        </div>
      </div>

      <div className="tool-panel">
        <h2>Estadísticas Detalladas</h2>
        <div className="result-grid">
          <div className="result-item">
            <div className="result-value" style={{ fontSize: "1.5rem" }}>{stats.readingTime}</div>
            <div className="result-label">Tiempo de lectura</div>
          </div>
          <div className="result-item">
            <div className="result-value" style={{ fontSize: "1.5rem" }}>{stats.speakingTime}</div>
            <div className="result-label">Tiempo hablando</div>
          </div>
        </div>
      </div>

      <div className="ad-space">Espacio publicitario</div>

      <div className="tool-panel">
        <h2>¿Para qué sirve el contador de palabras?</h2>
        <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
          El contador de palabras es esencial para escritores, estudiantes y profesionales. Te ayuda a cumplir
          con requisitos de longitud en ensayos y artículos, optimizar contenido para SEO, estimar tiempos
          de lectura para blogs y presentaciones, y mantener la concisión en redes sociales. También es útil
          para traductores que cobran por palabra.
        </p>
      </div>
    </div>
  );
}
