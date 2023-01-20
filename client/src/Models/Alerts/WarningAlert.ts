import { Alert } from './types/Alert'
import { AlertColors } from './types/AlertColor'
import { IWarningAlert } from './types/IWarningAlert'

export class WarningAlert extends Alert implements IWarningAlert {
  constructor(text) {
    super(text)
    this.type = AlertColors.warning
  }

  public serialize() {
    return super.serialize()
  }
}
