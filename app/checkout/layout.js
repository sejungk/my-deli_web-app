import RootLayout from '../RootLayout';
import CheckoutNavbar from '../../component/CheckoutNavbar';

export default function CheckoutLayout({ children }) {
  return (
    <RootLayout>
      <CheckoutNavbar />
      {children}
    </RootLayout>
  )
};

