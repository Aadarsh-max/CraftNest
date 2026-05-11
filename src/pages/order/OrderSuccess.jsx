import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";

const OrderSuccess = () => {
  const { order } = useSelector((state) => state.order);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5 py-16">
      <div className="w-full max-w-3xl rounded-[40px] bg-white p-10 shadow-xl lg:p-14">
        <div className="flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-green-100 text-green-600">
            <FiCheckCircle size={52} />
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-500">
            Payment Successful
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight text-gray-900">
            Order Confirmed
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-500">
            Thank you for supporting local artisans through CraftNest. Your
            order has been placed successfully and is now being processed.
          </p>
        </div>

        {order && (
          <div className="mt-12 rounded-4xl border border-gray-100 bg-gray-50 p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Order ID
                </p>

                <h2 className="mt-3 text-3xl font-black text-gray-900">
                  #{order._id?.slice(-6)}
                </h2>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Payment Method
                </p>

                <h2 className="mt-3 text-2xl font-black text-gray-900">
                  {order.paymentMethod}
                </h2>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Total Amount
                </p>

                <h2 className="mt-3 text-3xl font-black text-gray-900">
                  ₹{order.totalPrice}
                </h2>
              </div>
            </div>

            <div className="mt-10 space-y-5">
              {order.orderItems?.map((item) => (
                <div
                  key={item.product}
                  className="flex items-center gap-5 rounded-3xl bg-white p-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-3xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <h2 className="text-2xl font-black text-gray-900">
                    ₹{item.price * item.quantity}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/orders"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <FiShoppingBag />
            View Orders
          </Link>

          <Link
            to="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Continue Shopping
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
