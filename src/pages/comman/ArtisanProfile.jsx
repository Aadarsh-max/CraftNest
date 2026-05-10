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
    <div className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-gray-100">
              {seller.avatar ? (
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-5xl font-black text-gray-400">
                  {seller.name?.charAt(0)}
                </span>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-5xl font-black tracking-tight text-gray-900">
                      {seller.name}
                    </h1>

                    {seller.isVerifiedSeller && (
                      <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        <FiCheckCircle />
                        Verified Artisan
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-500">
                      <FiMapPin />
                      <span className="text-sm font-medium">
                        {seller.region || "India"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                      <FiPackage />
                      <span className="text-sm font-medium">
                        {sellerProducts.length} Products
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                      <FiStar />
                      <span className="text-sm font-medium">
                        Handmade Creator
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-gray-100 px-8 py-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Seller Status
                  </p>

                  <h2 className="mt-3 text-2xl font-black text-gray-900">
                    {seller.isVerifiedSeller
                      ? "Trusted Artisan"
                      : "Pending Verification"}
                  </h2>
                </div>
              </div>

              <p className="mt-10 max-w-4xl text-lg leading-8 text-gray-500">
                Discover authentic handcrafted creations curated and made
                with passion by local artisan {seller.name}. Every piece
                reflects craftsmanship, creativity, and unique artistic
                identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Artisan Collection
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-900">
              Handmade Products
            </h2>
          </div>

          <div className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-600 shadow-sm">
            {sellerProducts.length} Products Available
          </div>
        </div>

        {sellerProducts.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-gray-200 bg-white py-20 text-center">
            <h3 className="text-2xl font-black text-gray-900">
              No Products Available
            </h3>

            <p className="mt-3 text-gray-500">
              This artisan has not uploaded products yet.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {sellerProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ArtisanProfile;