const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export class ApiError extends Error {
    status: number
    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    // FormData sets its own multipart boundary in the Content-Type header --
    // if we set "application/json" here it would break the upload
    const isFormData = options.body instanceof FormData

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        credentials: "include",
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...options.headers,
        },
    })

    if (res.status === 401) {
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
    uploadImage: (file: File) => {
        const formData = new FormData()
        formData.append("file", file)
        return apiFetch<{ url: string }>("/admin/uploads/image", {
            method: "POST",
            body: formData,
        })
    },
}
