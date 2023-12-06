import {combineReducers} from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import store from ".";
import citiesSlice from "./cities/cities-slice";
import globalSlice from "./global/global-slice";

export const rootReducer = combineReducers({
  cities:citiesSlice,
  global:globalSlice
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default rootReducer