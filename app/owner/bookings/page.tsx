"use client";

import { authService } from "@/services/auth.service";
import { redirect } from "next/navigation";

export default function OwnerPage() {
    const user = authService.getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    if (user.role !== "owner") {
        redirect("/unauthorized");
    }

    return <div>Trang quản lý chủ sân</div>;
}
