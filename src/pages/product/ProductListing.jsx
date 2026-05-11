import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FiFilter, FiSearch } from "react-icons/fi";
import ProductCard from '../../components/others/ProductCard'
import Loader from '../../components/comman/Loader';
import { fetchProducts } from "../../redux/slices/productSlice";

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

const ProductListing = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.product);

  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    mood: "",
    region: "",
  });

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Discover Handmade
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight text-gray-900">
            Explore CraftNest
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-500">
            Discover handcrafted products from talented local artisans curated
            with AI-powered recommendations.
          </p>
        </div>

        <div className="mt-12 rounded-[40px] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center rounded-2xl border border-gray-200 bg-gray-50 px-4">
              <FiSearch className="text-gray-400" />

              <input
                type="text"
                name="keyword"
                placeholder="Search handmade products..."
                value={filters.keyword}
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-4 text-sm text-gray-800 outline-none"
              />
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
              <FiFilter size={18} />
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm outline-none"
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              name="mood"
              value={filters.mood}
              onChange={handleChange}
              className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm outline-none"
            >
              <option value="">All Moods</option>

              {moods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="region"
              placeholder="Search by region..."
              value={filters.region}
              onChange={handleChange}
              className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm outline-none"
            />
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-gray-900">
              Handmade Collection
            </h2>

            <p className="mt-2 text-gray-500">
              {products?.length || 0} products found
            </p>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : products?.length === 0 ? (
          <div className="mt-16 rounded-[40px] bg-white py-24 text-center shadow-sm">
            <h2 className="text-4xl font-black text-gray-900">
              No Products Found
            </h2>

            <p className="mt-4 text-gray-500">
              Try changing your filters or search query.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
