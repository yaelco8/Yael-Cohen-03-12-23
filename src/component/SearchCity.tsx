import { useState } from "react"
import { cityService } from "../services/city.service"
import { useAppDispatch } from "../store/store"
import { City } from "../model/city"

type SearchCityProps = {
    handleCitySelect: (cityWeather: City) => void
}

const SearchCity = ({ handleCitySelect }: SearchCityProps) => {
    const [city, setCity] = useState<string>('')
    const [cities, setCities] = useState<Array<any>>([])

    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = target
        setCity(value)
    }
    const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const currCities = await cityService.getCity(city)
        if (currCities.length === 1) {
            const cityWeather = await cityService.getWeather(currCities[0])
            handleCitySelect(cityWeather)
        } else {
            setCities(currCities)
        }
    }

    const handleKeySelect=async(city:string)=>{
        const cityWeather = await cityService.getWeather(city)
        handleCitySelect(cityWeather)
        setCities([])
    }
    return (
        <>
            <form onSubmit={(ev) => onSubmit(ev)} className="form">
                <input onChange={(ev) => onChange(ev)} type="text" placeholder="Search city" className="input" />
                {city !== '' && cities.length > 1 && (
                    cities.map(city => (
                        <div key={city._id} onClick={()=>handleKeySelect(city)} className="cityOption">{city.localCity}</div>
                    ))

                )}
            </form>
        </>
    )
}

export default SearchCity