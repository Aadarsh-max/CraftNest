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
    <div className="min-h-screen bg-gray-50 px-5 py-10 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[1.2fr_0.7fr]">
        <div className="rounded-4xl bg-white p-8 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Checkout
            </p>

            <h1 className="mt-3 text-4xl font-black text-gray-900">
              Shipping Details
            </h1>
          </div>

          <form onSubmit={handleCheckout} className="mt-10 space-y-6">
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={shippingAddress.address}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
              required
            />

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingAddress.city}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={shippingAddress.state}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={shippingAddress.postalCode}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
                required
              />

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={shippingAddress.country}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-black py-4 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Continue To Payment
            </button>
          </form>
        </div>

        <div className="h-fit rounded-4xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black text-gray-900">Order Summary</h2>

          <div className="mt-10 space-y-5">
            {cart.items.map((item) => (
              <div key={item.product._id} className="flex items-center gap-4">
                <img
                  src={item.product.images?.[0]}
                  alt={item.product.name}
                  className="h-20 w-20 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">
                    {item.product.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <h4 className="font-bold text-gray-900">
                  ₹{item.product.price * item.quantity}
                </h4>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-900">Total</p>

              <h2 className="text-3xl font-black text-gray-900">₹{subtotal}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
