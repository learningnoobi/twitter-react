import { configureStore } from '@reduxjs/toolkit'
import  changeClass  from './slices/simpleState'

import userRegister from './slices/userSlice'
import tweetReducer from './slices/tweetSlice'
import commentReducer  from './slices/CommentSlice'
import notificationReducer  from './slices/NotificationSlice'


const store = configureStore({
  reducer: {
      changeClass:changeClass,
      userReducer:userRegister,
      tweetReducer:tweetReducer,
      commentReducer:commentReducer,
      notificationReducer:notificationReducer
  },
})

export default store