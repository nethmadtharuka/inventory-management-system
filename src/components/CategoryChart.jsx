import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function CategoryChart({ products }) {
  // Aggregate total stock quantity per category
  const dataMap = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.stock;
    return acc;
  }, {});

  const chartData = Object.entries(dataMap).map(([category, stock]) => ({
    category,
    stock,
  }));

  if (chartData.length === 0) {
    return <p className="text-gray-500 text-sm">No data to display yet.</p>;
  }

  return (
    <div className="border rounded-lg p-4 mb-6" style={{ width: "100%", height: 250 }}>
      <p className="text-sm font-medium mb-2">Stock by Category</p>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="stock" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}