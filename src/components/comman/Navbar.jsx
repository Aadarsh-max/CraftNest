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
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <Link
          to="/"
          className="text-3xl font-black tracking-tight text-gray-900"
        >
          CraftNest
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive ? "text-black" : "text-gray-500 hover:text-black"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
          >
            <FiSearch size={18} />
          </button>

          <Link
            to="/wishlist"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
          >
            <FiHeart size={18} />

            {wishlist?.products?.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
                {wishlist.products.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
          >
            <FiShoppingCart size={18} />

            {cart?.items?.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
                {cart.items.length}
              </span>
            )}
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <FiUser size={18} />
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-4 w-64 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
                  <div className="border-b border-gray-100 p-5">
                    <h3 className="text-lg font-bold text-gray-900">
                      {user.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">{user.email}</p>
                  </div>

                  <div className="flex flex-col p-3">
                    <Link
                      to="/orders"
                      onClick={() => setProfileOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() => setProfileOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      Wishlist
                    </Link>

                    {user.role === "seller" && (
                      <Link
                        to="/seller/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        Seller Dashboard
                      </Link>
                    )}

                    {user.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <FiLogOut />
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
                  `text-sm font-semibold ${
                    isActive ? "text-black" : "text-gray-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-3 rounded-2xl bg-gray-100 py-4 text-sm font-semibold text-gray-700"
              >
                <FiHeart />
                Wishlist
              </Link>

              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-3 rounded-2xl bg-gray-100 py-4 text-sm font-semibold text-gray-700"
              >
                <FiShoppingCart />
                Cart
              </Link>

              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center rounded-2xl bg-black py-4 text-sm font-semibold text-white"
                >
                  Login
                </Link>
              ) : (
                <>
                  {user.role === "seller" && (
                    <Link
                      to="/seller/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center rounded-2xl bg-black py-4 text-sm font-semibold text-white"
                    >
                      Seller Dashboard
                    </Link>
                  )}

                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center rounded-2xl bg-black py-4 text-sm font-semibold text-white"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-3 rounded-2xl bg-red-500 py-4 text-sm font-semibold text-white"
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
