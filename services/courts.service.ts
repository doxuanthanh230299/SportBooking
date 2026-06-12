import { api } from "./api";
import { Court } from "@/types/courts";

export const courtService = {
    getAll(filters?: {
        sportId?: string;
        provinceId?: string;
        districtId?: string;
    }) {
        const params =
            new URLSearchParams();

        if (filters?.sportId) {
            params.append(
                "sportId",
                filters.sportId
            );
        }

        if (filters?.provinceId) {
            params.append(
                "provinceId",
                filters.provinceId
            );
        }

        if (filters?.districtId) {
            params.append(
                "districtId",
                filters.districtId
            );
        }

        return api<Court[]>(
            `/courts?${params.toString()}`
        );
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