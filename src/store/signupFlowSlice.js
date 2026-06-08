import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  selectedInterests: ['AI', 'Travel', 'Fitness'],
  customInterests: [],
  joinedCommunityIds: [],
}

const signupFlowSlice = createSlice({
  name: 'signupFlow',
  initialState,
  reducers: {
    setSignupUser: (state, action) => {
      state.user = action.payload
    },
    setSelectedInterests: (state, action) => {
      state.selectedInterests = action.payload
    },
    setCustomInterests: (state, action) => {
      state.customInterests = action.payload
    },
    joinCommunity: (state, action) => {
      if (!state.joinedCommunityIds.includes(action.payload)) {
        state.joinedCommunityIds.push(action.payload)
      }
    },
  },
})

export const {
  joinCommunity,
  setCustomInterests,
  setSelectedInterests,
  setSignupUser,
} = signupFlowSlice.actions

export default signupFlowSlice.reducer
