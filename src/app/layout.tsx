import type { Metadata } from 'next'
import { clsx } from 'clsx'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/css/reset.css'
import '@/css/global.scss'

export const metadata: Metadata = {
  title: 'Thalles Lopes',
  description:
    "Hello, I'm Thalles, a web developer & digital designer based in São Paulo. For over a decade, I've been creating engaging digital experiences through web design, architecture and illustration",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={clsx(GeistSans.variable, GeistMono.variable)}>
        {children}
      </body>
    </html>
  )
}

