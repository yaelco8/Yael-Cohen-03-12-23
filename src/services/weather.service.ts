import axios, { AxiosResponse } from "axios"
import {Weather} from "../model/weather"

export const weatherService = {
    getCityWeather
}



async function getCityWeather(key: string) {
    try {
        const res = await _getWeather(key)
        const currWeather:Weather[] = res.map((currWeather: any) => {
            let weather = {
                date: currWeather.LocalObservationDateTime,
                WeatherText: currWeather.WeatherText,
                icon: currWeather.WeatherIcon,
                temp: currWeather.Temperature
            }
            return weather
        })
        return currWeather
    } catch (err) {
        throw err
    }
}

const _getWeather = async (weatherKey = '215854') => {
    try {
        const query = `http://dataservice.accuweather.com/currentconditions/v1/${weatherKey}?apikey=mxzUeOCWgXMUM2QrrafubuC2W6dfwRXa`
        // const query=`${process.env.WEATHER_CONDITION}${weatherKey}?apikey=`
        const res: AxiosResponse = await axios.get(query)
        // const res:AxiosResponse= await axios.get(query+process.env.API_KEY)
        return res.data
    } catch (error) {

    }
}