import { AppDispatch } from "../store"
import { setCity, removeFavorite,showCity } from "../cities/cities-slice"
import { City } from "../../model/city"
import { cityService } from "../../services/city.service"
import { setPop } from "../global/global-slice"
import { PopupType } from "../../component/PopUps"

export const saveCity = async (dispatch: AppDispatch, city: City) => {
    try {
        const storageResult = await cityService.setSaveCity(city)
        if (!storageResult.status) return
        dispatch(setCity(city))
        dispatch(setPop({ type: PopupType.Success, content: 'City added to Favorites' }))
    } catch (err) {
        dispatch(setPop({ type: PopupType.Error, content: 'Something got wrong.Try again later' }))
        throw err
    }
}

export const cutFavorite = async(dispatch: AppDispatch, id: string) => {
    try {
        const storageResult=await cityService.setRemoveFromFavorite(id)
        if(!storageResult)return
        dispatch(removeFavorite(id))
        dispatch(setPop({ type: PopupType.Success, content: 'City removed from Favorites' }))
    } catch (err) {
        dispatch(setPop({ type: PopupType.Error, content: 'Something got wrong.Try again later' }))
        throw err
    }
}

export const cityToShow=(dispatch: AppDispatch,city:City)=>{
    dispatch(showCity(city))
}