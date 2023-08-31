'use client'

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Deli',
  description: 'My Deli restaurant located in Quantico, Virginia',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <title>My Deli</title>
      </head>

      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
};