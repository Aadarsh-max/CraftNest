import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../redux/slices/authSlice";

import {
  showErrorToast,
  showSuccessToast,
} from "../../components/others/Toast";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
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
      await dispatch(loginUser(formData)).unwrap();

      showSuccessToast("Login successful");
    } catch (error) {
      showErrorToast(error);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "seller") {
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5 py-16">
      <div className="w-full max-w-md rounded-4xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-500">
            Login to continue exploring CraftNest
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4">
              <FiMail className="text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent px-3 py-4 text-sm text-gray-800 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4">
              <FiLock className="text-gray-400" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent px-3 py-4 text-sm text-gray-800 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-black py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="font-semibold text-black">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
