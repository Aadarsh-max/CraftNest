import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createCheckoutSession,
  createOrder,
} from "../../redux/slices/orderSlice";
import { showErrorToast } from "../../components/others/Toast";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  const subtotal =
    cart?.items?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    ) || 0;

  const handleChange = (e) => {
    setShippingAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      const order = await dispatch(
        createOrder({
          shippingAddress,
          paymentMethod,
        }),
      ).unwrap();

      const session = await dispatch(createCheckoutSession(order._id)).unwrap();

      window.location.href = session.url;
    } catch (error) {
      showErrorToast(error);
    }
  };

  if (!cart?.items?.length) {
    navigate("/cart");
  }

  return (
    <div className="min-h-screen bg-white px-5 py-10 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 animate-[fadeIn_0.8s_ease-out] xl:grid-cols-[1.2fr_0.7fr]">
        <div className="group/card rounded-4xl bg-white p-8 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 ease-out hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] hover:ring-violet-100">
          <div className="transition-transform duration-500 group-hover/card:scale-[1.01] origin-left">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
              Checkout
            </p>

            <h1 className="mt-3 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-4xl font-black text-transparent transition-all duration-500">
              Shipping Details
            </h1>
          </div>

          <form onSubmit={handleCheckout} className="mt-10 space-y-7">
            <div className="group relative">
              <div className="relative flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-1 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
                <FiMapPin className="text-xl text-slate-400 transition-all duration-500 ease-out group-focus-within:scale-110 group-focus-within:text-violet-600" />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={shippingAddress.address}
                  onChange={handleChange}
                  className="peer w-full bg-transparent px-4 py-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
                  required
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
              </div>
            </div>

            <div className="grid gap-7 md:grid-cols-2">
              <div className="group relative">
                <div className="relative flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-1 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
                  <FiMap className="text-xl text-slate-400 transition-all duration-500 ease-out group-focus-within:scale-110 group-focus-within:text-violet-600" />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    className="peer w-full bg-transparent px-4 py-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
                </div>
              </div>

              <div className="group relative">
                <div className="relative flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-1 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
                  <FiFlag className="text-xl text-slate-400 transition-all duration-500 ease-out group-focus-within:scale-110 group-focus-within:text-violet-600" />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={handleChange}
                    className="peer w-full bg-transparent px-4 py-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
                </div>
              </div>
            </div>

            <div className="grid gap-7 md:grid-cols-2">
              <div className="group relative">
                <div className="relative flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-1 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
                  <FiHash className="text-xl text-slate-400 transition-all duration-500 ease-out group-focus-within:scale-110 group-focus-within:text-violet-600" />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                    className="peer w-full bg-transparent px-4 py-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
                </div>
              </div>

              <div className="group relative">
                <div className="relative flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-1 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
                  <FiGlobe className="text-xl text-slate-400 transition-all duration-500 ease-out group-focus-within:scale-110 group-focus-within:text-violet-600" />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={handleChange}
                    className="peer w-full bg-transparent px-4 py-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="cursor-pointer group relative w-full overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 py-5 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.98] active:shadow-none"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover:duration-1000 group-hover:transform-[skew(-13deg)_translateX(150%)]">
                <div className="w-12 bg-white/30" />
              </div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Continue To Payment
              </span>
            </button>
          </form>
        </div>

        <div className="group/summary sticky top-10 h-fit rounded-4xl bg-white p-8 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] hover:ring-violet-100">
          <h2 className="text-3xl font-black text-slate-900 transition-colors duration-300">
            Order Summary
          </h2>

          <div className="mt-10 space-y-6">
            {cart?.items?.map((item, index) => (
              <div
                key={item.product._id}
                className="group/item flex items-center gap-5 rounded-2xl bg-slate-50/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50/50 hover:shadow-md hover:shadow-violet-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-violet-500 shadow-sm transition-transform duration-300 group-hover/item:scale-110">
                  <FiShoppingBag size={20} />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 transition-colors duration-300 group-hover/item:text-violet-700">
                    {item.product.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Qty:{" "}
                    <span className="font-bold text-slate-700">
                      {item.quantity}
                    </span>
                  </p>
                </div>

                <h4 className="font-black text-slate-900 transition-colors duration-300 group-hover/item:text-violet-950">
                  ₹{item.product.price * item.quantity}
                </h4>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-slate-100 pt-8">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-slate-900">Total</p>
              <h2 className="bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-4xl font-black text-transparent transition-transform duration-500 group-hover/summary:scale-105 origin-right">
                ₹{subtotal}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
