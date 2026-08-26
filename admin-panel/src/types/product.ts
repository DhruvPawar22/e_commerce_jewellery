export type Product = {
    id: string
    title: string
    category: string
    price: string
    image_url: string | null
    description: string | null
    is_active: boolean
    created_at: string
    updated_at: string
}

export type ProductInput = {
    title: string
    category: string
    price: string
    image_url?: string | null
    description?: string | null
    is_active?: boolean
}
