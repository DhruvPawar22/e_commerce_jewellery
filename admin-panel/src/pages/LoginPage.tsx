import { useState, type FormEvent } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Box, Button, Paper, TextField, Typography, Alert } from "@mui/material"
import { useAuth } from "../context/AuthContext"

export function LoginPage() {
    const { isAuthenticated, isLoading, login } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    if (!isLoading && isAuthenticated) {
        return <Navigate to="/products" replace />
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            await login(username, password)
            navigate("/products")
        } catch {
            setError("Invalid username or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100",
            }}
        >
            <Paper component="form" onSubmit={handleSubmit} elevation={3} sx={{ p: 4, width: 360 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
                    Admin Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{ mt: 3 }}
                >
                    {loading ? "Logging in..." : "Log in"}
                </Button>
            </Paper>
        </Box>
    )
}
