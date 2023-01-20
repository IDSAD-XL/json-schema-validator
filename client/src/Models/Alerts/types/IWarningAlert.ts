import { AbstractAlert } from '../AbstractAlert'
import { AlertColors } from './AlertColor'

export interface IWarningAlert extends AbstractAlert {
  type: AlertColors.warning
}
