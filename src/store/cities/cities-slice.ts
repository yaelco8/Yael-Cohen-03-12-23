import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../../services/local.storage.service";
import { City } from "../../model/city"
import { Forecasts, AllForecasts } from "../../model/forecasts"


type citiesInitialState = {
    cities: City[],
    forecasts: Forecasts[],
}

const initialState: citiesInitialState = {
    cities: [],
    forecasts: [],
}

const citiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
        setCity(state, action: PayloadAction<City>) {
            state.cities.push(action.payload)
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state.cities.filter((city: any) => city._id === action.payload)
        }
    },
});

export const {
    setCity,
    removeFavorite,
} = citiesSlice.actions;

export default citiesSlice.reducer;