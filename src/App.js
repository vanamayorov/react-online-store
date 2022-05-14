import { useState, lazy } from "react";
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import productsData from './data/products.json';
import { SuspenseWrapper } from "./components/SuspenseWrapper";

const Cart = lazy(() => import("./components/Cart/Cart"));
const Order = lazy(() => import('./components/Order/Order'));
const ProductDetails = lazy(() => import('./components/ProductDetails/ProductDetails'));

function App() {
  const [products] = useState(productsData);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products products={products} />} />
        <Route path="/products/:id" element={
          <SuspenseWrapper>
            <ProductDetails />
          </SuspenseWrapper>
        } />
        <Route path="/cart" element={
          <SuspenseWrapper>
            <Cart />
          </SuspenseWrapper>

        } />
        <Route path="/order" element={
          <SuspenseWrapper>
            <Order />
          </SuspenseWrapper>
        } />
      </Routes>
    </>


  );
}

export default App;
