export const site = {
  brand: 'Avyakt Murli Reader',
  shortName: 'Murli Reader',
  legalName: 'Avyakt Murli Reader',
  url: 'https://avyakt-murli-reader.devagn.com',
  domain: 'avyakt-murli-reader.devagn.com',
  language: 'en-IN',
  ogLocale: 'en_IN',
  htmlLang: 'en-IN',
  geoRegion: 'IN',
  geoPlacename: 'Gariyadhar',
  email: 'devagnmaniya611@gmail.com',
  author: 'Devagn Maniya',
  authorUrl: 'https://github.com/devagn611',
  githubUrl: 'https://github.com/devagn611/Murli-Reader',
  themeColor: '#111111',
  backgroundColor: '#ffffff',
  logoPath: '/mark.svg',
  ogImagePath: '/opengraph-image.png',
  twitterImagePath: '/twitter-image.png',
  headerLogoSrc:
    'https://asset.brandfetch.io/idnGDhwQlH/id8fL_C_QF.png?updated=1717983438863',
  sameAs: ['https://github.com/devagn611/Murli-Reader'] as const,
  bookCount: 49,
  yearStart: 1969,
  yearEnd: 2017,
  uiLanguage: 'English',
  contentLanguage: 'Hindi',
  punchline: 'Om Shanti. Read Avyakt Murlis with clarity.',
  tagline: 'Easy, accessible Hindi Avyakt Murli reading for Brahma Kumaris students.',
  description:
    'Read Hindi Avyakt Murlis from 1969 to 2017. Avyakt Murli Reader helps Brahma Kumaris students study Avyakt Vaani with large text and simple page turns.',
  applicationName: 'Avyakt Murli Reader',
  classification: 'Education, Spiritual study, Avyakt Murli reader',
  keywords: [
    'Avyakt Murli Reader',
    'Avyakt Murli',
    'Avyakt Vaani',
    'Brahma Kumaris murli',
    'Hindi murli reader',
    'BK Gariyadhar',
    'murli 1969 to 2017',
  ],
  featureList: [
    'Hindi Avyakt Vaani volumes from 1969 to 2017',
    'Year picker to open a book',
    'Tap the sides or swipe to turn pages',
    'Tap the center to show or hide the menu',
    'Font-size toggle for larger text',
    'Light and dark appearance',
    'On-screen navigation tips',
  ],
  audiences: ['Brahma Kumaris students'],
  nav: [
    { label: 'Read', path: '/' },
    { label: 'About', path: '/about' },
  ],
} as const

export const faqItems = [
  {
    question: 'What is Avyakt Murli Reader?',
    answer:
      'Avyakt Murli Reader is a web reader for Hindi Avyakt Murlis. It is dedicated to Brahma Kumaris students who want an easy way to read Avyakt Vaani.',
  },
  {
    question: 'Who is Avyakt Murli Reader for?',
    answer:
      'It is for students of Brahma Kumaris. The site was created by Devagn Maniya, a kumar of BK Gariyadhar.',
  },
  {
    question: 'Which years of Avyakt Murlis are included?',
    answer:
      'The reader includes 49 Hindi Avyakt Vaani volumes covering 1969 to 2017.',
  },
  {
    question: 'What language are the murlis in?',
    answer:
      'The murli text is in Hindi. The reader interface is in English.',
  },
  {
    question: 'How do I turn pages?',
    answer:
      'Tap the right side of the page for the next page, or the left side for the previous page. You can also swipe. Tap the center to show or hide the menu.',
  },
  {
    question: 'Can I make the text larger?',
    answer:
      'Yes. Tap the center to show the menu, then tap Aa to switch between regular and larger text.',
  },
  {
    question: 'How do I contact the creator?',
    answer:
      'Email Devagn Maniya at devagnmaniya611@gmail.com, or open the About page on Avyakt Murli Reader.',
  },
] as const

export const readerGuide = {
  titleEn: 'How to read',
  titleGu: 'કેવી રીતે વાંચવું',
  closeEn: 'Start reading',
  closeGu: 'વાંચવાનું શરૂ કરો',
  helpLabel: 'Help',
  menuEn: 'Menu',
  menuGu: 'મેનૂ',
  english: [
    'Tap the right side, or swipe left, for the next page.',
    'Tap the left side, or swipe right, for the previous page.',
    'On a phone, touch the page to show the menu. On a computer, move the cursor. Tap the center to hide it.',
    'Choose a year to open that Avyakt Murli.',
    'Aa makes the text larger or smaller.',
    'The list button opens the table of contents.',
  ],
  gujarati: [
    'આગળનું પાનું: જમણી બાજુ ટેપ કરો, અથવા ડાબે સ્વાઇપ કરો.',
    'પાછળનું પાનું: ડાબી બાજુ ટેપ કરો, અથવા જમણે સ્વાઇપ કરો.',
    'ફોન પર મેનૂ બતાવવા પેજને ટચ કરો. કમ્પ્યુટર પર કર્સર ખસેડો. છુપાવવા મધ્યમાં ટેપ કરો.',
    'વર્ષ પસંદ કરીને તે વર્ષની અવ્યક્ત મુરલી ખોલો.',
    'Aa થી અક્ષર મોટા કે નાના કરો.',
    'યાદીના બટનથી અનુક્રમણિકા ખુલે છે.',
  ],
} as const

export type PageKey = 'home' | 'about' | 'scroll' | 'smoothScroll' | 'notFound'

export const pages: Record<
  PageKey,
  {
    path: string
    title: string
    description: string
    index: boolean
    heading: string
    breadcrumb?: string
  }
> = {
  home: {
    path: '/',
    title: 'Avyakt Murli Reader — Hindi Avyakt Murlis 1969–2017',
    description: site.description,
    index: true,
    heading: 'Read Avyakt Murlis',
  },
  about: {
    path: '/about',
    title: 'About & contact',
    description:
      'About Avyakt Murli Reader: 49 Hindi Avyakt Vaani books from 1969 to 2017 for Brahma Kumaris students. Contact Devagn Maniya at devagnmaniya611@gmail.com.',
    index: true,
    heading: 'About Murli Reader',
    breadcrumb: 'About',
  },
  scroll: {
    path: '/scroll',
    title: 'Scroll reader',
    description: site.description,
    index: false,
    heading: 'Scroll reader',
    breadcrumb: 'Scroll',
  },
  smoothScroll: {
    path: '/smooth-scroll',
    title: 'Smooth scroll reader',
    description: site.description,
    index: false,
    heading: 'Smooth scroll reader',
    breadcrumb: 'Smooth scroll',
  },
  notFound: {
    path: '/404',
    title: 'Page not found',
    description: 'This page is not part of Avyakt Murli Reader. Return home to read Hindi Avyakt Murlis from 1969 to 2017.',
    index: false,
    heading: 'Page not found',
    breadcrumb: 'Not found',
  },
}

export const aboutCopy = {
  intro:
    'Om Shanti. This application is dedicated to the students of Brahma Kumaris, providing an easy and accessible way to read Avyakt Murlis.',
  booksLabel: 'Total Books',
  yearsLabel: 'Content from',
  contactHeading: 'Contact & Contributions',
  githubLabel: 'View on GitHub',
} as const
