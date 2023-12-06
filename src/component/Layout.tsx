import { ReactNode } from "react"
import Header from "../component/Header"
import Lottie from "lottie-react";
import cloudAnimation from "../assets/imgs/clouds-animation.json";

const Layout=({ children }: { children: ReactNode })=>{
    return(
        <section className="page-container">
            <Header/>
            {children}
            <Lottie animationData={cloudAnimation} loop={true} autoplay={true} style={{width:'200rem', height:'50%'}} className="animation"/>
        </section>
    )
}
export default Layout