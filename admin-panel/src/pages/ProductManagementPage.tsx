import { useEffect, useMemo, useState } from "react"
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { api } from "../api/client"
import type { Product, ProductInput } from "../types/product"
import { ProductFormDialog } from "../components/ProductFormDialog"

type SortOption = "newest" | "title-asc" | "price-asc" | "price-desc"

export function ProductManagementPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("All")
    const [sort, setSort] = useState<SortOption>("newest")

    const [formOpen, setFormOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)

    const loadProducts = () => {
        setLoading(true)
        api.get<Product[]>("/admin/products")
            .then(setProducts)
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const categories = useMemo(
        () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
        [products]
    )

    const visibleProducts = useMemo(() => {
        let result = products
            .filter((p) => categoryFilter === "All" || p.category === categoryFilter)
            .filter((p) => p.title.toLowerCase().includes(search.trim().toLowerCase()))

        result = [...result].sort((a, b) => {
            if (sort === "title-asc") return a.title.localeCompare(b.title)
            if (sort === "price-asc") return Number(a.price) - Number(b.price)
            if (sort === "price-desc") return Number(b.price) - Number(a.price)
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })

        return result
    }, [products, search, categoryFilter, sort])

    const openCreateForm = () => {
        setEditingProduct(null)
        setFormOpen(true)
    }

    const openEditForm = (product: Product) => {
        setEditingProduct(product)
        setFormOpen(true)
    }

    const handleFormSubmit = (data: ProductInput): Promise<Product> => {
        if (editingProduct) {
            return api.patch<Product>(`/admin/products/${editingProduct.id}`, data)
        }
        return api.post<Product>("/admin/products", data)
    }

    const handleFormSaved = () => {
        setFormOpen(false)
        loadProducts()
    }

    const handleDelete = async () => {
        if (!deleteTarget) return
        await api.delete(`/admin/products/${deleteTarget.id}`)
        setDeleteTarget(null)
        loadProducts()
    }

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4">Product Management</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={openCreateForm}>
                    Add Product
                </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                <TextField
                    label="Search by title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    sx={{ minWidth: 240 }}
                />
                <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    size="small"
                    sx={{ minWidth: 160 }}
                >
                    {categories.map((c) => (
                        <MenuItem key={c} value={c}>
                            {c}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    size="small"
                    sx={{ minWidth: 180 }}
                >
                    <MenuItem value="newest">Newest first</MenuItem>
                    <MenuItem value="title-asc">Title (A-Z)</MenuItem>
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                </Select>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && visibleProducts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No products found
                                </TableCell>
                            </TableRow>
                        )}
                        {visibleProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>₹{product.price}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={product.is_active ? "Active" : "Inactive"}
                                        color={product.is_active ? "success" : "default"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => openEditForm(product)} aria-label="Edit">
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton onClick={() => setDeleteTarget(product)} aria-label="Delete">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ProductFormDialog
                open={formOpen}
                product={editingProduct}
                onClose={() => setFormOpen(false)}
                onSubmit={handleFormSubmit}
                onSaved={handleFormSaved}
            />

            <Dialog open={deleteTarget !== null} onClose={() => setDeleteTarget(null)}>
                <DialogTitle>Delete "{deleteTarget?.title}"?</DialogTitle>
                <DialogContent>This can't be undone.</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
