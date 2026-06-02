"use client";

import { CalendarCheck2, Flame, Heart, House, Telescope, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <nav className="flex items-center px-10 py-3 gap-4">
            <Link
                href="/"
                className={`flex flex-col items-center gap-2 text-white hover:bg-primary-700 cursor-pointer py-3 px-6 rounded-md ${isActive("/") ? "bg-primary-700 font-bold" : ""}`}
            >
                Trang chủ
            </Link>
            <Link
                href="/explore"
                className={`flex flex-col items-center gap-2 text-white hover:bg-primary-700 cursor-pointer py-3 px-6 rounded-md ${isActive("/explore") ? "bg-primary-700 font-bold" : ""}`}
            >
                Khám phá
            </Link>
            <Link
                href="/trending"
                className={`flex flex-col items-center gap-2 text-white hover:bg-primary-700 cursor-pointer py-3 px-6 rounded-md ${isActive("/trending") ? "bg-primary-700 font-bold" : ""}`}
            >
                Nổi bật
            </Link>
            <Link
                href="/bookings"
                className={`flex flex-col items-center gap-2 text-white hover:bg-primary-700 cursor-pointer py-3 px-6 rounded-md ${isActive("/bookings") ? "bg-primary-700 font-bold" : ""}`}
            >
                Sân đã đặt
            </Link>
        </nav>
    );
};

export default Navigation;
