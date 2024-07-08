import React, { useState, useEffect, useRef } from 'react'
import { ReactReader } from '../../lib/index'
import type { Rendition } from 'epubjs'

import { Example } from '../components/Example'
import SetBook from './SetBook'


interface Book {
  filename: string;
  name: string;
}

const BookDropdown: React.FC<{
  books: Book[];
  onSelect: (book: Book) => void;
}> = ({ books, onSelect }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBook = books.find(
      (book) => book.filename === event.target.value
    );
    if (selectedBook) {
      onSelect(selectedBook);
    }
  };

  return (
    <select
      onChange={handleChange}
      className="book-dropdown p-2 bg-gray-900 text-white rounded-xl"
    >
      <option value="" disabled selected>
        Select a Book
      </option>
      {books.map((book) => (
        <option key={book.filename} value={book.filename}>
          {book.name}
        </option>
      ))}
    </select>
  );
};

export const Scroll: React.FC = () => {
  const [largeText, setLargeText] = useState(false);
  const rendition = useRef<Rendition | undefined>(undefined);
  const [location, setLocation] = useState<string | number>(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // This function would typically be an API call to your backend
    // For this example, we're simulating it with a local array
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
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    rendition.current?.themes.fontSize(largeText ? "140%" : "100%");
  }, [largeText]);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setLocation(0); // Reset location when a new book is selected
  };

  return (
    <Example
      title="Avyakt Murli Reader"
      actions={
        <>
          <button
            onClick={() => setLargeText(!largeText)}
            className="btn border-2 border-black rounded-lg bg-transparent text-black py-2 px-4"
          >
            Toggle Font Size
          </button>
          <a
            href=""
            className="ml-4 text-black border-2 border-black rounded-lg bg-transparent py-2 px-4"
          >
            {" "}
            Change Books
          </a>
        </>
      }
    >
      {selectedBook ? (
        <ReactReader
          url={`/files/${selectedBook.filename}`}
          title={selectedBook.name}
          location={location}
          locationChanged={(loc: string) => setLocation(loc)}
          epubOptions={{
            flow: 'scrolled',
            manager: 'continuous',
          }}
        />
      ) : (
        <div className="book-selector text-center mt-10">
          Select Book From Here Year Wise
          <div className="mt-2">
            <BookDropdown books={books} onSelect={handleSelectBook} />
          </div>
        </div>
      )}
    </Example>
  );
};
