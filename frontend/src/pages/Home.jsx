import { useEffect, useState } from 'react';
import { ArrowRight, Search, ShieldCheck, Truck, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import EmptyState from '../components/EmptyState';

const categories = ['All', 'North Indian', 'Pizza', 'Burgers', 'Chinese', 'South Indian'];

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/restaurants')
      .then((data) => setRestaurants(data.restaurants || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = restaurants.filter((r) => {
    const matchesSearch = `${r.name} ${r.cuisine} ${r.city}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === 'All' || r.cuisine.toLowerCase().includes(category.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      <section className="hero-bg">
        <div className="container grid items-center gap-8 py-16 md:grid-cols-[1.1fr_.9fr] md:py-24">
          <div>
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-orange-700 shadow-sm">
              Fresh food, fast delivery
            </span>
            <h1 className="mt-5 max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-gray-900 md:text-7xl">
              Cravings? <span className="text-orange-500">We've got you.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">
              Discover local favourites, order in a few taps, and enjoy delicious food delivered fresh to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/restaurants" className="btn-primary inline-flex items-center gap-2">
                Explore restaurants <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn-secondary">
                Join FoodFleet
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-gray-600">
              <span className="flex items-center gap-2">
                <ShieldCheck className="text-orange-500" size={18} />
                Secure ordering
              </span>
              <span className="flex items-center gap-2">
                <Truck className="text-orange-500" size={18} />
                Live order stages
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="text-orange-500" size={18} />
                Quick delivery
              </span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <img
              className="aspect-square w-full rounded-[2.5rem] object-cover shadow-2xl"
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000"
              alt="Delicious food spread"
            />
            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white p-4 shadow-xl">
              <p className="text-xs font-semibold text-gray-500">Made with love</p>
              <p className="text-xl font-black text-orange-600">Every single bite ✨</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-widest text-orange-600">
              Discover
            </p>
            <h2 className="mt-2 text-3xl font-black">Restaurants near you</h2>
          </div>
          <Link to="/restaurants" className="font-bold text-orange-600">
            View all →
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={19}
            />
            <input
              className="field pl-12"
              placeholder="Search restaurant, cuisine or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  category === c
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 ring-1 ring-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        {loading ? (
          <p className="py-12 text-center text-gray-500">Loading restaurants…</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.length ? (
              filtered.slice(0, 6).map((r) => <RestaurantCard key={r._id} restaurant={r} />)
            ) : (
              <EmptyState
                title="No restaurants found"
                message="Start the backend and add restaurants to see them here."
              />
            )}
          </div>
        )}
      </section>

      <section className="container pb-16">
        <div className="grid gap-4 rounded-3xl bg-gray-900 p-8 text-white md:grid-cols-3">
          <div>
            <div className="text-3xl">🍜</div>
            <h3 className="mt-3 text-xl font-extrabold">Local favourites</h3>
            <p className="mt-2 text-sm text-gray-300">
              Explore restaurants and menus in one place.
            </p>
          </div>
          <div>
            <div className="text-3xl">🛵</div>
            <h3 className="mt-3 text-xl font-extrabold">Order updates</h3>
            <p className="mt-2 text-sm text-gray-300">
              Follow each stage from placed to delivered.
            </p>
          </div>
          <div>
            <div className="text-3xl">⭐</div>
            <h3 className="mt-3 text-xl font-extrabold">Share feedback</h3>
            <p className="mt-2 text-sm text-gray-300">
              Rate your experience after delivery.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}