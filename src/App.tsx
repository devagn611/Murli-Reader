import { BrowserRouter, Route, NavLink, Routes, Link as RouterLink, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import {
  Theme,
  Flex,
  Button,
  IconButton,
  Link,
  Text,
} from '@radix-ui/themes';
import { Sun, Moon, Github, Heart } from 'lucide-react';
import { JsonLd } from './components/JsonLd';
import { AppearanceProvider, useAppearance } from './context/Appearance';
import { globalJsonLd } from './content/seo';
import { site } from './content/site';

const Basic = lazy(() =>
  import('./examples/Basic').then((module) => ({ default: module.Basic }))
);
const Scroll = lazy(() =>
  import('./examples/Scroll').then((module) => ({ default: module.Scroll }))
);
const SmoothScroll = lazy(() =>
  import('./examples/SmoothScroll').then((module) => ({
    default: module.SmoothScroll,
  }))
);
const About = lazy(() => import('./examples/About'));
const NotFound = lazy(() => import('./examples/NotFound'));

function routerBasename() {
  const base = import.meta.env.BASE_URL;
  if (!base || base === '/') {
    return '/';
  }
  return base.replace(/\/$/, '');
}

const readerPaths = new Set(['/', '/scroll', '/smooth-scroll']);

function GlassHeader() {
  const { isDarkMode, toggleDarkMode } = useAppearance();

  return (
    <header className="site-header glass-panel">
      <RouterLink to="/" className="reader-wordmark" aria-label={`${site.brand} home`}>
        {site.shortName}
      </RouterLink>
      <nav id="site-nav" aria-label="Primary" className="flex items-center gap-2">
        {site.nav.map((item) => (
          <Button asChild variant="ghost" key={item.path}>
            <NavLink to={item.path}>{item.label}</NavLink>
          </Button>
        ))}
        <IconButton
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          variant="ghost"
          className="glass-pill"
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </IconButton>
      </nav>
    </header>
  );
}

function GlassFooter() {
  return (
    <footer className="site-footer glass-panel">
      <Flex direction="column" align="center" gap="2">
        <Flex align="center" gap="2">
          <Text size="2" color="gray">
            Made with Baba's blessing
          </Text>
          <Heart size={16} color="red" fill="red" />
          <Text size="2" color="gray">
            by a kumar of BK Gariyadhar
          </Text>
        </Flex>
        <Text size="3" color="gray" weight="medium">
          Om Shanti
        </Text>
      </Flex>
      <nav aria-label="Footer">
        <Flex justify="center" align="center" gap="4" mt="3">
          <Text size="2">
            Created by{' '}
            <Link
              href={site.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.author}
            </Link>
          </Text>
          <Link
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.brand} on GitHub`}
          >
            <IconButton variant="ghost" aria-label={`${site.brand} on GitHub`}>
              <Github />
            </IconButton>
          </Link>
        </Flex>
      </nav>
    </footer>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
      <Routes>
        <Route path="/" element={<Basic />} />
        <Route path="/about" element={<About />} />
        <Route path="/scroll" element={<Scroll />} />
        <Route path="/smooth-scroll" element={<SmoothScroll />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function AppShell() {
  const location = useLocation();
  const { isDarkMode } = useAppearance();
  const isReader = readerPaths.has(location.pathname);

  return (
    <Theme appearance={isDarkMode ? 'dark' : 'light'}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {isReader ? (
        <main id="main" tabIndex={-1}>
          <AppRoutes />
        </main>
      ) : (
        <div className="site-shell">
          <GlassHeader />
          <main id="main" className="site-main" tabIndex={-1}>
            <AppRoutes />
          </main>
          <GlassFooter />
        </div>
      )}
    </Theme>
  );
}

const App = () => {
  return (
    <BrowserRouter basename={routerBasename()}>
      <>
        <JsonLd data={globalJsonLd()} />
        <AppearanceProvider>
          <AppShell />
        </AppearanceProvider>
      </>
    </BrowserRouter>
  );
};

export default App;
