import { useEffect, useState, type ChangeEvent } from "react"
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    MenuItem,
    Switch,
    TextField,
    Typography,
} from "@mui/material"
import UploadIcon from "@mui/icons-material/CloudUpload"
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { api } from "../api/client"
import { SortableImageThumbnail } from "./SortableImageThumbnail"
import type { Product, ProductImage, ProductInput } from "../types/product"

const CATEGORIES = ["Bags", "Jewellery"] as const

const emptyForm: ProductInput = {
    title: "",
    category: CATEGORIES[0],
    price: "",
    description: "",
    is_active: true,
}

// a staged image only exists locally, not yet attached to a product (no id yet)
type StagedImage = { url: string }

type Props = {
    open: boolean
    product: Product | null
    onClose: () => void
    onSubmit: (data: ProductInput) => Promise<Product>
    onSaved: () => void
}

export function ProductFormDialog({ open, product, onClose, onSubmit, onSaved }: Props) {
    const [form, setForm] = useState<ProductInput>(emptyForm)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)

    // images already attached to an existing product (editing) vs. uploaded
    // but not yet attached to anything (creating -- no product id exists yet)
    const [existingImages, setExistingImages] = useState<ProductImage[]>([])
    const [stagedImages, setStagedImages] = useState<StagedImage[]>([])

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

    useEffect(() => {
        if (product) {
            setForm({
                title: product.title,
                category: product.category,
                price: product.price,
                description: product.description ?? "",
                is_active: product.is_active,
            })
            setExistingImages(product.images)
        } else {
            setForm(emptyForm)
            setExistingImages([])
        }
        setStagedImages([])
        setError(null)
        setUploadError(null)
    }, [product, open])

    const handleSubmit = async () => {
        setError(null)
        setSaving(true)
        try {
            const savedProduct = await onSubmit(form)

            // attach any images staged while this was still a new, unsaved product
            for (let i = 0; i < stagedImages.length; i++) {
                await api.post(`/admin/products/${savedProduct.id}/images`, {
                    url: stagedImages[i].url,
                    display_order: i,
                })
            }

            onSaved()
        } catch {
            setError("Failed to save product")
        } finally {
            setSaving(false)
        }
    }

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        e.target.value = "" // allow re-selecting the same file later
        if (!file) return

        setUploadError(null)
        setUploading(true)
        try {
            const { url } = await api.uploadImage(file)

            if (product) {
                // product already exists -- attach immediately
                const updated = await api.post<Product>(`/admin/products/${product.id}/images`, {
                    url,
                    display_order: existingImages.length,
                })
                setExistingImages(updated.images)
            } else {
                // no product id yet -- hold onto it until Save
                setStagedImages((prev) => [...prev, { url }])
            }
        } catch {
            setUploadError("Failed to upload image")
        } finally {
            setUploading(false)
        }
    }

    const removeExistingImage = async (image: ProductImage) => {
        if (!product) return
        const updated = await api.delete<Product>(`/admin/products/${product.id}/images/${image.id}`)
        setExistingImages(updated.images)
    }

    const removeStagedImage = (index: number) => {
        setStagedImages((prev) => prev.filter((_, i) => i !== index))
    }

    const handleExistingImagesDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id || !product) return

        const oldIndex = existingImages.findIndex((img) => img.id === active.id)
        const newIndex = existingImages.findIndex((img) => img.id === over.id)
        const reordered = arrayMove(existingImages, oldIndex, newIndex)
        setExistingImages(reordered) // optimistic -- reflect the new order immediately

        await Promise.all(
            reordered.map((img, index) =>
                api.patch(`/admin/products/${product.id}/images/${img.id}`, { display_order: index })
            )
        )
    }

    const handleStagedImagesDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = stagedImages.findIndex((img) => img.url === active.id)
        const newIndex = stagedImages.findIndex((img) => img.url === over.id)
        setStagedImages((prev) => arrayMove(prev, oldIndex, newIndex))
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
                {error && <div style={{ color: "red" }}>{error}</div>}

                <TextField
                    label="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    fullWidth
                    required
                />
                <TextField
                    select
                    label="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    fullWidth
                    required
                >
                    {CATEGORIES.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Price"
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    fullWidth
                    required
                    slotProps={{ htmlInput: { step: "0.01", min: "0" } }}
                />
                <TextField
                    label="Description"
                    value={form.description ?? ""}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    fullWidth
                    multiline
                    rows={3}
                />

                <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Images
                    </Typography>
                    {existingImages.length > 0 && (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleExistingImagesDragEnd}
                        >
                            <SortableContext
                                items={existingImages.map((img) => img.id)}
                                strategy={rectSortingStrategy}
                            >
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 1.5 }}>
                                    {existingImages.map((image, index) => (
                                        <SortableImageThumbnail
                                            key={image.id}
                                            id={image.id}
                                            url={image.url}
                                            isHero={index === 0}
                                            onRemove={() => removeExistingImage(image)}
                                        />
                                    ))}
                                </Box>
                            </SortableContext>
                        </DndContext>
                    )}
                    {stagedImages.length > 0 && (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleStagedImagesDragEnd}
                        >
                            <SortableContext
                                items={stagedImages.map((img) => img.url)}
                                strategy={rectSortingStrategy}
                            >
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 1.5 }}>
                                    {stagedImages.map((image, index) => (
                                        <SortableImageThumbnail
                                            key={image.url}
                                            id={image.url}
                                            url={image.url}
                                            isHero={index === 0}
                                            onRemove={() => removeStagedImage(index)}
                                        />
                                    ))}
                                </Box>
                            </SortableContext>
                        </DndContext>
                    )}
                    <Button component="label" variant="outlined" startIcon={<UploadIcon />} disabled={uploading}>
                        {uploading ? "Uploading..." : "Add Image"}
                        <input
                            type="file"
                            hidden
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={handleFileChange}
                        />
                    </Button>
                    {uploadError && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {uploadError}
                        </Typography>
                    )}
                </Box>

                <FormControlLabel
                    control={
                        <Switch
                            checked={form.is_active ?? true}
                            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                        />
                    }
                    label="Active (visible in shop)"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={saving}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
