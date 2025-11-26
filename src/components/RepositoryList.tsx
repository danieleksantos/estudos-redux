import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  fetchRepositories,
  clearRepositories,
  clearError,
} from '../store/slices/repositoriesSlice'

import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Avatar,
  Snackbar,
  Alert,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import GitHubIcon from '@mui/icons-material/GitHub'
import ClearAllIcon from '@mui/icons-material/ClearAll'

export function RepositoryList() {
  const dispatch = useAppDispatch()

  const { repositories, loading, error } = useAppSelector(
    (state) => state.repositories,
  )

  const [username, setUsername] = useState('')

  function handleSearch() {
    if (username.trim()) {
      dispatch(fetchRepositories(username))
    }
  }

  function handleClear() {
    setUsername('')
    dispatch(clearRepositories())
  }

  const handleCloseSnackbar = () => {
    dispatch(clearError())
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <GitHubIcon fontSize="large" />
        <Typography variant="h5">Repositórios Github</Typography>
      </Stack>

      <Typography
        variant="body2"
        color="text.secondary"
        gutterBottom
        sx={{ mb: 2 }}
      >
        Digite um usuário do GitHub para buscar seus repositórios públicos.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Nome do usuário"
          variant="outlined"
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          error={!!error}
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
              {
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.main
                    : theme.palette.primary.main,
              },
            '& .MuiInputLabel-root.Mui-focused': {
              color: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.main
                  : theme.palette.primary.main,
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          disabled={loading || !username}
          sx={{ px: 3 }}
        >
          Buscar
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={handleClear}
          startIcon={<ClearAllIcon />}
          disabled={loading || (repositories.length === 0 && !username)}
          sx={{ px: 3 }}
        >
          Limpar
        </Button>
      </Stack>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && repositories.length > 0 && (
        <List>
          {repositories.map((repository) => (
            <ListItem key={repository.id} disablePadding>
              <ListItemButton
                component="a"
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Avatar
                  sx={{ bgcolor: 'primary.main', mr: 2, width: 32, height: 32 }}
                >
                  {repository.name.charAt(0).toUpperCase()}
                </Avatar>
                <ListItemText
                  primary={repository.name}
                  secondary={repository.html_url}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                  secondaryTypographyProps={{ noWrap: true }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      {!loading && repositories.length === 0 && username !== '' && !error && (
        <Typography variant="caption" display="block" align="center">
          Lista vazia ou aguardando busca.
        </Typography>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  )
}
