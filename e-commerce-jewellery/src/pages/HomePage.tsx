import { Button } from "../components/Button"
import styles from "../pages/HomePage.module.css"

export function HomePage() {
  return (
    <div>
      <div>
        <div>
        <p className={styles.eyebrow}>Curated Collection</p>
        <p className={styles.heroTitle}>Bags and jewellery, chosen for the craft behind them</p>
        <p>A small selection of handcrafted pieces, sourced from artisans who work in leather, brass, and stone — picked one at a time, not mass-ordered.</p>
        <div style={{display:"flex",gap:'20px'}}>
        <Button variant="primary">Shop the Collection →</Button>
        <Button variant="secondary">Our Story</Button>

        </div>
        
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}
