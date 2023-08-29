import Layout from '../layout';
import CheckoutNavbar from '../../component/CheckoutNavbar';

export default function CheckoutLayout({ children }) {
  return (
    <Layout>
      <CheckoutNavbar />
      {children}
    </Layout>
  );
}

