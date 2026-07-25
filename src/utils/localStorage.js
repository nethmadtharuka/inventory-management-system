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