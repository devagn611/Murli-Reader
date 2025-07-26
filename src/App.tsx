import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  Theme,
  Flex,
  Button,
  IconButton,
  Separator,
  Link,
  Text,
  Box,
} from '@radix-ui/themes';
import { Sun, Moon, Menu, Github, Heart } from 'lucide-react';

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

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedValue = localStorage.getItem('darkMode');
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode: boolean) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <Theme appearance={isDarkMode ? 'dark' : 'light'}>
        <Flex direction="column" className="min-h-screen">
          <Box className="p-4">
            <Flex direction="column" gap="4" className="max-w-6xl mx-auto">
              <header className="flex flex-wrap items-center justify-between gap-4 py-4 border-b">
                <Link href="/">
                  <img
                    src="https://asset.brandfetch.io/idnGDhwQlH/id8fL_C_QF.png?updated=1717983438863"
                    alt="Avyakt Murli Reader"
                    className="w-40 h-auto"
                  />
                </Link>
                <Flex align="center" gap="4" className="md:hidden">
                  <IconButton
                    onClick={toggleNav}
                    aria-label="Toggle navigation"
                    variant="ghost"
                  >
                    <Menu />
                  </IconButton>
                </Flex>
                <nav
                  className={`w-full md:w-auto ${
                    isNavOpen ? 'flex' : 'hidden'
                  } md:flex flex-col md:flex-row items-center justify-center gap-4`}
                >
                  {[
                    ['Basic', '/'],
                    // ['Smooth Scroll', '/smooth-scroll'],
                    // ['Scroll', '/scroll'],
                    ['About', '/about'],
                  ].map(([label, link], key) => (
                    <Button asChild variant="ghost" key={key}>
                      <NavLink to={link} onClick={() => setIsNavOpen(false)}>
                        {label}
                      </NavLink>
                    </Button>
                  ))}
                  <IconButton
                    onClick={toggleDarkMode}
                    aria-label="Toggle dark mode"
                    variant="soft"
                  >
                    {isDarkMode ? <Sun /> : <Moon />}
                  </IconButton>
                </nav>
              </header>
              <main className="flex-grow">
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/scroll" element={<Scroll />} />
                    <Route path="/smooth-scroll" element={<SmoothScroll />} />
                    <Route path="*" element={<Basic />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </Suspense>
              </main>
            </Flex>
          </Box>
          <footer className="text-center py-4 mt-auto">
            <Separator size="4" />
            <Box pt="4">
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
                <Text weight="bold" size="4">
                  {time.toLocaleTimeString()}
                </Text>
                <Text size="3" color="gray" weight="medium">
                  Om Shanti
                </Text>
              </Flex>
              <Flex justify="center" align="center" gap="4" mt="4">
                <Text size="2">
                  Created by{' '}
                  <Link
                    href="http://github.com/devagn611"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Devagn Maniya
                  </Link>
                </Text>
                <Link
                  href="https://github.com/devagn611/Murli-Reader"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton variant="ghost">
                    <Github />
                  </IconButton>
                </Link>
              </Flex>
            </Box>
          </footer>
        </Flex>
      </Theme>
    </BrowserRouter>
  );
};

export default App;