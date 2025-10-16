import React from 'react';

function SearchBar({ statusFilter, onStatusFilter, searchTerm, onSearch, placeholder, isOpen }) {
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleStatusFilter = (status) => {
    if (onStatusFilter) {
      onStatusFilter(status);
    }
  };

  return (
    <div className="mb-4 sm:mb-6 lg:mb-8 xl:mb-10 relative z-10" style={{ marginLeft: isOpen ? '0rem' : '0', transition: 'margin-left 0.3s ease-in-out' }}>
      <div className="relative max-w-4xl xl:max-w-6xl mx-auto">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 lg:pl-4 xl:pl-6">
          <span className="material-icons text-gray-400 text-sm sm:text-base lg:text-lg xl:text-xl">search</span>
        </span>
        <input
          id="search-departamentos"
          name="search-departamentos"
          className="w-full pl-8 sm:pl-10 lg:pl-12 xl:pl-16 pr-3 sm:pr-4 lg:pr-6 xl:pr-8 py-2 sm:py-3 lg:py-4 xl:py-5 border border-gray-300 rounded-lg bg-surface-light dark:bg-surface-dark dark:border-gray-600 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base lg:text-lg xl:text-xl"
          placeholder={placeholder || "Buscar..."}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      {/* Status Filter Tags */}
      <div className="mt-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleStatusFilter('Habilitado')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full transition-colors ${
              statusFilter === 'Habilitado'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-2 border-green-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Habilitado
          </button>
          <button
            onClick={() => handleStatusFilter('Deshabilitado')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full transition-colors ${
              statusFilter === 'Deshabilitado'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-2 border-red-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Deshabilitado
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
