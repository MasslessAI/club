import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Auth } from 'aws-amplify'


const signOut = createAsyncThunk(
  'user/signOut',
  async () => {
    await Auth.signOut()
  }
)


const userSlice = createSlice({
  name: 'user',
  initialState: { loading: 'idle', updating: 'idle' },
  reducers: {
    setAuthData(state, action) {
      state.authData = action.payload
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [signOut.fulfilled]: (state, action) => {
      state.authData = null
    }
  }
})

const { setAuthData} = userSlice.actions
export { signOut, setAuthData }
export default userSlice.reducer
