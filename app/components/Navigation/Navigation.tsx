"use client";

import { Flame, House, Telescope, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <nav className="w-full flex items-center px-10 py-3 border-t-primary-500 border-t-2 rounded-t-xl justify-between xl:justify-around">
            <Link href="/" className={`flex flex-col items-center gap-2 hover:cursor-pointer ${isActive('/') ? 'text-primary-500' : 'text-text-secondary'}`}>
                <House size={28} strokeWidth={1}/>
                Trang chủ
            </Link>
            <Link href="/explore" className={`flex flex-col items-center gap-2 hover:cursor-pointer ${isActive('/explore') ? 'text-primary-500' : 'text-text-secondary'}`}>
                <Telescope size={28} strokeWidth={1} />
                Khám phá
            </Link>
            <Link href="/trending" className={`flex flex-col items-center gap-2 hover:cursor-pointer ${isActive('/trending') ? 'text-primary-500' : 'text-text-secondary'}`}>
                <Flame size={28} strokeWidth={1} />
                Nổi bật
            </Link>
            <Link href="/account" className={`flex flex-col items-center gap-2 hover:cursor-pointer ${isActive('/account') ? 'text-primary-500' : 'text-text-secondary'}`}>
                <UserRound size={28} strokeWidth={1} />
                Tài khoản
            </Link>
        </nav>
    );
};

export default Navigation;
