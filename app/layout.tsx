import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ludus Labs | Build Locally, Impact Globally',
  description: 'A startup incubator focused on creating impact by leveraging emerging technologies with global reach. Join cross-university teams to solve critical challenges in healthcare, climate change, and education.',
  keywords: ['startup incubator', 'global entrepreneurship', 'innovation', 'AI', 'emerging technologies', 'study abroad', 'NUCU'],
  authors: [{ name: 'Ludus Labs' }],
  creator: 'Ludus Labs',
  publisher: 'Ludus Labs',
  metadataBase: new URL('https://luduslabs.co'),
  openGraph: {
    title: 'Ludus Labs | Build Locally, Impact Globally',
    description: 'A startup incubator focused on creating impact by leveraging emerging technologies with global reach.',
    url: 'https://luduslabs.co',
    siteName: 'Ludus Labs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ludus Labs | Build Locally, Impact Globally',
    description: 'A startup incubator focused on creating impact by leveraging emerging technologies with global reach.',
    creator: '@luduslabs_co',
  },
  icons: {
    icon: [
      { url: '/ludus-logo.svg', type: 'image/svg+xml' },
      { url: '/ludusfavicon32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/ludusfavicon16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/ludus-logo.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
