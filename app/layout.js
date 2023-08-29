import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import RootLayout from './RootLayout';

const Layout = ({ children }) => {
  return (
    <RootLayout>
      <Navbar />
      {children}
      <Footer />
    </RootLayout>
  );
}

export default Layout;

