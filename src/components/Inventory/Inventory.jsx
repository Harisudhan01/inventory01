import React from 'react';
import { useStore } from '../../context/StoreContext';

export default function Inventory(){
  const { products, updateProductStock } = useStore();
  return (
    <div className="card">
      <h3>Inventory</h3>
      {products.map(p=> (
        <div key={p.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0'}}>
          <div>
            <strong>{p.name}</strong><div className="small">Stock: {p.stock}</div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <input type="number" defaultValue={p.stock} onBlur={(e)=> updateProductStock(p.id, Number(e.target.value))} style={{width:80}} />
            {p.stock<=3 && <div className="low">Reorder</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
