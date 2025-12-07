import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Inter', 'Cairo', 'sans-serif'],
        arabic: ['Cairo', 'Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // Enable RTL support
  darkMode: 'class',
  variants: {
    extend: {
      textAlign: ['rtl'],
      float: ['rtl'],
      margin: ['rtl'],
      padding: ['rtl'],
      inset: ['rtl'],
    },
  },
}

export default config
