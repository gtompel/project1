import type { Metadata } from "next";
import { Urbanist} from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"]
});


export const metadata: Metadata = {
  title: "My App Portfolio",
  description: "Generated by soul code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <body
        className={urbanist.className}
      >
        {children}
      </body>
    </html>
  );
}
