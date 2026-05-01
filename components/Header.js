"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="header-logo">
          <div className="header-logo-icon">FT</div>
          FastTools
        </Link>
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>Sobre Nosotros</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contacto</Link>
        </nav>
      </div>
    </header>
  );
}
