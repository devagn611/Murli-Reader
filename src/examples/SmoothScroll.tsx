import React, { useState, useEffect } from 'react';
import { ReactReader } from '../../lib/index';
import type { Contents, Rendition } from 'epubjs';
import { Select, Flex, Box, Card } from '@radix-ui/themes';

interface Book {
  href: string;
  name: string;
  description: string;
}

const BookDropdown: React.FC<{
  books: Book[];
  onSelect: (book: Book) => void;
}> = ({ books, onSelect }) => {
  const handleSelect = (value: string) => {
    const selectedBook = books.find((book) => book.href === value);
    if (selectedBook) {
      onSelect(selectedBook);
    }
  };

  return (
    <Select.Root onValueChange={handleSelect}>
      <Select.Trigger placeholder="Select a Book" />
      <Select.Content>
        {books.map((book) => (
          <Select.Item key={book.href} value={book.href}>
            {book.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export const SmoothScroll: React.FC = () => {
  const [location, setLocation] = useState<string | number>(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('/files/data.json')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.cards);
        setSelectedBook(data.cards[0]);
      })
      .catch((error) => console.error('Error loading books:', error));
  }, []);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setLocation(0);
  };

  return (
    <Card>
      <Flex direction="column" gap="4" align="center">
        <BookDropdown books={books} onSelect={handleBookSelect} />
        <Box style={{ height: 'calc(100vh - 150px)', width: '100%' }}>
          {selectedBook && (
            <ReactReader
              key={selectedBook.href}
              url={selectedBook.href}
              location={location}
              locationChanged={(loc: string) => setLocation(loc)}
              epubOptions={{
                flow: 'scrolled',
                manager: 'continuous',
              }}
              getRendition={(_rendition: Rendition) => {
                _rendition.hooks.content.register((contents: Contents) => {
                  // @ts-ignore - manager type is missing in epubjs Rendition
                  _rendition.manager.container.style['scroll-behavior'] =
                    'smooth';
                });
              }}
            />
          )}
        </Box>
      </Flex>
    </Card>
  );
};
