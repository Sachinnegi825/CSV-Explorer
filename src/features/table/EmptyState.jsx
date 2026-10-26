import { SearchX } from 'lucide-react'

export const EmptyState = ({ hasFilters }) => (
  <div className="flex flex-col items-center justify-center p-10 text-center gap-2">
    <div className="p-3 rounded-full bg-slate-100 text-slate-400">
      <SearchX className="w-8 h-8" />
    </div>
    <p className="text-sm font-semibold text-slate-700">No matching records found</p>
    <p className="text-xs text-slate-400">
      {hasFilters ? 'Try adjusting your search or selecting a different column.' : 'No data to display.'}
    </p>
  </div>
)
