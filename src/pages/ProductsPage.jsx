import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import ProductForm from "../components/ProductForm";
import { downloadCSV } from "../utils/csv";
import {
  getProducts,
  getCategories,
  addProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
  generateUniqueSKU,
} from "../utils/localStorage";



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Categories
  const categories = getCategories();

  // Combined filtering
  const filteredProducts = products
    .filter(
      (p) =>
        categoryFilter === "All" ||
        p.category === categoryFilter
    )
    .filter((p) => {
      if (stockFilter === "InStock") return p.stock > 0;
      if (stockFilter === "OutOfStock") return p.stock === 0;
      return true;
    })
    .filter((p) => {
      const term = searchTerm.trim().toLowerCase();

      if (!term) return true;

      return (
        p.name.toLowerCase().includes(term) ||
        p.id.toLowerCase().includes(term)
      );
    });

  // Load products
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  // Add product
  function handleAdd(values) {
    const newProduct = {
      id: generateUniqueSKU(),
      ...values,
    };

    const updated = addProduct(newProduct);
    setProducts(updated);
    setShowForm(false);
  }

  // Update product
  function handleUpdate(values) {
    const updated = updateProduct(editingProduct.id, values);
    setProducts(updated);
    setEditingProduct(null);
    setShowForm(false);
  }

  // Delete product
  function handleDelete(id) {
    if (window.confirm("Delete this product?")) {
      const updated = deleteProduct(id);
      setProducts(updated);
    }
  }

  // Stock adjustment
  function handleStockChange(id, delta) {
    const { products: updated, error } = adjustStock(id, delta);

    if (error) {
      alert(error);
      return;
    }

    setProducts(updated);
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <Dashboard products={filteredProducts} />

<div className="flex gap-2">
  <button
    onClick={() => downloadCSV(filteredProducts)}
    className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
  >
    Export CSV
  </button>

  <button
    onClick={() => {
      setEditingProduct(null);
      setShowForm(true);
    }}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
  >
    + Add Product
  </button>
</div>
      </div>

      {/* Product Form */}
      {showForm && (
        <div className="mb-6 border rounded-lg p-4 shadow-sm">
          <ProductForm
            initialProduct={editingProduct}
            onSubmit={editingProduct ? handleUpdate : handleAdd}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="All">All Categories</option>

          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="All">All Stock</option>
          <option value="InStock">In Stock</option>
          <option value="OutOfStock">Out of Stock</option>
        </select>

        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 flex-1 min-w-[200px]"
        />
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">SKU</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Price</th>
              <th className="border px-4 py-2 text-center">Stock</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-mono text-sm">
                    {p.id}
                  </td>

                  <td className="border px-4 py-2">
                    {p.name}
                  </td>

                  <td className="border px-4 py-2">
                    {p.category}
                  </td>

                  <td className="border px-4 py-2">
                    Rs. {Number(p.price).toFixed(2)}
                  </td>

                  <td className="border px-4 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleStockChange(p.id, -1)}
                        className="border rounded w-7 h-7 hover:bg-gray-200"
                      >
                        −
                      </button>

                      <span className="font-medium min-w-[20px] text-center">
                        {p.stock}
                      </span>

                      <button
                        onClick={() => handleStockChange(p.id, 1)}
                        className="border rounded w-7 h-7 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
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