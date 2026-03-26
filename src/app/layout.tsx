import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vital Care | Equipos Médicos y Suplementos",
  description:
    "Vital Care: distribución de equipos médicos, electrocauterios, material de reposición, suplementos y línea de descanso. Servicio profesional en Veracruz.",
  metadataBase: new URL("https://asvitalcare.com"),
  openGraph: {
    title: "Vital Care | Equipos Médicos y Suplementos",
    description:
      "Equipos de ginecología, urología, oftalmología, electrocauterios y más. Renta de equipos Venus y Laser.",
    url: "https://asvitalcare.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
