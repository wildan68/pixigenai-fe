import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NextUIProvider } from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import { Provider } from 'react-redux';
import stores from '@stores/index';
import './styles/css/main.css'
import './styles/scss/index.scss'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <NextUIProvider>
    <NextThemesProvider defaultTheme='dark'>
      <Provider store={stores}>
        <App />
      </Provider>
    </NextThemesProvider>
  </NextUIProvider>
  // </React.StrictMode>,
)
