import { AbstractAlert } from '../AbstractAlert'
import { IAlert } from '../../IAlert'

export abstract class Alert implements AbstractAlert {
  public type
  readonly text

  protected constructor(text) {
    this.text = text
  }

  serialize(): IAlert {
    return {
      type: this.type,
      text: this.text,
    }
  }
}
