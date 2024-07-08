import React, { useState, useEffect } from 'react'

interface Book {
  href: string;
  name: string;
  description: string;
}

interface SetBookProps {
  setSelectedBook: (book: Book) => void;
}

function SetBook({ setSelectedBook }: SetBookProps) {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    fetch('/files/data.json')
      .then(response => response.json())
      .then(data => setBooks(data.cards))
      .catch(error => console.error('Error loading books:', error))
  }, [])

  const handleBookChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBookIndex = parseInt(event.target.value)
    if (!isNaN(selectedBookIndex) && selectedBookIndex >= 0 && selectedBookIndex < books.length) {
      const selectedBook = books[selectedBookIndex]
      setSelectedBook({
        href: selectedBook.href,
        name: selectedBook.name,
        description: selectedBook.description
      })
    } else {
      setSelectedBook({ href: '', name: '', description: '' })
    }
  }

  return (
    <div className="p-[8px]">
      <select onChange={handleBookChange}>
        <option value="">Select a book</option>
        {books.map((book, index) => (
          <option key={index} value={index}>
            {book.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SetBook