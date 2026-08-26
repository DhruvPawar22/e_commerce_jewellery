import { Box, Chip, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type Props = {
    id: string
    url: string
    isHero: boolean
    onRemove: () => void
}

export function SortableImageThumbnail({ id, url, isHero, onRemove }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    return (
        <Box
            ref={setNodeRef}
            sx={{
                position: "relative",
                transform: CSS.Transform.toString(transform),
                transition,
                opacity: isDragging ? 0.5 : 1,
                touchAction: "none",
            }}
        >
            <Box
                component="img"
                src={url}
                alt="Product"
                sx={{
                    width: 84,
                    height: 84,
                    objectFit: "cover",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    display: "block",
                }}
            />
            {isHero && (
                <Chip
                    label="Hero"
                    size="small"
                    color="primary"
                    sx={{ position: "absolute", bottom: 4, left: 4, height: 18, fontSize: 10 }}
                />
            )}
            <IconButton
                size="small"
                onClick={onRemove}
                aria-label="Remove image"
                sx={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    "&:hover": { bgcolor: "grey.100" },
                }}
            >
                <CloseIcon fontSize="inherit" />
            </IconButton>
            <Box
                {...attributes}
                {...listeners}
                sx={{
                    position: "absolute",
                    top: -8,
                    left: -8,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 22,
                    height: 22,
                    cursor: "grab",
                }}
            >
                <DragIndicatorIcon fontSize="inherit" />
            </Box>
        </Box>
    )
}
