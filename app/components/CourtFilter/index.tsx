"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Province, District } from "@/types/province";
import { Sport } from "@/types/sport";
import { provinceService } from "@/services/provinces.service";

interface Props {
    sports: Sport[];
    provinces: Province[];
}

const CourtFilter = ({ sports, provinces }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [districts, setDistricts] = useState<District[]>([]);

    const [provinceId, setProvinceId] = useState(searchParams.get("provinceId") || "");

    const [sportId, setSportId] = useState(searchParams.get("sportId") || "");

    const [districtId, setDistrictId] = useState(searchParams.get("districtId") || "");

    // 👉 load districts khi đổi tỉnh
    useEffect(() => {
        const fetchDistricts = async () => {
            if (!provinceId) {
                setDistricts([]);
                setDistrictId("");
                return;
            }

            const data = await provinceService.getByProvinceId(provinceId);
            setDistricts(data);

            // reset district khi đổi tỉnh
            setDistrictId("");
        };

        fetchDistricts();
    }, [provinceId]);

    // 👉 submit mới filter courts
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (sportId) params.set("sportId", sportId);
        if (provinceId) params.set("provinceId", provinceId);
        if (districtId) params.set("districtId", districtId);

        router.push(`?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* SPORT */}
            <div>
                <label className="mb-2 block text-sm font-medium">Môn thể thao</label>

                <select value={sportId} onChange={(e) => setSportId(e.target.value)} className="w-full rounded border p-2">
                    <option value="">Tất cả</option>
                    {sports.map((sport) => (
                        <option key={sport.id} value={sport.id}>
                            {sport.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* PROVINCE */}
            <div>
                <label className="mb-2 block text-sm font-medium">Tỉnh/Thành phố</label>

                <select value={provinceId} onChange={(e) => setProvinceId(e.target.value)} className="w-full rounded border p-2">
                    <option value="">Tất cả</option>
                    {provinces.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* DISTRICT */}
            <div>
                <label className="mb-2 block text-sm font-medium">Quận/Huyện</label>

                <select value={districtId} onChange={(e) => setDistrictId(e.target.value)} className="w-full rounded border p-2" disabled={!provinceId}>
                    <option value="">Tất cả</option>
                    {districts.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="w-full rounded bg-primary-600 py-2 text-white cursor-pointer">
                Áp dụng
            </button>
        </form>
    );
};

export default CourtFilter;
