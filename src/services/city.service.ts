import axios, { AxiosResponse } from "axios"
import { weatherService } from "./weather.service"
import {upCity} from "../model/city"
import { AllForecasts } from "../model/forecasts"


export const cityService = {
    getCity,
    getForecasts,
    getWeather
}





async function getCity(filterBy: string) {
    try {
        const res = await _getCityFromApi(filterBy)
        const currCity: upCity[] = res.map((city: any) => {
            let upCity = {
                _id: city.Key,
                key: city.Key,
                localCity: city.LocalizedName.toLowerCase(),
                date: '',
                weatherText: '',
                icon: '',
                temp: {},
                isFavorite:false
            }
            return upCity
        })
        return currCity
    } catch (err) {
        throw err
    }
}

async function getForecasts(id = '215854') {
    try {
        let curr5Days: AllForecasts[] = []
        const res5Day = await _getForecastsFromApi(id)
        let forecasts: AllForecasts = {
            _id: id,
            fiveDays: []
        }
        const forecastsDays = res5Day.DailyForecasts.map((currDays: any) => {
            let day = {
                date: currDays.Date,
                temp: _convrtF(currDays.Temperature.Maximum.Value),
                icon: currDays.Day.Icon,
                iconPhrase: currDays.Day.IconPhrase
            }
            return day
        })
        forecasts.fiveDays = forecastsDays
        curr5Days.push(forecasts)
        return curr5Days
    } catch (err) {
        throw err
    }
}

async function getWeather(currCity: any) {
    const weather = await weatherService.getCityWeather(currCity.Key)
    weather.forEach((weath: any) => {
        currCity.date = weath.date
        currCity.weatherText = weath.WeatherText
        currCity.icon = weath.icon
        currCity.temp = weath.temp
    });
    return currCity
}

const _convrtF = (f: number) => {
    const res = (f - 32) * 5 / 9
    return res.toFixed(0)
}

const _getForecastsFromApi = async (cityKey = '215854') => {
    try {
        const query = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=`
        // const query=`${process.env.FORECASTS}${cityKey}?apikey=`
        const res: AxiosResponse = await axios.get(query + 'mxzUeOCWgXMUM2QrrafubuC2W6dfwRXa')
        // const res:AxiosResponse= await axios.get(query+process.env.API_KEY)
        return res.data
    } catch (err) {
        throw err
    }
}

const _getCityFromApi = async (city = 'tel aviv') => {
    try {
        const query = `apikey=mxzUeOCWgXMUM2QrrafubuC2W6dfwRXa&q=${city}`
        const res: AxiosResponse = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?' + query)
        // const res:AxiosResponse= await axios.get(process.env.LOCATION_AUTOCOMPLETE+query)
        return res.data
    } catch (err) {
        throw err
    }
}


