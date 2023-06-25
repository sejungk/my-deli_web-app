import Footer from './Footer';
import Navbar from './Navbar';
import MenuItems from './MenuItems'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <MenuItems />
      <Footer />
    </>
  )
}

export default Layout;
