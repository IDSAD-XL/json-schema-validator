import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WorkspaceSlice {
  activeScheme: string | null
}

const initialState: WorkspaceSlice = {
  activeScheme: null,
}

export const workspaceSlice = createSlice({
  name: 'schemes',
  initialState,
  reducers: {
    setSchema(state, action: PayloadAction<string | null>) {
      state.activeScheme = action.payload
    },
  },
})

export default workspaceSlice.reducer
