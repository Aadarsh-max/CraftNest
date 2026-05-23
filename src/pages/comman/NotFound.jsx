import { Link } from "react-router-dom";

import { FiArrowLeft, FiCompass } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-5 py-16">
      <div className="group/card relative w-full max-w-3xl overflow-hidden rounded-[40px] bg-white p-10 text-center shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] hover:ring-violet-100 lg:p-14 animate-[fadeIn_0.8s_ease-out]">
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-violet-50 text-violet-500 shadow-[inset_0_4px_20px_rgba(124,58,237,0.1)] transition-all duration-700 ease-out group-hover/card:scale-110 group-hover/card:bg-violet-100 group-hover/card:shadow-[0_0_40px_rgba(124,58,237,0.3)]">
          <FiCompass
            size={56}
            className="transition-transform duration-1000 ease-out group-hover/card:rotate-180"
          />
        </div>

        <p className="mt-10 text-sm font-bold uppercase tracking-[0.25em] text-violet-600 transition-colors duration-300">
          404 Error
        </p>

        <h1 className="mt-5 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-6xl font-black tracking-tight text-transparent transition-transform duration-500 group-hover/card:scale-[1.02]">
          Page Not Found
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-500 transition-colors duration-300">
          The page you are looking for doesn’t exist or may have been moved
          somewhere else inside CraftNest.
        </p>

        <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="cursor-pointer group/btn relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
          >
            <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:transform-[skew(-13deg)_translateX(150%)]">
              <div className="w-12 bg-white/30" />
            </div>
            <span className="relative z-10 flex items-center gap-2">
              <FiArrowLeft className="transition-transform duration-300 group-hover/btn:-translate-x-1" />
              Back To Home
            </span>
          </Link>

          <Link
            to="/products"
            className="cursor-pointer group/btn2 flex items-center justify-center gap-2 rounded-2xl border-2 border-violet-100 bg-white px-8 py-4 text-sm font-bold tracking-wide text-violet-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 hover:shadow-md active:translate-y-1 active:scale-[0.97]"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
