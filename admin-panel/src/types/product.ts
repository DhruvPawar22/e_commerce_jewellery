export type ProductImage = {
    id: string
    url: string
    display_order: number
    created_at: string
}

export type Product = {
    id: string
    title: string
    category: string
    price: string
    description: string | null
    is_active: boolean
    created_at: string
    updated_at: string
    images: ProductImage[]
}

export type ProductInput = {
    title: string
    category: string
    price: string
    description?: string | null
    is_active?: boolean
}
