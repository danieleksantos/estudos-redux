import { createTheme } from '@mui/material'
import { purple, lime, grey } from '@mui/material/colors'

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: purple[300],
      main: '#B39DDB',
      dark: purple[800],
      contrastText: '#000000',
    },
    secondary: {
      main: lime['A400'], // #C6FF00
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: grey[500],
    },
  },
})
