export default function StatCard({ label, value }) {
  return (
    <div className="border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 flex-1 min-w-[150px] shadow-sm transition-colors">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {value}
      </p>
    </div>
  );
}