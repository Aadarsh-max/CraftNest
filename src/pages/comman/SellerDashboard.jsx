import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  FiBox,
  FiCheckCircle,
  FiDollarSign,
  FiEdit2,
  FiPackage,
  FiPlus,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";

import Loader from "../../components/comman/Loader";

import ProductFormModal from "../../components/product/ProductFormModal";

import {
  deleteProduct,
  fetchSellerProducts,
} from "../../redux/slices/sellerSlice";

import {
  showErrorToast,
  showSuccessToast,
} from "../../components/others/Toast";

const SellerDashboard = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.seller);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editProductData, setEditProductData] = useState(null);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const totalRevenue = products.reduce(
    (acc, product) => acc + product.price * (product.stock || 0),
    0,
  );

  const approvedProducts = products.filter(
    (product) => product.isApproved,
  ).length;

  const pendingProducts = products.filter(
    (product) => !product.isApproved,
  ).length;

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      await dispatch(deleteProduct(productId)).unwrap();

      showSuccessToast("Product deleted successfully");
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleEdit = (product) => {
    setEditProductData(product);

    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditProductData(null);

    setIsModalOpen(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl animate-[fadeIn_0.8s_ease-out]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="group">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
              Seller Dashboard
            </p>

            <h1 className="mt-3 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-5xl font-black tracking-tight text-transparent transition-transform duration-500 group-hover:scale-[1.01] origin-left">
              Manage Your Craft Store
            </h1>
          </div>

          <button
            onClick={openCreateModal}
            className="cursor-pointer group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
          >
            <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:transform-[skew(-13deg)_translateX(150%)]">
              <div className="w-12 bg-white/30" />
            </div>
            <span className="relative z-10 flex items-center gap-2">
              <FiPlus
                className="transition-transform duration-300 group-hover/btn:rotate-90"
                size={18}
              />
              Add Product
            </span>
          </button>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="group/stat cursor-pointer rounded-4xl bg-white p-8 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 shadow-inner transition-all duration-500 group-hover/stat:scale-110 group-hover/stat:bg-violet-100">
              <FiBox
                size={28}
                className="transition-transform duration-500 group-hover/stat:-translate-y-1"
              />
            </div>
            <h2 className="mt-8 text-5xl font-black text-slate-900 transition-colors duration-300 group-hover/stat:text-violet-700">
              {products.length}
            </h2>
            <p className="mt-3 font-bold text-slate-400">Total Products</p>
          </div>

          <div className="group/stat cursor-pointer rounded-4xl bg-white p-8 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 shadow-inner transition-all duration-500 group-hover/stat:scale-110 group-hover/stat:bg-emerald-100">
              <FiCheckCircle
                size={28}
                className="transition-transform duration-500 group-hover/stat:-translate-y-1"
              />
            </div>
            <h2 className="mt-8 text-5xl font-black text-slate-900 transition-colors duration-300 group-hover/stat:text-emerald-600">
              {approvedProducts}
            </h2>
            <p className="mt-3 font-bold text-slate-400">Approved Products</p>
          </div>

          <div className="group/stat cursor-pointer rounded-4xl bg-white p-8 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-pink-500 shadow-inner transition-all duration-500 group-hover/stat:scale-110 group-hover/stat:bg-pink-100">
              <FiXCircle
                size={28}
                className="transition-transform duration-500 group-hover/stat:-translate-y-1 group-hover/stat:rotate-12"
              />
            </div>
            <h2 className="mt-8 text-5xl font-black text-slate-900 transition-colors duration-300 group-hover/stat:text-pink-600">
              {pendingProducts}
            </h2>
            <p className="mt-3 font-bold text-slate-400">Pending Approval</p>
          </div>

          <div className="group/stat cursor-pointer rounded-4xl bg-white p-8 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-fuchsia-50 text-fuchsia-600 shadow-inner transition-all duration-500 group-hover/stat:scale-110 group-hover/stat:bg-fuchsia-100">
              <FiDollarSign
                size={28}
                className="transition-transform duration-500 group-hover/stat:-translate-y-1"
              />
            </div>
            <h2 className="mt-8 text-5xl font-black text-slate-900 transition-colors duration-300 group-hover/stat:text-fuchsia-700">
              ₹{totalRevenue.toLocaleString()}
            </h2>
            <p className="mt-3 font-bold text-slate-400">Inventory Value</p>
          </div>
        </div>

        <div className="mt-16 rounded-[40px] bg-white p-8 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.1)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.2)] hover:ring-violet-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                Inventory
              </p>
              <h2 className="mt-3 text-4xl font-black text-slate-900">
                Your Products
              </h2>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="group/empty mt-10 rounded-[40px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-20 text-center transition-all duration-500 hover:border-violet-300 hover:bg-violet-50/50">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-violet-400 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.15)] transition-transform duration-500 group-hover/empty:-translate-y-2 group-hover/empty:scale-110 group-hover/empty:text-violet-600 group-hover/empty:shadow-[0_10px_30px_-10px_rgba(124,58,237,0.3)]">
                <FiPackage
                  size={40}
                  className="transition-transform duration-500 group-hover/empty:rotate-12"
                />
              </div>

              <h2 className="mt-8 text-3xl font-black text-slate-900 transition-colors duration-300 group-hover/empty:text-violet-900">
                No Products Yet
              </h2>

              <p className="mt-3 font-medium text-slate-500 transition-colors duration-300">
                Start selling by creating your first handmade product.
              </p>

              <button
                onClick={openCreateModal}
                className="cursor-pointer group/btn relative mt-8 inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:transform-[skew(-13deg)_translateX(150%)]">
                  <div className="w-12 bg-white/30" />
                </div>
                <span className="relative z-10 flex items-center gap-2">
                  <FiPlus size={18} />
                  Create Product
                </span>
              </button>
            </div>
          ) : (
            <div className="mt-10 overflow-x-auto pb-4">
              <table className="w-full min-w-200">
                <thead>
                  <tr className="border-b-2 border-slate-100 text-left">
                    <th className="pb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
                      Product
                    </th>
                    <th className="pb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
                      Category
                    </th>
                    <th className="pb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
                      Price
                    </th>
                    <th className="pb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
                      Stock
                    </th>
                    <th className="pb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                    <th className="pb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="group/row border-b border-slate-50 transition-colors duration-300 hover:bg-violet-50/30"
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
                        {product.category}
                      </td>

                      <td className="py-5 text-lg font-black text-slate-900 transition-colors duration-300 group-hover/row:text-violet-900">
                        ₹{product.price}
                      </td>

                      <td className="py-5 font-medium text-slate-600 transition-colors duration-300 group-hover/row:text-slate-900">
                        {product.stock}
                      </td>

                      <td className="py-5">
                        {product.isApproved ? (
                          <div className="inline-flex rounded-xl bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-600 ring-1 ring-emerald-100 transition-all duration-300 group-hover/row:bg-emerald-100">
                            Approved
                          </div>
                        ) : (
                          <div className="inline-flex rounded-xl bg-pink-50 px-4 py-2 text-xs font-black text-pink-600 ring-1 ring-pink-100 transition-all duration-300 group-hover/row:bg-pink-100">
                            Pending
                          </div>
                        )}
                      </td>

                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(product)}
                            className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-500 ring-1 ring-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-600/30 active:scale-95"
                          >
                            <FiEdit2 size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(product._id)}
                            className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 ring-1 ring-red-100 transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30 active:scale-95"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editProductData={editProductData}
      />
    </div>
  );
};

export default SellerDashboard;
