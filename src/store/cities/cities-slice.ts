import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../../services/local.storage";
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
        setCity(state, action: PayloadAction<any>) {
            let updatedCities: City[] = []
            state.cities.push(action.payload)
            updatedCities.push(action.payload)
            saveToStorage('cities', JSON.stringify(updatedCities))
        },
        setForecasts(state, action: PayloadAction<any>) {
            let updatedForecasts: AllForecasts[] = []
            state.forecasts.push(...action.payload)
            updatedForecasts.push(...action.payload)
            saveToStorage('forecasts', JSON.stringify(updatedForecasts))
        },
        setCutFavorite(state, action: PayloadAction<any>) {
            const cities = loadFromStorage('cities')
            JSON.parse(cities)
            state.cities.filter((city: any) => city._id === action.payload)
            let updatedCities = cities.filter((city: any) => city._id === action.payload)
            saveToStorage('cities', updatedCities)
            const forecasts = loadFromStorage('forecasts')
            JSON.parse(forecasts)
            state.forecasts.filter((forecast: any) => forecast._id === action.payload)
            let updatedForecasts = forecasts.filter((forecast: any) => forecast._id === action.payload)
            saveToStorage('forecasts', updatedForecasts)
        }
    },
});

export const {
    setCity,
    setForecasts,
    setCutFavorite,
} = citiesSlice.actions;

export default citiesSlice.reducer;