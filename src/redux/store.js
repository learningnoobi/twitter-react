import { configureStore } from '@reduxjs/toolkit'
import  changeClass  from './slices/simpleState'

import userRegister from './slices/userSlice'
import tweetReducer from './slices/tweetSlice'


const store = configureStore({
  reducer: {
      changeClass:changeClass,
      userReducer:userRegister,
      tweetReducer:tweetReducer
  },
})

export default store