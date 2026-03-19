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
  title: "InnerMan UroCare | Ropa interior para urologia",
  description:
    "InnerMan UroCare ofrece ropa interior masculina con soporte clinico y confort para pacientes con padecimientos urologicos.",
  metadataBase: new URL("https://innerman.vercel.app"),
  openGraph: {
    title: "InnerMan UroCare | Ropa interior para urologia",
    description:
      "Catalogo especializado en boxer briefs, trunks y briefs para pacientes de urologia.",
    url: "https://innerman.vercel.app",
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
