import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from './CartContext';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({children}) {
  return (
    <html lang="en">
      <head>
        <title>My Deli</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>

      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
};



