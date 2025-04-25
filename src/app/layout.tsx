import { Suspense } from 'react'
import { clsx } from 'clsx'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import '@/css/reset.css'
import '@/css/global.scss'

import Providers from './providers'

import { Frame } from '@/components/frame'
import { Content } from '@/components/content'
import { Loading } from '@/components/loading'
import { Experience } from '@/components/experience'
import { UI } from '@/components/ui'
import { Cursor } from '@/components/cursor'

import { loadProjects } from '@/utils/load-data'

export const metadata: Metadata = {
  title: 'Thalles Lopes',
  description:
    "Hello, I'm Thalles, a web developer & digital designer based in São Paulo. For over a decade, I've been creating engaging digital experiences through web design, architecture and illustration",
  openGraph: {
    images: ['/images/thalles-work.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const projects = loadProjects()

  return (
    <html lang="en">
      <body className={clsx(GeistSans.variable, GeistMono.variable)}>
        <Loading />
        <Suspense>
          <Providers>
            <Frame>{children}</Frame>
            <Content>
              <Experience projects={projects} />
              <UI />
            </Content>
            <Cursor />
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}

