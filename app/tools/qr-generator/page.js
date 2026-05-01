"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function QRGenerator() {
  const [text, setText] = useState("https://fasttools.com");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [size, setSize] = useState(256);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function generateQR() {
      if (!text.trim()) {
        setQrDataUrl("");
        return;
      }
      try {
        const QRCode = (await import("qrcode")).default;
        const url = await QRCode.toDataURL(text, {
          width: size,
          margin: 2,
          color: { dark: "#1a1d26", light: "#ffffff" },
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error(err);
      }
    }
    generateQR();
  }, [text, size]);

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="tool-page">
      <div className="tool-page-header">
        <div className="tool-page-breadcrumb">
          <Link href="/">Inicio</Link> / <span>Generador de QR</span>
        </div>
        <h1>Generador de Códigos QR</h1>
        <p className="tool-page-description">
          Crea códigos QR personalizados para URLs, textos, emails y más.
          Descarga tu QR en formato PNG.
        </p>
      </div>

      <div className="tool-panel">
        <h2>Contenido del QR</h2>
        <div className="form-group">
          <label className="form-label">Texto o URL</label>
          <textarea
            className="form-textarea"
            style={{ minHeight: 80 }}
            placeholder="Escribe una URL, texto, email..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Tamaño: {size}px</label>
          <input
            type="range"
            className="form-range"
            min="128"
            max="512"
            step="32"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
            <span>128px</span>
            <span>512px</span>
          </div>
        </div>
      </div>

      <div className="tool-panel">
        <h2>Vista Previa</h2>
        <div className="qr-display">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Código QR generado" width={size} height={size} />
          ) : (
            <p style={{ color: "var(--color-text-muted)" }}>Ingresa un texto para generar el QR</p>
          )}
        </div>
        {qrDataUrl && (
          <div className="btn-group" style={{ marginTop: 16, justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={downloadQR}>
              Descargar PNG
            </button>
            <button className="btn btn-secondary" onClick={() => {
              navigator.clipboard.writeText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}>
              {copied ? "✓ Copiado" : "Copiar Texto"}
            </button>
          </div>
        )}
      </div>

      <div className="ad-space">Espacio publicitario</div>

      <div className="tool-panel">
        <h2>¿Cómo usar los códigos QR?</h2>
        <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
          Los códigos QR son una forma rápida de compartir información. Puedes usarlos para compartir
          URLs de tu negocio, información de contacto, enlaces a redes sociales, menús de restaurantes,
          tarjetas de presentación digitales y mucho más. Simplemente escanea el código con la cámara
          de cualquier smartphone para acceder al contenido.
        </p>
      </div>
    </div>
  );
}
