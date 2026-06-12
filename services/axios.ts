import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
    }
});

// Handle 304 responses
axiosInstance.interceptors.response.use(
    response => {
        // If 304, return cached data from request
        if (response.status === 304) {
            return response;
        }
        return response;
    },
    error => {
        // Handle 304 as success (not an error)
        if (error.response?.status === 304) {
            return error.response;
        }
        return Promise.reject(error);
    }
);