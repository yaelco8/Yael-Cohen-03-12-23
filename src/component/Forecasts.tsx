import { RootState, useAppDispatch } from "../store/store"
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useState, useEffect } from "react";
import { City } from "../model/city"
import { AllForecasts, Fives } from "../model/forecasts";
import { cityService } from "../services/city.service";
import { cutFavorite, saveCity } from "../store/cities/cities-action";
import weatherImg from "../constants/weatherImg";
import { useSelector } from "react-redux";

type forcastsProps = {
  currCity: City | undefined
}

const Forcasts = ({ currCity }: forcastsProps) => {
  const [city, setCity] = useState<City>()
  const [forecasts, setForecasts] = useState<Array<AllForecasts>>([])
  const { cityToShow } = useSelector((state: RootState) => state.cities)
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
    if (cityToShow) {
      setCity(cityToShow)
    } else {
      const inFavorites = cityService.checkIfFavorite()
      if (!inFavorites) {
        const defCity = await cityService.getCity('tel aviv')
        const defCityWeather = await cityService.getWeather(defCity[0])
        setCity(defCityWeather)
      } else {
        setCity(inFavorites)
      }

    }
    bringForecasts('215854')
  }

  const bringForecasts = async (cityId: string) => {
    const upForecasts = await cityService.getForecasts(cityId)
    setForecasts(upForecasts)
  }

  const addFavorite = (city: City | undefined, forecasts: AllForecasts[]) => {
    if (!city) return
    city.isFavorite = true
    setCity(city)
    saveCity(dispatch, city)
  }

  const deleteFavorite = (city: City | undefined) => {
    if (!city) return
    city.isFavorite = false
    setCity(city)
    cutFavorite(dispatch, city._id)
  }

  const getSpecDay = (numDate: string) => {
    const date = new Date(numDate);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek
  }

  return (
    <section className="forcasts-container">
      {city &&
        <div className="forecasts-up">

          <div className="today-weather">
            <img src={`${(weatherImg as any)['img' + city.icon]}`} className="item-a" />
            <p className="item-b">{city.localCity}</p>
            <p className="item-c">{city.temp.Metric.Value.toFixed(0) + `\u00B0`}{city.temp.Metric.Unit}</p>
          </div>
          <div className="favorite">
            {city.isFavorite ?
              <GoHeartFill onClick={() => deleteFavorite(city)} className="heart" /> :
              <GoHeart onClick={() => addFavorite(city, forecasts)} className="heart" />
            }
          </div>
        </div>
      }

      <div className="forecasts-down">
        {forecasts.length > 0 &&
          forecasts[0].fiveDays.map((forecast: Fives) => (
            <div className="forecasts-box" key={forecast.date}>
              <div className="text">{getSpecDay(forecast.date)}</div>
              <div className="text">{forecast.temp + `\u00B0`}C</div>
              <img src={`${(weatherImg as any)['img' + forecast.icon]}`}/>
            </div>
          ))
        }
      </div>

    </section>
  )
}

export default Forcasts