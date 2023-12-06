import { AppDispatch } from "../store";
import {Message, setPop} from "./global-slice"

export const popOn=(dispatch:AppDispatch,message:Message|undefined)=>{
    try {
        dispatch(setPop(message))
    } catch (err) {
        throw err
    }
}