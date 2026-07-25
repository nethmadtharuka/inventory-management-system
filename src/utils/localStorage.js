import { generateSKU } from "./sku";

const STORAGE_KEY = "inventory_products";
const CATEGORY_KEY = "inventory_categories";

// Get all products
export function getProducts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save the full products array (overwrite)
export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Generate a SKU guaranteed not to collide with existing products
export function generateUniqueSKU() {
  const products = getProducts();
  const existingIds = new Set(products.map((p) => p.id));

  let sku = generateSKU();

  while (existingIds.has(sku)) {
    sku = generateSKU();
  }

  return sku;
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

// Delete a single product
export function deleteProduct(id) {
  const products = getProducts();

  const updated = products.filter((p) => p.id !== id);

  saveProducts(updated);
  return updated;
}

// Adjust stock
export function adjustStock(id, delta) {
  const products = getProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      products,
      error: "Product not found",
    };
  }

  const newStock = product.stock + delta;

  if (newStock < 0) {
    return {
      products,
      error: "Stock cannot go below zero",
    };
  }

  const updated = products.map((p) =>
    p.id === id
      ? { ...p, stock: newStock }
      : p
  );

  saveProducts(updated);

  return {
    products: updated,
    error: null,
  };
}

// Get all categories
export function getCategories() {
  const data = localStorage.getItem(CATEGORY_KEY);

  if (data) return JSON.parse(data);

  const defaults = ["General"];

  localStorage.setItem(
    CATEGORY_KEY,
    JSON.stringify(defaults)
  );

  return defaults;
}

// Add a new custom category
export function addCategory(name) {
  const categories = getCategories();

  if (categories.includes(name)) {
    return categories;
  }

  const updated = [...categories, name];

  localStorage.setItem(
    CATEGORY_KEY,
    JSON.stringify(updated)
  );

  return updated;
}