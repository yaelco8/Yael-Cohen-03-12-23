import { cityService } from "../../services/city.service"
import { AppDispatch } from "../store"
import { setCity, setCutFavorite, setForecasts } from "../cities/cities-slice"

export const saveCity = (dispatch: AppDispatch, city: object | undefined) => {
    try {
        dispatch(setCity(city))
    } catch (err) {
        throw err
    }
}

export const saveForecasts = (dispatch: AppDispatch, forecasts: Array<any>) => {
    try {
        dispatch(setForecasts(forecasts))
    } catch (err) {
        throw err
    }
}

export const cutFavorite = (dispatch: AppDispatch, id: string | undefined) => {
    try {
        dispatch(setCutFavorite(id))
    } catch (err) {
        throw err
    }
}