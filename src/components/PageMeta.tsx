import { Helmet } from 'react-helmet-async'
import { pageMetadata } from '../content/seo'
import { site, type PageKey } from '../content/site'

type PageMetaProps = {
  page: PageKey
}

export function PageMeta({ page }: PageMetaProps) {
  const meta = pageMetadata(page)

  return (
    <Helmet>
      <html lang={site.htmlLang} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords.join(', ')} />
      <meta name="robots" content={meta.robots} />
      <link rel="canonical" href={meta.canonical} />
      {meta.hreflang.map((item) => (
        <link
          key={item.hrefLang}
          rel="alternate"
          hrefLang={item.hrefLang}
          href={item.href}
        />
      ))}
      <meta property="og:type" content={meta.openGraph.type} />
      <meta property="og:locale" content={meta.openGraph.locale} />
      <meta property="og:site_name" content={meta.openGraph.siteName} />
      <meta property="og:title" content={meta.openGraph.title} />
      <meta property="og:description" content={meta.openGraph.description} />
      <meta property="og:url" content={meta.openGraph.url} />
      <meta property="og:image" content={meta.openGraph.image} />
      <meta name="twitter:card" content={meta.twitter.card} />
      <meta name="twitter:title" content={meta.twitter.title} />
      <meta name="twitter:description" content={meta.twitter.description} />
      <meta name="twitter:image" content={meta.twitter.image} />
    </Helmet>
  )
}
