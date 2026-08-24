import type { ReactNode } from "react"
import styles from "../components/Button.module.css"

type ButtonProps = {
    variant:"primary" | "secondary",
    children: ReactNode,
    onClick?: () => void,
}

export function Button({variant, children, onClick}: ButtonProps)
    {
    return(
        variant==="secondary"
            ? <button className={`${styles.button} ${styles.secondary}`} onClick={onClick}>{children}</button>
            : <button className={`${styles.button} ${styles.primary}`} onClick={onClick}>{children}</button>
    )
}