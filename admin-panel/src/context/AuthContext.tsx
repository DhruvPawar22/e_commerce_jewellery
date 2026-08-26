import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type AuthContextValue = {
    isAuthenticated: boolean
    isLoading: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`${API_BASE_URL}/admin/me`, { credentials: "include" })
            .then((res) => setIsAuthenticated(res.ok))
            .catch(() => setIsAuthenticated(false))
            .finally(() => setIsLoading(false))
    }, [])

    const login = async (username: string, password: string) => {
        const res = await fetch(`${API_BASE_URL}/admin/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })

        if (!res.ok) {
            throw new Error("Invalid username or password")
        }

        setIsAuthenticated(true)
    }

    const logout = async () => {
        await fetch(`${API_BASE_URL}/admin/logout`, {
            method: "POST",
            credentials: "include",
        })
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
