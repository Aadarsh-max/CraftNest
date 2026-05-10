import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FiBox,
  FiCheckCircle,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import Loader from '../../components/comman/Loader'

import {
  fetchAdminProducts,
  fetchAdminUsers,
  approveProduct,
  verifySeller,
} from "../../redux/slices/adminSlice";

import {
  showErrorToast,
  showSuccessToast,
} from "../../components/others/Toast";

const AdminPanel = () => {
  const dispatch = useDispatch();

  const { users, products, loading, error } =
    useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminUsers());
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  const handleApproveProduct = async (id) => {
    try {
      await dispatch(approveProduct(id)).unwrap();

      showSuccessToast("Product approved successfully");
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleVerifySeller = async (id) => {
    try {
      await dispatch(verifySeller(id)).unwrap();

      showSuccessToast("Seller verified successfully");
    } catch (error) {
      showErrorToast(error);
    }
  };

  const pendingProducts = products.filter(
    (product) => !product.isApproved
  );

  const sellers = users.filter(
    (user) => user.role === "seller"
  );

  const unverifiedSellers = sellers.filter(
    (seller) => !seller.isVerifiedSeller
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Admin Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900">
            Platform Management
          </h1>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
              <FiUsers size={24} />
            </div>

            <h2 className="mt-6 text-4xl font-black text-gray-900">
              {users.length}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Total Users
            </p>
          </div>

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
              <FiCheckCircle size={24} />
            </div>

            <h2 className="mt-6 text-4xl font-black text-gray-900">
              {pendingProducts.length}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Pending Products
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
              <FiShield size={24} />
            </div>

            <h2 className="mt-6 text-4xl font-black text-gray-900">
              {unverifiedSellers.length}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Unverified Sellers
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Product Approvals
                </p>

                <h2 className="mt-2 text-2xl font-black text-gray-900">
                  Pending Products
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {pendingProducts.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-200 py-10 text-center">
                  <p className="text-sm text-gray-500">
                    No pending product approvals
                  </p>
                </div>
              )}

              {pendingProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col gap-5 rounded-3xl border border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between"
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
                        {product.category}
                      </p>

                      <p className="mt-2 text-sm text-gray-400">
                        Seller: {product.seller?.name}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleApproveProduct(product._id)
                    }
                    className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Approve Product
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Seller Verification
              </p>

              <h2 className="mt-2 text-2xl font-black text-gray-900">
                Unverified Sellers
              </h2>
            </div>

            <div className="mt-8 space-y-5">
              {unverifiedSellers.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-200 py-10 text-center">
                  <p className="text-sm text-gray-500">
                    No seller verification pending
                  </p>
                </div>
              )}

              {unverifiedSellers.map((seller) => (
                <div
                  key={seller._id}
                  className="flex flex-col gap-5 rounded-3xl border border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {seller.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {seller.email}
                    </p>

                    <p className="mt-2 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      Pending Verification
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleVerifySeller(seller._id)
                    }
                    className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Verify Seller
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;