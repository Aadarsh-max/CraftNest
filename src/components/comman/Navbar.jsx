import { useEffect, useRef, useState } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  FiHeart,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
  FiShoppingBag,
  FiPackage,
  FiShield,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/slices/authSlice";

import { fetchCart } from "../../redux/slices/cartSlice";

import { fetchWishlist } from "../../redux/slices/wishlistSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const { cart } = useSelector((state) => state.cart);

  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());

      dispatch(fetchWishlist());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");

    setProfileOpen(false);

    setMenuOpen(false);
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Shop",
      path: "/products",
    },

    {
      name: "Recommendations",
      path: "/recommendations",
    },

    {
      name: "Artisans",
      path: "/artisans",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <Link
          to="/"
          className="cursor-pointer bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-3xl font-black tracking-tight text-transparent transition-transform duration-500 hover:scale-[1.02] origin-left"
        >
          CraftNest
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `cursor-pointer relative text-sm font-bold transition-all duration-300 ease-out hover:text-violet-600 ${
                  isActive
                    ? "text-violet-600 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-violet-600"
                    : "text-slate-500 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-violet-600 after:transition-all after:duration-300 hover:after:w-full"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/wishlist"
            className="cursor-pointer group relative flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 ring-1 ring-slate-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white hover:text-pink-500 hover:shadow-lg hover:shadow-pink-500/20 active:scale-95"
          >
            <FiHeart
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            {wishlist?.products?.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-r from-pink-500 to-rose-500 text-[10px] font-black text-white shadow-sm ring-2 ring-white">
                {wishlist.products.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="cursor-pointer group relative flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 ring-1 ring-slate-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white hover:text-violet-600 hover:shadow-lg hover:shadow-violet-500/20 active:scale-95"
          >
            <FiShoppingCart
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            {cart?.items?.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-r from-violet-600 to-fuchsia-500 text-[10px] font-black text-white shadow-sm ring-2 ring-white">
                {cart.items.length}
              </span>
            )}
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="cursor-pointer group relative ml-2 overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-8 py-3 text-sm font-bold tracking-wide text-white shadow-[0_4px_15px_-3px_rgba(124,58,237,0.4)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-4px_rgba(236,72,153,0.5)] active:translate-y-0.5 active:scale-[0.97]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover:duration-1000 group-hover:transform-[skew(-13deg)_translateX(150%)]">
                <div className="w-12 bg-white/30" />
              </div>
              <span className="relative z-10">Login</span>
            </Link>
          ) : (
            <div className="relative ml-2" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="cursor-pointer group flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-violet-50 text-violet-600 ring-2 ring-transparent transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 hover:ring-violet-400 active:scale-95"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <FiUser
                    size={20}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-4 w-64 overflow-hidden rounded-3xl bg-white p-2 shadow-[0_15px_50px_-10px_rgba(124,58,237,0.2)] ring-1 ring-violet-50 animate-[fadeInUp_0.2s_ease-out]">
                  <div className="mb-2 border-b border-slate-50 px-4 pb-4 pt-3">
                    <h3 className="truncate text-lg font-black text-slate-900">
                      {user.name}
                    </h3>
                    <p className="truncate text-sm font-medium text-slate-400">
                      {user.email}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Link
                      to="/orders"
                      onClick={() => setProfileOpen(false)}
                      className="cursor-pointer flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 transition-all duration-300 hover:bg-violet-50 hover:text-violet-700 hover:translate-x-1"
                    >
                      <FiShoppingBag size={16} />
                      My Orders
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() => setProfileOpen(false)}
                      className="cursor-pointer flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 transition-all duration-300 hover:bg-violet-50 hover:text-violet-700 hover:translate-x-1"
                    >
                      <FiHeart size={16} />
                      Wishlist
                    </Link>

                    {user.role === "seller" && (
                      <Link
                        to="/seller/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="cursor-pointer flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 transition-all duration-300 hover:bg-violet-50 hover:text-violet-700 hover:translate-x-1"
                      >
                        <FiPackage size={16} />
                        Seller Dashboard
                      </Link>
                    )}

                    {user.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="cursor-pointer flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 transition-all duration-300 hover:bg-violet-50 hover:text-violet-700 hover:translate-x-1"
                      >
                        <FiShield size={16} />
                        Admin Dashboard
                      </Link>
                    )}

                    <div className="my-1 border-t border-slate-50"></div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="cursor-pointer flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-red-500 transition-all duration-300 hover:bg-red-50 hover:text-red-600 hover:translate-x-1"
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 ring-1 ring-slate-100 transition-all duration-300 hover:bg-violet-50 hover:text-violet-600 active:scale-95 lg:hidden"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute left-0 top-full w-full border-b border-slate-100 bg-white/95 px-5 py-6 shadow-xl backdrop-blur-xl animate-[fadeIn_0.3s_ease-out] lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `cursor-pointer rounded-2xl px-5 py-4 text-base font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-violet-50 text-violet-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-violet-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="my-2 border-t border-slate-100"></div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer flex items-center justify-center gap-2 rounded-2xl bg-slate-50 py-4 text-sm font-bold text-slate-700 transition-colors hover:bg-pink-50 hover:text-pink-600"
              >
                <FiHeart size={18} />
                Wishlist
                {wishlist?.products?.length > 0 &&
                  ` (${wishlist.products.length})`}
              </Link>

              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer flex items-center justify-center gap-2 rounded-2xl bg-slate-50 py-4 text-sm font-bold text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-600"
              >
                <FiShoppingCart size={18} />
                Cart
                {cart?.items?.length > 0 && ` (${cart.items.length})`}
              </Link>
            </div>

            <div className="mt-2 flex flex-col gap-3">
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer flex items-center justify-center rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 py-4 text-sm font-bold text-white shadow-md active:scale-95"
                >
                  Login to CraftNest
                </Link>
              ) : (
                <>
                  {user.role === "seller" && (
                    <Link
                      to="/seller/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="cursor-pointer flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white active:scale-95"
                    >
                      <FiPackage />
                      Seller Dashboard
                    </Link>
                  )}

                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="cursor-pointer flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white active:scale-95"
                    >
                      <FiShield />
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="cursor-pointer flex items-center justify-center gap-2 rounded-2xl bg-red-50 py-4 text-sm font-bold text-red-600 active:scale-95"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
