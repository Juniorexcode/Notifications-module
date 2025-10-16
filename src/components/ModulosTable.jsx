import React, { useState, useEffect } from "react";
import Pagination from "./Pagination.jsx";
import AnimatedTableBody from "./AnimatedTableBody.jsx";

function ModulosTable({
  onEdit,
  onDelete,
  data,
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSize,
}) {
  const [direction, setDirection] = useState(1);
  const [prevPage, setPrevPage] = useState(currentPage);

  useEffect(() => {
    if (currentPage !== prevPage) {
      setDirection(currentPage > prevPage ? 1 : -1);
      setPrevPage(currentPage);
    }
  }, [currentPage, prevPage]);

  return (
    <div
      className="
        bg-surface-light dark:bg-surface-dark
        rounded-xl flex flex-col
      "
    >
      {/* 🔹 Header fijo */}
      <div className="flex-shrink-0 bg-primary md:sticky md:top-0 md:z-10 rounded-t-xl">
        <div className="py-2 px-3 overflow-x-auto">
          <table className="w-full text-left min-w-[600px] table-fixed">
            <colgroup>
              <col style={{ width: "8%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead className="text-white">
              <tr>
                <th className="p-1 sm:p-2 text-xs sm:text-sm font-semibold">ID</th>
                <th className="p-1 sm:p-2 text-xs sm:text-sm font-semibold">Nombre Módulo</th>
                <th className="p-1 sm:p-2 text-xs sm:text-sm font-semibold">Sistema</th>
                <th className="p-1 sm:p-2 text-xs sm:text-sm font-semibold text-center">Estatus</th>
                <th className="p-1 sm:p-2 text-xs sm:text-sm font-semibold text-center">Acciones</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {/* 🔹 Contenedor del cuerpo con scroll interno */}
      <div className="overflow-y-auto overflow-x-auto">
        <AnimatedTableBody
          data={data}
          currentPage={currentPage}
          direction={direction}
          onEdit={onEdit}
          onDelete={onDelete}
          numColumns={5}
          colgroupWidths={["8%", "30%", "30%", "17%", "15%"]}
          isModulos={true}
        />
      </div>

      {/* 🔹 Footer fijo con paginación */}
      <div className="flex-shrink-0 md:sticky md:bottom-0 md:z-10 bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700 pb-3 rounded-b-xl">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(next) => {
            setDirection(next > currentPage ? 1 : -1);
            onPageChange(next);
          }}
          onPageSizeChange={onPageSizeChange}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}

export default ModulosTable;
