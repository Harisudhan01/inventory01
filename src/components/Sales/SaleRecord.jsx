import React from 'react';
export default function SaleRecord({r}){
  return (
    <div style={{padding:6,borderBottom:'1px solid #eee'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div><strong>Sale</strong> <small className="small">{new Date(r.datetime).toLocaleString()}</small></div>
        <div>Rs. {r.total}</div>
      </div>
      <div className="small">Items: {r.items.map(i=> i.id + ' x'+i.qty).join(', ')}</div>
    </div>
  );
}
