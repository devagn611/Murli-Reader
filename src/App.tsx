import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom'
import cx from 'classnames'
import React, { useState } from 'react'
import { Basic } from './examples/Basic'
import { Scroll } from './examples/Scroll'
import { SmoothScroll } from './examples/SmoothScroll'
import About from './examples/About'

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <BrowserRouter>
      <div className="relative h-full w-full min-h-screen bg-stone-100 p-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-4">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <a href="/" className="w-full md:w-[250px]">
              <img
                src="https://asset.brandfetch.io/idnGDhwQlH/id8fL_C_QF.png?updated=1717983438863"
                alt="Avyakt Murli Reader"
                width="330"
                height="104"
                className="w-60 h-auto block mx-auto"
              />
            </a>
            <button 
              className="md:hidden p-2" 
              onClick={toggleNav}
              aria-label="Toggle navigation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <nav className={`w-full md:w-auto ${isNavOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center justify-center gap-2`}>
              {[
                ['Basic', '/'],
                ['Smooth Scroll', '/smooth-scroll'],
                ['Scroll', '/scroll'],
                ['About', '/about'],
              ].map(([label, link], key) => ( 
                <NavLink
                  to={link}
                  key={key}
                  className={({ isActive }) =>
                    cx('hover:underline', { underline: isActive })
                  }
                  onClick={() => setIsNavOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/scroll" element={<Scroll />} />
              <Route path="/smooth-scroll" element={<SmoothScroll />} />
              <Route path="*" element={<Basic />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
        <div className='text-center'> Created by <a className="font-semibold text-blue" href="http://github.com/devagn611" target='_blank' rel="noopener noreferrer">Devagn Maniya</a> </div>
      </div>
    </BrowserRouter>
  )
}

export default App