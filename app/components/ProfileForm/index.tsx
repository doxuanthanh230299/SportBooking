"use client";
import React, { useState, useEffect } from 'react';

interface ProfileData {
    fullName: string;
    phone: string;
    email: string;
}

interface ProfileFormProps {
    initialData: ProfileData;
    onSubmit: (data: ProfileData) => void;
    isLoading?: boolean;
}

export default function ProfileForm({ initialData, onSubmit, isLoading }: ProfileFormProps) {
    const [formData, setFormData] = useState<ProfileData>(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-semibold text-white mb-4">Cập nhật thông tin</h3>

            <div className="space-y-2">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">Họ và tên</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Nhập họ và tên..."
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">Số điện thoại</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Nhập số điện thoại..."
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Nhập email..."
                    />
                </div>
            </div>

            <div className="pt-4 border-t border-slate-800 mt-6 flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
            </div>
        </form>
    );
}