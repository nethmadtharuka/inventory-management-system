import { generateSKU } from "./sku";

const STORAGE_KEY = "inventory_products";
const CATEGORY_KEY = "inventory_categories";
const HISTORY_KEY = "inventory_stock_history";

// =========================
// Products
// =========================

// Get all products
export function getProducts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save all products
export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Generate a SKU guaranteed not to collide
export function generateUniqueSKU() {
  const products = getProducts();
  const existingIds = new Set(products.map((p) => p.id));

  let sku = generateSKU();

  while (existingIds.has(sku)) {
    sku = generateSKU();
  }

  return sku;
}

// Add product
export function addProduct(product) {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
  return products;
}

// Update product
export function updateProduct(id, updatedFields) {
  const products = getProducts();

  const updated = products.map((p) =>
    p.id === id
      ? { ...p, ...updatedFields }
      : p
  );

  saveProducts(updated);
  return updated;
}

// Delete product
export function deleteProduct(id) {
  const products = getProducts();

  const updated = products.filter(
    (p) => p.id !== id
  );

  saveProducts(updated);
  return updated;
}

// =========================
// Stock History
// =========================

// Get all stock history entries
export function getStockHistory() {
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
}

// Internal helper to log stock changes
function logStockChange(
  productId,
  productName,
  delta,
  newStock
) {
  const history = getStockHistory();

  const entry = {
    productId,
    productName,
    delta,
    newStock,
    timestamp: new Date().toISOString(),
  };

  const updated = [entry, ...history];

  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(updated)
  );
}

// Adjust stock
export function adjustStock(id, delta) {
  const products = getProducts();
  const product = products.find(
    (p) => p.id === id
  );

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

  // Log stock movement
  logStockChange(
    product.id,
    product.name,
    delta,
    newStock
  );

  return {
    products: updated,
    error: null,
  };
}

// =========================
// Categories
// =========================

// Get all categories
export function getCategories() {
  const data = localStorage.getItem(CATEGORY_KEY);

  if (data) {
    return JSON.parse(data);
  }

  const defaults = ["General"];

  localStorage.setItem(
    CATEGORY_KEY,
    JSON.stringify(defaults)
  );

  return defaults;
}

// Add custom category
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

// Delete multiple products by their ids
export function deleteProductsBulk(ids) {
  const products = getProducts();
  const updated = products.filter((p) => !ids.includes(p.id));
  saveProducts(updated);
  return updated;
}

// Restock multiple products by the same delta amount
export function restockProductsBulk(ids, delta) {
  const products = getProducts();
  const updated = products.map((p) => {
    if (!ids.includes(p.id)) return p;
    const newStock = Math.max(0, p.stock + delta); // never below zero
    if (newStock !== p.stock) {
      logStockChange(p.id, p.name, newStock - p.stock, newStock); // reuse Step 13's logger
    }
    return { ...p, stock: newStock };
  });
  saveProducts(updated);
  return updated;
}