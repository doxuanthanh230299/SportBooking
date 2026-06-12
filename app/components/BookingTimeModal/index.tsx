"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import Modal from "../Modal";
import Button from "../Button";
import { Court } from "@/types/courts";
import { bookingService } from "@/services/bookings.service";
import { Booking, TimeSlot } from "@/types/bookings";

interface BookingTimeModalProps {
    court: Court;
    open: boolean;
    onClose: () => void;
    onBookingConfirmed?: (booking: Booking) => void;
}

const timeSlots = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
];

const durations = [1, 2, 3, 4];
const BOOKABLE_STATUSES = new Set(["pending", "confirmed"]);

const formatCurrency = (value: number) =>
    value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
};

const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
        .toString()
        .padStart(2, "0");
    const minute = (minutes % 60).toString().padStart(2, "0");

    return `${hours}:${minute}`;
};

const rangesOverlap = (
    startA: number,
    endA: number,
    startB: number,
    endB: number,
) => startA < endB && startB < endA;

export default function BookingTimeModal({
    court,
    open,
    onClose,
    onBookingConfirmed,
}: BookingTimeModalProps) {
    const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
    const [duration, setDuration] = useState(durations[0]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [dbTimeSlots, setDbTimeSlots] = useState<TimeSlot[]>([]);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [bookingError, setBookingError] = useState("");
    const [creatingBooking, setCreatingBooking] = useState(false);

    const totalPrice = court.pricePerHour * duration;
    const timeSlotById = useMemo(
        () => new Map(dbTimeSlots.map((slot) => [slot.id, slot])),
        [dbTimeSlots],
    );
    const bookedRanges = useMemo(
        () =>
            bookings
                .filter((booking) => BOOKABLE_STATUSES.has(booking.status))
                .map((booking) => {
                    const slot = timeSlotById.get(booking.slotId);

                    if (!slot) {
                        return null;
                    }

                    const start = timeToMinutes(slot.startTime);
                    const durationFromPrice = Math.max(
                        1,
                        Math.round(booking.totalPrice / court.pricePerHour),
                    );
                    const bookedDuration =
                        booking.durationHours ??
                        booking.duration ??
                        (booking.endTime
                            ? (timeToMinutes(booking.endTime) - start) / 60
                            : durationFromPrice);
                    const end = start + bookedDuration * 60;

                    return { start, end };
                })
                .filter((range): range is { start: number; end: number } =>
                    Boolean(range),
                ),
        [bookings, court.pricePerHour, timeSlotById],
    );
    const disabledTimes = useMemo(() => {
        const disabled = new Set<string>();

        bookedRanges.forEach((range) => {
            for (let minute = range.start; minute < range.end; minute += 60) {
                disabled.add(minutesToTime(minute));
            }
        });

        return disabled;
    }, [bookedRanges]);
    const selectedStart = timeToMinutes(selectedTime);
    const selectedEnd = selectedStart + duration * 60;
    const hasDurationConflict = bookedRanges.some((range) =>
        rangesOverlap(selectedStart, selectedEnd, range.start, range.end),
    );

    useEffect(() => {
        if (!open) {
            return;
        }

        let cancelled = false;

        const loadBookings = async () => {
            setLoadingBookings(true);
            setBookingError("");

            try {
                const [nextTimeSlots, nextBookings] = await Promise.all([
                    bookingService.getTimeSlots(),
                    bookingService.getByCourtAndDate(court.id, selectedDate),
                ]);

                if (!cancelled) {
                    setDbTimeSlots(nextTimeSlots);
                    setBookings(nextBookings);
                }
            } catch {
                if (!cancelled) {
                    setBookingError(
                        "Không tải được lịch đặt sân. Vui lòng thử lại.",
                    );
                    setBookings([]);
                }
            } finally {
                if (!cancelled) {
                    setLoadingBookings(false);
                }
            }
        };

        loadBookings();

        return () => {
            cancelled = true;
        };
    }, [court.id, open, selectedDate]);

    const handleConfirmBooking = async () => {
        try {
            setCreatingBooking(true);
            setBookingError("");

            // Find the slot ID for the selected time
            const selectedSlot = dbTimeSlots.find(
                (slot) => slot.startTime === selectedTime,
            );

            if (!selectedSlot) {
                throw new Error("Không tìm thấy khung giờ");
            }

            // Get userId from localStorage (assuming it's stored there after login)
            const userStr = localStorage.getItem("user");
            const user = userStr ? JSON.parse(userStr) : null;
            const userId = user?.id || "default-user";

            const newBooking = await bookingService.createBooking({
                userId,
                courtId: court.id,
                bookingDate: selectedDate,
                slotId: selectedSlot.id,
                totalPrice,
                status: "pending",
                paymentStatus: "unpaid",
                durationHours: duration,
            });

            // Update local bookings state
            setBookings((prev) => [...prev, newBooking]);

            // Call callback if provided
            if (onBookingConfirmed) {
                onBookingConfirmed(newBooking);
            }

            // Close modal
            onClose();
        } catch (error) {
            setBookingError(
                error instanceof Error
                    ? error.message
                    : "Không thể tạo đặt sân. Vui lòng thử lại.",
            );
        } finally {
            setCreatingBooking(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose} title="Chọn giờ đặt sân">
            <div className="space-y-3 sm:space-y-5">
                <div>
                    <p className="text-sm font-semibold sm:text-base text-text-primary">
                        {court.name}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                        {formatCurrency(court.pricePerHour)}/giờ
                    </p>
                </div>

                <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-xs sm:text-sm font-medium text-text-primary">
                        <CalendarDays size={16} />
                        Ngày đặt
                    </span>
                    <input
                        type="date"
                        min={today}
                        value={selectedDate}
                        onChange={(event) => setSelectedDate(event.target.value)}
                        className="h-10 sm:h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    />
                </label>

                <div>
                    <div className="mb-2 flex items-center gap-2 text-xs sm:text-sm font-medium text-text-primary">
                        <Clock size={16} />
                        Giờ bắt đầu
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                        {timeSlots.map((time) => {
                            const isBooked = disabledTimes.has(time);

                            return (
                                <button
                                    key={time}
                                    type="button"
                                    disabled={isBooked || loadingBookings}
                                    onClick={() => setSelectedTime(time)}
                                    className={`h-9 sm:h-10 rounded-lg border text-xs sm:text-sm font-medium transition disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 ${
                                        selectedTime === time
                                            ? "border-primary-500 bg-primary-50 text-primary-600"
                                            : "border-gray-200 text-text-primary hover:border-primary-300"
                                    }`}
                                    title={
                                        isBooked
                                            ? "Khung giờ này đã có người đặt"
                                            : undefined
                                    }
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </div>
                    {loadingBookings && (
                        <p className="mt-2 text-xs text-text-secondary">
                            Đang kiểm tra lịch đặt sân...
                        </p>
                    )}
                    {bookingError && (
                        <p className="mt-2 text-xs text-red-600">
                            {bookingError}
                        </p>
                    )}
                </div>

                <div>
                    <p className="mb-2 text-xs sm:text-sm font-medium text-text-primary">
                        Thời lượng
                    </p>
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                        {durations.map((durationOption) => (
                            <button
                                key={durationOption}
                                type="button"
                                onClick={() => setDuration(durationOption)}
                                className={`h-9 sm:h-10 rounded-lg border text-xs sm:text-sm font-medium transition ${
                                    duration === durationOption
                                        ? "border-primary-500 bg-primary-50 text-primary-600"
                                        : "border-gray-200 text-text-primary hover:border-primary-300"
                                }`}
                            >
                                {durationOption}h
                            </button>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-2 sm:p-3 text-xs sm:text-sm">
                    <div className="flex justify-between gap-2 sm:gap-3">
                        <span className="text-text-secondary">Thời gian</span>
                        <span className="font-medium text-text-primary text-right">
                            {selectedDate} <br className="sm:hidden" /> lúc {selectedTime}
                        </span>
                    </div>
                    <div className="mt-2 flex justify-between gap-2 sm:gap-3">
                        <span className="text-text-secondary">Tạm tính</span>
                        <span className="font-semibold text-primary-600">
                            {formatCurrency(totalPrice)}
                        </span>
                    </div>
                    {hasDurationConflict && (
                        <p className="mt-2 text-xs text-red-600">
                            Thời lượng đã chọn bị trùng với lịch đặt hiện có.
                        </p>
                    )}
                </div>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button type="button" variant="ghost" onClick={onClose} className="w-full sm:w-auto">
                        Hủy
                    </Button>
                    <Button
                        type="button"
                        disabled={
                            loadingBookings ||
                            Boolean(bookingError) ||
                            hasDurationConflict ||
                            creatingBooking
                        }
                        onClick={handleConfirmBooking}
                        className="w-full sm:w-auto"
                    >
                        {creatingBooking ? "Đang xác nhận..." : "Xác nhận"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
