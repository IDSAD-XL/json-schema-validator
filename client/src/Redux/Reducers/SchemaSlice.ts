import { ISchema } from '../../Models/ISchema'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SchemaState {
  schemes: ISchema[]
}

const initialState: SchemaState = {
  schemes: [],
}

export interface IRenameScheme {
  id: string
  name: string
}

export const schemesSlice = createSlice({
  name: 'schemes',
  initialState,
  reducers: {
    addSchema(state, action: PayloadAction<ISchema>) {
      state.schemes.push(action.payload)
    },
    removeSchema(state, action: PayloadAction<ISchema>) {
      state.schemes = state.schemes.filter((schema) => schema.id !== action.payload.id)
    },
    setSchemes(state, action: PayloadAction<ISchema[]>) {
      state.schemes = action.payload
    },
    updateSchema(state, action: PayloadAction<ISchema>) {
      const findSchemeIndex = state.schemes.findIndex(
        (entry) => entry.id === action.payload.id
      )
      if (findSchemeIndex !== -1) {
        state.schemes[findSchemeIndex] = action.payload
      }
    },
  },
})

export default schemesSlice.reducer
