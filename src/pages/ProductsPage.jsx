import { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
} from "../utils/localStorage";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load products on first render
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  // Add new product
  function handleAdd(values) {
    const newProduct = {
      id: crypto.randomUUID(),
      ...values,
    };

    const updated = addProduct(newProduct);
    setProducts(updated);
    setShowForm(false);
  }

  // Update existing product
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

  // Increase / Decrease stock
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

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Price</th>
              <th className="border px-4 py-2 text-center">Stock</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No products yet.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{p.name}</td>

                  <td className="border px-4 py-2">{p.category}</td>

                  <td className="border px-4 py-2">
                    {Number(p.price).toFixed(2)}
                  </td>

                  {/* Stock Controls */}
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

                  {/* Actions */}
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