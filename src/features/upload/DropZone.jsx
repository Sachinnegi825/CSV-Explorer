import { useCallback, useRef, useState } from 'react'
import { UploadCloud, FileText, X, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui'
import { formatFileSize } from '@/utils/csvUtils'
import { UPLOAD_ACCEPT } from '@/constants'

export const DropZone = ({ onFile, file, error, isParsing, onReset }) => {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(e.type === 'dragenter' || e.type === 'dragover')
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) onFile(dropped)
  }, [onFile])

  const handleFileChange = useCallback((e) => {
    const selected = e.target.files?.[0]
    if (selected) onFile(selected)
    e.target.value = ''
  }, [onFile])

  if (file && !error) {
    return (
      <div className="flex items-center gap-3 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
        <div className="p-2 rounded-md bg-emerald-100 text-emerald-700 shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {formatFileSize(file.size)} — loaded successfully
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={onReset}>
          <X className="w-3.5 h-3.5" />
          Replace
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        role="button"
        tabIndex={0}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-lg cursor-pointer transition-colors text-center border-2 border-dashed ${
          isDragging
            ? 'border-teal-500 bg-teal-50/60'
            : 'border-slate-300 bg-white hover:border-teal-400 hover:bg-slate-50/50'
        }`}
      >
        <div className={`p-3 rounded-full ${isDragging ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
          <UploadCloud className="w-7 h-7" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">
            {isDragging ? 'Drop file to upload' : 'Click or drag CSV file here'}
          </p>
          <p className="text-xs text-slate-400 mt-1">Supports standard .csv files</p>
        </div>

        {isParsing && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xs rounded-lg flex items-center justify-center gap-2 text-teal-700">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span className="text-sm font-semibold">Parsing CSV data…</span>
          </div>
        )}

        <input ref={inputRef} type="file" accept={UPLOAD_ACCEPT} onChange={handleFileChange} className="sr-only" />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}
