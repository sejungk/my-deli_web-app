import CheckoutNavbar from '../../component/CheckoutNavbar';
import Layout from '../layout'

export default function CheckoutLayout({ children }) {
  return (
    <>
      <CheckoutNavbar />
      {children}
    </>
  )
};


