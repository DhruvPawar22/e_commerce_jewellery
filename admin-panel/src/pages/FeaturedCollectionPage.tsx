import { useEffect, useMemo, useState } from "react"
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { api } from "../api/client"
import { SortableFeaturedCard } from "../components/SortableFeaturedCard"
import type { Product } from "../types/product"

export function FeaturedCollectionPage() {
    const [featured, setFeatured] = useState<Product[]>([])
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [adding, setAdding] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const loadData = () => {
        setLoading(true)
        Promise.all([
            api.get<Product[]>("/featured"),
            api.get<Product[]>("/admin/products"),
        ])
            .then(([featuredList, productList]) => {
                setFeatured(featuredList)
                setAllProducts(productList)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        loadData()
    }, [])

    const availableProducts = useMemo(() => {
        const featuredIds = new Set(featured.map((p) => p.id))
        return allProducts.filter((p) => p.is_active && !featuredIds.has(p.id))
    }, [allProducts, featured])

    const handleAdd = async () => {
        if (!selectedProduct) return
        setError(null)
        setAdding(true)
        try {
            await api.post("/admin/featured", {
                product_id: selectedProduct.id,
                display_order: featured.length,
            })
            setSelectedProduct(null)
            loadData()
        } catch {
            setError("Failed to add product to featured collection")
        } finally {
            setAdding(false)
        }
    }

    const handleRemove = async (productId: string) => {
        await api.delete(`/admin/featured/${productId}`)
        loadData()
    }

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = featured.findIndex((p) => p.id === active.id)
        const newIndex = featured.findIndex((p) => p.id === over.id)
        const reordered = arrayMove(featured, oldIndex, newIndex)
        setFeatured(reordered) // optimistic -- reflect the new order immediately

        await Promise.all(
            reordered.map((p, index) => api.patch(`/admin/featured/${p.id}`, { display_order: index }))
        )
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Featured Collection
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "flex-start" }}>
                <Autocomplete
                    options={availableProducts}
                    getOptionLabel={(p) => `${p.title} (${p.category})`}
                    value={selectedProduct}
                    onChange={(_, value) => setSelectedProduct(value)}
                    sx={{ minWidth: 320 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Select a product to feature" size="small" />
                    )}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                    disabled={!selectedProduct || adding}
                >
                    {adding ? "Adding..." : "Add to Featured"}
                </Button>
            </Box>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {!loading && featured.length === 0 && (
                <Typography color="text.secondary">No featured products yet.</Typography>
            )}

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                    items={featured.map((p) => p.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        {featured.map((product, index) => (
                            <SortableFeaturedCard
                                key={product.id}
                                product={product}
                                isHero={index === 0}
                                onRemove={() => handleRemove(product.id)}
                            />
                        ))}
                    </Box>
                </SortableContext>
            </DndContext>
        </Box>
    )
}
