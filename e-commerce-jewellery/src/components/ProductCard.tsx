import styles from "../components/ProductCard.module.css"
import { ImagePlaceholder } from "../placeholder/ImagePlaceHolder"
import { Button } from "./Button"
type ProductCardProps ={
    category: string,
    title: string,
    price: string,
    button?:boolean
}

export function ProductCard({category, title, price, button=false}:ProductCardProps)
{
    return (
    <div className={styles.card}>
        <div className={styles.imageWrapper}>
            <ImagePlaceholder/>
            <div className={styles.imageDivider}></div>
        </div>
        <div className={styles.content}>
            <span className={styles.categoryTag}>{category}</span>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.price}>₹{price}</div>
            {button && <Button variant="primary">Add to Cart</Button> }
        </div>
    </div>

    )
}