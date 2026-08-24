import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { CartProvider } from "../context/cartContext";
export function Layout()
{
    return(
        <div>
        <CartProvider>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
        </CartProvider>
        </div>
    )
}
