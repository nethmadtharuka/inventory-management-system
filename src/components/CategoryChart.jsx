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
    return (
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        No data to display yet.
      </p>
    );
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 mb-6 shadow-sm transition-colors"
      style={{ width: "100%", height: 250 }}
    >
      <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        Stock by Category
      </p>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" />

          <XAxis
            dataKey="category"
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            axisLine={{ stroke: "#6B7280" }}
            tickLine={{ stroke: "#6B7280" }}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            axisLine={{ stroke: "#6B7280" }}
            tickLine={{ stroke: "#6B7280" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#f9fafb",
            }}
            labelStyle={{ color: "#f9fafb" }}
          />

          <Bar dataKey="stock" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}