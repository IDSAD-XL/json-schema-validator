export enum AlertColors {
  info = 'alert-info',
  warning = 'alert-warning',
  error = 'alert-error',
  success = 'alert-success',
}

export interface IAlert {
  class: AlertColors
  text: string
}

export abstract class Alert implements IAlert {
  readonly class
  readonly text

  protected constructor(type, text) {
    this.class = type
    this.text = text
  }

  public serialize(): IAlert {
    return {
      class: this.class,
      text: this.text,
    }
  }
}
