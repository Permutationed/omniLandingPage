import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Omni Card - Earn Rewards on Tuition',
  description: 'Pay tuition with your credit card. Earn rewards on your biggest expense. Zero fees for schools.',
  keywords: ['tuition payments', 'student rewards', 'credit card rewards', 'college payments', 'university tuition', 'payment processing'],
  openGraph: {
    title: 'Omni Card - Earn Rewards on Tuition',
    description: 'Pay tuition with your credit card. Earn rewards on your biggest expense.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistSans.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
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
