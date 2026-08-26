import { createContext, useContext, useState, type ReactNode } from "react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type AuthContextValue = {
    token: string | null
    login: (username: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const TOKEN_STORAGE_KEY = "admin_token"

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem(TOKEN_STORAGE_KEY)
    )

    const login = async (username: string, password: string) => {
        const res = await fetch(`${API_BASE_URL}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })

        if (!res.ok) {
            throw new Error("Invalid username or password")
        }

        const data = await res.json()
        localStorage.setItem(TOKEN_STORAGE_KEY, data.access_token)
        setToken(data.access_token)
    }

    const logout = () => {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
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
