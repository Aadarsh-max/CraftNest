import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  FiCheckCircle,
  FiMapPin,
  FiPackage,
  FiStar,
} from "react-icons/fi";

import Loader from '../../components/comman/Loader'
import ProductCard from '../../components/others/ProductCard'

import { fetchSellerProfile } from "../../redux/slices/userSlice";

const ArtisanProfile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    seller,
    sellerProducts,
    loading,
    error,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchSellerProfile(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (error || !seller) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-5">
        <div className="text-center">
          <h2 className="text-3xl font-black text-gray-900">
            Artisan Not Found
          </h2>

          <p className="mt-3 text-gray-500">
            The artisan profile you're looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-white">
    <section className="border-b border-slate-50 bg-white shadow-[0_4px_30px_-10px_rgba(124,58,237,0.05)]">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 animate-[fadeIn_0.8s_ease-out]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="group relative flex h-40 w-40 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full shadow-[0_10px_40px_-10px_rgba(124,58,237,0.3)] ring-4 ring-white transition-all duration-700 ease-out hover:scale-105 hover:shadow-[0_20px_50px_-15px_rgba(236,72,153,0.4)] hover:ring-violet-50">
            {seller.avatar ? (
              <img
                src={seller.avatar}
                alt={seller.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-violet-600 to-pink-500 transition-transform duration-700 group-hover:scale-110">
                <span className="text-6xl font-black text-white drop-shadow-md">
                  {seller.name?.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10"></div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-5xl font-black tracking-tight text-transparent transition-transform duration-500 hover:scale-[1.01] origin-left">
                    {seller.name}
                  </h1>

                  {seller.isVerifiedSeller && (
                    <div className="cursor-pointer flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-600 shadow-sm ring-1 ring-emerald-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-md">
                      <FiCheckCircle size={16} />
                      Verified Artisan
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-8">
                  <div className="group/stat cursor-pointer flex items-center gap-2 text-slate-500 transition-colors duration-300 hover:text-violet-700">
                    <FiMapPin className="text-violet-400 transition-transform duration-300 group-hover/stat:-translate-y-1 group-hover/stat:scale-110 group-hover/stat:text-violet-600" size={18} />
                    <span className="text-sm font-bold tracking-wide">
                      {seller.region || "India"}
                    </span>
                  </div>

                  <div className="group/stat cursor-pointer flex items-center gap-2 text-slate-500 transition-colors duration-300 hover:text-violet-700">
                    <FiPackage className="text-violet-400 transition-transform duration-300 group-hover/stat:-translate-y-1 group-hover/stat:scale-110 group-hover/stat:text-violet-600" size={18} />
                    <span className="text-sm font-bold tracking-wide">
                      {sellerProducts.length} Products
                    </span>
                  </div>

                  <div className="group/stat cursor-pointer flex items-center gap-2 text-slate-500 transition-colors duration-300 hover:text-violet-700">
                    <FiStar className="text-violet-400 transition-transform duration-300 group-hover/stat:-translate-y-1 group-hover/stat:scale-110 group-hover/stat:text-violet-600" size={18} />
                    <span className="text-sm font-bold tracking-wide">
                      Handmade Creator
                    </span>
                  </div>
                </div>
              </div>

              <div className="group/status cursor-pointer rounded-4xl bg-white p-6 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.2)] hover:ring-violet-100">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
                  Seller Status
                </p>

                <h2 className="mt-2 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-2xl font-black text-transparent transition-transform duration-500 group-hover/status:scale-105 origin-left">
                  {seller.isVerifiedSeller
                    ? "Trusted Artisan"
                    : "Pending Verification"}
                </h2>
              </div>
            </div>

            <p className="mt-10 max-w-4xl text-lg font-medium leading-relaxed text-slate-500 transition-colors duration-300 hover:text-slate-700">
              Discover authentic handcrafted creations curated and made
              with passion by local artisan <span className="font-bold text-violet-600">{seller.name}</span>. Every piece
              reflects craftsmanship, creativity, and unique artistic
              identity.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 animate-[fadeIn_1s_ease-out]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="group">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
            Artisan Collection
          </p>

          <h2 className="mt-3 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-4xl font-black tracking-tight text-transparent transition-transform duration-500 group-hover:scale-[1.01] origin-left">
            Handmade Products
          </h2>
        </div>

        <div className="cursor-pointer rounded-full bg-violet-50 px-6 py-3 text-sm font-black text-violet-600 shadow-sm ring-1 ring-violet-100 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-100 hover:shadow-md hover:shadow-violet-200">
          {sellerProducts.length} Products Available
        </div>
      </div>

      {sellerProducts.length === 0 ? (
        <div className="group/empty cursor-pointer mt-16 rounded-[40px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-24 text-center transition-all duration-500 hover:border-violet-300 hover:bg-violet-50/50">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-violet-400 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.15)] transition-transform duration-500 group-hover/empty:-translate-y-2 group-hover/empty:scale-110 group-hover/empty:text-violet-600 group-hover/empty:shadow-[0_10px_30px_-10px_rgba(124,58,237,0.3)]">
            <FiPackage size={40} className="transition-transform duration-500 group-hover/empty:rotate-12" />
          </div>

          <h3 className="mt-8 text-3xl font-black text-slate-900 transition-colors duration-300 group-hover/empty:text-violet-900">
            No Products Available
          </h3>

          <p className="mt-4 font-medium text-slate-500 transition-colors duration-300">
            This artisan has not uploaded any products yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sellerProducts.map((product, index) => (
            <div 
              key={product._id} 
              className="transition-all duration-500 ease-out animate-[fadeInUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  </div>
);
};

export default ArtisanProfile;