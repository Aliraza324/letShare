import { configureStore } from '@reduxjs/toolkit'
import signupFlowReducer from './signupFlowSlice'

export const store = configureStore({
  reducer: {
    signupFlow: signupFlowReducer,
  },
})
