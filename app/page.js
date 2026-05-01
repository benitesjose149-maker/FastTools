import Link from "next/link";

const tools = [
  {
    slug: "password-generator",
    title: "Generador de Contraseñas",
    description: "Crea contraseñas seguras y aleatorias con opciones personalizables.",
    icon: "🔐",
    iconBg: "#edf0ff",
  },
  {
    slug: "color-palette",
    title: "Paleta de Colores",
    description: "Genera paletas de colores armoniosas para tus proyectos de diseño.",
    icon: "🎨",
    iconBg: "#fff0f6",
  },
  {
    slug: "word-counter",
    title: "Contador de Palabras",
    description: "Cuenta palabras, caracteres, oraciones y estima el tiempo de lectura.",
    icon: "📝",
    iconBg: "#f3f0ff",
  },
  {
    slug: "qr-generator",
    title: "Generador de QR",
    description: "Crea códigos QR personalizados para URLs, textos y más.",
    icon: "📱",
    iconBg: "#e6fcf5",
  },
  {
    slug: "unit-converter",
    title: "Conversor de Unidades",
    description: "Convierte entre diferentes unidades de longitud, peso, temperatura y más.",
    icon: "⚖️",
    iconBg: "#fff9db",
  },
  {
    slug: "bmi-calculator",
    title: "Calculadora de IMC",
    description: "Calcula tu Índice de Masa Corporal y conoce tu categoría de peso.",
    icon: "💪",
    iconBg: "#ebfbee",
  },
  {
    slug: "loan-calculator",
    title: "Calculadora de Préstamos",
    description: "Calcula cuotas mensuales, intereses totales y amortización de préstamos.",
    icon: "💰",
    iconBg: "#fff4e6",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>
          Herramientas Online <span>Gratuitas</span>
        </h1>
        <p>
          Todo lo que necesitas en un solo lugar. Herramientas rápidas, seguras y
          fáciles de usar para simplificar tu día a día.
        </p>
      </section>

      <section className="tools-section">
        <p className="tools-section-title">Herramientas Disponibles</p>
        <div className="tools-grid">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="tool-card"
            >
              <div
                className="tool-card-icon"
                style={{ background: tool.iconBg }}
              >
                {tool.icon}
              </div>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <div className="tool-card-arrow">Usar herramienta →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Rápidas</h3>
            <p>Todas las herramientas funcionan al instante, sin esperas ni registros.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Seguras</h3>
            <p>Tu información se procesa localmente en tu navegador. No almacenamos datos.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🆓</div>
            <h3>100% Gratuitas</h3>
            <p>Todas las herramientas son completamente gratuitas, sin límites de uso.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-box">
          <h2>¿Te resultaron útiles nuestras herramientas?</h2>
          <p>Comparte FastTools con tus amigos y colegas para que también puedan aprovecharlas.</p>
          <Link href="/about" className="btn">
            Conocer más sobre FastTools
          </Link>
        </div>
      </section>
    </>
  );
}
