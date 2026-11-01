import { faqItems, pages, site, type PageKey } from './site'

export function absoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  if (!path || path === '/') {
    return site.url
  }
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function pageMetadata(key: PageKey) {
  const page = pages[key]
  const isHome = key === 'home'
  const title = isHome
    ? page.title
    : `${page.title} · ${site.shortName}`
  const canonical = absoluteUrl(page.path)
  const image = absoluteUrl(site.ogImagePath)
  const robots = page.index
    ? 'index, follow'
    : 'noindex, nofollow'

  return {
    key,
    path: page.path,
    heading: page.heading,
    breadcrumb: page.breadcrumb,
    title,
    description: page.description,
    canonical,
    robots,
    keywords: [...site.keywords],
    hreflang: [
      { hrefLang: site.language, href: canonical },
      { hrefLang: 'x-default', href: canonical },
    ],
    openGraph: {
      type: isHome ? 'website' : 'article',
      locale: site.ogLocale,
      siteName: site.brand,
      title,
      description: page.description,
      url: canonical,
      image,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description: page.description,
      image: absoluteUrl(site.twitterImagePath),
    },
  }
}

export function organizationId() {
  return `${site.url}/#organization`
}

export function websiteId() {
  return `${site.url}/#website`
}

export function applicationId() {
  return `${site.url}/#application`
}

export function organizationGraph() {
  const logoUrl = absoluteUrl(site.logoPath)
  return {
    '@type': 'Organization',
    '@id': organizationId(),
    name: site.brand,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    description: site.description,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
    },
    image: logoUrl,
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    availableLanguage: [site.uiLanguage, site.contentLanguage],
    knowsAbout: [
      'Avyakt Murli',
      'Avyakt Vaani',
      'Brahma Kumaris',
      'Hindi murli',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: site.email,
      availableLanguage: [site.uiLanguage, site.contentLanguage],
    },
    brand: {
      '@type': 'Brand',
      name: site.brand,
    },
    sameAs: [...site.sameAs],
  }
}

export function websiteGraph() {
  return {
    '@type': 'WebSite',
    '@id': websiteId(),
    url: site.url,
    name: site.brand,
    description: site.description,
    inLanguage: site.language,
    publisher: { '@id': organizationId() },
  }
}

export function webApplicationGraph() {
  return {
    '@type': 'WebApplication',
    '@id': applicationId(),
    name: site.brand,
    url: site.url,
    description: site.description,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    featureList: [...site.featureList],
    inLanguage: ['en', 'hi'],
    countriesSupported: site.geoRegion,
    publisher: { '@id': organizationId() },
  }
}

export function faqPageGraph() {
  return {
    '@type': 'FAQPage',
    '@id': `${site.url}/#faq`,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function breadcrumbGraph(key: PageKey) {
  const meta = pageMetadata(key)
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: site.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pages[key].breadcrumb || pages[key].heading,
        item: meta.canonical,
      },
    ],
  }
}

export function contactPageGraph() {
  return {
    '@type': 'ContactPage',
    '@id': `${absoluteUrl('/about')}#contact`,
    url: absoluteUrl('/about'),
    name: 'Contact Avyakt Murli Reader',
    description: pages.about.description,
    mainEntity: { '@id': organizationId() },
  }
}

export function globalJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationGraph(), websiteGraph(), webApplicationGraph()],
  }
}
