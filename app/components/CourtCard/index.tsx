"use client";

import { useState } from "react";
import { Court } from "@/types/courts";
import { Star, MapPin } from "lucide-react";
import BookingTimeModal from "../BookingTimeModal";
import { Booking } from "@/types/bookings";

interface CourtCardProps {
    court: Court;
    image?: string;
    sportName?: string;
    districtName?: string;
}

export function CourtCard({
    court,
    image,
    sportName,
    districtName,
}: CourtCardProps) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleBookingConfirmed = (booking: Booking) => {
        setSuccessMessage("Đặt sân thành công! Vui lòng kiểm tra lịch sử đặt sân của bạn.");
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    return (
        <>
            <div className="overflow-hidden rounded-xl border bg-white boder-primary-850 shadow-sm">
                <img
                    src={image ?? "https://placehold.co/600x400"}
                    alt={court.name}
                    className="h-48 w-full object-cover"
                />

                <div className="space-y-3 p-4">
                    <div>
                        <h3 className="text-lg font-semibold">
                            {court.name}
                        </h3>

                        <p className="text-sm text-gray-500">{sportName}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} />
                        <span>
                            {court.address}
                            {districtName && `, ${districtName}`}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                            {court.courtType}
                        </span>

                        <span
                            className={`rounded-full px-3 py-1 text-xs ${
                                court.status === "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-orange-100 text-orange-700"
                            }`}
                        >
                            {court.status === "active"
                                ? "Đang hoạt động"
                                : "Bảo trì"}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Star
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                        />

                        <span className="font-medium">
                            {court.averageRating}
                        </span>

                        <span className="text-sm text-gray-500">
                            ({court.reviewCount} đánh giá)
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-primary-850 pt-3">
                        <div>
                            <p className="text-xs text-gray-500">Giá thuê</p>

                            <p className="text-lg font-bold text-green-600">
                                {court.pricePerHour.toLocaleString("vi-VN")}
                                đ/giờ
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setBookingOpen(true)}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                        >
                            Đặt sân
                        </button>
                    </div>
                </div>
            </div>

            {successMessage && (
                <div className="mt-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                    {successMessage}
                </div>
            )}

            <BookingTimeModal
                court={court}
                open={bookingOpen}
                onClose={() => setBookingOpen(false)}
                onBookingConfirmed={handleBookingConfirmed}
            />
        </>
    );
}
