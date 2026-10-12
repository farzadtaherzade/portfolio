import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farzad Taherzadeh — Turning caffeine and curiosity into fun little programs",
  description:
    "Backend developer and creative coder. Node.js, TypeScript, C#, game dev experiments, and useful tools built with curiosity.",
  keywords: [
    "Farzad Taherzadeh",
    "backend developer",
    "Node.js",
    "TypeScript",
    "C#",
    "game development",
    "portfolio",
  ],
  authors: [{ name: "Farzad Taherzadeh" }],
  openGraph: {
    title: "Farzad Taherzadeh — Portfolio",
    description:
      "Turning caffeine and curiosity into fun little programs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-deep text-text-primary">
        {children}
      </body>
    </html>
  );
}
