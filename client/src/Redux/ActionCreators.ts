import { AppDispatch } from './store'
import axios from 'axios'
import { IUser } from '../Models/IUser'
import { userSlice } from './Reducers/UserSlice'
import { modalSlice, modalTypes } from './Reducers/ModalSlice'
import { Alert, IAlert } from '../Models/IAlert'
import { alertsSlice } from './Reducers/AlertsSlice'
import { ISchema } from '../Models/ISchema'
import { schemesSlice } from './Reducers/SchemaSlice'
import { workspaceSlice } from './Reducers/WorkspaceSlice'
import { WarningAlert } from '../Models/Alerts/WarningAlert'
import { SuccessAlert } from '../Models/Alerts/SuccessAlert'

const tokenConfig = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const fetchData = () => async (dispatch: AppDispatch, getState) => {
  try {
    const response = await axios.get<IUser>(
      'http://localhost:3080/api/user',
      tokenConfig(getState().userSlice.token)
    )
    dispatch(setUser(response.data))
  } catch (e) {
    dispatch(userSlice.actions.userFetchError((e as Error).message))
  }
}

export const getSchemes = () => async (dispatch: AppDispatch, getState) => {
  try {
    if (!getState().userSlice.user) return
    const response = await axios.get<ISchema[]>(
      'http://localhost:3080/api/user/schemes',
      tokenConfig(getState().userSlice.token)
    )
    dispatch(schemesSlice.actions.setSchemes(response.data))
  } catch (e) {
    console.log(e)
  }
}

export const postSchemes = () => async (dispatch: AppDispatch, getState) => {
  try {
    if (!getState().userSlice.user) return
    const schemes = getState().schemesReducer.schemes
    await axios.post<ISchema[]>(
      'http://localhost:3080/api/user/schemes',
      schemes,
      tokenConfig(getState().userSlice.token)
    )
  } catch (e) {
    console.log(e)
  }
}

export const setUser = (payload: IUser) => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.userSetData(payload))
  dispatch(schemesSlice.actions.setSchemes(payload.schemes))
}

export const setToken = (token?: string) => async (dispatch: AppDispatch) => {
  if (token) {
    dispatch(userSlice.actions.userSetToken(token))
    localStorage.setItem('token', JSON.stringify(token))
  } else {
    const LStoken = localStorage.getItem('token')
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
  const warningAlert = new WarningAlert(
    'You logged out, to see your saved schemes log in your account'
  )
  pushAlert(warningAlert)
}

export const openModal =
  (modalType: modalTypes) => async (dispatch: AppDispatch) => {
    dispatch(modalSlice.actions.setComponent(modalType))
    dispatch(modalSlice.actions.openModal())
  }

export const closeModal = () => async (dispatch: AppDispatch) => {
  dispatch(modalSlice.actions.closeModal())
}

export const pushAlert = (alert: Alert) => async (dispatch: AppDispatch) => {
  const serializedAlert = alert.serialize()
  dispatch(alertsSlice.actions.pushAlert(serializedAlert))
  setTimeout(() => {
    dispatch(alertsSlice.actions.shiftAlert())
  }, 8000)
}

export const createNewScheme =
  () => async (dispatch: AppDispatch, getState) => {
    const newScheme: ISchema = {
      id: Math.floor(Math.random() * 5000000).toString(),
      name: '',
      lastChange: Date.now(),
      content: '',
    }

    dispatch(schemesSlice.actions.addSchema(newScheme))

    dispatch(setSchemeIntoWorkspace(newScheme.id))

    const successAlert = new SuccessAlert('Created new scheme')

    dispatch(pushAlert(successAlert))

    if (getState().userSlice.user) {
      dispatch(postSchemes())
    }
  }

export const setSchemeIntoWorkspace =
  (scheme: string) => async (dispatch: AppDispatch) => {
    dispatch(workspaceSlice.actions.setSchema(scheme))
  }

export const saveSchema =
  (scheme: ISchema) => async (dispatch: AppDispatch) => {
    dispatch(schemesSlice.actions.updateSchema(scheme))
    dispatch(postSchemes())

    const successAlert = new SuccessAlert('Scheme saved')
    dispatch(pushAlert(successAlert))
  }
