import { configureStore } from "@reduxjs/toolkit";
// import rootReducer

import rootReducer from "./store";


const store = configureStore({
    reducer: rootReducer
})

export default store
export type AppStore = typeof store
