import { Link, useSearchParams } from "react-router-dom";

import { FiArrowRight, FiCheckCircle, FiShoppingBag } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { fetchOrderById } from "../../redux/slices/orderSlice";

import api from "../../services/api";

const OrderSuccess = () => {
  const dispatch = useDispatch();

  const { order } = useSelector((state) => state.order);

  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const markOrderPaid = async () => {
      try {
        await api.put(`/payments/${orderId}/pay`, {
          id: "stripe-session",

          status: "COMPLETED",
        });

        dispatch(fetchOrderById(orderId));
      } catch (error) {
        console.log(error);
      }
    };

    if (orderId) {
      markOrderPaid();
    }
  }, [orderId, dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-5 py-16">
      <div className="group/card w-full max-w-3xl rounded-[40px] bg-white p-10 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 ease-out hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] hover:ring-violet-100 lg:p-14 animate-[fadeIn_0.8s_ease-out]">
        <div className="flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-[inset_0_4px_20px_rgba(16,185,129,0.1)] transition-all duration-700 ease-out group-hover/card:scale-110 group-hover/card:bg-emerald-100 group-hover/card:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <FiCheckCircle size={64} className="animate-[pulse_2s_infinite]" />
          </div>
        </div>

        <div className="mt-10 text-center transition-transform duration-500 group-hover/card:scale-[1.01]">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500 transition-colors duration-300 group-hover/card:text-emerald-600">
            Payment Successful
          </p>

          <h1 className="mt-4 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-5xl font-black tracking-tight text-transparent">
            Order Confirmed
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed text-slate-500 transition-colors duration-300">
            Thank you for supporting local artisans through CraftNest.
          </p>
        </div>

        {order && (
          <div className="mt-12 rounded-[40px] border border-slate-100 bg-slate-50/50 p-8 transition-colors duration-500 hover:border-violet-100 hover:bg-violet-50/30">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Order ID
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-900 transition-colors duration-300 hover:text-violet-900">
                  #{order._id?.slice(-6)}
                </h2>
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Payment Status
                </p>
                <h2 className="mt-3 flex items-center gap-2 text-2xl font-black text-emerald-600">
                  <FiCheckCircle size={24} />
                  Paid
                </h2>
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Total Amount
                </p>
                <h2 className="mt-3 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-3xl font-black text-transparent">
                  ₹{order.totalPrice}
                </h2>
              </div>
            </div>

            <div className="mt-10 space-y-5">
              {order.orderItems?.map((item, index) => (
                <div
                  key={item.product}
                  className="group/item flex items-center gap-5 rounded-3xl bg-white p-5 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:ring-violet-100 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
                >
                  <div className="overflow-hidden rounded-2xl shadow-sm transition-transform duration-500 group-hover/item:shadow-md">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 object-cover transition-transform duration-700 ease-out group-hover/item:scale-110"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center bg-violet-50 text-violet-300 transition-transform duration-700 group-hover/item:scale-110">
                        <FiBox size={32} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="cursor-pointer text-xl font-black text-slate-900 transition-colors duration-300 hover:text-violet-600">
                      {item.name}
                    </h3>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-500 ring-1 ring-slate-200/50 transition-colors duration-300 group-hover/item:bg-violet-50 group-hover/item:ring-violet-100">
                      Qty:{" "}
                      <span className="font-black text-slate-900 group-hover/item:text-violet-900">
                        {item.quantity}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-black text-slate-900 transition-colors duration-300 group-hover/item:text-violet-900">
                    ₹{item.price * item.quantity}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-col gap-5 sm:flex-row">
          <Link
            to="/orders"
            className="cursor-pointer group/btn relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
          >
            <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:transform-[skew(-13deg)_translateX(150%)]">
              <div className="w-12 bg-white/30" />
            </div>
            <span className="relative z-10 flex items-center gap-2">
              <FiShoppingBag className="transition-transform duration-300 group-hover/btn:scale-110" />
              View Orders
            </span>
          </Link>

          <Link
            to="/"
            className="cursor-pointer group/btn2 flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-violet-100 bg-white px-8 py-4 text-sm font-bold tracking-wide text-violet-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 hover:shadow-md active:translate-y-1 active:scale-[0.97]"
          >
            Continue Shopping
            <FiArrowRight className="transition-transform duration-300 group-hover/btn2:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
