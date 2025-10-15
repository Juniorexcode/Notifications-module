
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoAduanas from "../assets/logoAduanas.png";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [mantenimientosOpen, setMantenimientosOpen] = useState(true);
  const [plantillasOpen, setPlantillasOpen] = useState(true);
  const [configuracionesOpen, setConfiguracionesOpen] = useState(false);

  return (
    <aside
      id="sidebar"
      className={`bg-surface-light dark:bg-surface-dark shadow-lg flex flex-col transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="relative p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        {sidebarOpen && (
          <img
            alt="Logo de Aduanas"
            className="h-10"
            src={logoAduanas}
          />
        )}
        <button
          className={`text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 ${
            sidebarOpen ? "" : "delay-300"
          } ${
            sidebarOpen ? "p-1" : "absolute left-0 top-6 bg-surface-light dark:bg-surface-dark rounded-r-full shadow-lg w-12 h-12 flex items-center justify-center"
          }`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span className={`material-icons ${sidebarOpen ? "text-base" : "text-xl"}`}>
            {sidebarOpen ? "chevron_left" : "chevron_right"}
          </span>
        </button>
      </div>

      <nav className={`flex-1 px-4 py-6 space-y-2 overflow-y-auto ${sidebarOpen ? "" : "hidden"}`}>
        <Link
          to="#"
          className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
        >
          <span className="material-icons">home</span>
          <span className="ml-4 font-medium">Inicio</span>
        </Link>

        <div>
          <button
            onClick={() => setMantenimientosOpen(!mantenimientosOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center">
              <span className="material-icons text-base text-gray-400 dark:text-gray-500 mr-2">build</span>
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Mantenimientos</h3>
            </div>
            <span className="material-icons text-gray-400 dark:text-gray-500">
              {mantenimientosOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
          {mantenimientosOpen && (
            <div className="pl-4 space-y-1 mt-1">
              <Link
                to="#"
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <span className="material-icons">corporate_fare</span>
                <span className="ml-4 font-medium">Instituciones</span>
              </Link>
              <Link
                to="#"
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <span className="material-icons">lan</span>
                <span className="ml-4 font-medium">Áreas</span>
              </Link>
              <Link
                to="#"
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <span className="material-icons">business</span>
                <span className="ml-4 font-medium">Gerencias</span>
              </Link>
              <Link
                to="/departamentos"
                className="flex items-center px-4 py-3 bg-primary/10 text-primary dark:bg-primary/20 dark:text-white rounded-lg transition-colors duration-200"
              >
                <span className="material-icons">groups</span>
                <span className="ml-4 font-bold">Departamentos</span>
              </Link>
              <Link
                to="#"
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <span className="material-icons">dvr</span>
                <span className="ml-4 font-medium">Sistemas</span>
              </Link>
              <Link
                to="#"
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <span className="material-icons">view_module</span>
                <span className="ml-4 font-medium">Módulos</span>
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setPlantillasOpen(!plantillasOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center">
              <span className="material-icons text-base text-gray-400 dark:text-gray-500 mr-2">description</span>
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Plantillas</h3>
            </div>
            <span className="material-icons text-gray-400 dark:text-gray-500">
              {plantillasOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
          {plantillasOpen && (
            <div className="pl-4 space-y-1 mt-1">
              <Link
                to="#"
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <span className="material-icons">add_to_drive</span>
                <span className="ml-4 font-medium">Creación de plantillas</span>
              </Link>
              <Link
                to="#"
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <span className="material-icons">biotech</span>
                <span className="ml-4 font-medium">Prueba de plantillas</span>
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setConfiguracionesOpen(!configuracionesOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center">
              <span className="material-icons text-base text-gray-400 dark:text-gray-500 mr-2">settings</span>
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Configuraciones</h3>
            </div>
            <span className="material-icons text-gray-400 dark:text-gray-500">
              {configuracionesOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
          {configuracionesOpen && (
            <div className="pl-4 space-y-1 mt-1">
              <Link
                to="#"
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
              >
                <span className="material-icons">people</span>
                <span className="ml-4 font-medium">Usuarios</span>
              </Link>
              <Link
                to="#"
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
              >
                <span className="material-icons">monitor</span>
                <span className="ml-4 font-medium">Monitoreo</span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className={`p-4 border-t border-gray-200 dark:border-gray-700 ${sidebarOpen ? "" : "hidden"}`}>
        <Link
          to="/"
          className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
        >
          <span className="material-icons">logout</span>
          <span className="ml-4 font-medium">Cerrar sesión</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
