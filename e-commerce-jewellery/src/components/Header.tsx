import styles from "../components/Header.module.css"
import { NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

type HeaderProps = {
    count: number; 

}



export function Header({count = 0}:HeaderProps)
{
    const navList = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
        ]

        return(
    <div className={styles.header}>
        <div className={styles.logo}>Cure by Design</div>
        <nav>
            <ul className={styles.navList}>
                {navList.map((item) => (
                     <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                            }
                        >
                            {item.label}
                        </NavLink>
                        </li>
                ))}
                        <div className={styles.cartWrapper}>
                        <ShoppingBag size={24} color="var(--color-rose)" strokeWidth={1.5} />
                        <span className={styles.cartBadge}>{count}</span>
                        </div>
            </ul>
        </nav>

    </div>
)
    
}