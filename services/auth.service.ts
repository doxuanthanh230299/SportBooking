import { User } from "@/types/user";
import { api } from "./api";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    user: User;
}

export const authService = {
    login(data: LoginPayload) {
        return api<LoginResponse>(
            "/login",
            {
                method: "POST",
                body: JSON.stringify(data),
            },
        );
    },

    register(
        data: Omit<
            User,
            "id" | "role"
        >,
    ) {
        return api<User>(
            "/register",
            {
                method: "POST",
                body: JSON.stringify(data),
            },
        );
    },

    logout() {
        localStorage.removeItem(
            "token",
        );
        localStorage.removeItem(
            "user",
        );
    },
};