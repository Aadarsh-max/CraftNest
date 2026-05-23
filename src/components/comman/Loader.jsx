const Loader = ({ fullScreen = true }) => {
  return (
    <div
      className={`flex items-center justify-center bg-white ${
        fullScreen ? "min-h-screen" : "py-20"
      }`}
    >
      <div className="flex flex-col items-center gap-6 animate-[fadeIn_0.5s_ease-out]">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-violet-50"></div>

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-r-violet-600 border-t-violet-600 shadow-[0_0_15px_rgba(124,58,237,0.2)]"></div>

          <div className="absolute inset-2 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-4 border-transparent border-l-pink-500 border-t-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.2)]"></div>

          <div className="h-2 w-2 animate-ping rounded-full bg-violet-600"></div>
        </div>

        <div className="space-y-2 text-center">
          <h2 className="animate-pulse bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-xl font-black tracking-widest text-transparent">
            LOADING
          </h2>

          <p className="text-sm font-bold tracking-wide text-slate-400">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
