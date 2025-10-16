import React, { useState, useMemo, useRef, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import PlantillasHeader from '../components/PlantillasHeader';
import SearchBar from '../components/SearchBar';
import PlantillasTable from '../components/PlantillasTable';
import AddPlantilla from '../components/AddPlantilla';
import plantillasData from '../data/plantillas.json';

function Plantillas() {
  const [plantillas, setPlantillas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlantilla, setEditingPlantilla] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tableWrapperRef = useRef(null);

  // Utilidad: normaliza texto para comparar
  const norm = (v) =>
    String(v ?? "")
      .trim()
      .toLowerCase();

  // ✅ Comportamiento de scroll dinámico (solo scroll interno en el contenedor)
  useEffect(() => {
    const el = tableWrapperRef.current;
    if (!el) return;

    const checkScroll = () => {
      const viewportHeight = window.innerHeight;
      el.style.overflowY = "auto";
      el.style.maxHeight = `${viewportHeight - el.getBoundingClientRect().top - 40}px`;
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [plantillas, currentPage, pageSize]);

  useEffect(() => {
    setPlantillas(plantillasData);
  }, []);

  // 🔍 Filtrado y búsqueda robustos (normaliza estatus y campos)
  const filteredData = useMemo(() => {
    const term = norm(searchTerm);
    const status = statusFilter ? norm(statusFilter) : null;

    return plantillas.filter((item) => {
      const estatus = norm(item.estatus);
      const departamento = norm(item.departamento);
      const modulo = norm(item.modulo);
      const plantillaMensaje = norm(item.plantillaMensaje);
      const idStr = String(item.id ?? "").trim();

      // Filtro por status tag (exacto tras normalización)
      if (status && estatus !== status) return false;

      // Búsqueda libre
      if (term) {
        if (term === "habilitado" || term === "deshabilitado") {
          if (estatus !== term) return false;
        } else {
          const hits =
            departamento.includes(term) ||
            modulo.includes(term) ||
            plantillaMensaje.includes(term) ||
            estatus.includes(term) ||
            idStr.includes(term);
          if (!hits) return false;
        }
      }

      return true;
    });
  }, [plantillas, searchTerm, statusFilter]);

  // 📄 Paginación segura
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  // Si currentPage queda fuera de rango, corrige (evita tabla en blanco)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleAddPlantilla = () => {
    setIsAddModalOpen(true);
  };

  const handleEditPlantilla = (plantilla) => {
    setEditingPlantilla(plantilla);
    setIsAddModalOpen(true);
  };

  const handleDeletePlantilla = (plantilla) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la plantilla "${plantilla.plantillaMensaje}"?`)) {
      setPlantillas(plantillas.filter(p => p.id !== plantilla.id));
    }
  };

  const handleSavePlantilla = (formData) => {
    if (editingPlantilla) {
      // Edit existing plantilla
      setPlantillas(plantillas.map(p =>
        p.id === editingPlantilla.id
          ? { ...p, ...formData, id: p.id }
          : p
      ));
      setEditingPlantilla(null);
    } else {
      // Add new plantilla
      const newPlantilla = {
        ...formData,
        id: Math.max(...plantillas.map(p => p.id)) + 1
      };
      setPlantillas([...plantillas, newPlantilla]);
    }
    setIsAddModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingPlantilla(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // reset elegante al buscar
  };

  const handleStatusFilter = (status) => {
    // Toggle: si clicas el mismo, limpia; si no, establece
    setStatusFilter(statusFilter === status ? '' : status);

    // Reset elegante al cambiar de tag
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex bg-background-light dark:bg-background-dark overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onToggle={handleToggleSidebar} />
      <main className={`flex-1 p-4 sm:p-6 md:p-10 overflow-hidden transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64 ml-0' : 'ml-0'}`}>
        <div className="max-w-7xl xl:max-w-full xl:px-8 2xl:px-16 mx-auto h-full flex flex-col">
          <PlantillasHeader onAddClick={handleAddPlantilla} />
          <SearchBar
            searchTerm={searchTerm}
            onSearch={handleSearch}
            statusFilter={statusFilter}
            onStatusFilter={handleStatusFilter}
            placeholder="Buscar plantillas..."
            isOpen={sidebarOpen}
          />
          {/* Tabla envuelta para el control de scroll dinámico */}
          <div
            ref={tableWrapperRef}
            className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg flex-1 overflow-hidden"
          >
            <PlantillasTable
              data={paginatedData}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              pageSize={pageSize}
              onEdit={handleEditPlantilla}
              onDelete={handleDeletePlantilla}
            />
          </div>
        </div>
      </main>
      <AddPlantilla
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        title={editingPlantilla ? "EDITAR PLANTILLA" : "FORMULARIO AGREGAR PLANTILLA"}
        initialData={editingPlantilla}
        onSave={handleSavePlantilla}
      />
    </div>
  );
}

export default Plantillas;
