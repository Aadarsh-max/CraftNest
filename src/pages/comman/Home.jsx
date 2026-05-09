import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FiArrowRight,
  FiMapPin,
  FiShield,
  FiStar,
  FiTruck,
} from "react-icons/fi";

import Loader from '../../components/comman/Loader'
import ProductCard from '../../components/others/ProductCard'

import { fetchProducts } from "../../redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-700">
              <FiMapPin />
              Hyperlocal Handmade Marketplace
            </div>

            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight text-gray-900 lg:text-7xl">
              Discover Handmade
              <span className="block text-gray-400">
                Crafted With Soul
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-500">
              Explore authentic handcrafted products from verified local
              artisans with AI-powered recommendations based on your
              style, mood, and region.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/products"
                className="flex items-center justify-center gap-2 rounded-2xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Explore Products
                <FiArrowRight />
              </Link>

              <Link
                to="/recommendations"
                className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                AI Recommendations
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6">
              <div>
                <h2 className="text-3xl font-black text-gray-900">
                  {products?.length || 0}+
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Products
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-black text-gray-900">
                  AI
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Smart Recommendations
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-black text-gray-900">
                  Local
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Verified Artisans
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-52 w-52 rounded-full bg-gray-100 blur-3xl"></div>

            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop"
              alt="CraftNest"
              className="relative z-10 h-162.5 w-full rounded-[40px] object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-3 lg:px-10">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
              <FiShield size={24} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Verified Artisans
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              Every seller is verified to ensure genuine handmade quality
              and trusted craftsmanship.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
              <FiStar size={24} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              AI Recommendations
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              Personalized suggestions powered by user mood, browsing
              history, and local discovery.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
              <FiTruck size={24} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Hyperlocal Delivery
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              Faster shipping and stronger local communities through
              region-based artisan discovery.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Featured Collection
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-900">
              Trending Handmade Products
            </h2>
          </div>

          <Link
            to="/products"
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-black"
          >
            View All Products
            <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <Loader fullScreen={false} />
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {products?.slice(0, 6).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}

        {!loading && products?.length === 0 && (
          <div className="mt-20 rounded-3xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
            <h3 className="text-2xl font-bold text-gray-900">
              No Products Found
            </h3>

            <p className="mt-3 text-gray-500">
              Products will appear here once artisans upload them.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;