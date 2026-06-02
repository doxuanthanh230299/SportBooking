import { User, UserPlus } from "lucide-react";
import Link from "next/link";
import Navigation from "../Navigation";
import Button from "../Button";

const Header = async () => {
    return (
        <>
            <header className="bg-primary-850 shadow">
                <div className="max-w-screen-2xl mx-auto py-4 px-6 flex items-center gap-4 max-w-screen-xl mx-auto w-full rounded-b-xl">
                    <Link
                        href="/"
                        className=" text-white flex items-center gap-4"
                    >
                        <img src="/logo.png" alt="Logo" width={80} height={30} />
                        <div>
                            <div className="text-2xl font-bold">Sport Booking</div>
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
                            className="bg-primary-700"
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            leftIcon={<UserPlus size={20} strokeWidth={1} />}
                            variant="primary"
                            size="md"
                            className="bg-primary-700"
                        >
                            Đăng ký
                        </Button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
