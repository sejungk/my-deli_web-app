import CheckoutNavbar from '../../component/CheckoutNavbar';
import RootLayout from '../RootLayout';

export default function CheckoutLayout({ children }) {
  return (
    <RootLayout>
      <div>
        <CheckoutNavbar />
        {children}
      </div>
    </RootLayout>
  )
};


