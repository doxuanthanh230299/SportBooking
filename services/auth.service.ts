import { RegisterResponse, User } from "@/types/user";
import { api } from "./api";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    role: "customer" | "owner";
    confirmPassword?: string;
    status: "active" | "inactive";
    avatar?: string;
}

export interface LoginResponse {
    accessToken: string;
    user: User;
}

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const authService = {
    async login(data: LoginPayload) {
        const response = await api<LoginResponse>("/login", {
            method: "POST",
            data,
        });

        localStorage.setItem(TOKEN_KEY, response.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));

        return response;
    },

    async register(data: RegisterPayload) {
        const response = await api<RegisterResponse>("/register", {
            method: "POST",
            data
        });

        localStorage.setItem(TOKEN_KEY, response.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        return response
    },

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    getToken(): string | null {
        if (typeof window === "undefined") {
            return null;
        }

        return localStorage.getItem(TOKEN_KEY);
    },

    getCurrentUser(): User | null {
        if (typeof window === "undefined") {
            return null;
        }

        const user = localStorage.getItem(USER_KEY);

        return user ? JSON.parse(user) : null;
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    },
};
