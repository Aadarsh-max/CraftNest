import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/others/Toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.auth);

  const [role, setRole] = useState("buyer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        registerUser({
          ...formData,
          role,
        }),
      ).unwrap();

      showSuccessToast("Account created successfully");
    } catch (error) {
      showErrorToast(error);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

 return (
  <div className="flex min-h-screen items-center justify-center bg-white px-5 py-16">
    <div className="group/card w-full max-w-md rounded-4xl bg-white p-8 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] hover:ring-violet-100">
      <div className="text-center transition-transform duration-500 group-hover/card:scale-[1.02]">
        <h1 className="bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-4xl font-black tracking-tight text-transparent transition-all duration-500">
          Create Account
        </h1>
        <p className="mt-3 font-medium text-slate-500 transition-colors duration-500">
          Join CraftNest and discover handmade creativity
        </p>
      </div>

      <div className="relative mt-8 flex rounded-2xl bg-slate-50 p-1 ring-1 ring-slate-200/50">
        <button
          type="button"
          onClick={() => setRole("buyer")}
          className={`cursor-pointer relative z-10 flex-1 rounded-xl py-3 text-sm font-bold transition-all duration-300 ease-out ${
            role === "buyer"
              ? "bg-white text-violet-700 shadow-[0_2px_10px_-3px_rgba(124,58,237,0.2)] ring-1 ring-violet-100"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
          }`}
        >
          Buyer
        </button>
        <button
          type="button"
          onClick={() => setRole("seller")}
          className={`cursor-pointer relative z-10 flex-1 rounded-xl py-3 text-sm font-bold transition-all duration-300 ease-out ${
            role === "seller"
              ? "bg-white text-violet-700 shadow-[0_2px_10px_-3px_rgba(124,58,237,0.2)] ring-1 ring-violet-100"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
          }`}
        >
          Seller
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-7">
        <div className="group relative">
          <label className="mb-3 block text-sm font-bold text-slate-700 transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:text-violet-600">
            Full Name
          </label>
          <div className="relative flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-1 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
            <FiUser className="text-xl text-slate-400 transition-all duration-500 ease-out group-focus-within:scale-110 group-focus-within:text-violet-600" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="peer w-full bg-transparent px-3 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
              required
            />
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
          </div>
        </div>

        <div className="group relative">
          <label className="mb-3 block text-sm font-bold text-slate-700 transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:text-violet-600">
            Email Address
          </label>
          <div className="relative flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-1 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
            <FiMail className="text-xl text-slate-400 transition-all duration-500 ease-out group-focus-within:scale-110 group-focus-within:text-violet-600" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="peer w-full bg-transparent px-3 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
              required
            />
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
          </div>
        </div>

        <div className="group relative">
          <label className="mb-3 block text-sm font-bold text-slate-700 transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:text-violet-600">
            Password
          </label>
          <div className="relative flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-1 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
            <FiLock className="text-xl text-slate-400 transition-all duration-500 ease-out group-focus-within:scale-110 group-focus-within:text-violet-600" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="peer w-full bg-transparent px-3 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
              required
            />
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer group relative w-full overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover:duration-1000 group-hover:transform-[skew(-13deg)_translateX(150%)]">
            <div className="w-12 bg-white/30" />
          </div>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading
              ? "Creating Account..."
              : `Register as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </span>
        </button>
      </form>

      <p className="mt-10 text-center text-sm font-medium text-slate-500 transition-colors duration-300">
        Already have an account?{" "}
        <Link
          to="/login"
          className="relative inline-block font-bold text-violet-600 transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-pink-500 after:transition-all after:duration-300 hover:text-pink-500 hover:after:w-full"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
);
};

export default Register;
