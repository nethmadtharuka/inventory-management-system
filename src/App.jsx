import { useState } from "react";
import ProductsPage from "./pages/ProductsPage";
import StockHistoryPage from "./pages/StockHistoryPage";
import { getTheme, setTheme } from "./utils/theme";

function App() {
  const [view, setView] = useState("products");
  const [isDark, setIsDark] = useState(getTheme() === "dark");

  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    setIsDark(!isDark);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* Navigation */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setView("products")}
            className={`px-3 py-2 rounded ${
              view === "products"
                ? "bg-blue-600 font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            Products
          </button>

          <button
            onClick={() => setView("history")}
            className={`px-3 py-2 rounded ${
              view === "history"
                ? "bg-blue-600 font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            Stock History
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className="border border-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-700 transition"
        >
          {isDark ? " Light" : " Dark"}
        </button>
      </nav>

      {/* Page Content */}
      {view === "products" ? (
        <ProductsPage />
      ) : (
        <StockHistoryPage />
      )}
    </div>
  );
}

export default App;