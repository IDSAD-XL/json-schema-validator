import { IAlert } from '../IAlert'
import { IInfoAlert } from './types/IInfoAlert'
import { Alert } from './types/Alert'
import { AlertColors } from './types/AlertColor'

export class InfoAlert extends Alert implements IInfoAlert {
  constructor(text) {
    super(text)
    this.type = AlertColors.info
  }

  public serialize(): IAlert {
    return super.serialize()
  }
}
