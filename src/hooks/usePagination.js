import { useCallback, useState } from 'react'
import { PAGE_SIZE_OPTIONS } from '@/constants'

export const usePagination = (totalRows) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0])

  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize))

  const safeSetPage = useCallback(
    (p) => setPage(Math.min(Math.max(1, p), totalPages)),
    [totalPages]
  )

  const changePageSize = useCallback((size) => {
    setPageSize(size)
    setPage(1)
  }, [])

  const reset = useCallback(() => {
    setPage(1)
  }, [])

  return {
    page,
    pageSize,
    totalPages,
    setPage: safeSetPage,
    setPageSize: changePageSize,
    reset,
  }
}
