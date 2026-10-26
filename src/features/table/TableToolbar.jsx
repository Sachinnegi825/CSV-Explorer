import { Search, Table2, X, Filter } from 'lucide-react'

export const TableToolbar = ({
  columns = [],
  selectedColumn = '',
  onSelectColumn,
  searchQuery = '',
  onSearchChange,
  filteredCount = 0,
  totalCount = 0,
}) => {
  const isFiltered = Boolean(searchQuery.trim())

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-slate-200 bg-white">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
          <Table2 className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 leading-tight">Data Preview</h2>
          <p className="text-xs text-slate-500">
            {isFiltered ? (
              <>Showing <strong className="text-teal-700">{filteredCount.toLocaleString()}</strong> of {totalCount.toLocaleString()} rows</>
            ) : (
              `${totalCount.toLocaleString()} rows total`
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="flex items-center gap-1.5 flex-1 sm:w-44">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedColumn}
            onChange={(e) => onSelectColumn(e.target.value)}
            className="w-full h-8 px-2 text-xs border border-slate-300 rounded bg-white text-slate-800 outline-none focus:border-teal-600"
          >
            <option value="">All Columns</option>
            {columns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 sm:w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={selectedColumn ? `Filter ${selectedColumn}…` : "Search records…"}
            className="w-full h-8 pl-8 pr-7 text-xs border border-slate-300 rounded bg-white text-slate-800 outline-none focus:border-teal-600"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear filter"
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
