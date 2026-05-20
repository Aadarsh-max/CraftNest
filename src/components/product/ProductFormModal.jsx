import { useEffect, useState } from "react";

import { FiImage, FiLoader, FiX } from "react-icons/fi";

import { useDispatch } from "react-redux";

import uploadToCloudinary from "../../utils/cloudinary";

import { createProduct, updateProduct } from "../../redux/slices/sellerSlice";

import { showErrorToast, showSuccessToast } from "../others/Toast";

const categories = [
  "Home Decor",
  "Pottery",
  "Jewelry",
  "Textiles",
  "Paintings",
  "Handmade",
];

const moods = [
  "minimal",
  "rustic",
  "festive",
  "luxury",
  "traditional",
  "modern",
];

const ProductFormModal = ({ isOpen, onClose, editProductData }) => {
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    region: "",
    moodTags: [],
    images: [],
  });

  useEffect(() => {
    if (editProductData) {
      setFormData({
        name: editProductData.name || "",

        description: editProductData.description || "",

        price: editProductData.price || "",

        category: editProductData.category || "",

        stock: editProductData.stock || "",

        region: editProductData.region || "",

        moodTags: editProductData.moodTags || [],

        images: editProductData.images || [],
      });
    }
  }, [editProductData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const handleMoodToggle = (mood) => {
    setFormData((prev) => ({
      ...prev,

      moodTags: prev.moodTags.includes(mood)
        ? prev.moodTags.filter((item) => item !== mood)
        : [...prev.moodTags, mood],
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    try {
      setUploading(true);

      const uploadedImages = await Promise.all(
        files.map((file) => uploadToCloudinary(file)),
      );

      setFormData((prev) => ({
        ...prev,

        images: [...prev.images, ...uploadedImages],
      }));

      showSuccessToast("Images uploaded successfully");
    } catch (error) {
      showErrorToast("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (image) => {
    setFormData((prev) => ({
      ...prev,

      images: prev.images.filter((item) => item !== image),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editProductData) {
        await dispatch(
          updateProduct({
            productId: editProductData._id,

            productData: formData,
          }),
        ).unwrap();

        showSuccessToast("Product updated successfully");
      } else {
        await dispatch(createProduct(formData)).unwrap();

        showSuccessToast("Product created successfully");
      }

      onClose();
    } catch (error) {
      showErrorToast(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 py-10 backdrop-blur-sm">
      <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-[40px] bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Seller Product
            </p>

            <h2 className="mt-3 text-4xl font-black text-gray-900">
              {editProductData ? "Edit Product" : "Create Product"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-black hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                required
                value={formData.stock}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Region
              </label>

              <input
                type="text"
                name="region"
                required
                value={formData.region}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-4 block text-sm font-semibold text-gray-700">
              Mood Tags
            </label>

            <div className="flex flex-wrap gap-3">
              {moods.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => handleMoodToggle(mood)}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold capitalize transition ${
                    formData.moodTags.includes(mood)
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-4 block text-sm font-semibold text-gray-700">
              Product Images
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-4xl border-2 border-dashed border-gray-200 bg-gray-50 px-8 py-14 transition hover:border-black">
              {uploading ? (
                <FiLoader className="animate-spin text-4xl text-gray-500" />
              ) : (
                <FiImage className="text-5xl text-gray-400" />
              )}

              <p className="mt-5 text-lg font-semibold text-gray-700">
                Upload Product Images
              </p>

              <p className="mt-2 text-sm text-gray-400">PNG, JPG up to 5MB</p>

              <input
                type="file"
                multiple
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            {formData.images.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
                {formData.images.map((image) => (
                  <div
                    key={image}
                    className="relative overflow-hidden rounded-3xl"
                  >
                    <img
                      src={image}
                      alt="product"
                      className="h-40 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full rounded-2xl bg-black py-5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {editProductData ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
