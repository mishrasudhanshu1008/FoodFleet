import { useEffect, useState } from 'react';
import { api } from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import EmptyState from '../components/EmptyState';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/restaurants')
      .then((d) => setRestaurants(d.restaurants || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = restaurants.filter((r) =>
    `${r.name} ${r.cuisine} ${r.city}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container min-h-[70vh] py-12">
      <p className="text-sm font-extrabold uppercase tracking-widest text-orange-600">
        FoodFleet directory
      </p>
      <h1 className="mt-2 text-4xl font-black">All restaurants</h1>
      <input
        className="field mt-6 max-w-xl"
        placeholder="Search restaurants or cuisine..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {loading ? (
        <p className="py-12 text-center">Loading…</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length ? (
            filtered.map((r) => <RestaurantCard key={r._id} restaurant={r} />)
          ) : (
            <EmptyState
              title="No restaurants yet"
              message="Restaurant owners can add a restaurant from their dashboard."
            />
          )}
        </div>
      )}
    </main>
  );
}