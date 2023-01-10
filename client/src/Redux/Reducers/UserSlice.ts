import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../Models/IUser";

interface UserState {
    user: IUser | null,
    error: string,
}

const initialState: UserState= {
    user: null,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSetData(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        },
        userFetchError(state, action: PayloadAction<string>) {
            state.error = action.payload
        }
    }
})

export default userSlice.reducer;