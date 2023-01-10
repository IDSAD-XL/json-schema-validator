import {ISchema} from "./ISchema";

export interface IUser {
    id: string,
    email: string,
    name: string,
    schemes: ISchema[]
}