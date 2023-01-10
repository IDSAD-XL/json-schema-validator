import {ISchema} from "../../Models/ISchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../Models/IUser";

interface UserState {
    id: '',
    schemes: IUser[],
    error: ''
}

const initialState: UserState= {
    id: '',
    schemes: [],
    error: ''
}

export const schemesSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userDataFetch(state) {
            // state.
        },
    }
})

export default schemesSlice.reducer;