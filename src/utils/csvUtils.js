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

export const parseCellDate = (val) => {
  if (!val) return null
  const str = String(val).trim()
  if (!str || !isNaN(Number(str))) return null
  const d = new Date(str)
  return isNaN(d.getTime()) ? null : d
}

export const isDateColumn = (rows, header) => {
  const sample = rows.slice(0, 15).map((r) => r[header]).filter(Boolean)
  return sample.length > 0 && sample.every((v) => parseCellDate(v) !== null)
}
