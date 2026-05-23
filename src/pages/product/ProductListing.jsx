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
  <div className="min-h-screen bg-white px-5 py-10 lg:px-10">
    <div className="mx-auto max-w-7xl animate-[fadeIn_0.8s_ease-out]">
      <div className="group text-center lg:text-left">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
          Discover Handmade
        </p>

        <h1 className="mt-3 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-5xl font-black tracking-tight text-transparent transition-transform duration-500 group-hover:scale-[1.01] origin-center lg:origin-left">
          Explore CraftNest
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-500 transition-colors duration-300 hover:text-slate-700 lg:mx-0">
          Discover handcrafted products from talented local artisans curated
          with AI-powered recommendations.
        </p>
      </div>

      <div className="group/filters mt-12 rounded-[40px] bg-white p-6 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] hover:ring-violet-100 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex flex-1 items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-1 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
            <FiSearch className="text-xl text-slate-400 transition-transform duration-500 ease-out group-focus-within/filters:scale-110 group-focus-within/filters:text-violet-600" />
            <input
              type="text"
              name="keyword"
              placeholder="Search handmade products..."
              value={filters.keyword}
              onChange={handleChange}
              className="peer w-full bg-transparent px-4 py-4 text-sm font-bold text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
            />
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
          </div>

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 shadow-inner ring-1 ring-violet-100 transition-all duration-500 group-hover/filters:rotate-180 group-hover/filters:bg-violet-100 group-hover/filters:shadow-md">
            <FiFilter size={24} />
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="group/select relative">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300 hover:bg-white">
              <select
                name="category"
                value={filters.category}
                onChange={handleChange}
                className="peer w-full cursor-pointer appearance-none bg-transparent px-5 py-4 text-sm font-bold text-slate-700 outline-none transition-colors duration-300 focus:text-violet-900"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400 group-focus-within/select:text-violet-600">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
            </div>
          </div>

          <div className="group/select relative">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300 hover:bg-white">
              <select
                name="mood"
                value={filters.mood}
                onChange={handleChange}
                className="peer w-full cursor-pointer appearance-none bg-transparent px-5 py-4 text-sm font-bold text-slate-700 outline-none transition-colors duration-300 focus:text-violet-900"
              >
                <option value="">All Moods</option>
                {moods.map((mood) => (
                  <option key={mood} value={mood}>
                    {mood}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400 group-focus-within/select:text-violet-600">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
            </div>
          </div>

          <div className="group/input relative">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300 hover:bg-white">
              <input
                type="text"
                name="region"
                placeholder="Search by region..."
                value={filters.region}
                onChange={handleChange}
                className="peer w-full bg-transparent px-5 py-4 text-sm font-bold text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between">
        <div className="group/title">
          <h2 className="text-3xl font-black text-slate-900 transition-colors duration-300 group-hover/title:text-violet-900">
            Handmade Collection
          </h2>
          <p className="mt-2 font-medium text-slate-500 transition-colors duration-300">
            <span className="font-bold text-violet-600">{products?.length || 0}</span> products found
          </p>
        </div>
      </div>

      {loading ? (
        <div className="mt-20 flex justify-center">
          <Loader />
        </div>
      ) : products?.length === 0 ? (
        <div className="group/empty mt-12 cursor-pointer rounded-[40px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-24 text-center transition-all duration-500 hover:border-violet-300 hover:bg-violet-50/50">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-violet-400 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.15)] transition-transform duration-500 group-hover/empty:-translate-y-2 group-hover/empty:scale-110 group-hover/empty:text-violet-600 group-hover/empty:shadow-[0_10px_30px_-10px_rgba(124,58,237,0.3)]">
            <FiSearch size={40} className="transition-transform duration-500 group-hover/empty:rotate-12" />
          </div>
          <h2 className="mt-8 text-4xl font-black text-slate-900 transition-colors duration-300 group-hover/empty:text-violet-900">
            No Products Found
          </h2>
          <p className="mt-4 font-medium text-slate-500 transition-colors duration-300">
            Try adjusting your filters or search terms to discover more items.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <div 
              key={product._id}
              className="animate-[fadeInUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
};

export default ProductListing;
