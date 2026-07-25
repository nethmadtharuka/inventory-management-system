import { useState, useEffect } from "react";
import { getStockHistory } from "../utils/localStorage";

export default function StockHistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getStockHistory());
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stock History</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border dark:border-gray-700 px-4 py-2 text-left">
                Product
              </th>

              <th className="border dark:border-gray-700 px-4 py-2 text-center">
                Change
              </th>

              <th className="border dark:border-gray-700 px-4 py-2 text-center">
                New Stock
              </th>

              <th className="border dark:border-gray-700 px-4 py-2 text-left">
                Timestamp
              </th>
            </tr>
          </thead>

          <tbody>
            {history.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="border dark:border-gray-700 text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No stock changes yet.
                </td>
              </tr>
            ) : (
              history.map((h, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="border dark:border-gray-700 px-4 py-2">
                    {h.productName}
                  </td>

                  <td
                    className={`border dark:border-gray-700 px-4 py-2 text-center ${
                      h.delta > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {h.delta > 0 ? `+${h.delta}` : h.delta}
                  </td>

                  <td className="border dark:border-gray-700 px-4 py-2 text-center">
                    {h.newStock}
                  </td>

                  <td className="border dark:border-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {new Date(h.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}