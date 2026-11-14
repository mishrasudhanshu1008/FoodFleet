import { Plus, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FoodCard({ food }) {
  const { addItem } = useCart();
  return <article className="overflow-hidden rounded-3xl bg-white card-shadow">
    <img className="food-image" src={food.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900'} alt={food.name}/>
    <div className="p-4"><div className="flex items-center justify-between gap-2"><h3 className="font-extrabold">{food.name}</h3>{food.isVeg && <Leaf size={16} className="text-green-600"/>}</div><p className="mt-1 min-h-10 text-sm text-gray-500">{food.description || food.category}</p><div className="mt-3 flex items-center justify-between"><span className="text-lg font-black text-gray-900">₹{food.price}</span><button onClick={()=>addItem(food)} className="flex items-center gap-1 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"><Plus size={16}/> Add</button></div></div>
  </article>;
}
