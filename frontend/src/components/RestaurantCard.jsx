import { Link } from 'react-router-dom';
import { Clock3, Star } from 'lucide-react';

export default function RestaurantCard({ restaurant }) {
  return <Link to={`/restaurants/${restaurant._id}`} className="group overflow-hidden rounded-3xl bg-white card-shadow transition hover:-translate-y-1">
    <div className="relative"><img className="food-image transition duration-300 group-hover:scale-[1.02]" src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900'} alt={restaurant.name}/><span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-700">{restaurant.cuisine}</span></div>
    <div className="p-4"><div className="flex items-start justify-between gap-2"><h3 className="text-lg font-extrabold">{restaurant.name}</h3><span className="flex items-center gap-1 text-sm font-bold text-green-700"><Star size={14} fill="currentColor"/>{restaurant.rating?.toFixed?.(1) || 'New'}</span></div><p className="mt-1 line-clamp-1 text-sm text-gray-500">{restaurant.description || restaurant.address}</p><div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-500"><Clock3 size={14}/>{restaurant.deliveryTime || '30-40 min'} <span>•</span> ₹{restaurant.deliveryFee || 0} delivery</div></div>
  </Link>;
}
