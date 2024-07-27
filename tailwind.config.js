/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bases: '#1E272E'
      }
    },
  },
  darkMode: 'class',
  plugins: [nextui({
    addCommonColors: true,
    layout: {
      fontSize: {
        tiny: '0.75rem', // text-tiny
        small: '0.875rem', // text-small
        medium: '1rem', // text-medium
        large: '1.125rem', // text-large
      },
      borderWidth: {
        small: '1px', // border-small
        medium: '1px', // border-medium
        large: '2px', // border-large
      },
    },
    themes: {
      dark: {
        colors: {
          background: '#161B20',
          primary: {
            DEFAULT: '#02E644',
            foreground: '#161B20'
          },
        }
      },
      light: {
        colors: {
          background: '#fff',
          primary: {
            DEFAULT: '#02E644',
            foreground: '#161B20'
          }
        }
      }
    }
  })]
}

