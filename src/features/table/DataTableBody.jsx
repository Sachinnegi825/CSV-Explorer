const CellValue = ({ value }) => {
  if (value === '' || value == null) {
    return <span className="text-slate-400 italic text-xs">—</span>
  }
  return <span className="text-slate-700 text-xs">{String(value)}</span>
}

export const DataTableBody = ({ rows, columns, globalOffset }) => (
  <tbody className="divide-y divide-slate-100 bg-white">
    {rows.map((row, rowIdx) => (
      <tr key={rowIdx} className="hover:bg-teal-50/40 transition-colors">
        <td className="px-4 py-2.5 text-xs text-slate-400 font-mono w-12">
          {globalOffset + rowIdx + 1}
        </td>
        {columns.map((col) => (
          <td key={col.key} className="px-4 py-2.5 max-w-xs truncate">
            <CellValue value={row[col.key]} />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
)
