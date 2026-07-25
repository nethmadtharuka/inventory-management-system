import StatCard from "../components/StatCard";

export default function Dashboard({ products }) {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <StatCard label="Total Products" value={totalProducts} />
      <StatCard label="Total Inventory Value" value={`Rs. ${totalValue.toFixed(2)}`} />
    </div>
  );
}