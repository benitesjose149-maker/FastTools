import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7082830788006588"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
