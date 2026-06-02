import { api } from "./api";
import { Venue } from "@/types/venue";

export const venueService = {
    getAll() {
        return api<Venue[]>("/venues");
    },

    getById(id: number) {
        return api<Venue>(
            `/venues/${id}`,
        );
    },

    create(data: Omit<Venue, "id">) {
        return api<Venue>("/venues", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    update(
        id: number,
        data: Partial<Venue>,
    ) {
        return api<Venue>(
            `/venues/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify(data),
            },
        );
    },

    delete(id: number) {
        return api<void>(
            `/venues/${id}`,
            {
                method: "DELETE",
            },
        );
    },
};