import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import FoodCard from '../components/FoodCard';
import EmptyState from '../components/EmptyState';

export default function RestaurantDetails() {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api(`/restaurants`).then((d) => d.restaurants.find((r) => r._id === id)),
      api(`/foods?restaurant=${id}`),
    ])
      .then(([r, f]) => {
        setRestaurant(r);
        setFoods(f.foods || []);
      })
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <main className="container py-16 text-red-600">{error}</main>;
  if (!restaurant) return <main className="container py-16">Loading restaurant…</main>;

  return (
    <main className="container py-10">
      <img
        className="h-64 w-full rounded-3xl object-cover"
        src={
          restaurant.image ||
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000'
        }
        alt={restaurant.name}
      />
      <h1 className="mt-6 text-4xl font-black">{restaurant.name}</h1>
      <p className="mt-2 text-gray-500">
        {restaurant.description} · {restaurant.cuisine} · {restaurant.deliveryTime}
      </p>
      <h2 className="mt-10 text-2xl font-black">Menu</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {foods.length ? (
          foods.map((f) => <FoodCard key={f._id} food={f} />)
        ) : (
          <EmptyState
            title="Menu coming soon"
            message="This restaurant has not added food items yet."
          />
        )}
      </div>
    </main>
  );
}