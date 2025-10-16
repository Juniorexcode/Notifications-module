import React, { useState, useMemo, useRef, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import ModulosHeader from "../components/ModulosHeader";
import SearchBar from "../components/SearchBar";
import ModulosTable from "../components/ModulosTable";
import AddModulo from "../components/AddModulo";
import modulosData from "../data/modulos.json";

function Modulos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null); // "Habilitado" | "Deshabilitado" | null
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState(modulosData);
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
  }, [tableData, currentPage, pageSize]);

  // 🔍 Filtrado y búsqueda robustos (normaliza estatus y campos)
  const filteredData = useMemo(() => {
    const term = norm(searchTerm);
    const status = statusFilter ? norm(statusFilter) : null;

    return tableData.filter((item) => {
      const estatus = norm(item.estatus);
      const nombre = norm(item.nombre);
      const sistema = norm(item.sistema);
      // const gerencia = norm(item.gerencia);
      const idStr = String(item.id ?? "").trim();

      // Filtro por status tag (exacto tras normalización)
      if (status && estatus !== status) return false;

      // Búsqueda libre
      if (term) {
        if (term === "habilitado" || term === "deshabilitado") {
          if (estatus !== term) return false;
        } else {
          const hits =
            nombre.includes(term) ||
            sistema.includes(term) ||
            estatus.includes(term) ||
            idStr.includes(term);
          if (!hits) return false;
        }
      }

      return true;
    });
  }, [tableData, searchTerm, statusFilter]);

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

  // 🧠 Handlers
  const handleAddClick = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (rowData) => {
    setEditingData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingData(null);
  };

  const handleSave = (formData) => {
    if (editingData) {
      // Actualiza registro existente
      setTableData((prevData) =>
        prevData.map((item) =>
          item.id === editingData.id ? { ...item, ...formData } : item
        )
      );
    } else {
      // Agrega nuevo registro
      const newId =
        tableData.length > 0 ? Math.max(...tableData.map((i) => i.id)) + 1 : 1;
      const newRecord = { id: newId, ...formData };
      setTableData((prevData) => [...prevData, newRecord]);
    }
  };

  const handleDelete = (row) => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar el módulo "${row.nombre}"?`
      )
    ) {
      setTableData((prevData) => prevData.filter((item) => item.id !== row.id));
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // reset elegante al buscar
  };

  const handleStatusFilter = (status) => {
    // Toggle: si clicas el mismo, limpia; si no, establece
    setStatusFilter(statusFilter === status ? null : status);

    // Reset elegante al cambiar de tag
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
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
          {/* Header principal */}
          <ModulosHeader onAddClick={handleAddClick} />

          {/* Barra de búsqueda + tags debajo */}
          <SearchBar
            onSearch={handleSearch}
            statusFilter={statusFilter}
            onStatusFilter={handleStatusFilter}
            searchTerm={searchTerm}
            isOpen={sidebarOpen}
          />

          {/* Tabla envuelta para el control de scroll dinámico */}
          <div
            ref={tableWrapperRef}
            className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg flex-1 overflow-hidden"
          >
            <ModulosTable
              onEdit={handleEditClick}
              onDelete={handleDelete}
              data={paginatedData}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              pageSize={pageSize}
            />
          </div>
        </div>
      </main>

      {/* Modal agregar/editar */}
      <AddModulo
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          editingData
            ? "FORMULARIO EDITAR MÓDULO"
            : "FORMULARIO AGREGAR MÓDULO"
        }
        initialData={editingData}
        onSave={handleSave}
      />
    </div>
  );
}

export default Modulos;
