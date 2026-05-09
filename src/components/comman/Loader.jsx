const Loader = ({ fullScreen = true }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-20"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
        </div>

        <div className="space-y-1 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Loading
          </h2>

          <p className="text-sm text-gray-500">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;