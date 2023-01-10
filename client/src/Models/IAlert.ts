export enum AlertTypes {
    info,
    warning,
    error
}

export interface IAlert {
    type: AlertTypes,
    text: string
}