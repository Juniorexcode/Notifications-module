import React, { useState, useMemo, useRef, useEffect } from "react";
import DepartamentosHeader from "../components/DepartamentosHeader";
import SearchBar from "../components/SearchBar";
import DepartamentosTable from "../components/DepartamentosTable";
import AddRegistro from "../components/AddRegistro";
import departamentosData from "../data/departamentos.json";

function Departamentos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState(departamentosData);

  const tableWrapperRef = useRef(null);

  // ✅ Aplica el comportamiento de scroll dinámico
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

  // 🔍 Filtrado y búsqueda optimizados
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return tableData.filter((item) => {
      if (statusFilter && item.estatus !== statusFilter) return false;
      if (term) {
        if (term === "habilitado") return item.estatus === "Habilitado";
        if (term === "deshabilitado") return item.estatus === "Deshabilitado";
        return (
          item.nombre.toLowerCase().includes(term) ||
          item.area.toLowerCase().includes(term) ||
          item.gerencia.toLowerCase().includes(term) ||
          item.estatus.toLowerCase().includes(term) ||
          item.id.toString().includes(term)
        );
      }
      return true;
    });
  }, [tableData, searchTerm, statusFilter]);

  // 📄 Paginación
  const totalPages = Math.ceil(filteredData.length / pageSize);
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
        `¿Estás seguro de que deseas eliminar el departamento "${row.nombre}"?`
      )
    ) {
      setTableData((prevData) => prevData.filter((item) => item.id !== row.id));
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(statusFilter === status ? null : status);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Header principal */}
      <DepartamentosHeader onAddClick={handleAddClick} />

      {/* Barra de búsqueda + tags debajo */}
      <SearchBar
        onSearch={handleSearch}
        statusFilter={statusFilter}
        onStatusFilter={handleStatusFilter}
      />

      {/* Tabla envuelta para el control de scroll dinámico */}
      <div ref={tableWrapperRef} className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg">
        <DepartamentosTable
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

      {/* Modal agregar/editar */}
      <AddRegistro
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          editingData
            ? "FORMULARIO EDITAR DEPARTAMENTO"
            : "FORMULARIO AGREGAR DEPARTAMENTO"
        }
        initialData={editingData}
        onSave={handleSave}
      />
    </>
  );
}

export default Departamentos;
