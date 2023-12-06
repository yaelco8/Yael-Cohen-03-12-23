import { ReactNode } from "react"
import Header from "../component/Header"

const Layout=({ children }: { children: ReactNode })=>{
    return(
        <section className="page-container">
            <Header/>
            {children}
        </section>
    )
}
export default Layout