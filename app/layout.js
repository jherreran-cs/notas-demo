import "./globals.css";

export const metadata = {
  title: "Notas Demo",
  description: "Proyecto de prueba: Next.js + Supabase + Vercel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
