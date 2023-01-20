import { AlertColors } from './types/AlertColor'
import { IAlert } from '../IAlert'

export interface AbstractAlert {
  type: AlertColors
  serialize(): IAlert
}
