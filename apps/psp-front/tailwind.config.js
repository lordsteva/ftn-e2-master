module.exports = {
  darkMode: false, // or 'media' or 'class'
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      whitesmoke:'#f5f5f5',
      'lightGray': '#c9c9c9',
      'gray': '#A9A9A9',
      'darkGray': '#666666',
      'dark': '#262626',
      red: '#e02020',
      primary: '#5fad5f'
    },
    fontSize: {
      h1: ['36px', '44px'],
      h2: ['32px', '44px'],
      h3: ['24px', '36px'],
      xxl: '36px',
      xl: '24px',
      lg: '18px',
      md: '16px',
      base: '14px',
      sm: '12px',
      xs: '10px',
      xxs: '8px'
    },
    borderWidth: {
      default: '1px',
      0: '0',
      2: '2px',
      4: '4px',
      8: '8px'
    },
    borderRadius: {
      none: '0',
      sm: '10px',
      md: '20px',
      full: '9999px'
    },
    margin: {
      auto: 'auto',
      0: '0px',
      2: '2px',
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      24: '24px',
      32: '32px',
      40: '40px',
      48: '48px',
      56: '56px',
      64: '64px',
      // Negative Margin
      '-2': '-2px',
      '-4': '-4px',
      '-8': '-8px', 
      '-12': '-12px',
      '-16': '-16px', 
      '-24': '-24px', 
      '-32': '-32px', 
      '-40': '-40px', 
      '-48': '-48px', 
      '-56': '-56px', 
      '-64': '-64px'
    },
    padding: {
      0: '0px',
      2: '2px',
      4: '4px',
      8: '8px', 
      12: '12px',
      16: '16px',
      24: '24px',
      32: '32px', 
      40: '40px', 
      48: '48px', 
      56: '56px', 
      64: '64px'
    },
  },
  variants: {
    extend: {},
  },
}
