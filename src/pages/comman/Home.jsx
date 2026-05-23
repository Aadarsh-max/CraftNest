import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FiArrowRight,
  FiMapPin,
  FiShield,
  FiStar,
  FiTruck,
  FiHeart,
  FiShoppingBag
} from "react-icons/fi";

import Loader from "../../components/comman/Loader";
import ProductCard from "../../components/others/ProductCard";

import { fetchProducts } from "../../redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-50 bg-white shadow-[0_4px_30px_-10px_rgba(124,58,237,0.05)]">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-28 animate-[fadeIn_0.8s_ease-out]">
          <div className="group">
            <div className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-violet-50 px-5 py-2 text-sm font-black text-violet-600 shadow-sm ring-1 ring-violet-100 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-100 hover:shadow-md">
              <FiMapPin className="animate-bounce" />
              Hyperlocal Handmade Marketplace
            </div>

            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight text-slate-900 transition-all duration-500 group-hover:scale-[1.01] lg:text-7xl origin-left">
              Discover Handmade
              <span className="mt-2 block bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent pb-2">
                Crafted With Soul
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-slate-500 transition-colors duration-300 hover:text-slate-700">
              Explore authentic handcrafted products from verified local
              artisans with AI-powered recommendations based on your style,
              mood, and region.
            </p>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row">
              <Link
                to="/products"
                className="cursor-pointer group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:transform-[skew(-13deg)_translateX(150%)]">
                  <div className="w-12 bg-white/30" />
                </div>
                <span className="relative z-10 flex items-center gap-2">
                  Explore Products
                  <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
              </Link>

              <Link
                to="/recommendations"
                className="cursor-pointer group/btn2 flex items-center justify-center gap-2 rounded-2xl border-2 border-violet-100 bg-white px-8 py-4 text-sm font-bold tracking-wide text-violet-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 hover:shadow-md active:translate-y-1 active:scale-[0.97]"
              >
                <FiStar className="transition-transform duration-300 group-hover/btn2:rotate-45 group-hover/btn2:scale-110" />
                AI Recommendations
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6">
              <div className="group/stat cursor-pointer rounded-2xl bg-white p-4 shadow-[0_4px_15px_-5px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-violet-200">
                <h2 className="bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-4xl font-black text-transparent transition-transform duration-300 group-hover/stat:scale-110 origin-left">
                  {products?.length || 0}+
                </h2>
                <p className="mt-2 text-sm font-bold tracking-wide text-slate-400 group-hover/stat:text-violet-500 transition-colors duration-300">
                  Products
                </p>
              </div>

              <div className="group/stat cursor-pointer rounded-2xl bg-white p-4 shadow-[0_4px_15px_-5px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-violet-200">
                <h2 className="bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-4xl font-black text-transparent transition-transform duration-300 group-hover/stat:scale-110 origin-left">
                  AI
                </h2>
                <p className="mt-2 text-sm font-bold tracking-wide text-slate-400 group-hover/stat:text-violet-500 transition-colors duration-300">
                  Smart Magic
                </p>
              </div>

              <div className="group/stat cursor-pointer rounded-2xl bg-white p-4 shadow-[0_4px_15px_-5px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-violet-200">
                <h2 className="bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-4xl font-black text-transparent transition-transform duration-300 group-hover/stat:scale-110 origin-left">
                  Local
                </h2>
                <p className="mt-2 text-sm font-bold tracking-wide text-slate-400 group-hover/stat:text-violet-500 transition-colors duration-300">
                  Artisans
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex h-full min-h-125 w-full items-center justify-center">
            <div className="absolute h-[120%] w-[120%] animate-[spin_30s_linear_infinite] rounded-full bg-linear-to-br from-violet-200/40 to-pink-200/40 blur-3xl"></div>

            <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[40px] bg-linear-to-br from-violet-50 to-pink-50 p-10 shadow-[0_20px_60px_-15px_rgba(124,58,237,0.2)] ring-1 ring-white transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_30px_70px_-20px_rgba(236,72,153,0.3)]">
              <div className="absolute left-10 top-10 flex h-24 w-24 animate-[bounce_4s_ease-in-out_infinite] items-center justify-center rounded-3xl bg-white shadow-xl">
                <FiStar className="text-4xl text-pink-500" />
              </div>

              <div className="absolute bottom-10 right-10 flex h-20 w-20 animate-[bounce_5s_ease-in-out_infinite_reverse] items-center justify-center rounded-3xl bg-white shadow-xl">
                <FiHeart className="text-3xl text-violet-500" />
              </div>

              <div className="flex h-56 w-56 items-center justify-center rounded-[40px] bg-white shadow-2xl transition-transform duration-700 hover:scale-110 hover:rotate-6">
                <FiShoppingBag className="text-8xl text-violet-600 drop-shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <div className="group/feature cursor-pointer rounded-[40px] bg-white p-10 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.2)] hover:ring-emerald-100 animate-[fadeInUp_0.6s_ease-out]">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-500 shadow-inner transition-transform duration-500 group-hover/feature:scale-110 group-hover/feature:rotate-6">
              <FiShield size={36} />
            </div>

            <h3 className="mt-8 text-2xl font-black text-slate-900 transition-colors duration-300 group-hover/feature:text-emerald-600">
              Verified Artisans
            </h3>

            <p className="mt-4 text-base font-medium leading-relaxed text-slate-500">
              Every seller is verified to ensure genuine handmade quality and
              trusted craftsmanship.
            </p>
          </div>

          <div className="group/feature cursor-pointer rounded-[40px] bg-white p-10 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(236,72,153,0.2)] hover:ring-pink-100 animate-[fadeInUp_0.6s_ease-out_100ms]">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-50 text-pink-500 shadow-inner transition-transform duration-500 group-hover/feature:scale-110 group-hover/feature:-rotate-6">
              <FiStar size={36} />
            </div>

            <h3 className="mt-8 text-2xl font-black text-slate-900 transition-colors duration-300 group-hover/feature:text-pink-600">
              AI Recommendations
            </h3>

            <p className="mt-4 text-base font-medium leading-relaxed text-slate-500">
              Personalized suggestions powered by user mood, browsing history,
              and local discovery.
            </p>
          </div>

          <div className="group/feature cursor-pointer rounded-[40px] bg-white p-10 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.2)] hover:ring-violet-200 animate-[fadeInUp_0.6s_ease-out_200ms]">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-50 text-violet-600 shadow-inner transition-transform duration-500 group-hover/feature:scale-110 group-hover/feature:rotate-12">
              <FiTruck size={36} />
            </div>

            <h3 className="mt-8 text-2xl font-black text-slate-900 transition-colors duration-300 group-hover/feature:text-violet-700">
              Hyperlocal Delivery
            </h3>

            <p className="mt-4 text-base font-medium leading-relaxed text-slate-500">
              Faster shipping and stronger local communities through
              region-based artisan discovery.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="group">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
              Featured Collection
            </p>

            <h2 className="mt-3 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-4xl font-black tracking-tight text-transparent transition-transform duration-500 group-hover:scale-[1.01] origin-left">
              Trending Handmade Products
            </h2>
          </div>

          <Link
            to="/products"
            className="cursor-pointer group/link flex items-center gap-3 rounded-full bg-violet-50 px-6 py-3 text-sm font-black text-violet-600 shadow-sm ring-1 ring-violet-100 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-100 hover:shadow-md"
          >
            View All Products
            <FiArrowRight className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:scale-110" />
          </Link>
        </div>

        {loading ? (
          <div className="mt-14 flex justify-center">
            <Loader fullScreen={false} />
          </div>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {products?.slice(0, 6).map((product, index) => (
              <div
                key={product._id}
                className="animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {!loading && products?.length === 0 && (
          <div className="group/empty cursor-pointer mt-20 rounded-[40px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-24 text-center transition-all duration-500 hover:border-violet-300 hover:bg-violet-50/50">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-violet-400 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.15)] transition-transform duration-500 group-hover/empty:-translate-y-2 group-hover/empty:scale-110 group-hover/empty:text-violet-600 group-hover/empty:shadow-[0_10px_30px_-10px_rgba(124,58,237,0.3)]">
              <FiShoppingBag
                size={40}
                className="transition-transform duration-500 group-hover/empty:rotate-12"
              />
            </div>

            <h3 className="mt-8 text-3xl font-black text-slate-900 transition-colors duration-300 group-hover/empty:text-violet-900">
              No Products Found
            </h3>

            <p className="mt-4 font-medium text-slate-500 transition-colors duration-300">
              Products will appear here once artisans upload them.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
