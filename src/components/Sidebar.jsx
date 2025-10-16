import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoAduanas from "../assets/logoAduanas.png";

function Sidebar({ isOpen, onToggle }) {
  const [mantenimientosOpen, setMantenimientosOpen] = useState(true);
  const [plantillasOpen, setPlantillasOpen] = useState(true);
  const [configuracionesOpen, setConfiguracionesOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/departamentos') {
      setActiveLink('departamentos');
    } else if (path === '/modulos') {
      setActiveLink('modulos');
    } else if (path === '/plantillas') {
      setActiveLink('creacion-plantillas');
    } else {
      setActiveLink('');
    }
  }, [location.pathname]);

  return (
    <div className="fixed left-0 top-0 h-screen z-30">
      <aside
        id="sidebar"
        className={`h-screen w-full md:w-64 bg-surface-light dark:bg-surface-dark shadow-lg flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header con logo */}
        <div className="relative p-6 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <img alt="Logo de Aduanas" className="h-10" src={logoAduanas} />
        </div>

      {/* Menú principal ocupa todo el espacio */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <Link
          to="#"
          className={`flex items-center px-4 py-3 ${activeLink === 'inicio' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-[#646cff] hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-lg transition-colors duration-200`}
          onClick={() => setActiveLink('inicio')}
        >
          <span className={`material-icons ${activeLink === 'inicio' ? '' : 'hover:text-[#646cff]'}`}>home</span>
          <span className={`ml-4 ${activeLink === 'inicio' ? 'font-bold' : 'font-medium'}`}>Inicio</span>
        </Link>

        {/* Mantenimientos */}
        <div>
          <button
            onClick={() => setMantenimientosOpen(!mantenimientosOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center">
              <span className="material-icons text-base text-gray-400 dark:text-gray-500 mr-2">
                build
              </span>
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Mantenimientos
              </h3>
            </div>
            <span className="material-icons text-gray-400 dark:text-gray-500">
              {mantenimientosOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
          {mantenimientosOpen && (
            <div className="pl-4 space-y-1 mt-1">
              <Link to="#" className={`flex items-center px-4 py-3 ${activeLink === 'instituciones' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-[#646cff] hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-lg transition-colors duration-200`} onClick={() => setActiveLink('instituciones')}>
                <span className={`material-icons ${activeLink === 'instituciones' ? '' : 'hover:text-[#646cff]'}`}>corporate_fare</span>
                <span className={`ml-4 ${activeLink === 'instituciones' ? 'font-bold' : 'font-medium'}`}>Instituciones</span>
              </Link>
              <Link to="#" className={`flex items-center px-4 py-3 ${activeLink === 'areas' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-[#646cff] hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-lg transition-colors duration-200`} onClick={() => setActiveLink('areas')}>
                <span className={`material-icons ${activeLink === 'areas' ? '' : 'hover:text-[#646cff]'}`}>lan</span>
                <span className={`ml-4 ${activeLink === 'areas' ? 'font-bold' : 'font-medium'}`}>Áreas</span>
              </Link>
              <Link to="#" className={`flex items-center px-4 py-3 ${activeLink === 'gerencias' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-[#646cff] hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-lg transition-colors duration-200`} onClick={() => setActiveLink('gerencias')}>
                <span className={`material-icons ${activeLink === 'gerencias' ? '' : 'hover:text-[#646cff]'}`}>business</span>
                <span className={`ml-4 ${activeLink === 'gerencias' ? 'font-bold' : 'font-medium'}`}>Gerencias</span>
              </Link>
              <Link to="/departamentos" className={`flex items-center px-4 py-3 ${activeLink === 'departamentos' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-[#646cff] hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-lg transition-colors duration-200`} onClick={() => setActiveLink('departamentos')}>
                <span className={`material-icons ${activeLink === 'departamentos' ? '' : 'hover:text-[#646cff]'}`}>groups</span>
                <span className={`ml-4 ${activeLink === 'departamentos' ? 'font-bold' : 'font-medium'}`}>Departamentos</span>
              </Link>
              <Link to="#" className={`flex items-center px-4 py-3 ${activeLink === 'sistemas' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-[#646cff] hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-lg transition-colors duration-200`} onClick={() => setActiveLink('sistemas')}>
                <span className={`material-icons ${activeLink === 'sistemas' ? '' : 'hover:text-[#646cff]'}`}>dvr</span>
                <span className={`ml-4 ${activeLink === 'sistemas' ? 'font-bold' : 'font-medium'}`}>Sistemas</span>
              </Link>
              <Link to="/modulos" className={`flex items-center px-4 py-3 ${activeLink === 'modulos' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-lg transition-colors duration-200`} onClick={() => setActiveLink('modulos')}>
                <span className={`material-icons ${activeLink === 'modulos' ? '' : 'hover:text-[#646cff]'}`}>view_module</span>
                <span className={`ml-4 ${activeLink === 'modulos' ? 'font-bold' : 'font-medium'}`}>Módulos</span>
              </Link>
            </div>
          )}
        </div>

        {/* Plantillas */}
        <div>
          <button
            onClick={() => setPlantillasOpen(!plantillasOpen)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center">
              <span className="material-icons text-base text-gray-400 mr-2">
                description
              </span>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Plantillas
              </h3>
            </div>
            <span className="material-icons text-gray-400">
              {plantillasOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
          {plantillasOpen && (
            <div className="pl-4 space-y-1 mt-1">
              <Link to="/plantillas" className={`flex items-center px-4 py-3 ${activeLink === 'creacion-plantillas' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-[#646cff] hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-lg transition-colors duration-200`} onClick={() => setActiveLink('creacion-plantillas')}>
                <span className={`material-icons ${activeLink === 'creacion-plantillas' ? '' : 'hover:text-[#646cff]'}`}>add_to_drive</span>
                <span className={`ml-4 ${activeLink === 'creacion-plantillas' ? 'font-bold' : 'font-medium'}`}>Creación de plantillas</span>
              </Link>
              <Link to="#" className={`flex items-center px-4 py-3 ${activeLink === 'prueba-plantillas' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-[#646cff] hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-lg transition-colors duration-200`} onClick={() => setActiveLink('prueba-plantillas')}>
                <span className={`material-icons ${activeLink === 'prueba-plantillas' ? '' : 'hover:text-[#646cff]'}`}>biotech</span>
                <span className={`ml-4 ${activeLink === 'prueba-plantillas' ? 'font-bold' : 'font-medium'}`}>Prueba de plantillas</span>
              </Link>
            </div>
          )}
        </div>

        {/* Configuraciones */}
        <div>
          <button
            onClick={() => setConfiguracionesOpen(!configuracionesOpen)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center">
              <span className="material-icons text-base text-gray-400 mr-2">
                settings
              </span>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Configuraciones
              </h3>
            </div>
            <span className="material-icons text-gray-400">
              {configuracionesOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
          {configuracionesOpen && (
            <div className="pl-4 space-y-1 mt-1">
              <Link to="#" className={`flex items-center px-4 py-3 ${activeLink === 'usuarios' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-[#646cff] hover:bg-gray-100 dark:hover:bg-gray-700/50'} rounded-lg transition-colors duration-200`} onClick={() => setActiveLink('usuarios')}>
                <span className={`material-icons ${activeLink === 'usuarios' ? '' : 'hover:text-[#646cff]'}`}>people</span>
                <span className={`ml-4 ${activeLink === 'usuarios' ? 'font-bold' : 'font-medium'}`}>Usuarios</span>
              </Link>
              <Link to="#" className={`flex items-center px-4 py-3 ${activeLink === 'monitoreo' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-[#646cff] hover:bg-gray-100 dark:hover:bg-gray-700/50'} rounded-lg transition-colors duration-200`} onClick={() => setActiveLink('monitoreo')}>
                <span className={`material-icons ${activeLink === 'monitoreo' ? '' : 'hover:text-[#646cff]'}`}>monitor</span>
                <span className={`ml-4 ${activeLink === 'monitoreo' ? 'font-bold' : 'font-medium'}`}>Monitoreo</span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Botón fijo abajo */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/"
          className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
        >
          <span className="material-icons">logout</span>
          <span className="ml-4 font-medium">Cerrar sesión</span>
        </Link>
      </div>
    </aside>

    {/* Toggle Button */}
    <div className={`fixed top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 ease-in-out ${isOpen ? 'md:left-64 left-[calc(100vw-3rem)]' : 'left-0'}`}>
      <button
        onClick={onToggle}
        className={`p-3 rounded-r-full shadow-[4px_4px_6px_-1px_rgba(0,0,0,0.1),2px_2px_4px_-1px_rgba(0,0,0,0.06)] focus:shadow-[4px_4px_6px_-1px_rgba(0,0,0,0.1),2px_2px_4px_-1px_rgba(0,0,0,0.06)] transition-all duration-300 ease-in-out ${isOpen ? 'bg-white text-gray-700 hover:bg-gray-100' : 'bg-primary text-white hover:bg-primary/80'}`}
      >
        <span className="material-icons transition-transform duration-300 ease-in-out">{isOpen ? 'chevron_left' : 'chevron_right'}</span>
      </button>
    </div>
  </div>
  );
}

export default Sidebar;
