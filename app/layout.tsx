import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// My
import { Analytics } from "@vercel/analytics/react"
import { ReactNode } from "react"


const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata = {
  title: "Юрий Королёв - Full Stack Web Developer",
  description: "Портфолио Full Stack Web Developer с опытом работы в React, Next.js, PostgreSQL, Docker, Git, CI/CD"
}

interface RootLayoutProps {
  children: ReactNode; // Specify the type for children as ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'


