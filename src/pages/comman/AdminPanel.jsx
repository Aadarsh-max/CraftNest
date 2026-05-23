import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  FiBox,
  FiCheckCircle,
  FiShield,
  FiUsers,
  FiClock,
  FiUser,
} from "react-icons/fi";
import Loader from "../../components/comman/Loader";

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
    <div className="min-h-screen bg-white px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl animate-[fadeIn_0.8s_ease-out]">
        <div className="group">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
            Admin Dashboard
          </p>

          <h1 className="mt-3 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-5xl font-black tracking-tight text-transparent transition-all duration-500 group-hover:scale-[1.01] origin-left">
            Platform Management
          </h1>

          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-500 transition-colors duration-300">
            Manage product approvals, artisan verification, and marketplace
            moderation across CraftNest.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="group/stat cursor-pointer rounded-4xl bg-white p-8 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 shadow-inner transition-all duration-500 group-hover/stat:scale-110 group-hover/stat:bg-violet-100">
              <FiUsers
                size={28}
                className="transition-transform duration-500 group-hover/stat:-translate-y-1"
              />
            </div>
            <h2 className="mt-8 text-5xl font-black text-slate-900 transition-colors duration-300 group-hover/stat:text-violet-700">
              {users.length}
            </h2>
            <p className="mt-3 font-bold text-slate-400">Total Users</p>
          </div>

          <div className="group/stat cursor-pointer rounded-4xl bg-white p-8 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-fuchsia-50 text-fuchsia-600 shadow-inner transition-all duration-500 group-hover/stat:scale-110 group-hover/stat:bg-fuchsia-100">
              <FiBox
                size={28}
                className="transition-transform duration-500 group-hover/stat:-translate-y-1"
              />
            </div>
            <h2 className="mt-8 text-5xl font-black text-slate-900 transition-colors duration-300 group-hover/stat:text-fuchsia-700">
              {products.length}
            </h2>
            <p className="mt-3 font-bold text-slate-400">
              Marketplace Products
            </p>
          </div>

          <div className="group/stat cursor-pointer rounded-4xl bg-white p-8 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 shadow-inner transition-all duration-500 group-hover/stat:scale-110 group-hover/stat:bg-pink-100">
              <FiClock
                size={28}
                className="transition-transform duration-500 group-hover/stat:-translate-y-1 group-hover/stat:rotate-12"
              />
            </div>
            <h2 className="mt-8 text-5xl font-black text-slate-900 transition-colors duration-300 group-hover/stat:text-pink-600">
              {pendingProducts.length}
            </h2>
            <p className="mt-3 font-bold text-slate-400">Pending Products</p>
          </div>

          <div className="group/stat cursor-pointer rounded-4xl bg-white p-8 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 shadow-inner transition-all duration-500 group-hover/stat:scale-110 group-hover/stat:bg-emerald-100">
              <FiShield
                size={28}
                className="transition-transform duration-500 group-hover/stat:-translate-y-1"
              />
            </div>
            <h2 className="mt-8 text-5xl font-black text-slate-900 transition-colors duration-300 group-hover/stat:text-emerald-600">
              {verifiedSellers.length}
            </h2>
            <p className="mt-3 font-bold text-slate-400">Verified Sellers</p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 xl:grid-cols-2">
          <div className="rounded-[40px] bg-white p-8 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                  Product Moderation
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-900">
                  Pending Approvals
                </h2>
              </div>
              <div className="rounded-full bg-pink-50 px-5 py-2 text-sm font-black text-pink-600 shadow-sm ring-1 ring-pink-100">
                {pendingProducts.length} Pending
              </div>
            </div>

            <div className="mt-10 space-y-5">
              {pendingProducts.length === 0 && (
                <div className="group/empty rounded-[30px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-16 text-center transition-all duration-500 hover:border-violet-300 hover:bg-violet-50/50">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-violet-400 shadow-sm transition-transform duration-500 group-hover/empty:scale-110 group-hover/empty:text-violet-600">
                    <FiCheckCircle size={36} />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-slate-900 transition-colors duration-300 group-hover/empty:text-violet-900">
                    All Products Approved
                  </h3>
                  <p className="mt-3 font-medium text-slate-500">
                    No products are waiting for approval.
                  </p>
                </div>
              )}

              {pendingProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="group/item rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.15)] hover:ring-1 hover:ring-violet-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-5">
                      <div className="overflow-hidden rounded-3xl shadow-sm">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-24 w-24 object-cover transition-transform duration-700 ease-out group-hover/item:scale-110"
                          />
                        ) : (
                          <div className="flex h-24 w-24 items-center justify-center bg-violet-50 text-violet-300 transition-transform duration-700 group-hover/item:scale-110">
                            <FiBox size={32} />
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="cursor-pointer text-2xl font-black text-slate-900 transition-colors duration-300 hover:text-violet-600">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm font-bold uppercase tracking-wider text-slate-400">
                          {product.category}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-3">
                          <span className="rounded-xl bg-slate-50 px-4 py-2 text-xs font-black text-slate-700 ring-1 ring-slate-200/50">
                            ₹{product.price}
                          </span>
                          <span className="rounded-xl bg-pink-50 px-4 py-2 text-xs font-black text-pink-600 ring-1 ring-pink-100">
                            Pending
                          </span>
                        </div>

                        <p className="mt-4 text-sm font-medium text-slate-400">
                          Seller:{" "}
                          <span className="font-bold text-slate-600">
                            {product.seller?.name}
                          </span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleApproveProduct(product._id)}
                      className="cursor-pointer group/btn relative overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-7 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
                    >
                      <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:transform-[skew(-13deg)_translateX(150%)]">
                        <div className="w-12 bg-white/30" />
                      </div>
                      <span className="relative z-10">Approve Product</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[40px] bg-white p-8 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                  Seller Verification
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-900">
                  Pending Sellers
                </h2>
              </div>
              <div className="rounded-full bg-pink-50 px-5 py-2 text-sm font-black text-pink-600 shadow-sm ring-1 ring-pink-100">
                {unverifiedSellers.length} Pending
              </div>
            </div>

            <div className="mt-10 space-y-5">
              {unverifiedSellers.length === 0 && (
                <div className="group/empty rounded-[30px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-16 text-center transition-all duration-500 hover:border-violet-300 hover:bg-violet-50/50">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-violet-400 shadow-sm transition-transform duration-500 group-hover/empty:scale-110 group-hover/empty:text-violet-600">
                    <FiShield size={36} />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-slate-900 transition-colors duration-300 group-hover/empty:text-violet-900">
                    All Sellers Verified
                  </h3>
                  <p className="mt-3 font-medium text-slate-500">
                    No seller approvals pending.
                  </p>
                </div>
              )}

              {unverifiedSellers.map((seller, index) => (
                <div
                  key={seller._id}
                  className="group/item rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.15)] hover:ring-1 hover:ring-violet-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-5">
                      <div className="overflow-hidden rounded-full shadow-sm ring-2 ring-white transition-all duration-500 group-hover/item:ring-violet-200">
                        {seller.avatar ? (
                          <img
                            src={seller.avatar}
                            alt={seller.name}
                            className="h-20 w-20 object-cover transition-transform duration-700 ease-out group-hover/item:scale-110"
                          />
                        ) : (
                          <div className="flex h-20 w-20 items-center justify-center bg-violet-50 text-violet-300 transition-transform duration-700 group-hover/item:scale-110">
                            <FiUser size={28} />
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="cursor-pointer text-2xl font-black text-slate-900 transition-colors duration-300 hover:text-violet-600">
                          {seller.name}
                        </h3>
                        <p className="mt-1 font-medium text-slate-500">
                          {seller.email}
                        </p>

                        <div className="mt-3 inline-flex rounded-xl bg-pink-50 px-4 py-2 text-xs font-black text-pink-600 ring-1 ring-pink-100">
                          Pending Verification
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleVerifySeller(seller._id)}
                      className="cursor-pointer group/btn relative overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-7 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
                    >
                      <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:transform-[skew(-13deg)_translateX(150%)]">
                        <div className="w-12 bg-white/30" />
                      </div>
                      <span className="relative z-10">Verify Seller</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-[40px] bg-white p-8 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.2)] hover:ring-violet-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                Marketplace
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-900">
                Approved Products
              </h2>
            </div>
            <div className="rounded-full bg-emerald-50 px-5 py-2 text-sm font-black text-emerald-600 shadow-sm ring-1 ring-emerald-100">
              {approvedProducts.length} Approved
            </div>
          </div>

          <div className="mt-10 overflow-x-auto pb-4">
            <table className="w-full min-w-200">
              <thead>
                <tr className="border-b-2 border-slate-100 text-left">
                  <th className="pb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Product
                  </th>
                  <th className="pb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Seller
                  </th>
                  <th className="pb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Category
                  </th>
                  <th className="pb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Price
                  </th>
                  <th className="pb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {approvedProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="group/row cursor-pointer border-b border-slate-50 transition-colors duration-300 hover:bg-violet-50/30"
                  >
                    <td className="py-5">
                      <div className="flex items-center gap-5">
                        <div className="overflow-hidden rounded-2xl shadow-sm transition-transform duration-500 group-hover/row:shadow-md">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-16 w-16 object-cover transition-transform duration-700 ease-out group-hover/row:scale-110"
                            />
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center bg-violet-50 text-violet-300 transition-transform duration-700 group-hover/row:scale-110">
                              <FiBox size={24} />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover/row:text-violet-700">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                            {product.region}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 font-medium text-slate-600 transition-colors duration-300 group-hover/row:text-slate-900">
                      {product.seller?.name}
                    </td>
                    <td className="py-5 font-medium text-slate-600 transition-colors duration-300 group-hover/row:text-slate-900">
                      {product.category}
                    </td>
                    <td className="py-5 font-black text-slate-900 transition-colors duration-300 group-hover/row:text-violet-900">
                      ₹{product.price}
                    </td>
                    <td className="py-5">
                      <div className="inline-flex rounded-xl bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-600 ring-1 ring-emerald-100 transition-all duration-300 group-hover/row:bg-emerald-100">
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
