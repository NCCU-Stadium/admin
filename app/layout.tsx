import './globals.css'
import type { Metadata } from 'next'
import Providers from './components/Providers'
import Sidebar from './components/Sidebar'
// import { Inter } from 'next/font/google'
// import Topbar from './components/Topbar'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-screen">
      <body className="flex flex-row h-full">
        <Providers>
          {/* <Topbar /> */}
          <Sidebar className="max-w-[1/6] bg-[#CE7178] top-0 botton-0" />
          {children}
        </Providers>
      </body>
    </html>
  )
}
