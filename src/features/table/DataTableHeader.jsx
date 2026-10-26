export const DataTableHeader = ({ columns }) => (
  <thead className="bg-slate-50 border-b border-slate-200">
    <tr>
      <th className="w-12 px-4 py-3 text-left text-xs font-bold text-slate-400">#</th>
      {columns.map((col) => (
        <th
          key={col.key}
          className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 min-w-[8rem] max-w-[16rem] truncate"
        >
          {col.label}
        </th>
      ))}
    </tr>
  </thead>
)
