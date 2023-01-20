import { AlertColors } from './AlertColor'
import { AbstractAlert } from '../AbstractAlert'

export interface IInfoAlert extends AbstractAlert {
  type: AlertColors.info
}
