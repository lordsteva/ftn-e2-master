module.exports = {
  darkMode: false, // or 'media' or 'class'
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'transparent': 'transparent',
        'white': '#ffffff',
        'whitesmoke':'#f5f5f5',
        'lightGray': '#c9c9c9',
        'gray': '#A9A9A9',
        'darkGray': '#666666',
        'dark': '#262626',
        'red': '#e02020',
        'success': '#5fad5f',
        'primary':'#3553e4',
        'secondary':'#3a3b3c',
        'bcPrimary':'#18191a',
        'bcSecondary':'#242526',
        'blue': '#164ca6'
      },
      height:{
        '100px': '100px',
        '120px': '120px',
        '150px': '150px',
        '180px': '180px',
        '200px': '200px',
        '400px': '400px',
        '550px': '550px',
        '600px': '600px',
        '700px': '700px'
      },
      width:{
        '120px':'120px'
      },
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
      8: '8px',
      12: '12px',
      16: '16px'
    },
    borderRadius: {
      none: '0',
      xs: '7px',
      sm: '10px',
      md: '14px',
      half: '50%',
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
