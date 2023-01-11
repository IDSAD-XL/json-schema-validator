import {ISchema} from "../../Models/ISchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SchemaState {
    schemes: ISchema[]
}

const initialState: SchemaState = {
    schemes: []
}

export interface IRenameScheme {
    id: string,
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
            state.schemes.filter(schema => schema.id !== action.payload.id)
        },
        setSchemes(state, action: PayloadAction<ISchema[]>) {
            state.schemes = action.payload
        },
        changeSchemeName(state, action: PayloadAction<IRenameScheme>) {
            const findScheme = state.schemes.find((entry) => entry.id === action.payload.id)
            if (findScheme) {
                findScheme.name = action.payload.name
            }
        },
        updateSchema(state, action: PayloadAction<ISchema>) {
            state.schemes.map((entry) => {
                if (entry.id === action.payload.id) {
                    return action.payload
                } else {
                    return entry
                }
            })
        }
    }
})

export default schemesSlice.reducer;