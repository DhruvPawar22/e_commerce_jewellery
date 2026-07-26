import type { ReactNode } from "react"
import styles from "../components/Button.module.css"

type ButtonProps = {
    variant:"primary" | "secondary",
    children: ReactNode
}

export function Button({variant, children}: ButtonProps) 
    {
    return(
        variant==="secondary"
            ? <button className={`${styles.button} ${styles.secondary}`}>{children}</button>
            : <button className={`${styles.button} ${styles.primary}`}>{children}</button>
    )
}