import { Button } from "../components/Button"
import { ProductCard } from "../components/ProductCard"
import styles from "../pages/HomePage.module.css"
import { ImagePlaceholder } from "../placeholder/ImagePlaceHolder"
//API handling left
const featuredProducts = [
  { id: "product-tote", category: "Bags", title: "Woven Tote, Camel", price: "3,200" },
  { id: "product-cuff", category: "Jewellery", title: "Hammered Brass Cuff", price: "1,450" },
  { id: "product-crossbody", category: "Bags", title: "Crossbody, Saddle Tan", price: "4,600" },
  { id: "product-earrings", category: "Jewellery", title: "Garnet Drop Earrings", price: "2,100" },
]

const valueProps = [
  { id: "hand-picked", title: "Hand-Picked", text: "Every piece is chosen personally, not bulk-sourced." },
  { id: "whatsapp", title: "Ordered Over WhatsApp", text: "Send us your size and colour — a team member confirms every order personally." },
  { id: "materials", title: "Genuine Materials", text: "Full-grain leather, real brass and stone — nothing passed off as something it's not." },
]

export function HomePage() {
  return (
    <div className="container">
      <div style={{display:'flex', gap:'64px'}}>
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

      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', flexDirection:'column', paddingTop:'128px', marginBottom:'48px' }}>

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

      <div style={{display:'flex', gap:'64px'}}>
          <div style={{flex:1}}>
          <ImagePlaceholder height={350} />
          </div>
          <div style={{flex:1}}>
            <p className={styles.eyebrow}>Our Story</p>
            <p className={styles.storyTitle}>A small business built on a good eye for craft</p>
            <p className={styles.storyText}>We started this shop to bring hard-to-find bags and jewellery — pieces made by small workshops and independent artisans — to people who care about where things come from.</p>
            <a href="#" className={styles.storyLink}>Read our full story →</a>
          </div>
      </div>

      <div className={styles.valueGrid} style={{paddingTop:'64px'}}>
        {
          valueProps.map((value) => (
            <div key={value.id}>
              <div className={styles.valueIcon}>✦</div>
              <p className={styles.valueTitle}>{value.title}</p>
              <p className={styles.valueText}>{value.text}</p>
            </div>
          ))
        }
      </div>

    </div>
  )
}
