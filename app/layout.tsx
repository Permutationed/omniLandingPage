import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Omni Pharma - Clinical Trial Automation',
  description: 'Omni Pharma accelerates the full trial lifecycle from protocol design to FDA submission using compliant, enterprise-grade AI designed for modern healthcare.',
  keywords: ['clinical trials', 'Phase II', 'Phase III', 'AI automation', 'pharma', 'CRO', 'clinical research', 'regulatory submission'],
  openGraph: {
    title: 'Omni - AI Automation for Phase II & III Clinical Trials',
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
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-screen bg-background font-sans antialiased text-slate-900">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
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
