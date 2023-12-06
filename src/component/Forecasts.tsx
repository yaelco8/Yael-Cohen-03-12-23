import { useAppDispatch } from "../store/store"
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useState, useEffect } from "react";
import { City } from "../model/city"
import { AllForecasts, Fives } from "../model/forecasts";
import { cityService } from "../services/city.service";
import { cutFavorite, saveCity, saveForecasts } from "../store/cities/cities-action";
import weatherImg from "../constants/weatherImg";
import { PopupType } from "../component/PopUps"
import { popOn } from "../store/global/global-action";

type forcastsProps = {
  currCity: City | undefined
}

const Forcasts = ({ currCity }: forcastsProps) => {
  const [city, setCity] = useState<City>()
  const [forecasts, setForecasts] = useState<Array<AllForecasts>>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    onInit()
  }, [])

  useEffect(() => {
    if (!currCity) return
    setCity(currCity)
    bringForecasts(currCity._id)
  }, [currCity])

  const onInit = async () => {
    const defCity = await cityService.getCity('tel aviv')
    const defCityWeather = await cityService.getWeather(defCity[0])
    setCity(defCityWeather)
    bringForecasts('215854')
  }

  const bringForecasts = async (cityId: string) => {
    const upForecasts = await cityService.getForecasts(cityId)
    setForecasts(upForecasts)
  }

  const addFavorite = (city: City | undefined, forecasts: AllForecasts[]) => {
    if(!city)return
    city.isFavorite=true
    setCity(city)
    saveCity(dispatch, city)
    saveForecasts(dispatch, forecasts)
    popOn(dispatch, { type: PopupType.Success, content: 'City added to Favorite page' })
  }

  const deleteFavorite = (city: City | undefined) => {
    if(!city)return
    city.isFavorite=false
    setCity(city)
    if (city) cutFavorite(dispatch, city._id)
    else return
  }

  const getSpecDay = (numDate: string) => {
    const date = new Date(numDate);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek
  }
  console.log("forecasts", forecasts);

  return (
    <section className="forcasts-container">
        {city &&
      <div className="forecasts-up">
          <div className="today-weather">
            <img src={`${(weatherImg as any)['img' + city.icon]}`} className="item-a" />
            <p className="item-b">{city.localCity}</p>
            <p className="item-c">{city.temp.Metric.Value}{city.temp.Metric.Unit}</p>
          </div>
        <div className="favorite">
          {!city.isFavorite ?
            <GoHeartFill onClick={() => deleteFavorite(city)} /> :
            <GoHeart onClick={() => addFavorite(city, forecasts)} />
          }
        </div>
      </div>
          }
      <div className="forecasts-down">
        {forecasts.length > 0 &&
          forecasts[0].fiveDays.map((forecast: Fives) => (
            <div className="forecasts-box" key={forecast.date}>
              <div>{getSpecDay(forecast.date)}</div>
              <div>{forecast.temp + `\u00B0`}C</div>
              <img src={`${(weatherImg as any)['img' + forecast.icon]}`} className="item-a" />
            </div>
          ))
        }
      </div>

    </section>
  )
}

export default Forcasts