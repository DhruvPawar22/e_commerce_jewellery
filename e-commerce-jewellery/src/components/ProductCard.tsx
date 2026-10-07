import styles from "../components/ProductCard.module.css"
import { ImagePlaceholder } from "../placeholder/ImagePlaceHolder"
import { Button } from "./Button"
import { useCart } from "../context/cartContext"

type ProductCardProps ={
    id: string,
    category: string,
    title: string,
    price: string,
    image?:string,
    button?:boolean
}

export function ProductCard({id, category, title, price, image,button=false}:ProductCardProps)
{
    const { items, addItem, changeQuantity } = useCart()
    const cartItem = items.find(i => i.id === id)

    const handleAddToCart = () => {
        addItem({ id, category, title, imgId: id })
    }

    return (
    <div className={styles.card}>
        <div className={styles.imageWrapper}>
            <img src={image} alt="err" />

            <div className={styles.imageDivider}></div>
        </div>
        <div className={styles.content}>
            <span className={styles.categoryTag}>{category}</span>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.price}>₹{price}</div>
            {button && (
                cartItem ? (
                    <div className={styles.quantityStepper}>
                        <button
                            className={styles.stepperButton}
                            aria-label="Decrease quantity"
                            onClick={() => changeQuantity(id, -1)}
                        >
                            −
                        </button>
                        <span className={styles.stepperQuantity}>{cartItem.quantity}</span>
                        <button
                            className={styles.stepperButton}
                            aria-label="Increase quantity"
                            onClick={() => changeQuantity(id, 1)}
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
                )
            )}
        </div>
    </div>

    )
}