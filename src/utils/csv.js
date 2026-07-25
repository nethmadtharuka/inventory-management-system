// Converts an array of product objects into a CSV string
function productsToCSV(products) {
  const headers = ["SKU", "Name", "Category", "Price", "Stock"];
  const rows = products.map((p) => [
    p.id,
    p.name,
    p.category,
    p.price,
    p.stock,
  ]);

  const csvLines = [headers, ...rows].map((row) =>
    row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
  );

  return csvLines.join("\n");
}

// Triggers a browser download of the given CSV string
export function downloadCSV(products, filename = "inventory.csv") {
  const csv = productsToCSV(products);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}