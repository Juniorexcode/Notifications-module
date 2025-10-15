import React, { useState } from 'react';

function Pagination({ currentPage, totalPages, onPageChange, onPageSizeChange, pageSize }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const options = [10, 25, 50, 100];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSizeChange = (newSize) => {
    onPageSizeChange(newSize);
    setIsExpanded(false);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="px-2 sm:px-3 lg:px-3 xl:px-4 2xl:px-6 pt-0.5 pr-2 pb-0 pl-2 sm:pt-1 sm:pr-3 sm:pb-0 sm:pl-3 lg:pt-1 lg:pr-3 lg:pb-0 lg:pl-3 xl:pt-2 xl:pr-4 xl:pb-0 xl:pl-4 2xl:pt-3 2xl:pr-6 2xl:pb-0.5 2xl:pl-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
      <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-text-light dark:text-text-dark">
        <span className="whitespace-nowrap">Registros por páginas:</span>
        <div className="flex items-center">
          <button
            onClick={toggleExpansion}
            className="flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 text-xs sm:text-sm transition-all duration-300"
          >
            <span>{pageSize}</span>
            <span className={`material-icons text-xs sm:text-sm ml-1 transition-transform duration-300 ${isExpanded ? '-rotate-90' : ''}`}>arrow_drop_down</span>
          </button>

          {/* Expanded options next to the button */}
          <div className={`flex items-center space-x-2 sm:space-x-4 ml-2 transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
            {options.map((option, index) => {
              const delay = isExpanded ? index * 100 : (options.length - 1 - index) * 100;
              return (
                <button
                  key={option}
                  onClick={() => handlePageSizeChange(option)}
                  className={`px-3 sm:px-4 py-1 sm:py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 text-xs sm:text-sm transition-all duration-300 transform ${isExpanded ? 'translate-x-0' : '-translate-x-4'}`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
        >
          <span className="material-icons text-xs sm:text-sm">chevron_left</span>
        </button>
        <div className="text-xs sm:text-sm text-text-light dark:text-text-dark whitespace-nowrap">
          Página {currentPage} de {totalPages}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
        >
          <span className="material-icons text-xs sm:text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
