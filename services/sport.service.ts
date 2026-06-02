import { api } from "./api";
import { Sport } from "@/types/sport";

export const sportService = {
    getAll() {
        return api<Sport[]>("/sports");
    },

    getById(id: string) {
        return api<Sport>(
            `/sports/${id}`,
        );
    },

    create(data: Omit<Sport, "id">) {
        return api<Sport>("/sports", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    update(
        id: string,
        data: Partial<Sport>,
    ) {
        return api<Sport>(
            `/sports/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify(data),
            },
        );
    },

    delete(id: string) {
        return api<void>(
            `/sports/${id}`,
            {
                method: "DELETE",
            },
        );
    },
};