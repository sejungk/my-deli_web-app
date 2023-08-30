import CheckoutNavbar from '../../component/CheckoutNavbar';
import RootLayout from '../RootLayout';

export default function CheckoutLayout({ children }) {
  return (
    <>
      <CheckoutNavbar />
      {children}
    </>
  )
};


