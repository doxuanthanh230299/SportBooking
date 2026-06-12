"use client";
import { User } from "lucide-react";
import Link from "next/link";
import Navigation from "../Navigation";
import Button from "../Button";
import Modal from "@/app/components/Modal";
import { useState } from "react";
import Image from "next/image";
import { authService, LoginPayload, RegisterPayload } from "@/services/auth.service";

const Header = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [isLogin, setIsLogin] = useState(authService.isAuthenticated());
    const [loginForm, setLoginForm] = useState<LoginPayload>({
        email: "",
        password: "",
    });
    const [registerForm, setRegisterForm] = useState<RegisterPayload & { confirmPassword: string }>({
        fullName: "",
        email: "",
        phone: "",
        role: "customer",
        password: "",
        confirmPassword: "",
        status: "active",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, isLogin: boolean) => {
        if (isLogin) {
            setLoginForm((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
            return;
        }
        setRegisterForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async () => {
        try {
            await authService.login({ email: loginForm.email, password: loginForm.password });

            setOpenLogin(false);
            setIsLogin(true);
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
            setOpenLogin(true);
            setIsLogin(true);
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
    return (
        <>
            <header className="bg-primary-850 shadow">
                <div className="max-w-screen-2xl mx-auto py-4 px-6 flex items-center gap-4 max-w-screen-xl mx-auto w-full rounded-b-xl">
                    <Link href="/" className=" text-white flex items-center gap-4">
                        <Image src="/logo.png" alt="Logo" width={80} height={30} />
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
                                    <span>{authService.getCurrentUser()?.fullName}</span>

                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-700">
                                        <User size={20} strokeWidth={1} />
                                    </div>
                                </div>

                                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-white shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="p-4 border-b">
                                        <div className="font-semibold text-gray-800">{authService.getCurrentUser()?.fullName}</div>

                                        <div className="text-sm text-gray-500">{authService.getCurrentUser()?.email}</div>

                                        <div className="text-sm text-gray-500 capitalize">{authService.getCurrentUser()?.role === "customer" ? "Khách hàng" : "Chủ sân"}</div>
                                    </div>

                                    <div className="p-2">
                                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">Thông tin cá nhân</button>
                                        <button
                                            onClick={() => {
                                                authService.logout();
                                                setIsLogin(false);
                                            }}
                                            className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50"
                                        >
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
                    <input placeholder="Email" className="w-full rounded-lg border p-3 border-gray-200" onChange={(e) => handleChange(e, true)} />

                    <input type="password" placeholder="Mật khẩu" className="w-full rounded-lg border p-3 border-gray-200" onChange={(e) => handleChange(e, true)} />

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
                    <input onChange={(e) => handleChange(e, false)} name="fullName" placeholder="Họ và tên" className="w-full rounded-lg border p-3 border-gray-200" />
                    <input onChange={(e) => handleChange(e, false)} name="email" placeholder="Email" className="w-full rounded-lg border p-3 border-gray-200" />
                    <input onChange={(e) => handleChange(e, false)} name="phone" placeholder="Số điện thoại" className="w-full rounded-lg border p-3 border-gray-200" />
                    <select onChange={(e) => handleChange(e, false)} name="role" className="w-full rounded-lg border p-3 border-gray-200">
                        <option value="customer">Khách hàng</option>
                        <option value="owner">Chủ sân</option>
                    </select>

                    <input onChange={(e) => handleChange(e, false)} name="password" type="password" placeholder="Mật khẩu" className="w-full rounded-lg border p-3 border-gray-200" />

                    <input onChange={(e) => handleChange(e, false)} name="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" className="w-full rounded-lg border p-3 border-gray-200" />

                    <Button variant="primary" size="md" className="w-full cursor-pointer" onClick={handleRegister}>
                        Đăng ký
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default Header;
