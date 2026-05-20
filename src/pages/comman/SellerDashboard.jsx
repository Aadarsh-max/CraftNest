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

import Loader from "../../components/others/Loader";

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
    <div className="min-h-screen bg-gray-50 px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Seller Dashboard
            </p>

            <h1 className="mt-3 text-5xl font-black tracking-tight text-gray-900">
              Manage Your Craft Store
            </h1>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-3 rounded-2xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <FiPlus />
            Add Product
          </button>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-4xl bg-white p-8 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
              <FiBox size={28} />
            </div>

            <h2 className="mt-8 text-5xl font-black text-gray-900">
              {products.length}
            </h2>

            <p className="mt-3 text-gray-500">Total Products</p>
          </div>

          <div className="rounded-4xl bg-white p-8 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <FiCheckCircle size={28} />
            </div>

            <h2 className="mt-8 text-5xl font-black text-gray-900">
              {approvedProducts}
            </h2>

            <p className="mt-3 text-gray-500">Approved Products</p>
          </div>

          <div className="rounded-4xl bg-white p-8 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
              <FiXCircle size={28} />
            </div>

            <h2 className="mt-8 text-5xl font-black text-gray-900">
              {pendingProducts}
            </h2>

            <p className="mt-3 text-gray-500">Pending Approval</p>
          </div>

          <div className="rounded-4xl bg-white p-8 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <FiDollarSign size={28} />
            </div>

            <h2 className="mt-8 text-5xl font-black text-gray-900">
              ₹{totalRevenue.toLocaleString()}
            </h2>

            <p className="mt-3 text-gray-500">Inventory Value</p>
          </div>
        </div>

        <div className="mt-14 rounded-[40px] bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Inventory
              </p>

              <h2 className="mt-3 text-4xl font-black text-gray-900">
                Your Products
              </h2>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="mt-10 rounded-4xl border border-dashed border-gray-200 py-20 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                <FiPackage size={40} />
              </div>

              <h2 className="mt-8 text-3xl font-black text-gray-900">
                No Products Yet
              </h2>

              <p className="mt-3 text-gray-500">
                Start selling by creating your first handmade product.
              </p>

              <button
                onClick={openCreateModal}
                className="mt-8 rounded-2xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Create Product
              </button>
            </div>
          ) : (
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-250">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="pb-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Product
                    </th>

                    <th className="pb-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Category
                    </th>

                    <th className="pb-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Price
                    </th>

                    <th className="pb-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Stock
                    </th>

                    <th className="pb-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Status
                    </th>

                    <th className="pb-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b border-gray-100">
                      <td className="py-6">
                        <div className="flex items-center gap-5">
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
                              {product.region}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-6 text-gray-600">{product.category}</td>

                      <td className="py-6 text-lg font-bold text-gray-900">
                        ₹{product.price}
                      </td>

                      <td className="py-6 text-gray-600">{product.stock}</td>

                      <td className="py-6">
                        {product.isApproved ? (
                          <div className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                            Approved
                          </div>
                        ) : (
                          <div className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                            Pending
                          </div>
                        )}
                      </td>

                      <td className="py-6">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(product)}
                            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 transition hover:bg-black hover:text-white"
                          >
                            <FiEdit2 />
                          </button>

                          <button
                            onClick={() => handleDelete(product._id)}
                            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-600 transition hover:bg-red-500 hover:text-white"
                          >
                            <FiTrash2 />
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
