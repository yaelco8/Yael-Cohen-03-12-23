import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City } from "../../model/city"
import { Forecasts } from "../../model/forecasts"


type citiesInitialState = {
    cities: City[],
    forecasts: Forecasts[],
    cityToShow: City | null
}

const initialState: citiesInitialState = {
    cities: [],
    forecasts: [],
    cityToShow: null
}

const citiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
        setCity(state, action: PayloadAction<City>) {
            state.cities.push(action.payload)
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state.cities=state.cities.filter((city: City) => city._id !== action.payload)
        },
        showCity(state, action: PayloadAction<City>) {
            state.cityToShow = action.payload
        }
    },
});

export const {
    setCity,
    removeFavorite,
    showCity
} = citiesSlice.actions;

export default citiesSlice.reducer;