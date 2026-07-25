import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function Layout()
{
    return(
        <div>
        <Header count={10}/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
        </div>
    )
}
