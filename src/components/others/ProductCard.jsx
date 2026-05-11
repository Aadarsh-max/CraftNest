import { Link } from "react-router-dom";

import { FiHeart, FiMapPin, FiShoppingCart, FiStar } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import MoodBadge from "../others/MoodBadge";

import { addToCart } from "../../redux/slices/cartSlice";

import { showErrorToast, showSuccessToast } from "../others/Toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

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

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={product?.images?.[0]}
          alt={product?.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md backdrop-blur transition hover:bg-black hover:text-white">
          <FiHeart size={18} />
        </button>

        {product?.moodTags?.[0] && (
          <div className="absolute left-4 top-4">
            <MoodBadge mood={product.moodTags[0]} />
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {product?.category}
            </p>

            <Link to={`/product/${product?._id}`}>
              <h3 className="mt-1 line-clamp-1 text-lg font-bold text-gray-900 transition hover:text-gray-600">
                {product?.name}
              </h3>
            </Link>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-sm font-semibold text-yellow-700">
            <FiStar size={14} className="fill-yellow-400" />

            {product?.ratings || 0}
          </div>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-gray-500">
          {product?.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiMapPin size={15} />

          <span>{product?.region || "Local Artisan"}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xs text-gray-400">Starting From</p>

            <h2 className="text-2xl font-black text-gray-900">
              ₹{product?.price}
            </h2>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <FiShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
