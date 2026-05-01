import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="header-logo" style={{ fontSize: "1.1rem" }}>
              <div className="header-logo-icon" style={{ width: 28, height: 28, fontSize: "0.8rem" }}>FT</div>
              FastTools
            </Link>
            <p>
              Herramientas online gratuitas para simplificar tu día a día. Rápidas, seguras y fáciles de usar.
            </p>
          </div>
          <div className="footer-col">
            <h4>Herramientas</h4>
            <ul>
              <li><Link href="/tools/password-generator">Contraseñas</Link></li>
              <li><Link href="/tools/color-palette">Paleta de Colores</Link></li>
              <li><Link href="/tools/word-counter">Contador de Palabras</Link></li>
              <li><Link href="/tools/qr-generator">Generador QR</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Más Herramientas</h4>
            <ul>
              <li><Link href="/tools/unit-converter">Conversor de Unidades</Link></li>
              <li><Link href="/tools/bmi-calculator">Calculadora IMC</Link></li>
              <li><Link href="/tools/loan-calculator">Calculadora Préstamos</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><Link href="/about">Sobre Nosotros</Link></li>
              <li><Link href="/privacy">Política de Privacidad</Link></li>
              <li><Link href="/contact">Contacto</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} FastTools. Todos los derechos reservados.</span>
          <span>Hecho con dedicación para la comunidad</span>
        </div>
      </div>
    </footer>
  );
}
