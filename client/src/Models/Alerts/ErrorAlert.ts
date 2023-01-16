import { Alert, AlertColors, IAlert } from '../IAlert'

export class ErrorAlert extends Alert {
  constructor(text) {
    super(AlertColors.error, text)
  }

  public serialize(): IAlert {
    return super.serialize()
  }
}
