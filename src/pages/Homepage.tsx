import { useState } from "react"
import Forecasts from "../component/Forecasts"
import SearchCity from "../component/SearchCity"
import {City} from "../model/city"

const Homepage = () => {
    const [currCity, setCurrCity] = useState<City>()

    const handleCitySelect = (cityWeather: City) => {
        setCurrCity(cityWeather)

    }

    return (
        <section className="homepage-container">
            <SearchCity handleCitySelect={handleCitySelect} />
            <Forecasts currCity={currCity} />
        </section>
    )
}
export default Homepage