import { Alert, AlertColors, IAlert } from '../IAlert'

export class InfoAlert extends Alert {
  constructor(text) {
    super(AlertColors.info, text)
  }

  public serialize(): IAlert {
    return super.serialize()
  }
}
