import React from 'react';
import { useStore } from '../../context/StoreContext';

export default function Product({p}){
  const { addToCart } = useStore();
  return (
    <div className="product">
      <div>
        <div style={{fontWeight:700}}>{p.name} <small className="small">({p.tags?.join(',')})</small></div>
        <div className="small">Rs. {p.price} — Stock: {p.stock}</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {p.stock<=5 && <div className="low">Low stock</div>}
        <button onClick={()=> addToCart(p.id,1)} disabled={p.stock<=0}>Add</button>
      </div>
    </div>
  );
}
