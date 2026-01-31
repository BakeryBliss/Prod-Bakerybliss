/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        colors: {
          border: 'var(--color-border)', /* Primary with opacity */
          input: 'var(--color-input)', /* Input background */
          ring: 'var(--color-ring)', /* Focus ring */
          background: 'var(--color-background)', /* Warm off-white */
          foreground: 'var(--color-foreground)', /* Primary text */
          primary: {
            DEFAULT: 'var(--color-primary)', /* Warm golden brown */
            foreground: 'var(--color-primary-foreground)', /* Rich dark brown */
          },
          secondary: {
            DEFAULT: 'var(--color-secondary)', /* Soft cream */
            foreground: 'var(--color-secondary-foreground)', /* Medium dark brown */
          },
          accent: {
            DEFAULT: 'var(--color-accent)', /* Dusty rose */
            foreground: 'var(--color-accent-foreground)', /* Dark brown */
          },
          destructive: {
            DEFAULT: 'var(--color-destructive)', /* Muted coral red */
            foreground: 'var(--color-destructive-foreground)', /* White */
          },
          success: {
            DEFAULT: 'var(--color-success)', /* Sage green */
            foreground: 'var(--color-success-foreground)', /* Dark green */
          },
          warning: {
            DEFAULT: 'var(--color-warning)', /* Golden rod */
            foreground: 'var(--color-warning-foreground)', /* Dark gold */
          },
          error: {
            DEFAULT: 'var(--color-error)', /* Muted coral red */
            foreground: 'var(--color-error-foreground)', /* White */
          },
          muted: {
            DEFAULT: 'var(--color-muted)', /* Muted background */
            foreground: 'var(--color-muted-foreground)', /* Secondary text */
          },
          card: {
            DEFAULT: 'var(--color-card)', /* Elevated card background */
            foreground: 'var(--color-card-foreground)', /* On-surface text */
          },
          popover: {
            DEFAULT: 'var(--color-popover)', /* Popover background */
            foreground: 'var(--color-popover-foreground)', /* Popover text */
          },
        },
        borderRadius: {
          sm: 'var(--radius-sm)',
          md: 'var(--radius-md)',
          lg: 'var(--radius-lg)',
          xl: 'var(--radius-xl)',
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
        },
        fontFamily: {
          heading: ['Playfair Display', 'serif'],
          body: ['Source Sans 3', 'sans-serif'],
          caption: ['Nunito Sans', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
        fontSize: {
          'h1': ['2.75rem', { lineHeight: '1.15' }],
          'h2': ['2.25rem', { lineHeight: '1.2' }],
          'h3': ['1.75rem', { lineHeight: '1.25' }],
          'h4': ['1.375rem', { lineHeight: '1.3' }],
          'h5': ['1.125rem', { lineHeight: '1.4' }],
        },
        transitionTimingFunction: {
          'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        transitionDuration: {
          'smooth': '250ms',
        },
        boxShadow: {
          'warm-sm': '0 2px 4px var(--shadow-color)',
          'warm': '0 3px 6px var(--shadow-color)',
          'warm-md': '0 6px 12px var(--shadow-color)',
          'warm-lg': '0 12px 24px var(--shadow-color)',
          'warm-xl': '0 20px 40px var(--shadow-color)',
          'warm-2xl': '0 28px 56px -14px var(--shadow-color)',
        },
        keyframes: {
          'fade-in': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          'slide-in-from-top': {
            '0%': { transform: 'translateY(-100%)' },
            '100%': { transform: 'translateY(0)' },
          },
          'slide-in-from-bottom': {
            '0%': { transform: 'translateY(100%)' },
            '100%': { transform: 'translateY(0)' },
          },
          'slide-in-from-left': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(0)' },
          },
          'slide-in-from-right': {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(0)' },
          },
          'shimmer': {
            '0%': { backgroundPosition: '-1000px 0' },
            '100%': { backgroundPosition: '1000px 0' },
          },
          'zoom-in': {
            '0%': { transform: 'scale(1.05)', opacity: '0.8' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
        },
        animation: {
          'fade-in': 'fade-in 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          'slide-in-from-top': 'slide-in-from-top 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          'slide-in-from-bottom': 'slide-in-from-bottom 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          'slide-in-from-left': 'slide-in-from-left 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          'slide-in-from-right': 'slide-in-from-right 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          'shimmer': 'shimmer 2s infinite linear',
          'zoom-in': 'zoom-in 1.2s ease-out',
        },
        zIndex: {
          'dropdown': '50',
          'navigation': '100',
          'modal': '200',
          'toast': '300',
        },
      },
    },
    plugins: [],
  }