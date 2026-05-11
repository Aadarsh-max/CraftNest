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
    <div className="min-h-screen bg-gray-50 px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Purchase History
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900">
            Your Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="mt-16 rounded-4xl bg-white py-24 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-700">
              <FiPackage size={36} />
            </div>

            <h2 className="mt-8 text-3xl font-black text-gray-900">
              No Orders Yet
            </h2>

            <p className="mt-3 text-gray-500">
              Your placed orders will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-14 space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-4xl bg-white p-8 shadow-sm"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-4">
                      <h2 className="text-2xl font-black text-gray-900">
                        Order #{order._id.slice(-6)}
                      </h2>

                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                          order.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.isPaid ? (
                          <>
                            <FiCheckCircle />
                            Paid
                          </>
                        ) : (
                          <>
                            <FiClock />
                            Pending Payment
                          </>
                        )}
                      </div>

                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                          order.isDelivered
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Processing"}
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-gray-500">
                      Ordered on{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-gray-50 px-8 py-6">
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Total Amount
                    </p>

                    <h2 className="mt-3 text-3xl font-black text-gray-900">
                      ₹{order.totalPrice}
                    </h2>
                  </div>
                </div>

                <div className="mt-10 space-y-5">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.product}
                      className="flex flex-col gap-5 rounded-3xl border border-gray-100 p-5 lg:flex-row lg:items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-28 w-full rounded-3xl object-cover lg:w-28"
                      />

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.name}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                          <p>
                            Quantity:{" "}
                            <span className="font-semibold text-gray-700">
                              {item.quantity}
                            </span>
                          </p>

                          <p>
                            Price:{" "}
                            <span className="font-semibold text-gray-700">
                              ₹{item.price}
                            </span>
                          </p>
                        </div>
                      </div>

                      <h2 className="text-2xl font-black text-gray-900">
                        ₹{item.price * item.quantity}
                      </h2>
                    </div>
                  ))}
                </div>

                <div className="mt-10 border-t border-gray-100 pt-8">
                  <h3 className="text-lg font-bold text-gray-900">
                    Shipping Address
                  </h3>

                  <p className="mt-3 text-gray-500">
                    {order.shippingAddress?.address},{" "}
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state} -{" "}
                    {order.shippingAddress?.postalCode},{" "}
                    {order.shippingAddress?.country}
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
