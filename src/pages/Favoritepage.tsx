import {useEffect,useState} from "react"
import { cutFavorite } from "../store/cities/cities-action"
import { useAppDispatch } from "../store/store"
import { BsTrash3 } from "react-icons/bs";
import { City } from "../model/city"
import weatherImg from "../constants/weatherImg";
import { loadFromStorage } from "../services/local.storage.service"

const Favorite = () => {
    const [favorites,setFavorites]=useState<Array<City>>([])
    const dispatch = useAppDispatch()

    useEffect(()=>{
        onInit()
    },[])

    const onInit=()=>{
        const favoriteCities=(loadFromStorage('favorites'))
        setFavorites(JSON.parse(favoriteCities))
    }

    const deleteFavorite = () => {
        // cutFavorite(dispatch,)
    }

    return (
        <section className="favorite-section">
            {favorites.length > 0 &&
                favorites.map((city: City) => {
                    return (
                        <div className="favorite-box" key={city._id} >
                            <BsTrash3 className="trashIcon"/>
                            <p className="cityName">{city.localCity}</p>
                            <p>{city.temp.Metric.Value.toFixed(0)+`\u00B0`}{city.temp.Metric.Unit}</p>
                            <p>{city.weatherText}</p>
                            <img src={`${(weatherImg as any)['img' + city.icon]}`}/>
                        </div>
                    )
                })
            }
        </section>
    )
}
export default Favorite