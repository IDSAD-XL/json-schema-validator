import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../Models/IUser'

interface UserState {
  user: IUser | null
  error: string
  token: string | null
}

const initialState: UserState = {
  user: null,
  error: '',
  token: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSetData(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
      state.token = null
    },
    userFetchError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    userSetToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
  },
})

export default userSlice.reducer
