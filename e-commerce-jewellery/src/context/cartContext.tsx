import { createContext, useContext, useState, type ReactNode } from "react";


type CartItem = {
    id: string,
    category: string,
    title: string,
    price: string,
    quantity: number,
    imgId: string,
}
type CartContextValue = {
    items: CartItem[],
    itemCount: number,
    addItem: (item: Omit<CartItem, "quantity">) => void,
    removeItem: (id: string) => void,
    changeQuantity: (id: string, delta: number) => void,
}
const CartContext = createContext<CartContextValue | undefined>(undefined);



const CartProvider = ({ children }: { children: ReactNode }) => {
 const [items, setItems] = useState<CartItem[]>([]);
 const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

 const addItem = (item: Omit<CartItem, "quantity">)=>{
  setItems(prev=>{
  const existing = prev.find(i=>i.id===item.id)

  if (existing){
     return prev.map(i =>
      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
  }
  return [...prev, { ...item, quantity: 1 }]
  })
 }
  const removeItem = (id: string) => {
      setItems(prev => prev.filter(i => i.id !== id))
  }

  const changeQuantity = (id: string, delta: number) => {
      setItems(prev => {
          const next = prev.map(i =>
              i.id === id ? { ...i, quantity: i.quantity + delta } : i
          )
          return next.filter(i => i.quantity > 0)
      })
  }

 return (
   <CartContext.Provider value={{ items, itemCount, addItem, removeItem, changeQuantity }}>
     {children}
   </CartContext.Provider>
 );
};

function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}

export { CartProvider, useCart };