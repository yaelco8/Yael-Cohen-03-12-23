import axios, { AxiosResponse } from "axios"
import { Weather } from "../model/weather"

export const weatherService = {
    getCityWeather
}

async function getCityWeather(key: string) {
    try {
        const res = await _getWeather(key)
        const currWeather: Weather[] = res.map((currWeather: any) => {
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
        const res: AxiosResponse = await axios.get(query)
        return res.data
    } catch (error) {

    }
}