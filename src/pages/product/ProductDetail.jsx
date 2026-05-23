import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FiCheckCircle,
  FiMapPin,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";

import Loader from "../../components/comman/Loader";
import MoodBadge from "../../components/others/MoodBadge";
import { fetchSingleProduct } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { createReview, fetchReviews } from "../../redux/slices/reviewSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/others/Toast";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);
  const { reviews } = useSelector((state) => state.review);
  const { user } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState("");
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    dispatch(fetchSingleProduct(id));

    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleAddToCart = async () => {
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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        createReview({
          productId: product._id,
          reviewData,
        }),
      ).unwrap();

      showSuccessToast("Review submitted successfully");

      setReviewData({
        rating: 5,
        comment: "",
      });

      dispatch(fetchReviews(product._id));
    } catch (error) {
      showErrorToast(error);
    }
  };

  if (loading || !product) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl animate-[fadeIn_0.8s_ease-out]">
        <div className="grid gap-14 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="group/main-img overflow-hidden rounded-[40px] bg-white shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 ease-out hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] hover:ring-violet-100">
              <img
                src={selectedImage}
                alt={product.name}
                className="h-162.5 w-full object-cover transition-transform duration-700 ease-out group-hover/main-img:scale-105"
              />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {product.images?.map((image) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`cursor-pointer group/thumb relative shrink-0 overflow-hidden rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 ${
                    selectedImage === image
                      ? "shadow-[0_0_0_3px_rgba(124,58,237,1)]"
                      : "shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:ring-violet-200"
                  }`}
                >
                  <img
                    src={image}
                    alt="preview"
                    className={`h-28 w-28 object-cover transition-transform duration-500 group-hover/thumb:scale-110 ${
                      selectedImage !== image &&
                      "opacity-70 group-hover/thumb:opacity-100"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="rounded-[40px] bg-white p-8 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.2)] hover:ring-violet-100">
              <div className="flex flex-wrap items-center gap-3">
                {product.moodTags?.map((mood) => (
                  <div
                    key={mood}
                    className="cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <MoodBadge mood={mood} />
                  </div>
                ))}
              </div>

              <h1 className="mt-6 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-5xl font-black tracking-tight text-transparent transition-transform duration-500 hover:scale-[1.01] origin-left">
                {product.name}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div className="cursor-pointer flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-sm font-black text-yellow-600 shadow-sm ring-1 ring-yellow-100 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-100 hover:shadow-md">
                  <FiStar className="fill-yellow-400" />
                  {product.ratings?.toFixed(1) || 0}
                  <span className="font-bold text-yellow-600/60">
                    ({product.numReviews || 0} reviews)
                  </span>
                </div>

                <div className="cursor-pointer flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors duration-300 hover:text-violet-600">
                  <FiMapPin className="text-violet-400" />
                  {product.region || "Local Artisan"}
                </div>

                {product.isApproved && (
                  <div className="cursor-pointer flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-600 shadow-sm ring-1 ring-emerald-100 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-100 hover:shadow-md">
                    <FiCheckCircle />
                    Verified Product
                  </div>
                )}
              </div>

              <h2 className="mt-8 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-5xl font-black text-transparent">
                ₹{product.price}
              </h2>

              <p className="mt-8 text-lg font-medium leading-relaxed text-slate-500">
                {product.description}
              </p>

              <div className="mt-10 flex items-center justify-between rounded-3xl bg-slate-50/50 px-6 py-5 ring-1 ring-slate-100 transition-colors duration-300 hover:bg-violet-50/30 hover:ring-violet-100">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Stock Available
                  </p>
                  <h3 className="mt-2 text-3xl font-black text-slate-900 transition-colors duration-300 hover:text-violet-900">
                    {product.stock}
                  </h3>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="cursor-pointer group/cart relative overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97] disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-500 disabled:shadow-none disabled:hover:translate-y-0"
                >
                  {!product.stock === 0 && (
                    <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/cart:duration-1000 group-hover/cart:transform-[skew(-13deg)_translateX(150%)]">
                      <div className="w-12 bg-white/30" />
                    </div>
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    <FiShoppingCart
                      className={
                        product.stock > 0
                          ? "transition-transform duration-300 group-hover/cart:scale-110 group-hover/cart:-rotate-12"
                          : ""
                      }
                    />
                    {product.stock > 0 ? "Add To Cart" : "Out Of Stock"}
                  </span>
                </button>
              </div>

              {product.seller && (
                <div className="group/seller mt-10 rounded-[30px] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(124,58,237,0.15)] hover:ring-1 hover:ring-violet-100">
                  <p className="text-sm font-bold uppercase tracking-wider text-violet-500">
                    Artisan
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 transition-colors duration-300 group-hover/seller:text-violet-700">
                        {product.seller?.name}
                      </h3>
                      <p className="mt-2 font-medium text-slate-500">
                        {product.seller?.region}
                      </p>
                    </div>

                    <Link
                      to={`/artisan/${product.seller?._id}`}
                      className="cursor-pointer group/profile flex items-center gap-2 rounded-2xl bg-violet-50 px-6 py-3 text-sm font-black text-violet-600 ring-1 ring-violet-100 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-600/30"
                    >
                      View Profile
                      <FiArrowRight className="transition-transform duration-300 group-hover/profile:translate-x-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 xl:grid-cols-[1fr_0.7fr]">
          <div className="rounded-[40px] bg-white p-8 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
                Customer Reviews
              </p>
              <h2 className="mt-3 text-4xl font-black text-slate-900 transition-colors duration-300">
                Product Feedback
              </h2>
            </div>

            <div className="mt-10 space-y-6">
              {reviews.length === 0 && (
                <div className="group/empty rounded-[30px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-16 text-center transition-all duration-500 hover:border-violet-300 hover:bg-violet-50/50">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-violet-400 shadow-sm transition-transform duration-500 group-hover/empty:scale-110 group-hover/empty:text-violet-600">
                    <FiStar size={28} />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-slate-900 transition-colors duration-300 group-hover/empty:text-violet-900">
                    No Reviews Yet
                  </h3>
                  <p className="mt-3 font-medium text-slate-500">
                    Be the first to review this product.
                  </p>
                </div>
              )}

              {reviews.map((review, index) => (
                <div
                  key={review._id}
                  className="group/review rounded-[30px] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-500 animate-[fadeInUp_0.6s_ease-out_forwards] hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(124,58,237,0.15)] hover:ring-1 hover:ring-violet-100"
                  style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 transition-colors duration-300 group-hover/review:text-violet-700">
                      {review.user?.name}
                    </h3>

                    <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-sm font-black text-yellow-600 ring-1 ring-yellow-100 transition-transform duration-300 group-hover/review:scale-105">
                      <FiStar className="fill-yellow-400" />
                      {review.rating}
                    </div>
                  </div>

                  <p className="mt-5 font-medium leading-relaxed text-slate-500 transition-colors duration-300 group-hover/review:text-slate-700">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky top-10 h-fit rounded-[40px] bg-white p-8 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.2)] hover:ring-violet-100">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors duration-300">
                Share Experience
              </p>
              <h2 className="mt-3 text-4xl font-black text-slate-900 transition-colors duration-300">
                Write Review
              </h2>
            </div>

            {!user ? (
              <div className="mt-10 rounded-[30px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-12 text-center transition-all duration-500 hover:border-violet-300 hover:bg-violet-50/50">
                <p className="font-bold text-violet-600">
                  Please login to write a review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="mt-10 space-y-7">
                <div className="group relative">
                  <label className="mb-3 block text-sm font-bold text-slate-700 transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:text-violet-600">
                    Rating
                  </label>
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
                    <select
                      value={reviewData.rating}
                      onChange={(e) =>
                        setReviewData((prev) => ({
                          ...prev,
                          rating: Number(e.target.value),
                        }))
                      }
                      className="peer w-full cursor-pointer appearance-none bg-transparent px-5 py-4 text-sm font-bold text-slate-900 outline-none"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400 group-focus-within:text-violet-600">
                      <svg
                        className="h-4 w-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
                  </div>
                </div>

                <div className="group relative">
                  <label className="mb-3 block text-sm font-bold text-slate-700 transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:text-violet-600">
                    Comment
                  </label>
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
                    <textarea
                      rows="6"
                      value={reviewData.comment}
                      onChange={(e) =>
                        setReviewData((prev) => ({
                          ...prev,
                          comment: e.target.value,
                        }))
                      }
                      placeholder="Share your experience..."
                      className="peer w-full resize-none bg-transparent px-5 py-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none"
                      required
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="cursor-pointer group/submit relative w-full overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_15px_25px_-8px_rgba(236,72,153,0.6)] active:translate-y-1 active:scale-[0.97]"
                >
                  <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-150%)] group-hover/submit:duration-1000 group-hover/submit:transform-[skew(-13deg)_translateX(150%)]">
                    <div className="w-12 bg-white/30" />
                  </div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Submit Review
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
