import { Link, NavLink } from "react-router-dom";
import { FiHeart, FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Recommendations", path: "/recommendations" },
    { name: "Artisans", path: "/artisans" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-gray-900"
        >
          CraftNest
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200">
            <FiSearch size={18} />
          </button>

          <Link
            to="/wishlist"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
          >
            <FiHeart size={18} />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
              2
            </span>
          </Link>

          <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
          >
            <FiShoppingCart size={18} />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
              3
            </span>
          </Link>

          <Link
            to="/login"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition hover:opacity-90"
          >
            <FiUser size={18} />
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 lg:hidden"
        >
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-black"
                      : "text-gray-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="mt-3 flex items-center gap-3">
              <Link
                to="/wishlist"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 text-sm font-medium text-gray-700"
              >
                <FiHeart />
                Wishlist
              </Link>

              <Link
                to="/cart"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 text-sm font-medium text-gray-700"
              >
                <FiShoppingCart />
                Cart
              </Link>
            </div>

            <Link
              to="/login"
              className="flex items-center justify-center rounded-xl bg-black py-3 text-sm font-semibold text-white"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;