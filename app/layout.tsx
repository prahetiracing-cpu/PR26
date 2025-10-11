import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Goldman } from "next/font/google";
import { Analytics } from "@vercel/analytics/next" 

const goldman = Goldman({
  subsets: ["latin"],
  weight: ["400", "700"], 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Praheti Racing",
  description: "SAE Club From Cbit",
  icons:{
    icon:{url:'./pr26.png',sizes: '60x60' }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={goldman.className}
      >
        <Navbar/>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}

