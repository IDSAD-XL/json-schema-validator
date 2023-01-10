import {combineReducers, configureStore} from "@reduxjs/toolkit";
import schemesReducer from './Reducers/SchemaSlice'
import alertsReducer from './Reducers/AlertsSlice'
import userSlice from "./Reducers/UserSlice";
import modalSlice from "./Reducers/ModalSlice";

const rootReducer = combineReducers({
    schemesReducer,
    alertsReducer,
    userSlice,
    modalSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]