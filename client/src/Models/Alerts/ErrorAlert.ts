import { IErrorAlert } from './types/IErrorAlert'
import { Alert } from './types/Alert'
import { AlertColors } from './types/AlertColor'

export class ErrorAlert extends Alert implements IErrorAlert {
  constructor(text) {
    super(text)
    this.type = AlertColors.error
  }

  public serialize() {
    return super.serialize()
  }
}
