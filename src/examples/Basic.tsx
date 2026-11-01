import React, { useState, useRef, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { ReactReader } from "../../lib/index";
import type { Rendition } from "epubjs";
import { Select } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight, CircleHelp, Info, List, Moon, Sun, Type } from "lucide-react";
import { FaqSection } from "../components/FaqSection";
import { JsonLd } from "../components/JsonLd";
import { PageMeta } from "../components/PageMeta";
import { ReaderGuide } from "../components/ReaderGuide";
import { catalogBooks, publicFileUrl, type CatalogBook } from "../content/catalog";
import { faqPageGraph } from "../content/seo";
import { pages, readerGuide, site } from "../content/site";
import { useAppearance } from "../context/Appearance";
import { applyReaderTheme } from "../lib/applyReaderTheme";

const GUIDE_STORAGE_KEY = "murli-guide-seen";
const HIDE_MS = 4500;

function readGuideSeen() {
  try {
    return localStorage.getItem(GUIDE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function isFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

export const Basic: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useAppearance();
  const [largeText, setLargeText] = useState(false);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [guideOpen, setGuideOpen] = useState(() => !readGuideSeen());
  const [selectOpen, setSelectOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const rendition = useRef<Rendition | undefined>(undefined);
  const [location, setLocation] = useState<string | number>(0);
  const [selectedBook, setSelectedBook] = useState<CatalogBook>(catalogBooks[0]);
  const readerRef = useRef<ReactReader>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hoveringChrome = useRef(false);
  const blockHide = useRef(false);

  blockHide.current = guideOpen || selectOpen || tocOpen;

  const scheduleHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!blockHide.current && !hoveringChrome.current) {
        setChromeVisible(false);
      }
    }, HIDE_MS);
  };

  const revealChrome = () => {
    setChromeVisible(true);
    scheduleHide();
  };

  useEffect(() => {
    revealChrome();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    if (rendition.current) {
      applyReaderTheme(rendition.current, isDarkMode, largeText);
    }
  }, [isDarkMode, largeText]);

  useEffect(() => {
    if (guideOpen || selectOpen || tocOpen) {
      setChromeVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    } else {
      scheduleHide();
    }
  }, [guideOpen, selectOpen, tocOpen]);

  const handleBookSelect = (filename: string) => {
    const nextBook = catalogBooks.find((book) => book.filename === filename);
    if (!nextBook) return;
    setSelectedBook(nextBook);
    setLocation(0);
    revealChrome();
  };

  const onPrev = () => {
    readerRef.current?.prev();
  };

  const onNext = () => {
    readerRef.current?.next();
  };

  const openGuide = () => {
    setGuideOpen(true);
    setChromeVisible(true);
  };

  const handleGuideChange = (open: boolean) => {
    setGuideOpen(open);
    if (!open) {
      try {
        localStorage.setItem(GUIDE_STORAGE_KEY, "1");
      } catch {
        // Guide still closes for this session.
      }
      revealChrome();
    }
  };

  const onChromeEnter = () => {
    hoveringChrome.current = true;
    setChromeVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const onChromeLeave = () => {
    hoveringChrome.current = false;
    scheduleHide();
  };

  const onStageMouseMove = () => {
    if (isFinePointer()) {
      revealChrome();
    }
  };

  const onStageTouchStart = () => {
    revealChrome();
  };

  const swipe = useSwipeable({
    onSwipedLeft: () => onNext(),
    onSwipedRight: () => onPrev(),
    trackMouse: false,
    delta: 40,
  });

  return (
    <>
      <PageMeta page="home" />
      <JsonLd data={{ "@context": "https://schema.org", ...faqPageGraph() }} />
      <ReaderGuide open={guideOpen} onOpenChange={handleGuideChange} />
      <div className={`reader-shell${chromeVisible ? "" : " reader-chrome-hidden"}`}>
        <h1 className="sr-only">{pages.home.heading}</h1>
        <section
          className={`reader-stage${tocOpen ? " toc-open" : ""}`}
          aria-label="Murli reader"
          onMouseMove={onStageMouseMove}
          onTouchStart={onStageTouchStart}
        >
          {selectedBook && (
            <ReactReader
              ref={readerRef}
              key={selectedBook.filename}
              url={publicFileUrl(`files/${selectedBook.filename}`)}
              location={location}
              locationChanged={(epubcifi: string) => setLocation(epubcifi)}
              showArrows={false}
              showTocToggle={false}
              onTocOpenChange={setTocOpen}
              epubOptions={{
                flow: "paginated",
              }}
              getRendition={(_rendition: Rendition) => {
                rendition.current = _rendition;
                applyReaderTheme(_rendition, isDarkMode, largeText);
              }}
            />
          )}

          <div
            className={`reader-hit-layer${chromeVisible ? " is-inset" : ""}`}
            {...swipe}
          >
            <button
              type="button"
              className="reader-hit"
              aria-label="Previous page"
              onClick={onPrev}
            />
            <button
              type="button"
              className="reader-hit"
              aria-label={chromeVisible ? "Hide controls" : "Show controls"}
              onClick={() => {
                if (chromeVisible) {
                  setChromeVisible(false);
                  if (hideTimer.current) clearTimeout(hideTimer.current);
                } else {
                  revealChrome();
                }
              }}
            />
            <button
              type="button"
              className="reader-hit"
              aria-label="Next page"
              onClick={onNext}
            />
          </div>

          <div className="reader-hint reader-hint-left" aria-hidden="true">
            <ChevronLeft size={18} />
          </div>
          <div className="reader-hint reader-hint-right" aria-hidden="true">
            <ChevronRight size={18} />
          </div>

          <header
            className="reader-topbar"
            onMouseEnter={onChromeEnter}
            onMouseLeave={onChromeLeave}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <RouterLink to="/" className="reader-wordmark">
              {site.shortName}
            </RouterLink>

            <span className="reader-divider reader-divider-brand" aria-hidden="true" />

            <Select.Root
              value={selectedBook.filename}
              onOpenChange={setSelectOpen}
              onValueChange={handleBookSelect}
            >
              <Select.Trigger
                className="reader-year-trigger"
                aria-label="Select year"
              />
              <Select.Content className="reader-popover" position="popper" sideOffset={8}>
                {catalogBooks.map((book) => (
                  <Select.Item key={book.filename} value={book.filename}>
                    {book.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            <span className="reader-divider" aria-hidden="true" />

            <div className="reader-tool-cluster" role="toolbar" aria-label="Reading tools">
              <button
                type="button"
                className={`reader-icon-btn${largeText ? " is-on" : ""}`}
                aria-label={largeText ? "Use regular text size" : "Use larger text"}
                onClick={() => setLargeText((value) => !value)}
              >
                <Type size={16} />
              </button>
              <button
                type="button"
                className={`reader-icon-btn${tocOpen ? " is-on" : ""}`}
                aria-label="Open table of contents"
                onClick={() => readerRef.current?.toggleToc()}
              >
                <List size={16} />
              </button>
              <button
                type="button"
                className="reader-icon-btn"
                aria-label="Toggle dark mode"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                type="button"
                className="reader-icon-btn"
                aria-label={`${readerGuide.helpLabel} / મદદ`}
                onClick={openGuide}
              >
                <CircleHelp size={16} />
              </button>
            </div>

            <span className="reader-divider reader-divider-about" aria-hidden="true" />

            <RouterLink to="/about" className="reader-about-link" aria-label="About">
              <Info className="reader-about-icon" size={16} />
              <span className="reader-about-text">About</span>
            </RouterLink>
          </header>
        </section>
        <div className="reader-faq">
          <FaqSection />
        </div>
      </div>
    </>
  );
};
