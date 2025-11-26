import { persistedReducer } from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistedStore = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
