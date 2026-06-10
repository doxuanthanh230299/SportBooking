import { api } from "./api";
import { Court } from "@/types/courts";

export const courtService = {
    getAll() {
        return api<Court[]>("/courts");
    },

    getById(id: string) {
        return api<Court>(
            `/courts/${id}`,
        );
    },

    create(data: Omit<Court, "id">) {
        return api<Court>("/courts", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    update(
        id: string,
        data: Partial<Court>,
    ) {
        return api<Court>(
            `/courts/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify(data),
            },
        );
    },

    delete(id: string) {
        return api<void>(
            `/courts/${id}`,
            {
                method: "DELETE",
            },
        );
    },
};