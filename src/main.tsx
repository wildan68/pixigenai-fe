import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NextUIProvider } from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import './styles/css/main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <NextThemesProvider defaultTheme='dark'>
        <App />
      </NextThemesProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
