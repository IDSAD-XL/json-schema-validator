import {AppDispatch} from "./store";
import axios from "axios";
import {IUser} from "../Models/IUser";
import {userSlice} from "./Reducers/UserSlice";
import {modalSlice, modalTypes} from "./Reducers/ModalSlice";
import {AlertTypes, IAlert} from "../Models/IAlert";
import {alertsSlice} from "./Reducers/AlertsSlice";
import {ISchema} from "../Models/ISchema";
import {schemesSlice} from "./Reducers/SchemaSlice";
import {workspaceSlice} from "./Reducers/WorkspaceSlice";

const tokenConfig = (token: string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const fetchData = () => async (dispatch: AppDispatch, getState) => {
    try {
        const response = await axios.get<IUser>('http://localhost:3080/api/user', tokenConfig(getState().userSlice.token))
        dispatch(userSlice.actions.userSetData(response.data))
        dispatch(schemesSlice.actions.setSchemes(response.data.schemes))
    } catch (e) {
        dispatch(userSlice.actions.userFetchError((e as Error).message))
    }
}

export const getSchemes = () => async (dispatch: AppDispatch, getState) => {
    try {
        const response = await axios.get<ISchema[]>('http://localhost:3080/api/user/schemes', tokenConfig(getState().userSlice.token))
        console.log(response.data)
        dispatch(schemesSlice.actions.setSchemes(response.data))
    } catch (e) {
        console.log(e)
    }
}

export const postSchemes = () => async (dispatch: AppDispatch, getState) => {
    try {
        const schemes = getState().schemesReducer.schemes
        await axios.post<ISchema[]>('http://localhost:3080/api/user/schemes', schemes, tokenConfig(getState().userSlice.token))
    } catch (e) {
        console.log(e)
    }
}

export const setUser = (payload: IUser) => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.userSetData(payload))
}

export const setToken = (token?: string) => async (dispatch: AppDispatch) => {
    if (token) {
        dispatch(userSlice.actions.userSetToken(token))
        localStorage.setItem("token", JSON.stringify(token))
    } else {
        const LStoken = localStorage.getItem("token")
        if (LStoken) {
            const parsedToken = JSON.parse(LStoken)
            dispatch(userSlice.actions.userSetToken(parsedToken))
            dispatch(fetchData())
        }
    }

}

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.logout())
    dispatch(schemesSlice.actions.setSchemes([]))
    pushAlert({
        type: AlertTypes.warning,
        text: "You logged out, to see your saved schemes log in your account"
    })
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

    if (getState().userSlice.user) {
        dispatch(postSchemes())
    }
}

export const setSchemeIntoWorkspace = (scheme: string) => async (dispatch: AppDispatch) => {
    dispatch(workspaceSlice.actions.setSchema(scheme))
}

export const saveSchema = (scheme: ISchema) => async (dispatch: AppDispatch) => {
    dispatch(schemesSlice.actions.updateSchema(scheme))
    dispatch(postSchemes())
    dispatch(pushAlert({
        type: AlertTypes.success,
        text: "Scheme saved"
    }))
}
