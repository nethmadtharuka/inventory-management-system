export default function StatCard({ label, value }) {
  return (
    <div className="border rounded-lg p-4 flex-1 min-w-[150px]">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}