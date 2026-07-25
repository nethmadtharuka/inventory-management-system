import { useState } from "react";
import ProductsPage from "./pages/ProductsPage";
import StockHistoryPage from "./pages/StockHistoryPage";

function App() {
  const [view, setView] = useState("products");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
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