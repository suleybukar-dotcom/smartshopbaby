/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fdfcf8',
          100: '#faf7f0',
          200: '#f5efe0',
        },
        sage: {
          400: '#8aab89',
          500: '#6d8f6c',
          600: '#567055',
        },
        ink: {
          900: '#1a1a1a',
          800: '#2d2d2d',
          600: '#4a4a4a',
          400: '#6b6b6b',
          200: '#a0a0a0',
        },
        warm: {
          500: '#c9826b',
          400: '#d99a85',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            color: '#2d2d2d',
            a: {
              color: '#6d8f6c',
              '&:hover': { color: '#567055' },
            },
            h2: { color: '#1a1a1a', fontWeight: '700' },
            h3: { color: '#1a1a1a', fontWeight: '600' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
