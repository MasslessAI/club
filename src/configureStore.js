import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import podcastReducer from './podcastSlice'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    podcast: podcastReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})