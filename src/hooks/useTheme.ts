import { useContext } from 'react'
import { ThemeContext as StyledThemeContext } from 'styled-components'
import { useTheme as useNextTheme } from 'next-themes'

const useTheme = () => {
  const { resolvedTheme, setTheme } = useNextTheme()
  const theme = useContext(StyledThemeContext)
  // return { isDark: resolvedTheme === 'dark', theme, setTheme }
  setTheme('light')
  return { isDark: false, theme, setTheme }
}

export default useTheme
