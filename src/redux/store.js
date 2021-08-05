import { configureStore } from '@reduxjs/toolkit'
import  changeClass  from './slices/simpleState'


const store = configureStore({
  reducer: {
      changeClass:changeClass
  },
})

export default store