import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import tasksReducer from './slices/tasksSlice'
import repositoriesReducer from './slices/repositoriesSlice'
import themeReducer from './slices/themeSlice'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  repositories: repositoriesReducer,
  theme: themeReducer,
})

export const persistedReducer = persistReducer(
  {
    key: 'tasks',
    storage,
  },
  rootReducer,
)
