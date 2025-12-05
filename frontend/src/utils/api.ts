import axios from 'axios';

// Use environment variable for Vercel, fallback to localhost for dev
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: baseURL,
});

// Optional: Add interceptors for auth headers if we use session tokens later
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
