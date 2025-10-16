function ModulosHeader({ onAddClick }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-4">
      <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-text-light dark:text-text-dark leading-tight">
        Módulos
      </h1>
      <button
        onClick={onAddClick}
        className="bg-accent-green text-white font-semibold py-2 px-3 sm:py-3 sm:px-6 lg:py-4 lg:px-8 rounded-lg shadow-md hover:bg-green-400 active:bg-green-600 transition-all duration-300 flex items-center w-full sm:w-auto justify-center text-sm sm:text-base lg:text-lg"
      >
        <span className="material-icons mr-1 sm:mr-2 text-sm sm:text-base lg:text-lg">add</span>
        Agregar
      </button>
    </div>
  );
}

export default ModulosHeader;
