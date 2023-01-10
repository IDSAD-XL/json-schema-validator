import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FC} from "react";

interface ModalState {
    open: boolean,
    component: FC | null
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
        setComponent(state, action: PayloadAction<FC>) {
            state.component = action.payload
        }
    }
})

export default modalSlice.reducer;