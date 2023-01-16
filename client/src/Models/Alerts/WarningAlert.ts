import { Alert, AlertColors, IAlert } from '../IAlert'

export class WarningAlert extends Alert {
  constructor(text) {
    super(AlertColors.warning, text)
  }

  public serialize(): IAlert {
    return super.serialize()
  }
}
