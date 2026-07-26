# Inventory Management System

A frontend-only Inventory Management System built for Development Intern take-home task. Manages products, tracks stock levels, and provides inventory analytics — all data persisted locally via `localStorage`, no backend required.

## Features

### Core Features
- **Product Management** — add, edit, and delete products (name, SKU, category, price, stock)
- **Stock Management** — increase/decrease stock with validation preventing negative stock
- **Dashboard** — total product count and total inventory value at a glance
- **Category Handling** — create custom categories, filter products by category, per-category product counts
- **Search & Filter** — search by product name or SKU, filter by category and stock status (In Stock / Out of Stock)
- **Form Validation** — all forms built with Formik + Yup, with inline error messages

### Bonus Features
- **Auto-generated SKU** — unique product IDs generated in the format `PRD482910`
- **Stock History Log** — every stock change is recorded with a timestamp
- **CSV Export** — download the current (filtered) product list as a `.csv` file
- **Analytics Chart** — bar chart showing total stock by category
- **Bulk Actions** — select multiple products to bulk-restock or bulk-delete
- **Dark Mode** — theme toggle, preference saved in `localStorage`

## Tech Stack

- React (Vite)
- Formik + Yup — form handling and validation
- Tailwind CSS — styling
- Recharts — analytics chart
- localStorage — data persistence (no backend/database)

## Running Locally

1. Clone the repository:

```bash
git clone https://github.com/nethmadtharuka/inventory-management-system.git
cd inventory-management-system
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the URL shown in the terminal (typically `http://localhost:5173`).

## Live Demo
🔗 https://inventory-management-system-rho-hazel.vercel.app

## Live Demonstration Video
 https://1drv.ms/v/c/904e5b08909e59e9/IQCwQbOLeqQnTq3Z6lrhyObvAVY4SjlnvUdodAWzRzuqJ9c?e=SHEPvy

A 2–3 minute screen recording demonstrating the application's functionality, including product management, stock updates, dashboard analytics, category management, search/filtering, CSV export, bulk actions, and dark mode.

## Screenshots

Screenshots are available in the `screenshots/` folder.

## Project Structure

```
src/
├── components/      # Reusable UI components (ProductForm, StatCard, CategoryChart)
├── pages/           # Dashboard, ProductsPage, StockHistoryPage
├── utils/           # localStorage.js, sku.js, csv.js, theme.js
├── validation/      # productSchema.js (Yup)
```
