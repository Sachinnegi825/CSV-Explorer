export const buildColumnSchema = (headers) =>
  headers.map((header) => ({
    key: header,
    label: header,
  }))

export const paginateRows = (rows, page, pageSize) => {
  const start = (page - 1) * pageSize
  return rows.slice(start, start + pageSize)
}

export const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`
}
