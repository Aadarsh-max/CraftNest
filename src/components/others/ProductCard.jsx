import { Link } from "react-router-dom";
import {
  FiHeart,
  FiMapPin,
  FiShoppingCart,
  FiStar,
  FiPackage,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import MoodBadge from "./MoodBadge";
import { addToCart } from "../../redux/slices/cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";

import { showErrorToast, showSuccessToast } from "../others/Toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { wishlist } = useSelector((state) => state.wishlist);

  const isWishlisted = wishlist?.products?.some(
    (item) => item._id === product._id,
  );

  const handleAddToCart = async () => {
    if (!user) {
      return showErrorToast("Please login to add items to cart");
    }

    try {
      await dispatch(
        addToCart({
          productId: product._id,
          quantity: 1,
        }),
      ).unwrap();

      showSuccessToast("Product added to cart");
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      return showErrorToast("Please login first");
    }

    try {
      if (isWishlisted) {
        await dispatch(removeFromWishlist(product._id)).unwrap();

        showSuccessToast("Removed from wishlist");
      } else {
        await dispatch(addToWishlist(product._id)).unwrap();

        showSuccessToast("Added to wishlist");
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <div className="group/card relative flex flex-col overflow-hidden rounded-[36px] bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.2)] hover:ring-violet-100">
      <div className="relative overflow-hidden">
        {product?.images?.[0] ? (
          <img
            src={product?.images?.[0]}
            alt={product?.name}
            className="h-72 w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
          />
        ) : (
          <div className="flex h-72 w-full items-center justify-center bg-violet-50 text-violet-300 transition-transform duration-700 ease-out group-hover/card:scale-105">
            <FiPackage size={48} />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"></div>

        <button
          onClick={handleWishlist}
          className={`cursor-pointer absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 ${
            isWishlisted
              ? "bg-pink-500 text-white shadow-pink-500/40 ring-1 ring-pink-400"
              : "bg-white/90 text-slate-400 ring-1 ring-white/50 hover:bg-pink-50 hover:text-pink-500"
          }`}
        >
          <FiHeart
            size={18}
            className={
              isWishlisted
                ? "fill-white"
                : "transition-transform duration-300 hover:scale-110"
            }
          />
        </button>

        {product?.moodTags?.[0] && (
          <div className="absolute left-5 top-5 transition-transform duration-300 hover:-translate-y-0.5">
            <MoodBadge mood={product.moodTags[0]} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-violet-500 transition-colors duration-300 group-hover/card:text-pink-500">
              {product?.category}
            </p>

            <Link to={`/product/${product?._id}`}>
              <h3 className="cursor-pointer mt-2 line-clamp-1 text-xl font-black text-slate-900 transition-colors duration-300 hover:text-violet-600 group-hover/card:text-violet-700">
                {product?.name}
              </h3>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-black text-yellow-600 ring-1 ring-yellow-100 transition-transform duration-300 group-hover/card:scale-105">
            <FiStar size={14} className="fill-yellow-400" />
            {product?.ratings?.toFixed(1) || "0.0"}
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500 transition-colors duration-300 group-hover/card:text-slate-600">
          {product?.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-400 transition-colors duration-300 group-hover/card:text-violet-500">
          <FiMapPin
            size={16}
            className="text-violet-400 transition-transform duration-300 group-hover/card:-translate-y-0.5"
          />
          <span className="truncate">{product?.region || "Local Artisan"}</span>
        </div>

        <div className="mt-6 flex items-end justify-between border-t border-slate-50 pt-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors duration-300 group-hover/card:text-violet-400">
              Starting From
            </p>
            <h2 className="mt-1 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-3xl font-black text-transparent transition-transform duration-500 group-hover/card:scale-105 origin-left">
              ₹{product?.price}
            </h2>
          </div>

          <button
            onClick={handleAddToCart}
            className="cursor-pointer group/cartbtn relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
          >
            <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/cartbtn:duration-1000 group-hover/cartbtn:transform-[skew(-13deg)_translateX(150%)]">
              <div className="w-12 bg-white/30" />
            </div>
            <span className="relative z-10 flex items-center gap-2">
              <FiShoppingCart
                className="transition-transform duration-300 group-hover/cartbtn:-rotate-12"
                size={16}
              />
              Add
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
