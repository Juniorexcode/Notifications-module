import TableRow from "./TableRow";
import ModulosTableRow from "./ModulosTableRow";
import PlantillasTableRow from "./PlantillasTableRow";

function TableBody({ data, onEdit, onDelete, numColumns = 6, colgroupWidths = ["8%", "22%", "22%", "25%", "12%", "22%"], isModulos = false, isPlantillas = false }) {
  const RowComponent = isPlantillas ? PlantillasTableRow : (isModulos ? ModulosTableRow : TableRow);

  return (
    <table className="w-full text-left min-w-[600px] sm:min-w-[700px] lg:min-w-[800px] table-fixed">
      {/* Alineación exacta con el header */}
      <colgroup>
        {colgroupWidths.map((width, index) => (
          <col key={index} style={{ width }} />
        ))}
      </colgroup>

      <tbody className="text-text-light dark:text-text-dark">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((row, index) => (
            <RowComponent
              key={row.id ?? `${row.nombre}-${index}`}
              row={row}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <tr>
            <td colSpan={numColumns} className="text-center py-8 sm:py-12">
              <span className="material-icons text-gray-400 text-4xl sm:text-6xl mb-2 block">search_off</span>
              <p className="text-text-light dark:text-text-dark text-sm sm:text-lg font-medium">
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
