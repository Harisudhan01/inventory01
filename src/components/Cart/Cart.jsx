import React from 'react';
import { useStore } from '../../context/StoreContext';
import CartItem from './CartItem';

export default function Cart(){
  const { cart, products, checkout } = useStore();
  const total = cart.reduce((s,c)=>{
    const p = products.find(x=>x.id===c.id);
    return s + (p ? p.price * c.qty : 0);
  },0);
  return (
    <div className="card">
      <h3>Cart</h3>
      {cart.length===0 && <div className="small">Cart is empty</div>}
      {cart.map(ci=> <CartItem key={ci.id} item={ci} />)}
      <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
        <strong>Total</strong><strong>Rs. {total}</strong>
      </div>
      <div style={{marginTop:10,display:'flex',gap:8}}>
        <button onClick={()=> checkout()} disabled={cart.length===0}>Checkout</button>
      </div>
    </div>
  );
}
