"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import Navigation from "../Navigation";
import Button from "../Button";
import Modal from "@/app/components/Modal";

import { authService, LoginPayload, RegisterPayload } from "@/services/auth.service";

import { User as UserType } from "@/types/user";

const Header = () => {
    const [mounted, setMounted] = useState(false);

    const [user, setUser] = useState<UserType | null>(null);

    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const [loginForm, setLoginForm] = useState<LoginPayload>({
        email: "",
        password: "",
    });

    const [registerForm, setRegisterForm] = useState<
        RegisterPayload & {
            confirmPassword: string;
        }
    >({
        fullName: "",
        email: "",
        phone: "",
        role: "customer",
        password: "",
        confirmPassword: "",
        status: "active",
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        setUser(authService.getCurrentUser());
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, isLogin: boolean) => {
        const { name, value } = e.target;

        if (isLogin) {
            setLoginForm((prev) => ({
                ...prev,
                [name]: value,
            }));
            return;
        }

        setRegisterForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        try {
            await authService.login({
                email: loginForm.email,
                password: loginForm.password,
            });

            setUser(authService.getCurrentUser());

            setOpenLogin(false);

            setLoginForm({
                email: "",
                password: "",
            });
        } catch (error) {
            console.error(error);
            alert("Email hoặc mật khẩu không đúng");
        }
    };

    const handleRegister = async () => {
        const { fullName, email, phone, role, password, confirmPassword } = registerForm;

        if (!fullName || !email || !phone || !password) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp");
            return;
        }

        try {
            await authService.register({
                fullName,
                email,
                phone,
                password,
                role,
                status: "active",
                avatar: `https://i.pravatar.cc/150?u=${email}`,
            });

            alert("Đăng ký thành công");

            setOpenRegister(false);

            setRegisterForm({
                fullName: "",
                email: "",
                phone: "",
                role: "customer",
                password: "",
                confirmPassword: "",
                status: "active",
            });
        } catch (error) {
            console.error(error);
            alert("Đăng ký thất bại");
        }
    };

    const handleLogout = () => {
        authService.logout();
        setUser(null);
    };

    if (!mounted) {
        return null;
    }

    const isLogin = !!user;

    return (
        <>
            <header className="bg-primary-850 shadow">
                <div className="max-w-screen-xl mx-auto py-4 px-6 flex items-center gap-4 w-full rounded-b-xl">
                    <Link href="/" className="text-white flex items-center gap-4">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={80}
                            height={30}
                            style={{
                                width: "80px",
                                height: "auto",
                            }}
                        />

                        <div className="hidden md:flex flex-col">
                            <div className="text-2xl font-bold">Sport Booking</div>

                            <div className="text-sm text-white">Đặt sân thể thao</div>
                        </div>
                    </Link>

                    <Navigation />

                    <div className="flex items-center gap-4 ml-auto">
                        {isLogin ? (
                            <div className="relative group">
                                <div className="flex gap-4 items-center text-white cursor-pointer">
                                    <span>{user?.fullName}</span>

                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-700">
                                        <User size={20} strokeWidth={1} />
                                    </div>
                                </div>

                                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-white shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="p-4 border-b">
                                        <div className="font-semibold text-gray-800">{user?.fullName}</div>

                                        <div className="text-sm text-gray-500">{user?.email}</div>

                                        <div className="text-sm text-gray-500">{user?.role === "customer" ? "Khách hàng" : user?.role === "owner" ? "Chủ sân" : "Admin"}</div>
                                    </div>

                                    <div className="p-2">
                                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">Thông tin cá nhân</button>

                                        <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer">
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Button leftIcon={<User size={20} strokeWidth={1} />} variant="primary" size="md" className="bg-primary-700 cursor-pointer" onClick={() => setOpenLogin(true)}>
                                Đăng nhập
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            <Modal open={openLogin} onClose={() => setOpenLogin(false)} title="Đăng nhập">
                <div className="space-y-4">
                    <input name="email" value={loginForm.email} onChange={(e) => handleChange(e, true)} placeholder="Email" className="w-full rounded-lg border p-3 border-gray-200" />

                    <input
                        name="password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => handleChange(e, true)}
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

                    <Button variant="primary" size="md" className="w-full cursor-pointer" onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                </div>
            </Modal>

            <Modal open={openRegister} onClose={() => setOpenRegister(false)} title="Đăng ký">
                <div className="space-y-4">
                    <input name="fullName" placeholder="Họ và tên" className="w-full rounded-lg border p-3 border-gray-200" onChange={(e) => handleChange(e, false)} />

                    <input name="email" placeholder="Email" className="w-full rounded-lg border p-3 border-gray-200" onChange={(e) => handleChange(e, false)} />

                    <input name="phone" placeholder="Số điện thoại" className="w-full rounded-lg border p-3 border-gray-200" onChange={(e) => handleChange(e, false)} />

                    <select name="role" className="w-full rounded-lg border p-3 border-gray-200" onChange={(e) => handleChange(e, false)}>
                        <option value="customer">Khách hàng</option>
                        <option value="owner">Chủ sân</option>
                    </select>

                    <input name="password" type="password" placeholder="Mật khẩu" className="w-full rounded-lg border p-3 border-gray-200" onChange={(e) => handleChange(e, false)} />

                    <input name="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" className="w-full rounded-lg border p-3 border-gray-200" onChange={(e) => handleChange(e, false)} />

                    <Button variant="primary" size="md" className="w-full cursor-pointer" onClick={handleRegister}>
                        Đăng ký
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default Header;
