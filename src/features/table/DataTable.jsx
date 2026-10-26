import { useMemo, useState } from 'react'
import { DataTableHeader } from './DataTableHeader'
import { DataTableBody } from './DataTableBody'
import { Pagination } from './Pagination'
import { TableToolbar } from './TableToolbar'
import { EmptyState } from './EmptyState'
import { usePagination } from '@/hooks/usePagination'
import { paginateRows, parseCellDate, isDateColumn } from '@/utils/csvUtils'

export const DataTable = ({ rows = [], columns = [], headers = [] }) => {
  const [globalSearch, setGlobalSearch] = useState('')
  const [columnFilters, setColumnFilters] = useState({})
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const dateColumn = useMemo(() => {
    return headers.find((h) => isDateColumn(rows, h) || /date|time|created|timestamp/i.test(h)) || ''
  }, [headers, rows])

  const selectableColumns = useMemo(() => {
    return columns
      .map((col) => {
        const values = [...new Set(rows.map((r) => String(r[col.key] ?? '').trim()).filter(Boolean))].sort()
        const isDate = isDateColumn(rows, col.key) || /date|time|created/i.test(col.key)
        const isSelectable = !isDate && values.length >= 2 && values.length <= 25 && values.length < rows.length

        return { key: col.key, label: col.label, values, isSelectable }
      })
      .filter((col) => col.isSelectable)
  }, [columns, rows])

  const filteredRows = useMemo(() => {
    const term = globalSearch.toLowerCase().trim()
    const activeFilters = Object.entries(columnFilters).filter(([, val]) => Boolean(val))
    const isDateActive = Boolean(dateColumn && (startDate || endDate))

    if (!term && activeFilters.length === 0 && !isDateActive) {
      return rows
    }

    const start = startDate ? new Date(`${startDate}T00:00:00`) : null
    const end = endDate ? new Date(`${endDate}T23:59:59.999`) : null

    return rows.filter((row) => {
      if (term) {
        const matchesGlobal = headers.some((h) =>
          String(row[h] ?? '').toLowerCase().includes(term)
        )
        if (!matchesGlobal) return false
      }

      for (const [colKey, selectedVal] of activeFilters) {
        if (String(row[colKey] ?? '') !== selectedVal) {
          return false
        }
      }

      if (isDateActive) {
        const cellDate = parseCellDate(row[dateColumn])
        if (!cellDate) return false
        if (start && cellDate < start) return false
        if (end && cellDate > end) return false
      }

      return true
    })
  }, [rows, headers, globalSearch, columnFilters, dateColumn, startDate, endDate])

  const { page, pageSize, totalPages, setPage, setPageSize, reset } = usePagination(filteredRows.length)
  const paginated = useMemo(() => paginateRows(filteredRows, page, pageSize), [filteredRows, page, pageSize])

  const handleGlobalSearchChange = (val) => {
    setGlobalSearch(val)
    reset()
  }

  const handleColumnFilterChange = (colKey, val) => {
    setColumnFilters((prev) => ({
      ...prev,
      [colKey]: val,
    }))
    reset()
  }

  const handleStartDateChange = (val) => {
    setStartDate(val)
    reset()
  }

  const handleEndDateChange = (val) => {
    setEndDate(val)
    reset()
  }

  const handleClearDateFilter = () => {
    setStartDate('')
    setEndDate('')
    reset()
  }

  const handleClearAll = () => {
    setGlobalSearch('')
    setColumnFilters({})
    setStartDate('')
    setEndDate('')
    reset()
  }

  const hasActiveFilters =
    Boolean(globalSearch.trim()) ||
    Object.values(columnFilters).some(Boolean) ||
    Boolean(startDate || endDate)

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <TableToolbar
        globalSearch={globalSearch}
        onGlobalSearchChange={handleGlobalSearchChange}
        selectableColumns={selectableColumns}
        columnFilters={columnFilters}
        onColumnFilterChange={handleColumnFilterChange}
        hasDate={Boolean(dateColumn)}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onClearDateFilter={handleClearDateFilter}
        onClearAll={handleClearAll}
        hasActiveFilters={hasActiveFilters}
        filteredCount={filteredRows.length}
        totalCount={rows.length}
      />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <DataTableHeader columns={columns} />
          {paginated.length > 0 ? (
            <DataTableBody rows={paginated} columns={columns} globalOffset={(page - 1) * pageSize} />
          ) : (
            <tbody>
              <tr>
                <td colSpan={columns.length + 1}>
                  <EmptyState hasFilters={hasActiveFilters} />
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        totalRows={filteredRows.length}
        onPage={setPage}
        onPageSize={(s) => { setPageSize(s); reset() }}
      />
    </div>
  )
}
