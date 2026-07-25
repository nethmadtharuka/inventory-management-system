import { useState } from "react";
import { useFormik } from "formik";
import { productSchema } from "../validation/productSchema";
import {
  getCategories,
  addCategory,
} from "../utils/localStorage";

export default function ProductForm({
  initialProduct,
  onSubmit,
  onCancel,
}) {
  const [categories, setCategories] = useState(getCategories());
  const [newCategory, setNewCategory] = useState("");

  const formik = useFormik({
    initialValues: {
      name: initialProduct?.name || "",
      category: initialProduct?.category || "",
      price: initialProduct?.price ?? "",
      stock: initialProduct?.stock ?? "",
    },
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
    enableReinitialize: true,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4 max-w-md"
    >
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Product Name
        </label>
        <input
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border rounded px-3 py-2"
        />

        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.name}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Category
        </label>

        <select
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select a category</option>

          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {formik.touched.category && formik.errors.category && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.category}
          </p>
        )}

        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border rounded px-2 py-1 text-sm flex-1"
          />

          <button
            type="button"
            onClick={() => {
              if (!newCategory.trim()) return;

              const updated = addCategory(newCategory.trim());

              setCategories(updated);
              formik.setFieldValue(
                "category",
                newCategory.trim()
              );
              setNewCategory("");
            }}
            className="border px-3 py-1 rounded text-sm"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Price
        </label>

        <input
          name="price"
          type="number"
          step="0.01"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border rounded px-3 py-2"
        />

        {formik.touched.price && formik.errors.price && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.price}
          </p>
        )}
      </div>

      {/* Stock */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Stock Quantity
        </label>

        <input
          name="stock"
          type="number"
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border rounded px-3 py-2"
        />

        {formik.touched.stock && formik.errors.stock && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.stock}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {initialProduct ? "Update Product" : "Add Product"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}