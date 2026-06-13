export interface TimeSlot {
    id: string;
    startTime: string;
    endTime: string;
}

export interface Booking {
    id: string;
    userId: string;
    courtId: string;
    bookingDate: string;
    slotId: string;
    totalPrice: number;
    status: "pending" | "confirmed" | "cancelled" | string;
    paymentStatus: "paid" | "unpaid" | string;
    duration?: number;
    durationHours?: number;
    endTime?: string;
}

export interface TimeSlot {
    id: string;
    startTime: string;
    endTime: string;
}