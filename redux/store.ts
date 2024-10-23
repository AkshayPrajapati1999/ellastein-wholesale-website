import { configureStore } from '@reduxjs/toolkit'

import authSlice from './feature/auth/authSlice'
import cartSlice from './feature/slice/cardSlice';
import switchSlice from './feature/slice/switchSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth:authSlice,
      cart:cartSlice,
      switch :switchSlice,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']