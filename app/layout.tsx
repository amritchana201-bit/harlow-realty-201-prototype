import type { Metadata, Viewport } from 'next'
import { Lexend_Deca } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import StructuredData from '@/components/StructuredData'
import './globals.css'

const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-lexend',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://harlow-realty-201-prototype.vercel.app'),
  title: 'Harlow Realty | Premium Real Estate in Toronto & GTA',
  description:
    'Discover your dream home with Harlow Realty. Premium real estate services in Toronto and the Greater Toronto Area. Expert agents, luxury properties, and personalized service.',
  generator: 'v0.app',
  keywords: [
    'Toronto real estate',
    'GTA homes',
    'luxury properties',
    'real estate agents',
    'Harlow Realty',
    'buy home Toronto',
    'sell home Toronto',
  ],
  authors: [{ name: 'Harlow Realty' }],
  creator: 'Harlow Realty',
  publisher: 'Harlow Realty',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Harlow Realty | Premium Real Estate in Toronto & GTA',
    description:
      'Discover your dream home with Harlow Realty. Premium real estate services in Toronto and the Greater Toronto Area.',
    url: 'https://harlowrealty.ca',
    siteName: 'Harlow Realty',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harlow Realty | Premium Real Estate in Toronto & GTA',
    description:
      'Discover your dream home with Harlow Realty. Premium real estate services in Toronto and the Greater Toronto Area.',
  },
  icons: {
    icon: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#7EC8D8',
  width: 'device-width',
  initialScale: 1,
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={lexendDeca.variable}>
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
