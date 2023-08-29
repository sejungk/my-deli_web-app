// "use client"

import CheckoutLayout from './layout';
import Checkout from '../../component/Checkout'
import { CartProvider } from '../CartContext';

const CheckoutPage = () => {
  return (
    <CartProvider>
      <CheckoutLayout>
        <Checkout />
      </CheckoutLayout>
    </CartProvider>
  )
}

export default CheckoutPage;
