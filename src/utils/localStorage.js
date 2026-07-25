const STORAGE_KEY = "inventory_products";

// Get all products
export function getProducts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save the full products array (overwrite)
export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Add a single product
export function addProduct(product) {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
  return products;
}

// Update a single product by id
export function updateProduct(id, updatedFields) {
  const products = getProducts();
  const updated = products.map((p) =>
    p.id === id ? { ...p, ...updatedFields } : p
  );
  saveProducts(updated);
  return updated;
}

// Delete a product by id
export function deleteProduct(id) {
  const products = getProducts();
  const updated = products.filter((p) => p.id !== id);
  saveProducts(updated);
  return updated;
}

// Adjust stock by a delta (positive to increase, negative to decrease)
// Returns { products, error } - error is set if the change is invalid
export function adjustStock(id, delta) {
  const products = getProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return { products, error: "Product not found" };
  }

  const newStock = product.stock + delta;
  if (newStock < 0) {
    return { products, error: "Stock cannot go below zero" };
  }

  const updated = products.map((p) =>
    p.id === id ? { ...p, stock: newStock } : p
  );
  saveProducts(updated);
  return { products: updated, error: null };
}