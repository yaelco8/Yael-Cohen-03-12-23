import { ConstRoutes } from "../constants/routes"
import { TiWeatherPartlySunny } from "react-icons/ti"
import { GiSaveArrow } from "react-icons/gi"
import { IoIosMenu } from "react-icons/io"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"

type Screen = {
    width: number,
    height: number
}

const Header = () => {
    const [screenSize, setScreenSize] = useState<Screen>(getCurrentDimension())
    const [menuOn, setMenuOn] = useState<boolean>(false)

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);
        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    const getActiveLink = (isActive: boolean): string => {
        setMenuOn(false)
        return isActive ? "navbar__btn active" : "navbar__btn"
    }
    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    const links = [
        { name: 'Weather', url: ConstRoutes.HOMEPAGE, icon: TiWeatherPartlySunny },
        { name: 'Favorites', url: ConstRoutes.FAVORITES, icon: GiSaveArrow }
    ]

    return (
        <section className="header-section">
            <p className="logo">Weather app</p>
            {screenSize.width > 445 ?
                <div className="navbar">
                    <ul className="navbar-links">
                        {links.map(link => {
                            return (
                                <NavLink key={link.name} to={link.url} className={({ isActive }) => getActiveLink(isActive)}>
                                    <link.icon />
                                    <p>{link.name}</p>
                                </NavLink>
                            )
                        })}
                    </ul>
                </div> :
                <div>
                    <button onClick={() => setMenuOn(!menuOn)}>
                        <IoIosMenu className="menu-icon" />
                    </button>
                    {menuOn &&
                        <ul className="links-menu">
                            {links.map(link => {
                                return (
                                    <NavLink key={link.name} to={link.url} className="pages-link" onClick={() => setMenuOn(!menuOn)}>
                                        <link.icon />
                                        <p>{link.name}</p>
                                    </NavLink>
                                )
                            })}
                        </ul>
                    }
                </div>
            }

        </section>
    )
}
export default Header