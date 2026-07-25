import { useFormik } from "formik";
import { productSchema } from "../validation/productSchema";

export default function ProductForm({ initialProduct, onSubmit, onCancel }) {
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
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border rounded px-3 py-2"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          name="category"
          type="text"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border rounded px-3 py-2"
        />
        {formik.touched.category && formik.errors.category && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
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
          <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Stock Quantity</label>
        <input
          name="stock"
          type="number"
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border rounded px-3 py-2"
        />
        {formik.touched.stock && formik.errors.stock && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.stock}</p>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {initialProduct ? "Update Product" : "Add Product"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}