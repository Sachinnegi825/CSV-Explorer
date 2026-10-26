import { Search, Table2, X, Calendar, RotateCcw } from 'lucide-react'

export const TableToolbar = ({
  globalSearch = '',
  onGlobalSearchChange,
  selectableColumns = [],
  columnFilters = {},
  onColumnFilterChange,
  hasDate = false,
  startDate = '',
  endDate = '',
  onStartDateChange,
  onEndDateChange,
  onClearDateFilter,
  onClearAll,
  hasActiveFilters = false,
  filteredCount = 0,
  totalCount = 0,
}) => {
  return (
    <div className="flex flex-col gap-3 p-4 border-b border-slate-200 bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
            <Table2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">Data Preview</h2>
            <p className="text-xs text-slate-500">
              {hasActiveFilters ? (
                <>
                  Showing <strong className="text-teal-700">{filteredCount.toLocaleString()}</strong> of {totalCount.toLocaleString()} rows
                </>
              ) : (
                `${totalCount.toLocaleString()} rows total`
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => onGlobalSearchChange(e.target.value)}
              placeholder="Search all records…"
              className="w-full h-8 pl-8 pr-7 text-xs border border-slate-300 rounded bg-white text-slate-800 outline-none focus:border-teal-600"
            />
            {globalSearch && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => onGlobalSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1 h-8 px-2.5 rounded-md border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-700 cursor-pointer transition-colors shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {selectableColumns.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Filter by:
          </span>
          {selectableColumns.map((col) => (
            <select
              key={col.key}
              value={columnFilters[col.key] || ''}
              onChange={(e) => onColumnFilterChange(col.key, e.target.value)}
              className={`h-8 px-2 text-xs border rounded bg-white outline-none cursor-pointer transition-colors ${
                columnFilters[col.key]
                  ? 'border-teal-600 bg-teal-50/50 text-teal-900 font-semibold'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              <option value="">All {col.label}</option>
              {col.values.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}

      {hasDate && (
        <div className="flex flex-wrap items-center gap-2.5 p-2.5 rounded-lg bg-teal-50/40 border border-teal-200/80 text-xs text-slate-700">
          <div className="flex items-center gap-1.5 font-semibold text-teal-900 shrink-0">
            <Calendar className="w-3.5 h-3.5 text-teal-700" />
            <span>Date Range:</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-slate-500 font-medium">From:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="h-7 px-2 text-xs border border-slate-300 rounded bg-white text-slate-800 outline-none focus:border-teal-600"
            />
          </div>

          <div className="flex items-center gap-1">
            <span className="text-slate-500 font-medium">To:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="h-7 px-2 text-xs border border-slate-300 rounded bg-white text-slate-800 outline-none focus:border-teal-600"
            />
          </div>

          {(startDate || endDate) && (
            <button
              type="button"
              onClick={onClearDateFilter}
              className="h-7 px-2 text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              Clear Date
            </button>
          )}
        </div>
      )}
    </div>
  )
}
