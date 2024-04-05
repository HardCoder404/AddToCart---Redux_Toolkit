import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../Slices/addtoCart'

export const store = configureStore({
  reducer: {
    counter: cartSlice
  },
})