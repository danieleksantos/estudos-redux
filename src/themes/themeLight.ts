import { createTheme } from '@mui/material'
import { blue, cyan, grey } from '@mui/material/colors'

export const light = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: blue[400],
      main: '#6a1b91',
      dark: blue[900],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: cyan['A700'], // #00E5FF
      contrastText: '#000000',
    },
    background: {
      default: grey[50],
      paper: '#FFFFFF',
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
})
