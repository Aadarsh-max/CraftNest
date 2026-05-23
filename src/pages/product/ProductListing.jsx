import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiFilter, FiSearch } from "react-icons/fi";
import ProductCard from "../../components/others/ProductCard";
import Loader from "../../components/comman/Loader";
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

  const { products = [], loading = false } = useSelector(
    (state) => state.product,
  );

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
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center lg:text-left">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
            Discover Handmade
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-900">
            Explore CraftNest
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-500 lg:mx-0">
            Discover handcrafted products from talented local artisans curated
            with AI-powered recommendations.
          </p>
        </div>

        <div className="mt-12 rounded-[40px] bg-white p-6 shadow-lg ring-1 ring-violet-50 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex flex-1 items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-1">
              <FiSearch className="text-xl text-slate-400" />

              <input
                type="text"
                name="keyword"
                placeholder="Search handmade products..."
                value={filters.keyword}
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-4 text-sm font-bold text-slate-900 outline-none"
              />
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <FiFilter size={24} />
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 outline-none"
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
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 outline-none"
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
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-900 outline-none"
            />
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              Handmade Collection
            </h2>

            <p className="mt-2 font-medium text-slate-500">
              <span className="font-bold text-violet-600">
                {products.length}
              </span>{" "}
              products found
            </p>
          </div>
        </div>

        {loading ? (
          <div className="mt-20 flex justify-center">
            <Loader />
          </div>
        ) : products.length === 0 ? (
          <div className="mt-12 rounded-[40px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-24 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-violet-400 shadow-md">
              <FiSearch size={40} />
            </div>

            <h2 className="mt-8 text-4xl font-black text-slate-900">
              No Products Found
            </h2>

            <p className="mt-4 font-medium text-slate-500">
              Try adjusting your filters or search terms.
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
