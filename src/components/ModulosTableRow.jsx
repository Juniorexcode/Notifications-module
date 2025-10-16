function ModulosTableRow({ row, index, onEdit, onDelete }) {
  return (
    <tr
      className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
        index % 2 === 1 ? "bg-gray-50 dark:bg-black/20" : ""
      }`}
    >
      <td className="p-1 sm:p-2 text-xs sm:text-sm pl-1 sm:pl-5">{row.id}</td>
      <td className="p-1 sm:p-2 text-xs sm:text-sm">{row.nombre}</td>
      <td className="p-1 sm:p-2 text-xs sm:text-sm">{row.sistema}</td>
      <td className="p-1 sm:p-2 text-center">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            row.estatus === "Habilitado"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {row.estatus}
        </span>
      </td>
      <td className="p-1 sm:p-2 text-center">
        <div className="flex justify-center items-center space-x-1 sm:space-x-2">
          <button
            className="text-primary hover:text-blue-700 dark:hover:text-blue-400 p-1 sm:p-2"
            onClick={() => onEdit(row)}
          >
            <span className="material-icons text-sm sm:text-base md:text-2xl xl:text-3xl">edit</span>
          </button>
          <button
            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 sm:p-2"
            onClick={() => onDelete(row)}
          >
            <span className="material-icons text-sm sm:text-base md:text-2xl xl:text-3xl">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ModulosTableRow;
