import React, { useState, useRef, useEffect } from 'react';
import { ReactReader } from '../../lib/index';
import type { Rendition } from 'epubjs';
import {
  Select,
  Flex,
  Button,
  Box,
  Card,
  Heading,
} from '@radix-ui/themes';
import { PageMeta } from '../components/PageMeta';
import { catalogBooks, publicFileUrl, type CatalogBook } from '../content/catalog';
import { pages } from '../content/site';

const BookDropdown: React.FC<{
  books: CatalogBook[];
  onSelect: (_book: CatalogBook) => void;
}> = ({ books, onSelect }) => {
  const handleSelect = (value: string) => {
    const selectedBook = books.find((book) => book.filename === value);
    if (selectedBook) {
      onSelect(selectedBook);
    }
  };

  return (
    <Select.Root onValueChange={handleSelect} defaultValue={books[0]?.filename}>
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

export const Scroll: React.FC = () => {
  const [largeText, setLargeText] = useState(false);
  const rendition = useRef<Rendition | undefined>(undefined);
  const [selectedBook, setSelectedBook] = useState<CatalogBook>(catalogBooks[0]);
  const [location, setLocation] = useState<string | number | null>(null);

  useEffect(() => {
    if (rendition.current) {
      rendition.current.themes.fontSize(largeText ? '140%' : '100%');
    }
  }, [largeText]);

  const handleBookSelect = (book: CatalogBook) => {
    setSelectedBook(book);
  };

  return (
    <>
      <PageMeta page="scroll" />
      <Heading as="h1" size="6" mb="3">
        {pages.scroll.heading}
      </Heading>
      <Card>
        <Flex direction="column" gap="4" align="center">
          <Flex gap="4" align="center">
            <BookDropdown books={catalogBooks} onSelect={handleBookSelect} />
            <Button onClick={() => setLargeText(!largeText)}>
              Toggle font size
            </Button>
          </Flex>

          <Box style={{ height: 'calc(100vh - 150px)', width: '100%' }}>
            {selectedBook && (
              <ReactReader
                key={selectedBook.filename}
                url={publicFileUrl(`files/${selectedBook.filename}`)}
                location={location}
                locationChanged={(loc) => setLocation(loc)}
                getRendition={(_rendition: Rendition) => {
                  rendition.current = _rendition;
                  rendition.current.themes.fontSize(largeText ? '140%' : '100%');
                }}
                epubOptions={{
                  flow: 'scrolled',
                  manager: 'continuous',
                }}
              />
            )}
          </Box>
        </Flex>
      </Card>
    </>
  );
};
