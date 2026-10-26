import { FileSpreadsheet, Database, ArrowLeft } from 'lucide-react'
import { DropZone } from '@/features/upload/DropZone'
import { DataTable } from '@/features/table/DataTable'
import { useCsvParser } from '@/hooks/useCsvParser'

export const CsvExplorerPage = () => {
  const { file, rows, columns, headers, error, isParsing, parse, reset } = useCsvParser()
  const hasData = rows.length > 0

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-teal-700 text-white">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 leading-none">CSV Explorer</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Upload & Filter Data</p>
            </div>
          </div>

          {hasData && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer shadow-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
        {!hasData && (
          <>
            <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 flex flex-col gap-3 shadow-sm">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-teal-300 text-xs font-semibold w-fit border border-slate-700">
                <Database className="w-3.5 h-3.5" />
                Constems AI Systems — Assessment Task
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                Upload CSV & filter data in browser
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                Upload any CSV file to display its tabular data and filter rows dynamically across different columns.
              </p>
            </div>

            <section className="flex flex-col gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Upload CSV</h2>
                <p className="text-xs text-slate-500">Select or drop a CSV file to display and filter its data.</p>
              </div>
              <div className="w-full max-w-lg">
                <DropZone onFile={parse} file={file} error={error} isParsing={isParsing} onReset={reset} />
              </div>
            </section>
          </>
        )}

        {hasData && (
          <div className="flex flex-col gap-4">
            <DataTable rows={rows} columns={columns} headers={headers} />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 mt-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 text-center sm:text-left">
          <p>CSV Data Viewer & Column Filter</p>
          <p>
            <span className="font-semibold text-teal-700">Constems AI Systems Pvt. Ltd.</span> — Candidate Task
          </p>
        </div>
      </footer>
    </div>
  )
}
