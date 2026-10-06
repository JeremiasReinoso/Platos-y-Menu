import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "PLATO — El menú que se puede ver", template: "%s · PLATO" },
  description: "Menús digitales visuales con 3D y realidad aumentada para restaurantes.",
  openGraph: { title: "PLATO", description: "Convertí curiosidad en pedidos.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />{children}</body></html>;
}
