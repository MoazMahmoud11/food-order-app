import React, { Suspense } from "react";

import Cart from "./Components/Cart.jsx";
import Header from "./Components/Header.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
const Checkout = React.lazy(() => import("./Components/Checkout.jsx"));
const OrdersArea = React.lazy(() => import("./Components/OrdersArea.jsx"));

function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header />
        <Suspense fallback={true}>
          <OrdersArea />
        </Suspense>
        <Cart />
        <Suspense fallback={true}>
          <Checkout />
        </Suspense>
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
