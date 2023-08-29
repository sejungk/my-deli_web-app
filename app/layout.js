import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import RootLayout from './RootLayout';

export default function Layout({children}) {
  return (
    <RootLayout>
      <Navbar />
      {children}
      <Footer />
    </RootLayout>
  )
}


