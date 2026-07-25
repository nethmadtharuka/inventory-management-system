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