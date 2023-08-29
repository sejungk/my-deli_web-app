import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Deli',
  description: 'My Deli restaurant located in Quantico, Virginia',
}

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

export default Layout;

// import './globals.css'
// import { Inter } from 'next/font/google'
// import Footer from '../component/Footer';
// import Navbar from '../component/Navbar';

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'My Deli',
//   description: 'My Deli restaurant located in Quantico, Virginia',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Navbar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   )
// }
