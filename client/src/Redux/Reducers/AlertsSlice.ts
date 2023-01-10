import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAlert} from "../../Models/IAlert";

interface AlertsState {
    alerts: Array<IAlert>
}

const initialState: AlertsState = {
    alerts: []
}

export const alertsSlice = createSlice({
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