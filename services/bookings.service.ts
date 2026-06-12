import { api } from "./api";
import { Booking, TimeSlot } from "@/types/bookings";

export const bookingService = {
    getTimeSlots() {
        return api<TimeSlot[]>("/timeSlots");
    },

    getByCourtAndDate(courtId: string, bookingDate: string) {
        const params = new URLSearchParams({
            courtId,
            bookingDate,
        });

        return api<Booking[]>(`/bookings?${params.toString()}`);
    },

    createBooking(booking: Omit<Booking, "id">) {
        return api<Booking>("/bookings", {
            method: "POST",
            data: booking,
        });
    },
};
