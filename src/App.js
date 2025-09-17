import React from 'react';
import NavBar from './components/NavBar';
import ProductList from './components/Product/ProductList';
import Inventory from './components/Inventory/Inventory';
import Cart from './components/Cart/Cart';
import Sales from './components/Sales/Sales';
import AddProduct from './components/AddProduct';

function App(){
  return (
    <div className="app">
      <NavBar />
      <main className="container">
        <div className="cols">
          <section className="left">
            <h2>Catalog</h2>
            <ProductList />
            <h2 style={{marginTop:20}}>Add Product</h2>
            <AddProduct />
          </section>
          <section className="right">
            <Inventory />
            <Cart />
            <Sales />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
