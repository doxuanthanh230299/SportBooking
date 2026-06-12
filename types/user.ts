export type UserRole =
    | "customer"
    | "owner"
    | "admin";

export type UserStatus =
    | "active"
    | "inactive";

export interface User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
    role: UserRole;
    status: UserStatus;
}

export interface RegisterResponse {
    accessToken: string;
    user: User;
}