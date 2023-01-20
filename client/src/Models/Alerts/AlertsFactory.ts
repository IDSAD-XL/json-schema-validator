import { AbstractAlertsFactory } from './AbstractAlertsFactory'
import { ErrorAlert } from './ErrorAlert'
import { SuccessAlert } from './SuccessAlert'
import { InfoAlert } from './InfoAlert'
import { WarningAlert } from './WarningAlert'

export class AlertsFactory implements AbstractAlertsFactory {
  public createErrorAlert(text) {
    return new ErrorAlert(text)
  }
  public createSuccessAlert(text) {
    return new SuccessAlert(text)
  }
  public createInfoAlert(text) {
    return new InfoAlert(text)
  }
  public createWarningAlert(text) {
    return new WarningAlert(text)
  }
}
