"use client";

import { authService } from "@/services/auth.service";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <nav className="flex-col md:flex-row flex items-center md:px-10 md:py-3 gap-4">
            <Link href="/" className={`flex flex-col items-center gap-2 md:text-white hover:bg-primary-700 cursor-pointer py-3 px-6 rounded-md text-primary-800 md:w-fit w-full ${isActive("/") ? "bg-primary-700 font-bold text-white" : ""}`}>
                Trang chủ
            </Link>
            <Link
                href="/list"
                className={`flex flex-col items-center gap-2 md:text-white hover:bg-primary-700 cursor-pointer py-3 px-6 rounded-md text-primary-800 md:w-fit w-full ${isActive("/list") ? "bg-primary-700 font-bold text-white" : ""}`}
            >
                Danh sách sân
            </Link>
            {/* <Link
                href="/trending"
                className={`flex flex-col items-center gap-2 md:text-white hover:bg-primary-700 cursor-pointer py-3 px-6 rounded-md text-primary-800 md:w-fit w-full ${isActive("/trending") ? "bg-primary-700 font-bold text-white" : ""}`}
            >
                Nổi bật
            </Link> */}
            {authService.isAuthenticated() && authService.getCurrentUser()?.role === 'customer' && (
                <Link
                    href="/bookings"
                    className={`flex flex-col items-center gap-2 md:text-white hover:bg-primary-700 cursor-pointer py-3 px-6 rounded-md text-primary-800 md:w-fit w-full ${isActive("/bookings") ? "bg-primary-700 font-bold text-white" : ""}`}
                >
                    Sân đã đặt
                </Link>
            )}
        </nav>
    );
};

export default Navigation;
