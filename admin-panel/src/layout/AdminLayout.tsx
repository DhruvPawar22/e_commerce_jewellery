import { NavLink, Outlet } from "react-router-dom"
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material"
import InventoryIcon from "@mui/icons-material/Inventory2"
import StarIcon from "@mui/icons-material/Star"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAuth } from "../context/AuthContext"

const DRAWER_WIDTH = 240

const navItems = [
    { label: "Product Management", path: "/products", icon: <InventoryIcon /> },
    { label: "Featured Collection", path: "/featured", icon: <StarIcon /> },
]

export function AdminLayout() {
    const { logout } = useAuth()

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" noWrap>
                        Store Admin
                    </Typography>
                    <IconButton color="inherit" onClick={logout} aria-label="Log out">
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: "border-box" },
                }}
            >
                <Toolbar />
                <List>
                    {navItems.map((item) => (
                        <ListItemButton
                            key={item.path}
                            component={NavLink}
                            to={item.path}
                            sx={{
                                "&.active": {
                                    bgcolor: "action.selected",
                                },
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    )
}
