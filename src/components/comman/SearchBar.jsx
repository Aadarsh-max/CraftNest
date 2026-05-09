import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = "Search handcrafted products...",
}) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-gray-400 focus-within:shadow-md">
        <FiSearch size={18} className="text-gray-400" />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent px-3 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />

        {value && (
          <button
            onClick={onClear}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-black"
          >
            <FiX size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;