import { useEffect, useMemo, useState} from "react"
import styles from "../pages/ShopPage.module.css"
import { ProductCard } from "../components/ProductCard"
import { type Product, useInfiniteScroll } from "../hooks/useInfiniteScroll"

export function ShopPage()
{
        const [searchValue,setSearchValue] = useState("")
        const [ShopProducts,setShopProdcuts] = useState<Product[]>([])


        type Categories = "All" | "Bags" | "Jewellery";

        const categories: Categories[] = ["All", "Bags", "Jewellery"]
        const sortButton = ["Featured","Price: Low to High","Price: High to Low"]
        const [filter,setFilter] = useState<Categories>('All')
        const [sort,setSort] = useState('Featured')


        useEffect(()=>{

            const fetchProducts = async() =>{
                    const response = await fetch('http://localhost:8000/shop/products')
                    if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json()
                    setShopProdcuts(data)
            }
            fetchProducts()
        },[])
        



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
        },[ShopProducts,filter, searchValue, sort])
        const { displayedItems, hasMore, loaderRef } = useInfiniteScroll(filteredProducts);

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
                {displayedItems.map((product)=>(
                    <ProductCard
                    key={product.id}
                    id={product.id}
                    category={product.category}
                    title={product.title}
                    price={product.price}
                    image={product.images.find(image => image.display_order==0)?.url}
                    button={true}
                    />
                ))}
                </div>
                {hasMore && <div ref={loaderRef} className={styles.loader} />}
            </div>
        </div>
    )
}