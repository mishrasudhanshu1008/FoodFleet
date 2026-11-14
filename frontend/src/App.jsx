import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantDetails from './pages/RestaurantDetails';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function Shell(){
  return <><Navbar/><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/restaurants" element={<Restaurants/>}/>
    <Route path="/restaurants/:id" element={<RestaurantDetails/>}/>
    <Route path="/login" element={<Auth mode="login"/>}/>
    <Route path="/register" element={<Auth mode="register"/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route element={<ProtectedRoute/>}><Route path="/dashboard" element={<Dashboard/>}/></Route>
    <Route path="*" element={<NotFound/>}/>
  </Routes><footer className="mt-12 bg-gray-950 py-8 text-center text-sm text-gray-400"><p className="font-black text-white">FoodFleet 🍊</p><p className="mt-2">Your food. Your choice. Delivered fresh.</p><p className="mt-2">CAP646 · Full Stack Web Development academic project</p></footer></>;
}
export default function App(){
  return <BrowserRouter><AuthProvider><CartProvider><Shell/></CartProvider></AuthProvider></BrowserRouter>;
}
