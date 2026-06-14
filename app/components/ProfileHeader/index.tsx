import React from 'react';

interface ProfileHeaderProps {
    avatar: string;
    fullName: string;
    email: string;
}

export default function ProfileHeader({ avatar, fullName, email }: ProfileHeaderProps) {
    return (
        <div className="flex items-center gap-6 mb-8 p-6 bg-slate-900 rounded-xl border border-slate-800">
            {avatar ? (
                <img
                    src={avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                />
            ) : (
                <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center border-4 border-blue-600 shadow-lg">
                    <span className="text-3xl text-gray-500">?</span>
                </div>
            )}
            <div>
                <h2 className="text-2xl font-bold text-white mb-1">{fullName || 'Người dùng'}</h2>
                <p className="text-gray-400">{email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-900/50 text-blue-400 text-xs rounded-full font-medium border border-blue-800">
          Thành viên
        </span>
            </div>
        </div>
    );
}