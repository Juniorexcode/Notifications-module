import React from 'react';

function PlantillasHeader({ onAddClick }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">Creación de Plantillas</h1>
      <button
        onClick={onAddClick}
        className="bg-accent-green text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 flex items-center"
      >
        <span className="material-icons mr-2">add</span>
        Agregar
      </button>
    </div>
  );
}

export default PlantillasHeader;
