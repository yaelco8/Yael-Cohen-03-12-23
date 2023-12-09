import { useEffect, useState } from "react"
import { cutFavorite, cityToShow } from "../store/cities/cities-action"
import { useAppDispatch } from "../store/store"
import { BsTrash3 } from "react-icons/bs";
import { City } from "../model/city"
import weatherImg from "../constants/weatherImg";
import { loadFromStorage } from "../services/local.storage.service"
import { useNavigate } from "react-router-dom";
import { ConstRoutes } from "../constants/routes";

const Favorite = () => {
    const [favorites, setFavorites] = useState<Array<City>>([])
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        onInit()
    }, [])

    const onInit = () => {
        const favoriteCities = (loadFromStorage('favorites'))
        if (favoriteCities === undefined) return
        setFavorites(JSON.parse(favoriteCities))
    }

    const deleteFavorite = (id: string, ev: React.MouseEvent<SVGElement, MouseEvent>) => {
        ev.stopPropagation()
        const updateFavorites = favorites.filter((city: City) => city._id !== id)
        setFavorites(updateFavorites)
        cutFavorite(dispatch, id)
    }

    const showDetails = (city: City) => {
        cityToShow(dispatch, city)
        navigate(ConstRoutes.HOMEPAGE)
    }

    return (
        <section className="favorite-section">
            {favorites.length > 0 &&
                favorites.map((city: City) => {
                    return (
                        <div className="favorite-box" key={city._id} onClick={() => showDetails(city)}>
                            <BsTrash3 className="trashIcon" onClick={(evevnt) => deleteFavorite(city._id, evevnt)} />
                            <p className="cityName">{city.localCity}</p>
                            <p>{city.temp.Metric.Value.toFixed(0) + `\u00B0`}{city.temp.Metric.Unit}</p>
                            <p>{city.weatherText}</p>
                            <img src={`${(weatherImg as any)['img' + city.icon]}`} />
                        </div>
                    )
                })
            }
        </section>
    )
}
export default Favorite