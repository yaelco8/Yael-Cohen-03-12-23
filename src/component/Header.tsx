import { ConstRoutes } from "../constants/routes"
import { TiWeatherPartlySunny } from "react-icons/ti"
import { GiSaveArrow } from "react-icons/gi"
import { NavLink } from "react-router-dom"

const Header=()=>{

    const getActiveLink = (isActive: boolean): string => {
        return isActive ? "navbar__btn active" : "navbar__btn"
    }

    const links = [
        { name: 'Weather', url: ConstRoutes.HOMEPAGE, icon: TiWeatherPartlySunny },
        { name: 'Favorites', url: ConstRoutes.FAVORITES, icon: GiSaveArrow }
    ]
    return(
       <section className="header-section">
        <p className="logo">Weather app</p>
        <div className="navbar">
            <ul>
                {links.map(link=>{
                    return (
                        <NavLink key={link.name} to={link.url} className={({ isActive }) => getActiveLink(isActive)}>
                            <link.icon/>
                            <p>{link.name}</p>
                        </NavLink>
                    )
                })}
            </ul>
        </div>
       </section>
    )
}
export default Header