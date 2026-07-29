import { useEffect, useState } from "react"
import styles from "../pages/ShopPage.module.css"
import { ProductCard } from "../components/ProductCard"

const ShopProducts = [
  { id: "product-tote", category: "Bags", title: "Woven Tote, Camel", price: "3,200" },
  { id: "product-cuff", category: "Jewellery", title: "Hammered Brass Cuff", price: "1,450" },
  { id: "product-crossbody", category: "Bags", title: "Crossbody, Saddle Tan", price: "4,600" },
  { id: "product-earrings", category: "Jewellery", title: "Garnet Drop Earrings", price: "2,100" },
]
export function ShopPage()
{
        const [searchValue,setSearchValue] = useState("")
        type Categories = "All" | "Bags" | "Jewellery";
        const categories: Categories[] = ["All", "Bags", "Jewellery"]

        const [filter,setFilter] = useState<Categories>('All')

        const filteredProducts = ShopProducts.filter(product => 
        filter === 'All' || product.category === filter
        );

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', flexDirection:'column'}}>
                <p className={styles.eyebrow}>The Collection</p>
                <p className={styles.pageTitle}>Shop</p>
            </div>

            <div style={{paddingTop:'32px'}}>
                <div>
                    <input
                        type="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search bags, jewellery…"
                        className={styles.searchInput}
                        />
                </div>

                <div className={styles.controlsRow}>
                    <div className={styles.categoryButtons}>
                        {categories.map((category)=>(
                            <button
                            key={category}
                            className={`${styles.categoryButton} ${filter===category ? styles.categoryButtonActive:""}`}
                            onClick={()=>{setFilter(category)}}
                            >{category}</button>
                        ))}
                    </div>


                    <div className={styles.sortWrapper}>
                        <label htmlFor="sort-select" className={styles.sortLabel}>Sort by</label>
                        <select id="sort-select" className={styles.sortSelect}>
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>
                <div className={styles.productGrid}>
                {filteredProducts.map((product)=>(
                    <ProductCard
                    key={product.id}
                    category={product.category}
                    title={product.title}
                    price={product.price}
                    button={true}
                    />
                ))}
                </div>
            </div>
        </div>
    )
}