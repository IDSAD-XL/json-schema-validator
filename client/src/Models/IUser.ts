import {ISchema} from "./ISchema";

export interface IUser {
    id: string,
    email: string,
    schemes: ISchema[]
}