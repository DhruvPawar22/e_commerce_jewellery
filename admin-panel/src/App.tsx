import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { AdminLayout } from "./layout/AdminLayout"
import { LoginPage } from "./pages/LoginPage"
import { ProductManagementPage } from "./pages/ProductManagementPage"
import { FeaturedCollectionPage } from "./pages/FeaturedCollectionPage"

function App() {
    return (
        <AuthProvider>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route path="/products" element={<ProductManagementPage />} />
                            <Route path="/featured" element={<FeaturedCollectionPage />} />
                            <Route path="/" element={<Navigate to="/products" replace />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
