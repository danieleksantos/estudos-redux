import { Provider as ReduxProvider } from 'react-redux'
import { persistedStore, store } from './store'
import { TaskList } from './components/TaskList'
import { PersistGate } from 'redux-persist/integration/react'
import { RepositoryList } from './components/RepositoryList'
import themes from './themes'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import { useAppSelector } from './store/hooks'
import { selectThemeMode } from './store/slices/themeSlice'
import { ThemeToggle } from './components/ThemeToggle'
import { useMemo } from 'react'
import { ThemeProvider } from '@mui/material'

const ThemedAppContent = () => {
  const mode = useAppSelector(selectThemeMode)
  const theme = useMemo(() => themes[mode], [mode])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Redux Toolkit + Material UI Demo
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={8} justifyContent="center">
          <Grid size={{ xs: 10, md: 10 }}>
            <TaskList />
          </Grid>
          <Grid size={{ xs: 10, md: 10 }}>
            <RepositoryList />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate
        loading={
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
          </Box>
        }
        persistor={persistedStore}
      >
        <ThemedAppContent />
      </PersistGate>
    </ReduxProvider>
  )
}
