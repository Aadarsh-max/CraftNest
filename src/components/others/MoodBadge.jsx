const moodStyles = {
  gifting: "bg-pink-100 text-pink-700",
  festive: "bg-orange-100 text-orange-700",
  minimal: "bg-gray-100 text-gray-700",
  rustic: "bg-amber-100 text-amber-700",
  luxury: "bg-purple-100 text-purple-700",
  modern: "bg-sky-100 text-sky-700",
  vintage: "bg-yellow-100 text-yellow-700",
  artistic: "bg-emerald-100 text-emerald-700",
};

const MoodBadge = ({ mood }) => {
  const normalizedMood = mood?.toLowerCase();

  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold capitalize tracking-wide ${
        moodStyles[normalizedMood] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {mood}
    </span>
  );
};

export default MoodBadge;