import { Box, Card, CardContent, Chip, IconButton, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Product } from "../types/product"

type Props = {
    product: Product
    isHero: boolean
    onRemove: () => void
}

export function SortableFeaturedCard({ product, isHero, onRemove }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: product.id,
    })

    return (
        <Card
            ref={setNodeRef}
            variant="outlined"
            sx={{
                transform: CSS.Transform.toString(transform),
                transition,
                opacity: isDragging ? 0.5 : 1,
                touchAction: "none",
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    "&:last-child": { pb: 2 },
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                        {...attributes}
                        {...listeners}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "grab",
                            color: "text.secondary",
                        }}
                    >
                        <DragIndicatorIcon fontSize="small" />
                    </Box>
                    <Typography sx={{ fontWeight: 600 }}>{product.title}</Typography>
                    <Chip label={product.category} size="small" />
                    <Typography color="text.secondary">₹{product.price}</Typography>
                    {isHero && <Chip label="Hero" size="small" color="primary" />}
                </Box>
                <IconButton onClick={onRemove} aria-label={`Remove ${product.title} from featured`}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </CardContent>
        </Card>
    )
}
