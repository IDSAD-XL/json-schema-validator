import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum modalTypes {
    register,
    login
}

interface ModalState {
    open: boolean,
    component: modalTypes | null
}

const initialState: ModalState = {
    open: false,
    component: null
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state) {
            state.open = true
        },
        closeModal(state) {
            state.open = false
        },
        setComponent(state, action: PayloadAction<modalTypes>) {
            state.component = action.payload
        }
    }
})

export default modalSlice.reducer;