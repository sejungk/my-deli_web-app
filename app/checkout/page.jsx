// "use client"

// import CheckoutLayout from './layout';
import Checkout from '../../component/Checkout'
import { CartProvider } from '../CartContext';
import CheckoutLayout from './layout';

const CheckoutPage = () => {
  return (
    <CartProvider>
      <Checkout />
    </CartProvider>
  )
}



CheckoutPage.getLayout = function getLayout(page) {
  return (
    <CheckoutLayout>
       {/* <CheckoutNavbar /> */}
        {page}
    </CheckoutLayout>
  )
}

export default CheckoutPage;


// Page.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <NestedLayout>{page}</NestedLayout>
//     </Layout>
//   )
// }
