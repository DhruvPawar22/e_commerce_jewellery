import { Button } from "../components/Button"
import { ProductCard } from "../components/ProductCard"
import styles from "../pages/HomePage.module.css"
import { ImagePlaceholder } from "../placeholder/ImagePlaceHolder"

const featuredProducts = [
  { id: "product-tote", category: "Bags", title: "Woven Tote, Camel", price: "3,200" },
  { id: "product-cuff", category: "Jewellery", title: "Hammered Brass Cuff", price: "1,450" },
  { id: "product-crossbody", category: "Bags", title: "Crossbody, Saddle Tan", price: "4,600" },
  { id: "product-earrings", category: "Jewellery", title: "Garnet Drop Earrings", price: "2,100" },
]

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

      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', flexDirection:'column', paddingTop:'128px' }}>

          <p className={styles.eyebrow}>New Arrivals</p>
          <p className={styles.featuredTitle}>Featured Collection</p>
      </div>

      <div className={styles.productGrid}>
          {
            featuredProducts.map((product)=>(
              <ProductCard
              key={product.id}
              category={product.category}
              title={product.title}
              price={product.price}
              />
            ))
          }
      </div>



    </div>
  )
}
