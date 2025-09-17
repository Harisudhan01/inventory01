import React, {useState} from 'react';
import { useStore } from '../context/StoreContext';

export default function AddProduct(){
  const { addProduct } = useStore();
  const [name,setName] = useState('');
  const [price,setPrice] = useState('');
  const [stock,setStock] = useState('');
  const [tags,setTags] = useState('');
  const submit = (e)=>{
    e.preventDefault();
    if(!name) return;
    addProduct({ name, price: Number(price||0), stock: Number(stock||0), tags: tags.split(',').map(s=>s.trim()).filter(Boolean) });
    setName(''); setPrice(''); setStock(''); setTags('');
  };
  return (
    <form className="card" onSubmit={submit}>
      <input placeholder="Product name" value={name} onChange={e=>setName(e.target.value)} />
      <div className="form-row" style={{marginTop:8}}>
        <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <input placeholder="Stock" value={stock} onChange={e=>setStock(e.target.value)} />
      </div>
      <input placeholder="Tags (comma separated)" value={tags} onChange={e=>setTags(e.target.value)} style={{marginTop:8}} />
      <div style={{marginTop:8}}><button type="submit">Add Product</button></div>
    </form>
  );
}
