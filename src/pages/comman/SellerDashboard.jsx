import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FiBox,
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";

import Loader from '../../components/comman/Loader'

import {
  fetchSellerOrders,
  fetchSellerProducts,
} from "../../redux/slices/sellerSlice";

const SellerDashboard = () => {
  const dispatch = useDispatch();

  const { products, orders, loading } =
    useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(fetchSellerProducts());
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  const totalRevenue = orders.reduce((acc, order) => {
    const sellerRevenue = order.orderItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    return acc + sellerRevenue;
  }, 0);

  const approvedProducts = products.filter(
    (product) => product.isApproved
  );

  const pendingProducts = products.filter(
    (product) => !product.isApproved
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Seller Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900">
            Manage Your Craft Store
          </h1>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
              <FiBox size={24} />
            </div>

            <h2 className="mt-6 text-4xl font-black text-gray-900">
              {products.length}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Total Products
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
              <FiShoppingBag size={24} />
            </div>

            <h2 className="mt-6 text-4xl font-black text-gray-900">
              {orders.length}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Total Orders
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
              <FiDollarSign size={24} />
            </div>

            <h2 className="mt-6 text-4xl font-black text-gray-900">
              ₹{totalRevenue}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Revenue Generated
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
              <FiPackage size={24} />
            </div>

            <h2 className="mt-6 text-4xl font-black text-gray-900">
              {pendingProducts.length}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Pending Approvals
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Products
                </p>

                <h2 className="mt-2 text-2xl font-black text-gray-900">
                  Your Inventory
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {products.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-200 py-10 text-center">
                  <p className="text-sm text-gray-500">
                    No products uploaded yet
                  </p>
                </div>
              )}

              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between rounded-3xl border border-gray-100 p-5"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        ₹{product.price}
                      </p>

                      <div
                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          product.isApproved
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {product.isApproved
                          ? "Approved"
                          : "Pending Approval"}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      Stock
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {product.stock}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Orders
              </p>

              <h2 className="mt-2 text-2xl font-black text-gray-900">
                Recent Orders
              </h2>
            </div>

            <div className="mt-8 space-y-5">
              {orders.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-200 py-10 text-center">
                  <p className="text-sm text-gray-500">
                    No orders received yet
                  </p>
                </div>
              )}

              {orders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-3xl border border-gray-100 p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">
                      Order #{order._id.slice(-6)}
                    </h3>

                    <div className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
                      {order.paymentMethod}
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    {order.orderItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-2xl object-cover"
                        />

                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {item.name}
                          </h4>

                          <p className="mt-1 text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <h4 className="font-bold text-gray-900">
                          ₹
                          {item.price * item.quantity}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;