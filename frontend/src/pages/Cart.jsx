import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function Cart() {
  const { items, changeQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address,setAddress]=useState(user?.address||'');
  const [phone,setPhone]=useState(user?.phone||'');
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const placeOrder=async()=>{
    if(!user) return navigate('/login');
    if(!items.length) return;
    if(!address.trim()||!phone.trim()) return setError('Please enter delivery address and phone.');
    if(new Set(items.map(i=>i.restaurant?._id||i.restaurant)).size>1) return setError('Please order items from one restaurant at a time.');
    setBusy(true);setError('');
    try{
      await api('/orders',{method:'POST',body:JSON.stringify({items:items.map(i=>({food:i._id,quantity:i.quantity})),deliveryAddress:address,phone,paymentMethod:'cod'})});
      clearCart();navigate('/dashboard');
    }catch(e){setError(e.message);}finally{setBusy(false);}
  };
  return <main className="container min-h-[70vh] py-12"><h1 className="text-4xl font-black">Your cart</h1>{!items.length?<div className="mt-8 rounded-3xl bg-white p-10 text-center card-shadow"><div className="text-5xl">🛍️</div><h2 className="mt-4 text-xl font-bold">Your cart is empty</h2><Link to="/restaurants" className="btn-primary mt-5 inline-block">Explore restaurants</Link></div>:<div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"><section className="space-y-3">{items.map(i=><article key={i._id} className="flex items-center gap-4 rounded-2xl bg-white p-4 card-shadow"><img className="h-20 w-20 rounded-xl object-cover" src={i.image||'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300'} alt={i.name}/><div className="min-w-0 flex-1"><h3 className="font-bold">{i.name}</h3><p className="text-sm text-gray-500">₹{i.price}</p></div><div className="flex items-center gap-2"><button onClick={()=>changeQuantity(i._id,i.quantity-1)} className="rounded-full bg-orange-50 p-2"><Minus size={14}/></button><b>{i.quantity}</b><button onClick={()=>changeQuantity(i._id,i.quantity+1)} className="rounded-full bg-orange-50 p-2"><Plus size={14}/></button></div><button onClick={()=>changeQuantity(i._id,0)} className="p-2 text-red-500"><Trash2 size={17}/></button></article>)}</section><aside className="h-fit rounded-3xl bg-white p-6 card-shadow"><h2 className="text-xl font-black">Order summary</h2><div className="mt-5 flex justify-between"><span>Subtotal</span><b>₹{total}</b></div><div className="mt-2 flex justify-between"><span>Delivery</span><b>Calculated by restaurant</b></div><label className="mt-5 block text-sm font-bold">Delivery address<textarea className="field mt-1" rows="2" value={address} onChange={e=>setAddress(e.target.value)} required/></label><label className="mt-4 block text-sm font-bold">Phone<input className="field mt-1" value={phone} onChange={e=>setPhone(e.target.value)} required/></label><p className="mt-4 text-xs text-gray-500">Demo checkout: Cash on Delivery. No real payment is collected.</p>{error&&<p className="mt-3 text-sm text-red-600">{error}</p>}<button onClick={placeOrder} disabled={busy} className="btn-primary mt-5 w-full">{busy?'Placing order…':'Place order (COD)'}</button></aside></div>}</main>;
}
