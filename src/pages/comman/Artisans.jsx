import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { FiMapPin, FiPackage, FiSearch, FiShield,FiUser } from "react-icons/fi";

import Loader from "../../components/comman/Loader";

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
    <div className="min-h-screen bg-white px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl animate-[fadeIn_0.8s_ease-out]">
        <div className="group">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
            Handmade Community
          </p>

          <h1 className="mt-3 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-5xl font-black tracking-tight text-transparent transition-transform duration-500 group-hover:scale-[1.01] origin-left">
            Discover Local Artisans
          </h1>

          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-500 transition-colors duration-300 hover:text-slate-700">
            Explore talented verified creators and discover handmade products
            crafted with passion.
          </p>
        </div>

        <div className="group relative mt-10 rounded-4xl bg-white p-5 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] hover:ring-violet-100">
          <div className="relative flex items-center gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
            <FiSearch className="text-xl text-slate-400 transition-transform duration-500 ease-out group-focus-within:scale-110 group-focus-within:text-violet-600" />
            <input
              type="text"
              placeholder="Search artisans by name or region..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="peer w-full bg-transparent py-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
            />
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
          </div>
        </div>

        {filteredArtisans.length === 0 ? (
          <div className="group/empty mt-16 cursor-pointer rounded-[40px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-24 text-center transition-all duration-500 hover:border-violet-300 hover:bg-violet-50/50">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-violet-400 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.15)] transition-transform duration-500 group-hover/empty:-translate-y-2 group-hover/empty:scale-110 group-hover/empty:text-violet-600 group-hover/empty:shadow-[0_10px_30px_-10px_rgba(124,58,237,0.3)]">
              <FiSearch
                size={40}
                className="transition-transform duration-500 group-hover/empty:rotate-12"
              />
            </div>
            <h2 className="mt-8 text-4xl font-black text-slate-900 transition-colors duration-300 group-hover/empty:text-violet-900">
              No Artisans Found
            </h2>
            <p className="mt-4 font-medium text-slate-500 transition-colors duration-300">
              Try another search term to find creators.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredArtisans.map((artisan, index) => (
              <div
                key={artisan._id}
                className="group/card relative overflow-hidden rounded-[36px] bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 transition-all duration-500 animate-[fadeInUp_0.6s_ease-out_forwards] hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.2)] hover:ring-violet-100"
                style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
              >
                <div className="relative flex h-52 items-center justify-center bg-linear-to-br from-violet-50 to-pink-50 transition-colors duration-700 ease-out group-hover/card:from-violet-100 group-hover/card:to-pink-100">
                  <FiUser className="text-8xl text-violet-300 drop-shadow-sm transition-transform duration-700 ease-out group-hover/card:scale-110 group-hover/card:text-violet-500" />

                  <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-emerald-600 shadow-sm backdrop-blur-sm ring-1 ring-emerald-100 transition-transform duration-500 group-hover/card:scale-105">
                    <FiShield size={14} />
                    Verified
                  </div>
                </div>

                <div className="p-8">
                  <h2 className="text-3xl font-black text-slate-900 transition-colors duration-300 group-hover/card:text-violet-700">
                    {artisan.name}
                  </h2>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-500 transition-colors duration-300 group-hover/card:text-slate-700">
                      <FiMapPin
                        className="text-violet-400 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:text-violet-600"
                        size={18}
                      />
                      {artisan.region}
                    </div>

                    <div className="flex items-center gap-3 text-sm font-medium text-slate-500 transition-colors duration-300 group-hover/card:text-slate-700">
                      <FiPackage
                        className="text-violet-400 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:text-violet-600"
                        size={18}
                      />
                      <span className="font-bold">{artisan.productCount}</span>{" "}
                      Products
                    </div>
                  </div>

                  <Link
                    to={`/artisan/${artisan._id}`}
                    className="cursor-pointer group/btn relative mt-8 flex w-full overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
                  >
                    <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:transform-[skew(-13deg)_translateX(150%)]">
                      <div className="w-12 bg-white/30" />
                    </div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Profile
                    </span>
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
