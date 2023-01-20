import { AbstractAlert } from '../AbstractAlert'
import { AlertColors } from './AlertColor'

export interface IErrorAlert extends AbstractAlert {
  type: AlertColors.error
}
