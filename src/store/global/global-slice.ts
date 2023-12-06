import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {PopupType} from "../../component/PopUps"

export type Message={
    type:PopupType,
    content:string
}
type globalInitialState = {
    message:Message|undefined,
}

const initialState: globalInitialState = {
    message:{
        type:PopupType.Success,
        content:''
    },
}

const globalSlice=createSlice({
    name: "global",
    initialState,
    reducers:{
        setPop(state,action: PayloadAction<Message|undefined>){
            state.message=action.payload
            
        }
    }
})

export const {
    setPop,
} = globalSlice.actions;

export default globalSlice.reducer;