import React, { useState, useEffect } from 'react'
import { ReactReader } from '../../lib/index'
import type { Contents,Rendition } from 'epubjs'

import { Example } from '../components/Example'
import SetBook from './SetBook'

interface Book {
  href: string;
  name: string;
  description: string;
}
export const SmoothScroll = () => {
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
      title="Reader - Smooth"
      actions={
        <>
        <SetBook setSelectedBook={setSelectedBook} />
        {/* <p>
          Sets css-property for epub-js manager to{' '}
          <kbd>scroll-behavior: smooth</kbd>
        </p> */}
        </>
      }
    >
     {getCurrentUrl() ? (
        <ReactReader
          url={getCurrentUrl()}
          title={selectedBook.name}
          location={location}
          locationChanged={(loc: string) => setLocation(loc)}
          getRendition={(_rendition: Rendition) => {
            _rendition.hooks.content.register((contents: Contents) => {
              // @ts-ignore - manager type is missing in epubjs Rendition
              _rendition.manager.container.style['scroll-behavior'] = 'smooth'
            })
          }}
        />
      ) : (
        <div>Please select a book to read.</div>
      )}
    </Example>
  )
}
