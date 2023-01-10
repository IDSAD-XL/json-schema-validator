import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAlert} from "../../Models/IAlert";

interface AlertsState {
    alerts: Array<IAlert>
}

const initialState: AlertsState = {
    alerts: []
}

export const alertsSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        addSchema(state, action: PayloadAction<IAlert>) {
            state.alerts.push(action.payload)
            setTimeout(() => {
                state.alerts.shift()
            }, 4000)
        },
    }
})

export default alertsSlice.reducer;