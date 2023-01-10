import {AppDispatch} from "./store";
import axios from "axios";
import {IUser} from "../Models/IUser";
import {userSlice} from "./Reducers/UserSlice";
import {modalSlice} from "./Reducers/ModalSlice";
import SignInForm from "../Components/SignInForm";

export const fetchData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<IUser>('http://localhost:3080/api/user')
        dispatch(userSlice.actions.userSetData(response.data))
    } catch (e) {
        dispatch(userSlice.actions.userFetchError((e as Error).message))
    }
}

export const openRegisterModal = () => async (dispatch: AppDispatch) => {
    dispatch(modalSlice.actions.setComponent(SignInForm))
    dispatch(modalSlice.actions.openModal())
}