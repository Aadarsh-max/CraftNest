import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import Loader from "../../components/comman/Loader";

import {
  fetchWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";

import { addToCart } from "../../redux/slices/cartSlice";

import {
  showErrorToast,
  showSuccessToast,
} from "../../components/others/Toast";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlist, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  const handleRemove = async (productId) => {
    try {
      await dispatch(removeFromWishlist(productId)).unwrap();

      showSuccessToast("Removed from wishlist");
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await dispatch(
        addToCart({
          productId,
          quantity: 1,
        }),
      ).unwrap();

      showSuccessToast("Added to cart");
    } catch (error) {
      showErrorToast(error);
    }
  };

  if (loading && !wishlist) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Saved Collection
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight text-gray-900">
            Your Wishlist
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-500">
            Save your favorite handmade products and revisit them anytime.
          </p>
        </div>

        {!wishlist?.products?.length ? (
          <div className="mt-16 rounded-[40px] bg-white py-24 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-red-500">
              <FiHeart size={36} />
            </div>

            <h2 className="mt-8 text-4xl font-black text-gray-900">
              Wishlist Is Empty
            </h2>

            <p className="mt-4 text-gray-500">
              Save products you love to see them here later.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex rounded-2xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {wishlist.products.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-4xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="h-72 w-full object-cover"
                  />

                  <button
                    onClick={() => handleRemove(product._id)}
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white shadow-lg"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {product.category}
                      </p>

                      <Link to={`/product/${product._id}`}>
                        <h2 className="mt-2 text-2xl font-black text-gray-900 transition hover:text-gray-600">
                          {product.name}
                        </h2>
                      </Link>
                    </div>

                    <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                      ₹{product.price}
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-2 leading-7 text-gray-500">
                    {product.description}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-black py-4 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <FiShoppingCart />
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
