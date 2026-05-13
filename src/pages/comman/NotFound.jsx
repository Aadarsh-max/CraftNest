import { Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiCompass,
} from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5 py-16">
      <div className="w-full max-w-3xl rounded-[40px] bg-white p-10 text-center shadow-xl lg:p-14">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gray-100 text-gray-800">
          <FiCompass size={50} />
        </div>

        <p className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
          404 Error
        </p>

        <h1 className="mt-5 text-6xl font-black tracking-tight text-gray-900">
          Page Not Found
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
          The page you are looking for doesn’t exist or may have been
          moved somewhere else inside CraftNest.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-3 rounded-2xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <FiArrowLeft />
            Back To Home
          </Link>

          <Link
            to="/products"
            className="rounded-2xl border border-gray-200 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;