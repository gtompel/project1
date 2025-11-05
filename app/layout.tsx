import "@/app/globals.css"
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/structured-data"
import { Toaster } from "@/components/ui/toaster"

// My
import { Analytics } from "@vercel/analytics/react"
import { ReactNode } from "react"

const jetbrain = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  display: 'swap',
  preload: false,
  variable: "--font-jetbrain",
});

export const metadata = {
  title: "Юрий Королёв - Full Stack Web Developer",
  description: "Портфолио Full Stack Web Developer с опытом работы в React, Next.js, PostgreSQL, Docker, Git, CI/CD",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "Web Development",
    "Frontend",
    "Backend",
    "DevOps",
    "Юрий Королёв",
    "Портфолио разработчика"
  ],
  authors: [{ name: "Юрий Королёв" }],
  creator: "Юрий Королёв",
  publisher: "Юрий Королёв",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://youchoice.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://youchoice.vercel.app",
    title: "Юрий Королёв - Full Stack Web Developer",
    description: "Портфолио Full Stack Web Developer с опытом работы в React, Next.js, PostgreSQL, Docker, Git, CI/CD",
    siteName: "Портфолио Юрия Королёва",
    images: [
      {
        url: "https://youchoice.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Юрий Королёв - Full Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Юрий Королёв - Full Stack Web Developer",
    description: "Портфолио Full Stack Web Developer с опытом работы в React, Next.js, PostgreSQL, Docker, Git, CI/CD",
    images: ["https://youchoice.vercel.app/opengraph-image"],
    creator: "@gtompel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
}

interface RootLayoutProps {
  children: ReactNode; // Specify the type for children as ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${jetbrain.variable} ${jetbrain.className}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Analytics />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


