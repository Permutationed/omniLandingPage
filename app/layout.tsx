import type { Metadata } from 'next'
import { Source_Serif_4, Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { HeaderNav } from '@/components/layout/header-nav'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif-4',
  display: 'swap',
  weight: ['400', '600'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Astraea - Autonomous Clinical Trial Automation',
  description: 'Astraea accelerates the full trial lifecycle from protocol design to FDA submission using compliant, enterprise-grade AI designed for modern healthcare.',
  keywords: ['clinical trials', 'Phase II', 'Phase III', 'AI automation', 'pharma', 'CRO', 'clinical research', 'regulatory submission'],
  icons: {
    icon: '/8.png',
    shortcut: '/8.png',
    apple: '/8.png',
  },
  openGraph: {
    title: 'Astraea - Autonomous Clinical Trial Automation',
    description: 'AI automation for clinical trials. Built for regulated environments.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sourceSerif4.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <HeaderNav />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
