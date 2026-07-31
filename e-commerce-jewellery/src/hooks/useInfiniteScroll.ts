import { useState,useRef, useEffect } from "react";

export type Product = { id: string; category: string; title: string; price: string }
export function useInfiniteScroll(products:Product[])
{
    const ITEMS_PER_PAGE = 24;
    const [displayedItems, setDisplayedItems] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);
    const loadMoreItems  = ()=>{
        setDisplayedItems(prev => {
            if (prev.length >= products.length) {
                setHasMore(false)
                return prev
            }
            const nextChunk = products.slice(prev.length, prev.length + ITEMS_PER_PAGE)
            return [...prev, ...nextChunk]
        })
    }

    useEffect(()=>{
        
        const initialItems = products.slice(0, ITEMS_PER_PAGE)
        setDisplayedItems(initialItems)

        setHasMore(products.length>initialItems.length)

    },[products])

    useEffect(()=>{

        const observer = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting)
            {
                loadMoreItems();
            }
        },{
            threshold:1,
        })

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => {
            observer.disconnect()
        }
    },[hasMore])

    return { displayedItems, hasMore, loaderRef }
}