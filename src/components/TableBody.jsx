import TableRow from "./TableRow";

function TableBody({ data, onEdit, onDelete }) {
  return (
    <table className="w-full text-left min-w-[600px] sm:min-w-[700px] lg:min-w-[800px] table-fixed">
      {/* Alineación exacta con el header */}
      <colgroup>
        <col style={{ width: "8%" }} />
        <col style={{ width: "22%" }} />
        <col style={{ width: "18%" }} />
        <col style={{ width: "22%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "15%" }} />
      </colgroup>

      <tbody className="text-text-light dark:text-text-dark">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((row, index) => (
            <TableRow
              key={row.id ?? `${row.nombre}-${index}`}
              row={row}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <tr>
            <td colSpan={6} className="text-center py-12">
              <span className="material-icons text-gray-400 text-6xl mb-2 block">search_off</span>
              <p className="text-text-light dark:text-text-dark text-lg font-medium">
                No se encontró ningún registro similar
              </p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TableBody;
