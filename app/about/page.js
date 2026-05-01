import Link from "next/link";

export const metadata = {
  title: "Sobre Nosotros",
  description: "Conoce más sobre FastTools, nuestra misión y por qué creamos herramientas online gratuitas.",
};

export default function About() {
  return (
    <div className="page-content">
      <h1>Sobre Nosotros</h1>
      <p className="page-subtitle">Conoce la historia detrás de FastTools</p>

      <h2>Nuestra Misión</h2>
      <p>
        En FastTools creemos que las herramientas digitales esenciales deben ser accesibles para todos.
        Nuestra misión es proporcionar herramientas online de alta calidad, completamente gratuitas y
        sin necesidad de registro, para que cualquier persona pueda resolver sus necesidades diarias
        de forma rápida y segura.
      </p>

      <h2>¿Qué Ofrecemos?</h2>
      <p>
        Ofrecemos una colección cuidadosamente seleccionada de herramientas online que cubren
        diversas necesidades:
      </p>
      <ul>
        <li><strong>Seguridad:</strong> Generador de contraseñas seguras con opciones personalizables.</li>
        <li><strong>Diseño:</strong> Generador de paletas de colores con diferentes modos de armonía.</li>
        <li><strong>Escritura:</strong> Contador de palabras y caracteres con estadísticas detalladas.</li>
        <li><strong>Compartir:</strong> Generador de códigos QR para URLs, textos y más.</li>
        <li><strong>Conversión:</strong> Conversor de unidades para longitud, peso, temperatura y más.</li>
        <li><strong>Salud:</strong> Calculadora de IMC con rangos de referencia.</li>
        <li><strong>Finanzas:</strong> Calculadora de préstamos con desglose de pagos.</li>
      </ul>

      <h2>Nuestros Valores</h2>
      <h3>Privacidad Primero</h3>
      <p>
        Todas nuestras herramientas procesan los datos localmente en tu navegador.
        No almacenamos, transmitimos ni compartimos tu información personal.
      </p>

      <h3>Sin Registro</h3>
      <p>
        No necesitas crear una cuenta ni proporcionar datos personales para usar
        cualquiera de nuestras herramientas. Simplemente accede y úsalas.
      </p>

      <h3>Siempre Gratuitas</h3>
      <p>
        Todas las herramientas son y serán siempre 100% gratuitas, sin límites
        de uso ni funciones premium ocultas.
      </p>

      <h2>Contacto</h2>
      <p>
        ¿Tienes sugerencias, preguntas o ideas para nuevas herramientas? Nos encantaría
        escucharte. Visita nuestra <Link href="/contact">página de contacto</Link> para
        comunicarte con nosotros.
      </p>
    </div>
  );
}
