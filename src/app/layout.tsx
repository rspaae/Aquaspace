import type { Metadata, Viewport } from 'next'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import { Providers } from '@/components/providers/Providers'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'AquaSpace — Aquascape Studio Bandung',
  description: 'AquaSpace menghadirkan custom aquascape, aquarium setup, aquatic plants dan maintenance untuk rumah maupun ruang bisnis.',
  keywords: ['aquascape', 'aquarium', 'aquatic plants', 'bandung', 'custom aquarium', 'aquarium maintenance', 'nature aquarium', 'iwagumi'],
  authors: [{ name: 'AquaSpace' }],
  creator: 'AquaSpace',
  publisher: 'AquaSpace',
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL('https://aquaspace.studio'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://aquaspace.studio',
    title: 'AquaSpace — Aquascape Studio Bandung',
    description: 'AquaSpace menghadirkan custom aquascape, aquarium setup, aquatic plants dan maintenance untuk rumah maupun ruang bisnis.',
    siteName: 'AquaSpace',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'AquaSpace Aquascape Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AquaSpace — Aquascape Studio Bandung',
    description: 'AquaSpace menghadirkan custom aquascape, aquarium setup, aquatic plants dan maintenance untuk rumah maupun ruang bisnis.',
    images: ['/images/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#17352B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/icon.svg" sizes="any" type="image/svg+xml" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}