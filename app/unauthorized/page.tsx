import Link from "next/link";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-1 items-center justify-center bg-primary-700 px-4 w-full">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
                <ShieldX
                    size={80}
                    className="mx-auto text-red-500 mb-4"
                />

                <h1 className="text-2xl font-bold mb-2">
                    Không có quyền truy cập
                </h1>

                <p className="text-gray-600 mb-6">
                    Tài khoản của bạn không được phép truy cập trang này.
                </p>

                <Link
                    href="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                    Quay về trang chủ
                </Link>
            </div>
        </div>
    );
}