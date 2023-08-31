import CheckoutNavbar from '../../component/CheckoutNavbar';

export default function CheckoutLayout({ children }) {
  return (
    <>
      <CheckoutNavbar />
      {children}
    </>
  )
};
