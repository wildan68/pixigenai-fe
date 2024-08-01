import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import stores from '@stores/index'
import App from '@/App'
import ReactDOM from 'react-dom/client'

describe('Main Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.createRoot(div).render(
      <Provider store={stores}>
        <NextUIProvider>
          <NextThemesProvider defaultTheme='dark'>
            <App />
          </NextThemesProvider>
        </NextUIProvider>
      </Provider>
    )
  })
})