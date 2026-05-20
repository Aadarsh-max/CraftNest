import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { FiMapPin, FiPackage, FiSearch, FiShield } from "react-icons/fi";

import Loader from '../../components/comman/Loader'

import { fetchArtisans } from "../../redux/slices/artisanSlice";

const Artisans = () => {
  const dispatch = useDispatch();

  const { artisans, loading } = useSelector((state) => state.artisan);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchArtisans());
  }, [dispatch]);

  const filteredArtisans = artisans.filter(
    (artisan) =>
      artisan.name.toLowerCase().includes(search.toLowerCase()) ||
      artisan.region?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Handmade Community
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight text-gray-900">
            Discover Local Artisans
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-500">
            Explore talented verified creators and discover handmade products
            crafted with passion.
          </p>
        </div>

        <div className="mt-10 rounded-4xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-5">
            <FiSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search artisans by name or region..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-4 outline-none"
            />
          </div>
        </div>

        {filteredArtisans.length === 0 ? (
          <div className="mt-16 rounded-[40px] bg-white py-24 text-center shadow-sm">
            <h2 className="text-4xl font-black text-gray-900">
              No Artisans Found
            </h2>

            <p className="mt-4 text-gray-500">Try another search.</p>
          </div>
        ) : (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredArtisans.map((artisan) => (
              <div
                key={artisan._id}
                className="overflow-hidden rounded-[36px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 bg-linear-to-br from-gray-100 to-gray-200">
                  <img
                    src={
                      artisan.avatar ||
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={artisan.name}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">
                    <FiShield />
                    Verified
                  </div>
                </div>

                <div className="p-7">
                  <h2 className="text-3xl font-black text-gray-900">
                    {artisan.name}
                  </h2>

                  <div className="mt-5 flex items-center gap-2 text-gray-500">
                    <FiMapPin />

                    {artisan.region}
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-gray-500">
                    <FiPackage />
                    {artisan.productCount} Products
                  </div>

                  <Link
                    to={`/artisan/${artisan._id}`}
                    className="mt-8 flex items-center justify-center rounded-2xl bg-black py-4 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Artisans;
