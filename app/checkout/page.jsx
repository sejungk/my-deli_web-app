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

// CheckoutPage.getLayout = function getLayout(page) {
//   return (
//     <CheckoutLayout>{page}</CheckoutLayout>
//   )
// }

export default CheckoutPage;
