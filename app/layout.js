import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from './CartContext';
import CheckoutPage from './checkout/page'
import Navbar from '../component/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({children}) {
  return (
    <html lang="en">
      <head>
        <title>My Deli</title>
      </head>

      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
};



