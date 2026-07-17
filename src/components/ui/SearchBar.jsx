import { Icon } from '@iconify/react';



export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search here',
  className = '',
}) {
  return (
    <div
      className={`searchbar relative w-full shrink-0 ${className}`}
    >
      <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Icon
          icon="mynaui:search"
          className="w-[1.5em] h-[1.5em] text-gray-400"
        />
      </span>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-2 py-2  bg-white rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none shadow-lg focus:border-[#C4A46E] focus:ring-1 focus:ring-[#C4A46E] transition-all"
      />
    </div>
  );
}