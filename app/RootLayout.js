'use client'

import Layout from './layout';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';

const RootLayout = ({ children }) => {
    return (
      <Layout>
        <Navbar />
        {children}
        <Footer />
      </Layout>
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
