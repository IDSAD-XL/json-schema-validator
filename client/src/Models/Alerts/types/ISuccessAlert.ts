import { AbstractAlert } from '../AbstractAlert'
import { AlertColors } from './AlertColor'

export interface ISuccessAlert extends AbstractAlert {
  type: AlertColors.success
}
