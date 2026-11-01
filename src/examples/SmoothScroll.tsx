import React, { useState, useEffect } from 'react';
import { ReactReader } from '../../lib/index';
import type { Rendition } from 'epubjs';
import { Select, Flex, Box, Card, Heading } from '@radix-ui/themes';
import { PageMeta } from '../components/PageMeta';
import { publicFileUrl } from '../content/catalog';
import { pages } from '../content/site';

interface Book {
  href: string;
  name: string;
  description: string;
}

const BookDropdown: React.FC<{
  books: Book[];
  onSelect: (_book: Book) => void;
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

function bookHref(href: string) {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }
  return publicFileUrl(href);
}

export const SmoothScroll: React.FC = () => {
  const [location, setLocation] = useState<string | number>(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch(publicFileUrl('files/data.json'))
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
    <>
      <PageMeta page="smoothScroll" />
      <Heading as="h1" size="6" mb="3">
        {pages.smoothScroll.heading}
      </Heading>
      <Card>
        <Flex direction="column" gap="4" align="center">
          <BookDropdown books={books} onSelect={handleBookSelect} />
          <Box style={{ height: 'calc(100vh - 150px)', width: '100%' }}>
            {selectedBook && (
              <ReactReader
                key={selectedBook.href}
                url={bookHref(selectedBook.href)}
                location={location}
                locationChanged={(loc: string) => setLocation(loc)}
                epubOptions={{
                  flow: 'scrolled',
                  manager: 'continuous',
                }}
                getRendition={(_rendition: Rendition) => {
                  _rendition.hooks.content.register(() => {
                    const manager = (
                      _rendition as Rendition & {
                        manager?: { container?: { style: Record<string, string> } }
                      }
                    ).manager;
                    if (manager?.container) {
                      manager.container.style['scroll-behavior'] = 'smooth';
                    }
                  });
                }}
              />
            )}
          </Box>
        </Flex>
      </Card>
    </>
  );
};
