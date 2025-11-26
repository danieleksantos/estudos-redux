import { IconButton } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectThemeMode, toggleThemeMode } from '../store/slices/themeSlice'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Box from '@mui/material/Box'

export function ThemeToggle() {
  const dispatch = useAppDispatch()
  const mode = useAppSelector(selectThemeMode)

  return (
    <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
      <IconButton
        sx={{ ml: 1 }}
        onClick={() => dispatch(toggleThemeMode())}
        color="inherit"
        aria-label="Alternar modo de tema"
      >
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  )
}
