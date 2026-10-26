import Papa from 'papaparse'
import { useCallback, useState } from 'react'
import { MAX_FILE_SIZE_BYTES } from '@/constants'
import { buildColumnSchema } from '@/utils/csvUtils'

const PARSE_CONFIG = {
  header: true,
  skipEmptyLines: true,
  dynamicTyping: false,
  transformHeader: (h) => h.trim(),
}

export const useCsvParser = () => {
  const [state, setState] = useState({
    file: null,
    rows: [],
    columns: [],
    headers: [],
    error: null,
    isParsing: false,
  })

  const reset = useCallback(() => {
    setState({
      file: null,
      rows: [],
      columns: [],
      headers: [],
      error: null,
      isParsing: false,
    })
  }, [])

  const parse = useCallback((file) => {
    if (!file) return

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setState((s) => ({ ...s, error: `File exceeds ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB limit.` }))
      return
    }

    setState((s) => ({ ...s, isParsing: true, error: null, file }))

    Papa.parse(file, {
      ...PARSE_CONFIG,
      complete: ({ data, meta, errors }) => {
        if (errors.length) {
          setState((s) => ({
            ...s,
            isParsing: false,
            error: errors[0]?.message ?? 'Parse error',
          }))
          return
        }

        const headers = meta.fields ?? []
        const columns = buildColumnSchema(headers)

        setState({
          file,
          rows: data,
          columns,
          headers,
          error: null,
          isParsing: false,
        })
      },
      error: (err) => {
        setState((s) => ({ ...s, isParsing: false, error: err.message }))
      },
    })
  }, [])

  return { ...state, parse, reset }
}
