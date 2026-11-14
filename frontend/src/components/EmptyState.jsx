export default function EmptyState({ title = 'Nothing here yet', message = 'Please check back soon.' }) {
  return <div className="col-span-full rounded-3xl border border-dashed border-orange-200 bg-white p-10 text-center"><div className="text-4xl">🍽️</div><h3 className="mt-3 text-lg font-bold">{title}</h3><p className="mt-1 text-sm text-gray-500">{message}</p></div>;
}
