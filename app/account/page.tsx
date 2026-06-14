"use client";

import { useEffect, useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileForm from '../components/ProfileForm';

export default function AccountPage() {
    const [profile, setProfile] = useState({
        id: '',
        fullName: '',
        email: '',
        phone: '',
        avatar: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // 1. GỌI API LẤY THÔNG TIN USER ĐANG ĐĂNG NHẬP
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Lấy thông tin user đã lưu trong localStorage sau khi login thành công
                const storedUser = localStorage.getItem('user');
                const token = localStorage.getItem('token'); // json-server-auth thường trả về token

                if (storedUser && token) {
                    const user = JSON.parse(storedUser);

                    // Gọi API lên json-server (cổng 3001) để lấy dữ liệu mới nhất
                    const response = await fetch(`http://localhost:3001/users/${user.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setProfile({
                            id: data.id,
                            fullName: data.fullName,
                            email: data.email,
                            phone: data.phone,
                            avatar: data.avatar || ''
                        });
                    }
                } else {
                    // Nếu chưa đăng nhập, đá về trang chủ hoặc hiện thông báo
                    alert('Vui lòng đăng nhập để xem thông tin!');
                    window.location.href = '/';
                }
            } catch (error) {
                console.error("Lỗi khi tải profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdateProfile = async (formData: { fullName: string; phone: string; email: string }) => {
        setIsSaving(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/users/${profile.id}`, {
                method: 'PATCH', // Dùng PATCH để chỉ cập nhật các trường gửi lên
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedData = await response.json();
                setProfile(prev => ({ ...prev, ...updatedData }));

                const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
                localStorage.setItem('user', JSON.stringify({ ...storedUser, ...updatedData }));

                alert('Cập nhật thông tin thành công!');
            } else {
                alert('Có lỗi xảy ra khi cập nhật!');
            }
        } catch (error) {
            console.error("Lỗi khi lưu profile:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center pt-16 relative"
            style={{
                backgroundImage: "url('/banner.png')",
                backgroundSize: "cover",
            }}
        >
            {/* 2. Lớp phủ tối màu */}
            <div className="absolute inset-0 bg-[#0f172a]/80"></div>

            {/* 3. Khung chứa nội dung chính (giới hạn độ rộng max-w-xl để form không bị bành quá to) */}
            <div className="relative z-10 w-full max-w-xl px-4 mt-8">
                <h1 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
                    Hồ sơ cá nhân
                </h1>

                <div className="flex flex-col gap-6 w-full">
                    <div className="w-full">
                        <ProfileHeader
                            avatar={profile.avatar}
                            fullName={profile.fullName}
                            email={profile.email}
                        />
                    </div>

                    <div className="w-full">
                        <ProfileForm
                            initialData={{
                                fullName: profile.fullName,
                                phone: profile.phone,
                                email: profile.email
                            }}
                            onSubmit={handleUpdateProfile}
                            isLoading={isSaving}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}