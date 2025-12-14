import React, { Suspense } from 'react';

import Cart from "./Components/Cart.jsx";
const Checkout = React.lazy(() => import('./Components/Checkout.jsx'));
import Header from "./Components/Header.jsx";
import OrdersArea from "./Components/OrdersArea.jsx";
import {CartContextProvider} from "./store/CartContext.jsx";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";

function App() {
  return (
      <CartContextProvider >
        <UserProgressContextProvider>
          <Header />
          <OrdersArea />
          <Cart/>
          <Suspense fallback={<p>Loading...</p>}>
            <Checkout />
          </Suspense>
        </UserProgressContextProvider>
      </CartContextProvider>
  )
}

export default App;
