import {ISchema} from "../../Models/ISchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SchemaState {
    schemes: ISchema[]
}

const initialState: SchemaState = {
    schemes: []
}

export const schemesSlice = createSlice({
    name: 'schemes',
    initialState,
    reducers: {
        addSchema(state, action: PayloadAction<ISchema>) {
            state.schemes.push(action.payload)
        },
        removeSchema(state, action: PayloadAction<ISchema>) {
            state.schemes.filter(schema => schema.id !== action.payload.id)
        },
        setSchemes(state, action: PayloadAction<ISchema[]>) {
            state.schemes = action.payload
        }
    }
})

export default schemesSlice.reducer;