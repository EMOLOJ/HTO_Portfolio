import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Academic Portfolio | Research, Publications & Teaching",
  description: "Academic portfolio: research areas, publications, awards, and teaching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${sourceSans.variable}`}>
      <body className="font-sans bg-cream text-forest antialiased">
        <Sidebar />
        <Navbar />
        <main className="md:ml-56 lg:ml-64 min-h-screen flex flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
