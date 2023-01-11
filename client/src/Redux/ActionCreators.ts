import {AppDispatch} from "./store";
import axios from "axios";
import {IUser} from "../Models/IUser";
import {userSlice} from "./Reducers/UserSlice";
import {modalSlice, modalTypes} from "./Reducers/ModalSlice";
import {AlertTypes, IAlert} from "../Models/IAlert";
import {alertsSlice} from "./Reducers/AlertsSlice";
import {ISchema} from "../Models/ISchema";
import {IRenameScheme, schemesSlice} from "./Reducers/SchemaSlice";
import {workspaceSlice} from "./Reducers/WorkspaceSlice";

export const fetchData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<IUser>('http://localhost:3080/api/user')
        dispatch(userSlice.actions.userSetData(response.data))
    } catch (e) {
        dispatch(userSlice.actions.userFetchError((e as Error).message))
    }
}

export const setUser = (payload: IUser) => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.userSetData(payload))
}

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.logout())
}

export const openModal = (modalType: modalTypes) => async (dispatch: AppDispatch) => {
    dispatch(modalSlice.actions.setComponent(modalType))
    dispatch(modalSlice.actions.openModal())
}

export const closeModal = () => async (dispatch: AppDispatch) => {
    dispatch(modalSlice.actions.closeModal())
}

export const pushAlert = (alert: IAlert) => async (dispatch: AppDispatch) => {
    dispatch(alertsSlice.actions.pushAlert(alert))
    setTimeout(() => {
        dispatch(alertsSlice.actions.shiftAlert())
    }, 8000)
}

export const createNewScheme = () => async (dispatch: AppDispatch, getState) => {
    const newScheme: ISchema = {
        id: Math.floor(Math.random() * 5000000).toString(),
        name: "",
        lastChange: Date.now(),
        content: ""
    }

    dispatch(schemesSlice.actions.addSchema(newScheme))

    dispatch(setSchemeIntoWorkspace(newScheme.id))

    dispatch(pushAlert({
        type: AlertTypes.success,
        text: "Created new scheme"
    }))
}

export const setSchemeIntoWorkspace = (scheme: string) => async (dispatch: AppDispatch) => {
    dispatch(workspaceSlice.actions.setSchema(scheme))
}

export const saveSchema = (scheme: ISchema) => async (dispatch: AppDispatch) => {
    dispatch(schemesSlice.actions.updateSchema(scheme))
}
