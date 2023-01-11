export enum AlertTypes {
    info,
    warning,
    error,
    success
}

export interface IAlert {
    type: AlertTypes,
    text: string
}