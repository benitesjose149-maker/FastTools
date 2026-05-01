import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "FastTools - Herramientas Online Gratuitas",
    template: "%s | FastTools",
  },
  description:
    "Colección de herramientas online gratuitas: generador de contraseñas, calculadoras, conversores, generador de QR y más. Rápidas, seguras y fáciles de usar.",
  keywords: [
    "herramientas online",
    "calculadora",
    "generador de contraseñas",
    "conversor de unidades",
    "QR code generator",
    "herramientas gratuitas",
  ],
  openGraph: {
    title: "FastTools - Herramientas Online Gratuitas",
    description:
      "Colección de herramientas online gratuitas para tu día a día.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
