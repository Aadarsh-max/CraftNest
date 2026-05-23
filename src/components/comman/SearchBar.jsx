import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = "Search handcrafted products...",
}) => {
  return (
    <div className="group/search relative w-full">
      <div className="relative flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-1.5 transition-all duration-500 ease-out focus-within:border-violet-500 focus-within:bg-violet-50/50 focus-within:shadow-[0_0_20px_rgba(124,58,237,0.1)] focus-within:ring-2 focus-within:ring-violet-500/20 hover:border-violet-300">
        <FiSearch className="text-xl text-slate-400 transition-transform duration-500 ease-out group-focus-within/search:scale-110 group-focus-within/search:text-violet-600" />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="peer w-full bg-transparent px-4 py-3 text-sm font-bold text-slate-900 placeholder-slate-400 outline-none transition-all duration-300"
        />

        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-violet-600 to-pink-500 transition-all duration-500 ease-out peer-focus:w-full"></div>

        {value && (
          <button
            onClick={onClear}
            className="cursor-pointer relative z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 hover:scale-110 hover:bg-pink-50 hover:text-pink-600 active:scale-95"
          >
            <FiX
              size={16}
              className="transition-transform duration-300 hover:rotate-90"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
