function TableRow({ row, index, onEdit, onDelete }) {
  return (
    <tr
      className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
        index % 2 === 1 ? "bg-gray-50 dark:bg-black/20" : ""
      }`}
    >
      <td className="p-2 text-sm pl-5">{row.id}</td>
      <td className="p-2 text-sm">{row.nombre}</td>
      <td className="p-2 text-sm">{row.area}</td>
      <td className="p-2 text-sm">{row.gerencia}</td>
      <td className="p-2 text-center">
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
      <td className="p-2 text-center">
        <div className="flex justify-center items-center space-x-1">
          <button
            className="text-primary hover:text-blue-700 dark:hover:text-blue-400 p-1"
            onClick={() => onEdit(row)}
          >
            <span className="material-icons text-sm">edit</span>
          </button>
          <button
            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
            onClick={() => onDelete(row)}
          >
            <span className="material-icons text-sm">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
