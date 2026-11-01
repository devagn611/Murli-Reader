import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { faqItems, site } from './src/content/site'
import {
  breadcrumbGraph,
  contactPageGraph,
  faqPageGraph,
  globalJsonLd,
  pageMetadata,
} from './src/content/seo'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function jsonLdScript(data: Record<string, unknown>) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}

function setMeta(
  html: string,
  attr: string,
  value: string,
  attrName: 'name' | 'property' = 'name'
) {
  const escaped = escapeHtml(value)
  const pattern = new RegExp(
    `(<meta\\s+${attrName}="${attr}"[\\s\\S]*?content=")[^"]*(")`,
    'i'
  )
  if (!pattern.test(html)) {
    return html
  }
  return html.replace(pattern, `$1${escaped}$2`)
}

function applyPageShell(
  html: string,
  page: 'home' | 'about' | 'notFound',
  extraGraphs: Record<string, unknown>[] = [],
  noscript = ''
) {
  const meta = pageMetadata(page)
  let next = html
  next = next.replace(/<html lang="[^"]*">/, `<html lang="${site.htmlLang}">`)
  next = next.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
  next = setMeta(next, 'description', meta.description)
  next = setMeta(next, 'robots', meta.robots)
  next = setMeta(
    next,
    'googlebot',
    page === 'notFound'
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  )
  next = next.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${meta.canonical}" />`
  )
  next = next.replace(
    /<link rel="alternate" hrefLang="en-IN" href="[^"]*"\s*\/>/,
    `<link rel="alternate" hrefLang="en-IN" href="${meta.canonical}" />`
  )
  next = next.replace(
    /<link rel="alternate" hrefLang="x-default" href="[^"]*"\s*\/>/,
    `<link rel="alternate" hrefLang="x-default" href="${meta.canonical}" />`
  )
  next = setMeta(next, 'og:title', meta.openGraph.title, 'property')
  next = setMeta(next, 'og:description', meta.openGraph.description, 'property')
  next = setMeta(next, 'og:url', meta.openGraph.url, 'property')
  next = setMeta(next, 'twitter:title', meta.twitter.title)
  next = setMeta(next, 'twitter:description', meta.twitter.description)

  const scripts = [
    jsonLdScript(globalJsonLd()),
    ...extraGraphs.map((graph) =>
      jsonLdScript({ '@context': 'https://schema.org', ...graph })
    ),
  ].join('\n    ')
  next = next.replace('</head>', `    ${scripts}\n  </head>`)

  if (noscript) {
    next = next.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n${noscript}\n    </noscript>`)
  }

  return next
}

function faqNoscript() {
  const items = faqItems
    .map(
      (item) =>
        `        <dt>${escapeHtml(item.question)}</dt>\n        <dd>${escapeHtml(item.answer)}</dd>`
    )
    .join('\n')
  return `      <h1>${escapeHtml(pageMetadata('home').heading)}</h1>
      <p>${escapeHtml(site.description)}</p>
      <h2>Frequently asked questions</h2>
      <dl>
${items}
      </dl>`
}

function aboutNoscript() {
  return `      <nav aria-label="Breadcrumb">Home / About</nav>
      <h1>${escapeHtml(pageMetadata('about').heading)}</h1>
      <p>${escapeHtml(site.tagline)}</p>
      <p>49 Hindi Avyakt Vaani volumes from 1969 to 2017.</p>
      <p>Contact: ${escapeHtml(site.email)}</p>`
}

function notFoundNoscript() {
  return `      <h1>Page not found</h1>
      <p>This page is not part of Avyakt Murli Reader.</p>`
}

function seoPrerender(): Plugin {
  return {
    name: 'seo-prerender',
    closeBundle() {
      const dist = path.resolve('dist')
      const indexPath = path.join(dist, 'index.html')
      if (!fs.existsSync(indexPath)) {
        return
      }
      const source = fs.readFileSync(indexPath, 'utf8')
      const homeHtml = applyPageShell(source, 'home', [faqPageGraph()], faqNoscript())
      fs.writeFileSync(indexPath, homeHtml)

      const aboutDir = path.join(dist, 'about')
      fs.mkdirSync(aboutDir, { recursive: true })
      fs.writeFileSync(
        path.join(aboutDir, 'index.html'),
        applyPageShell(
          source,
          'about',
          [breadcrumbGraph('about'), contactPageGraph()],
          aboutNoscript()
        )
      )

      fs.writeFileSync(
        path.join(dist, '404.html'),
        applyPageShell(source, 'notFound', [], notFoundNoscript())
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), seoPrerender()],
  server: {
    proxy: {
      '/epub': {
        target: 'https://epubreader.brahmakumaris.com',
        changeOrigin: true,
        rewrite: (pathName) => pathName.replace(/^\/epub/, ''),
        secure: false,
        ws: true,
      },
    },
  },
})
