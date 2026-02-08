import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VJ-PGs | Student Housing & Brokerage",
  description: 'Verified PGs near Cambridge & Garden City University. Book via VJ-PGs for ₹2,000 Flat Discount.',
  generator: 'v0.app',
  icons: {
    icon: 'https://i.postimg.cc/T1Z4yLgV/Screenshot-2026-02-02-185432.png',
    apple: 'https://i.postimg.cc/T1Z4yLgV/Screenshot-2026-02-02-185432.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
