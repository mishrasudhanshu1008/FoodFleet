import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth({ mode = 'login' }) {
  const isRegister = mode === 'register';
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'', address:'', role:'customer' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const change = e => setForm({...form, [e.target.name]:e.target.value});
  const submit = async e => {
    e.preventDefault(); setError('');
    if (isRegister && (!form.name.trim() || form.password.length < 6)) return setError('Enter your name and a password of at least 6 characters.');
    setBusy(true);
    try {
      if (isRegister) await register(form); else await login({email:form.email,password:form.password});
      navigate('/dashboard');
    } catch(err) { setError(err.message); } finally { setBusy(false); }
  };
  return <main className="container grid min-h-[75vh] place-items-center py-12"><form onSubmit={submit} className="w-full max-w-lg rounded-3xl bg-white p-8 card-shadow"><p className="text-sm font-extrabold uppercase tracking-widest text-orange-600">{isRegister?'Join the fleet':'Welcome back'}</p><h1 className="mt-2 text-3xl font-black">{isRegister?'Create your account':'Login to FoodFleet'}</h1><p className="mt-2 text-sm text-gray-500">Use your account to order food and manage deliveries.</p>{error&&<p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {isRegister&&<><label className="mt-5 block text-sm font-bold">Full name<input className="field mt-1" name="name" value={form.name} onChange={change} required/></label><label className="mt-4 block text-sm font-bold">Phone<input className="field mt-1" name="phone" value={form.phone} onChange={change}/></label><label className="mt-4 block text-sm font-bold">Address<input className="field mt-1" name="address" value={form.address} onChange={change}/></label><label className="mt-4 block text-sm font-bold">Account type<select className="field mt-1" name="role" value={form.role} onChange={change}><option value="customer">Customer</option><option value="restaurant">Restaurant owner</option><option value="delivery">Delivery partner</option></select></label></>}
    <label className="mt-4 block text-sm font-bold">Email<input className="field mt-1" type="email" name="email" value={form.email} onChange={change} required/></label><label className="mt-4 block text-sm font-bold">Password<input className="field mt-1" type="password" name="password" value={form.password} onChange={change} minLength="6" required/></label><button disabled={busy} className="btn-primary mt-6 w-full disabled:opacity-60">{busy?'Please wait…':isRegister?'Create account':'Login'}</button><p className="mt-5 text-center text-sm text-gray-500">{isRegister?'Already have an account?':'New to FoodFleet?'} <Link className="font-bold text-orange-600" to={isRegister?'/login':'/register'}>{isRegister?'Login':'Create account'}</Link></p></form></main>;
}
