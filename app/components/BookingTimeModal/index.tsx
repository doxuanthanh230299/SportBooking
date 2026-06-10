"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import Modal from "../Modal";
import Button from "../Button";
import { Court } from "@/types/courts";

interface BookingTimeModalProps {
    court: Court;
    open: boolean;
    onClose: () => void;
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

const formatCurrency = (value: number) =>
    value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });

export default function BookingTimeModal({
    court,
    open,
    onClose,
}: BookingTimeModalProps) {
    const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
    const [duration, setDuration] = useState(durations[0]);

    const totalPrice = court.pricePerHour * duration;

    return (
        <Modal open={open} onClose={onClose} title="Chọn giờ đặt sân">
            <div className="space-y-5">
                <div>
                    <p className="text-base font-semibold text-text-primary">
                        {court.name}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                        {formatCurrency(court.pricePerHour)}/giờ
                    </p>
                </div>

                <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-medium text-text-primary">
                        <CalendarDays size={16} />
                        Ngày đặt
                    </span>
                    <input
                        type="date"
                        min={today}
                        value={selectedDate}
                        onChange={(event) => setSelectedDate(event.target.value)}
                        className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    />
                </label>

                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-text-primary">
                        <Clock size={16} />
                        Giờ bắt đầu
                    </div>
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`h-10 rounded-lg border text-sm font-medium transition ${
                                    selectedTime === time
                                        ? "border-primary-500 bg-primary-50 text-primary-600"
                                        : "border-gray-200 text-text-primary hover:border-primary-300"
                                }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-2 text-sm font-medium text-text-primary">
                        Thời lượng
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                        {durations.map((durationOption) => (
                            <button
                                key={durationOption}
                                type="button"
                                onClick={() => setDuration(durationOption)}
                                className={`h-10 rounded-lg border text-sm font-medium transition ${
                                    duration === durationOption
                                        ? "border-primary-500 bg-primary-50 text-primary-600"
                                        : "border-gray-200 text-text-primary hover:border-primary-300"
                                }`}
                            >
                                {durationOption} giờ
                            </button>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-3 text-sm">
                    <div className="flex justify-between gap-3">
                        <span className="text-text-secondary">Thời gian</span>
                        <span className="font-medium text-text-primary">
                            {selectedDate} lúc {selectedTime}
                        </span>
                    </div>
                    <div className="mt-2 flex justify-between gap-3">
                        <span className="text-text-secondary">Tạm tính</span>
                        <span className="font-semibold text-primary-600">
                            {formatCurrency(totalPrice)}
                        </span>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button type="button" onClick={onClose}>
                        Xác nhận
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
