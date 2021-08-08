import { configureStore } from '@reduxjs/toolkit'
import  changeClass  from './slices/simpleState'
import userRegister from './slices/userSlice'


const store = configureStore({
  reducer: {
      changeClass:changeClass,
      userReducer:userRegister
  },
})

export default store