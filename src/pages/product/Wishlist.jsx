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
  <div className="min-h-screen bg-white px-5 py-10 lg:px-10">
    <div className="mx-auto max-w-7xl animate-[fadeIn_0.8s_ease-out]">
      <div className="group">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
          Saved Collection
        </p>

        <h1 className="mt-3 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-5xl font-black tracking-tight text-transparent transition-transform duration-500 group-hover:scale-[1.01] origin-left">
          Your Wishlist
        </h1>

        <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-500 transition-colors duration-300 hover:text-slate-700">
          Save your favorite handmade products and revisit them anytime.
        </p>
      </div>

      {!wishlist?.products?.length ? (
        <div className="group/empty mt-16 cursor-pointer rounded-[40px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-24 text-center transition-all duration-500 hover:border-violet-300 hover:bg-violet-50/50">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-pink-500 shadow-[0_4px_20px_-5px_rgba(236,72,153,0.15)] transition-transform duration-500 group-hover/empty:-translate-y-2 group-hover/empty:scale-110 group-hover/empty:text-pink-600 group-hover/empty:shadow-[0_10px_30px_-10px_rgba(236,72,153,0.3)]">
            <FiHeart size={40} className="transition-transform duration-500 group-hover/empty:scale-110" />
          </div>

          <h2 className="mt-8 text-4xl font-black text-slate-900 transition-colors duration-300 group-hover/empty:text-violet-900">
            Wishlist Is Empty
          </h2>

          <p className="mt-4 font-medium text-slate-500 transition-colors duration-300">
            Save products you love to see them here later.
          </p>

          <Link
            to="/products"
            className="cursor-pointer group/btn relative mt-8 inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-10 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
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
        <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {wishlist.products.map((product, index) => (
            <div
              key={product._id}
              className="group/card relative flex flex-col overflow-hidden rounded-[36px] bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 transition-all duration-500 animate-[fadeInUp_0.6s_ease-out_forwards] hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.2)] hover:ring-violet-100"
              style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-72 w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"></div>

                <button
                  onClick={() => handleRemove(product._id)}
                  className="cursor-pointer absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white hover:shadow-red-500/30 active:scale-95"
                >
                  <FiTrash2 size={20} className="transition-transform duration-300 hover:rotate-12" />
                </button>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-violet-500">
                      {product.category}
                    </p>

                    <Link to={`/product/${product._id}`}>
                      <h2 className="cursor-pointer mt-2 text-2xl font-black text-slate-900 transition-colors duration-300 hover:text-violet-600">
                        {product.name}
                      </h2>
                    </Link>
                  </div>

                  <div className="rounded-xl bg-violet-50 px-4 py-2 text-sm font-black text-violet-700 ring-1 ring-violet-100">
                    ₹{product.price}
                  </div>
                </div>

                <p className="mt-5 line-clamp-2 flex-1 font-medium leading-relaxed text-slate-500">
                  {product.description}
                </p>

                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="cursor-pointer group/cart relative mt-8 flex w-full overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
                >
                  <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/cart:duration-1000 group-hover/cart:transform-[skew(-13deg)_translateX(150%)]">
                    <div className="w-12 bg-white/30" />
                  </div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FiShoppingCart className="transition-transform duration-300 group-hover/cart:scale-110 group-hover/cart:-rotate-12" />
                    Add To Cart
                  </span>
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
