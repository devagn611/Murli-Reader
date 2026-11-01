import type { Contents, Rendition } from 'epubjs'

const light = {
  background: '#f7f7f5',
  color: '#1c1c1e',
  link: '#3a3a3c',
}

const dark = {
  background: '#111111',
  color: '#ededed',
  link: '#d1d1d6',
}

function paintContents(contents: Contents, theme: typeof light) {
  const doc = contents.document
  if (!doc) return
  doc.documentElement.style.background = theme.background
  if (doc.body) {
    doc.body.style.background = theme.background
    doc.body.style.color = theme.color
  }
}

export function applyReaderTheme(
  rendition: Rendition,
  isDarkMode: boolean,
  largeText: boolean
) {
  const theme = isDarkMode ? dark : light
  rendition.themes.default({
    body: {
      background: `${theme.background} !important`,
      color: `${theme.color} !important`,
    },
    a: {
      color: `${theme.link} !important`,
    },
  })
  rendition.themes.fontSize(largeText ? '140%' : '100%')
  const raw =
    typeof rendition.getContents === 'function' ? rendition.getContents() : []
  const contents = Array.isArray(raw) ? raw : raw ? [raw] : []
  contents.forEach((item: Contents) => paintContents(item, theme))
}
