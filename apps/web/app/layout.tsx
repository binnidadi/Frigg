import type { Metadata } from 'next'
import './styles.css'

export const metadata: Metadata = {
  title: 'Tollvörð Pro',
  description: 'SaaS-first grunnur fyrir innflutningsumsýslu og tollafgreiðslu.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="is">
      <body>{children}</body>
    </html>
  )
}
