import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../'

interface ThemeState {
  mode: 'light' | 'dark'
}

const initialState: ThemeState = {
  mode: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
  },
})

export const { toggleThemeMode } = themeSlice.actions

export const selectThemeMode = (state: RootState) => state.theme.mode

export default themeSlice.reducer
