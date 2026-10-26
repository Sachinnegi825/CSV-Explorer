import { useMemo, useState } from 'react'
import { DataTableHeader } from './DataTableHeader'
import { DataTableBody } from './DataTableBody'
import { Pagination } from './Pagination'
import { TableToolbar } from './TableToolbar'
import { EmptyState } from './EmptyState'
import { usePagination } from '@/hooks/usePagination'
import { paginateRows } from '@/utils/csvUtils'

export const DataTable = ({ rows = [], columns = [], headers = [] }) => {
  const [selectedColumn, setSelectedColumn] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rows
    const term = searchQuery.toLowerCase().trim()

    if (selectedColumn) {
      return rows.filter((row) =>
        String(row[selectedColumn] ?? '').toLowerCase().includes(term)
      )
    }

    return rows.filter((row) =>
      headers.some((h) => String(row[h] ?? '').toLowerCase().includes(term))
    )
  }, [rows, headers, selectedColumn, searchQuery])

  const { page, pageSize, totalPages, setPage, setPageSize, reset } = usePagination(filteredRows.length)
  const paginated = useMemo(() => paginateRows(filteredRows, page, pageSize), [filteredRows, page, pageSize])

  const handleSelectColumn = (col) => {
    setSelectedColumn(col)
    reset()
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
    reset()
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <TableToolbar
        columns={columns}
        selectedColumn={selectedColumn}
        onSelectColumn={handleSelectColumn}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
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
                  <EmptyState hasFilters={Boolean(searchQuery.trim())} />
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
