"use client";
import { User, UserPlus } from "lucide-react";
import Link from "next/link";
import Navigation from "../Navigation";
import Button from "../Button";
import Modal from "@/app/components/Modal";
import { useState } from "react";

const Header = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <header className="bg-primary-850 shadow">
                <div className="max-w-screen-2xl mx-auto py-4 px-6 flex items-center gap-4 max-w-screen-xl mx-auto w-full rounded-b-xl">
                    <Link
                        href="/"
                        className=" text-white flex items-center gap-4"
                    >
                        <img
                            src="/logo.png"
                            alt="Logo"
                            width={80}
                            height={30}
                        />
                        <div className="hidden md:flex flex-col">
                            <div className="text-2xl font-bold">
                                Sport Booking
                            </div>
                            <div className="text-sm text-white">
                                Đặt sân thể thao
                            </div>
                        </div>
                    </Link>
                    <Navigation />
                    <div className="flex items-center gap-4 ml-auto">
                        <Button
                            leftIcon={<User size={20} strokeWidth={1} />}
                            variant="primary"
                            size="md"
                            className="bg-primary-700 cursor-pointer"
                            onClick={() => setOpenLogin(true)}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                </div>
            </header>
            <Modal
                open={openLogin}
                onClose={() => setOpenLogin(false)}
                title="Đăng nhập"
            >
                <div className="space-y-4">
                    <input
                        placeholder="Email"
                        className="w-full rounded-lg border p-3 border-gray-200"
                    />

                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="w-full rounded-lg border p-3 border-gray-200"
                    />
                    <div className="text-sm text-gray-500">
                        Chưa có tài khoản?{" "}
                        <a
                            href="#"
                            className="text-blue-600"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenLogin(false);
                                setOpenRegister(true);
                            }}
                        >
                            Đăng ký ngay
                        </a>
                    </div>
                    <Button
                        variant="primary"
                        size="md"
                        className="w-full cursor-pointer"
                    >
                        Đăng nhập
                    </Button>
                </div>
            </Modal>
            <Modal
                open={openRegister}
                onClose={() => setOpenRegister(false)}
                title="Đăng ký"
            >
                <div className="space-y-4">
                    <input
                        placeholder="Email"
                        className="w-full rounded-lg border p-3 border-gray-200"
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="w-full rounded-lg border p-3 border-gray-200"
                    />
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        className="w-full rounded-lg border p-3 border-gray-200"
                    />
                    <Button
                        variant="primary"
                        size="md"
                        className="w-full cursor-pointer"
                    >
                        Đăng ký
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default Header;
