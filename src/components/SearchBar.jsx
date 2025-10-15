import React from 'react';

function SearchBar({ onSearch, statusFilter, onStatusFilter }) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
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
    <div className="mb-4 sm:mb-6 lg:mb-8">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 lg:pl-4">
          <span className="material-icons text-gray-400 text-sm sm:text-base lg:text-lg">search</span>
        </span>
        <input
          className="w-full pl-8 sm:pl-10 lg:pl-12 pr-3 sm:pr-4 lg:pr-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg bg-surface-light dark:bg-surface-dark dark:border-gray-600 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base lg:text-lg"
          placeholder="Buscar departamentos..."
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      {/* Status Filter Tags */}
      <div className="mt-2">
        <div className="flex gap-2">
          <button
            onClick={() => handleStatusFilter('Habilitado')}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
              statusFilter === 'Habilitado'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-2 border-green-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Habilitado
          </button>
          <button
            onClick={() => handleStatusFilter('Deshabilitado')}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
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
