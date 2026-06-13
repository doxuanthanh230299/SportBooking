"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
    ssr: false,
});

type Option = {
    value: string;
    label: string;
};

type Province = {
    id: string;
    name: string;
};

type District = {
    id: string;
    name: string;
};

type Sport = {
    id: string;
    name: string;
};

export default function SearchBar() {
    const router = useRouter();

    const [provinces, setProvinces] = useState<Option[]>([]);
    const [districts, setDistricts] = useState<Option[]>([]);
    const [sports, setSports] = useState<Option[]>([]);

    const [selectedProvince, setSelectedProvince] = useState<Option | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(null);
    const [selectedSport, setSelectedSport] = useState<Option | null>(null);

    useEffect(() => {
        api<Province[]>("/provinces").then((data) => {
            setProvinces(data.map((p) => ({ value: p.id, label: p.name })));
        });

        api<Sport[]>("/sports").then((data) => {
            setSports(data.map((s) => ({ value: s.id, label: s.name })));
        });
    }, []);

    useEffect(() => {
        if (!selectedProvince) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDistricts([]);
            setSelectedDistrict(null);
            return;
        }

        api<District[]>(`/districts?provinceId=${selectedProvince.value}`).then((data) => {
            setDistricts(data.map((d) => ({ value: d.id, label: d.name })));
        });

        setSelectedDistrict(null);
    }, [selectedProvince]);

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (selectedSport) params.set("sportId", selectedSport.value);
        if (selectedProvince) params.set("provinceId", selectedProvince.value);
        if (selectedDistrict) params.set("districtId", selectedDistrict.value);

        router.push(`/list?${params.toString()}`);
    };
    return (
        <div className="flex items-center bg-white rounded-2xl shadow-lg p-4 flex-col w-full md:w-fit md:flex-row gap-4">
            <div className="w-full md:w-60 md:border-r border-gray-300 md:pr-4">
                <Select placeholder="Chọn địa điểm" options={provinces} value={selectedProvince} onChange={setSelectedProvince} isClearable />
            </div>

            <div className="w-full md:w-60 md:border-r border-gray-300 md:pr-4">
                <Select placeholder="Quận / Huyện" options={districts} value={selectedDistrict} onChange={setSelectedDistrict} isDisabled={!selectedProvince} isClearable />
            </div>

            <div className="w-full md:w-60">
                <Select placeholder="Môn thể thao" options={sports} value={selectedSport} onChange={setSelectedSport} isClearable />
            </div>

            <button onClick={handleSearch} className="w-full md:w-auto md:ml-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer">
                Tìm kiếm
            </button>
        </div>
    );
}
