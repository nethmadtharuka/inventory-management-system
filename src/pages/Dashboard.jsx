import StatCard from "../components/StatCard";

export default function Dashboard({ products }) {
  const totalProducts = products.length;

  const totalValue = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );

  const countByCategory = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4 mb-4">
        <StatCard
          label="Total Products"
          value={totalProducts}
        />

        <StatCard
          label="Total Inventory Value"
          value={`Rs. ${totalValue.toFixed(2)}`}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(countByCategory).map(([cat, count]) => (
          <span
            key={cat}
            className="text-sm bg-gray-100 px-3 py-1 rounded-full"
          >
            {cat}: {count}
          </span>
        ))}
      </div>
    </div>
  );
}