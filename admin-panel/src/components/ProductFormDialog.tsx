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
import { api } from "../api/client"
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
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)

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

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        e.target.value = "" // allow re-selecting the same file later
        if (!file) return

        setUploadError(null)
        setUploading(true)
        try {
            const { url } = await api.uploadImage(file)
            setForm((prev) => ({ ...prev, image_url: url }))
        } catch {
            setUploadError("Failed to upload image")
        } finally {
            setUploading(false)
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
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {form.image_url && (
                            <Box
                                component="img"
                                src={form.image_url}
                                alt="Product preview"
                                sx={{
                                    width: 72,
                                    height: 72,
                                    objectFit: "cover",
                                    borderRadius: 1,
                                    border: "1px solid",
                                    borderColor: "divider",
                                }}
                            />
                        )}
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<UploadIcon />}
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : form.image_url ? "Replace Image" : "Upload Image"}
                            <input
                                type="file"
                                hidden
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={handleFileChange}
                            />
                        </Button>
                    </Box>
                    {uploadError && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {uploadError}
                        </Typography>
                    )}
                </Box>
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
