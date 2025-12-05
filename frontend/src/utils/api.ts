import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000', // Adjust if backend runs elsewhere
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
