import React from 'react';
import { useStore } from '../../context/StoreContext';
import SaleRecord from './SaleRecord';

export default function Sales(){
  const { sales } = useStore();
  return (
    <div className="card">
      <h3>Sales Records</h3>
      {sales.length===0 && <div className="small">No sales yet</div>}
      {sales.slice(0,6).map(s=> <SaleRecord key={s.id} r={s} />)}
    </div>
  );
}
