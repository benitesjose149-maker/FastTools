"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (key, value) => setForm({ ...form, [key]: value });

  if (submitted) {
    return (
      <div className="page-content">
        <h1>Contacto</h1>
        <div className="contact-card">
          <div className="contact-success">
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>✓</div>
            <h3>¡Mensaje Enviado!</h3>
            <p style={{ color: "var(--color-text-secondary)" }}>
              Gracias por contactarnos. Te responderemos lo antes posible.
            </p>
            <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
              Enviar otro mensaje
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <h1>Contacto</h1>
      <p className="page-subtitle">¿Tienes preguntas o sugerencias? Escríbenos y te responderemos pronto.</p>

      <div className="contact-card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="name">Nombre</label>
              <input id="name" type="text" className="form-input" placeholder="Tu nombre" value={form.name} onChange={(e) => update("name", e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input id="email" type="email" className="form-input" placeholder="tu@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="subject">Asunto</label>
            <select id="subject" className="form-select" value={form.subject} onChange={(e) => update("subject", e.target.value)} required>
              <option value="">Selecciona un asunto</option>
              <option value="suggestion">Sugerencia de herramienta</option>
              <option value="bug">Reportar un error</option>
              <option value="feedback">Feedback general</option>
              <option value="business">Colaboración</option>
              <option value="other">Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="message">Mensaje</label>
            <textarea id="message" className="form-textarea" placeholder="Escribe tu mensaje aquí..." value={form.message} onChange={(e) => update("message", e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  );
}
