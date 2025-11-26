import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRepositories } from '../../services/api'

interface Repository {
  id: number
  name: string
  html_url: string
}

interface RepositoryState {
  repositories: Repository[]
  loading: boolean
  error: string | null
}

const initialState: RepositoryState = {
  repositories: [],
  loading: false,
  error: null,
}

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async (username: string, { rejectWithValue }) => {
    try {
      const repositories = await getRepositories(username)
      return repositories
    } catch (error) {
      const err = error as Error

      return rejectWithValue(err.message)
    }
  },
)

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    clearRepositories: (state) => {
      state.repositories = []
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepositories.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchRepositories.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.repositories = action.payload
    })
    builder.addCase(fetchRepositories.rejected, (state, action) => {
      state.loading = false
      state.repositories = []
      state.error = action.payload as string
    })
  },
})

export const { clearRepositories, clearError } = repositoriesSlice.actions
export default repositoriesSlice.reducer

// Pending: operação assincrona em andamento
// Fullfiled: operação assincrona concluida com sucesso
// Reject: operação assincrona falhou
