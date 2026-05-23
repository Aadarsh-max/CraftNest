import { FiStar } from "react-icons/fi";

const StarRating = ({ rating = 0, totalReviews, size = 18 }) => {
  return (
    <div className="group/rating inline-flex items-center gap-3 rounded-full bg-slate-50 px-4 py-2 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-50 hover:ring-violet-100">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className={`transition-all duration-300 ${
              rating >= star
                ? "text-yellow-400"
                : "text-slate-300 group-hover/rating:text-slate-400"
            }`}
          >
            <FiStar
              size={size}
              className={`transition-transform duration-300 ${rating >= star ? "fill-yellow-400" : ""} group-hover/rating:scale-110`}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
        <span className="text-sm font-black text-slate-900 transition-colors duration-300 group-hover/rating:text-violet-700">
          {rating.toFixed(1)}
        </span>

        {totalReviews !== undefined && (
          <span className="text-xs font-bold text-slate-400 transition-colors duration-300 group-hover/rating:text-slate-500">
            ({totalReviews})
          </span>
        )}
      </div>
    </div>
  );
};

export default StarRating;
