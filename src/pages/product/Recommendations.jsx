import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiZap } from "react-icons/fi";
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
    <div className="min-h-screen bg-white px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl animate-[fadeIn_0.8s_ease-out]">
        <div className="group/header rounded-[40px] bg-white p-10 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] hover:ring-violet-100">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="inline-flex cursor-default items-center gap-3 rounded-full bg-linear-to-r from-violet-600 to-pink-500 px-5 py-3 text-sm font-black text-white shadow-[0_4px_15px_-3px_rgba(124,58,237,0.4)] transition-transform duration-300 hover:-translate-y-1">
                <FiZap className="animate-[pulse_2s_infinite]" size={18} />
                AI Powered
              </div>

              <h1 className="mt-6 bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-5xl font-black tracking-tight text-transparent transition-transform duration-500 group-hover/header:scale-[1.01] origin-left">
                Personalized For You
              </h1>

              <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-500 transition-colors duration-300">
                Discover handmade products curated by AI using your mood,
                region, and shopping preferences.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:max-w-md lg:justify-end">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`cursor-pointer rounded-2xl px-6 py-3 text-sm font-bold capitalize transition-all duration-300 ease-out active:scale-95 ${
                    selectedMood === mood
                      ? "bg-linear-to-r from-violet-600 to-pink-500 text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] -translate-y-1"
                      : "bg-violet-50 text-violet-600 ring-1 ring-violet-100 hover:-translate-y-1 hover:bg-violet-100 hover:shadow-md"
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-center justify-between">
            <div className="group/title">
              <h2 className="text-4xl font-black text-slate-900 transition-colors duration-300 group-hover/title:text-violet-900">
                Recommended Products
              </h2>

              <p className="mt-3 font-medium text-slate-500 transition-colors duration-300">
                AI selected products based on your current mood.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="mt-20 flex justify-center">
              <Loader />
            </div>
          ) : recommendations?.length === 0 ? (
            <div className="group/empty mt-16 cursor-pointer rounded-[40px] border-2 border-dashed border-violet-100 bg-violet-50/30 py-24 text-center transition-all duration-500 hover:border-violet-300 hover:bg-violet-50/50">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-violet-400 shadow-[0_4px_20px_-5px_rgba(124,58,237,0.15)] transition-transform duration-500 group-hover/empty:-translate-y-2 group-hover/empty:scale-110 group-hover/empty:text-violet-600 group-hover/empty:shadow-[0_10px_30px_-10px_rgba(124,58,237,0.3)]">
                <FiZap
                  size={40}
                  className="transition-transform duration-500 group-hover/empty:rotate-12"
                />
              </div>

              <h2 className="mt-8 text-4xl font-black text-slate-900 transition-colors duration-300 group-hover/empty:text-violet-900">
                No Recommendations Found
              </h2>

              <p className="mt-4 font-medium text-slate-500 transition-colors duration-300">
                Try selecting another mood or explore the main collection.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((product, index) => (
                <div
                  key={product._id}
                  className="animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 100}ms`}}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
