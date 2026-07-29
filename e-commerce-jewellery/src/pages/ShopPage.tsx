import { useMemo, useState } from "react"
import styles from "../pages/ShopPage.module.css"
import { ProductCard } from "../components/ProductCard"
import { useInView } from "react-intersection-observer"

const ShopProducts = [
  { id: "product-tote", category: "Bags", title: "Woven Tote, Camel", price: "3,200" },
  { id: "product-cuff", category: "Jewellery", title: "Hammered Brass Cuff", price: "1,450" },
  { id: "product-crossbody", category: "Bags", title: "Crossbody, Saddle Tan", price: "4,600" },
  { id: "product-earrings", category: "Jewellery", title: "Garnet Drop Earrings", price: "2,100" },
  { id: "product-satchel", category: "Bags", title: "Structured Satchel, Espresso", price: "5,400" },
  { id: "product-hoops", category: "Jewellery", title: "Beaten Silver Hoops", price: "1,650" },
  { id: "product-clutch", category: "Bags", title: "Woven Clutch, Ivory", price: "2,800" },
  { id: "product-pendant", category: "Jewellery", title: "Rose Quartz Pendant", price: "1,900" },
  { id: "product-backpack", category: "Bags", title: "Canvas Backpack, Olive", price: "3,900" },
  { id: "product-bangle", category: "Jewellery", title: "Hammered Gold Bangle", price: "2,300" },
  { id: "product-duffel", category: "Bags", title: "Weekend Duffel, Tan", price: "6,200" },
  { id: "product-choker", category: "Jewellery", title: "Beaded Choker, Onyx", price: "1,750" },
  { id: "product-sling", category: "Bags", title: "Leather Sling, Rust", price: "3,400" },
  { id: "product-anklet", category: "Jewellery", title: "Silver Chain Anklet", price: "980" },
  { id: "product-tote-mini", category: "Bags", title: "Mini Tote, Terracotta", price: "2,600" },
  { id: "product-studs", category: "Jewellery", title: "Brass Stud Earrings", price: "1,100" },
  { id: "product-messenger", category: "Bags", title: "Messenger Bag, Chestnut", price: "4,900" },
  { id: "product-cuff-rose", category: "Jewellery", title: "Rose Gold Cuff", price: "2,750" },
  { id: "product-basket-bag", category: "Bags", title: "Woven Basket Bag, Natural", price: "3,100" },
  { id: "product-necklace", category: "Jewellery", title: "Layered Coin Necklace", price: "2,450" },
  { id: "product-pouch", category: "Bags", title: "Leather Pouch, Black", price: "1,800" },
  { id: "product-ring", category: "Jewellery", title: "Turquoise Statement Ring", price: "1,350" },
  { id: "product-satchel-tan", category: "Bags", title: "Structured Satchel, Tan", price: "5,600" },
  { id: "product-earrings-hoop", category: "Jewellery", title: "Gold Hoop Earrings", price: "1,550" },
  { id: "product-shopper", category: "Bags", title: "Canvas Shopper, Cream", price: "2,950" },
  { id: "product-bracelet", category: "Jewellery", title: "Woven Leather Bracelet", price: "890" },
  { id: "product-crossbody-black", category: "Bags", title: "Crossbody, Onyx Black", price: "4,300" },
  { id: "product-drop-earrings", category: "Jewellery", title: "Amber Drop Earrings", price: "1,999" },
  { id: "product-tassel-bag", category: "Bags", title: "Tassel Sling, Berry", price: "3,650" },
  { id: "product-cocktail-ring", category: "Jewellery", title: "Cocktail Ring, Emerald Glass", price: "1,275" },
  { id: "product-market-tote", category: "Bags", title: "Market Tote, Jute Weave", price: "2,400" },
  { id: "product-charm-bracelet", category: "Jewellery", title: "Charm Bracelet, Mixed Metal", price: "1,600" },
]
export function ShopPage()
{
        const [ref, inView] = useInView({
            threshold: 0.5, 
            triggerOnce: true, 
        });
        const [searchValue,setSearchValue] = useState("")
        type Categories = "All" | "Bags" | "Jewellery";

        const categories: Categories[] = ["All", "Bags", "Jewellery"]
        const sortButton = ["Featured","Price: Low to High","Price: High to Low"]
        const [filter,setFilter] = useState<Categories>('All')
        const [sort,setSort] = useState('Featured')

        const filteredProducts = useMemo(()=>{
            const result = ShopProducts
            .filter(product=>filter==='All' || product.category === filter)
            .filter(product => product.title.toLowerCase().trim().includes(searchValue.trim().toLowerCase()))

            if (sort === "Price: Low to High") {
                result.sort((a, b) => Number(a.price.replace(/,/g, '')) - Number(b.price.replace(/,/g, '')))
            } else if (sort === "Price: High to Low") {
                result.sort((a, b) => Number(b.price.replace(/,/g, '')) - Number(a.price.replace(/,/g, '')))
            }

            return result
        },[filter, searchValue, sort])

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
                        <select
                            id="sort-select"
                            className={styles.sortSelect}
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            {sortButton.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
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