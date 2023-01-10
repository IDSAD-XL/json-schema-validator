import {AppDispatch} from "./store";
import axios from "axios";
import {IUser} from "../Models/IUser";

export const fetchData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<IUser>('http://localhost:3070/api/user')
        
    } catch (e) {
        console.log(e)
    }
}