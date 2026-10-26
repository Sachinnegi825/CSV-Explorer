import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { PAGE_SIZE_OPTIONS } from '@/constants'

export const Pagination = ({ page, totalPages, pageSize, totalRows, onPage, onPageSize }) => {
  const start = totalRows === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalRows)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 bg-white text-xs text-slate-600">
      <div className="flex items-center gap-2">
        <span>Rows per page</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSize(Number(e.target.value))}
          className="h-7 px-2 border border-slate-300 rounded bg-white text-xs outline-none cursor-pointer"
        >
          {PAGE_SIZE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span>
          <strong className="text-slate-800">{start}–{end}</strong> of <strong className="text-slate-800">{totalRows.toLocaleString()}</strong>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-slate-500 font-medium">Page {page} of {Math.max(1, totalPages)}</span>
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            size="xs"
            onClick={() => onPage(page - 1)}
            disabled={page <= 1}
            title="Previous page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Prev
          </Button>
          <Button
            variant="secondary"
            size="xs"
            onClick={() => onPage(page + 1)}
            disabled={page >= totalPages}
            title="Next page"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
