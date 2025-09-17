import React, { createContext, useContext, useEffect, useState } from 'react';

const StoreContext = createContext();

const sampleProducts = [
  { id: 'p1', name: 'Notebook', price: 50, stock: 10, tags: ['stationery'] },
  { id: 'p2', name: 'Pen', price: 10, stock: 25, tags: ['stationery'] },
  { id: 'p3', name: 'Water Bottle', price: 200, stock: 4, tags: ['home'] },
];

export function StoreProvider({ children }){
  const [products, setProducts] = useState(()=>{
    const raw = localStorage.getItem('nm_products');
    return raw ? JSON.parse(raw) : sampleProducts;
  });
  const [cart, setCart] = useState(()=>{
    const raw = localStorage.getItem('nm_cart');
    return raw ? JSON.parse(raw) : [];
  });
  const [sales, setSales] = useState(()=>{
    const raw = localStorage.getItem('nm_sales');
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(()=>{ localStorage.setItem('nm_products', JSON.stringify(products)); },[products]);
  useEffect(()=>{ localStorage.setItem('nm_cart', JSON.stringify(cart)); },[cart]);
  useEffect(()=>{ localStorage.setItem('nm_sales', JSON.stringify(sales)); },[sales]);

  const addToCart = (productId, qty=1)=>{
    const p = products.find(x=>x.id===productId);
    if(!p || p.stock < qty) return false;
    setCart(prev=>{
      const found = prev.find(x=>x.id===productId);
      if(found) return prev.map(x=> x.id===productId ? {...x, qty: x.qty+qty} : x);
      return [...prev, { id: productId, qty }];
    });
    return true;
  };

  const checkout = ()=>{
    if(cart.length===0) return false;
    // compute total and reduce stock
    const newProducts = products.map(p=>{
      const c = cart.find(x=>x.id===p.id);
      if(c) return {...p, stock: Math.max(0, p.stock - c.qty)};
      return p;
    });
    setProducts(newProducts);
    const total = cart.reduce((s,c)=>{
      const p = products.find(x=>x.id===c.id);
      return s + (p ? p.price * c.qty : 0);
    },0);
    const record = { id: 's'+Date.now(), datetime: new Date().toISOString(), total, items: cart };
    setSales(prev=>[record, ...prev]);
    setCart([]);
    return true;
  };

  const addProduct = (prod)=>{
    setProducts(prev=>[...prev, { ...prod, id: 'p'+Date.now() }]);
  };

  const updateProductStock = (id, newStock)=>{
    setProducts(prev=> prev.map(p=> p.id===id ? {...p, stock: newStock} : p));
  };

  return (
    <StoreContext.Provider value={{ products, cart, sales, addToCart, checkout, addProduct, updateProductStock }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = ()=> useContext(StoreContext);
