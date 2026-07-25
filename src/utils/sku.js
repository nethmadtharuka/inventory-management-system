// Generates a SKU like PRD482910
export function generateSKU() {
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit number
  return `PRD${randomNum}`;
}