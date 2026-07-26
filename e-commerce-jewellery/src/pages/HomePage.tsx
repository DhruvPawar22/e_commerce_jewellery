import { Button } from "../components/Button"
import styles from "../pages/HomePage.module.css"
import { ImagePlaceholder } from "../placeholder/ImagePlaceHolder"

export function HomePage() {
  return (
    <div className="container">
      <div style={{display:'flex'}}>
        <div style={{flex:1}}>
        <p className={styles.eyebrow}>Curated Collection</p>
        <p className={styles.heroTitle}>Bags and jewellery, chosen for the craft behind them</p>
        <p className={styles.heroText}>A small selection of handcrafted pieces, sourced from artisans who work in leather, brass, and stone — picked one at a time, not mass-ordered.</p>
          <div style={{display:"flex",gap:'20px'}}>
            <Button variant="primary">Shop the Collection →</Button>
            <Button variant="secondary">Our Story</Button>
          </div>
        
        </div>
        <div style={{flex:1}}>
          <ImagePlaceholder height={420}/>
        </div>
      </div>
    </div>
  )
}
