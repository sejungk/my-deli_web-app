import RootLayout from './RootLayout';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import MenuItems from '../component/MenuItems';
import Cart from '../component/Cart';

export default function Layout({children}) {
  return (
    <RootLayout>
      <Navbar />
      {children}
      <Footer />
    </RootLayout>
  )
}


