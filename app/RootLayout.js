// 'use client'

// import Footer from '../component/Footer';
// import Navbar from '../component/Navbar';

// const RootLayout = ({ children }) => {
//     return (
//       <div>
//         <Navbar />
//         {children}
//         <Footer />
//       </div>
//     );
// }

// export default RootLayout;

'use client'

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Deli',
  description: 'My Deli restaurant located in Quantico, Virginia',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;



// export default function RootLayout({ children }) {
//   return (
//     <Layout>
//       <Navbar />
//       {children}
//       <Footer />
//     </Layout>
//   );
// }
