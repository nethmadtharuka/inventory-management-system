import { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import { getProducts, addProduct } from "../utils/localStorage";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Load products from localStorage once, on mount
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  function handleAdd(values) {
    const newProduct = {
      id: crypto.randomUUID(), // temporary ID — we'll replace with SKU generator later
      ...values,
    };
    const updated = addProduct(newProduct);
    setProducts(updated);
    setShowForm(false);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Products</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <div className="mb-6 border rounded p-4">
          <ProductForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-4 text-gray-500">No products yet.</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="py-2">{p.name}</td>
                <td>{p.category}</td>
                <td>{p.price.toFixed(2)}</td>
                <td>{p.stock}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}