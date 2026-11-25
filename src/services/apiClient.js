// Shared REST API client & token session helpers for Express backend

export const AUTH_TOKEN_KEY = 'india_tourist_auth_token';
export const AUTH_USER_KEY = 'india_tourist_auth_user';

const API_BASE = process.env.REACT_APP_API_URL || '';

export function getAuthToken() {
    if (typeof localStorage === 'undefined') return null;
    try {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
        return null;
    }
}

export function getStoredAuthUser() {
    if (typeof localStorage === 'undefined') return null;
    try {
        const raw = localStorage.getItem(AUTH_USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function saveAuthSession(token, user) {
    if (typeof localStorage === 'undefined') return;
    try {
        if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
        if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } catch (err) {
        console.error('Failed to persist auth session:', err);
    }
}

export function clearAuthSession() {
    if (typeof localStorage === 'undefined') return;
    try {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
    } catch (err) {
        console.error('Failed to clear auth session:', err);
    }
}

export async function apiRequest(path, options = {}) {
    const token = getAuthToken();
    const headers = {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
    };

    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
        body: options.body && typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        if (response.status === 401 && token && !options.skipAuthClear) {
            clearAuthSession();
        }
        const error = new Error(data.error || `Request failed (${response.status})`);
        error.status = response.status;
        error.data = data;
        throw error;
    }
    return data;
}
