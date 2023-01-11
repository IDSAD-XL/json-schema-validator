import {ISchema} from "../../Models/ISchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface WorkspaceSlice {
    activeScheme: ISchema | null
}

const initialState: WorkspaceSlice = {
    activeScheme: null
}

export const workspaceSlice = createSlice({
    name: 'schemes',
    initialState,
    reducers: {
        setSchema(state, action: PayloadAction<ISchema>) {
          state.activeScheme = action.payload
        },
    }
})

export default workspaceSlice.reducer;