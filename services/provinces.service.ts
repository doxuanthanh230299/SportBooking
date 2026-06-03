import { api } from "./api";
import { Province } from "@/types/province";

export const provinceService = {
    getAll(): Promise<Province[]> {
        return api<Province[]>("/provinces");
    },

    getById(id: string): Promise<Province> {
        return api<Province>(`/provinces/${id}`);
    },

    create(data: Omit<Province, "id">): Promise<Province> {
        return api<Province>("/provinces", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    update(
        id: string,
        data: Partial<Province>
    ): Promise<Province> {
        return api<Province>(`/provinces/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },

    delete(id: string): Promise<void> {
        return api<void>(`/provinces/${id}`, {
            method: "DELETE",
        });
    },
};