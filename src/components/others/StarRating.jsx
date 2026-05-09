import { FiStar } from "react-icons/fi";

const StarRating = ({
  rating = 0,
  totalReviews,
  size = 18,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className={`transition ${
              rating >= star
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          >
            <FiStar
              size={size}
              className={rating >= star ? "fill-yellow-400" : ""}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold text-gray-800">
          {rating.toFixed(1)}
        </span>

        {totalReviews && (
          <span className="text-sm text-gray-400">
            ({totalReviews} reviews)
          </span>
        )}
      </div>
    </div>
  );
};

export default StarRating;