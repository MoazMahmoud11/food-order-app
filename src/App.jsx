import React, { Suspense } from 'react';

import Cart from "./Components/Cart.jsx";
const Checkout = React.lazy(() => import('./Components/Checkout.jsx'));
import Header from "./Components/Header.jsx";
const OrdersArea = React.lazy(() => import('./Components/OrdersArea.jsx'));
import {CartContextProvider} from "./store/CartContext.jsx";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";

function App() {
  return (
      <CartContextProvider >
        <UserProgressContextProvider>
          <Header />
          <Suspense fallback={true}>
            <OrdersArea />
          </Suspense>
          <Cart/>
          <Suspense fallback={true}>
            <Checkout />
          </Suspense>
        </UserProgressContextProvider>
      </CartContextProvider>
  )
}

export default App;
