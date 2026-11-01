import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type AppearanceContextValue = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const AppearanceContext = createContext<AppearanceContextValue | null>(null)

function readDarkMode() {
  try {
    const storedValue = localStorage.getItem('darkMode')
    return storedValue !== null ? JSON.parse(storedValue) === true : false
  } catch {
    return false
  }
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(readDarkMode)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode
      try {
        localStorage.setItem('darkMode', JSON.stringify(newMode))
      } catch {
        // Appearance still updates for this session.
      }
      return newMode
    })
  }, [])

  const value = useMemo(
    () => ({ isDarkMode, toggleDarkMode }),
    [isDarkMode, toggleDarkMode]
  )

  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  )
}

export function useAppearance() {
  const value = useContext(AppearanceContext)
  if (!value) {
    throw new Error('useAppearance must be used within AppearanceProvider')
  }
  return value
}
