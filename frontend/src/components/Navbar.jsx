import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Utensils, UserRound, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const signOut = () => { logout(); navigate('/'); };
  return <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/95 backdrop-blur">
    <div className="container flex h-16 items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2 text-xl font-black text-orange-600"><span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-500 text-white"><Utensils size={20}/></span>FoodFleet</Link>
      <nav className="hidden items-center gap-6 text-sm font-semibold text-gray-600 md:flex">
        <NavLink to="/" className={({isActive})=>isActive?'text-orange-600':'hover:text-orange-600'}>Home</NavLink>
        <NavLink to="/restaurants" className={({isActive})=>isActive?'text-orange-600':'hover:text-orange-600'}>Restaurants</NavLink>
        {user && <NavLink to="/dashboard" className="hover:text-orange-600">Dashboard</NavLink>}
      </nav>
      <div className="flex items-center gap-2">
        <Link to="/cart" className="relative rounded-full p-2 text-gray-700 hover:bg-orange-50"><ShoppingBag size={21}/>{count>0&&<span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-xs text-white">{count}</span>}</Link>
        {user ? <><Link to="/dashboard" className="hidden items-center gap-1 rounded-full bg-orange-50 px-3 py-2 text-sm font-bold text-orange-700 sm:flex"><LayoutDashboard size={16}/>{user.name.split(' ')[0]}</Link><button onClick={signOut} title="Logout" className="rounded-full p-2 hover:bg-gray-100"><LogOut size={19}/></button></> :
          <Link to="/login" className="btn-primary text-sm">Login</Link>}
      </div>
    </div>
  </header>;
}
