const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const TOKEN_STORAGE_KEY = "admin_token"

export class ApiError extends Error {
    status: number
    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    })

    if (res.status === 401) {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        window.location.href = "/login"
        throw new ApiError(401, "Session expired, please log in again")
    }

    if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new ApiError(res.status, body?.detail ?? "Request failed")
    }

    if (res.status === 204) {
        return undefined as T
    }

    return res.json()
}

export const api = {
    get: <T>(path: string) => apiFetch<T>(path),
    post: <T>(path: string, body: unknown) =>
        apiFetch<T>(path, { method: "POST", body: JSON.stringify(body) }),
    patch: <T>(path: string, body: unknown) =>
        apiFetch<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
    delete: <T>(path: string) => apiFetch<T>(path, { method: "DELETE" }),
}
