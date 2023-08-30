// 'use client'

import React from 'react';
import { CartProvider } from './CartContext';
import MenuItems from '../component/MenuItems';
import Cart from '../component/Cart';
import Layout from './layout'

const Home = () => {
  return (
    <CartProvider>
      <MenuItems/>
      <Cart/>
    </CartProvider>
  );
}

export default Home;


// import Footer from '../component/Footer';
// import Navbar from '../component/Navbar';
// import RootLayout from './RootLayout';

// export default function Layout({ Component, children }) {
//   if (Component.getLayout) {
//     return Component.getLayout(<Component {...children} />);
//   }

//   return (
//     <RootLayout>
//       <Navbar />
//       {children}
//       <Footer />
//     </RootLayout>
//   );
// }




// import React from 'react';
// import { CartProvider } from './CartContext';
// import MenuItems from '../component/MenuItems';
// import Cart from '../component/Cart';

// const Home = () => {
//   return (
//     <CartProvider>
//         <MenuItems/>
//         <Cart/>
//     </CartProvider>
//   );
// }

// export default Home;
