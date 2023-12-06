import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { cutFavorite } from "../store/cities/cities-action"
import { useAppDispatch } from "../store/store"
import { Link } from "react-router-dom"
import { ConstRoutes } from "../constants/routes"

const Favorite = () => {
    const { cities } = useSelector((state: RootState) => state.cities)
    const { forecasts } = useSelector((state: RootState) => state.cities)
    const dispatch = useAppDispatch()

    const deleteFavorite = () => {
        // cutFavorite(dispatch,)
      }
console.log("cities",cities);
console.log("forecasts",forecasts);

    return (
        <section className="favorite-section">
            
        </section>
    )
}
export default Favorite