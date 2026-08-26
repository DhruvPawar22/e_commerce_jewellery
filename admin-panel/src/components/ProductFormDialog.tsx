import { useEffect, useState } from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    MenuItem,
    Switch,
    TextField,
} from "@mui/material"
import type { Product, ProductInput } from "../types/product"

const CATEGORIES = ["Bags", "Jewellery"] as const

const emptyForm: ProductInput = {
    title: "",
    category: CATEGORIES[0],
    price: "",
    image_url: "",
    description: "",
    is_active: true,
}

type Props = {
    open: boolean
    product: Product | null
    onClose: () => void
    onSubmit: (data: ProductInput) => Promise<void>
}

export function ProductFormDialog({ open, product, onClose, onSubmit }: Props) {
    const [form, setForm] = useState<ProductInput>(emptyForm)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (product) {
            setForm({
                title: product.title,
                category: product.category,
                price: product.price,
                image_url: product.image_url ?? "",
                description: product.description ?? "",
                is_active: product.is_active,
            })
        } else {
            setForm(emptyForm)
        }
        setError(null)
    }, [product, open])

    const handleSubmit = async () => {
        setError(null)
        setSaving(true)
        try {
            await onSubmit(form)
        } catch {
            setError("Failed to save product")
        } finally {
            setSaving(false)
        }
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
                    label="Image URL"
                    value={form.image_url ?? ""}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Description"
                    value={form.description ?? ""}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    fullWidth
                    multiline
                    rows={3}
                />
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
