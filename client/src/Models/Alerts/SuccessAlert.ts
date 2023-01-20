import { Alert } from './types/Alert'
import { AlertColors } from './types/AlertColor'
import { ISuccessAlert } from './types/ISuccessAlert'

export class SuccessAlert extends Alert implements ISuccessAlert {
  constructor(text) {
    super(text)
    this.type = AlertColors.success
  }

  public serialize() {
    return super.serialize()
  }
}
