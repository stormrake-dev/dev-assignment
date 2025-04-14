import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import './index.css'
import App from './App.tsx'

const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
  defaultColorScheme: "dark",
  palette: {
    mode: 'dark',
    background: {
      default: '#242424',
      paper: '#1a1a1a',
    },
    primary: {
      main: '#646cff',
    },
    secondary: {
      main: '#535bf2',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
