export type CatalogBook = {
  filename: string
  name: string
  year: number
}

export const YEAR_START = 1969
export const YEAR_END = 2017

export const catalogBooks: CatalogBook[] = Array.from(
  { length: YEAR_END - YEAR_START + 1 },
  (_, index) => {
    const year = YEAR_START + index
    return {
      year,
      name: String(year),
      filename: `${year}_Hindi_Avyakt_Vaani.epub`,
    }
  }
)

export const bookCount = catalogBooks.length

export function publicFileUrl(relativePath: string) {
  const base = import.meta.env.BASE_URL || '/'
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}${relativePath.replace(/^\//, '')}`
}
