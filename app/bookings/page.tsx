"use client";

import { useEffect, useState } from "react";
import { bookingService } from "@/services/bookings.service";
import { courtService } from "@/services/courts.service";
import { authService } from "@/services/auth.service";
import { CourtCard } from "../components/CourtCard";
import { Court } from "@/types/courts";
import { Booking, TimeSlot } from "@/types/bookings";
import { LogIn, SearchX } from "lucide-react";
import Link from "next/link";

interface BookingDetail {
    booking: Booking;
    court: Court | undefined;
    slot: TimeSlot | undefined;
}

const BookingPage = () => {
    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [bookingDetails, setBookingDetails] = useState<BookingDetail[]>([]);

    const totalBookings = bookingDetails.length;

    const pendingBookings = bookingDetails.filter(({ booking }) => booking.status === "pending").length;

    const completedBookings = bookingDetails.filter(({ booking }) => booking.status === "confirmed").length;

    useEffect(() => {
        const loadData = async () => {
            try {
                const user = authService.getCurrentUser();

                if (!user) {
                    setIsLogin(false);
                    return;
                }

                setIsLogin(true);

                const [bookings, slots, courts] = await Promise.all([bookingService.getByUser(user.id), bookingService.getTimeSlots(), courtService.getAll()]);

                const details: BookingDetail[] = bookings.map((booking) => ({
                    booking,
                    court: courts.find((court) => court.id === booking.courtId),
                    slot: slots.find((slot) => slot.id === booking.slotId),
                }));

                setBookingDetails(details);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="bg-primary-700 w-full">
                <div className="max-w-screen-xl mx-auto p-6 text-white">Đang tải...</div>
            </div>
        );
    }

    if (!isLogin) {
        return (
            <div className="flex bg-primary-700 w-full">
                <div className="flex-1 max-w-screen-xl mx-auto p-6">
                    <div className="bg-white rounded-2xl p-12 text-center shadow">
                        <LogIn className="mx-auto size-20 text-gray-400 mb-4" />

                        <h2 className="text-2xl font-semibold mb-2">Bạn chưa đăng nhập</h2>

                        <p className="text-gray-500 mb-6">Đăng nhập để xem lịch sử đặt sân và quản lý các đơn đặt sân của bạn.</p>

                        <button onClick={() => window.dispatchEvent(new Event("open-login-modal"))} className="bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer">
                            Đăng nhập ngay
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primary-700 w-full flex-1">
            <div className="max-w-screen-xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 text-center">
                        <p>Đã đặt</p>
                        <p className="text-3xl font-bold">{totalBookings || 0}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 text-center">
                        <p>Chờ xác nhận</p>
                        <p className="text-3xl font-bold text-orange-500">{pendingBookings || 0}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 text-center">
                        <p>Đã xác nhận</p>
                        <p className="text-3xl font-bold text-green-500">{completedBookings || 0}</p>
                    </div>
                </div>
                {bookingDetails.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow">
                        <SearchX className="mx-auto size-20 md:size-28 text-gray-400 mb-4" />

                        <h2 className="text-2xl font-semibold mb-2">Chưa có lịch đặt sân</h2>

                        <p className="text-gray-500 mb-6">Hãy khám phá các sân thể thao và đặt lịch ngay hôm nay.</p>

                        <Link href="/list" className="inline-flex bg-blue-600 text-white px-6 py-3 rounded-xl">
                            Tìm sân ngay
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookingDetails.map(({ booking, court, slot }) => (
                            <CourtCard key={booking.id} court={court!} booking={booking} slot={slot} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
