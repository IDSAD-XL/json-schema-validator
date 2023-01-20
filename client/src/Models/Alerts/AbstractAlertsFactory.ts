import { IWarningAlert } from './types/IWarningAlert'
import { IErrorAlert } from './types/IErrorAlert'
import { IInfoAlert } from './types/IInfoAlert'
import { ISuccessAlert } from './types/ISuccessAlert'

export interface AbstractAlertsFactory {
  createWarningAlert: (text: string) => IWarningAlert
  createErrorAlert: (text: string) => IErrorAlert
  createInfoAlert: (text: string) => IInfoAlert
  createSuccessAlert: (text: string) => ISuccessAlert
}
