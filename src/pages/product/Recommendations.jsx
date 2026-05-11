import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSparkles } from "react-icons/fi";
import Loader from "../../components/comman/Loader";
import ProductCard from "../../components/others/ProductCard";
import { fetchRecommendations } from "../../redux/slices/aiSlice";

const moods = [
  "minimal",
  "rustic",
  "festive",
  "luxury",
  "traditional",
  "modern",
];

const Recommendations = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { recommendations, loading } = useSelector((state) => state.ai);
  const [selectedMood, setSelectedMood] = useState("minimal");

  useEffect(() => {
    if (user?._id) {
      dispatch(
        fetchRecommendations({
          userId: user._id,
          mood: selectedMood,
        }),
      );
    }
  }, [dispatch, user, selectedMood]);

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[40px] bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white">
                <FiSparkles />
                AI Powered
              </div>

              <h1 className="mt-6 text-5xl font-black tracking-tight text-gray-900">
                Personalized For You
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-500">
                Discover handmade products curated by AI using your mood,
                region, and shopping preferences.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold capitalize transition ${
                    selectedMood === mood
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-black text-gray-900">
                Recommended Products
              </h2>

              <p className="mt-3 text-gray-500">
                AI selected products based on your current mood.
              </p>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : recommendations?.length === 0 ? (
            <div className="mt-16 rounded-[40px] bg-white py-24 text-center shadow-sm">
              <h2 className="text-4xl font-black text-gray-900">
                No Recommendations Found
              </h2>

              <p className="mt-4 text-gray-500">
                Try another mood or explore more products.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
