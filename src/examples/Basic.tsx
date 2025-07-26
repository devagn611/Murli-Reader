import React, { useState, useRef, useEffect } from "react";
import { ReactReader } from "../../lib/index";
import type { Rendition } from "epubjs";
import {
  Select,
  Flex,
  Button,
  Box,
  Card,
  Text,
  IconButton,
  Dialog,
  Theme,
} from "@radix-ui/themes";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

interface Book {
  filename: string;
  name: string;
}

const BookDropdown: React.FC<{
  books: Book[];
  onSelect: (book: Book) => void;
}> = ({ books, onSelect }) => {
  const handleSelect = (value: string) => {
    const selectedBook = books.find((book) => book.filename === value);
    if (selectedBook) {
      onSelect(selectedBook);
    }
  };

  return (
    <Select.Root onValueChange={handleSelect}>
      <Select.Trigger placeholder="Select a Book" />
      <Select.Content>
        {books.map((book) => (
          <Select.Item key={book.filename} value={book.filename}>
            {book.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export const Basic: React.FC = () => {
  const [largeText, setLargeText] = useState(false);
  const rendition = useRef<Rendition | undefined>(undefined);
  const [location, setLocation] = useState<string | number>(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const readerRef = useRef<ReactReader>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const localBooks = [
        { filename: "1969_Hindi_Avyakt_Vaani.epub", name: "1969" },
        { filename: "1970_Hindi_Avyakt_Vaani.epub", name: "1970" },
        { filename: "1971_Hindi_Avyakt_Vaani.epub", name: "1971" },
        { filename: "1972_Hindi_Avyakt_Vaani.epub", name: "1972" },
        { filename: "1973_Hindi_Avyakt_Vaani.epub", name: "1973" },
        { filename: "1974_Hindi_Avyakt_Vaani.epub", name: "1974" },
        { filename: "1975_Hindi_Avyakt_Vaani.epub", name: "1975" },
        { filename: "1976_Hindi_Avyakt_Vaani.epub", name: "1976" },
        { filename: "1977_Hindi_Avyakt_Vaani.epub", name: "1977" },
        { filename: "1978_Hindi_Avyakt_Vaani.epub", name: "1978" },
        { filename: "1979_Hindi_Avyakt_Vaani.epub", name: "1979" },
        { filename: "1980_Hindi_Avyakt_Vaani.epub", name: "1980" },
        { filename: "1981_Hindi_Avyakt_Vaani.epub", name: "1981" },
        { filename: "1982_Hindi_Avyakt_Vaani.epub", name: "1982" },
        { filename: "1983_Hindi_Avyakt_Vaani.epub", name: "1983" },
        { filename: "1984_Hindi_Avyakt_Vaani.epub", name: "1984" },
        { filename: "1985_Hindi_Avyakt_Vaani.epub", name: "1985" },
        { filename: "1986_Hindi_Avyakt_Vaani.epub", name: "1986" },
        { filename: "1987_Hindi_Avyakt_Vaani.epub", name: "1987" },
        { filename: "1988_Hindi_Avyakt_Vaani.epub", name: "1988" },
        { filename: "1989_Hindi_Avyakt_Vaani.epub", name: "1989" },
        { filename: "1990_Hindi_Avyakt_Vaani.epub", name: "1990" },
        { filename: "1991_Hindi_Avyakt_Vaani.epub", name: "1991" },
        { filename: "1992_Hindi_Avyakt_Vaani.epub", name: "1992" },
        { filename: "1993_Hindi_Avyakt_Vaani.epub", name: "1993" },
        { filename: "1994_Hindi_Avyakt_Vaani.epub", name: "1994" },
        { filename: "1995_Hindi_Avyakt_Vaani.epub", name: "1995" },
        { filename: "1996_Hindi_Avyakt_Vaani.epub", name: "1996" },
        { filename: "1997_Hindi_Avyakt_Vaani.epub", name: "1997" },
        { filename: "1998_Hindi_Avyakt_Vaani.epub", name: "1998" },
        { filename: "1999_Hindi_Avyakt_Vaani.epub", name: "1999" },
        { filename: "2000_Hindi_Avyakt_Vaani.epub", name: "2000" },
        { filename: "2001_Hindi_Avyakt_Vaani.epub", name: "2001" },
        { filename: "2002_Hindi_Avyakt_Vaani.epub", name: "2002" },
        { filename: "2003_Hindi_Avyakt_Vaani.epub", name: "2003" },
        { filename: "2004_Hindi_Avyakt_Vaani.epub", name: "2004" },
        { filename: "2005_Hindi_Avyakt_Vaani.epub", name: "2005" },
        { filename: "2006_Hindi_Avyakt_Vaani.epub", name: "2006" },
        { filename: "2007_Hindi_Avyakt_Vaani.epub", name: "2007" },
        { filename: "2008_Hindi_Avyakt_Vaani.epub", name: "2008" },
        { filename: "2009_Hindi_Avyakt_Vaani.epub", name: "2009" },
        { filename: "2010_Hindi_Avyakt_Vaani.epub", name: "2010" },
        { filename: "2011_Hindi_Avyakt_Vaani.epub", name: "2011" },
        { filename: "2012_Hindi_Avyakt_Vaani.epub", name: "2012" },
        { filename: "2013_Hindi_Avyakt_Vaani.epub", name: "2013" },
        { filename: "2014_Hindi_Avyakt_Vaani.epub", name: "2014" },
        { filename: "2015_Hindi_Avyakt_Vaani.epub", name: "2015" },
        { filename: "2016_Hindi_Avyakt_Vaani.epub", name: "2016" },
        { filename: "2017_Hindi_Avyakt_Vaani.epub", name: "2017" },
      ];
      setBooks(localBooks);
      setSelectedBook(localBooks[0]);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (rendition.current) {
      rendition.current.themes.fontSize(largeText ? "140%" : "100%");
    }
  }, [largeText]);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setLocation(0);
  };

  const onPrev = () => {
    readerRef.current?.prev();
  };

  const onNext = () => {
    readerRef.current?.next();
  };

  return (
    <Card>
      <Flex direction="column" gap="4" align="center">
        <Flex gap="4" align="center">
          <BookDropdown books={books} onSelect={handleBookSelect} />
          <Button onClick={() => setLargeText(!largeText)}>
            Toggle font size
          </Button>
          <Dialog.Root>
            <Dialog.Trigger>
              <IconButton>
                <Lightbulb />
              </IconButton>
            </Dialog.Trigger>
            <Theme>
              <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Navigation Tips</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                  You can navigate through the book in a few ways:
                </Dialog.Description>

                <Flex direction="column" gap="3">
                  <Text as="label">
                    <Flex gap="2" align="center">
                      <b>Swipe:</b> Swipe left or right to turn the page.
                    </Flex>
                  </Text>
                  <Text as="label">
                    <Flex gap="2" align="center">
                      <b>Buttons:</b> Use the arrow buttons on the sides to
                      navigate.
                    </Flex>
                  </Text>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Close
                    </Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Theme>
          </Dialog.Root>
        </Flex>

        <Box style={{ height: "calc(100vh - 150px)", width: "100%", position: 'relative' }}>
          {selectedBook && (
            <ReactReader
              ref={readerRef}
              key={selectedBook.filename}
              url={`/files/${selectedBook.filename}`}
              location={location}
              locationChanged={(epubcifi: string) => setLocation(epubcifi)}
              getRendition={(_rendition: Rendition) => {
                rendition.current = _rendition;
                rendition.current.themes.fontSize(largeText ? "140%" : "100%");
              }}
            />
          )}
           <Flex
            style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              justifyContent: 'space-between',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}
          >
            <IconButton
              onClick={onPrev}
              style={{ pointerEvents: 'all', marginLeft: '1rem' }}
              size="3"
              variant="classic"
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={onNext}
              style={{ pointerEvents: 'all', marginRight: '1rem' }}
              size="3"
              variant="classic"
            >
              <ChevronRight />
            </IconButton>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};
