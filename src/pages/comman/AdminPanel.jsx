import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  FiBox,
  FiCheckCircle,
  FiShield,
  FiUsers,
  FiClock,
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

  const { users, products, loading, error } = useSelector(
    (state) => state.admin,
  );

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

  const pendingProducts = products.filter((product) => !product.isApproved);

  const approvedProducts = products.filter((product) => product.isApproved);

  const sellers = users.filter((user) => user.role === "seller");

  const verifiedSellers = sellers.filter((seller) => seller.isVerifiedSeller);

  const unverifiedSellers = sellers.filter(
    (seller) => !seller.isVerifiedSeller,
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

          <h1 className="mt-3 text-5xl font-black tracking-tight text-gray-900">
            Platform Management
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-500">
            Manage product approvals, artisan verification, and marketplace
            moderation across CraftNest.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-4xl bg-white p-8 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
              <FiUsers size={28} />
            </div>

            <h2 className="mt-8 text-5xl font-black text-gray-900">
              {users.length}
            </h2>

            <p className="mt-3 text-gray-500">Total Users</p>
          </div>

          <div className="rounded-4xl bg-white p-8 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <FiBox size={28} />
            </div>

            <h2 className="mt-8 text-5xl font-black text-gray-900">
              {products.length}
            </h2>

            <p className="mt-3 text-gray-500">Marketplace Products</p>
          </div>

          <div className="rounded-4xl bg-white p-8 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
              <FiClock size={28} />
            </div>

            <h2 className="mt-8 text-5xl font-black text-gray-900">
              {pendingProducts.length}
            </h2>

            <p className="mt-3 text-gray-500">Pending Products</p>
          </div>

          <div className="rounded-4xl bg-white p-8 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <FiShield size={28} />
            </div>

            <h2 className="mt-8 text-5xl font-black text-gray-900">
              {verifiedSellers.length}
            </h2>

            <p className="mt-3 text-gray-500">Verified Sellers</p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 xl:grid-cols-2">
          {/* PRODUCT APPROVALS */}

          <div className="rounded-[40px] bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Product Moderation
                </p>

                <h2 className="mt-3 text-3xl font-black text-gray-900">
                  Pending Approvals
                </h2>
              </div>

              <div className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                {pendingProducts.length} Pending
              </div>
            </div>

            <div className="mt-10 space-y-5">
              {pendingProducts.length === 0 && (
                <div className="rounded-[28px] border border-dashed border-gray-200 py-16 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <FiCheckCircle size={36} />
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-gray-900">
                    All Products Approved
                  </h3>

                  <p className="mt-3 text-gray-500">
                    No products are waiting for approval.
                  </p>
                </div>
              )}

              {pendingProducts.map((product) => (
                <div
                  key={product._id}
                  className="rounded-[30px] border border-gray-100 p-5 transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-5">
                      <img
                        src={
                          product.images?.[0] ||
                          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
                        }
                        alt={product.name}
                        className="h-24 w-24 rounded-3xl object-cover"
                      />

                      <div>
                        <h3 className="text-2xl font-black text-gray-900">
                          {product.name}
                        </h3>

                        <p className="mt-2 text-gray-500">{product.category}</p>

                        <div className="mt-3 flex flex-wrap gap-3">
                          <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
                            ₹{product.price}
                          </span>

                          <span className="rounded-full bg-yellow-100 px-4 py-2 text-xs font-semibold text-yellow-700">
                            Pending
                          </span>
                        </div>

                        <p className="mt-4 text-sm text-gray-400">
                          Seller: {product.seller?.name}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleApproveProduct(product._id)}
                      className="rounded-2xl bg-black px-7 py-4 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Approve Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SELLER VERIFICATION */}

          <div className="rounded-[40px] bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Seller Verification
                </p>

                <h2 className="mt-3 text-3xl font-black text-gray-900">
                  Pending Sellers
                </h2>
              </div>

              <div className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                {unverifiedSellers.length} Pending
              </div>
            </div>

            <div className="mt-10 space-y-5">
              {unverifiedSellers.length === 0 && (
                <div className="rounded-[28px] border border-dashed border-gray-200 py-16 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <FiShield size={36} />
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-gray-900">
                    All Sellers Verified
                  </h3>

                  <p className="mt-3 text-gray-500">
                    No seller approvals pending.
                  </p>
                </div>
              )}

              {unverifiedSellers.map((seller) => (
                <div
                  key={seller._id}
                  className="rounded-[30px] border border-gray-100 p-5 transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-5">
                      <img
                        src={
                          seller.avatar ||
                          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
                        }
                        alt={seller.name}
                        className="h-20 w-20 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="text-2xl font-black text-gray-900">
                          {seller.name}
                        </h3>

                        <p className="mt-2 text-gray-500">{seller.email}</p>

                        <div className="mt-3 inline-flex rounded-full bg-yellow-100 px-4 py-2 text-xs font-semibold text-yellow-700">
                          Pending Verification
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleVerifySeller(seller._id)}
                      className="rounded-2xl bg-black px-7 py-4 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Verify Seller
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* APPROVED PRODUCTS */}

        <div className="mt-16 rounded-[40px] bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Marketplace
              </p>

              <h2 className="mt-3 text-3xl font-black text-gray-900">
                Approved Products
              </h2>
            </div>

            <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              {approvedProducts.length} Approved
            </div>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-250">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="pb-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Product
                  </th>

                  <th className="pb-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Seller
                  </th>

                  <th className="pb-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Category
                  </th>

                  <th className="pb-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Price
                  </th>

                  <th className="pb-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {approvedProducts.map((product) => (
                  <tr key={product._id} className="border-b border-gray-100">
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            product.images?.[0] ||
                            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
                          }
                          alt={product.name}
                          className="h-20 w-20 rounded-2xl object-cover"
                        />

                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {product.name}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            {product.region}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-6 text-gray-600">
                      {product.seller?.name}
                    </td>

                    <td className="py-6 text-gray-600">{product.category}</td>

                    <td className="py-6 font-bold text-gray-900">
                      ₹{product.price}
                    </td>

                    <td className="py-6">
                      <div className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        Approved
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
