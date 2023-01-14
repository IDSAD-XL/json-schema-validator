import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Alert, IAlert} from "../../Models/IAlert";

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
        pushAlert(state, action: PayloadAction<IAlert>) {
            state.alerts.unshift(action.payload)
        },
        shiftAlert(state) {
            state.alerts.pop()
        }
    }
})

export default alertsSlice.reducer;