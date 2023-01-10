import {AppDispatch} from "./store";
import axios from "axios";
import {IUser} from "../Models/IUser";
import {userSlice} from "./Reducers/UserSlice";

export const fetchData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<IUser>('http://localhost:3080/api/user')
        dispatch(userSlice.actions.userSetData(response.data))
    } catch (e) {
        dispatch(userSlice.actions.userFetchError((e as Error).message))
    }
}