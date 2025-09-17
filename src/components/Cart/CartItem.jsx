import React from 'react';
import { useStore } from '../../context/StoreContext';

export default function CartItem({item}){
  const { products } = useStore();
  const p = products.find(x=>x.id===item.id) || {name:'Unknown', price:0};
  return (
    <div className="cart-item">
      <div>{p.name} x {item.qty}</div>
      <div>Rs. {p.price * item.qty}</div>
    </div>
  );
}
