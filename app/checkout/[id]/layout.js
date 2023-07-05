import '../../globals.css';
import { Inter } from 'next/font/google'
import CheckoutNavbar from '../../../component/CheckoutNavbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Deli Checkout Page',
  description: 'My Deli restaurant located in Quantico, Virginia',
}

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CheckoutNavbar />
        {children}
      </body>
    </html>
  )
}
