import { Alert, AlertColors, IAlert } from '../IAlert'

export class SuccessAlert extends Alert {
  constructor(text) {
    super(AlertColors.success, text)
  }

  public serialize(): IAlert {
    return super.serialize()
  }
}
