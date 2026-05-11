import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FiCheckCircle,
  FiMapPin,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";

import Loader from '../../components/comman/Loader'
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
    <div className="min-h-screen bg-gray-50 px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-[40px] bg-white shadow-sm">
              <img
                src={selectedImage}
                alt={product.name}
                className="h-162.5 w-full object-cover"
              />
            </div>

            <div className="mt-5 flex gap-4 overflow-x-auto">
              {product.images?.map((image) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`overflow-hidden rounded-3xl border-2 transition ${
                    selectedImage === image
                      ? "border-black"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt="preview"
                    className="h-28 w-28 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="rounded-[40px] bg-white p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                {product.moodTags?.map((mood) => (
                  <MoodBadge key={mood} mood={mood} />
                ))}
              </div>

              <h1 className="mt-6 text-5xl font-black tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">
                  <FiStar className="fill-yellow-400" />

                  {product.ratings?.toFixed(1) || 0}

                  <span className="text-gray-400">
                    ({product.numReviews || 0} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiMapPin />

                  {product.region || "Local Artisan"}
                </div>

                {product.isApproved && (
                  <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    <FiCheckCircle />
                    Verified Product
                  </div>
                )}
              </div>

              <h2 className="mt-8 text-5xl font-black text-gray-900">
                ₹{product.price}
              </h2>

              <p className="mt-8 text-lg leading-8 text-gray-500">
                {product.description}
              </p>

              <div className="mt-10 flex items-center justify-between rounded-3xl bg-gray-50 px-6 py-5">
                <div>
                  <p className="text-sm text-gray-400">Stock Available</p>

                  <h3 className="mt-2 text-2xl font-black text-gray-900">
                    {product.stock}
                  </h3>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex items-center gap-3 rounded-2xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  <FiShoppingCart />

                  {product.stock > 0 ? "Add To Cart" : "Out Of Stock"}
                </button>
              </div>

              {product.seller && (
                <div className="mt-10 rounded-3xl border border-gray-100 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Artisan
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">
                        {product.seller?.name}
                      </h3>

                      <p className="mt-2 text-gray-500">
                        {product.seller?.region}
                      </p>
                    </div>

                    <Link
                      to={`/artisan/${product.seller?._id}`}
                      className="rounded-2xl bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 xl:grid-cols-[1fr_0.7fr]">
          <div className="rounded-[40px] bg-white p-8 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Customer Reviews
              </p>

              <h2 className="mt-3 text-4xl font-black text-gray-900">
                Product Feedback
              </h2>
            </div>

            <div className="mt-10 space-y-6">
              {reviews.length === 0 && (
                <div className="rounded-3xl border border-dashed border-gray-200 py-16 text-center">
                  <h3 className="text-2xl font-black text-gray-900">
                    No Reviews Yet
                  </h3>

                  <p className="mt-3 text-gray-500">
                    Be the first to review this product.
                  </p>
                </div>
              )}

              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-3xl border border-gray-100 p-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      {review.user?.name}
                    </h3>

                    <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">
                      <FiStar className="fill-yellow-400" />

                      {review.rating}
                    </div>
                  </div>

                  <p className="mt-5 leading-7 text-gray-500">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit rounded-[40px] bg-white p-8 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Share Experience
              </p>

              <h2 className="mt-3 text-4xl font-black text-gray-900">
                Write Review
              </h2>
            </div>

            {!user ? (
              <div className="mt-10 rounded-3xl border border-dashed border-gray-200 py-12 text-center">
                <p className="text-gray-500">Please login to write a review.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="mt-10 space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    Rating
                  </label>

                  <select
                    value={reviewData.rating}
                    onChange={(e) =>
                      setReviewData((prev) => ({
                        ...prev,
                        rating: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
                  >
                    <option value={5}>5 Stars</option>

                    <option value={4}>4 Stars</option>

                    <option value={3}>3 Stars</option>

                    <option value={2}>2 Stars</option>

                    <option value={1}>1 Star</option>
                  </select>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    Comment
                  </label>

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
                    className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-black py-4 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Submit Review
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
