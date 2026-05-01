"use client";
import { useState, useCallback } from "react";
import Link from "next/link";

function generatePassword(options) {
  const { length, uppercase, lowercase, numbers, symbols } = options;
  let chars = "";
  if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  if (!chars) return "";
  let password = "";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  return password;
}

function getStrength(password, options) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (options.uppercase && options.lowercase) score++;
  if (options.numbers) score++;
  if (options.symbols) score++;
  if (score <= 1) return { level: "weak", label: "Débil", color: "#c92a2a" };
  if (score <= 2) return { level: "fair", label: "Regular", color: "#e67700" };
  if (score <= 3) return { level: "good", label: "Buena", color: "#2b8a3e" };
  return { level: "strong", label: "Muy Fuerte", color: "#3b5bdb" };
}

export default function PasswordGenerator() {
  const [options, setOptions] = useState({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState(() => generatePassword({
    length: 16, uppercase: true, lowercase: true, numbers: true, symbols: true,
  }));
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    setPassword(generatePassword(options));
    setCopied(false);
  }, [options]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  const strength = getStrength(password, options);

  const updateOption = (key, value) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    setPassword(generatePassword(newOptions));
    setCopied(false);
  };

  return (
    <div className="tool-page">
      <div className="tool-page-header">
        <div className="tool-page-breadcrumb">
          <Link href="/">Inicio</Link> / <span>Generador de Contraseñas</span>
        </div>
        <h1>Generador de Contraseñas</h1>
        <p className="tool-page-description">
          Crea contraseñas seguras y aleatorias con opciones personalizables.
          Todas las contraseñas se generan localmente en tu navegador.
        </p>
      </div>

      <div className="tool-panel">
        <h2>Tu Contraseña</h2>
        <div className="result-box" style={{ justifyContent: "space-between", gap: 12 }}>
          <span style={{ wordBreak: "break-all" }}>{password}</span>
          <button className="btn btn-primary btn-sm" onClick={copyToClipboard}>
            {copied ? "✓ Copiada" : "Copiar"}
          </button>
        </div>
        <div className="strength-meter">
          <div className={`strength-meter-fill strength-${strength.level}`} />
        </div>
        <p className="strength-text" style={{ color: strength.color }}>
          Seguridad: {strength.label}
        </p>
      </div>

      <div className="tool-panel">
        <h2>Opciones</h2>
        <div className="form-group">
          <label className="form-label">
            Longitud: {options.length} caracteres
          </label>
          <input
            type="range"
            className="form-range"
            min="4"
            max="64"
            value={options.length}
            onChange={(e) => updateOption("length", parseInt(e.target.value))}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
            <span>4</span>
            <span>64</span>
          </div>
        </div>
        <div className="form-group">
          <label className="form-checkbox">
            <input type="checkbox" checked={options.uppercase} onChange={(e) => updateOption("uppercase", e.target.checked)} />
            Mayúsculas (A-Z)
          </label>
        </div>
        <div className="form-group">
          <label className="form-checkbox">
            <input type="checkbox" checked={options.lowercase} onChange={(e) => updateOption("lowercase", e.target.checked)} />
            Minúsculas (a-z)
          </label>
        </div>
        <div className="form-group">
          <label className="form-checkbox">
            <input type="checkbox" checked={options.numbers} onChange={(e) => updateOption("numbers", e.target.checked)} />
            Números (0-9)
          </label>
        </div>
        <div className="form-group">
          <label className="form-checkbox">
            <input type="checkbox" checked={options.symbols} onChange={(e) => updateOption("symbols", e.target.checked)} />
            Símbolos (!@#$%...)
          </label>
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={generate}>
            Generar Nueva Contraseña
          </button>
        </div>
      </div>

      <div className="ad-space">Espacio publicitario</div>

      <div className="tool-panel">
        <h2>¿Por qué usar contraseñas seguras?</h2>
        <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
          Las contraseñas débiles son la principal causa de hackeos. Una contraseña segura debe tener al menos 12 caracteres
          e incluir una combinación de letras mayúsculas, minúsculas, números y símbolos. Nuestro generador crea
          contraseñas verdaderamente aleatorias usando la API criptográfica de tu navegador, lo que garantiza la máxima seguridad.
          Nunca almacenamos ni transmitimos las contraseñas generadas.
        </p>
      </div>

      {copied && <div className="copy-toast">✓ Contraseña copiada al portapapeles</div>}
    </div>
  );
}
