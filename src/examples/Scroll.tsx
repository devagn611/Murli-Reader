import React, { useState, useEffect } from 'react'
import { ReactReader } from '../../lib/index'
import type { Rendition } from 'epubjs'

import { Example } from '../components/Example'
import SetBook from './SetBook'

interface Book {
  href: string;
  name: string;
  description: string;
}

export const Scroll: React.FC = () => {
  const [location, setLocation] = useState<string | number>(0)
  const [selectedBook, setSelectedBook] = useState<Book>({ href: '', name: '', description: '' })
  const [currentChapterIndex, setCurrentChapterIndex] = useState(-1)
  const [isTitlePage, setIsTitlePage] = useState(true)

  useEffect(() => {
    if (selectedBook.href) {
      setCurrentChapterIndex(-1)
      setIsTitlePage(true)
    }
  }, [selectedBook])

  const handlePrevious = () => {
    if (currentChapterIndex > -1) {
      setCurrentChapterIndex(prevIndex => prevIndex - 1)
      if (currentChapterIndex === 0) {
        setIsTitlePage(true)
      }
    }
  }

  const handleNext = () => {
    if (isTitlePage) {
      setIsTitlePage(false)
      setCurrentChapterIndex(0)
    } else {
      setCurrentChapterIndex(prevIndex => prevIndex + 1)
    }
  }

  const getCurrentUrl = () => {
    if (selectedBook.href) {
      if (isTitlePage) {
        return `${selectedBook.href}/titlepage.xhtml`
      } else {
        const chapterNumber = currentChapterIndex.toString().padStart(3, '0')
        return `${selectedBook.href}/index_split_${chapterNumber}.html`
      }
    }
    return ''
  }

  return (
    <Example 
      title="Reader - Scroll"
      actions={
        <>
          <SetBook setSelectedBook={setSelectedBook} />
          <button onClick={handlePrevious} disabled={isTitlePage}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </>
      }
    >
      {getCurrentUrl() ? (
        <ReactReader
          url={getCurrentUrl()}
          title={selectedBook.name}
          location={location}
          locationChanged={(loc: string) => setLocation(loc)}
          epubOptions={{
            flow: 'scrolled',
            manager: 'continuous',
          }}
        />
      ) : (
        <div>Please select a book to read.</div>
      )}
    </Example>
  )
}