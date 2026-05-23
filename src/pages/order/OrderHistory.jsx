import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { FiCheckCircle, FiClock, FiPackage } from "react-icons/fi";

import Loader from "../../components/comman/Loader";

import { fetchMyOrders } from "../../redux/slices/orderSlice";

const OrderHistory = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl animate-[fadeIn_0.8s_ease-out]">
        <div className="group">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
            Purchase History
          </p>

          <h1 className="mt-3 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-5xl font-black tracking-tight text-transparent transition-transform duration-500 group-hover:scale-[1.01] origin-left">
            Your Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="group/empty mt-16 rounded-[40px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-24 text-center transition-all duration-500 hover:border-violet-300 hover:bg-violet-50/50">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-violet-400 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.15)] transition-transform duration-500 group-hover/empty:-translate-y-2 group-hover/empty:scale-110 group-hover/empty:text-violet-600 group-hover/empty:shadow-[0_10px_30px_-10px_rgba(124,58,237,0.3)]">
              <FiPackage
                size={40}
                className="transition-transform duration-500 group-hover/empty:rotate-12"
              />
            </div>

            <h2 className="mt-8 text-3xl font-black text-slate-900 transition-colors duration-300 group-hover/empty:text-violet-900">
              No Orders Yet
            </h2>

            <p className="mt-4 font-medium text-slate-500 transition-colors duration-300">
              Your placed orders will appear here. Time to discover some artisan
              crafts!
            </p>

            <Link
              to="/products"
              className="cursor-pointer group/btn relative mt-8 inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:transform-[skew(-13deg)_translateX(150%)]">
                <div className="w-12 bg-white/30" />
              </div>
              <span className="relative z-10 flex items-center gap-2">
                Explore Products
              </span>
            </Link>
          </div>
        ) : (
          <div className="mt-14 space-y-8">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="group/order rounded-[40px] bg-white p-8 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] hover:ring-violet-100 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-4">
                      <h2 className="text-3xl font-black text-slate-900 transition-colors duration-300 group-hover/order:text-violet-900">
                        Order #{order._id.slice(-6)}
                      </h2>

                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black shadow-sm ring-1 transition-all duration-300 hover:-translate-y-0.5 ${
                          order.isPaid
                            ? "bg-emerald-50 text-emerald-600 ring-emerald-100 hover:bg-emerald-100"
                            : "bg-pink-50 text-pink-600 ring-pink-100 hover:bg-pink-100"
                        }`}
                      >
                        {order.isPaid ? (
                          <>
                            <FiCheckCircle size={14} />
                            Paid
                          </>
                        ) : (
                          <>
                            <FiClock size={14} />
                            Pending Payment
                          </>
                        )}
                      </div>

                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black shadow-sm ring-1 transition-all duration-300 hover:-translate-y-0.5 ${
                          order.isDelivered
                            ? "bg-violet-50 text-violet-600 ring-violet-100 hover:bg-violet-100"
                            : "bg-slate-50 text-slate-600 ring-slate-200/50 hover:bg-slate-100"
                        }`}
                      >
                        {order.isDelivered ? (
                          <>
                            <FiCheckCircle size={14} />
                            Delivered
                          </>
                        ) : (
                          <>
                            <FiTruck size={14} />
                            Processing
                          </>
                        )}
                      </div>
                    </div>

                    <p className="mt-4 text-sm font-bold text-slate-400">
                      Ordered on{" "}
                      <span className="text-slate-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  <div className="rounded-3xl bg-slate-50/50 px-8 py-6 ring-1 ring-slate-100 transition-colors duration-300 group-hover/order:bg-violet-50/30 group-hover/order:ring-violet-100">
                    <p className="text-sm font-bold uppercase tracking-wider text-slate-400 transition-colors duration-300 group-hover/order:text-violet-500">
                      Total Amount
                    </p>

                    <h2 className="mt-3 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-4xl font-black text-transparent transition-transform duration-500 group-hover/order:scale-105 origin-left">
                      ₹{order.totalPrice}
                    </h2>
                  </div>
                </div>

                <div className="mt-10 space-y-5">
                  {order.orderItems.map((item, itemIndex) => (
                    <div
                      key={item.product}
                      className="group/item flex flex-col gap-6 rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.15)] hover:ring-1 hover:ring-violet-100 lg:flex-row lg:items-center"
                      style={{
                        animationDelay: `${index * 100 + itemIndex * 50}ms`,
                      }}
                    >
                      <div className="overflow-hidden rounded-3xl shadow-sm transition-transform duration-500 group-hover/item:shadow-md lg:w-28">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-28 w-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-110 lg:w-28"
                          />
                        ) : (
                          <div className="flex h-28 w-full items-center justify-center bg-violet-50 text-violet-300 transition-transform duration-700 group-hover/item:scale-110 lg:w-28">
                            <FiBox size={32} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="cursor-pointer text-xl font-black text-slate-900 transition-colors duration-300 hover:text-violet-600">
                          {item.name}
                        </h3>

                        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
                          <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 ring-1 ring-slate-200/50 transition-colors duration-300 group-hover/item:bg-violet-50/50 group-hover/item:ring-violet-100">
                            Qty:{" "}
                            <span className="font-black text-slate-900 group-hover/item:text-violet-900">
                              {item.quantity}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 ring-1 ring-slate-200/50 transition-colors duration-300 group-hover/item:bg-violet-50/50 group-hover/item:ring-violet-100">
                            Price:{" "}
                            <span className="font-black text-slate-900 group-hover/item:text-violet-900">
                              ₹{item.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      <h2 className="text-3xl font-black text-slate-900 transition-colors duration-300 group-hover/item:text-violet-900">
                        ₹{item.price * item.quantity}
                      </h2>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-[30px] border-2 border-dashed border-slate-100 bg-slate-50/50 p-8 transition-colors duration-500 group-hover/order:border-violet-100 group-hover/order:bg-violet-50/30">
                  <div className="flex items-center gap-3">
                    <FiMapPin className="text-xl text-violet-500" />
                    <h3 className="text-xl font-black text-slate-900">
                      Shipping Address
                    </h3>
                  </div>

                  <p className="mt-4 text-base font-bold text-slate-500">
                    {order.shippingAddress?.address},{" "}
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state} -{" "}
                    <span className="text-violet-600">
                      {order.shippingAddress?.postalCode}
                    </span>
                    , {order.shippingAddress?.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
