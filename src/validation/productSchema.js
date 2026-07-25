import * as Yup from "yup";

export const productSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters"),

  category: Yup.string()
    .required("Category is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),

  stock: Yup.number()
    .typeError("Stock must be a number")
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .required("Stock quantity is required"),
});