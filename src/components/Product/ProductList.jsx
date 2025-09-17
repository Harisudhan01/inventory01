import React, {useState} from 'react';
import { useStore } from '../../context/StoreContext';
import Product from './Product';

export default function ProductList(){
  const { products } = useStore();
  const [q, setQ] = useState('');
  const filtered = products.filter(p=> p.name.toLowerCase().includes(q.toLowerCase()) || (p.tags||[]).join(' ').includes(q.toLowerCase()));
  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <input placeholder="Search products..." value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div style={{marginTop:10}}>
        {filtered.length===0 && <div className="small">No products</div>}
        {filtered.map(p=> <Product key={p.id} p={p} />)}
      </div>
    </div>
  );
}
